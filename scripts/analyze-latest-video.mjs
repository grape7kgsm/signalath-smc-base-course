#!/usr/bin/env node
// 最新の公開動画が「滑った」原因を分析する CLI。
//
// 接続:
//  - YouTube Data API v3 (APIキー): 再生数 / 高評価 / コメント / 尺
//  - YouTube Analytics API (OAuth2, 任意): 平均視聴維持率 / 視聴時間 /
//    登録者増 / シェア。`npm run yt:login` で連携すると自動で使われる。
// 非提供: インプレッション/サムネCTR は Analytics reports.query では取れず、
//   確定には YouTube Reporting API のバルクレポートが別途必要。
//
// 必要な環境変数（export か .env.youtube.local）:
//   YOUTUBE_API_KEY              … YouTube Data API v3 キー（必須）
//   YOUTUBE_CHANNEL_ID           … "UC..." または "@handle"（必須）
//   YOUTUBE_OAUTH_CLIENT_ID      … 維持率分析を使う場合（任意）
//   YOUTUBE_OAUTH_CLIENT_SECRET  … 同上
//   YOUTUBE_OAUTH_REFRESH_TOKEN  … `npm run yt:login` が自動生成
//
// 実行: npm run analyze:video

import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import {
  loadLocalEnv,
  getAccessToken,
  hasOAuthConfig,
} from "./lib/yt-auth.mjs";

const API_BASE = "https://www.googleapis.com/youtube/v3";
const ANALYTICS_BASE = "https://youtubeanalytics.googleapis.com/v2/reports";
const __dirname = dirname(fileURLToPath(import.meta.url));

await loadLocalEnv();

const API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL = process.env.YOUTUBE_CHANNEL_ID;

if (!API_KEY || !CHANNEL) {
  console.error(
    "[エラー] 環境変数 YOUTUBE_API_KEY と YOUTUBE_CHANNEL_ID を設定してください。\n" +
      "  例: export YOUTUBE_API_KEY=AIza...\n" +
      "      export YOUTUBE_CHANNEL_ID=UCxxxxxxxxxxxxxxxxxxxxxx  (または @signalath)\n" +
      ".env.example も参照。",
  );
  process.exit(1);
}

async function ytFetch(path, params) {
  const url = new URL(`${API_BASE}/${path}`);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  url.searchParams.set("key", API_KEY);
  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error(
      `YouTube API ${path} 失敗 (${res.status}): ${await res.text()}`,
    );
  }
  return res.json();
}

function isoToSeconds(iso) {
  const m = String(iso).match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!m) return 0;
  return Number(m[1] ?? 0) * 3600 + Number(m[2] ?? 0) * 60 + Number(m[3] ?? 0);
}

async function getUploadsPlaylistId() {
  const params = { part: "contentDetails" };
  if (CHANNEL.startsWith("UC")) params.id = CHANNEL;
  else params.forHandle = CHANNEL.startsWith("@") ? CHANNEL : `@${CHANNEL}`;
  const data = await ytFetch("channels", params);
  const uploads =
    data.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
  if (!uploads) throw new Error(`チャンネルが見つかりません: ${CHANNEL}`);
  return uploads;
}

async function getLatestVideos(count = 8) {
  const uploads = await getUploadsPlaylistId();
  const playlist = await ytFetch("playlistItems", {
    part: "contentDetails",
    playlistId: uploads,
    maxResults: String(count),
  });
  const ids = (playlist.items ?? []).map((i) => i.contentDetails.videoId);
  if (ids.length === 0) return [];
  const videos = await ytFetch("videos", {
    part: "snippet,contentDetails,statistics",
    id: ids.join(","),
  });
  return (videos.items ?? [])
    .map((v) => ({
      videoId: v.id,
      title: v.snippet.title,
      description: v.snippet.description ?? "",
      publishedAt: v.snippet.publishedAt,
      durationSeconds: isoToSeconds(v.contentDetails.duration),
      viewCount: Number(v.statistics.viewCount ?? 0),
      likeCount: Number(v.statistics.likeCount ?? 0),
      commentCount: Number(v.statistics.commentCount ?? 0),
      url: `https://www.youtube.com/watch?v=${v.id}`,
    }))
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() -
        new Date(a.publishedAt).getTime(),
    );
}

function median(nums) {
  if (nums.length === 0) return 0;
  const s = [...nums].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}

function pct(n) {
  return `${(n * 100).toFixed(2)}%`;
}

// 動画タイトルを章台本にざっくり対応付け（キーワード一致スコア）
function matchChapter(video, chapters) {
  const text = `${video.title} ${video.description}`.toLowerCase();
  let best = null;
  let bestScore = 0;
  for (const ch of chapters) {
    const kws = String(ch.keywords ?? "")
      .split(/[、,]/)
      .map((k) => k.trim().toLowerCase())
      .filter(Boolean);
    let score = 0;
    if (ch.title && text.includes(String(ch.title).toLowerCase())) score += 5;
    for (const kw of kws) if (kw && text.includes(kw)) score += 1;
    if (score > bestScore) {
      bestScore = score;
      best = ch;
    }
  }
  return bestScore > 0 ? best : null;
}

