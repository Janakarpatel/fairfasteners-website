'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import gsap from 'gsap';
import contactData from '@/data/contact.json';
import AmbientBackground from '@/components/AmbientBackground';

const ease = [0.16, 1, 0.3, 1] as const;

function ContactHoverLink({
  href,
  label,
  reduce,
  onClick,
}: {
  href?: string;
  label: string | string[];
  reduce: boolean | null;
  onClick?: () => void;
}) {
  const charsRef = useRef<HTMLSpanElement | null>(null);
  const tweenRef = useRef<gsap.core.Timeline | null>(null);

  const runHover = (entering: boolean) => {
    if (reduce) return;
    const fronts = charsRef.current?.querySelectorAll('[data-char-front]');
    const backs = charsRef.current?.querySelectorAll('[data-char-back]');
    if (!fronts?.length || !backs?.length) return;

    tweenRef.current?.kill();
    const tl = gsap.timeline({
      defaults: { ease: 'power3.inOut', transformPerspective: 600 },
    });
    tweenRef.current = tl;

    if (entering) {
      tl.to(
        fronts,
        {
          rotateX: -90,
          duration: 0.35,
          stagger: 0.018,
        },
        0,
      ).fromTo(
        backs,
        { rotateX: 90 },
        {
          rotateX: 0,
          duration: 0.35,
          stagger: 0.018,
        },
        0.08,
      );
    } else {
      tl.to(
        backs,
        {
          rotateX: 90,
          duration: 0.3,
          stagger: { each: 0.014, from: 'end' },
        },
        0,
      ).to(
        fronts,
        {
          rotateX: 0,
          duration: 0.3,
          stagger: { each: 0.014, from: 'end' },
        },
        0.06,
      );
    }
  };

  const className =
    'relative inline-block max-w-full cursor-pointer text-left text-[0.8125rem] text-brand-surface/90 sm:text-sm';
  const hoverProps = {
    className,
    style: { perspective: 600 } as const,
    onMouseEnter: () => runHover(true),
    onMouseLeave: () => runHover(false),
    onFocus: () => runHover(true),
    onBlur: () => runHover(false),
  };
  const lines = Array.isArray(label) ? label : [label];
  const inner = (
      <span
        ref={charsRef}
        className="flex flex-col items-start"
        aria-label={lines.join(', ')}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {lines.map((line) => (
          <span key={line} className="inline-flex">
            {Array.from(line).map((ch, i) => {
              const display = ch === ' ' ? '\u00A0' : ch;
              return (
                <span
                  key={`${line}-${ch}-${i}`}
                  className="relative inline-block overflow-hidden"
                  style={{
                    whiteSpace: ch === ' ' ? 'pre' : undefined,
                    perspective: 400,
                    height: '1.2em',
                    lineHeight: '1.2em',
                  }}
                >
                  <span
                    data-char-front
                    className="inline-block will-change-transform"
                    style={{ transformOrigin: '50% 50%', backfaceVisibility: 'hidden' }}
                  >
                    {display}
                  </span>
                  <span
                    data-char-back
                    className="absolute inset-0 inline-block text-white will-change-transform"
                    style={{
                      transformOrigin: '50% 50%',
                      backfaceVisibility: 'hidden',
                      transform: 'rotateX(90deg)',
                    }}
                    aria-hidden
                  >
                    {display}
                  </span>
                </span>
              );
            })}
          </span>
        ))}
      </span>
  );

  if (onClick) {
    return (
      <button type="button" {...hoverProps} onClick={onClick}>
        {inner}
      </button>
    );
  }

  return (
    <a href={href} {...hoverProps}>
      {inner}
    </a>
  );
}

function LocationHoverButton({
  lines,
  onClick,
}: {
  lines: string[];
  reduce: boolean | null;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group/loc max-w-full min-w-0 text-left"
      aria-label={`${lines.join(', ')}. View map`}
    >
      <span className="block text-[0.8125rem] leading-snug text-brand-surface/80 transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/loc:text-white group-focus-visible/loc:text-white sm:text-sm">
        {lines.map((line) => (
          <span key={line} className="block sm:whitespace-nowrap">
            {line}
          </span>
        ))}
      </span>
      <span className="mt-1.5 block text-[0.65rem] tracking-[0.04em] text-white/45 transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/loc:text-white/70 group-focus-visible/loc:text-white/70 sm:text-white/0 sm:group-hover/loc:text-white/55">
        View on map
      </span>
    </button>
  );
}

