'use client';

import { useCallback, useRef } from 'react';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

const ease = [0.16, 1, 0.3, 1] as const;

const sectors = [
  {
    title: 'Marine',
    description:
      'Corrosion-class fasteners for shipbuilding, ports, and saltwater environments.',
    image: '/images/marine.jpg',
    href: '#',
  },
  {
    title: 'Manufacturing',
    description:
      'OEM-ready hardware that keeps production lines consistent and install-ready.',
    image: '/images/manufacturing.jpg',
    href: '#',
  },
  {
    title: 'Transport',
    description:
      'Fleet and heavy-equipment fasteners built for vibration, load, and service bays.',
    image: '/images/transport.jpg',
    href: '#',
  },
  {
    title: 'Energy',
    description:
      'Specification-grade products for power, renewables, and demanding field conditions.',
    image: '/images/energy.jpg',
    href: '#',
  },
  {
    title: 'Infrastructure',
    description:
      'Traceable hardware for civil, MEP, and regulated construction programs.',
    image: '/images/infrastructure.jpg',
    href: '#',
  },
  {
    title: 'Agriculture',
    description:
      'Durable fasteners for farm machinery, implements, and seasonal field repairs.',
    image: '/images/agriculture.jpg',
    href: '#',
  },
] as const;

export default function SolutionsWorkSection() {
  const reduce = useReducedMotion();
  const railRef = useRef<HTMLDivElement | null>(null);

  const scrollByCards = useCallback(
    (dir: -1 | 1) => {
      const el = railRef.current;
      if (!el) return;
      const card = el.querySelector<HTMLElement>('[data-sector-card]');
      const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.7;
      el.scrollBy({
        left: dir * step,
        behavior: reduce === true ? 'auto' : 'smooth',
      });
    },
    [reduce],
  );

  return (
    <section className="font-sans text-white">
      <div className="mx-auto w-full max-w-[1600px] px-6 pt-10 pb-16 md:px-8 md:pt-12 md:pb-20 lg:px-10 lg:pt-14 lg:pb-24">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: reduce ? 0 : 0.7, ease }}
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <div className="flex items-center gap-2.5">
              <span className="inline-block h-2.5 w-2.5 shrink-0 bg-white" aria-hidden />
              <p className="text-[0.6875rem] font-medium uppercase tracking-normal text-white/85 md:text-[0.75rem]">
                Sectors we work in
              </p>
            </div>
            <h2 className="mt-5 max-w-4xl text-3xl font-medium leading-[1.1] tracking-tight text-white">
              We operate in sectors where failure is not an option and performance must be
              engineered, not assumed.
            </h2>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => scrollByCards(-1)}
              className="inline-flex h-10 w-10 items-center justify-center border border-white/25 text-white transition-colors hover:border-white hover:bg-white/10"
              aria-label="Previous sectors"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => scrollByCards(1)}
              className="inline-flex h-10 w-10 items-center justify-center border border-white/25 text-white transition-colors hover:border-white hover:bg-white/10"
              aria-label="Next sectors"
            >
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </motion.div>

        <motion.div
          className="mt-8 md:mt-10"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: reduce ? 0 : 0.65, delay: reduce ? 0 : 0.08, ease }}
          role="region"
          aria-label="Sectors carousel"
        >
          {/* Bleed right so scroll continues past the container; left stays flush with headline */}
          <div
            ref={railRef}
            className="flex w-[calc(100%+1.5rem)] snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain scroll-smooth pb-2 pr-6 -mr-6 [scrollbar-width:none] md:w-[calc(100%+2rem)] md:gap-6 md:pr-8 md:-mr-8 lg:w-[calc(100%+2.5rem)] lg:pr-10 lg:-mr-10 [&::-webkit-scrollbar]:hidden"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {sectors.map((sector) => (
              <a
                key={sector.title}
                href={sector.href}
                data-sector-card
                className="group w-[min(78vw,280px)] shrink-0 snap-start outline-none sm:w-[min(58vw,300px)] md:w-[min(42vw,320px)] lg:w-[300px] xl:w-[320px]"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-white/5">
                  <Image
                    src={sector.image}
                    alt=""
                    fill
                    sizes="320px"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-brand-primary/15 mix-blend-multiply" />
                <span
                  className="absolute bottom-4 left-4 inline-flex h-10 w-10 translate-y-8 items-center justify-center rounded-full bg-brand-primary text-white opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:transition-none motion-reduce:translate-y-0"
                  aria-hidden
                >
                  <ArrowRight className="h-4 w-4" strokeWidth={2} />
                </span>
                </div>
                <h3 className="mt-5 text-lg font-medium tracking-normal text-white">
                  {sector.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-white/60">
                  {sector.description}
                </p>
              </a>
            ))}
            <div className="w-2 shrink-0 md:w-4" aria-hidden />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
