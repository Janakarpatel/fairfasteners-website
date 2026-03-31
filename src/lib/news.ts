import rawNews from '@/data/news.json';

export type NewsItem = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO yyyy-mm-dd
  field: string;
  tags?: string[];
  body?: string[];
  href?: string;
  image?: string;
};

function isNewsItem(x: unknown): x is NewsItem {
  if (!x || typeof x !== 'object') return false;
  const v = x as Record<string, unknown>;
  return (
    typeof v.id === 'string' &&
    typeof v.slug === 'string' &&
    typeof v.title === 'string' &&
    typeof v.excerpt === 'string' &&
    typeof v.date === 'string' &&
    typeof v.field === 'string'
  );
}

export function getNewsItems(): NewsItem[] {
  const list = Array.isArray(rawNews) ? rawNews : [];
  const items = list.filter(isNewsItem);
  items.sort((a, b) => b.date.localeCompare(a.date));
  return items;
}

export function getNewsFields(items: NewsItem[]): string[] {
  const s = new Set<string>();
  for (const it of items) s.add(it.field);
  return Array.from(s).sort((a, b) => a.localeCompare(b));
}

export function getNewsBySlug(slug: string): NewsItem | undefined {
  return getNewsItems().find((i) => i.slug === slug);
}

