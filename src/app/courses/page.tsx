import Link from "next/link";
import type { Metadata } from "next";
import { getAllContents } from "@/lib/contents";

export const metadata: Metadata = {
  title: "講座一覧",
  description:
    "SMC（スマートマネーコンセプト）を基礎から実践まで学べる全14章の講座一覧。",
};

export default function CoursesPage() {
  const contents = getAllContents();
  const mainContents = contents.filter((c) => c.category === "本編");
  const bonusContents = contents.filter((c) => c.category === "特典");

  return (
    <main className="max-w-3xl mx-auto px-4 py-12 sm:py-16">
      <div className="mb-10">
        <Link
          href="/"
          className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          &larr; ホームに戻る
        </Link>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold mb-2">講座一覧</h1>
      <p className="text-gray-500 text-sm mb-10">
        全{contents.length}章 &mdash; SMCの基礎から実践まで
      </p>

      <section className="mb-12">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">本編</h2>
        <div className="space-y-3">
          {mainContents.map((item) => (
            <Link
              key={item.slug}
              href={`/${item.slug}`}
              className="block border border-gray-200 rounded-lg p-4 hover:border-gray-400 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
                  {item.chapterNumber}
                </span>
                <div className="min-w-0">
                  <h3 className="font-medium text-sm sm:text-base leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {item.summary}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4 text-gray-800">特典</h2>
        <div className="space-y-3">
          {bonusContents.map((item) => (
            <Link
              key={item.slug}
              href={`/${item.slug}`}
              className="block border border-orange-200 rounded-lg p-4 hover:border-orange-400 hover:bg-orange-50 transition-colors"
            >
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-sm font-medium text-orange-600">
                  {item.chapterNumber}
                </span>
                <div className="min-w-0">
                  <h3 className="font-medium text-sm sm:text-base leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {item.summary}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
