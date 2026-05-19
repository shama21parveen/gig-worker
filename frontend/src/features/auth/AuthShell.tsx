import type { PropsWithChildren, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';

interface AuthShellProps {
  title: string;
  subtitle: string;
  footer: ReactNode;
}

export function AuthShell({ title, subtitle, footer, children }: PropsWithChildren<AuthShellProps>) {
  return (
    <Card className="rounded-[2rem] bg-white p-6 sm:p-8">
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-700">Gig Worker OS</p>
        <h1 className="mt-4 text-3xl font-display text-ink">{title}</h1>
        <p className="mt-3 text-sm leading-6 text-slate-500">{subtitle}</p>
      </div>
      {children}
      <div className="mt-8 text-sm text-slate-500">{footer}</div>
      <p className="mt-5 text-xs text-slate-400">
        Demo mode only. API-ready structure will replace these local auth flows later.
      </p>
    </Card>
  );
}

export const AuthFooterLink = ({
  label,
  cta,
  to,
}: {
  label: string;
  cta: string;
  to: string;
}) => (
  <span>
    {label}{' '}
    <Link className="font-semibold text-brand-700 hover:text-brand-800" to={to}>
      {cta}
    </Link>
  </span>
);
