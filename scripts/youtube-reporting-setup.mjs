#!/usr/bin/env node
// YouTube Reporting API のレポートジョブを作成（初回1回だけ）。
//
// インプレッション数 / サムネCTR は Analytics の reports.query では
// 取得できず、この Reporting API のバルクレポート(CSV)経由でのみ取れる。
//
// 重要: ジョブ作成「後」から日次レポートの生成が始まり、最初の
//   レポートが揃うまで概ね 24〜48 時間かかる（過去分のバックフィルは
//   限定的）。直近公開した動画の数値が出るのは数日後になる点に注意。
//
// 前提: `npm run yt:login` 済み（scope に yt-analytics.readonly を含む）。
//   YOUTUBE_OAUTH_CLIENT_ID / SECRET / REFRESH_TOKEN が必要。
//   レポート種別は YOUTUBE_REPORTING_REPORT_TYPE で上書き可
//   (既定: channel_basic_a2)。
//
// 実行: npm run yt:reporting-setup

import { loadLocalEnv, getAccessToken } from "./lib/yt-auth.mjs";

const REPORTING_BASE = "https://youtubereporting.googleapis.com/v1";

await loadLocalEnv();

const clientId = process.env.YOUTUBE_OAUTH_CLIENT_ID;
const clientSecret = process.env.YOUTUBE_OAUTH_CLIENT_SECRET;
const refreshToken = process.env.YOUTUBE_OAUTH_REFRESH_TOKEN;

if (!clientId || !clientSecret || !refreshToken) {
  console.error(
    "[エラー] OAuth 未設定です。先に `npm run yt:login` を実行してください。",
  );
  process.exit(1);
}

const REPORT_TYPE =
  process.env.YOUTUBE_REPORTING_REPORT_TYPE || "channel_basic_a2";

async function api(path, init = {}) {
  const token = await getAccessToken({ clientId, clientSecret, refreshToken });
  const res = await fetch(`${REPORTING_BASE}/${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });
  if (!res.ok) {
    throw new Error(
      `Reporting API ${path} 失敗 (${res.status}): ${await res.text()}`,
    );
  }
  return res.json();
}

async function main() {
  // 利用可能なレポート種別を表示（impression 系の確認用）
  const types = await api("reportTypes");
  const all = types.reportTypes ?? [];
  console.log(`\n利用可能なレポート種別: ${all.length}件`);
  for (const t of all) {
    const mark = t.id === REPORT_TYPE ? " ← 使用" : "";
    console.log(`  - ${t.id}${mark}`);
  }

  if (!all.some((t) => t.id === REPORT_TYPE)) {
    console.error(
      `\n[エラー] 指定のレポート種別 "${REPORT_TYPE}" が一覧にありません。\n` +
        "  YOUTUBE_REPORTING_REPORT_TYPE で上記のいずれかを指定してください。",
    );
    process.exit(1);
  }

  // 既存ジョブを再利用（冪等）
  const jobs = await api("jobs");
  const existing = (jobs.jobs ?? []).find(
    (j) => j.reportTypeId === REPORT_TYPE,
  );

  let job = existing;
  if (existing) {
    console.log(
      `\n既存ジョブを再利用: id=${existing.id} (${existing.reportTypeId})`,
    );
  } else {
    job = await api("jobs", {
      method: "POST",
      body: JSON.stringify({
        reportTypeId: REPORT_TYPE,
        name: `signalath-${REPORT_TYPE}`,
      }),
    });
    console.log(`\n✅ レポートジョブを作成: id=${job.id} (${REPORT_TYPE})`);
  }

  console.log(
    "\nジョブIDを .env.youtube.local に追記します（analyze:video が自動利用）。",
  );
  const { appendFile } = await import("node:fs/promises");
  await appendFile(
    ".env.youtube.local",
    `YOUTUBE_REPORTING_JOB_ID=${job.id}\n`,
  );
  console.log(
    "\n注意: レポートはジョブ作成後 24〜48h で生成され始めます。" +
      "数日後に `npm run analyze:video` を実行するとCTRが反映されます。\n",
  );
}

main().catch((e) => {
  console.error(`[失敗] ${e.message}`);
  process.exit(1);
});
