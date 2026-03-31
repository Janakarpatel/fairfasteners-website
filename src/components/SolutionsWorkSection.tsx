'use client';

import { memo, useCallback, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useReducedMotion } from 'motion/react';

type Tile = {
  title: string;
  kicker: string;
  image?: string;
};

const tiles: readonly Tile[] = [
  {
    title: 'Infrastructure',
    kicker: 'Construction, MEP, civil, utilities',
    image: '/images/infrastructure.jpg',
  },
  {
    title: 'Manufacturing',
    kicker: 'OEM lines, tooling, maintenance',
    image: '/images/manufacturing.jpg',
  },
  {
    title: 'Transport',
    kicker: 'Fleet, heavy equipment, service bays',
    image: '/images/transport.jpg',
  },
  {
    title: 'Energy',
    kicker: 'Power generation, renewables, oil & gas',
    image: '/images/energy.jpg',
  },
  {
    title: 'Marine',
    kicker: 'Shipbuilding, ports, corrosive environments',
    image: '/images/marine.jpg',
  },
  {
    title: 'Agriculture',
    kicker: 'Farm machinery, implements, seasonal repairs',
    image: '/images/agriculture.jpg',
  },
] as const;

const TileCard = memo(function TileCard({ title, kicker, image }: Tile) {
  return (
    <article
      data-tile-card
      className="group relative aspect-[3/4] w-[min(84vw,272px)] shrink-0 snap-center overflow-hidden border border-white/10 bg-black/20 contain-paint sm:w-[min(70vw,304px)] md:w-[320px] lg:w-[352px] xl:w-[min(376px,34vw)]"
    >
      <div className="absolute inset-0" aria-hidden>
        {image ? (
          <Image
            src={image}
            alt=""
            fill
            sizes="(max-width: 640px) 84vw, (max-width: 1024px) 320px, 384px"
            className="object-cover"
            loading="lazy"
            decoding="async"
            fetchPriority="low"
          />
        ) : (
          <div
            className="absolute inset-0 bg-center"
            style={{
              background:
                'radial-gradient(120% 95% at 10% 15%, color-mix(in srgb, var(--brand-primary) 22%, transparent) 0%, transparent 52%), radial-gradient(120% 95% at 85% 70%, color-mix(in srgb, var(--brand-secondary) 18%, transparent) 0%, transparent 58%)',
            }}
          />
        )}
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/60 via-black/25 to-transparent" />
      </div>

      <div className="relative flex h-full flex-col justify-between p-6 md:p-7">
        <p className="font-jetbrains text-[0.7rem] uppercase tracking-[0.14em] text-white/75 md:text-[0.75rem]">
          {kicker}
        </p>
        <div className="flex items-end justify-between gap-4">
          <h3 className="text-lg font-medium tracking-tight text-white md:text-xl">{title}</h3>
          <span className="text-sm text-white/70 transition-colors group-hover:text-white" aria-hidden>
            ↗
          </span>
        </div>
      </div>
    </article>
  );
});

export default function SolutionsWorkSection() {
  const railRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();

  const scrollByCards = useCallback(
    (dir: -1 | 1) => {
      const el = railRef.current;
      if (!el) return;
      const cards = Array.from(el.querySelectorAll<HTMLElement>('[data-tile-card]'));
      if (!cards.length) return;

      const behavior: ScrollBehavior = reduceMotion === true ? 'auto' : 'smooth';
      const railRect = el.getBoundingClientRect();
      const focusX = railRect.left + railRect.width * 0.35;

      let nearest = 0;
      let best = Infinity;
      for (let i = 0; i < cards.length; i++) {
        const r = cards[i].getBoundingClientRect();
        const mid = r.left + r.width / 2;
        const d = Math.abs(mid - focusX);
        if (d < best) {
          best = d;
          nearest = i;
        }
      }

      const next = Math.max(0, Math.min(cards.length - 1, nearest + dir));
      cards[next].scrollIntoView({
        behavior,
        block: 'nearest',
        inline: 'start',
      });
    },
    [reduceMotion],
  );

  return (
    <section className="min-h-screen bg-brand-primary">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-20 md:px-8 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-5xl leading-[1.05] tracking-tight text-brand-surface">
            Where our solutions work
          </h2>
          <p className="mx-auto mt-5 max-w-6xl text-sm font-sans font-light leading-relaxed text-brand-surface/70 md:text-base">
            Fair Fasteners supports teams across demanding environments—helping keep assemblies
            compliant, consistent, and install-ready from quote through field use.
          </p>
        </div>

        <div className="relative mt-12 flex min-h-0 flex-1 items-end">
          <div
            className="relative left-1/2 w-screen -translate-x-1/2"
            aria-label="Solutions carousel"
            role="region"
          >
            <div
              ref={railRef}
              className="flex snap-x snap-mandatory items-stretch gap-6 overflow-x-auto overflow-y-hidden overscroll-x-contain scroll-smooth scroll-ps-6 scroll-pe-6 px-6 pb-2 [scrollbar-width:none] md:gap-8 md:scroll-ps-8 md:scroll-pe-8 md:px-8 lg:scroll-ps-10 lg:scroll-pe-10 lg:px-10 [&::-webkit-scrollbar]:hidden"
              style={{ WebkitOverflowScrolling: 'touch' as const }}
            >
              {tiles.map((t) => (
                <TileCard key={t.title} {...t} />
              ))}
              <div className="w-2 shrink-0 md:w-4" aria-hidden />
            </div>
          </div>
        </div>

        <div className="mt-7 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => scrollByCards(-1)}
            className="inline-flex h-10 w-10 items-center justify-center border border-brand-warm/50 bg-black/10 text-brand-warm transition-colors hover:border-brand-warm hover:bg-black/20"
            aria-label="Previous cards"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => scrollByCards(1)}
            className="inline-flex h-10 w-10 items-center justify-center border border-brand-warm/50 bg-black/10 text-brand-warm transition-colors hover:border-brand-warm hover:bg-black/20"
            aria-label="Next cards"
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </div>
    </section>
  );
}
