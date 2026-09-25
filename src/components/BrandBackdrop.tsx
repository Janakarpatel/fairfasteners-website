/**
 * Fixed site backdrop — near-black with a persistent center brand-green pool.
 * Stays put while scrolling so the whole home page reads as one continuous field.
 */
export default function BrandBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      <div className="absolute inset-0 bg-brand-field" />
      {/* Smooth center green circle — fixed through the whole scroll */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            'radial-gradient(circle 78vmin at 50% 46%, color-mix(in srgb, var(--brand-primary) 58%, transparent) 0%, color-mix(in srgb, var(--brand-primary) 28%, transparent) 42%, color-mix(in srgb, var(--brand-primary) 8%, transparent) 68%, transparent 82%)',
            'radial-gradient(ellipse 100% 70% at 50% 100%, color-mix(in srgb, var(--brand-primary) 10%, transparent) 0%, transparent 55%)',
          ].join(', '),
        }}
      />
      {/* Soft edge vignette — even falloff, no hard section edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 100% 95% at 50% 48%, transparent 45%, rgba(0,0,0,0.28) 100%)',
        }}
      />
    </div>
  );
}
