import Link from 'next/link';
import Image from 'next/image';
import { getNewsItems } from '@/lib/news';

export const metadata = {
  title: 'News — Fair Fasteners',
  description: 'Updates and stories from solutions in the field.',
};

function formatDate(iso: string) {
  const [y, m, d] = iso.split('-');
  if (!y || !m || !d) return iso;
  return `${y}-${m}-${d}`;
}

export default function NewsPage() {
  const items = getNewsItems();

  return (
    <main className="bg-brand-surface font-sans">
      <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-8 lg:px-10">
        <div className="max-w-3xl">
          <p className="font-jetbrains text-[0.7rem] uppercase tracking-[0.14em] text-brand-secondary/60">
            News
          </p>
          <h1 className="mt-3 text-5xl leading-[1.02] tracking-tight text-brand-secondary md:text-6xl">
            Solutions in the field
          </h1>
          <p className="mt-4 text-sm font-light leading-relaxed text-brand-secondary/75 md:text-base">
            Articles are managed in{' '}
            <code className="font-medium text-brand-secondary">src/data/news.json</code>.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.id}
              className="group relative overflow-hidden border border-brand-secondary/20 bg-white/50 backdrop-blur-sm transition-colors hover:border-brand-secondary/35 motion-reduce:transition-none"
            >
              <Link href={item.href ?? `/news/${item.slug}`} className="absolute inset-0 z-10">
                <span className="sr-only">Read {item.title}</span>
              </Link>

              {item.image ? (
                <div className="relative aspect-[16/9] border-b border-brand-secondary/15">
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
                  <p className="font-jetbrains text-[0.6875rem] uppercase tracking-[0.12em] text-brand-secondary/65">
                    {item.field}
                  </p>
                  <p className="font-jetbrains text-[0.6875rem] uppercase tracking-[0.12em] text-brand-secondary/55">
                    {formatDate(item.date)}
                  </p>
                </div>
                <h2 className="mt-4 text-xl font-medium leading-snug tracking-tight text-brand-secondary">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm font-light leading-relaxed text-brand-secondary/75">
                  {item.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

