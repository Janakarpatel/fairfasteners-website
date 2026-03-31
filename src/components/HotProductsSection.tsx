'use client';

import { memo, useCallback, useMemo, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useReducedMotion } from 'motion/react';
import { getProductItems, type ProductItem } from '@/lib/products';

type CardProps = {
  product: ProductItem;
};

const ProductCard = memo(function ProductCard({ product }: CardProps) {
  return (
    <article
      data-product-card
      className="group relative aspect-[3/4] w-[min(84vw,260px)] shrink-0 snap-start overflow-hidden border border-brand-secondary/15 bg-white contain-paint sm:w-[min(70vw,280px)] md:w-[300px] lg:w-[320px]"
    >
      <div className="absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-brand-surface/70" />
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 motion-reduce:transition-none"
          style={{
            background:
              'radial-gradient(70% 70% at 12% 10%, color-mix(in srgb, var(--brand-primary) 10%, transparent) 0%, transparent 70%), radial-gradient(70% 70% at 88% 70%, color-mix(in srgb, var(--brand-secondary) 8%, transparent) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative flex h-full flex-col">
        <div className="relative flex flex-1 items-center justify-center p-10">
          {product.image ? (
            <div className="relative h-full w-full">
              <Image
                src={product.image}
                alt=""
                fill
                sizes="(max-width: 640px) 84vw, 360px"
                className="object-contain"
                loading="lazy"
                decoding="async"
                fetchPriority="low"
              />
            </div>
          ) : (
            <div
              className="h-[58%] w-[72%] border border-brand-secondary/10 bg-white/55"
              aria-hidden
            />
          )}
        </div>

        <div className="border-t border-brand-secondary/10 bg-white/65 px-6 py-5 backdrop-blur-sm">
          <p className="font-jetbrains text-[0.65rem] uppercase tracking-[0.12em] text-brand-secondary/55">
            {product.category}
          </p>
          <h3 className="mt-2 text-lg font-medium leading-snug tracking-tight text-brand-secondary">
            {product.name}
          </h3>
          {product.range ? (
            <p className="mt-2 text-sm font-light leading-relaxed text-brand-secondary/70">
              {product.range}
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
});

export default function HotProductsSection() {
  const railRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();
  const products = useMemo(() => getProductItems(), []);

  const scrollByCards = useCallback(
    (dir: -1 | 1) => {
      const el = railRef.current;
      if (!el) return;
      const cards = Array.from(el.querySelectorAll<HTMLElement>('[data-product-card]'));
      if (!cards.length) return;

      const behavior: ScrollBehavior = reduceMotion === true ? 'auto' : 'smooth';

      const first = cards[0].getBoundingClientRect();
      const second = cards[1]?.getBoundingClientRect();
      const gap = second ? Math.max(0, second.left - first.left - first.width) : 24;
      const step = first.width + gap;

      el.scrollBy({ left: dir * step, behavior });
    },
    [reduceMotion],
  );

  return (
    <section className="bg-brand-surface font-sans">
      <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[320px_1fr] md:items-stretch lg:grid-cols-[360px_1fr]">
          <div className="flex flex-col">
            <p className="font-jetbrains text-[0.7rem] uppercase tracking-[0.14em] text-brand-secondary/60">
              Products
            </p>
            <h2 className="mt-3 text-4xl leading-[1.05] tracking-tight text-brand-secondary md:text-5xl">
              Hot products
            </h2>
            <p className="mt-4 max-w-xl text-sm font-light leading-relaxed text-brand-secondary/75 md:text-base">
              A quick look at popular hardware and kits teams keep in rotation.
            </p>

            <div className="mt-8">
              <Link
                href="/products"
                className="group inline-flex h-11 items-center justify-between gap-10 rounded-full border border-brand-secondary/25 bg-white/45 px-5 text-sm font-medium tracking-tight text-brand-secondary transition-colors hover:border-brand-secondary/40 hover:bg-white/65 motion-reduce:transition-none"
              >
                <span className="text-sm">View Products</span>
                <span className="text-brand-secondary/70 transition-colors group-hover:text-brand-secondary" aria-hidden>
                  →
                </span>
              </Link>
            </div>

            <div className="mt-auto flex items-center gap-2 pt-10">
              <button
                type="button"
                onClick={() => scrollByCards(-1)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-secondary/20 bg-white/45 text-brand-secondary/80 transition-colors hover:border-brand-secondary/35 hover:bg-white/65 motion-reduce:transition-none"
                aria-label="Previous products"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => scrollByCards(1)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-secondary/20 bg-white/45 text-brand-secondary/80 transition-colors hover:border-brand-secondary/35 hover:bg-white/65 motion-reduce:transition-none"
                aria-label="Next products"
              >
                <ChevronRight className="h-5 w-5" aria-hidden />
              </button>
            </div>
          </div>

          <div className="relative min-w-0 md:border-l md:border-brand-secondary/10 md:pl-10">
            <div
              className="md:-mr-[calc((100vw-100%)/2)]"
              aria-label="Hot products carousel"
              role="region"
            >
              <div
                ref={railRef}
                className="flex w-full min-w-0 max-w-full snap-x snap-mandatory items-stretch gap-6 overflow-x-auto overflow-y-hidden overscroll-x-contain scroll-smooth pb-2 pr-6 [scrollbar-width:none] md:gap-8 [&::-webkit-scrollbar]:hidden"
                style={{ WebkitOverflowScrolling: 'touch' as const }}
              >
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
                <div className="w-2 shrink-0 md:w-4" aria-hidden />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

