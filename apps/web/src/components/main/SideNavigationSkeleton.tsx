import { Skeleton } from '@/components/ui/skeleton';

export function SideNavigationSkeleton() {
  const items = [72, 84, 64, 96, 80, 70];
  return (
    <aside className="hidden lg:block">
      <nav className="sticky top-16 flex flex-col gap-1">
        {items.map((w, i) => (
          <div key={i} className="rounded-md px-2.5 py-2">
            <Skeleton className="h-4" style={{ width: w }} />
          </div>
        ))}
      </nav>
    </aside>
  );
}
