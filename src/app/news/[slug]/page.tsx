import Image from 'next/image';
import BackNav from '@/components/BackNav';
import PageContainer from '@/components/PageContainer';
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
      <PageContainer width="narrow">
        <BackNav
          href="/news"
          label="Back to news"
          className="mb-8"
          trailing={
            <p className="font-jetbrains text-[0.6875rem] uppercase tracking-[0.12em] text-brand-secondary/55">
              {item.field} · {formatDate(item.date)}
            </p>
          }
        />

        <h1 className="text-4xl leading-[1.05] tracking-tight text-brand-secondary md:text-5xl">
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
      </PageContainer>
    </main>
  );
}

