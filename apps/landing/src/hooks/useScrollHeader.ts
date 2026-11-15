'use client';

import { useEffect, useState } from 'react';

export type UseScrollHeaderOptions = {
  threshold?: number;
  initial?: boolean;
};

export function useScrollHeader(options: UseScrollHeaderOptions = {}) {
  const { threshold = 10, initial = false } = options;
  const [isScrolled, setIsScrolled] = useState<boolean>(initial);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let ticking = false;
    const read = () => (window.scrollY || window.pageYOffset || 0) > threshold;

    const update = () => {
      setIsScrolled(read());
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return { isScrolled } as const;
}
