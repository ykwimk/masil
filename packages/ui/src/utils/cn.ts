import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

// tokens.css의 글자 크기 토큰(--text-*)을 크기로 알려 준다.
// 모르는 text-* 는 색으로 보아서 text-accent-ink 같은 색 클래스를 지워 버린다. 토큰을 더하면 여기도 더한다.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: [
            'meta',
            'lead',
            'lead-lg',
            'title',
            'title-lg',
            'display',
            'display-lg',
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
