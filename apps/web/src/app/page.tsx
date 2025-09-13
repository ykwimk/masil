import { Suspense } from 'react';
import { HeroSection } from '@/components/main/HeroSection';
import { SideNavigation } from '@/components/main/SideNavigation';
import { SideNavigationSkeleton } from '@/components/main/SideNavigationSkeleton';
import { PostsSection } from '@/components/main/PostsSection';

export default async function HomePage({
  searchParams,
}: {
  searchParams?: Promise<{ tag?: string }>;
}) {
  const query = (await searchParams) ?? {};
  const selectedTag = query.tag;
  return (
    <div>
      <HeroSection />
      <section className="border-t bg-white">
        <div className="container py-6 md:py-10">
          <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
            {/* 좌측 내비 */}
            <Suspense fallback={<SideNavigationSkeleton />}>
              <SideNavigation selectedTag={selectedTag} />
            </Suspense>
            {/* 중앙 포스트들 */}
            <PostsSection selectedTag={selectedTag} />
          </div>
        </div>
      </section>
    </div>
  );
}
