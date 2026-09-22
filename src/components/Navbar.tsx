'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ChevronDown, Menu, X } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1] as const;
const CLOSE_DELAY_MS = 140;

type MegaEntry = {
  href: string;
  title: string;
  description: string;
};

type MegaItem = {
  id: string;
  label: string;
  href: string;
  entries?: readonly MegaEntry[];
  featured?: { src: string; alt: string };
};

const megaItems: readonly MegaItem[] = [
  {
    id: 'about',
    label: 'About',
    href: '/about',
    entries: [
      {
        href: '/about',
        title: 'Overview',
        description: 'Who we are and how Fair Fasteners supports industrial programs.',
      },
      {
        href: '/about#leadership',
        title: 'Leadership',
        description: 'Meet the people behind the hardware and supply discipline.',
      },
      {
        href: 'mailto:info@fairfasteners.com',
        title: 'Careers',
        description: 'Join a team built around reliable product and responsive support.',
      },
    ],
    featured: {
      src: '/images/energy.jpg',
      alt: 'Fair Fasteners company',
    },
  },
  {
    id: 'products',
    label: 'Products',
    href: '/products',
    entries: [
      {
        href: '/products',
        title: 'Rivets & bolts',
        description: 'Structural fasteners for commercial and OEM assemblies.',
      },
      {
        href: '/products',
        title: 'Screws & threaded',
        description: 'Precision threaded hardware for demanding joints.',
      },
      {
        href: '/products',
        title: 'Nuts, washers & kits',
        description: 'Matched kits and finishes ready for the job site.',
      },
      {
        href: '/products',
        title: 'Specialty hardware',
        description: 'Coated and high-strength options for harsh environments.',
      },
      {
        href: '/products',
        title: 'Corrosion resistant',
        description: 'Materials and coatings selected for longevity outdoors.',
      },
    ],
    featured: {
      src: '/images/manufacturing.jpg',
      alt: 'Industrial fastening products',
    },
  },
  {
    id: 'solutions',
    label: 'Solutions',
    href: '#',
    entries: [
      {
        href: '#',
        title: 'Commercial programs',
        description: 'Reliable supply for builders and distribution partners.',
      },
      {
        href: '#',
        title: 'OEM & custom runs',
        description: 'Made-to-spec fasteners aligned to your drawings.',
      },
      {
        href: '#',
        title: 'Manufacturing',
        description: 'Hardware that keeps production lines moving.',
      },
      {
        href: '#',
        title: 'Infrastructure',
        description: 'Traceable products for regulated civil projects.',
      },
      {
        href: '#',
        title: 'Energy & marine',
        description: 'Corrosion-class solutions for extreme conditions.',
      },
    ],
    featured: {
      src: '/images/infrastructure.jpg',
      alt: 'Industrial solutions and infrastructure',
    },
  },
  {
    id: 'news',
    label: 'News',
    href: '/news',
  },
] as const;

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.045, delayChildren: 0.05 },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease },
  },
} as const;

