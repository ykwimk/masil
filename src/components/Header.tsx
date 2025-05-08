'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from './ui/button';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-primary text-2xl font-bold">마실</span>
        </Link>

        <nav className="hidden items-center space-x-8 md:flex">
          <Link
            href="#about"
            className="text-foreground/80 hover:text-primary transition-colors"
          >
            소개
          </Link>
          <Link
            href="#features"
            className="text-foreground/80 hover:text-primary transition-colors"
          >
            특징
          </Link>
          <Link
            href="#testimonials"
            className="text-foreground/80 hover:text-primary transition-colors"
          >
            후기
          </Link>
          <Button asChild>
            <Link href="#join">참여하기</Link>
          </Button>
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {isMobileMenuOpen && (
        <div className="bg-white p-4 shadow-lg md:hidden">
          <nav className="flex flex-col space-y-4">
            <Link
              href="#about"
              className="text-foreground/80 hover:text-primary py-2 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              소개
            </Link>
            <Link
              href="#features"
              className="text-foreground/80 hover:text-primary py-2 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              특징
            </Link>
            <Link
              href="#testimonials"
              className="text-foreground/80 hover:text-primary py-2 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              후기
            </Link>
            <Button asChild className="w-full">
              <Link href="#join" onClick={() => setIsMobileMenuOpen(false)}>
                참여하기
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
