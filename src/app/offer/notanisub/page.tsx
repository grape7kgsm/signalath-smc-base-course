import type { Metadata } from "next";
import OfferContent from "../OfferContent";

export const metadata: Metadata = {
  title: "波動シグナルインジケーター 無料申請ガイド",
  description:
    "波動シグナルインジケーターを無料で受け取るための申請ガイド。Axon Markets口座開設から申請完了まで5ステップで解説。",
};

// 野谷（サブIB: notanisub）用ページ
export default function OfferNotanisubPage() {
  return (
    <OfferContent
      axonLink="https://app.axonmarkets.com/links/go/1027"
      discordLink="https://discord.gg/CxUhy28RAT"
    />
  );
}
