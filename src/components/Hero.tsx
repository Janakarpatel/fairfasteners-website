'use client';

import { motion, useReducedMotion } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import AmbientBackground from '@/components/AmbientBackground';

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative min-h-[100dvh] w-full overflow-visible bg-transparent font-sans antialiased text-white">
      <AmbientBackground reduce={reduce} scene intensity="hero" />

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