function LogoPinMap() {
  const { lat, lng, zoom } = contactData.maps;
  const src = `https://www.google.com/maps?ll=${lat},${lng}&z=${zoom}&t=m&hl=en&output=embed`;

  return (
    <div className="relative h-full w-full overflow-hidden">
      <iframe
        title="Fair Fasteners location"
        src={src}
        className="pointer-events-none h-full w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <a
        href={contactData.maps.placeUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open in Google Maps"
        className="absolute left-2 top-2 z-[2] h-[72px] w-[220px] cursor-pointer"
      />
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-full">
        <div className="ff-map-pin">
          <img src="/map-pin.svg" alt="" className="ff-map-pin-shape" />
          <img src="/company_logo.png" alt="" className="ff-map-pin-logo" />
        </div>
      </div>
    </div>
  );
}

function LocationMapDialog({
  open,
  onClose,
  reduce,
}: {
  open: boolean;
  onClose: () => void;
  reduce: boolean | null;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-end justify-center sm:items-center sm:p-4"
          initial={{ opacity: reduce ? 1 : 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: reduce ? 1 : 0 }}
          transition={{ duration: reduce ? 0 : 0.28, ease }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/55"
            aria-label="Close map"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="location-map-title"
            className="relative z-10 max-h-[90dvh] w-full max-w-3xl overflow-y-auto overflow-x-hidden rounded-t-2xl border border-white/15 bg-brand-field shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:rounded-lg"
            initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 16, scale: reduce ? 1 : 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 10, scale: reduce ? 1 : 0.98 }}
            transition={{ duration: reduce ? 0 : 0.32, ease }}
          >
            <div className="flex items-start justify-between gap-3 px-4 pb-3 pt-4 sm:gap-4 sm:px-5">
              <div>
                <p
                  id="location-map-title"
                  className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-brand-surface/50"
                >
                  Location
                </p>
                <p className="mt-1 text-sm leading-snug text-brand-surface">Fair Fasteners</p>
                {contactData.location.map((line) => (
                  <p key={line} className="text-sm leading-snug text-brand-surface/70 sm:whitespace-nowrap">
                    {line}
                  </p>
                ))}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="shrink-0 rounded-md border border-white/25 px-3 py-1.5 text-sm text-brand-surface/80 hover:border-white hover:text-white sm:px-4 sm:py-2"
              >
                Close
              </button>
            </div>
            <div className="aspect-[4/3] w-full overflow-hidden bg-[#d9e2dc] sm:aspect-[2/1]">
              <LogoPinMap />
            </div>
            <div className="flex items-center justify-center gap-2 px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:justify-start sm:px-5 sm:pb-4">
              <a
                href={contactData.maps.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-brand-surface px-4 py-2.5 text-sm text-brand-secondary hover:bg-white sm:min-h-0 sm:w-auto sm:py-2"
              >
                Directions
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function ComingSoon() {
  const reduce = useReducedMotion();
  const [mapOpen, setMapOpen] = useState(false);

  return (
    <main className="relative flex min-h-[100dvh] w-full flex-col overflow-x-hidden font-sans text-brand-surface">
      <AmbientBackground reduce={reduce} scene intensity="hero" fill />

      <motion.header
        className="relative z-20 shrink-0"
        initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0 : 0.7, ease }}
      >
        <div className="mx-auto flex h-14 w-full max-w-[1600px] items-center justify-between px-4 md:h-20 md:px-8 lg:px-10">
          <img
            src="/company_logo.png"
            alt="Fair Fasteners"
            className="h-6 w-auto object-contain md:h-7"
          />
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-brand-surface/45 md:text-[0.6rem]">
            since 1974
          </p>
        </div>
      </motion.header>

      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-end px-4 pb-[max(3.25rem,calc(env(safe-area-inset-bottom)+2.5rem))] pt-6 md:px-8 md:pb-14 md:pt-8 lg:px-10"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: reduce ? 1 : 0 },
          visible: {
            opacity: 1,
            transition: reduce
              ? { duration: 0 }
              : { staggerChildren: 0.1, delayChildren: 0.08 },
          },
        }}
      >
        <motion.p
          className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-brand-surface/55 md:text-[0.7rem]"
          variants={{
            hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 14 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: reduce ? 0 : 0.7, ease },
            },
          }}
        >
          Still open
        </motion.p>

        <motion.h1
          className="mt-2 max-w-4xl text-[clamp(1.85rem,8.2vw,5.5rem)] leading-[1.02] tracking-tighter text-brand-surface md:mt-3 md:leading-[0.98]"
          variants={{
            hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 22 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: reduce ? 0 : 0.85, ease },
            },
          }}
        >
          We&apos;re improving
          <br />
          our identity.
        </motion.h1>

        <motion.p
          className="mt-4 text-[0.8125rem] font-light leading-relaxed text-brand-surface/75 md:mt-5 md:text-base md:leading-snug"
          variants={{
            hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 16 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: reduce ? 0 : 0.75, ease },
            },
          }}
        >
          <span className="block md:whitespace-nowrap">Apologies the site is still taking shape.</span>
          <span className="block md:whitespace-nowrap">
            Specs, quotes, sales, and supply are open, write or call, we&apos;re here at your service.
          </span>
        </motion.p>

        <motion.div
          className="mt-8 grid grid-cols-1 border-t border-white/15 pt-6 sm:max-w-5xl sm:grid-cols-[auto_auto_max-content] sm:gap-x-6 sm:gap-y-4 sm:pt-6"
          variants={{
            hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 14 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: reduce ? 0 : 0.7, ease },
            },
          }}
        >
          <div className="min-w-0">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-brand-surface/45">
              Phone
            </p>
            <div className="mt-2 flex flex-col gap-1.5">
              {contactData.phones.map((phone) => (
                <ContactHoverLink
                  key={phone.href}
                  href={phone.href}
                  label={phone.label}
                  reduce={reduce}
                />
              ))}
            </div>
          </div>
          <div className="min-w-0">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-brand-surface/45">
              Email
            </p>
            <div className="mt-2">
              <ContactHoverLink
                href={contactData.email.href}
                label={contactData.email.label}
                reduce={reduce}
              />
            </div>
          </div>
          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-brand-surface/45">
              Location
            </p>
            <div className="mt-2">
              <LocationHoverButton
                lines={contactData.location}
                reduce={reduce}
                onClick={() => setMapOpen(true)}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>

      <LocationMapDialog
        open={mapOpen}
        onClose={() => setMapOpen(false)}
        reduce={reduce}
      />

      <a
        href="https://janakarpatel.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-[max(0.65rem,env(safe-area-inset-bottom))] right-4 z-20 text-[9px] leading-none text-brand-surface/40 hover:text-brand-surface md:bottom-6 md:right-8 md:text-[11px] lg:right-10"
      >
        Designed by Janakar Patel
      </a>
    </main>
  );
}
