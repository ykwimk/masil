'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { useScrollHeader } from '@masil/hooks';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Logo } from './Logo';

export function Header() {
  const router = useRouter();
  const { isScrolled } = useScrollHeader({ threshold: 10 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const { status } = useSession();

  const isAuthed = status === 'authenticated';

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
        {status !== 'loading' && (
          <div className="hidden flex-1 items-center justify-between space-x-2 md:flex md:justify-end">
            <nav className="flex items-center gap-8">
              {isAuthed ? (
                <Button
                  variant="default"
                  className="cursor-pointer"
                  onClick={() => signOut({ callbackUrl: '/' })}
                >
                  로그아웃
                </Button>
              ) : (
                <Button
                  variant="default"
                  className="cursor-pointer"
                  onClick={() => router.push('/login')}
                >
                  로그인
                </Button>
              )}
            </nav>
          </div>
        )}
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
      {isMobileMenuOpen && (
        <div className="bg-white p-4 shadow-lg md:hidden">
          <nav className="flex flex-col space-y-4">
            {isAuthed ? (
              <Button
                className="text-foreground/80 hover:text-primary py-2 text-left transition-colors"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  signOut({ callbackUrl: '/' });
                }}
              >
                로그아웃
              </Button>
            ) : (
              <Button
                variant="default"
                className="cursor-pointer"
                onClick={() => router.push('/login')}
              >
                로그인
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
