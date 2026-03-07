import Footer from '@/components/Footer';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import TestimonialsSection from '@/components/TestimonialSection';

export default function HomePage() {
  return (
    <main className="flex min-h-dvh flex-col overflow-hidden">
      <Header />
      <HeroSection />
      <TestimonialsSection />
      <Footer />
    </main>
  );
}
