'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const navLinks = [
  { href: '#', label: 'Products' },
  { href: '#', label: 'Solutions' },
  { href: '#', label: 'Sustainability' },
  { href: '#', label: 'Company' },
  { href: '#', label: 'News' },
] as const;

const ease = [0.16, 1, 0.3, 1] as const;
const SCROLL_TOP_THRESHOLD = 72;
const SCROLL_DELTA_DOWN = 8;
const SCROLL_DELTA_UP = 2;
const IDLE_HIDE_MS = 4500;

function BracketContact({
  className = '',
  inverse,
}: {
  className?: string;
  inverse?: boolean;
}) {
  return (
    <button
      type="button"
      className={`group inline-flex items-center border-l border-r px-2.5 py-1 text-sm font-medium tracking-tight transition-opacity ${
        inverse
          ? 'border-white text-white hover:opacity-80'
          : 'border-brand-secondary text-brand-secondary hover:text-brand-primary'
      } ${className}`}
    >
      <span className="mx-2.5 font-medium tracking-tight">Contact Us</span>
    </button>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollHidden, setScrollHidden] = useState(false);
  const lastY = useRef(0);
  const reduce = useReducedMotion();
  /** Difference blend needs light ink (white) to invert correctly over the video. */
  const blendNav = reduce !== true;

  const linkClass = blendNav
    ? 'mix-blend-difference text-sm font-medium tracking-tight text-white transition-opacity hover:opacity-80'
    : 'text-sm font-medium tracking-tight text-brand-secondary transition-colors hover:text-brand-primary';

  const barClass = blendNav ? 'bg-white' : 'bg-brand-secondary';

  useEffect(() => {
    lastY.current = typeof window !== 'undefined' ? window.scrollY : 0;
  }, []);

  useEffect(() => {
    let idleTimer: ReturnType<typeof setTimeout> | null = null;

    const clearIdleTimer = () => {
      if (idleTimer) {
        clearTimeout(idleTimer);
        idleTimer = null;
      }
    };

    const scheduleIdleHide = () => {
      clearIdleTimer();
      if (reduce) return;
      const y = window.scrollY;
      if (y < SCROLL_TOP_THRESHOLD) return;
      idleTimer = setTimeout(() => setScrollHidden(true), IDLE_HIDE_MS);
    };

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      lastY.current = y;

      if (y < SCROLL_TOP_THRESHOLD) {
        clearIdleTimer();
        setScrollHidden(false);
        return;
      }

      scheduleIdleHide();

      if (delta > SCROLL_DELTA_DOWN) {
        setScrollHidden(true);
      } else if (delta < -SCROLL_DELTA_UP) {
        setScrollHidden(false);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    if (typeof window !== 'undefined' && window.scrollY >= SCROLL_TOP_THRESHOLD) {
      scheduleIdleHide();
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      clearIdleTimer();
    };
  }, [reduce]);

  const navHidden = scrollHidden && !isOpen && reduce !== true;

  /** Hide via `top` only — `transform`/`opacity` on ancestors break `mix-blend-mode` over the hero video. */
  return (
    <motion.nav
      className="fixed left-0 right-0 z-50 bg-transparent font-sans"
      initial={false}
      animate={{
        top: navHidden ? '-220px' : '0px',
      }}
      transition={{ duration: 0.3, ease }}
      style={{
        pointerEvents: navHidden ? 'none' : 'auto',
        isolation: 'auto',
      }}
    >
      <div className="relative flex w-full max-w-none items-center justify-between gap-3 px-6 py-6">
        <div className="relative z-10 flex min-w-0 flex-1 items-center gap-8 lg:gap-10 xl:gap-11">
          <div className="shrink-0 mix-blend-normal">
            <img
              src="/company_logo.png"
              alt="Fair Fasteners"
              className="h-7 w-auto object-contain md:h-8"
            />
          </div>
          <ul className="hidden min-w-0 items-center gap-2 lg:flex lg:gap-8">
            {navLinks.map(({ href, label }) => (
              <li key={label} className="shrink-0">
                <a href={href} className={linkClass}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div
          className={`relative z-10 flex shrink-0 items-center justify-end gap-4 ${
            blendNav ? 'mix-blend-difference' : ''
          }`}
        >
          <BracketContact
            className="hidden lg:inline-flex"
            inverse={blendNav}
          />
          <motion.button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            whileTap={reduce ? undefined : { scale: 0.92 }}
          >
            <motion.span
              className={`h-0.5 w-6 ${barClass}`}
              animate={
                isOpen
                  ? { rotate: 45, y: 8, transition: { duration: 0.3, ease } }
                  : { rotate: 0, y: 0, transition: { duration: 0.3, ease } }
              }
            />
            <motion.span
              className={`h-0.5 w-6 ${barClass}`}
              animate={
                isOpen
                  ? { opacity: 0, transition: { duration: 0.2 } }
                  : { opacity: 1, transition: { duration: 0.2 } }
              }
            />
            <motion.span
              className={`h-0.5 w-6 ${barClass}`}
              animate={
                isOpen
                  ? { rotate: -45, y: -8, transition: { duration: 0.3, ease } }
                  : { rotate: 0, y: 0, transition: { duration: 0.3, ease } }
              }
            />
          </motion.button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="mobile-nav"
            initial={reduce ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={reduce ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: reduce ? 0 : 0.35, ease }}
            className={`overflow-hidden border-t lg:hidden ${
              blendNav ? 'border-white/25' : 'border-brand-secondary/10'
            }`}
          >
            <div className="px-4 py-3">
              <ul className="flex flex-col gap-1">
                {navLinks.map(({ href, label }, i) => (
                  <motion.li
                    key={label}
                    initial={reduce ? false : { opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: reduce ? 0 : 0.35,
                      ease,
                      delay: reduce ? 0 : 0.04 + i * 0.04,
                    }}
                  >
                    <a
                      href={href}
                      className={
                        blendNav
                          ? 'block py-2 text-sm font-medium tracking-wide text-white mix-blend-difference hover:opacity-80'
                          : 'block py-2 text-sm font-medium tracking-wide text-brand-secondary hover:text-brand-primary'
                      }
                      onClick={() => setIsOpen(false)}
                    >
                      {label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                className={
                  blendNav
                    ? 'mt-3 border-t border-white/25 pt-3'
                    : 'mt-3 border-t border-brand-secondary/10 pt-3'
                }
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: reduce ? 0 : 0.15, duration: reduce ? 0 : 0.3 }}
              >
                <BracketContact
                  className="w-full justify-center"
                  inverse={blendNav}
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
