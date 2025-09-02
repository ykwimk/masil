import Link from 'next/link';
import { TAGS } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function SideNavigation({ selectedTag }: { selectedTag?: string }) {
  const tags = ['전체', ...TAGS];

  return (
    <aside className="hidden lg:block">
      <nav className="sticky top-16 flex flex-col gap-1">
        {tags.map((tag) => {
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
