import Image from 'next/image';
import { getProductItems } from '@/lib/products';

export const metadata = {
  title: 'Products — Fair Fasteners',
  description: 'Browse popular fasteners, hardware, and kits.',
};

export default function ProductsPage() {
  const items = getProductItems();

  return (
    <main className="bg-brand-surface font-sans">
      <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-8 lg:px-10">
        <div className="max-w-3xl">
          <p className="font-jetbrains text-[0.7rem] uppercase tracking-[0.14em] text-brand-secondary/60">
            Products
          </p>
          <h1 className="mt-3 text-5xl leading-[1.02] tracking-tight text-brand-secondary md:text-6xl">
            Built for demanding assemblies
          </h1>
          <p className="mt-4 text-sm font-light leading-relaxed text-brand-secondary/75 md:text-base">
            Manage products in{' '}
            <code className="font-medium text-brand-secondary">src/data/products.json</code>.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <article
              key={p.id}
              className="group relative overflow-hidden border border-brand-secondary/15 bg-white/45 backdrop-blur-sm"
            >
              {p.image ? (
                <div className="relative aspect-[16/9] border-b border-brand-secondary/15">
                  <Image
                    src={p.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ) : (
                <div
                  className="relative aspect-[16/9] border-b border-brand-secondary/15"
                  aria-hidden
                  style={{
                    background:
                      'radial-gradient(120% 95% at 10% 15%, color-mix(in srgb, var(--brand-primary) 14%, transparent) 0%, transparent 55%), radial-gradient(120% 95% at 85% 70%, color-mix(in srgb, var(--brand-secondary) 10%, transparent) 0%, transparent 60%)',
                  }}
                />
              )}

              <div className="p-6">
                <p className="font-jetbrains text-[0.6875rem] uppercase tracking-[0.12em] text-brand-secondary/55">
                  {p.category}
                </p>
                <h2 className="mt-3 text-xl font-medium tracking-tight text-brand-secondary">
                  {p.name}
                </h2>
                {p.range ? (
                  <p className="mt-3 text-sm font-light leading-relaxed text-brand-secondary/75">
                    {p.range}
                  </p>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

