import Footer from '@/components/Footer';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';

export default function HomePage() {
  return (
    <main className="flex min-h-dvh flex-col overflow-hidden">
      <Header />
      <HeroSection />
      <Footer />
    </main>
  );
}
