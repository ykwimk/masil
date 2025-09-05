import Link from 'next/link';
import { cn } from '@/lib/utils';
import { getTags } from '@/lib/data';

export async function SideNavigation({
  selectedTag,
}: {
  selectedTag?: string;
}) {
  const { tags } = await getTags();
  const navTags = ['전체', ...tags];

  return (
    <aside className="hidden lg:block">
      <nav className="sticky top-16 flex flex-col gap-1">
        {navTags.map((tag) => {
          const isActive = tag === '전체' ? !selectedTag : selectedTag === tag;
          const href =
            tag === '전체' ? '/' : `/?tag=${encodeURIComponent(tag)}`;
          return (
            <Link
              key={tag}
              href={href}
              className={cn(
                'navlink',
                isActive && 'bg-sidebar-accent-active text-foreground',
              )}
            >
              {tag}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
