"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GateForm() {
  const router = useRouter();
  const [discordId, setDiscordId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const trimmed = discordId.trim();
    if (!/^\d{17,20}$/.test(trimmed)) {
      setError("DiscordIDが違います。参加後に正しいIDを入力してください");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/freecontents/api/gate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ discordId: trimmed }),
      });
      if (res.ok) {
        router.push("/courses");
        router.refresh();
        return;
      }
      setError("DiscordIDが違います。参加後に正しいIDを入力してください");
    } catch {
      setError("DiscordIDが違います。参加後に正しいIDを入力してください");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label className="text-[10px] tracking-[0.3em] uppercase text-cyan-300/80 text-left">
          Discord ID
        </label>
        <input
          type="text"
          inputMode="numeric"
          pattern="\d*"
          autoComplete="off"
          value={discordId}
          onChange={(e) => setDiscordId(e.target.value.replace(/[^\d]/g, ""))}
          placeholder="例: 123456789012345678"
          className="w-full bg-white/[0.03] border border-white/15 focus:border-cyan-400/60 focus:outline-none px-4 py-3 text-white text-sm tracking-wider placeholder-gray-600 transition-colors"
          disabled={submitting}
        />
        <button
          type="submit"
          disabled={submitting}
          className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <span>{submitting ? "認証中..." : "講座を開く"}</span>
          {!submitting && (
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          )}
        </button>
        {error && (
          <p className="text-red-400 text-xs text-center leading-relaxed mt-1">
            {error}
          </p>
        )}
      </form>

      <button
        type="button"
        onClick={() => setShowHelp((v) => !v)}
        className="mt-4 text-[11px] text-gray-500 hover:text-cyan-300 transition-colors underline decoration-dotted underline-offset-4"
      >
        {showHelp ? "ID確認方法を閉じる" : "Discord IDの確認方法"}
      </button>

      {showHelp && (
        <div className="mt-3 text-left text-[11px] text-gray-400 leading-relaxed border border-white/10 bg-white/[0.02] p-3">
          <p className="text-cyan-300 mb-1.5 tracking-wide">確認手順（スマホ/PC共通）</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Discord設定 → 詳細設定 → <span className="text-gray-200">開発者モード</span>をON</li>
            <li>自分のアイコンを長押し（PCは右クリック）</li>
            <li><span className="text-gray-200">「ユーザーIDをコピー」</span>をタップ</li>
          </ol>
          <p className="text-gray-500 mt-2">17〜19桁の数字がコピーされます。</p>
        </div>
      )}
    </div>
  );
}
