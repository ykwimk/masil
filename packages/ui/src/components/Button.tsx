import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../utils/cn';

type Variant = 'primary' | 'secondary';

// 공통: 44px 이상, 키보드 포커스는 띄운 외곽선(초록 버튼 옆에서도 바탕 위에 그려져 4.95:1), 색만 150ms 전환.
// 투명 테두리를 깔아 두어 테두리가 있는 secondary와 높이가 같다
const base =
  'min-h-11 cursor-pointer border border-transparent px-4 py-3 font-semibold transition-colors duration-150 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink disabled:cursor-not-allowed disabled:opacity-50';
// 색과 대비는 PRODUCT.md 토큰 기준(글자 4.5:1 이상). hover는 enabled일 때만: 비활성 버튼이 눌릴 것처럼 보이지 않게
const variants: Record<Variant, string> = {
  primary:
    'bg-accent text-foreground enabled:hover:bg-accent-ink enabled:hover:text-background',
  secondary: 'border-foreground text-foreground enabled:hover:bg-surface',
};

export function Button({
  variant = 'primary',
  type = 'button',
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      type={type}
      className={cn(base, variants[variant], className)}
      {...props}
    />
  );
}
