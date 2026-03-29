export default function HomeValueSection() {
  const columns = [
    {
      title: 'Full range',
      body:
        'Our catalog spans industrial rivets, bolts, screws, nuts, washers, and specialty fasteners for commercial and OEM programs. Choose the materials, strengths, and finishes your drawings require—from standard stock to made-to-order runs for demanding environments.',
    },
    {
      title: 'Quality systems',
      body:
        'Consistent sourcing, inspection, and documentation help teams in regulated industries stay audit-ready. We align product selection with load, corrosion class, and coating requirements so specifications translate reliably from quote to installation.',
    },
    {
      title: 'Technical support',
      body:
        'Experienced specialists support distributors and end users with torque guidance, joint design considerations, and troubleshooting in the field. We help you implement the right hardware, reduce downtime, and keep production lines moving with responsive service.',
    },
  ] as const;

  const rule = 'border-brand-surface/35';

  return (
    <section className="flex min-h-screen flex-col bg-brand-primary font-sans">
      <div className="flex min-h-0 flex-1 flex-col">
        {/* Headline — natural height */}
        <div className="max-w-5xl shrink-0 px-6 py-8 md:px-8 lg:px-10">
          <h2 className="text-3xl font-normal leading-tighter tracking-tight mt-20 text-brand-surface md:text-4xl lg:text-5xl">
            From precision hardware to dependable supply, Fair Fasteners delivers what
            professionals need for assemblies that last.
          </h2>
        </div>

        {/* Grid — grows to fill rest of section so vertical rules run full height */}
        <div
          className={`mt-10 grid min-h-0 flex-1 grid-cols-1 border-t ${rule} md:grid-cols-3`}
        >
          {columns.map(({ title, body }, i) => (
            <div
              key={title}
              className={`group relative flex min-h-0 flex-col overflow-hidden md:h-full md:min-h-0 ${
                i < columns.length - 1
                  ? `border-b border-t border-r ${rule}`
                  : `border-b border-t ${rule}`
              } `}
            >
              <div
                className="pointer-events-none absolute inset-0 origin-right scale-x-0 bg-brand-surface transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 motion-reduce:duration-0 motion-reduce:group-hover:scale-x-100"
                aria-hidden
              />
              <div className="relative z-10 flex min-h-0 flex-col px-6 py-12 md:py-14 lg:px-10">
                <h3 className="text-sm font-normal font-jetbrains uppercase tracking-normal text-brand-surface/80 transition-colors duration-300 ease-out group-hover:text-brand-secondary motion-reduce:transition-colors">
                  0{i + 1}. {title}
                </h3>
                <p className="mt-6 text-[0.9375rem] leading-snug text-brand-surface/90 transition-colors duration-300 ease-out group-hover:text-brand-secondary/90 md:text-base md:leading-relaxed motion-reduce:transition-colors">
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
