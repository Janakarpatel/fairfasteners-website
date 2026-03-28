'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const navLinks = [
  { href: '#', label: 'Products' },
  { href: '#', label: 'Solutions' },
  { href: '#', label: 'Sustainability' },
  { href: '#', label: 'Company' },
  { href: '#', label: 'News' },
] as const;

const ease = [0.16, 1, 0.3, 1] as const;

function BracketContact({
  className = '',
  reduceMotion,
}: {
  className?: string;
  reduceMotion?: boolean;
}) {
  return (
    <motion.button
      type="button"
      whileHover={reduceMotion ? undefined : { scale: 1.02 }}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`group inline-flex items-center border-l border-r border-brand-secondary px-2.5 py-1 text-sm font-medium tracking-tight text-brand-secondary transition-colors hover:text-brand-primary ${className}`}
    >
      <span className="mx-2.5 font-medium tracking-tight">Contact Us</span>
    </motion.button>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <motion.nav
      className="sticky top-0 z-50 bg-transparent font-sans"
      initial={reduce ? false : { y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: reduce ? 0 : 2,
        ease,
      }}
    >
      <div className="relative flex w-full max-w-none items-center justify-between gap-3 px-6 py-6">
        <div className="relative z-10 flex min-w-0 flex-1 items-center gap-8 lg:gap-10 xl:gap-11">
          <motion.div
            className="flex shrink-0 items-center gap-3"
            initial={reduce ? false : { opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: reduce ? 0 : 2, ease, delay: reduce ? 0 : 0.05 }}
          >
            <img
              src="/company_logo.png"
              alt="Fair Fasteners"
              className="h-7 w-auto object-contain md:h-8"
            />
          </motion.div>
          <ul className="hidden min-w-0 items-center gap-2 lg:flex lg:gap-8">
            {navLinks.map(({ href, label }, i) => (
              <motion.li
                key={label}
                className="shrink-0"
                initial={reduce ? false : { opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reduce ? 0 : 3,
                  ease,
                  delay: reduce ? 0 : 0.08 + i * 0.05,
                }}
              >
                <motion.a
                  href={href}
                  className="text-sm font-medium tracking-tight text-brand-secondary transition-colors hover:text-brand-primary"
                  whileHover={reduce ? undefined : { y: -1 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                >
                  {label}
                </motion.a>
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.div
          className="relative z-10 flex shrink-0 items-center justify-end gap-4"
          initial={reduce ? false : { opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: reduce ? 0 : 2, ease, delay: reduce ? 0 : 0.1 }}
        >
          <BracketContact className="hidden lg:inline-flex" reduceMotion={!!reduce} />
          <motion.button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            whileTap={reduce ? undefined : { scale: 0.92 }}
          >
            <motion.span
              className="h-0.5 w-6 bg-brand-secondary"
              animate={
                isOpen
                  ? { rotate: 45, y: 8, transition: { duration: 0.22, ease } }
                  : { rotate: 0, y: 0, transition: { duration: 0.22, ease } }
              }
            />
            <motion.span
              className="h-0.5 w-6 bg-brand-secondary"
              animate={
                isOpen
                  ? { opacity: 0, transition: { duration: 0.15 } }
                  : { opacity: 1, transition: { duration: 0.15 } }
              }
            />
            <motion.span
              className="h-0.5 w-6 bg-brand-secondary"
              animate={
                isOpen
                  ? { rotate: -45, y: -8, transition: { duration: 0.22, ease } }
                  : { rotate: 0, y: 0, transition: { duration: 0.22, ease } }
              }
            />
          </motion.button>
        </motion.div>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="mobile-nav"
            initial={reduce ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={reduce ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: reduce ? 0 : 0.28, ease }}
            className="overflow-hidden border-t border-brand-secondary/10 bg-transparent lg:hidden"
          >
            <div className="px-1 py-1">
              <ul className="flex flex-col gap-1">
                {navLinks.map(({ href, label }, i) => (
                  <motion.li
                    key={label}
                    initial={reduce ? false : { opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: reduce ? 0 : 0.3,
                      ease,
                      delay: reduce ? 0 : 0.04 + i * 0.04,
                    }}
                  >
                    <a
                      href={href}
                      className="block py-2 text-sm font-medium tracking-wide text-brand-secondary hover:text-brand-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      {label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                className="mt-2 border-t border-brand-secondary/10 pt-2"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: reduce ? 0 : 0.15, duration: reduce ? 0 : 0.25 }}
              >
                <BracketContact className="w-full justify-center" reduceMotion={!!reduce} />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
