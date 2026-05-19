import type { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils/cn';

interface BadgeProps {
  tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'info';
  className?: string;
}

export function Badge({ children, tone = 'neutral', className }: PropsWithChildren<BadgeProps>) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold',
        tone === 'neutral' && 'bg-slate-100 text-slate-700',
        tone === 'success' && 'bg-brand-100 text-brand-800',
        tone === 'warning' && 'bg-accent-100 text-accent-800',
        tone === 'danger' && 'bg-danger-100 text-danger-800',
        tone === 'info' && 'bg-sky-100 text-sky-800',
        className,
      )}
    >
      {children}
    </span>
  );
}
