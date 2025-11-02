import Footer from '@/components/Footer';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ProgramDetailsSection from '@/components/ProgramDetailsSection';
import FinalSection from '@/components/FinalSection';

export default function HomePage() {
  return (
    <main className="flex min-h-dvh flex-col overflow-hidden">
      <Header />
      <HeroSection />
      <ProgramDetailsSection />
      <FinalSection />
      <Footer />
    </main>
  );
}
