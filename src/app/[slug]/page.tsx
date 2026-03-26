import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAllContents,
  getContentBySlug,
  getAdjacentContents,
} from "@/lib/contents";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllContents().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = getContentBySlug(slug);
  if (!content) return {};
  return {
    title: content.title,
    description: content.summary,
  };
}

function renderBody(text: string) {
  const paragraphs = text.split("\n\n");
  return paragraphs.map((p, i) => {
    const boldMatch = p.match(/^\*\*(.+?)\*\*$/);
    if (boldMatch) {
      return (
        <h2
          key={i}
          className="text-lg sm:text-xl font-bold mt-10 mb-4 text-white"
        >
          {boldMatch[1]}
        </h2>
      );
    }

    const headingContent = p.match(/^\*\*(.+?)\*\*\n([\s\S]+)$/);
    if (headingContent) {
      return (
        <div key={i}>
          <h2 className="text-lg sm:text-xl font-bold mt-10 mb-4 text-white">
            {headingContent[1]}
          </h2>
          <p className="text-base leading-relaxed text-gray-400 mb-4">
            {headingContent[2]}
          </p>
        </div>
      );
    }

    if (p.startsWith("【図解】")) {
      return (
        <div
          key={i}
          className="bg-white/5 border border-white/10 rounded-lg p-4 my-6 text-sm text-gray-500 italic"
        >
          {p}
        </div>
      );
    }

    return (
      <p key={i} className="text-base leading-relaxed text-gray-400 mb-4">
        {p}
      </p>
    );
  });
}

export default async function ContentPage({ params }: PageProps) {
  const { slug } = await params;
  const content = getContentBySlug(slug);
  if (!content) notFound();

  const { prev, next } = getAdjacentContents(slug);

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
        <div className="mb-8">
          <Link
            href="/courses"
            className="text-sm text-gray-500 hover:text-cyan-400 transition-colors"
          >
            &larr; 講座一覧に戻る
          </Link>
        </div>

        <article>
          <div className="mb-8">
            <span
              className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full mb-3 border ${
                content.category === "特典"
                  ? "border-orange-500/30 text-orange-400 bg-orange-500/10"
                  : "border-cyan-500/30 text-cyan-400 bg-cyan-500/10"
              }`}
            >
              {content.category}
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold leading-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              {content.title}
            </h1>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-10 space-y-2 text-sm">
            <p>
              <span className="font-medium text-cyan-400/70">学習目標：</span>
              <span className="text-gray-300">{content.learningGoal}</span>
            </p>
            <p>
              <span className="font-medium text-cyan-400/70">キーワード：</span>
              <span className="text-gray-500">{content.keywords}</span>
            </p>
          </div>

          <div className="prose-custom">
            {content.body.map((block, i) => (
              <div key={i}>{renderBody(block)}</div>
            ))}
          </div>
        </article>

        <nav className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            {prev ? (
              <Link
                href={`/${prev.slug}`}
                className="group flex-1 border border-white/10 rounded-lg p-4 hover:border-cyan-500/30 hover:bg-white/[0.03] transition-all duration-300"
              >
                <span className="text-xs text-gray-500 block mb-1">
                  &larr; 前の章
                </span>
                <span className="text-sm font-medium line-clamp-1 text-gray-300 group-hover:text-white transition-colors">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
            {next ? (
              <Link
                href={`/${next.slug}`}
                className="group flex-1 border border-white/10 rounded-lg p-4 hover:border-cyan-500/30 hover:bg-white/[0.03] transition-all duration-300 text-right"
              >
                <span className="text-xs text-gray-500 block mb-1">
                  次の章 &rarr;
                </span>
                <span className="text-sm font-medium line-clamp-1 text-gray-300 group-hover:text-white transition-colors">
                  {next.title}
                </span>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
          </div>
        </nav>
      </div>
    </main>
  );
}
