'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Menu, X } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1] as const;
const SCROLL_TOP_THRESHOLD = 72;
const SCROLL_DELTA_DOWN = 8;
const SCROLL_DELTA_UP = 2;
const IDLE_HIDE_MS = 4500;

type NavChild = { href: string; label: string };
type NavSection = { href: string; label: string; children?: readonly NavChild[] };

const navSections: readonly NavSection[] = [
  {
    href: '/products',
    label: 'Products',
    children: [
      { href: '#', label: 'Rivets & bolts' },
      { href: '#', label: 'Screws & threaded' },
      { href: '#', label: 'Nuts, washers & kits' },
    ],
  },
  {
    href: '#',
    label: 'Solutions',
    children: [
      { href: '#', label: 'Commercial programs' },
      { href: '#', label: 'OEM & custom runs' },
    ],
  },
  { href: '#', label: 'Company' },
  { href: '/news', label: 'News' },
] as const;

function BracketContact({ className = '' }: { className?: string }) {
  return (
    <button
      type="button"
      className={`inline-flex items-center border border-brand-primary bg-brand-surface px-10 py-2 text-sm font-medium tracking-tight text-brand-secondary transition-colors hover:bg-brand-primary hover:text-brand-surface ${className}`}
    >
      <span className="tracking-normal text-md">Get Started</span>
    </button>
  );
}

