'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { getNewsFields, getNewsItems } from '@/lib/news';

const ease = [0.16, 1, 0.3, 1] as const;

function formatDate(iso: string) {
  // Keep this deterministic and lightweight (no Intl dependency on runtime locale).
  // iso: yyyy-mm-dd
  const [y, m, d] = iso.split('-');
  if (!y || !m || !d) return iso;
  return `${y}-${m}-${d}`;
}

export default function NewsSection({
  title = 'News',
  subtitle = 'Solutions in the field',
  limit = 6,
}: {
  title?: string;
  subtitle?: string;
  limit?: number;
}) {
  const reduce = useReducedMotion();
  const [activeField, setActiveField] = useState<string>('All');

  const items = useMemo(() => getNewsItems(), []);
  const fields = useMemo(() => ['All', ...getNewsFields(items)], [items]);

  const visible = useMemo(() => {
    const filtered =
      activeField === 'All' ? items : items.filter((i) => i.field === activeField);
    return filtered.slice(0, limit);
  }, [activeField, items, limit]);

  return (
    <section className="bg-brand-surface font-sans">
      <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-8 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="font-jetbrains text-[0.7rem] uppercase tracking-[0.14em] text-brand-secondary/60">
              {title}
            </p>
            <h2 className="mt-3 text-4xl leading-[1.05] tracking-tight text-brand-secondary md:text-5xl">
              {subtitle}
            </h2>
            <p className="mt-4 max-w-xl text-sm font-light leading-relaxed text-brand-secondary/75 md:text-base">
              Update this section by editing{' '}
              <code className="font-medium text-brand-secondary">src/data/news.json</code> — add new
              articles, remove old ones, and they’ll automatically sort by date.
            </p>
          </div>

          <div className="flex w-full flex-wrap items-center gap-2 md:w-auto md:justify-end">
            {fields.map((f) => {
              const active = f === activeField;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setActiveField(f)}
                  className={[
                    'h-9 rounded-full border px-4 text-[0.75rem] uppercase tracking-[0.12em] transition-colors',
                    active
                      ? 'border-brand-secondary bg-brand-secondary text-brand-surface'
                      : 'border-brand-secondary/25 bg-white/40 text-brand-secondary hover:border-brand-secondary/45 hover:bg-white/60',
                    'motion-reduce:transition-none',
                  ].join(' ')}
                  aria-pressed={active}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </div>

        <motion.div
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          initial={reduce ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: reduce ? 0 : 0.6, ease }}
        >
          {visible.map((item) => (
            <article
              key={item.id}
              className="group relative overflow-hidden border border-brand-secondary/20 bg-white/50 p-6 backdrop-blur-sm transition-colors hover:border-brand-secondary/35 motion-reduce:transition-none"
            >
              <Link
                href={item.href ?? `/news/${item.slug}`}
                className="absolute inset-0 z-10"
                aria-label={`Read: ${item.title}`}
              />
              <div className="absolute inset-0 pointer-events-none" aria-hidden>
                <div
                  className="absolute -inset-24 opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 motion-reduce:transition-none"
                  style={{
                    background:
                      'radial-gradient(55% 55% at 12% 10%, color-mix(in srgb, var(--brand-primary) 16%, transparent) 0%, transparent 65%), radial-gradient(55% 55% at 88% 70%, color-mix(in srgb, var(--brand-secondary) 10%, transparent) 0%, transparent 65%)',
                  }}
                />
              </div>

              <div className="relative">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-jetbrains text-[0.6875rem] uppercase tracking-[0.12em] text-brand-secondary/65">
                    {item.field}
                  </p>
                  <p className="font-jetbrains text-[0.6875rem] uppercase tracking-[0.12em] text-brand-secondary/55">
                    {formatDate(item.date)}
                  </p>
                </div>

                <h3 className="mt-4 text-xl font-medium leading-snug tracking-tight text-brand-secondary">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-brand-secondary/75">
                  {item.excerpt}
                </p>

                {item.image ? (
                  <div className="mt-6 overflow-hidden border border-brand-secondary/15">
                    <div className="relative aspect-[16/9]">
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] motion-reduce:transition-none"
                        loading="lazy"
                        decoding="async"
                        fetchPriority="low"
                      />
                    </div>
                  </div>
                ) : null}

                {item.tags?.length ? (
                  <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tags">
                    {item.tags.slice(0, 3).map((t) => (
                      <li
                        key={t}
                        className="rounded-full border border-brand-secondary/20 bg-white/40 px-3 py-1 text-[0.6875rem] uppercase tracking-[0.12em] text-brand-secondary/70"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