// OAuth が設定されていれば YouTube Analytics API で維持率等を取得。
// 注: インプレッション/サムネCTR は Analytics API(reports.query) では
// 提供されない（YouTube Reporting API のバルクレポートが別途必要）。
async function fetchAnalytics(videoId, startDate) {
  const accessToken = await getAccessToken({
    clientId: process.env.YOUTUBE_OAUTH_CLIENT_ID,
    clientSecret: process.env.YOUTUBE_OAUTH_CLIENT_SECRET,
    refreshToken: process.env.YOUTUBE_OAUTH_REFRESH_TOKEN,
  });
  const today = new Date().toISOString().slice(0, 10);
  const url = new URL(ANALYTICS_BASE);
  url.searchParams.set("ids", "channel==MINE");
  url.searchParams.set("startDate", startDate);
  url.searchParams.set("endDate", today);
  url.searchParams.set(
    "metrics",
    "views,estimatedMinutesWatched,averageViewDuration," +
      "averageViewPercentage,subscribersGained,shares,likes",
  );
  url.searchParams.set("filters", `video==${videoId}`);

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) {
    throw new Error(
      `YouTube Analytics API 失敗 (${res.status}): ${await res.text()}`,
    );
  }
  const json = await res.json();
  const row = json.rows?.[0];
  if (!row) return null;
  const cols = json.columnHeaders.map((c) => c.name);
  const out = {};
  cols.forEach((name, i) => {
    out[name] = row[i];
  });
  return out;
}

