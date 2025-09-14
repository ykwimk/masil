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

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, ' ');
}

export function summarize(text: string, len = 140): string {
  const clean = stripHtml(text).replace(/\s+/g, ' ').trim();

  if (clean.length <= len) return clean;
  return clean.slice(0, len - 1) + '…';
}

export function parseTags(input: string | null | undefined): string[] {
  if (!input) return [];

  return Array.from(
    new Set(
      input
        .split(/[,\s]+/)
        .map((t) => t.trim())
        .filter(Boolean)
        .map((t) => (t.length > 30 ? t.slice(0, 30) : t))
        .map((t) => t.toLowerCase()),
    ),
  );
}
