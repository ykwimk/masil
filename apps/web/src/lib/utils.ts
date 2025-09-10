import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function safeRedirect(input?: string) {
  if (!input) return '/';

  try {
    if (input.startsWith('http://') || input.startsWith('https://')) return '/';
    if (input.startsWith('//')) return '/';
    if (!input.startsWith('/')) return '/';

    const url = new URL(input, 'http://localhost');
    return url.pathname + url.search + url.hash;
  } catch {
    return '/';
  }
}
