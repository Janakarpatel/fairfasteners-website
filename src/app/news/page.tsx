import Link from 'next/link';
import Image from 'next/image';
import BackNav from '@/components/BackNav';
import PageContainer from '@/components/PageContainer';
import { getNewsItems } from '@/lib/news';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'News',
  description:
    'News and field stories from Fair Fasteners on industrial fastener supply, coatings, kitting, and project hardware.',
  path: '/news',
});

function formatDate(iso: string) {
  const [y, m, d] = iso.split('-');
  if (!y || !m || !d) return iso;
  return `${y}-${m}-${d}`;
}

export default function NewsPage() {
  const items = getNewsItems();

  return (
    <main className="bg-transparent font-sans text-white">
      <PageContainer>
        <BackNav href="/" label="Back to home" className="mb-10" />
        <div className="max-w-3xl">
          <p className="font-jetbrains text-[0.7rem] uppercase tracking-[0.14em] text-white/55">
            News
          </p>
          <h1 className="mt-3 text-5xl leading-[1.02] tracking-tight text-white md:text-6xl">
            Solutions in the field
          </h1>
          <p className="mt-4 text-sm font-light leading-relaxed text-white/65 md:text-base">
            Articles are managed in{' '}
            <code className="font-medium text-white/85">src/data/news.json</code>.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.id}
              className="group relative overflow-hidden border border-white/12 bg-white/[0.06] backdrop-blur-sm transition-colors hover:border-white/25 hover:bg-white/[0.1] motion-reduce:transition-none"
            >
              <Link href={item.href ?? `/news/${item.slug}`} className="absolute inset-0 z-10">
                <span className="sr-only">Read {item.title}</span>
              </Link>

              {item.image ? (
                <div className="relative aspect-[16/9] border-b border-white/10">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] motion-reduce:transition-none"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ) : null}

              <div className="p-6">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-jetbrains text-[0.6875rem] uppercase tracking-[0.12em] text-white/55">
                    {item.field}
                  </p>
                  <p className="font-jetbrains text-[0.6875rem] uppercase tracking-[0.12em] text-white/45">
                    {formatDate(item.date)}
                  </p>
                </div>
                <h2 className="mt-4 text-xl font-medium leading-snug tracking-tight text-white underline-offset-[5px] transition-[text-decoration-color] duration-300 group-hover:underline group-hover:decoration-white/70">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm font-light leading-relaxed text-white/65">
                  {item.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>
      </PageContainer>
    </main>
  );
}
