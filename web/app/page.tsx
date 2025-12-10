'use client';

import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import CTASection from '@/components/home/CTASection';
import Footer from '@/components/shared/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-off-white to-cinza-muito-claro">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
      <Footer />
    </main>
  );
}
