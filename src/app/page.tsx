import type { Metadata } from 'next';
import HomePage from '@/components/HomePage';
import { defaultDescription, defaultTitle } from '@/lib/seo';

export const metadata: Metadata = {
  title: { absolute: defaultTitle },
  description: defaultDescription,
  alternates: { canonical: '/' },
};

export default function Home() {
  return <HomePage />;
}
