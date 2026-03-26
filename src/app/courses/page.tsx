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
    <main className="min-h-screen bg-[#0a0a0f] relative">
      {/* Grid background */}
      <div
        className="fixed inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-12 sm:py-16">
        <div className="mb-10">
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-cyan-400 transition-colors"
          >
            &larr; ホームに戻る
          </Link>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-white">
          講座一覧
        </h1>
        <p className="text-gray-400 text-sm mb-10">
          全{contents.length}章 &mdash; SMCの基礎から実践まで
        </p>

        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-4 text-cyan-400 tracking-wide">本編</h2>
          <div className="space-y-3">
            {mainContents.map((item) => (
              <Link
                key={item.slug}
                href={`/${item.slug}`}
                className="group block border border-white/10 rounded-lg p-4 hover:border-cyan-500/40 hover:bg-white/[0.03] transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-sm font-medium text-cyan-400 group-hover:border-cyan-500/40 transition-colors">
                    {item.chapterNumber}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-medium text-sm sm:text-base leading-snug text-gray-100 group-hover:text-white transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                      {item.summary}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-4 text-orange-400 tracking-wide">特典</h2>
          <div className="space-y-3">
            {bonusContents.map((item) => (
              <Link
                key={item.slug}
                href={`/${item.slug}`}
                className="group block border border-white/10 rounded-lg p-4 hover:border-orange-500/40 hover:bg-white/[0.03] transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-sm font-medium text-orange-400 group-hover:border-orange-500/40 transition-colors">
                    {item.chapterNumber}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-medium text-sm sm:text-base leading-snug text-gray-100 group-hover:text-white transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                      {item.summary}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
