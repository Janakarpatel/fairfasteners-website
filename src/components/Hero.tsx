'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowDown } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate min-h-[100dvh] w-full overflow-hidden bg-brand-secondary font-sans antialiased text-white">
      {/* Full-bleed atmosphere + primary grain gradient */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src="/images/infrastructure.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(
                165deg,
                color-mix(in srgb, var(--brand-primary) 72%, transparent) 0%,
                color-mix(in srgb, var(--brand-primary) 38%, transparent) 42%,
                color-mix(in srgb, var(--brand-primary) 55%, transparent) 100%
              )
            `,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/80 via-brand-primary/25 to-brand-primary/40" />
        <div
          className="absolute inset-0 opacity-50 mix-blend-soft-light"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: '160px 160px',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.35] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.1' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.55 0 0 0 0 0.55 0 0 0 0 0.55 0 0 0 0.55 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E\")",
            backgroundSize: '140px 140px',
          }}
        />
        <div
          className="absolute inset-0 opacity-40 mix-blend-multiply"
          style={{
            background: `
              radial-gradient(
                ellipse 90% 70% at 50% 100%,
                var(--brand-primary) 0%,
                transparent 70%
              )
            `,
          }}
        />
      </div>

      {/* Bottom hero copy */}
      <div className="relative z-10 flex min-h-[100dvh] flex-col justify-end px-5 pb-6 pt-28 md:px-5 md:pb-8 lg:px-6 lg:pb-8">
        <motion.div
          className="flex w-full flex-col gap-10 md:flex-row md:items-end md:justify-between md:gap-16"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: reduce
                ? { staggerChildren: 0 }
                : { staggerChildren: 0.14, delayChildren: 0.15 },
            },
          }}
        >
          <div className="max-w-3xl">
            <motion.div
              variants={{
                hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 14 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: reduce ? 0 : 0.7, ease },
                },
              }}
              className="flex items-center gap-2.5"
            >
              <span
                className="inline-block h-2.5 w-2.5 shrink-0 bg-white"
                aria-hidden
              />
              <p className="text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-white/90 md:text-[0.75rem]">
                Fair Fasteners
              </p>
            </motion.div>

            <motion.h1
              variants={{
                hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 22 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: reduce ? 0 : 0.9, ease },
                },
              }}
              className="mt-5 text-[clamp(1.85rem,4.8vw,3.75rem)] font-medium leading-[1.08] tracking-tight text-white"
            >
              Industrial-strength fasteners for industries that demand the same.
            </motion.h1>

            <motion.a
              href="#main-content"
              variants={{
                hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 12 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: reduce ? 0 : 0.7, ease },
                },
              }}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[0.8125rem] font-medium tracking-tight text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white/18"
            >
              Scroll for more
              <ArrowDown className="h-3.5 w-3.5 opacity-80" strokeWidth={2} aria-hidden />
            </motion.a>
          </div>

          <motion.p
            variants={{
              hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 18 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: reduce ? 0 : 0.85, ease },
              },
            }}
            className="shrink-0 text-[clamp(1.75rem,4vw,3.25rem)] font-light uppercase leading-none tracking-tight text-white md:text-right"
            aria-label="Established 1974"
          >
            Est.{' '}
            <span className="whitespace-nowrap">
              (19
              <span className="mx-1.5 inline-flex items-center gap-1.5 align-middle" aria-hidden>
                <span className="inline-block h-2 w-2 rounded-full bg-white md:h-2.5 md:w-2.5" />
                <span className="inline-block h-2 w-2 rounded-full bg-white md:h-2.5 md:w-2.5" />
              </span>
              74)
            </span>
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
