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
        'text-primary font-hakgyoansimMulgyeol inline-flex items-center text-3xl leading-none font-bold',
        className,
      )}
    >
      <span aria-hidden="true">마실</span>
    </Link>
  );
};