function MenuOpenButton({
  onClick,
  expanded,
  className = '',
}: {
  onClick: () => void;
  expanded: boolean;
  className?: string;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={`group inline-flex items-center justify-center border border-brand-primary bg-brand-surface px-3 py-2 text-sm font-medium tracking-tight text-brand-secondary transition-colors hover:text-brand-primary ${className}`}
      aria-expanded={expanded}
      aria-controls="site-mega-menu"
      aria-label={expanded ? 'Close menu' : 'Open menu'}
    >
      <AnimatePresence initial={false} mode="wait">
        {expanded ? (
          <motion.span
            key="icon-close"
            initial={{ opacity: 0, rotate: -90, scale: 0.9 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.9 }}
            transition={{ duration: 0.22, ease }}
            className="inline-flex"
          >
            <X
              aria-hidden
              className="h-5 w-5 text-brand-secondary/70 transition-colors group-hover:text-brand-primary"
              strokeWidth={1.75}
            />
          </motion.span>
        ) : (
          <motion.span
            key="icon-menu"
            initial={{ opacity: 0, rotate: 90, scale: 0.9 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -90, scale: 0.9 }}
            transition={{ duration: 0.22, ease }}
            className="inline-flex"
          >
            <Menu
              aria-hidden
              className="h-5 w-5 text-brand-secondary/70 transition-colors group-hover:text-brand-primary"
              strokeWidth={1.75}
            />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollHidden, setScrollHidden] = useState(false);
  const lastY = useRef(0);
  const reduce = useReducedMotion();

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

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const navHidden = scrollHidden && !menuOpen && reduce !== true;

  const panelTransition = reduce
    ? { duration: 0 }
    : { duration: 0.55, ease };
  const backdropTransition = reduce ? { duration: 0 } : { duration: 0.35, ease };

  const navTop = navHidden ? '-200px' : '0px';
  const navTransition = reduce
    ? undefined
    : `top 300ms cubic-bezier(${ease[0]}, ${ease[1]}, ${ease[2]}, ${ease[3]})`;

  return (
    <>
      <nav
        className="fixed left-0 right-0 top-0 z-[110] border-b border-transparent bg-transparent font-sans"
        style={{
          top: navTop,
          transition: navTransition,
          pointerEvents: navHidden ? 'none' : 'auto',
        }}
      >
        <div className="relative flex w-full max-w-none items-center justify-between gap-4 px-6 py-6 md:px-8">
          <a href="/" className="shrink-0 outline-none ring-brand-primary focus-visible:ring-2">
            <img
              src="/company_logo.png"
              alt="Fair Fasteners"
              className="h-7 w-auto object-contain md:h-8"
            />
          </a>

          <div className="flex shrink-0 items-center gap-3">
            <BracketContact className="hidden sm:inline-flex" />
            <MenuOpenButton expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} />
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.button
              type="button"
              key="mega-backdrop"
              className="fixed inset-0 z-[90] bg-brand-secondary/70 backdrop-blur-md"
              aria-label="Close menu"
              initial={{ opacity: reduce ? 1 : 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: reduce ? 1 : 0 }}
              transition={backdropTransition}
              onClick={() => setMenuOpen(false)}
            />

            <motion.div
              id="site-mega-menu"
              key="mega-panel"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              className="fixed inset-y-0 right-0 z-[100] flex w-full max-w-full flex-col border-l border-brand-secondary/12 bg-brand-surface/95 shadow-[-12px_0_48px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:max-w-[min(100%,640px)] md:max-w-[min(100%,820px)] lg:max-w-[62vw] xl:max-w-[920px]"
              initial={{ x: reduce ? 0 : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: reduce ? 0 : '100%' }}
              transition={panelTransition}
            >
              <div className="min-h-0 flex-1 overflow-hidden pt-[88px] sm:pt-[96px] md:pt-[104px]">
                <div className="grid h-full grid-cols-1 divide-y divide-brand-secondary/12 md:grid-cols-3 md:divide-x md:divide-y-0">
                  {/* Column 1 — Navigation */}
                  <div className="flex flex-col overflow-hidden px-6 py-7 md:px-8 md:py-8">
                    <p className="font-jetbrains text-[0.65rem] uppercase tracking-[0.14em] text-brand-secondary/50">
                      Navigation
                    </p>
                    <div className="mt-6 space-y-10">
                      {navSections.map(({ href, label, children }) => (
                        <div key={label}>
                          <a
                            href={href}
                            className="block text-xl font-medium tracking-tight text-brand-primary md:text-2xl md:leading-snug"
                            onClick={() => setMenuOpen(false)}
                          >
                            {label}
                          </a>
                          {children && children.length > 0 && (
                            <ul className="mt-4 space-y-2 border-l border-brand-secondary/15 pl-4">
                              {children.map((c) => (
                                <li key={c.label}>
                                  <a
                                    href={c.href}
                                    className="group flex items-start gap-2 text-sm font-medium text-brand-secondary transition-colors hover:text-brand-primary"
                                    onClick={() => setMenuOpen(false)}
                                  >
                                    <span
                                      className="mt-0.5 font-jetbrains text-xs text-brand-secondary/45"
                                      aria-hidden
                                    >
                                      ↳
                                    </span>
                                    {c.label}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Column 2 — Spotlight */}
                  <div className="flex flex-col overflow-hidden px-6 py-7 md:px-8 md:py-8">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="font-jetbrains text-[0.65rem] uppercase tracking-[0.14em] text-brand-secondary/50">
                        Latest
                      </p>
                      <a
                        href="#"
                        className="font-jetbrains text-[0.65rem] uppercase tracking-[0.12em] text-brand-secondary underline-offset-4 transition-colors hover:text-brand-primary hover:underline"
                        onClick={() => setMenuOpen(false)}
                      >
                        Newsroom ↗
                      </a>
                    </div>
                    <div className="mt-7 space-y-7">
                      <article className="space-y-3">
                        <p className="font-jetbrains text-[0.65rem] uppercase tracking-wider text-brand-secondary/45">
                          Company · March 2026
                        </p>
                        <p className="text-sm leading-relaxed text-brand-secondary">
                          Expanding coated-fastener capacity for regulated industrial
                          programs.
                        </p>
                        <a
                          href="#"
                          className="inline-block text-sm font-medium text-brand-primary underline decoration-brand-primary/30 underline-offset-4 transition-colors hover:decoration-brand-primary"
                          onClick={() => setMenuOpen(false)}
                        >
                          Read more
                        </a>
                      </article>
                      <article className="space-y-3 border-t border-brand-secondary/10 pt-7 [@media(max-height:780px)]:hidden">
                        <p className="font-jetbrains text-[0.65rem] uppercase tracking-wider text-brand-secondary/45">
                          Supply chain · Q1 2026
                        </p>
                        <p className="text-sm leading-relaxed text-brand-secondary">
                          How distributors shorten lead times with audited sourcing and
                          documentation packs.
                        </p>
                        <a
                          href="#"
                          className="inline-block text-sm font-medium text-brand-primary underline decoration-brand-primary/30 underline-offset-4 transition-colors hover:decoration-brand-primary"
                          onClick={() => setMenuOpen(false)}
                        >
                          Learn more
                        </a>
                      </article>
                    </div>
                  </div>

                  {/* Column 3 — Overview */}
                  <div className="flex flex-col overflow-hidden px-6 py-7 md:px-8 md:py-8">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="font-jetbrains text-[0.65rem] uppercase tracking-[0.14em] text-brand-secondary/50">
                        Offerings
                      </p>
                      <a
                        href="#"
                        className="font-jetbrains text-[0.65rem] uppercase tracking-[0.12em] text-brand-secondary underline-offset-4 transition-colors hover:text-brand-primary hover:underline"
                        onClick={() => setMenuOpen(false)}
                      >
                        View all ↗
                      </a>
                    </div>
                    <p className="mt-7 text-sm leading-relaxed text-brand-secondary md:text-[0.9375rem] md:leading-[1.65]">
                      Fair Fasteners supports commercial builders, OEMs, and industrial
                      teams with specification-grade hardware, traceable sourcing, and
                      responsive technical support—from quote through installation.
                    </p>
                    <a
                      href="#"
                      className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-brand-primary transition-colors hover:text-brand-primary-hover"
                      onClick={() => setMenuOpen(false)}
                    >
                      <span className="font-jetbrains text-xs text-brand-secondary/45" aria-hidden>
                        ↳
                      </span>
                      Contact our team
                    </a>
                    <div className="mt-8 hidden border border-brand-secondary/10 bg-brand-surface p-4 sm:block [@media(max-height:780px)]:hidden">
                      <p className="font-jetbrains text-[0.6rem] uppercase tracking-wider text-brand-secondary/45">
                        Quick line
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-brand-secondary/80">
                        Need a drawing reviewed or a material substitution? Our
                        engineers help you stay compliant without slowing the job site.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-brand-secondary/12 px-6 py-5 md:px-10">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-center text-xs text-brand-secondary/50 sm:text-left">
                      © {new Date().getFullYear()} Fair Fasteners
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
