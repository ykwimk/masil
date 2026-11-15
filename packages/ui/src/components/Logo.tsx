import { cn } from '../utils/cn';

// '마실' 글자 로고. 크기와 링크는 쓰는 쪽이 정한다.
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('font-brand text-accent-ink font-bold', className)}>
      마실
    </span>
  );
}
