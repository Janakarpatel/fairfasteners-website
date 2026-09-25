import Image from 'next/image';
import BackNav from '@/components/BackNav';
import PageContainer from '@/components/PageContainer';
import ProductTrustStrip from '@/components/ProductTrustStrip';
import { getProductItems } from '@/lib/products';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Products',
  description:
    'Browse Fair Fasteners products: industrial bolts, screws, nuts, washers, rivets, hardware, and kits for OEM and field supply.',
  path: '/products',
});

export default function ProductsPage() {
  const items = getProductItems();

  return (
    <main className="bg-transparent font-sans text-white">
      <PageContainer>
        <BackNav href="/" label="Back to home" className="mb-10" />
        <div className="max-w-3xl">
          <p className="font-jetbrains text-[0.7rem] uppercase tracking-[0.14em] text-white/55">
            Products
          </p>
          <h1 className="mt-3 text-5xl leading-[1.02] tracking-tight text-white md:text-6xl">
            Built for demanding assemblies
          </h1>
          <p className="mt-4 text-sm font-light leading-relaxed text-white/65 md:text-base">
            Manage products in{' '}
            <code className="font-medium text-white/85">src/data/products.json</code>.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <article
              key={p.id}
              className="group relative overflow-hidden border border-white/12 bg-white/[0.06] backdrop-blur-sm"
            >
              {p.image ? (
                <div className="relative aspect-[16/9] border-b border-white/10">
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
                  className="relative aspect-[16/9] border-b border-white/10"
                  aria-hidden
                  style={{
                    background:
                      'radial-gradient(120% 95% at 10% 15%, color-mix(in srgb, white 12%, transparent) 0%, transparent 55%), radial-gradient(120% 95% at 85% 70%, color-mix(in srgb, white 6%, transparent) 0%, transparent 60%)',
                  }}
                />
              )}

              <div className="p-6">
                <p className="font-jetbrains text-[0.6875rem] uppercase tracking-[0.12em] text-white/50">
                  {p.category}
                </p>
                <h2 className="mt-3 text-xl font-medium tracking-tight text-white">
                  {p.name}
                </h2>
                {p.range ? (
                  <p className="mt-3 text-sm font-light leading-relaxed text-white/65">
                    {p.range}
                  </p>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </PageContainer>

      <ProductTrustStrip />
    </main>
  );
}
