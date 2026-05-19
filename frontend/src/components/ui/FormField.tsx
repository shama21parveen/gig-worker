import {
  forwardRef,
  type InputHTMLAttributes,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from 'react';
import { cn } from '@/lib/utils/cn';

interface SharedProps {
  label: string;
  hint?: string;
  error?: string;
}

export const InputField = forwardRef<HTMLInputElement, SharedProps & InputHTMLAttributes<HTMLInputElement>>(
  ({ label, hint, error, className, ...props }, ref) => {
    return (
      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-slate-700">{label}</span>
        <input
          ref={ref}
          className={cn(
            'h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-ink shadow-sm transition placeholder:text-slate-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100',
            className,
          )}
          {...props}
        />
        {error ? <span className="mt-2 block text-xs font-medium text-danger-600">{error}</span> : null}
        {!error && hint ? <span className="mt-2 block text-xs text-slate-500">{hint}</span> : null}
      </label>
    );
  },
);

InputField.displayName = 'InputField';

export const SelectField = forwardRef<
  HTMLSelectElement,
  SharedProps & SelectHTMLAttributes<HTMLSelectElement>
>(({ label, hint, error, className, children, ...props }, ref) => {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-700">{label}</span>
      <select
        ref={ref}
        className={cn(
          'h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-ink shadow-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100',
          className,
        )}
        {...props}
      >
        {children}
      </select>
      {error ? <span className="mt-2 block text-xs font-medium text-danger-600">{error}</span> : null}
      {!error && hint ? <span className="mt-2 block text-xs text-slate-500">{hint}</span> : null}
    </label>
  );
});

SelectField.displayName = 'SelectField';

export const TextareaField = forwardRef<
  HTMLTextAreaElement,
  SharedProps & TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ label, hint, error, className, ...props }, ref) => {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-700">{label}</span>
      <textarea
        ref={ref}
        className={cn(
          'min-h-32 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink shadow-sm transition placeholder:text-slate-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100',
          className,
        )}
        {...props}
      />
      {error ? <span className="mt-2 block text-xs font-medium text-danger-600">{error}</span> : null}
      {!error && hint ? <span className="mt-2 block text-xs text-slate-500">{hint}</span> : null}
    </label>
  );
});

TextareaField.displayName = 'TextareaField';
