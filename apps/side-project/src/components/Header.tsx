'use client';

import { useState } from 'react';
import { useScrollHeader } from '@masil/hooks';
import { cn } from '../lib/utils';
import { Logo } from './shared/Logo';

export default function Header() {
  const { isScrolled } = useScrollHeader({ threshold: 10 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  return (
    <header
      className={cn(
        'fixed top-0 right-0 left-0 z-50 transition-all duration-300',
        isScrolled || isMobileMenuOpen
          ? 'bg-white/90 shadow-sm backdrop-blur-md'
          : 'bg-transparent',
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Logo />
      </div>
    </header>
  );
}
