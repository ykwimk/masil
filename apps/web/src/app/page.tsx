import { HeroSection } from '@/components/main/HeroSection';
import { SideNavigation } from '@/components/main/SideNavigation';
import { FeedSection } from '@/components/main/FeedSection';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <section className="border-t bg-white">
        <div className="container py-6 md:py-10">
          <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
            {/* 좌측 내비 */}
            <SideNavigation />
            {/* 중앙 피드 */}
            <FeedSection />
          </div>
        </div>
      </section>
    </div>
  );
}
