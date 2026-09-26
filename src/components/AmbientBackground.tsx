'use client';

import DottedScene from '@/components/DottedScene';

type Intensity = 'hero' | 'band' | 'whisper';

/** Original Coming Soon teal — used for the center glow wash. */
const COMING_SOON_TEAL = '#0b3d36';

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

  /* Coming Soon: center-glow effect with original teal — less black at the edges. */
  const wash =
    level === 'hero' && fill
      ? [
          `radial-gradient(circle 95vmin at 50% 46%, color-mix(in srgb, ${COMING_SOON_TEAL} 88%, transparent) 0%, color-mix(in srgb, ${COMING_SOON_TEAL} 62%, transparent) 38%, color-mix(in srgb, ${COMING_SOON_TEAL} 32%, transparent) 68%, transparent 90%)`,
          `radial-gradient(ellipse 110% 80% at 50% 100%, color-mix(in srgb, ${COMING_SOON_TEAL} 28%, transparent) 0%, transparent 60%)`,
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
      {fill ? (
        <div
          className="absolute inset-0"
          style={{
            background: `color-mix(in srgb, ${COMING_SOON_TEAL} 55%, var(--brand-field))`,
          }}
        />
      ) : null}
      {wash ? <div className="absolute inset-0" style={{ background: wash }} /> : null}
      {scene ? <DottedScene reduce={reduce} pinBleed={!fill} animate={fill} /> : null}
      {/* Soft top shade only — no bottom band (that was the hero/section seam). */}
      {level === 'hero' && !fill ? (
        <div
          className="absolute inset-x-0 top-0 h-[42%]"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.22) 0%, transparent 100%)',
          }}
        />
      ) : null}
      {level === 'hero' && fill ? (
        <>
          <div
            className="absolute inset-x-0 top-0 h-[36%]"
            style={{
              background:
                'linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, transparent 100%)',
            }}
          />
          {/* Black falloff on corners and sides */}
          <div
            className="absolute inset-0"
            style={{
              background: [
                'radial-gradient(ellipse 75% 70% at 50% 48%, transparent 35%, rgba(0,0,0,0.45) 100%)',
                'linear-gradient(to right, rgba(0,0,0,0.35) 0%, transparent 18%, transparent 82%, rgba(0,0,0,0.35) 100%)',
                'linear-gradient(to bottom, rgba(0,0,0,0.22) 0%, transparent 20%, transparent 78%, rgba(0,0,0,0.28) 100%)',
              ].join(', '),
            }}
          />
        </>
      ) : null}
    </div>
  );
}
