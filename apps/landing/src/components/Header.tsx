'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from './ui/button';
import { Logo } from './shared/Logo';
import { useScrollHeader } from '@masil/hooks';

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
        <nav className="hidden items-center space-x-8 md:flex">
          <Link
            href="#features"
            className="text-foreground/80 hover:text-primary transition-colors"
          >
            소개
          </Link>
          <Link
            href="#testimonials"
            className="text-foreground/80 hover:text-primary transition-colors"
          >
            멤버
          </Link>
          <Link
            href="#partners"
            className="text-foreground/80 hover:text-primary transition-colors"
          >
            파트너스
          </Link>
          <Link
            href="#join"
            className="text-foreground/80 hover:text-primary transition-colors"
          >
            함께하기
          </Link>
          <Button asChild>
            <Link
              href="https://event-us.kr/masilcommunity/event/105246"
              target="_blank"
              rel="noopener noreferrer"
              className={
                isScrolled
                  ? ''
                  : 'bg-transparent text-transparent hover:text-white'
              }
            >
              세미나 참가하기
            </Link>
          </Button>
        </nav>

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
              href="#features"
              className="text-foreground/80 hover:text-primary py-2 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              소개
            </Link>
            <Link
              href="#testimonials"
              className="text-foreground/80 hover:text-primary py-2 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              멤버
            </Link>
            <Link
              href="#partners"
              className="text-foreground/80 hover:text-primary py-2 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              파트너스
            </Link>
            <Link
              href="#join"
              className="text-foreground/80 hover:text-primary py-2 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              함께하기
            </Link>
            <Button asChild className="w-full">
              <Link
                href="https://event-us.kr/masilcommunity/event/105246"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                세미나 참가하기
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
