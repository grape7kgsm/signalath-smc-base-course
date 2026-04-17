import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Discord参加 & シグナル通知設定マニュアル",
  description:
    "波動シグナル研究所のDiscordサーバーで、BTC・ETH・XAU・USD・NIKKEI225のリアルタイムシグナル通知を受け取るための設定手順ガイド。",
};

export default function DiscordGuidePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] relative">
      <div
        className="fixed inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-12 sm:py-16">
        <div className="mb-8">
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-cyan-400 transition-colors"
          >
            &larr; トップに戻る
          </Link>
        </div>

        <article>
          <div className="mb-8">
            <span className="inline-block text-xs font-medium px-2.5 py-1 rounded-full mb-3 border border-cyan-500/30 text-cyan-400 bg-cyan-500/10">
              VIP活用ガイド
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold leading-tight text-white">
              Discord参加 &amp; シグナル通知設定マニュアル
            </h1>
          </div>

          <div className="bg-white/[0.04] border border-white/10 rounded-lg p-5 mb-12 space-y-3 text-sm">
            <p className="text-[15px] leading-[2.0] text-gray-200">
              波動シグナル研究所の Discord サーバーでは、
              <strong className="text-white">VIP会員限定</strong>
              のリアルタイムインジケーターチャンネルを提供しています。
            </p>
            <p className="text-[15px] leading-[2.0] text-gray-200">
              リアルタイム通知を通じて、BTC・ETH・XAU・USD・NIKKEI225 といった主要資産のシグナルを即時に確認できます。
            </p>
            <p className="text-[15px] leading-[2.0] text-gray-200">
              参加するには「Discord アプリのインストール → サーバー参加 → VIP申請」の手順が必要です。以下の案内に沿って進めていただければ、誰でも簡単にVIP権限を取得できます。
            </p>
          </div>

          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 sm:p-8">
            <h2 className="text-lg sm:text-xl font-bold mt-4 mb-6 text-white border-l-2 border-cyan-500 pl-3">
              STEP 1. Discord アプリをインストール
            </h2>
            <p className="text-[15px] leading-[2.0] text-gray-200 mb-6">
              Play ストアまたは App ストアで「Discord」を検索してください。インストール後、アプリを起動するとサインアップ画面が表示されます。
            </p>

            <h2 className="text-lg sm:text-xl font-bold mt-12 mb-6 text-white border-l-2 border-cyan-500 pl-3">
              STEP 2. 会員登録 &amp; プロフィール設定
            </h2>
            <ol className="my-5 space-y-2.5 pl-5 list-decimal text-[15px] leading-relaxed text-gray-200 marker:text-cyan-500">
              <li>電話番号またはメールアドレスでアカウントを作成します。</li>
              <li>
                通知許可画面 → メッセージ・招待・イベントの通知を許可してください。
              </li>
              <li>権限設定画面 → 端末の権限（連絡先・通知など）を許可します。</li>
            </ol>

            <h2 className="text-lg sm:text-xl font-bold mt-12 mb-6 text-white border-l-2 border-cyan-500 pl-3">
              STEP 3. 波動シグナル研究所 Discord サーバーに参加
            </h2>
            <div className="bg-cyan-500/[0.07] border border-cyan-500/20 rounded-xl p-5 my-6">
              <p className="text-sm text-gray-300 mb-2">招待リンク</p>
              <a
                href="https://discord.gg/qnS3JcfF5c"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-300 font-mono text-base hover:text-cyan-200 transition-colors break-all"
              >
                https://discord.gg/qnS3JcfF5c
              </a>
            </div>
            <p className="text-[15px] leading-[2.0] text-gray-200 mb-4">
              参加が完了すると、左側にサーバーのアイコンが追加されます。
            </p>
            <p className="text-[15px] leading-[2.0] text-gray-200 mb-6">
              Discord のプロフィールをタップし、ニックネームの下に表示されている
              <strong className="text-white">Discord ID</strong>{" "}
              を確認し、控えてください。申請フォーム入力時に必要になります。
            </p>

            <h2 className="text-lg sm:text-xl font-bold mt-12 mb-6 text-white border-l-2 border-cyan-500 pl-3">
              STEP 4. インジケーター確認 &amp; 通知設定
            </h2>
            <p className="text-[15px] leading-[2.0] text-gray-200 mb-4">
              VIPチャンネルで以下の主要資産のリアルタイムアラームを確認できます。
            </p>
            <ul className="my-5 space-y-2.5 pl-1">
              <li className="flex items-start gap-2.5 text-[15px] leading-relaxed text-gray-200">
                <span className="text-cyan-500 mt-1.5 flex-shrink-0 text-[8px]">●</span>
                <span>
                  <strong className="text-white">BTC / ETH</strong>（15分足・4時間足）
                </span>
              </li>
              <li className="flex items-start gap-2.5 text-[15px] leading-relaxed text-gray-200">
                <span className="text-cyan-500 mt-1.5 flex-shrink-0 text-[8px]">●</span>
                <span>
                  <strong className="text-white">XAU/USD（ゴールド）</strong>（15分足・4時間足）
                </span>
              </li>
              <li className="flex items-start gap-2.5 text-[15px] leading-relaxed text-gray-200">
                <span className="text-cyan-500 mt-1.5 flex-shrink-0 text-[8px]">●</span>
                <span>
                  <strong className="text-white">USD/JPY</strong>（15分足・4時間足）
                </span>
              </li>
              <li className="flex items-start gap-2.5 text-[15px] leading-relaxed text-gray-200">
                <span className="text-cyan-500 mt-1.5 flex-shrink-0 text-[8px]">●</span>
                <span>
                  <strong className="text-white">NIKKEI225</strong>（15分足・4時間足）
                </span>
              </li>
            </ul>
            <p className="text-[15px] leading-[2.0] text-gray-200 mb-6">
              基本設定ではすべての通知がオンです。不要なチャンネルは個別にオフにできます。
            </p>

            <h2 className="text-lg sm:text-xl font-bold mt-12 mb-6 text-white border-l-2 border-cyan-500 pl-3">
              重要：なりすまし注意
            </h2>
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-5 my-6 space-y-3">
              <p className="text-amber-200 leading-relaxed text-sm">
                波動シグナル研究所は{" "}
                <strong className="text-amber-300">
                  金銭要求・個別投資勧誘・VIPプロジェクト運営を一切行っていません
                </strong>
                。不審なメッセージには絶対に応答しないでください。
              </p>
              <p className="text-amber-200 leading-relaxed text-sm">
                公式アカウントは
                <strong className="text-amber-300">「波動シグナル研究所」</strong>
                のみです。DM経由での投資勧誘は一切行っておりません。
              </p>
            </div>

            <h2 className="text-lg sm:text-xl font-bold mt-12 mb-6 text-white border-l-2 border-cyan-500 pl-3">
              最後のステップ
            </h2>
            <p className="text-[15px] leading-[2.0] text-gray-200 mb-4">
              Discord 参加が完了したら、Bot から届く DM の
              <strong className="text-white">申請ガイド</strong>
              に従って手続きを進めてください。
            </p>
            <p className="text-[15px] leading-[2.0] text-gray-200 mb-6">
              専用リンク・申請フォームはすべて DM でご案内しています。
            </p>

            <div className="bg-cyan-500/[0.07] border border-cyan-500/20 rounded-xl p-5 my-8">
              <p className="text-sm font-semibold text-cyan-400 mb-2">
                💡 申請フォームはこちら
              </p>
              <a
                href="https://signalath.com/apply"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-300 font-mono text-sm hover:text-cyan-200 transition-colors break-all"
              >
                https://signalath.com/apply
              </a>
            </div>
          </div>
        </article>

        <nav className="mt-16 pt-8 border-t border-white/10">
          <Link
            href="/guide/indicator"
            className="group block border border-white/10 rounded-lg p-4 hover:border-cyan-500/30 hover:bg-white/[0.03] transition-all duration-300"
          >
            <span className="text-xs text-gray-500 block mb-1">
              関連ガイド &rarr;
            </span>
            <span className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">
              波動シグナルインジケーター 活用ガイド
            </span>
          </Link>
        </nav>
      </div>
    </main>
  );
}
