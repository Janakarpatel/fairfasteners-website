'use client';

import { isSiteLive } from '@/lib/site';
import ComingSoon from '@/components/ComingSoon';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import HomeValueSection from '@/components/HomeValueSection';
import HotProductsSection from '@/components/HotProductsSection';
import SolutionsWorkSection from '@/components/SolutionsWorkSection';
import WhyWorkWithUsSection from '@/components/WhyWorkWithUsSection';
import NewsInfoSection from '@/components/NewsInfoSection';
import WorkWithUsSection from '@/components/WorkWithUsSection';
import AmbientBand from '@/components/AmbientBand';

export default function HomePage() {
  if (!isSiteLive()) {
    return <ComingSoon />;
  }

  return (
    <div className="min-h-screen bg-transparent">
      <Hero />
      <div id="main-content">
        <HomeValueSection />
        <AmbientBand intensity="whisper">
          <SolutionsWorkSection />
          <WhyWorkWithUsSection />
        </AmbientBand>
        <HotProductsSection />
        <NewsInfoSection />
      </div>
      <WorkWithUsSection />
      <Footer />
    </div>
  );
}
