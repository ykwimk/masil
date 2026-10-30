import ExperimentSection from '@/components/ExperimentSection';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import JoinSection from '@/components/JoinSection';
import PartnersSection from '@/components/PartnersSection';
import PeopleSection from '@/components/PeopleSection';
import WhySection from '@/components/WhySection';

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
        <WhySection />
        <ExperimentSection />
        <PeopleSection />
        <PartnersSection />
        <JoinSection />
      </main>
      <Footer />
    </>
  );
}
