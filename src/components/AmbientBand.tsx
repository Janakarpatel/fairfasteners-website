'use client';

import { useReducedMotion } from 'motion/react';
import AmbientBackground from '@/components/AmbientBackground';

/** Mid-page atmosphere band — brand-green wash on near-black (no 3D by default). */
export default function AmbientBand({
  children,
  scene = false,
  intensity = 'band',
  className = '',
}: {
  children: React.ReactNode;
  scene?: boolean;
  intensity?: 'hero' | 'band' | 'whisper';
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <div
      className={`relative overflow-hidden bg-transparent text-white ${className}`.trim()}
    >
      <AmbientBackground reduce={reduce} scene={scene} intensity={intensity} />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
