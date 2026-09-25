'use client';

import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

const ease = [0.16, 1, 0.3, 1] as const;

const columns = [
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'Overview' },
      { href: '/about#leadership', label: 'Meet the team' },
      { href: '#', label: 'History' },
      { href: '#', label: 'Careers' },
      { href: '#contact', label: 'Contact' },
    ],
  },
  {
    title: 'Sectors',
    links: [
      { href: '#', label: 'Marine' },
      { href: '#', label: 'Manufacturing' },
      { href: '#', label: 'Transport' },
      { href: '#', label: 'Energy' },
      { href: '#', label: 'Infrastructure' },
    ],
  },
  {
    title: 'Products',
    links: [
      { href: '/products', label: 'Rivets & bolts' },
      { href: '/products', label: 'Screws & threaded' },
      { href: '/products', label: 'Nuts, washers & kits' },
      { href: '/products', label: 'Specialty hardware' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '#', label: 'Privacy Policy' },
      { href: '#', label: 'Terms & Conditions' },
      { href: '#', label: 'Cookie Policy' },
    ],
  },
] as const;

const socialLinks = [
  { href: '#', label: 'YouTube' },
  { href: '#', label: 'Instagram' },
  { href: '#', label: 'LinkedIn' },
] as const;

export default function Footer() {
  const reduce = useReducedMotion();
  const year = new Date().getFullYear();

  return (
    <motion.footer
      className="relative isolate overflow-hidden bg-transparent font-sans text-white"
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: reduce ? 0 : 0.65, ease }}
    >
      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 pt-14 md:px-8 md:pt-16 lg:px-10 lg:pt-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between lg:gap-16">
          <div className="shrink-0">
            <a href="/" className="inline-block outline-none ring-white/40 focus-visible:ring-2">
              <img
                src="/company_logo.png"
                alt="Fair Fasteners"
                className="h-9 w-auto object-contain md:h-10"
              />
            </a>
            <p className="mt-8 max-w-[220px] text-sm leading-relaxed text-white/45">
              Specification-grade fasteners for industries that demand reliability.
            </p>
          </div>

          <nav
            className="grid grid-cols-2 gap-x-10 gap-y-10 sm:grid-cols-4 sm:gap-x-12 lg:gap-x-16"
            aria-label="Footer"
          >
            {columns.map((col) => (
              <div key={col.title}>
                <p className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-white/40">
                  {col.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-[0.9375rem] text-white/90 transition-colors duration-300 hover:text-white"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-white/10 py-6 md:mt-20 md:flex-row md:items-end md:justify-between md:gap-10 md:py-7">
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-3" aria-label="Social">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="inline-flex items-center gap-1.5 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:text-white/70"
              >
                {link.label}
                <ArrowUpRight className="h-3.5 w-3.5 opacity-70" strokeWidth={1.75} aria-hidden />
              </a>
            ))}
          </nav>

          <p className="max-w-xl text-[0.6875rem] leading-relaxed text-white/40 md:text-right">
            © {year} Fair Fasteners. All rights reserved. Specification-grade hardware for commercial,
            OEM, and industrial programs across North America.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
