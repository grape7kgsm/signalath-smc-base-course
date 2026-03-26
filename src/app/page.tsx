import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="max-w-2xl text-center">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          波動シグナル研究所
        </h1>
        <p className="text-lg text-gray-600 mb-2">
          リスクリワード最大化トレード術
        </p>
        <p className="text-sm text-gray-500 mb-8">
          SMC（スマートマネーコンセプト）を基礎から実践まで、全14章で完全解説
        </p>
        <Link
          href="/contents"
          className="inline-block bg-gray-900 text-white px-8 py-3 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
        >
          講座を見る
        </Link>
      </div>
    </main>
  );
}
