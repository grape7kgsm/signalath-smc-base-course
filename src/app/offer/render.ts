import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

// offer.md / guides/*.md を読み込み、紹介者別リンク（Axon / Discord）を差し込んでHTMLに変換する。
// ※ サーバー専用（fs を使う）。クライアント側の OfferContent.tsx からは import しないこと。

function fill(md: string, axonLink: string, discordLink: string): string {
  return md.replaceAll("{{AXON_LINK}}", axonLink).replaceAll("{{DISCORD_LINK}}", discordLink);
}

export function renderOfferHtml(axonLink: string, discordLink: string): string {
  const md = fs.readFileSync(path.join(process.cwd(), "src/app/offer/offer.md"), "utf8");
  return marked.parse(fill(md, axonLink, discordLink), { async: false }) as string;
}

export const GUIDE_SLUGS = ["account", "deposit", "mt5"] as const;
export type GuideSlug = (typeof GUIDE_SLUGS)[number];

// 各ステップの「図解で見る」ボタンから開くガイド（モーダル）本文。
export function renderGuides(axonLink: string, discordLink: string): Record<GuideSlug, string> {
  const out = {} as Record<GuideSlug, string>;
  for (const slug of GUIDE_SLUGS) {
    const md = fs.readFileSync(path.join(process.cwd(), `src/app/offer/guides/${slug}.md`), "utf8");
    out[slug] = marked.parse(fill(md, axonLink, discordLink), { async: false }) as string;
  }
  return out;
}