function MegaPanelContent({
  item,
  reduce,
  onNavigate,
}: {
  item: MegaItem;
  reduce: boolean | null;
  onNavigate?: () => void;
}) {
  if (!item.entries?.length) return null;

  return (
    <motion.div
      key={item.id}
      variants={listVariants}
      initial={reduce ? false : 'hidden'}
      animate="visible"
      className="grid grid-cols-1 gap-8 p-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.85fr)] md:gap-10 md:p-8 lg:p-9"
    >
      <div className="grid grid-cols-1 gap-x-10 gap-y-7 sm:grid-cols-2">
        {item.entries.map((entry) => (
          <motion.a
            key={entry.title}
            href={entry.href}
            variants={itemVariants}
            onClick={onNavigate}
            className="group block rounded-lg px-3 py-3 outline-none transition-colors duration-300 hover:bg-black/[0.04] focus-visible:ring-2 focus-visible:ring-brand-primary"
          >
            <p className="text-[0.9375rem] font-semibold tracking-tight text-brand-secondary transition-colors duration-300 group-hover:text-brand-primary">
              {entry.title}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-brand-secondary/55 transition-colors duration-300 group-hover:text-brand-secondary/75">
              {entry.description}
            </p>
          </motion.a>
        ))}
      </div>

      {item.featured && (
        <motion.div
          variants={itemVariants}
          className="relative min-h-[200px] overflow-hidden rounded-xl bg-brand-secondary/5 md:min-h-full"
        >
          <Image
            src={item.featured.src}
            alt={item.featured.alt}
            fill
            sizes="(max-width: 768px) 100vw, 420px"
            className="object-cover"
          />
        </motion.div>
      )}
    </motion.div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [renderedItem, setRenderedItem] = useState<MegaItem | null>(null);
  const [panelHeight, setPanelHeight] = useState(0);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const isHome = pathname === '/';
  const isDarkPage = isHome || pathname === '/about' || pathname.startsWith('/about/');
  const megaOpen = Boolean(activeId);

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openMega = (item: MegaItem) => {
    clearCloseTimer();
    if (item.entries?.length) setActiveId(item.id);
    else setActiveId(null);
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setActiveId(null), CLOSE_DELAY_MS);
  };

  useEffect(() => () => clearCloseTimer(), []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveId(null);
  }, [pathname]);

  const activeItem = megaItems.find((item) => item.id === activeId) ?? null;

  useLayoutEffect(() => {
    if (activeItem?.entries) setRenderedItem(activeItem);
  }, [activeItem]);

  useLayoutEffect(() => {
    const node = measureRef.current;
    if (!node || !renderedItem) return;
    const measure = () => setPanelHeight(node.scrollHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(node);
    return () => ro.disconnect();
  }, [renderedItem]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveId(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const heightTransition = reduce
    ? { duration: 0 }
    : { duration: 0.45, ease };

  const onLight = !isDarkPage;
  const linkBase = onLight
    ? 'text-brand-secondary/70 hover:text-brand-secondary'
    : 'text-white/80 hover:text-white';
  const pillActive = onLight
    ? 'bg-brand-secondary/10 text-brand-secondary'
    : 'bg-white/15 text-white';
  const contactBtn = onLight
    ? 'border-brand-secondary/25 text-brand-secondary hover:border-brand-secondary hover:bg-brand-secondary hover:text-white'
    : 'border-white/50 text-white hover:border-white hover:bg-white hover:text-brand-secondary';

  return (
    <>
      <header
        className="fixed left-0 right-0 top-0 z-[110] bg-transparent font-sans"
        onMouseLeave={scheduleClose}
      >
        <nav className="mx-auto flex h-[4.5rem] w-full max-w-[1600px] items-center justify-between gap-4 px-4 md:h-20 md:px-5 lg:px-6">
          <a
            href="/"
            className="flex shrink-0 items-center outline-none ring-brand-primary focus-visible:ring-2"
            onMouseEnter={scheduleClose}
          >
            <img
              src="/company_logo.png"
              alt="Fair Fasteners"
              className="h-7 w-auto object-contain md:h-8"
            />
          </a>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <ul className="hidden items-center gap-1 lg:flex">
              {megaItems.map((item) => {
                const hasMenu = Boolean(item.entries?.length);
                const isOpen = activeId === item.id;
                const routeActive =
                  item.href !== '#' &&
                  item.href !== '/' &&
                  pathname.startsWith(item.href);

                return (
                  <li
                    key={item.id}
                    onMouseEnter={() => openMega(item)}
                    onFocus={() => openMega(item)}
                  >
                    <a
                      href={item.href}
                      className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[0.8125rem] font-medium tracking-tight transition-colors duration-300 ${
                        isOpen ? pillActive : linkBase
                      } ${!isOpen && routeActive && !megaOpen ? 'underline underline-offset-[5px]' : ''}`}
                      aria-expanded={hasMenu ? isOpen : undefined}
                      aria-controls={hasMenu ? 'site-mega-panel' : undefined}
                    >
                      {item.label}
                      {hasMenu && (
                        <ChevronDown
                          className={`h-3.5 w-3.5 opacity-70 transition-transform duration-300 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                          strokeWidth={2}
                          aria-hidden
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>

            <a
              href="#contact"
              className={`hidden items-center rounded-full border px-4 py-2 text-[0.8125rem] font-medium tracking-tight transition-colors duration-300 sm:inline-flex ${contactBtn}`}
              onMouseEnter={scheduleClose}
            >
              Contact
            </a>

            <button
              type="button"
              className={`inline-flex items-center justify-center p-2 lg:hidden ${
                onLight ? 'text-brand-secondary' : 'text-white'
              }`}
              aria-expanded={mobileOpen}
              aria-controls="site-mobile-menu"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileOpen((o) => !o)}
            >
              {mobileOpen ? (
                <X className="h-5 w-5" strokeWidth={1.5} aria-hidden />
              ) : (
                <Menu className="h-5 w-5" strokeWidth={1.5} aria-hidden />
              )}
            </button>
          </div>
        </nav>

        {/* Floating mega pane */}
        <div className="pointer-events-none absolute left-0 right-0 top-full hidden px-4 pt-1 md:px-5 lg:block lg:px-6">
          <motion.div
            id="site-mega-panel"
            role="region"
            aria-label={activeItem ? `${activeItem.label} menu` : 'Menu'}
            aria-hidden={!megaOpen}
            className="pointer-events-auto mx-auto max-w-[1100px] overflow-hidden rounded-xl bg-white shadow-[0_24px_60px_rgba(15,23,42,0.22)]"
            initial={false}
            animate={{
              height: megaOpen ? panelHeight : 0,
              opacity: megaOpen ? 1 : 0,
              y: megaOpen ? 0 : -6,
            }}
            transition={heightTransition}
            onMouseEnter={clearCloseTimer}
            onAnimationComplete={() => {
              if (!activeId) setRenderedItem(null);
            }}
            style={{ pointerEvents: megaOpen ? 'auto' : 'none' }}
          >
            <div ref={measureRef}>
              {renderedItem && (
                <MegaPanelContent
                  key={renderedItem.id}
                  item={renderedItem}
                  reduce={reduce}
                  onNavigate={() => setActiveId(null)}
                />
              )}
            </div>
          </motion.div>
        </div>
      </header>

      <AnimatePresence>
        {megaOpen && (
          <motion.button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 z-[100] hidden bg-black/25 lg:block"
            initial={{ opacity: reduce ? 1 : 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: reduce ? 1 : 0 }}
            transition={{ duration: reduce ? 0 : 0.35, ease }}
            onClick={() => setActiveId(null)}
            onMouseEnter={scheduleClose}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="site-mobile-menu"
            key="mobile-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-[105] flex flex-col bg-white pt-[4.5rem] font-sans lg:hidden"
            initial={{ opacity: reduce ? 1 : 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: reduce ? 1 : 0 }}
            transition={{ duration: reduce ? 0 : 0.35, ease }}
          >
            <div className="flex-1 overflow-y-auto px-5 pt-2 pb-8">
              {megaItems.map((item, i) => {
                const hasMenu = Boolean(item.entries?.length);
                const expanded = mobileExpanded === item.id;
                return (
                  <motion.div
                    key={item.id}
                    className="border-b border-brand-secondary/10"
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: reduce ? 0 : 0.35,
                      delay: reduce ? 0 : 0.04 * i,
                      ease,
                    }}
                  >
                    {hasMenu ? (
                      <>
                        <button
                          type="button"
                          className="flex w-full items-center justify-between py-4 text-left text-lg font-medium tracking-tight text-brand-secondary"
                          aria-expanded={expanded}
                          onClick={() =>
                            setMobileExpanded((id) =>
                              id === item.id ? null : item.id,
                            )
                          }
                        >
                          {item.label}
                          <ChevronDown
                            className={`h-4 w-4 text-brand-secondary/50 transition-transform duration-300 ${
                              expanded ? 'rotate-180' : ''
                            }`}
                            strokeWidth={1.75}
                            aria-hidden
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {expanded && (
                            <motion.div
                              initial={reduce ? false : { height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={reduce ? undefined : { height: 0, opacity: 0 }}
                              transition={{ duration: reduce ? 0 : 0.32, ease }}
                              className="overflow-hidden"
                            >
                              <ul className="space-y-4 pb-5 pl-1">
                                {item.entries!.map((entry) => (
                                  <li key={entry.title}>
                                    <a
                                      href={entry.href}
                                      className="block"
                                      onClick={() => setMobileOpen(false)}
                                    >
                                      <p className="text-[0.9375rem] font-semibold text-brand-secondary">
                                        {entry.title}
                                      </p>
                                      <p className="mt-1 text-sm text-brand-secondary/55">
                                        {entry.description}
                                      </p>
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <a
                        href={item.href}
                        className="block py-4 text-lg font-medium tracking-tight text-brand-secondary"
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </a>
                    )}
                  </motion.div>
                );
              })}
            </div>

            <div className="border-t border-brand-secondary/10 px-5 py-6">
              <a
                href="#contact"
                className="flex w-full items-center justify-center rounded-full border border-brand-secondary px-4 py-3 text-[0.9375rem] font-medium text-brand-secondary"
                onClick={() => setMobileOpen(false)}
              >
                Contact
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
