"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const USERNAME_RE = /^[a-z0-9_.]{2,32}$/;
const ERROR_MESSAGE =
  "Discordユーザー名が違います。参加後に正しいユーザー名を入力してください";

export default function GateForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const normalized = username.trim().toLowerCase();
    if (!USERNAME_RE.test(normalized)) {
      setError(ERROR_MESSAGE);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/freecontents/api/gate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: normalized }),
      });
      if (res.ok) {
        router.push("/courses");
        router.refresh();
        return;
      }
      setError(ERROR_MESSAGE);
    } catch {
      setError(ERROR_MESSAGE);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label className="text-[10px] tracking-[0.3em] uppercase text-cyan-300/80 text-left">
          Discord ユーザー名
        </label>
        <input
          type="text"
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="例: yamada_taro"
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
        {showHelp ? "確認方法を閉じる" : "ユーザー名の確認方法"}
      </button>

      {showHelp && (
        <div className="mt-3 text-left text-[11px] text-gray-400 leading-relaxed border border-white/10 bg-white/[0.02] p-3">
          <p className="text-cyan-300 mb-1.5 tracking-wide">
            確認手順（スマホ/PC共通）
          </p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Discordを開く → 自分のアイコンをタップ</li>
            <li>
              <span className="text-gray-200">「アカウント」</span>
              （ユーザープロフィール）を開く
            </li>
            <li>
              <span className="text-gray-200">「ユーザー名」</span>
              欄の英数字（表示名ではない）を入力
            </li>
          </ol>
          <p className="text-gray-500 mt-2">
            英小文字・数字・<code>_</code>・<code>.</code>のみ。大文字は自動で小文字に変換されます。
          </p>
        </div>
      )}
    </div>
  );
}
