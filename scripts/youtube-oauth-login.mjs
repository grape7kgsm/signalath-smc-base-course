#!/usr/bin/env node
// YouTube Analytics API 用 OAuth2 ログイン（初回1回だけ実行）。
//
// Google Cloud Console:
//   1. 「YouTube Analytics API」を有効化
//   2. OAuth 同意画面を構成（テスト or 本番）
//   3. 認証情報 → OAuth クライアントID → アプリの種類「デスクトップ」
//      → クライアントID / クライアントシークレットを取得
//
// 環境変数 (export か .env.youtube.local):
//   YOUTUBE_OAUTH_CLIENT_ID
//   YOUTUBE_OAUTH_CLIENT_SECRET
//
// 実行: npm run yt:login
//   → 表示されたURLをブラウザで開いて同意 → refresh token が表示され、
//     .env.youtube.local に追記される（このファイルは gitignore 済み）。

import { createServer } from "node:http";
import { appendFile } from "node:fs/promises";
import {
  AUTH_ENDPOINT,
  TOKEN_ENDPOINT,
  SCOPES,
  loadLocalEnv,
} from "./lib/yt-auth.mjs";

await loadLocalEnv();

const CLIENT_ID = process.env.YOUTUBE_OAUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.YOUTUBE_OAUTH_CLIENT_SECRET;

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error(
    "[エラー] YOUTUBE_OAUTH_CLIENT_ID と YOUTUBE_OAUTH_CLIENT_SECRET を設定してください。\n" +
      ".env.example / .env.youtube.local を参照。",
  );
  process.exit(1);
}

const PORT = Number(process.env.YOUTUBE_OAUTH_PORT ?? 4116);
const REDIRECT_URI = `http://localhost:${PORT}`;

const authUrl = new URL(AUTH_ENDPOINT);
authUrl.searchParams.set("client_id", CLIENT_ID);
authUrl.searchParams.set("redirect_uri", REDIRECT_URI);
authUrl.searchParams.set("response_type", "code");
authUrl.searchParams.set("scope", SCOPES.join(" "));
authUrl.searchParams.set("access_type", "offline");
authUrl.searchParams.set("prompt", "consent");

console.log(
  "\n以下のURLをブラウザで開き、対象チャンネルのGoogleアカウントで同意してください:\n",
);
console.log(authUrl.toString());
console.log(`\n（リダイレクト先 ${REDIRECT_URI} で待機中…）\n`);

function exchangeCode(code) {
  return fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      grant_type: "authorization_code",
    }),
  });
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, REDIRECT_URI);
  const code = url.searchParams.get("code");
  const err = url.searchParams.get("error");

  if (err) {
    res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
    res.end(`認証エラー: ${err}`);
    console.error(`[失敗] 認証エラー: ${err}`);
    server.close();
    process.exit(1);
  }
  if (!code) {
    res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("code がありません");
    return;
  }

  try {
    const tokenRes = await exchangeCode(code);
    if (!tokenRes.ok) {
      throw new Error(`${tokenRes.status}: ${await tokenRes.text()}`);
    }
    const token = await tokenRes.json();
    const refresh = token.refresh_token;

    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(
      "<h2>認証が完了しました</h2><p>このタブを閉じてターミナルに戻ってください。</p>",
    );

    if (!refresh) {
      console.error(
        "[警告] refresh_token が返りませんでした。Googleアカウントの " +
          "アプリ連携を解除してから再実行してください（prompt=consent 済み）。",
      );
      server.close();
      process.exit(1);
    }

    const line = `YOUTUBE_OAUTH_REFRESH_TOKEN=${refresh}\n`;
    await appendFile(".env.youtube.local", line);
    console.log("✅ 認証成功。refresh token を .env.youtube.local に保存しました。");
    console.log("   今後は npm run analyze:video で維持率も含めて分析できます。\n");
    server.close();
    process.exit(0);
  } catch (e) {
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("トークン交換に失敗しました");
    console.error(`[失敗] トークン交換: ${e.message}`);
    server.close();
    process.exit(1);
  }
});

server.listen(PORT);
