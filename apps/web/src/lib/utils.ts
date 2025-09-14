export { cn } from '@masil/ui';

export function safeRedirect(input?: string) {
  if (!input) return '/';

  try {
    let value = input;
    if (value.startsWith('http://') || value.startsWith('https://')) {
      const abs = new URL(value);
      value = abs.pathname + abs.search + abs.hash;
    }
    if (value.startsWith('//')) return '/';
    if (!value.startsWith('/')) return '/';

    const url = new URL(value, 'http://localhost');
    return url.pathname + url.search + url.hash;
  } catch {
    return '/';
  }
}
