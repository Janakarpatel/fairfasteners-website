'use client';

import { motion, useReducedMotion } from 'motion/react';

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative flex min-h-[calc(100dvh-4rem)] w-full flex-col justify-end overflow-hidden bg-brand-surface px-6 pb-15 pt-2 font-sans">
      <motion.div
        className="mx-auto w-full max-w-[1600px] shrink-0"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: reduce ? 1 : 0 },
          visible: {
            opacity: 1,
            transition: reduce
              ? { duration: 0 }
              : { staggerChildren: 0.11, delayChildren: 0.12 },
          },
        }}
      >
        <div className="flex max-w-full flex-col items-start gap-6">
          <motion.p
            className="max-w-lg text-normal font-medium leading-relaxed tracking-tight text-brand-secondary"
            variants={{
              hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: reduce ? 0 : 3,
                  ease: [0.16, 1, 0.3, 1],
                },
              },
            }}
          >
            Fair Fasteners supplies high-performance rivets, bolts, screws, and specialty hardware
            across North America—engineered for demanding industrial environments and long-term
            reliability in the field.
          </motion.p>
          <motion.h1
            className="text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.95] tracking-tighter text-brand-secondary"
            variants={{
              hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 28 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: reduce ? 0 : 3,
                  ease: [0.16, 1, 0.3, 1],
                },
              },
            }}
          >
            Industrial strength,
            <br />
            every connection.
          </motion.h1>
        </div>
      </motion.div>
    </section>
  );
}
