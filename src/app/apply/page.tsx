"use client";

import { useState } from "react";

type FormData = {
  agreed: boolean;
  registeredViaLink: boolean;
  accountNumber: string;
  discordId: string;
  tradingViewId: string;
  depositStatus: string;
};

export default function ApplyPage() {
  const [form, setForm] = useState<FormData>({
    agreed: false,
    registeredViaLink: false,
    accountNumber: "",
    discordId: "",
    tradingViewId: "",
    depositStatus: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  const isValid =
    form.agreed &&
    form.registeredViaLink &&
    form.accountNumber.trim() !== "" &&
    form.discordId.trim() !== "" &&
    form.tradingViewId.trim() !== "" &&
    form.depositStatus !== "";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("送信に失敗しました");
      setSubmitted(true);
    } catch {
      setError("送信に失敗しました。時間をおいて再度お試しください。");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <main className="relative min-h-screen flex items-center justify-center bg-[#0a0a0f] px-4">
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="relative z-10 text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">申請を受け付けました</h1>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            申請内容は自動処理されます。通常、数分以内にTradingViewのインジケーター権限が付与されます。
            <br /><br />
            Discordの <span className="text-cyan-400">#完了_昇格告知</span> チャンネルで通知されますので、ご確認ください。
          </p>
          <a href="/" className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            トップページに戻る
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-[#0a0a0f] px-4 py-16">
      {/* Background */}
      <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-blue-500/8 blur-[120px]" />

      <div className="relative z-10 max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 border border-white/10 rounded-full px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs text-gray-400 tracking-widest uppercase">Application</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-3">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              インジケーター権限申請
            </span>
          </h1>
          <p className="text-sm text-gray-500">
            波動シグナル研究所のインジケーターを無期限・無料でご利用いただけます。
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Agreement */}
          <Section title="注意事項の確認" required>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-4">
              <p className="text-xs text-gray-400 leading-relaxed">
                暗号資産・海外取引所およびコミュニティの利用に関する注意事項をお読みください。
                本注意事項を十分に理解していないことによって生じる一切の責任は、すべてご本人にあります。
              </p>
              <button
                type="button"
                onClick={() => setShowDisclaimer(!showDisclaimer)}
                className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 mt-3 transition-colors"
              >
                {showDisclaimer ? "注意事項を閉じる" : "注意事項を読む"}
                <svg className={`w-3 h-3 transition-transform ${showDisclaimer ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            {showDisclaimer && (
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-4 text-xs text-gray-400 leading-relaxed space-y-3">
                <p className="font-semibold text-white">波動シグナル研究所 利用に関する注意事項</p>
                <p>本コミュニティおよびインジケーターの利用にあたり、以下の注意事項を十分にご理解ください。</p>
                <p><span className="text-gray-300 font-medium">1. 投資リスクについて</span><br />FX・暗号資産・株式等の取引は元本割れのリスクがあります。インジケーターのシグナルは将来の利益を保証するものではありません。投資判断はすべてご自身の責任で行ってください。</p>
                <p><span className="text-gray-300 font-medium">2. 海外取引所の利用について</span><br />本サービスでは海外取引所（Axon Markets）の口座開設をご案内しています。海外取引所の利用に伴うリスク（規制変更、出金制限等）はご自身でご理解のうえご利用ください。</p>
                <p><span className="text-gray-300 font-medium">3. インジケーターの利用について</span><br />インジケーターは教育・参考目的で提供されます。過去の実績は将来の成果を保証しません。シグナルに基づく取引で発生した損失について、当方は一切の責任を負いません。</p>
                <p><span className="text-gray-300 font-medium">4. 権限の管理について</span><br />登録口座以外での取引、長期未使用、不正利用が確認された場合、インジケーターの権限は予告なく回収される場合があります。</p>
                <p><span className="text-gray-300 font-medium">5. 個人情報について</span><br />申請時にご入力いただいた情報（口座番号、Discord ID、TradingView ID）はインジケーター権限の付与・管理にのみ使用し、第三者に提供することはありません。</p>
                <button
                  type="button"
                  onClick={() => setShowDisclaimer(false)}
                  className="text-cyan-400 hover:text-cyan-300 transition-colors mt-2"
                >
                  閉じる
                </button>
              </div>
            )}
            <Checkbox
              checked={form.agreed}
              onChange={(v) => setForm({ ...form, agreed: v })}
              label="はい。注意事項をすべて読み、理解しました。"
            />
          </Section>

          {/* Section 2: Registration confirmation */}
          <Section title="専用リンクからの登録確認" required>
            <p className="text-xs text-gray-500 mb-4">
              専用リンクで登録されたアカウントのみ、インジケーターが正常に連携されます。
              登録履歴が確認できない場合、インジケーターは連携されません。
            </p>
            <Checkbox
              checked={form.registeredViaLink}
              onChange={(v) => setForm({ ...form, registeredViaLink: v })}
              label="はい。専用リンクから登録しました。"
            />
          </Section>

          {/* Section 3: Account number */}
          <Section title="Axon Markets アカウント番号" required>
            <p className="text-xs text-gray-500 mb-4">
              ご登録口座以外の口座で取引された場合、権限が自動的に回収されます。
              口座の追加または変更をご希望の際は、事前にお問い合わせください。
            </p>
            <TextInput
              value={form.accountNumber}
              onChange={(v) => setForm({ ...form, accountNumber: v })}
              placeholder="例: 12345678"
            />
          </Section>

          {/* Section 4: Discord ID */}
          <Section title="Discord ID" required>
            <p className="text-xs text-gray-500 mb-4">
              IDを正確に入力してください。
              すべてのやり取りと主要なサービスはDiscordを通じて行われます。
            </p>
            <TextInput
              value={form.discordId}
              onChange={(v) => setForm({ ...form, discordId: v })}
              placeholder="例: username#1234 または ユーザー名"
            />
          </Section>

          {/* Section 5: TradingView ID */}
          <Section title="TradingView ユーザー名" required>
            <p className="text-xs text-gray-500 mb-4">
              インジケーター権限を受け取るには、TradingViewへの登録が必須です。
              ご入力いただいたユーザー名に対して使用権限を付与いたします。
            </p>
            <TextInput
              value={form.tradingViewId}
              onChange={(v) => setForm({ ...form, tradingViewId: v })}
              placeholder="例: ME_Chart_Lab"
            />
          </Section>

          {/* Section 6: Deposit */}
          <Section title="デポジットは完了しましたか？" required>
            <p className="text-xs text-gray-500 mb-4">
              Depositが確認できない場合、権限は付与されません。
              長期未使用の場合、無期限権限は自動的に回収されます。
            </p>
            <RadioGroup
              value={form.depositStatus}
              onChange={(v) => setForm({ ...form, depositStatus: v })}
              options={[
                { value: "completed", label: "はい、完了しました。" },
                { value: "pending", label: "申請書提出後に進行予定です。" },
              ]}
            />
          </Section>

          {/* Error */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={!isValid || submitting}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-lg text-sm font-semibold tracking-wide transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:scale-[1.01] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
          >
            {submitting ? "送信中..." : "申請を送信する"}
          </button>
        </form>
      </div>
    </main>
  );
}

/* --- Sub-components --- */

function Section({ title, required, children }: { title: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5">
      <h2 className="text-sm font-semibold text-white mb-1">
        {title}
        {required && <span className="text-red-400 ml-1">*</span>}
      </h2>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function Checkbox({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <div
      onClick={() => onChange(!checked)}
      className="flex items-start gap-3 cursor-pointer group"
    >
      <div className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${checked ? "bg-cyan-500 border-cyan-500" : "border-gray-600 group-hover:border-gray-400"}`}>
        {checked && (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <span className="text-sm text-gray-300">{label}</span>
    </div>
  );
}

function TextInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
    />
  );
}

function RadioGroup({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
  return (
    <div className="space-y-3">
      {options.map((opt) => (
        <div
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${value === opt.value ? "border-cyan-500" : "border-gray-600 group-hover:border-gray-400"}`}>
            {value === opt.value && <div className="w-2.5 h-2.5 rounded-full bg-cyan-500" />}
          </div>
          <span className="text-sm text-gray-300">{opt.label}</span>
        </div>
      ))}
    </div>
  );
}
