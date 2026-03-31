'use client';

import { Youtube } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

const ease = [0.16, 1, 0.3, 1] as const;

const discoverLinks = [
  { href: '/products', label: 'Products' },
  { href: '#', label: 'Solutions' },
  { href: '#', label: 'Company' },
  { href: '/news', label: 'News' },
] as const;

export default function Footer() {
  const reduce = useReducedMotion();

  return (
    <motion.footer
      className="bg-brand-primary font-sans text-white"
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: reduce ? 0 : 0.65, ease }}
    >
      <div className="w-full px-7 pt-10">
        <div className="grid grid-cols-1 gap-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,280px)] lg:gap-16 lg:items-start">
          {/* Left: stacked sections */}
          <motion.div
            className="order-1 flex flex-col gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={{
              hidden: {},
              visible: {
                transition: reduce
                  ? { staggerChildren: 0 }
                  : { staggerChildren: 0.1, delayChildren: 0.05 },
              },
            }}
          >
            <motion.section
              variants={{
                hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 12 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: reduce ? 0 : 0.45, ease },
                },
              }}
            >
              <h2 className="font-jetbrains text-[0.6875rem] font-normal uppercase tracking-[0.12em] text-white/50">
                Discover
              </h2>
              <ul className="mt-4 flex flex-col">
                {discoverLinks.map(({ href, label }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-[0.9375rem] text-white/90 transition hover:text-white"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.section>

            <motion.section
              variants={{
                hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 12 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: reduce ? 0 : 0.45, ease },
                },
              }}
            >
              <h2 className="font-jetbrains text-[0.6875rem] font-normal uppercase tracking-[0.12em] text-white/50">
                Contact
              </h2>
              <div className="mt-4 flex flex-col text-[0.9375rem] text-white/90">
                <a href="tel:+15551234567" className="transition hover:text-white">
                  +1 (555) 123-4567
                </a>
                <a href="mailto:info@fairfasteners.com" className="transition hover:text-white">
                  info@fairfasteners.com
                </a>
              </div>
            </motion.section>

            <motion.section
              variants={{
                hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 12 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: reduce ? 0 : 0.45, ease },
                },
              }}
            >
                <h2 className="font-jetbrains text-[0.6875rem] font-normal uppercase tracking-[0.12em] text-white/50">
                Headquarters
              </h2>
              <div className="mt-4 flex flex-col text-[0.9375rem] leading-relaxed text-white/90">
                <p>Fair Fasteners</p>
                <p>123 Industry Street, Suite 100</p>
                <p>City, State 12345, United States</p>
              </div>
            </motion.section>
          </motion.div>

          {/* Logo — top right on large screens */}
          <div className="order-2 flex justify-start lg:order-2 lg:justify-end">
            <img
              src="/company_logo.png"
              alt="Fair Fasteners"
              className="h-10 w-auto object-contain object-right md:h-12"
            />
          </div>
        </div>

        {/* Sub-footer */}
        <div className="w-full mt-20 border-t border-white/15 py-4">
          <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-center md:justify-between md:gap-8 md:text-left">
            <p className="font-jetbrains text-[0.6875rem] font-normal uppercase tracking-[0.12em] text-white/90">
              © {new Date().getFullYear()} Fair Fasteners.
            </p>
            <nav
              className="font-jetbrains flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[0.6875rem] font-normal uppercase tracking-[0.12em]"
              aria-label="Legal"
            >
              <a href="#" className="text-white/90 transition hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="text-white/90 transition hover:text-white">
                Terms of Use
              </a>
              <a href="#" className="text-white/90 transition hover:text-white">
                Legal Notice
              </a>
            </nav>
              <p className="font-jetbrains text-[0.6875rem] font-normal uppercase tracking-[0.12em] text-white/90">
              All rights reserved
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
