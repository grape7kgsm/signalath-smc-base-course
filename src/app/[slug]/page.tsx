import Link from "next/link";
import Image from "next/image";
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

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = getContentBySlug(slug);
  if (!content) return {};
  return {
    title: content.title,
    description: content.summary,
  };
}

function renderInline(text: string) {
  // Handle inline **bold** and 「keyword」
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    const boldMatch = part.match(/^\*\*(.+)\*\*$/);
    if (boldMatch) {
      return (
        <strong key={i} className="text-white font-semibold">
          {boldMatch[1]}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

function renderBlock(block: string, blockIndex: number) {
  const paragraphs = block.split("\n\n");
  return paragraphs.map((p, i) => {
    const key = `${blockIndex}-${i}`;
    const trimmed = p.trim();

    // h2: standalone **bold line**
    const h2Match = trimmed.match(/^\*\*(.+?)\*\*$/);
    if (h2Match) {
      return (
        <h2
          key={key}
          className="text-lg sm:text-xl font-bold mt-14 mb-5 text-white border-l-2 border-cyan-500 pl-3"
        >
          {h2Match[1]}
        </h2>
      );
    }

    // h2 + following text
    const h2Content = trimmed.match(/^\*\*(.+?)\*\*\n([\s\S]+)$/);
    if (h2Content) {
      const rest = h2Content[2];
      return (
        <div key={key}>
          <h2 className="text-lg sm:text-xl font-bold mt-14 mb-5 text-white border-l-2 border-cyan-500 pl-3">
            {h2Content[1]}
          </h2>
          {renderSubContent(rest, key)}
        </div>
      );
    }

    // h3: ### heading
    if (trimmed.startsWith("### ")) {
      return (
        <h3
          key={key}
          className="text-base sm:text-lg font-semibold mt-10 mb-4 text-cyan-300"
        >
          {trimmed.slice(4)}
        </h3>
      );
    }

    // Summary box: starts with 📋
    if (trimmed.startsWith("📋")) {
      return renderSummaryBox(trimmed, key);
    }

    // Warning callout: starts with ⚠️
    if (trimmed.startsWith("⚠️")) {
      return (
        <div
          key={key}
          className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 my-6 text-sm"
        >
          <p className="text-amber-300">{renderInline(trimmed)}</p>
        </div>
      );
    }

    // Check callout: starts with ✅
    if (trimmed.startsWith("✅")) {
      return (
        <div
          key={key}
          className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4 my-6 text-sm"
        >
          <p className="text-emerald-300">{renderInline(trimmed)}</p>
        </div>
      );
    }

    // Comparison block: starts with ⚖️
    if (trimmed.startsWith("⚖️")) {
      return renderCompareBox(trimmed, key);
    }

    // Image: ![alt](/path)
    const imgMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imgMatch) {
      return (
        <div key={key} className="my-6">
          <Image
            src={imgMatch[2]}
            alt={imgMatch[1]}
            width={800}
            height={450}
            className="rounded-lg w-full h-auto"
          />
        </div>
      );
    }

    // Diagram placeholder
    if (trimmed.startsWith("【図解】")) {
      return (
        <div
          key={key}
          className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-4 my-6 text-sm text-gray-400 italic"
        >
          {trimmed}
        </div>
      );
    }

    // Bullet list: all lines start with -
    const lines = trimmed.split("\n");
    if (lines.length === 1) {
      const singleImgMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      if (singleImgMatch) {
        return (
          <div key={key} className="my-6">
            <Image
              src={singleImgMatch[2]}
              alt={singleImgMatch[1]}
              width={800}
              height={450}
              className="rounded-lg w-full h-auto"
            />
          </div>
        );
      }
    }
    if (lines.every((l) => l.startsWith("- "))) {
      return (
        <ul key={key} className="my-5 space-y-2.5 pl-1">
          {lines.map((l, li) => (
            <li
              key={li}
              className="flex items-start gap-2.5 text-[15px] leading-relaxed text-gray-200"
            >
              <span className="text-cyan-500 mt-1.5 flex-shrink-0 text-[8px]">
                ●
              </span>
              <span>{renderInline(l.slice(2))}</span>
            </li>
          ))}
        </ul>
      );
    }

    // Multi-line block containing images → render line by line
    if (lines.length > 1 && trimmed.includes("![")) {
      return (
        <div key={key}>{renderSubContent(trimmed, key)}</div>
      );
    }

    // Regular paragraph
    return (
      <p
        key={key}
        className="text-[15px] leading-[1.9] text-gray-200 mb-5"
      >
        {renderInline(trimmed)}
      </p>
    );
  });
}

function renderSubContent(text: string, parentKey: string) {
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];
  let currentBullets: string[] = [];

  const flushBullets = () => {
    if (currentBullets.length > 0) {
      elements.push(
        <ul
          key={`${parentKey}-ul-${elements.length}`}
          className="my-5 space-y-2.5 pl-1"
        >
          {currentBullets.map((b, bi) => (
            <li
              key={bi}
              className="flex items-start gap-2.5 text-[15px] leading-relaxed text-gray-200"
            >
              <span className="text-cyan-500 mt-1.5 flex-shrink-0 text-[8px]">
                ●
              </span>
              <span>{renderInline(b)}</span>
            </li>
          ))}
        </ul>
      );
      currentBullets = [];
    }
  };

  lines.forEach((line) => {
    if (line.startsWith("- ")) {
      currentBullets.push(line.slice(2));
    } else {
      flushBullets();
      const imgMatch = line.trim().match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      if (imgMatch) {
        elements.push(
          <div key={`${parentKey}-img-${elements.length}`} className="my-6">
            <Image
              src={imgMatch[2]}
              alt={imgMatch[1]}
              width={800}
              height={450}
              className="rounded-lg w-full h-auto"
            />
          </div>
        );
      } else if (line.trim()) {
        elements.push(
          <p
            key={`${parentKey}-p-${elements.length}`}
            className="text-[15px] leading-[1.9] text-gray-200 mb-5"
          >
            {renderInline(line)}
          </p>
        );
      }
    }
  });
  flushBullets();

  return <>{elements}</>;
}

function renderSummaryBox(text: string, key: string) {
  const lines = text.split("\n");
  const title = lines[0].replace("📋", "").trim();
  const items = lines.slice(1).filter((l) => l.startsWith("- "));

  return (
    <div
      key={key}
      className="bg-cyan-500/[0.07] border border-cyan-500/20 rounded-xl p-5 my-8"
    >
      <p className="text-sm font-semibold text-cyan-400 mb-3">{title}</p>
      <ul className="space-y-2">
        {items.map((item, ii) => (
          <li
            key={ii}
            className="flex items-start gap-2 text-sm text-gray-200"
          >
            <span className="text-cyan-500 mt-0.5 flex-shrink-0">▸</span>
            <span>{renderInline(item.slice(2))}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function renderCompareBox(text: string, key: string) {
  const lines = text.split("\n");
  const title = lines[0].replace("⚖️", "").trim();
  const items = lines.slice(1).filter((l) => l.trim());

  return (
    <div
      key={key}
      className="bg-white/[0.03] border border-white/10 rounded-xl p-5 my-8"
    >
      {title && (
        <p className="text-sm font-semibold text-gray-300 mb-3">{title}</p>
      )}
      <div className="space-y-2">
        {items.map((item, ii) => (
          <p key={ii} className="text-sm text-gray-300">
            {renderInline(item)}
          </p>
        ))}
      </div>
    </div>
  );
}

export default async function ContentPage({ params }: PageProps) {
  const { slug } = await params;
  const content = getContentBySlug(slug);
  if (!content) notFound();

  const { prev, next } = getAdjacentContents(slug);

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
            <h1 className="text-2xl sm:text-3xl font-bold leading-tight text-white">
              {content.title}
            </h1>
          </div>

          <div className="bg-white/[0.04] border border-white/10 rounded-lg p-5 mb-12 space-y-3 text-sm">
            <p>
              <span className="font-medium text-cyan-400">学習目標：</span>
              <span className="text-gray-200">{content.learningGoal}</span>
            </p>
            <p>
              <span className="font-medium text-cyan-400">キーワード：</span>
              <span className="text-gray-300">{content.keywords}</span>
            </p>
          </div>

          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 sm:p-8">
            {content.body.map((block, i) => (
              <div key={i}>{renderBlock(block, i)}</div>
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
                <span className="text-sm font-medium line-clamp-1 text-gray-200 group-hover:text-white transition-colors">
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
                <span className="text-sm font-medium line-clamp-1 text-gray-200 group-hover:text-white transition-colors">
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
