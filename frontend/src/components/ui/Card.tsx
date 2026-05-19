import type { HTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '@/lib/utils/cn';

export function Card({ className, children, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      className={cn(
        'glass-panel rounded-3xl border border-white/70 p-5 shadow-panel sm:p-6',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
