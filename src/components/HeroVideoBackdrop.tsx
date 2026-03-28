'use client';

import { useReducedMotion } from 'motion/react';

export const HERO_VIDEO_SRC = '/videos/hero_section_vid.mp4';

type Props = {
  /** When true, skip decorative video (e.g. reduced motion). */
  forceStatic?: boolean;
};

export default function HeroVideoBackdrop({ forceStatic }: Props) {
  const reduce = useReducedMotion();
  const staticBg = forceStatic === true || reduce === true;

  if (staticBg) {
    return (
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-brand-surface"
        aria-hidden
      />
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src={HERO_VIDEO_SRC} type="video/mp4" />
      </video>
      {/* Base vertical wash */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-surface via-brand-surface/55 to-brand-surface/25" />
      {/* Extra density bottom-left where hero copy sits */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 115% 95% at 0% 100%, color-mix(in srgb, var(--brand-surface) 96%, transparent) 0%, color-mix(in srgb, var(--brand-surface) 72%, transparent) 38%, color-mix(in srgb, var(--brand-surface) 35%, transparent) 58%, transparent 72%)',
        }}
      />
    </div>
  );
}
