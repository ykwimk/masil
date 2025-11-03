'use client';

import { useScrollHeader } from '@masil/hooks';
import { cn } from '../lib/utils';
import { Logo } from './shared/Logo';
import { Button } from './ui/button';

export default function Header() {
  const { isScrolled } = useScrollHeader({ threshold: 10 });

  return (
    <header
      className={cn(
        'fixed top-0 right-0 left-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/90 shadow-sm backdrop-blur-md'
          : 'bg-transparent',
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Logo />
        <Button
          type="button"
          size="lg"
          className={`cursor-pointer rounded-xl px-6 transition-all duration-300 sm:px-8 ${isScrolled ? 'opacity-1000' : 'opacity-0'}`}
          onClick={() =>
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
          }
        >
          신청하기
        </Button>
      </div>
    </header>
  );
}
