import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/home/HeroSection';
import BenefitsSection from '@/components/home/BenefitsSection';
import EntryBlocksSection from '@/components/home/EntryBlocksSection';
import TrustSection from '@/components/home/TrustSection';
import FAQSection from '@/components/home/FAQSection';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <BenefitsSection />
        <EntryBlocksSection />
        <TrustSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
