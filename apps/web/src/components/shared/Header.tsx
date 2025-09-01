'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export function Header() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

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
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="flex items-center space-x-2">
            <h1 className="text-primary font-hakgyoansimMulgyeol text-3xl font-bold">
              마실
            </h1>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center gap-1">
            <Button asChild variant="ghost">
              <Link href="/posts">포스트</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/login">로그인</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
