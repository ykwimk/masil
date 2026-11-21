import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../utils/cn';

type Variant = 'primary' | 'secondary';

// 임시 클래스. 3단계 ⑥에서 정한다
const base = 'px-4 py-3 cursor-pointer';
const variants: Record<Variant, string> = {
  primary: 'bg-accent',
  secondary: 'border border-line',
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
