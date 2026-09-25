'use client';

import DottedScene from '@/components/DottedScene';

type Intensity = 'hero' | 'band' | 'whisper';

/**
 * Local atmosphere only — the fixed green circle lives in BrandBackdrop
 * so it stays put while scrolling. Overlays must fade out (never hard-cut)
 * or the home page will show a seam between sections.
 */
export default function AmbientBackground({
  reduce,
  scene = false,
  intensity,
  /** When false, skip solid fill so BrandBackdrop shows through. */
  fill = false,
}: {
  reduce: boolean | null;
  scene?: boolean;
  intensity?: Intensity;
  fill?: boolean;
}) {
  const level: Intensity = intensity ?? (scene ? 'hero' : 'band');

  /* Coming Soon keeps a local green circle; live pages rely on BrandBackdrop. */
  const wash =
    level === 'hero' && fill
      ? [
          'radial-gradient(circle 78vmin at 50% 46%, color-mix(in srgb, var(--brand-primary) 58%, transparent) 0%, color-mix(in srgb, var(--brand-primary) 28%, transparent) 42%, transparent 82%)',
          'radial-gradient(ellipse 70% 50% at 50% 40%, transparent 45%, rgba(0,0,0,0.12) 100%)',
        ].join(', ')
      : level === 'band'
        ? [
            'radial-gradient(ellipse 80% 55% at 15% 25%, color-mix(in srgb, var(--brand-primary) 6%, transparent) 0%, transparent 55%)',
            'radial-gradient(ellipse 60% 45% at 90% 85%, color-mix(in srgb, var(--brand-primary) 4%, transparent) 0%, transparent 50%)',
          ].join(', ')
        : level === 'whisper'
          ? 'radial-gradient(ellipse 100% 70% at 50% 110%, color-mix(in srgb, var(--brand-primary) 6%, transparent) 0%, transparent 50%)'
          : undefined;

  return (
    <div
      className={`pointer-events-none absolute inset-0 ${scene && !fill ? 'overflow-visible' : 'overflow-hidden'}`}
      aria-hidden
    >
      {fill ? <div className="absolute inset-0 bg-brand-field" /> : null}
      {wash ? <div className="absolute inset-0" style={{ background: wash }} /> : null}
      {scene ? <DottedScene reduce={reduce} pinBleed={!fill} animate={fill} /> : null}
      {/* Soft top shade only — no bottom band (that was the hero/section seam). */}
      {level === 'hero' ? (
        <div
          className="absolute inset-x-0 top-0 h-[42%]"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.22) 0%, transparent 100%)',
          }}
        />
      ) : null}
    </div>
  );
}
