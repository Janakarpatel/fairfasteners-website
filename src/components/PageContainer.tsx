import type { ReactNode } from 'react';

type PageContainerProps = {
  children: ReactNode;
  className?: string;
  width?: 'default' | 'narrow';
};

const widthClass = {
  default: 'max-w-7xl',
  narrow: 'max-w-4xl',
} as const;

export default function PageContainer({
  children,
  className = '',
  width = 'default',
}: PageContainerProps) {
  return (
    <div
      className={`mx-auto w-full ${widthClass[width]} px-6 pb-20 pt-28 md:px-8 md:pt-32 lg:px-10 ${className}`}
    >
      {children}
    </div>
  );
}
