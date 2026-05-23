import type { Metadata } from "next";
import OfferContent from "./OfferContent";
import { renderOfferHtml, renderGuides } from "./render";

export const metadata: Metadata = {
  title: "波動シグナルインジケーター 無料申請ガイド",
  description:
    "波動シグナルインジケーターを無料で受け取るための申請ガイド。Axon Markets口座開設から申請完了まで5ステップで解説。",
};

// 親IB用ページ（本文は offer.md / 図解ガイドは guides/*.md / リンクのみここで差し込み）
export default function OfferPage() {
  const axonLink = "https://app.axonmarkets.com/links/go/1033";
  const discordLink = "https://discord.gg/qnS3JcfF5c";
  return (
    <OfferContent
      html={renderOfferHtml(axonLink, discordLink)}
      guides={renderGuides(axonLink, discordLink)}
    />
  );
}
