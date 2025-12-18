'use client';

import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import CTASection from '@/components/home/CTASection';
import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';
import PersonasSection from '@/components/home/PersonasSection';
import AboutSection from '@/components/home/AboutSection';
import BenefitsSection from '@/components/home/BenefitsSection';
import SecuritySection from '@/components/home/SecuritySection';
import KnowledgeSection from '@/components/home/KnowledgeSection';
import FAQSection from '@/components/home/FAQSection';
import DonationSection from '@/components/home/DonationSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-off-white to-cinza-muito-claro">
      <Header />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <PersonasSection />
      <HowItWorksSection />
      <BenefitsSection />
      <SecuritySection />
      <KnowledgeSection />
      <DonationSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
}
