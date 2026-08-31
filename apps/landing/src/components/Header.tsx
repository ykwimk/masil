'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useScrollHeader } from '@masil/hooks';
import { cn } from '@/lib/utils';
import { Logo } from './shared/Logo';
import { Button } from './ui/button';

const navigation = [
  { href: '#why', label: '왜 마실인가' },
  { href: '#experiment', label: '첫 실험' },
  { href: '#people', label: '멤버' },
  { href: '#partners', label: '파트너' },
];

export default function Header() {
  const { isScrolled } = useScrollHeader({ threshold: 12 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const closeForDesktop = () => {
      if (window.innerWidth > 920) setIsMobileMenuOpen(false);
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || !isMobileMenuOpen) return;
      setIsMobileMenuOpen(false);
      menuButtonRef.current?.focus();
    };

    window.addEventListener('resize', closeForDesktop);
    document.addEventListener('keydown', closeOnEscape);

    return () => {
      window.removeEventListener('resize', closeForDesktop);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b text-[var(--landing-foreground)] transition-[background-color,border-color] duration-200',
        isScrolled || isMobileMenuOpen
          ? 'border-white/10 bg-[color-mix(in_oklch,var(--landing-ink)_92%,transparent)] backdrop-blur-2xl'
          : 'border-transparent bg-transparent',
      )}
    >
      <div className="landing-container flex min-h-[var(--landing-header-height)] items-center justify-between py-2.5">
        <Logo
          href="#hero"
          className="text-[var(--landing-accent)]"
          onClick={closeMobileMenu}
        />

        <nav
          className="hidden items-center gap-[clamp(18px,2.5vw,34px)] min-[921px]:flex"
          aria-label="주요 메뉴"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex min-h-11 items-center text-sm font-medium text-[var(--landing-muted)] transition-colors duration-200 hover:text-[var(--landing-foreground)] focus-visible:text-[var(--landing-foreground)]"
            >
              {item.label}
            </Link>
          ))}
          <Button
            asChild
            variant="outline"
            className="min-h-11 rounded-full border-[var(--landing-border)] bg-transparent px-4 text-[var(--landing-foreground)] shadow-none hover:border-[var(--landing-foreground)] hover:bg-white/5 hover:text-[var(--landing-foreground)]"
          >
            <Link
              href="https://event-us.kr/masilcommunity/event/105246"
              target="_blank"
              rel="noopener noreferrer"
            >
              세미나 안내 ↗
            </Link>
          </Button>
        </nav>

        <Button
          ref={menuButtonRef}
          type="button"
          variant="ghost"
          size="icon"
          className="size-11 rounded-full border border-[var(--landing-border)] bg-[var(--landing-surface)] text-[var(--landing-foreground)] shadow-none hover:bg-white/10 hover:text-[var(--landing-foreground)] min-[921px]:hidden"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
          onClick={() => setIsMobileMenuOpen((open) => !open)}
        >
          {isMobileMenuOpen ? (
            <X aria-hidden="true" />
          ) : (
            <Menu aria-hidden="true" />
          )}
        </Button>
      </div>

      <div
        id="mobile-menu"
        hidden={!isMobileMenuOpen}
        className="border-t border-[var(--landing-border)] bg-[var(--landing-ink)] min-[921px]:hidden"
      >
        <nav
          className="landing-container grid gap-1 pt-3 pb-5"
          aria-label="모바일 메뉴"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex min-h-12 items-center text-sm font-medium text-[var(--landing-muted)] transition-colors hover:text-[var(--landing-foreground)] focus-visible:text-[var(--landing-foreground)]"
              onClick={closeMobileMenu}
            >
              {item.label}
            </Link>
          ))}
          <Button
            asChild
            className="mt-2 min-h-12 w-full rounded-full bg-[var(--landing-accent)] text-[var(--landing-ink)] shadow-none hover:bg-[color-mix(in_oklch,var(--landing-accent)_84%,white)]"
          >
            <Link
              href="https://event-us.kr/masilcommunity/event/105246"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMobileMenu}
            >
              세미나 참가하기 ↗
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
