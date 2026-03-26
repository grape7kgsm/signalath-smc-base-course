# 波動シグナル研究所 - リスクリワード最大化トレード術

SMC（スマートマネーコンセプト）を基礎から実践まで学べる無料講座サイト。

## 技術構成

- Next.js (App Router)
- TypeScript
- Tailwind CSS

## ローカル開発

```bash
npm install
npm run dev
```

http://localhost:3000 でアクセスできます。

## GitHubへpushする手順

```bash
# 1. GitHubで新しいリポジトリを作成（名前: signalath-smc-base-course）
# 2. リモートを追加してpush
cd signalath-smc-base-course
git remote add origin https://github.com/YOUR_USERNAME/signalath-smc-base-course.git
git branch -M main
git push -u origin main
```

## Vercelでdeployする手順

1. [Vercel](https://vercel.com) にログイン
2. 「Add New Project」をクリック
3. GitHubリポジトリ `signalath-smc-base-course` をimport
4. Framework Preset は「Next.js」が自動検出される
5. 「Deploy」をクリック
6. デプロイ完了後、`https://signalath-smc-base-course.vercel.app` のようなURLが発行される

## signalath.com/contents を接続する手順

### Vercel側の設定

1. Vercelプロジェクトの Settings > Domains に移動
2. `signalath.com` を追加
3. Vercelが表示するDNSレコード情報をメモする

### Cloudflare DNS設定

signalath.com のDNSがCloudflareで管理されている場合：

1. Cloudflareダッシュボードで対象ドメインを選択
2. DNS > Records に移動
3. 以下のレコードを追加：

| Type  | Name | Content              | Proxy |
|-------|------|----------------------|-------|
| CNAME | @    | cname.vercel-dns.com | DNS only (灰色雲) |
| CNAME | www  | cname.vercel-dns.com | DNS only (灰色雲) |

**重要**: Cloudflareのプロキシ（オレンジ雲）はOFFにし、「DNS only」（灰色雲）にすること。Vercel側でSSL証明書を発行するため、Cloudflareプロキシが有効だとSSLの競合が発生する。

4. Cloudflare SSL/TLS設定を「Full (strict)」にする
5. Vercel側でドメインの検証が完了するまで数分待つ

### /contents パスについて

Next.js App Router で `/contents` ルートを定義済みのため、`signalath.com/contents` でそのまま講座一覧が表示されます。サブパス設定は不要です。

## サイト構成

- `/` - トップページ（講座への導線）
- `/contents` - 講座一覧ページ
- `/contents/[slug]` - 各講座詳細ページ（chapter-1 〜 chapter-14）

## データ更新

講座の内容は `data/contents.json` に格納されています。内容を更新する場合はこのファイルを編集し、再デプロイしてください。
