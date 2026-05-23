"use client";

import { useCallback, useEffect, useState } from "react";

// 本文（offer.md 由来HTML）を描画し、本文中の <button data-guide="..."> を押すと
// 対応する図解ガイドを同ページ内のモーダル（重なり窓）で開く。
// ※ 本文・ガイド本文を直したいときは offer.md / guides/*.md を編集するだけでよい。

const GUIDE_TITLES: Record<string, string> = {
  account: "口座開設＆本人確認の流れ",
  deposit: "取引口座開設＆入金の流れ",
  mt5: "MT5とAxonの連携",
};

export default function OfferContent({
  html,
  guides,
}: {
  html: string;
  guides: Record<string, string>;
}) {
  const [active, setActive] = useState<string | null>(null);

  // 本文は dangerouslySetInnerHTML 由来なので、イベント委譲で data-guide ボタンを拾う。
  const onBodyClick = useCallback((e: React.MouseEvent) => {
    const trigger = (e.target as HTMLElement).closest<HTMLElement>("[data-guide]");
    if (!trigger) return;
    e.preventDefault();
    const slug = trigger.getAttribute("data-guide");
    if (slug && guides[slug]) setActive(slug);
  }, [guides]);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-gray-100">
      <header className="offer-hero">
        <div className="offer-hero-inner">
          <p className="offer-hero-brand">波動シグナル研究所</p>
          <h1 className="offer-hero-title">
            オリジナルインジケーター入手
            <br />
            <span className="hero-amp">＆</span> Discord <span className="hero-vip">VIP</span>参加方法詳細
          </h1>
        </div>
      </header>
      <div
        className="offer-md max-w-3xl mx-auto px-4 pb-12 pt-8"
        onClick={onBodyClick}
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {active && (
        <div
          className="guide-modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActive(null);
          }}
        >
          <div className="guide-modal" role="dialog" aria-modal="true">
            <div className="guide-modal-header">
              <span className="guide-modal-title">{GUIDE_TITLES[active] ?? "図解ガイド"}</span>
              <button
                type="button"
                className="guide-modal-close"
                onClick={() => setActive(null)}
                aria-label="閉じる"
              >
                ×
              </button>
            </div>
            <div
              className="offer-md guide-modal-body"
              dangerouslySetInnerHTML={{ __html: guides[active] }}
            />
            <div className="guide-modal-footer">
              <button
                type="button"
                className="guide-modal-back"
                onClick={() => setActive(null)}
              >
                ← 閉じて申請手順に戻る
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
