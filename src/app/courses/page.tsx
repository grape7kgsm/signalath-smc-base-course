import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getAllContents } from "@/lib/contents";

export const metadata: Metadata = {
  title: "講座一覧",
  description:
    "SMC（スマートマネーコンセプト）を基礎から実践まで学べる全15章の講座一覧。",
};

function thumbnailPath(chapterNumber: number): string {
  const n = String(chapterNumber).padStart(2, "0");
  // next/image's optimizer doesn't prepend basePath when fetching the source;
  // include it explicitly so the file resolves under /freecontents/images/...
  return `/freecontents/images/thumbnails/chapter-${n}.png`;
}

export default function CoursesPage() {
  const contents = getAllContents();
  const mainContents = contents.filter((c) => c.category === "本編");
  const bonusContents = contents.filter((c) => c.category === "特典");

  return (
    <main className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
      {/* Grid background */}
      <div
        className="fixed inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Radial glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-cyan-500/[0.06] blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12 sm:py-16">
        <div className="mb-10">
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-cyan-400 transition-colors"
          >
            &larr; ホームに戻る
          </Link>
        </div>

        {/* Header */}
        <div className="mb-14 border-b border-white/5 pb-10">
          <div className="inline-flex items-center gap-2 border border-cyan-500/20 bg-cyan-500/[0.03] px-3 py-1 mb-5">
            <span className="w-1.5 h-1.5 bg-cyan-400 animate-pulse" />
            <span className="text-[10px] text-cyan-300 tracking-[0.3em] uppercase font-semibold">
              Full Course {contents.length} Chapters
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold mb-4 text-white tracking-tight leading-[1.1]">
            Smart Money Concept
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              基礎〜実践 完全体系講座
            </span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            機関投資家の思考を読み解き、リスクリワードを最大化する{contents.length}章構成のSMC講座。
            本編{mainContents.length}章 ＋ 特典{bonusContents.length}章、すべて無料で公開。
          </p>
        </div>

        {/* 本編 */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-cyan-400" />
            <h2 className="text-sm font-semibold text-cyan-400 tracking-[0.25em]">
              本編 — CORE CURRICULUM
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {mainContents.map((item) => (
              <Link
                key={item.slug}
                href={`/${item.slug}`}
                className="group block border border-white/10 bg-white/[0.015] hover:border-cyan-400/50 hover:bg-white/[0.03] transition-all duration-300 overflow-hidden"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video bg-black overflow-hidden">
                  <Image
                    src={thumbnailPath(item.chapterNumber)}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  {/* Chapter badge */}
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm border border-cyan-400/40 px-2.5 py-1">
                    <span className="text-[10px] text-cyan-300 tracking-[0.2em] font-semibold">
                      CHAPTER {String(item.chapterNumber).padStart(2, "0")}
                    </span>
                  </div>
                </div>
                {/* Body */}
                <div className="p-4 border-t border-white/5">
                  <h3 className="font-semibold text-sm leading-snug text-gray-100 group-hover:text-white transition-colors mb-2 line-clamp-2 min-h-[2.6em]">
                    {item.title.replace(/^第\d+章(（特典\d+）)?：\s*/, "")}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                    {item.summary}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 特典 */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-orange-400" />
            <h2 className="text-sm font-semibold text-orange-400 tracking-[0.25em]">
              特典 — BONUS CHAPTERS
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {bonusContents.map((item) => (
              <Link
                key={item.slug}
                href={`/${item.slug}`}
                className="group block border border-orange-500/15 bg-white/[0.015] hover:border-orange-400/50 hover:bg-white/[0.03] transition-all duration-300 overflow-hidden"
              >
                <div className="relative aspect-video bg-black overflow-hidden">
                  <Image
                    src={thumbnailPath(item.chapterNumber)}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm border border-orange-400/40 px-2.5 py-1">
                    <span className="text-[10px] text-orange-300 tracking-[0.2em] font-semibold">
                      BONUS {String(item.chapterNumber - 12).padStart(2, "0")}
                    </span>
                  </div>
                </div>
                <div className="p-4 border-t border-white/5">
                  <h3 className="font-semibold text-sm leading-snug text-gray-100 group-hover:text-white transition-colors mb-2 line-clamp-2 min-h-[2.6em]">
                    {item.title.replace(/^第\d+章（特典\d+）：\s*/, "")}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                    {item.summary}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
