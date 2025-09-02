import { HeroSection } from '@/components/main/HeroSection';
import { SideNavigation } from '@/components/main/SideNavigation';
import { PostsSection } from '@/components/main/PostsSection';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <section className="border-t bg-white">
        <div className="container py-6 md:py-10">
          <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
            {/* 좌측 내비 */}
            <SideNavigation />
            {/* 중앙 포스트들 */}
            <PostsSection />
          </div>
        </div>
      </section>
    </div>
  );
}
