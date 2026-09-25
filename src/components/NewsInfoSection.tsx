'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useMemo } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { getNewsItems, type NewsItem } from '@/lib/news';

const ease = [0.16, 1, 0.3, 1] as const;

function readMinutes(item: NewsItem) {
  const words = [item.excerpt, ...(item.body ?? [])]
    .join(' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function metaLabel(item: NewsItem) {
  const mins = readMinutes(item);
  return mins >= 3
    ? `${item.field.toUpperCase()} — ${mins} MIN READ`
    : `${item.field.toUpperCase()} — ${mins} MIN`;
}

function StoryCard({
  item,
  featured = false,
}: {
  item: NewsItem;
  featured?: boolean;
}) {
  const href = item.href ?? `/news/${item.slug}`;

  return (
    <article className="group flex min-w-0 flex-col">
      <Link
        href={href}
        className="relative block w-full overflow-hidden bg-white/5 outline-none focus-visible:ring-2 focus-visible:ring-white/40"
        tabIndex={-1}
        aria-hidden
      >
        {/*
          2fr + 1fr + 1fr: sides are taller portrait (3/4); featured 3/2
          shares the same height.
        */}
        <div
          className={
            featured
              ? 'relative aspect-[3/2] w-full'
              : 'relative aspect-[3/4] w-full'
          }
        >
          {item.image ? (
            <Image
              src={item.image}
              alt=""
              fill
              sizes={
                featured
                  ? '(max-width: 768px) 100vw, 50vw'
                  : '(max-width: 768px) 100vw, 25vw'
              }
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(80% 70% at 30% 20%, color-mix(in srgb, var(--brand-primary) 35%, transparent), transparent 60%)',
              }}
            />
          )}
        </div>
      </Link>

      <p className="mt-5 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-white/45">
        {metaLabel(item)}
      </p>

      <Link
        href={href}
        className={
          featured
            ? 'mt-2.5 text-[clamp(1.05rem,1.4vw,1.35rem)] font-semibold leading-[1.3] tracking-tight text-white underline-offset-[6px] transition-[text-decoration-color] duration-300 group-hover:underline group-hover:decoration-white/70'
            : 'mt-2.5 text-[clamp(0.95rem,1.15vw,1.125rem)] font-semibold leading-[1.35] tracking-tight text-white underline-offset-[5px] transition-[text-decoration-color] duration-300 group-hover:underline group-hover:decoration-white/70'
        }
      >
        {item.title}
      </Link>
    </article>
  );
}

export default function NewsInfoSection({
  title = 'News & Stories',
  limit = 3,
}: {
  title?: string;
  subtitle?: string;
  limit?: number;
}) {
  const reduce = useReducedMotion();
  const items = useMemo(() => getNewsItems().slice(0, Math.max(limit, 3)), [limit]);
  const featured = items[0];
  const rest = items.slice(1, 3);

  if (!featured) return null;

  return (
    <section className="bg-transparent font-sans text-white">
      <div className="mx-auto w-full max-w-[1600px] px-6 py-16 md:px-8 md:py-20 lg:px-10 lg:py-24">
        <div className="flex items-end justify-between gap-6">
          <h2 className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-semibold tracking-tight text-white">
            {title}
          </h2>
          <Link
            href="/news"
            className="shrink-0 pb-1 text-[0.8125rem] text-white/75 transition-colors hover:text-white"
          >
            View all
          </Link>
        </div>

        <motion.div
          className="mt-10 grid grid-cols-1 gap-10 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-7"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: reduce ? 0 : 0.65, ease }}
        >
          <StoryCard item={featured} featured />
          {rest.map((item) => (
            <StoryCard key={item.id} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
