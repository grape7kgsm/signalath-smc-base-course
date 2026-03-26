import contentsData from "../../data/contents.json";

export interface ContentItem {
  slug: string;
  title: string;
  chapterNumber: number;
  category: string;
  summary: string;
  keywords: string;
  learningGoal: string;
  referenceVideos: string;
  body: string[];
}

const contents: ContentItem[] = contentsData as ContentItem[];

export function getAllContents(): ContentItem[] {
  return [...contents].sort((a, b) => a.chapterNumber - b.chapterNumber);
}

export function getContentBySlug(slug: string): ContentItem | undefined {
  return contents.find((c) => c.slug === slug);
}

export function getAdjacentContents(slug: string): {
  prev: ContentItem | null;
  next: ContentItem | null;
} {
  const sorted = getAllContents();
  const index = sorted.findIndex((c) => c.slug === slug);
  return {
    prev: index > 0 ? sorted[index - 1] : null,
    next: index < sorted.length - 1 ? sorted[index + 1] : null,
  };
}
