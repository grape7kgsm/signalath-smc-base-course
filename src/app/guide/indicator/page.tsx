import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "波動シグナルインジケーター 活用ガイド",
  description:
    "TradingView上で動作する波動シグナルインジケーターの基本から実践的な使い方まで、5つの章に分けて解説します。",
};

export default function IndicatorGuidePage() {
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
              波動シグナルインジケーター 活用ガイド
            </h1>
            <p className="mt-3 text-sm text-gray-400">
              マインド・理論・実践 完全総まとめ
            </p>
          </div>

          <div className="bg-white/[0.04] border border-white/10 rounded-lg p-5 mb-12 space-y-3 text-sm">
            <p className="text-[15px] leading-[2.0] text-gray-200">
              「波動シグナルインジケーター」は、TradingView上で動作するカスタムインジケーターで、
              <strong className="text-white">SMC（Smart Money Concepts）</strong>
              をベースに設計されています。
            </p>
            <p className="text-[15px] leading-[2.0] text-gray-200">
              このガイドでは、インジケーターの基本から実践的な使い方まで、5つの章に分けて解説します。
            </p>
          </div>

          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 sm:p-8">
            <h2 className="text-lg sm:text-xl font-bold mt-4 mb-6 text-white border-l-2 border-cyan-500 pl-3">
              第1章：インジケーターの概要
            </h2>

            <h3 className="text-base sm:text-lg font-semibold mt-8 mb-4 text-cyan-300">
              波動スイングインジケーター（4時間足）
            </h3>
            <p className="text-[15px] leading-[2.0] text-gray-200 mb-4">
              大きなトレンドの方向を捉えるインジケーターです。
            </p>
            <ul className="my-5 space-y-2.5 pl-1">
              <li className="flex items-start gap-2.5 text-[15px] leading-relaxed text-gray-200">
                <span className="text-cyan-500 mt-1.5 flex-shrink-0 text-[8px]">
                  ●
                </span>
                <span>低レバレッジ（2〜3倍）で運用</span>
              </li>
              <li className="flex items-start gap-2.5 text-[15px] leading-relaxed text-gray-200">
                <span className="text-cyan-500 mt-1.5 flex-shrink-0 text-[8px]">
                  ●
                </span>
                <span>後半ほど利確比率を増やす</span>
              </li>
            </ul>

            <h3 className="text-base sm:text-lg font-semibold mt-10 mb-4 text-cyan-300">
              波動スキャルインジケーター（15分足）
            </h3>
            <p className="text-[15px] leading-[2.0] text-gray-200 mb-4">
              レンジ相場の小波で短期利益を狙うインジケーターです。
            </p>
            <ul className="my-5 space-y-2.5 pl-1">
              <li className="flex items-start gap-2.5 text-[15px] leading-relaxed text-gray-200">
                <span className="text-cyan-500 mt-1.5 flex-shrink-0 text-[8px]">
                  ●
                </span>
                <span>柔軟なレバレッジ（5〜20倍）で運用</span>
              </li>
              <li className="flex items-start gap-2.5 text-[15px] leading-relaxed text-gray-200">
                <span className="text-cyan-500 mt-1.5 flex-shrink-0 text-[8px]">
                  ●
                </span>
                <span>最初のTPで大きく利確</span>
              </li>
            </ul>

            <div className="bg-cyan-500/[0.07] border border-cyan-500/20 rounded-xl p-5 my-8">
              <p className="text-sm text-gray-200 leading-relaxed">
                <strong className="text-cyan-400">シナジー効果：</strong>
                両方が同方向を示した時、確度が高まります。
              </p>
            </div>

            <h2 className="text-lg sm:text-xl font-bold mt-12 mb-6 text-white border-l-2 border-cyan-500 pl-3">
              第2章：マインドセット
            </h2>
            <p className="text-[15px] leading-[2.0] text-gray-200 mb-6">
              90%のトレーダーが1年以内に退場すると言われています。その差は
              <strong className="text-white">「マインド」</strong>にあります。
            </p>

            <h3 className="text-base sm:text-lg font-semibold mt-8 mb-4 text-cyan-300">
              投資 vs トレーディングの明確な区分
            </h3>
            <ul className="my-5 space-y-2.5 pl-1">
              <li className="flex items-start gap-2.5 text-[15px] leading-relaxed text-gray-200">
                <span className="text-cyan-500 mt-1.5 flex-shrink-0 text-[8px]">
                  ●
                </span>
                <span>
                  <strong className="text-white">投資</strong>：長期的な資産形成（総資産の70〜80%を充てる）
                </span>
              </li>
              <li className="flex items-start gap-2.5 text-[15px] leading-relaxed text-gray-200">
                <span className="text-cyan-500 mt-1.5 flex-shrink-0 text-[8px]">
                  ●
                </span>
                <span>
                  <strong className="text-white">トレーディング</strong>：短期的な利益獲得（残り20〜30%で行う）
                </span>
              </li>
            </ul>

            <h3 className="text-base sm:text-lg font-semibold mt-10 mb-4 text-cyan-300">
              カジノの原理
            </h3>
            <p className="text-[15px] leading-[2.0] text-gray-200 mb-6">
              カジノはたった2.7%の優位性でも、一貫したルールを守ることで利益を出し続けています。トレードも同じです。
            </p>

            <h3 className="text-base sm:text-lg font-semibold mt-10 mb-4 text-cyan-300">
              リスク管理の鉄則
            </h3>
            <ul className="my-5 space-y-2.5 pl-1">
              <li className="flex items-start gap-2.5 text-[15px] leading-relaxed text-gray-200">
                <span className="text-cyan-500 mt-1.5 flex-shrink-0 text-[8px]">
                  ●
                </span>
                <span>全資金投入は絶対禁止</span>
              </li>
              <li className="flex items-start gap-2.5 text-[15px] leading-relaxed text-gray-200">
                <span className="text-cyan-500 mt-1.5 flex-shrink-0 text-[8px]">
                  ●
                </span>
                <span>分割トレードを徹底する</span>
              </li>
              <li className="flex items-start gap-2.5 text-[15px] leading-relaxed text-gray-200">
                <span className="text-cyan-500 mt-1.5 flex-shrink-0 text-[8px]">
                  ●
                </span>
                <span>総資産の70〜80%は長期投資に回す</span>
              </li>
            </ul>

            <h2 className="text-lg sm:text-xl font-bold mt-12 mb-6 text-white border-l-2 border-cyan-500 pl-3">
              第3章：取引ルール（核心）
            </h2>

            <h3 className="text-base sm:text-lg font-semibold mt-8 mb-4 text-cyan-300">
              3つの絶対ルール
            </h3>
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-5 my-6 space-y-3 text-sm">
              <p className="text-amber-200 leading-relaxed">
                <strong className="text-amber-300">1. シグナルを守る</strong>
                　— インジケーターの指示に従う
              </p>
              <p className="text-amber-200 leading-relaxed">
                <strong className="text-amber-300">2. 損切り必須</strong>
                　— SL（ストップロス）は必ず設定する
              </p>
              <p className="text-amber-200 leading-relaxed">
                <strong className="text-amber-300">3. 全資金一括禁止</strong>
                　— ポジションは分割で持つ
              </p>
            </div>

            <h3 className="text-base sm:text-lg font-semibold mt-10 mb-4 text-cyan-300">
              シグナルの種類
            </h3>
            <p className="text-[15px] leading-[2.0] text-gray-200 mb-6">
              シグナルは <strong className="text-white">Long / Short / TP</strong> の3種のみです。
            </p>

            <h3 className="text-base sm:text-lg font-semibold mt-10 mb-4 text-cyan-300">
              エントリー3パターン
            </h3>
            <ul className="my-5 space-y-2.5 pl-1">
              <li className="flex items-start gap-2.5 text-[15px] leading-relaxed text-gray-200">
                <span className="text-cyan-500 mt-1.5 flex-shrink-0 text-[8px]">
                  ●
                </span>
                <span>
                  <strong className="text-white">即時エントリー</strong>
                  　— シグナル発生と同時にエントリー
                </span>
              </li>
              <li className="flex items-start gap-2.5 text-[15px] leading-relaxed text-gray-200">
                <span className="text-cyan-500 mt-1.5 flex-shrink-0 text-[8px]">
                  ●
                </span>
                <span>
                  <strong className="text-white">押し目エントリー</strong>
                  　— シグナル後の戻りを待ってエントリー
                </span>
              </li>
              <li className="flex items-start gap-2.5 text-[15px] leading-relaxed text-gray-200">
                <span className="text-cyan-500 mt-1.5 flex-shrink-0 text-[8px]">
                  ●
                </span>
                <span>
                  <strong className="text-white">分割エントリー</strong>
                  　— 複数回に分けてポジションを構築
                </span>
              </li>
            </ul>

            <h3 className="text-base sm:text-lg font-semibold mt-10 mb-4 text-cyan-300">
              SWITCHING（ポジション転換）
            </h3>
            <p className="text-[15px] leading-[2.0] text-gray-200 mb-4">
              方向シグナルが連続した場合は、即座にポジションを転換します。
            </p>
            <p className="text-[15px] leading-[2.0] text-gray-200 mb-6">
              損切りは直近の安値/高値を基準に設定します。
            </p>

            <h2 className="text-lg sm:text-xl font-bold mt-12 mb-6 text-white border-l-2 border-cyan-500 pl-3">
              第4章：実戦ガイド
            </h2>

            <h3 className="text-base sm:text-lg font-semibold mt-8 mb-4 text-cyan-300">
              TradingView 設定
            </h3>
            <ol className="my-5 space-y-2.5 pl-5 list-decimal text-[15px] leading-relaxed text-gray-200 marker:text-cyan-500">
              <li>TradingViewにログイン</li>
              <li>「インジケーター」メニューから「招待専用スクリプト」を開く</li>
              <li>「Hado Signal Research」を有効化</li>
            </ol>

            <h3 className="text-base sm:text-lg font-semibold mt-10 mb-4 text-cyan-300">
              ウォッチリスト設定
            </h3>
            <div className="overflow-x-auto my-6 border border-white/10 rounded-lg">
              <table className="w-full text-sm">
                <thead className="bg-white/[0.04]">
                  <tr>
                    <th className="px-4 py-3 text-left text-cyan-400 font-semibold">
                      通貨ペア
                    </th>
                    <th className="px-4 py-3 text-left text-cyan-400 font-semibold">
                      データソース
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  <tr>
                    <td className="px-4 py-3 text-gray-200">BTC / ETH</td>
                    <td className="px-4 py-3 text-gray-300">USDT.P（Bybit）</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-200">
                      USDJPY / XAUUSD / NIKKEI225
                    </td>
                    <td className="px-4 py-3 text-gray-300">OANDA</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-lg sm:text-xl font-bold mt-12 mb-6 text-white border-l-2 border-cyan-500 pl-3">
              第5章：最終チェックリスト
            </h2>
            <p className="text-[15px] leading-[2.0] text-gray-200 mb-4">
              トレード開始前に、以下を必ず確認してください。
            </p>
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-5 my-6 space-y-2">
              <p className="text-emerald-300 leading-relaxed text-sm">
                ☐ アラート設定完了
              </p>
              <p className="text-emerald-300 leading-relaxed text-sm">
                ☐ SL / TP 設定済み
              </p>
              <p className="text-emerald-300 leading-relaxed text-sm">
                ☐ 追いエントリー禁止を確認
              </p>
              <p className="text-emerald-300 leading-relaxed text-sm">
                ☐ SWITCHING原則を理解・遵守
              </p>
            </div>

            <h2 className="text-lg sm:text-xl font-bold mt-12 mb-6 text-white border-l-2 border-cyan-500 pl-3">
              まとめ
            </h2>
            <p className="text-[15px] leading-[2.0] text-gray-200 mb-4">
              波動シグナルインジケーターのトレードは非常にシンプルです。
            </p>
            <div className="bg-cyan-500/[0.07] border border-cyan-500/20 rounded-xl p-5 my-6">
              <p className="text-base font-semibold text-cyan-300 leading-relaxed text-center">
                「シグナルに従う → SLを守る → TPで分割利確する」
              </p>
            </div>
            <p className="text-[15px] leading-[2.0] text-gray-200 mb-4">
              感情を捨て、ルールを守ることが勝ち続ける唯一の道です。
            </p>
          </div>
        </article>

        <nav className="mt-16 pt-8 border-t border-white/10">
          <Link
            href="/guide/discord"
            className="group block border border-white/10 rounded-lg p-4 hover:border-cyan-500/30 hover:bg-white/[0.03] transition-all duration-300"
          >
            <span className="text-xs text-gray-500 block mb-1">
              関連ガイド &rarr;
            </span>
            <span className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">
              Discord参加 &amp; シグナル通知設定マニュアル
            </span>
          </Link>
        </nav>
      </div>
    </main>
  );
}
