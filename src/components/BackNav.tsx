import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import type { ReactNode } from 'react';

type BackNavProps = {
  href: string;
  label: string;
  trailing?: ReactNode;
  className?: string;
};

export default function BackNav({ href, label, trailing, className = '' }: BackNavProps) {
  return (
    <nav
      aria-label="Back navigation"
      className={`flex items-center justify-between gap-4 ${className}`}
    >
      <Link
        href={href}
        className="group relative inline-flex items-center gap-1.5 py-2 font-jetbrains text-[0.6875rem] uppercase tracking-[0.12em] text-white/65 transition-colors hover:text-white motion-reduce:transition-none"
      >
        <ChevronLeft
          className="h-4 w-4 shrink-0 transition-transform group-hover:-translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
          strokeWidth={1.75}
          aria-hidden
        />
        {label}
      </Link>
      {trailing ? <div className="shrink-0 text-right">{trailing}</div> : null}
    </nav>
  );
}
