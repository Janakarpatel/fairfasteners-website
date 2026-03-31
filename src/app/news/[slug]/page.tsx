import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getNewsBySlug, getNewsItems } from '@/lib/news';

type Props = { params: Promise<{ slug: string }> };

function formatDate(iso: string) {
  const [y, m, d] = iso.split('-');
  if (!y || !m || !d) return iso;
  return `${y}-${m}-${d}`;
}

export function generateStaticParams() {
  return getNewsItems().map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getNewsBySlug(slug);
  if (!item) return { title: 'News — Fair Fasteners' };
  return {
    title: `${item.title} — Fair Fasteners`,
    description: item.excerpt,
  };
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const item = getNewsBySlug(slug);
  if (!item) notFound();

  return (
    <main className="bg-brand-surface font-sans">
      <div className="mx-auto w-full max-w-4xl px-6 py-16 md:px-8 lg:px-10">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/news"
            className="font-jetbrains text-[0.6875rem] uppercase tracking-[0.12em] text-brand-secondary/70 transition hover:text-brand-secondary motion-reduce:transition-none"
          >
            ← Back to News
          </Link>
          <p className="font-jetbrains text-[0.6875rem] uppercase tracking-[0.12em] text-brand-secondary/55">
            {item.field} · {formatDate(item.date)}
          </p>
        </div>

        <h1 className="mt-6 text-4xl leading-[1.05] tracking-tight text-brand-secondary md:text-5xl">
          {item.title}
        </h1>
        <p className="mt-4 text-base font-light leading-relaxed text-brand-secondary/75 md:text-lg">
          {item.excerpt}
        </p>

        {item.image ? (
          <div className="mt-10 overflow-hidden border border-brand-secondary/15 bg-white/30">
            <div className="relative aspect-[16/9]">
              <Image
                src={item.image}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 768px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        ) : null}

        <article className="mt-10 space-y-6 text-[0.975rem] font-light leading-relaxed text-brand-secondary/85 md:text-[1.0625rem]">
          {(item.body?.length ? item.body : []).map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </article>
      </div>
    </main>
  );
}

