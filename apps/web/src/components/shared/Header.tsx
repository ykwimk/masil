'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useScrollHeader } from '@masil/hooks';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Logo } from './Logo';

export function Header() {
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
      <div className="container flex h-14 items-center justify-between">
        <div className="mr-4 flex">
          <Logo />
        </div>
        <div className="hidden flex-1 items-center justify-between space-x-2 md:flex md:justify-end">
          <nav className="flex items-center gap-8">
            <Link
              href="/login"
              className="text-foreground/90 hover:text-primary transition-colors"
            >
              로그인
            </Link>
          </nav>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X />
          ) : (
            <Menu className={isScrolled ? '' : 'text-white'} />
          )}
        </Button>
      </div>
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="bg-white p-4 shadow-lg md:hidden">
          <nav className="flex flex-col space-y-4">
            <Link
              href="/login"
              className="text-foreground/80 hover:text-primary py-2 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              로그인
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
