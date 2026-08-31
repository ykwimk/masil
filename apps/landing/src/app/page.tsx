// import AboutSection from '@/components/AboutSection';
import FeaturesSection from '@/components/FeaturesSection';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import JoinSection from '@/components/JoinSection';
import PartnersSection from '@/components/PartnersSection';
import TestimonialsSection from '@/components/TestimonialSection';

export default function HomePage() {
  return (
    <>
      <a className="skip-link" href="#content">
        본문으로 바로가기
      </a>
      <Header />
      <main
        id="content"
        tabIndex={-1}
        className="flex min-h-dvh flex-col overflow-x-clip"
      >
        <HeroSection />
        {/* <AboutSection /> */}
        <FeaturesSection />
        <TestimonialsSection />
        <PartnersSection />
        <JoinSection />
      </main>
      <Footer />
    </>
  );
}
