import * as React from 'react';
import { cn } from '@/lib/utils';

function Badge({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      className={cn(
        'badge bg-primary/10 text-primary inline-flex items-center rounded-full px-3 py-1 text-xs font-medium',
        className,
      )}
      {...props}
    />
  );
}

export { Badge };
