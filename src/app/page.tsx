'use client';

import { isSiteLive } from '@/lib/site';
import ComingSoon from '@/components/ComingSoon';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import HomeValueSection from '@/components/HomeValueSection';
import HotProductsSection from '@/components/HotProductsSection';
import SolutionsWorkSection from '@/components/SolutionsWorkSection';
import NewsInfoSection from '@/components/NewsInfoSection';

export default function Home() {
  if (!isSiteLive()) {
    return <ComingSoon />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <div id="main-content">
        <HomeValueSection />
        <SolutionsWorkSection />
        <HotProductsSection />
        <NewsInfoSection />
      </div>
      <Footer />
    </div>
  );
}
