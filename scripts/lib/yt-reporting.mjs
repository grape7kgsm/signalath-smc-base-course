// YouTube Reporting API: 最新の日次レポート(CSV)を取得して
// 対象動画のインプレッション / CTR を集計するヘルパー。

import { getAccessToken } from "./yt-auth.mjs";

const REPORTING_BASE = "https://youtubereporting.googleapis.com/v1";

// ダブルクオート対応の最小 CSV パーサ（Reporting CSV は単純構造）。
function parseCsv(text) {
  const lines = text.split(/\r?\n/).filter((l) => l.length > 0);
  if (lines.length === 0) return { header: [], rows: [] };
  const split = (line) => {
    const out = [];
    let cur = "";
    let q = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (q) {
        if (c === '"' && line[i + 1] === '"') {
          cur += '"';
          i++;
        } else if (c === '"') q = false;
        else cur += c;
      } else if (c === '"') q = true;
      else if (c === ",") {
        out.push(cur);
        cur = "";
      } else cur += c;
    }
    out.push(cur);
    return out;
  };
  const header = split(lines[0]);
  const rows = lines.slice(1).map(split);
  return { header, rows };
}

async function api(path, auth) {
  const token = await getAccessToken(auth);
  const res = await fetch(`${REPORTING_BASE}/${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    throw new Error(
      `Reporting API ${path} 失敗 (${res.status}): ${await res.text()}`,
    );
  }
  return res.json();
}

// 直近 maxReports 本の日次レポートから videoId の行を集計。
// 戻り値: { impressions, ctr, views, days, columnsFound } or null
export async function fetchVideoImpressions({
  jobId,
  videoId,
  auth,
  maxReports = 14,
}) {
  const list = await api(`jobs/${jobId}/reports?pageSize=200`, auth);
  const reports = (list.reports ?? [])
    .filter((r) => r.downloadUrl)
    .sort(
      (a, b) =>
        new Date(b.createTime).getTime() - new Date(a.createTime).getTime(),
    )
    .slice(0, maxReports);

  if (reports.length === 0) {
    return { pending: true };
  }

  const token = await getAccessToken(auth);
  let impressions = 0;
  let clickWeighted = 0;
  let views = 0;
  let days = 0;
  let hasImpressionCols = false;

  for (const rep of reports) {
    const res = await fetch(rep.downloadUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) continue;
    const { header, rows } = parseCsv(await res.text());
    const idx = (name) => header.indexOf(name);
    const vIdx = idx("video_id");
    const impIdx = idx("impressions");
    const ctrIdx = idx("impressions_click_through_rate");
    const viewIdx = idx("views");
    if (impIdx !== -1) hasImpressionCols = true;
    if (vIdx === -1) continue;

    for (const row of rows) {
      if (row[vIdx] !== videoId) continue;
      days++;
      if (viewIdx !== -1) views += Number(row[viewIdx] || 0);
      if (impIdx !== -1) {
        const imp = Number(row[impIdx] || 0);
        impressions += imp;
        if (ctrIdx !== -1) {
          // CTR は日次の率なので impressions で加重して合算
          clickWeighted += imp * Number(row[ctrIdx] || 0);
        }
      }
    }
  }

  if (!hasImpressionCols) {
    return { noImpressionColumns: true };
  }

  return {
    impressions,
    ctr: impressions > 0 ? clickWeighted / impressions : 0,
    views,
    days,
    reportsScanned: reports.length,
  };
}
