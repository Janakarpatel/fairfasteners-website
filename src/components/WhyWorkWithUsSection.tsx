'use client';

import { motion, useReducedMotion } from 'motion/react';

const ease = [0.16, 1, 0.3, 1] as const;

const reasons = [
  {
    n: '01',
    text: 'Engineering led from day one',
  },
  {
    n: '02',
    text: 'System level thinking, not component optimisation',
  },
  {
    n: '03',
    text: 'Rapid iteration without compromising assurance',
  },
  {
    n: '04',
    text: 'Proven under extreme performance pressure',
  },
] as const;

export default function WhyWorkWithUsSection() {
  const reduce = useReducedMotion();

  return (
    <section className="font-sans text-white">
      <div className="mx-auto w-full max-w-[1600px] border-t border-white/10 px-6 py-16 md:px-8 md:py-20 lg:px-10 lg:py-24">
        <motion.h2
          className="text-[clamp(1.75rem,2.5vw,2.5rem)] font-semibold tracking-tight text-white"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: reduce ? 0 : 0.65, ease }}
        >
          Why work with us
        </motion.h2>

        <ul className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:mt-16 lg:grid-cols-4 lg:gap-x-10">
          {reasons.map((item, i) => (
            <motion.li
              key={item.n}
              className="flex gap-4"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: reduce ? 0 : 0.6,
                ease,
                delay: reduce ? 0 : i * 0.08,
              }}
            >
              <span className="mt-1 w-px shrink-0 self-stretch bg-white/25" aria-hidden />
              <div className="min-w-0">
                <p className="text-[0.6875rem] font-medium tracking-[0.08em] text-white/40">
                  {item.n}
                </p>
                <p className="mt-3 max-w-[16rem] text-[0.975rem] leading-snug text-white/90 md:text-[1.05rem] md:leading-[1.35]">
                  {item.text}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
