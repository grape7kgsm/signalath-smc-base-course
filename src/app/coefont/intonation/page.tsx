import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CoeFont辞書 略語読みチェック 台本",
  description: "FX/投資用語の略語読み確認用テスト台本 (CoeFontユーザー辞書検証)",
};

const script = `本日は、スマートマネーコンセプトの実戦的な使い方を解説します。

まずHTFでUSDJPYのチャートを開き、直近の高値を抜けたBOSを確認します。そのあとLTFに切り替えて、CHoCHによるトレンド転換のサインを読み取りましょう。MTFで環境認識を固めることが、SMCの基本です。

相場がPOIに到達したら、FVGの埋めを待ちます。BSLとSSLの位置関係を整理して、OBが機能しているかを見極めてください。MSBが確定した方向にエントリーするのが王道です。IOFを追いかけると、ICTの教えに沿った判断ができます。

テクニカル指標も補助として使います。MACDのクロスと、RSIのダイバージェンスを併用。ATRでボラティリティを測定し、VWAPで平均価格帯の反発を狙います。OBV、ADX、EMA、SMA、CCI、DMI、PSARも場面によって有効です。

経済指標では、FOMCとCPIの発表がもっとも影響が大きいですね。PCE、PPI、NFP、ISM、GDP、JOLTS、ADP、ECIも追いかけてください。中央銀行では、FEDの利上げ見通し、ECBの声明、BOJの為替介入、BOE、RBA、RBNZ、SNB、PBOC、BOCの動向を注視します。

通貨ペアは、EURUSD、GBPUSD、AUDUSD、NZDUSD、USDCAD、USDCHF、EURJPY、GBPJPY、EURGBPを主戦場にしましょう。商品市場ではXAUUSD、XAGUSD、WTI。株価指数はNASDAQ、SP500、DOW、VIX、DXY。暗号資産はBTC、ETH、USDT、SOL、XRP、BNBをチェックします。

ツールはTradingViewが中心で、補助的にMT4、MT5、cTraderを使い分けます。株式分析ではEPS、PER、PBR、ROE、ROA、DCF、EVを確認。規制面ではSEC、CFTC、FSA、IMF、BIS、OECDの動きも頭に入れておきましょう。

以上で略語読み上げチェックを終わります。`;

export default function Page() {
  return (
    <main className="min-h-screen px-6 py-12 max-w-3xl mx-auto">
      <header className="mb-10">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          CoeFont辞書 略語読みチェック 台本
        </h1>
        <p className="text-sm text-gray-400">
          FX/投資用語の略語読み確認用テスト台本。約60の英字略語を自然文に埋め込み、CoeFontユーザー辞書の読み方を検証する目的で使用。
        </p>
      </header>
      <article className="whitespace-pre-wrap leading-relaxed text-[15px] md:text-base text-gray-100 font-sans selection:bg-yellow-500/30">
        {script}
      </article>
      <footer className="mt-12 pt-6 border-t border-gray-800 text-xs text-gray-500">
        最終更新: 2026-04-24 / 波動シグナル研究所
      </footer>
    </main>
  );
}