async function main() {
  const videos = await getLatestVideos(8);
  if (videos.length === 0) {
    console.error("公開動画が見つかりませんでした。");
    process.exit(1);
  }

  const latest = videos[0];
  const prior = videos.slice(1);
  const medViews = median(prior.map((v) => v.viewCount));
  const medLikeRate = median(
    prior.filter((v) => v.viewCount > 0).map((v) => v.likeCount / v.viewCount),
  );
  const medCommentRate = median(
    prior
      .filter((v) => v.viewCount > 0)
      .map((v) => v.commentCount / v.viewCount),
  );

  const likeRate = latest.viewCount
    ? latest.likeCount / latest.viewCount
    : 0;
  const commentRate = latest.viewCount
    ? latest.commentCount / latest.viewCount
    : 0;

  const contents = JSON.parse(
    await readFile(join(__dirname, "..", "data", "contents.json"), "utf8"),
  );
  const chapter = matchChapter(latest, contents);

  let analytics = null;
  let analyticsError = null;
  if (hasOAuthConfig()) {
    try {
      analytics = await fetchAnalytics(
        latest.videoId,
        latest.publishedAt.slice(0, 10),
      );
    } catch (e) {
      analyticsError = e.message;
    }
  }

  const line = "─".repeat(60);
  console.log(`\n${line}`);
  console.log("最新公開動画の分析レポート");
  console.log(line);
  console.log(`タイトル : ${latest.title}`);
  console.log(`URL      : ${latest.url}`);
  console.log(
    `公開日時 : ${new Date(latest.publishedAt).toLocaleString("ja-JP")}`,
  );
  console.log(
    `尺       : ${Math.floor(latest.durationSeconds / 60)}分${
      latest.durationSeconds % 60
    }秒`,
  );

  console.log(`\n■ 数値分析（直近${prior.length}本の中央値と比較）`);
  console.log(
    `  再生数      : ${latest.viewCount.toLocaleString()}  ` +
      `(過去中央値 ${medViews.toLocaleString()} / ` +
      `${
        medViews ? `${((latest.viewCount / medViews) * 100).toFixed(0)}%` : "—"
      })`,
  );
  console.log(
    `  高評価率    : ${pct(likeRate)}  (過去中央値 ${pct(medLikeRate)})`,
  );
  console.log(
    `  コメント率  : ${pct(commentRate)}  (過去中央値 ${pct(medCommentRate)})`,
  );

  console.log(`\n■ Analytics（OAuth / 公開〜現在の累計）`);
  if (analytics) {
    console.log(
      `  平均視聴維持率 : ${Number(
        analytics.averageViewPercentage ?? 0,
      ).toFixed(1)}%`,
    );
    console.log(
      `  平均視聴時間   : ${Math.round(
        Number(analytics.averageViewDuration ?? 0),
      )}秒`,
    );
    console.log(
      `  総視聴時間     : ${Math.round(
        Number(analytics.estimatedMinutesWatched ?? 0),
      ).toLocaleString()}分`,
    );
    console.log(
      `  登録者増加     : ${Number(analytics.subscribersGained ?? 0)}人`,
    );
    console.log(`  シェア数       : ${Number(analytics.shares ?? 0)}回`);
    console.log(
      `  ※ インプレCTR/サムネCTR は Analytics reports.query では非提供。` +
        `確定には YouTube Reporting API のバルクレポートが必要。`,
    );
  } else if (analyticsError) {
    console.log(`  取得失敗: ${analyticsError}`);
  } else {
    console.log(
      "  OAuth 未設定のため維持率は取得不可。`npm run yt:login` で連携すると" +
        "維持率・視聴時間・登録者増を含めて分析できます。",
    );
  }

  // 「滑った」判定ヒューリスティック
  const findings = [];
  const avgViewPct = analytics
    ? Number(analytics.averageViewPercentage ?? 0)
    : null;
  if (avgViewPct !== null && avgViewPct < 35) {
    findings.push(
      `平均視聴維持率が${avgViewPct.toFixed(1)}%と低い（目安40%超）→ ` +
        `冒頭〜中盤で離脱。フック弱さ/前置きの長さ/テンポが主因の可能性大。`,
    );
  }
  if (
    avgViewPct !== null &&
    medViews &&
    latest.viewCount < medViews * 0.6 &&
    avgViewPct >= 40
  ) {
    findings.push(
      `維持率は悪くないのに再生数が伸びていない → 内容ではなく入口` +
        `（サムネ/タイトル/インプレッション）側の問題。サムネ差し替えが最優先。`,
    );
  }
  if (medViews && latest.viewCount < medViews * 0.6) {
    findings.push(
      `再生数が過去中央値の${(
        (latest.viewCount / medViews) *
        100
      ).toFixed(0)}%しかない → サムネ/タイトルでクリックが取れていない、` +
        `または公開直後のインプレッション獲得に失敗した可能性が高い。` +
        `（CTR の確定にはYouTube Analyticsが必要）`,
    );
  }
  if (medLikeRate && likeRate < medLikeRate * 0.7 && latest.viewCount > 0) {
    findings.push(
      `高評価率が平常時を大きく下回る → 流入はしたが内容が刺さらず途中離脱。` +
        `冒頭フック/構成の見直しが必要。`,
    );
  }
  if (
    medCommentRate &&
    commentRate < medCommentRate * 0.7 &&
    latest.viewCount > 0
  ) {
    findings.push(
      `コメント率が低い → 視聴者の当事者意識を引き出せていない（問いかけ/CTA不足）。`,
    );
  }
  if (
    latest.durationSeconds > 0 &&
    prior.length > 0 &&
    latest.durationSeconds >
      median(prior.map((v) => v.durationSeconds)) * 1.4
  ) {
    findings.push(
      `尺が過去平均より大幅に長い → 冗長で離脱を招いた可能性。` +
        `要点を前倒しする編集を検討。`,
    );
  }
  if (findings.length === 0) {
    findings.push(
      analytics
        ? "数値・維持率ともに致命的な落ち込みは検出されず。体感の" +
            "『滑った』はアルゴリズム露出の揺らぎ/公開タイミングの可能性。"
        : "公開数値上は致命的な落ち込みは検出されず。維持率/CTR" +
            "（OAuth/Reporting 必須）側の確認を推奨。",
    );
  }

  console.log(`\n■ 滑った原因の仮説`);
  findings.forEach((f, i) => console.log(`  ${i + 1}. ${f}`));

  console.log(`\n■ 台本分析`);
  if (chapter) {
    const body = Array.isArray(chapter.body) ? chapter.body : [];
    const hook = body[0] ? String(body[0]).replace(/\n/g, " ") : "(本文なし)";
    console.log(`  対応章   : ${chapter.title}`);
    console.log(`  学習目標 : ${chapter.learningGoal ?? "—"}`);
    console.log(`  冒頭フック: ${hook.slice(0, 120)}…`);
    const issues = [];
    if (hook.length < 40)
      issues.push("冒頭フックが短すぎる/弱い。視聴維持の最初の15秒が勝負。");
    if (!/[?？]/.test(hook))
      issues.push(
        "冒頭に問い掛けがない。視聴者の悩みを断定形で突く一文を先頭へ。",
      );
    if (body.length > 18)
      issues.push(
        `本文ブロックが${body.length}個と多く、1本の動画として情報過多。` +
          "テーマを分割した方が滑りにくい。",
      );
    if (issues.length === 0)
      issues.push("台本構成上の明確な弱点は検出されず。");
    issues.forEach((s, i) => console.log(`  - ${s}`));
  } else {
    console.log(
      "  この動画に対応する章を contents.json から特定できませんでした。" +
        "（タイトルに章キーワードを含めると台本分析が有効になります）",
    );
  }

  console.log(`\n■ 改善アクション`);
  console.log(
    "  1. サムネ A/B: 数字・ビフォーアフター・表情を1要素だけ変えて差し替え",
  );
  console.log(
    "  2. タイトル前半15文字に最大ベネフィット/恐怖訴求を寄せる",
  );
  console.log(
    "  3. 冒頭15秒で『この動画で何が手に入るか』を断定形で提示",
  );
  console.log(
    analytics
      ? "  4. 維持率グラフの離脱点に対応する台本セクションを特定し再編集" +
          "（サムネCTRの確定が要るなら YouTube Reporting API を追加）"
      : "  4. `npm run yt:login` で OAuth 連携し、維持率込みで再分析",
  );
  console.log(`${line}\n`);
}

main().catch((e) => {
  console.error(`[失敗] ${e.message}`);
  process.exit(1);
});
