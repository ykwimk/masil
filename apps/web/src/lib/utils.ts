import sanitizeHtml from 'sanitize-html';
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

export function parseTags(input: string[]): string[] {
  if (!input) return [];

  return Array.from(
    new Set(
      input
        .map((tag) => tag.trim().replace(/\s+/g, ' '))
        .filter(Boolean)
        .map((tag) => (tag.length > 30 ? tag.slice(0, 30) : tag))
        .map((tag) => tag.toLowerCase()),
    ),
  );
}

export function sanitizeHtmlFragment(input: string): string {
  return sanitizeHtml(input, {
    allowedTags: [
      'p',
      'strong',
      'em',
      'mark',
      'u',
      's',
      'blockquote',
      'code',
      'pre',
      'ul',
      'ol',
      'li',
      'label',
      'input',
      'div',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'br',
      'hr',
      'a',
      'span',
    ],
    allowedAttributes: {
      a: ['href', 'name', 'target', 'rel'],
      span: ['style', 'class'],
      code: ['class'],
      pre: ['class'],
      p: ['style'],
      h1: ['style'],
      h2: ['style'],
      h3: ['style'],
      h4: ['style'],
      h5: ['style'],
      h6: ['style'],
      ul: ['data-type'],
      li: ['data-type', 'data-checked'],
      input: ['type', 'checked', 'disabled'],
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    allowedStyles: {
      p: { 'text-align': [/^(?:left|right|center|justify)$/] },
      h1: { 'text-align': [/^(?:left|right|center|justify)$/] },
      h2: { 'text-align': [/^(?:left|right|center|justify)$/] },
      h3: { 'text-align': [/^(?:left|right|center|justify)$/] },
      h4: { 'text-align': [/^(?:left|right|center|justify)$/] },
      h5: { 'text-align': [/^(?:left|right|center|justify)$/] },
      h6: { 'text-align': [/^(?:left|right|center|justify)$/] },
      span: { 'text-align': [/^(?:left|right|center|justify)$/] },
    },
    transformTags: {
      a: sanitizeHtml.simpleTransform(
        'a',
        { rel: 'nofollow noreferrer noopener' },
        true,
      ),
    },
  });
}
