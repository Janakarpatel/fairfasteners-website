'use client';

import { GiIndiaGate } from 'react-icons/gi';
import { LuShieldCheck } from 'react-icons/lu';
import { RiGlobalLine } from 'react-icons/ri';

const items = [
  {
    title: 'Quality Assured',
    subtitle: 'Fully certified and accredited',
    icon: LuShieldCheck,
  },
  {
    title: 'Global Shipping',
    subtitle: 'Products delivered worldwide',
    icon: RiGlobalLine,
  },
  {
    title: 'India-Based Company',
    subtitle: 'Professional and reliable',
    icon: GiIndiaGate,
  },
] as const;

const iconClass = 'h-15 w-15 text-brand-primary';

/** Trust strip for the products page — quality / shipping / origin. */
export default function ProductTrustStrip() {
  return (
    <section
      className="relative z-10 w-full bg-[#eef1f4] font-sans text-brand-secondary"
      aria-label="Product assurances"
    >
      <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-14 px-6 py-16 md:grid-cols-3 md:gap-10 md:px-10 md:py-20 lg:px-16">
        {items.map(({ title, subtitle, icon: Icon }) => (
          <div key={title} className="flex flex-col items-center text-center">
            <Icon className={iconClass} aria-hidden />
            <h2 className="mt-4 text-[1rem] font-semibold tracking-tight text-brand-secondary">
              {title}
            </h2>
            <p className="mt-1 max-w-[16rem] text-[0.9rem] font-normal text-brand-secondary/65">
              {subtitle}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
