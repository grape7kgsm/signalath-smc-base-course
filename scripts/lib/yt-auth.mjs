// YouTube OAuth2 (channel-owner) 共通ヘルパー。
// 視聴維持率など YouTube Analytics API はチャンネル所有者の OAuth2 が必須。
// API キーでは取得できないため、ここで refresh token → access token を扱う。

import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";

export const TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token";
export const AUTH_ENDPOINT = "https://accounts.google.com/o/oauth2/v2/auth";

// yt-analytics.readonly: 維持率/視聴時間など / youtube.readonly: チャンネル解決
export const SCOPES = [
  "https://www.googleapis.com/auth/yt-analytics.readonly",
  "https://www.googleapis.com/auth/youtube.readonly",
];

// .env.youtube.local (gitignore対象) を簡易ロード。export 不要にする。
export async function loadLocalEnv(path = ".env.youtube.local") {
  if (!existsSync(path)) return;
  const text = await readFile(path, "utf8");
  for (const raw of text.split("\n")) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let val = line.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = val;
  }
}

// refresh token から access token を取得。
export async function getAccessToken({
  clientId,
  clientSecret,
  refreshToken,
}) {
  const res = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });
  if (!res.ok) {
    throw new Error(
      `アクセストークン更新に失敗 (${res.status}): ${await res.text()}\n` +
        "refresh token が失効/取り消しの可能性。再度 npm run yt:login を実行。",
    );
  }
  const json = await res.json();
  return json.access_token;
}

export function hasOAuthConfig() {
  return Boolean(
    process.env.YOUTUBE_OAUTH_CLIENT_ID &&
      process.env.YOUTUBE_OAUTH_CLIENT_SECRET &&
      process.env.YOUTUBE_OAUTH_REFRESH_TOKEN,
  );
}
