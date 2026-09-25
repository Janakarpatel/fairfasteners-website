'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

const ease = [0.16, 1, 0.3, 1] as const;

const categories = [
  {
    title: 'Rivets & bolts',
    count: 48,
    href: '/products',
    image: '/images/manufacturing.jpg',
  },
  {
    title: 'Screws & threaded',
    count: 36,
    href: '/products',
    image: '/images/infrastructure.jpg',
  },
  {
    title: 'Nuts, washers & kits',
    count: 52,
    href: '/products',
    image: '/images/energy.jpg',
  },
  {
    title: 'Specialty hardware',
    count: 24,
    href: '/products',
    image: '/images/transport.jpg',
  },
  {
    title: 'Corrosion resistant',
    count: 31,
    href: '/products',
    image: '/images/marine.jpg',
  },
  {
    title: 'Hardware kits',
    count: 18,
    href: '/products',
    image: '/images/agriculture.jpg',
  },
] as const;

export default function HotProductsSection() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-transparent font-sans text-white">
      <div className="mx-auto w-full max-w-[1600px] px-6 py-12 md:px-8 md:py-14 lg:px-10 lg:py-16">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: reduce ? 0 : 0.65, ease }}
        >
          <p className="text-[0.8125rem] text-white/45">
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <span className="mx-1.5" aria-hidden>
              /
            </span>
            <Link href="/products" className="transition-colors hover:text-white">
              Products
            </Link>
            <span className="mx-1.5" aria-hidden>
              /
            </span>
            <span className="text-white/70">Catalog</span>
          </p>
          <h2 className="mt-4 text-[clamp(1.75rem,4vw,3rem)] font-semibold uppercase tracking-tight text-white">
            Products
          </h2>
        </motion.div>

        <motion.ul
          className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3.5 lg:mt-10 lg:grid-cols-3 lg:gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={{
            hidden: {},
            visible: {
              transition: reduce
                ? { staggerChildren: 0 }
                : { staggerChildren: 0.07, delayChildren: 0.05 },
            },
          }}
        >
          {categories.map((cat) => (
            <motion.li
              key={cat.title}
              variants={{
                hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 16 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: reduce ? 0 : 0.55, ease },
                },
              }}
            >
              <Link
                href={cat.href}
                className="group relative flex aspect-[4/3] flex-col border border-white/10 bg-white/[0.06] p-2.5 outline-none transition-colors duration-300 hover:bg-white/[0.1] md:aspect-[3/2] md:p-3"
              >
                <p className="relative z-10 text-[0.8125rem] text-white/45">
                  {cat.count} items
                </p>

                <div className="pointer-events-none absolute top-2 right-2 flex w-[58%] items-start justify-end md:top-2.5 md:right-2.5 md:w-[55%]">
                  <div className="relative aspect-[5/3] w-full overflow-hidden">
                    <Image
                      src={cat.image}
                      alt=""
                      fill
                      sizes="240px"
                      className="object-cover object-top opacity-90 grayscale transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                    />
                  </div>
                </div>

                <div className="relative z-10 mt-auto flex items-end justify-between gap-3">
                  <h3 className="text-base font-medium tracking-tight text-white md:text-lg">
                    {cat.title}
                  </h3>
                  <span
                    className="inline-flex h-9 w-9 shrink-0 translate-y-6 items-center justify-center rounded-full bg-white text-brand-field opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:translate-y-0 motion-reduce:transition-none"
                    aria-hidden
                  >
                    <ArrowRight className="h-4 w-4" strokeWidth={2} />
                  </span>
                </div>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
