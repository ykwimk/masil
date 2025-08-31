import { TAGS } from '@/lib/constants';
import Link from 'next/link';

export function SideNavigation() {
  return (
    <aside className="hidden lg:block">
      <nav className="sticky top-16 flex flex-col gap-1">
        {['전체', ...TAGS].map((tag) => (
          <Link key={tag} href="#" className="navlink">
            {tag}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
