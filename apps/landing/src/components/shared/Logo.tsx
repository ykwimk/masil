import Link from 'next/link';
import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
  href?: string;
  onClick?: () => void;
};

export const Logo = ({ className, href = '/', onClick }: LogoProps) => {
  return (
    <Link
      href={href}
      aria-label="마실 홈"
      onClick={onClick}
      className={cn(
        'text-primary font-hakgyoansimMulgyeol -my-2 inline-flex min-h-11 items-center rounded-sm py-2 text-3xl leading-none font-bold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--landing-accent)]',
        className,
      )}
    >
      <span aria-hidden="true">마실</span>
    </Link>
  );
};
