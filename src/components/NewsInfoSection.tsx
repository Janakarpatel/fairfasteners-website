'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { getNewsItems } from '@/lib/news';
import Image from 'next/image';

const ease = [0.16, 1, 0.3, 1] as const;

function formatDate(iso: string) {
  const [y, m, d] = iso.split('-');
  if (!y || !m || !d) return iso;
  return `${y}-${m}-${d}`;
}

export default function NewsInfoSection({
  title = 'News',
  subtitle = 'News & information',
  limit = 5,
}: {
  title?: string;
  subtitle?: string;
  limit?: number;
}) {
  const reduce = useReducedMotion();
  const items = useMemo(() => getNewsItems().slice(0, limit), [limit]);
  const featured = items[0];
  const rest = items.slice(1, 4);

  return (
    <section className="bg-brand-surface font-sans">
      <div className="mx-auto w-full max-w-7xl px-0 py-20">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <p className="font-jetbrains text-[0.7rem] uppercase tracking-[0.14em] text-brand-secondary/60">
              {title}
            </p>
            <h2 className="mt-3 text-4xl leading-[1.05] tracking-tight text-brand-secondary md:text-5xl">
              {subtitle}
            </h2>
            <p className="mt-4 max-w-xl text-sm font-light leading-relaxed text-brand-secondary/75 md:text-base">
              Latest updates. Read the full stories in the{' '}
              <Link
                href="/news"
                className="font-medium text-brand-secondary underline decoration-brand-secondary/30 underline-offset-4 transition hover:decoration-brand-secondary motion-reduce:transition-none"
              >
                newsroom
              </Link>
              .
            </p>
          </div>

          <Link
            href="/news"
            className="font-jetbrains text-[0.75rem] uppercase tracking-[0.12em] text-brand-secondary/70 transition hover:text-brand-secondary motion-reduce:transition-none"
          >
            View all →
          </Link>
        </div>

        <motion.div
          className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-12"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: reduce ? 0 : 0.6, ease }}
        >
          {featured ? (
            <article className="group relative overflow-hidden border border-brand-secondary/15 bg-white/45 backdrop-blur-sm md:col-span-7 lg:col-span-8">
              {featured.image ? (
                <div className="absolute inset-0" aria-hidden>
                  <Image
                    src={featured.image}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className="object-cover"
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                  />
                  <div className="absolute inset-0 bg-black/35" />
                  <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/70 via-black/35 to-transparent" />
                </div>
              ) : null}
              <Link
                href={featured.href ?? `/news/${featured.slug}`}
                className={[
                  'relative block p-7 transition-colors motion-reduce:transition-none md:p-8',
                  featured.image ? 'hover:bg-black/10' : 'hover:bg-white/60',
                ].join(' ')}
                aria-label={`Read: ${featured.title}`}
              >
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <p
                    className={[
                      'font-jetbrains text-[0.6875rem] uppercase tracking-[0.12em]',
                      featured.image ? 'text-white/80' : 'text-brand-secondary/55',
                    ].join(' ')}
                  >
                    {formatDate(featured.date)}
                  </p>
                  <span
                    className={[
                      'rounded-full border px-3 py-1 font-jetbrains text-[0.65rem] uppercase tracking-[0.12em]',
                      featured.image
                        ? 'border-white/20 bg-white/10 text-white/85'
                        : 'border-brand-secondary/20 bg-white/40 text-brand-secondary/70',
                    ].join(' ')}
                    aria-label="Latest"
                  >
                    Latest
                  </span>
                  <p
                    className={[
                      'font-jetbrains text-[0.6875rem] uppercase tracking-[0.12em]',
                      featured.image ? 'text-white/75' : 'text-brand-secondary/55',
                    ].join(' ')}
                  >
                    {featured.field}
                  </p>
                </div>

                <h3
                  className={[
                    'mt-5 text-2xl font-medium leading-[1.15] tracking-tight md:text-3xl',
                    featured.image ? 'text-white' : 'text-brand-secondary',
                  ].join(' ')}
                >
                  {featured.title}
                </h3>
                <p
                  className={[
                    'mt-4 max-w-2xl text-sm font-light leading-relaxed md:text-base',
                    featured.image ? 'text-white/80' : 'text-brand-secondary/75',
                  ].join(' ')}
                >
                  {featured.excerpt}
                </p>

                <div
                  className={[
                    'mt-7 inline-flex items-center gap-2 font-jetbrains text-[0.75rem] uppercase tracking-[0.12em]',
                    featured.image ? 'text-white/85' : 'text-brand-secondary/70',
                  ].join(' ')}
                >
                  Read article <span aria-hidden>→</span>
                </div>
              </Link>
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 motion-reduce:transition-none"
                aria-hidden
                style={{
                  background:
                    'radial-gradient(60% 60% at 12% 10%, color-mix(in srgb, var(--brand-primary) 14%, transparent) 0%, transparent 70%), radial-gradient(60% 60% at 88% 70%, color-mix(in srgb, var(--brand-secondary) 10%, transparent) 0%, transparent 70%)',
                }}
              />
            </article>
          ) : null}

          <div className="grid grid-cols-1 gap-6 md:col-span-5 lg:col-span-4">
            {rest.map((item) => (
              <article
                key={item.id}
                className="group relative overflow-hidden border border-brand-secondary/15 bg-white/40 backdrop-blur-sm transition-colors hover:bg-white/60 motion-reduce:transition-none"
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 motion-reduce:transition-none"
                  aria-hidden
                  style={{
                    background:
                      'radial-gradient(60% 60% at 12% 10%, color-mix(in srgb, var(--brand-primary) 12%, transparent) 0%, transparent 70%), radial-gradient(60% 60% at 88% 70%, color-mix(in srgb, var(--brand-secondary) 10%, transparent) 0%, transparent 70%)',
                  }}
                />
                <Link
                  href={item.href ?? `/news/${item.slug}`}
                  className="relative block p-6 md:p-7"
                  aria-label={`Read: ${item.title}`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-jetbrains text-[0.6875rem] uppercase tracking-[0.12em] text-brand-secondary/55">
                      {formatDate(item.date)}
                    </p>
                    <p className="font-jetbrains text-[0.6875rem] uppercase tracking-[0.12em] text-brand-secondary/55">
                      {item.field}
                    </p>
                  </div>
                  <p className="mt-4 text-[1.05rem] font-medium leading-snug tracking-tight text-brand-secondary">
                    {item.title}
                  </p>
                  <p className="mt-2 line-clamp-2 text-sm font-light leading-relaxed text-brand-secondary/75">
                    {item.excerpt}
                  </p>
                </Link>
              </article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

