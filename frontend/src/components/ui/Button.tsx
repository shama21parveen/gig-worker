import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { LoaderCircle } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md';
  loading?: boolean;
}

export function Button({
  children,
  className,
  variant = 'primary',
  size = 'md',
  loading = false,
  ...props
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-2xl font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 disabled:cursor-not-allowed disabled:opacity-60',
        size === 'md' ? 'h-12 px-5 text-sm' : 'h-10 px-4 text-sm',
        variant === 'primary' && 'bg-brand-600 text-white shadow-panel hover:bg-brand-700',
        variant === 'secondary' &&
          'border border-slate-200 bg-white text-ink hover:border-brand-200 hover:bg-brand-50',
        variant === 'ghost' && 'bg-transparent text-slate-700 hover:bg-slate-100',
        variant === 'danger' && 'bg-danger-600 text-white hover:bg-danger-700',
        className,
      )}
      {...props}
    >
      {loading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}
