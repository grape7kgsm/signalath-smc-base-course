"use client";

interface OfferContentProps {
  axonLink: string;
  discordLink: string;
}

export default function OfferContent({ axonLink, discordLink }: OfferContentProps) {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-gray-100">
      {/* Hero */}
      <section className="relative overflow-hidden py-16 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-transparent" />
        <div className="relative max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            波動シグナルインジケーター
            <br />
            <span className="text-blue-400">無料申請ガイド</span>
          </h1>
          <p className="text-gray-400 text-sm">
            ※作業時間は平均20分ほどです。スマホ・PCどちらでも申請可能です。
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 pb-20 space-y-12">
        {/* Flow Overview */}
        <section className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4 text-blue-400">受け取りまでの流れ（5ステップ）</h2>
          <div className="space-y-3 text-sm">
            {[
              "専用リンクからAxon口座を開設\n※必ず専用リンクから登録（それ以外は対象外）",
              "本人確認を完了\n（通常1営業日以内）",
              "口座の利用準備を完了\n※準備が完了していない場合、承認不可",
              "必要IDを確認\n・MT5口座番号\n・TradingView ID\n・Discord ID",
              "Discord参加 → 申請フォーム送信",
            ].map((text, i) => (
              <div key={i} className="flex gap-3">
                <span className="shrink-0 w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold">
                  {i + 1}
                </span>
                <p className="whitespace-pre-line text-gray-300">{text}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-gray-500 border-t border-gray-800 pt-3">
            承認後、TradingViewにインジケーターが付与されます（通常24時間以内）
          </p>
        </section>

        {/* STEP 1 */}
        <section>
          <StepHeader num={1} title="Axon Markets について" />
          <div className="mt-4 space-y-3 text-sm text-gray-300">
            <p>波動シグナル研究所では、取引所として Axon Markets を使用します。</p>
            <ul className="space-y-1.5 list-none">
              {[
                "MT5（MetaTrader5）対応：PC・スマホどちらでもスムーズに取引可能",
                "最大レバレッジ 1:1000：少ない資金でも効率的なトレードが可能",
                "FX / ゴールド / 仮想通貨対応：相場に合わせて柔軟にトレード可能",
                "日本語サポート対応：初心者でも安心して利用可能",
                "口座開設のみで準備完了：すぐに取引を始められる",
                "資金はそのままトレードに使用可能：無駄なコストが発生しない",
                "維持費なし：使わなくても月額費用ゼロ",
              ].map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-blue-400 shrink-0">-</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* STEP 2 */}
        <section>
          <StepHeader num={2} title="専用リンクからAxon Markets口座を開設する" />
          <div className="mt-4 space-y-4">
            <div className="bg-red-950/30 border border-red-800/50 rounded-xl p-4">
              <p className="text-red-400 text-sm font-bold">
                【重要】必ず以下の専用リンクから開設してください。通常のリンクから開設した場合、インジケーターの付与ができません。
              </p>
            </div>
            <a
              href={axonLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-blue-600 hover:bg-blue-500 text-white text-center font-bold py-4 rounded-xl transition-colors text-lg"
            >
              Axon Markets 口座開設はこちら
            </a>

            <div className="space-y-6 text-sm text-gray-300">
              <h3 className="text-lg font-bold text-white mt-8">口座開設 & 本人確認の流れ</h3>

              <StepDetail
                title="開設ページを開く"
                desc="上のボタンをクリックして、Axon Markets の口座開設ページを開きましょう。"
              />
              <StepDetail
                title="個人情報を入力"
                desc="名前（ローマ字）、居住国、メールアドレス、パスワード（英数字8文字以上）、電話番号を入力。利用規約に同意して「口座開設」を押してください。"
              />
              <StepDetail
                title="メール認証"
                desc="画面右上の「メールを認証」ボタンを押し、届いたメール内の「メール認証」をクリック。迷惑メールフォルダも確認してください。"
              />
              <StepDetail
                title="アドバンス設定（質問票）"
                desc="生年月日、国籍、住所（ローマ字で入力）、取引経験、資金の出どころなどを順に入力していきます。"
              />
              <StepDetail
                title="本人確認書類 & セルフィー認証"
                desc="運転免許証・パスポート・マイナンバーカードのいずれかを撮影してアップロード。続いて顔認証を行います。"
              />
              <StepDetail
                title="プロ設定（住所証明）"
                desc="プロにアップグレードを選択し、住民証明の書類をアップロードします。"
              />
            </div>

            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 text-sm text-gray-300 space-y-2">
              <p className="font-bold text-white">入金について</p>
              <p>
                口座開設後、取引のための最低30,000円（220 USD相当）の入金が必要です。
                <br />
                ※入金確認後、インジケーターが付与されます。
              </p>
              <p className="text-gray-500">
                入金方法はAxon Marketsのマイページから確認できます（銀行送金、クレジットカード、仮想通貨等に対応）。
              </p>
            </div>
          </div>
        </section>

        {/* STEP 3 */}
        <section>
          <StepHeader num={3} title="口座番号を確認する" />
          <div className="mt-4 text-sm text-gray-300 space-y-3">
            <p>口座開設が完了したら、Axon Markets のマイページにログインし、口座番号（MT5 ID）を確認してください。</p>
            <ul className="space-y-1.5 list-none">
              <li className="flex gap-2"><span className="text-blue-400">1.</span> Axon Markets のマイページにログイン</li>
              <li className="flex gap-2"><span className="text-blue-400">2.</span> 「口座一覧」から MT5 口座番号を確認</li>
              <li className="flex gap-2"><span className="text-blue-400">3.</span> 口座番号をメモ（申請フォームで入力します）</li>
            </ul>
            <p className="text-gray-500 text-xs">※口座番号は口座開設完了時のメールにも記載されています。</p>
          </div>
        </section>

        {/* STEP 4 */}
        <section>
          <StepHeader num={4} title="TradingView ID を確認する" />
          <div className="mt-4 text-sm text-gray-300 space-y-3">
            <p>波動シグナル・インジケーターはTradingView上で動作します。付与のためにユーザー名が必要です。</p>
            <ul className="space-y-1.5 list-none">
              <li className="flex gap-2"><span className="text-blue-400">1.</span> TradingView にログイン</li>
              <li className="flex gap-2"><span className="text-blue-400">2.</span> 右上のプロフィールアイコンをクリック</li>
              <li className="flex gap-2"><span className="text-blue-400">3.</span> 「@」から始まるユーザー名 = TradingView ID</li>
            </ul>
            <p className="text-gray-500 text-xs">
              ※アカウントをお持ちでない方は無料プランで作成してください。有料プランは不要です。
            </p>
          </div>
        </section>

        {/* STEP 5 */}
        <section>
          <StepHeader num={5} title="Discord に参加し、Discord ID を確認する" />
          <div className="mt-4 space-y-4">
            <p className="text-sm text-gray-300">
              インジケーターの承認やサポートはすべて Discord 上で行います。まずは「波動シグナル研究所」のサーバーに参加してください。
            </p>
            <a
              href={discordLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-[#5865F2] hover:bg-[#4752C4] text-white text-center font-bold py-4 rounded-xl transition-colors text-lg"
            >
              Discord サーバーに参加する
            </a>
            <div className="text-sm text-gray-300 space-y-1.5">
              <p className="font-bold text-white">Discord ID の確認方法</p>
              <ul className="space-y-1 list-none">
                <li className="flex gap-2"><span className="text-blue-400">1.</span> Discord アプリを開く</li>
                <li className="flex gap-2"><span className="text-blue-400">2.</span> 左下の自分のユーザー名を確認</li>
                <li className="flex gap-2"><span className="text-blue-400">3.</span> クリックでコピー可能</li>
              </ul>
            </div>
          </div>
        </section>

        {/* STEP 6 */}
        <section>
          <StepHeader num={6} title="インジケーター申請フォームを入力する" />
          <div className="mt-4 text-sm text-gray-300 space-y-4">
            <p>Discord内の「指標承認センター」チャンネルにある申請フォームに必要情報を入力してください。</p>
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 space-y-2">
              <p className="font-bold text-white">申請フォームの入力項目</p>
              <ul className="space-y-1 list-none">
                {["お名前", "メールアドレス", "取引所：Axon Markets", "Axon Markets 口座番号（MT5 ID）", "TradingView ID（@から始まるユーザー名）", "Discord ID"].map((item, i) => (
                  <li key={i} className="flex gap-2"><span className="text-blue-400">-</span>{item}</li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 space-y-2">
              <p className="font-bold text-white">申請後の流れ</p>
              <ul className="space-y-1 list-none">
                <li className="flex gap-2"><span className="text-blue-400">1.</span> 運営が口座情報・入金状況を確認</li>
                <li className="flex gap-2"><span className="text-blue-400">2.</span> TradingView上でインジケーターのアクセス権が付与</li>
                <li className="flex gap-2"><span className="text-blue-400">3.</span> Discordで承認完了のお知らせ</li>
              </ul>
              <p className="text-gray-500 text-xs">※通常24時間以内に承認が完了します。</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4 text-blue-400">よくある質問</h2>
          <div className="space-y-4 text-sm">
            <FaqItem
              q="既に他の証券会社の口座を持っていますが、その口座で申請できますか？"
              a="いいえ、波動シグナルのインジケーターはAxon Markets専用です。必ず専用リンクから口座を開設してください。"
            />
            <FaqItem
              q="TradingViewの有料プランは必要ですか？"
              a="いいえ、無料プラン（Basic）で問題ありません。"
            />
            <FaqItem
              q="申請からどのくらいでインジケーターが使えますか？"
              a="通常24時間以内に承認が完了します。"
            />
            <FaqItem
              q="入金した資金はそのまま取引に使えますか？"
              a="はい、入金した資金はそのままトレードの軍資金としてご利用いただけます。利用料として差し引かれることはありません。"
            />
            <FaqItem
              q="サポートが必要な場合は？"
              a="Discordの「指標承認センター」チャンネルでお気軽にご質問ください。"
            />
          </div>
        </section>

        {/* Notes */}
        <section className="text-xs text-gray-500 space-y-1.5 border-t border-gray-800 pt-6">
          <p className="font-bold text-gray-400">注意事項</p>
          <ul className="space-y-1 list-none">
            <li>- 必ず専用リンクから口座を開設してください。通常のリンクからの開設ではインジケーターを付与できません</li>
            <li>- 最低入金額（30,000円 / 220 USD）未満の場合、承認ができません</li>
            <li>- 申請フォームの入力内容に誤りがあると、承認が遅れる場合があります</li>
            <li>- インジケーターは個人利用専用です。第三者への譲渡・共有は禁止です</li>
          </ul>
          <p className="mt-4">ご不明な点はDiscordの「指標承認センター」チャンネルでお問い合わせください。</p>
        </section>
      </div>
    </main>
  );
}

function StepHeader({ num, title }: { num: number; title: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-gray-800 pb-3">
      <span className="shrink-0 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-lg">
        {num}
      </span>
      <h2 className="text-lg font-bold">STEP {num} | {title}</h2>
    </div>
  );
}

function StepDetail({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-gray-900/30 border border-gray-800/50 rounded-lg p-3">
      <p className="font-bold text-white text-sm mb-1">{title}</p>
      <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <div>
      <p className="font-bold text-gray-200">Q. {q}</p>
      <p className="text-gray-400 mt-1">A. {a}</p>
    </div>
  );
}
