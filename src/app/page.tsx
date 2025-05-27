import AboutSection from '@/components/AboutSection';
import FeaturesSection from '@/components/FeaturesSection';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import JoinSection from '@/components/JoinSection';
import PartnersSection from '@/components/PartnersSection';
import TestimonialsSection from '@/components/TestimonialSection';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <HeroSection />
      {/* <AboutSection /> */}
      <FeaturesSection />
      <TestimonialsSection />
      <PartnersSection />
      <JoinSection />
      <Footer />
    </main>
  );
}
