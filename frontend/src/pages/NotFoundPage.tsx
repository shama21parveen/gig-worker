import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';

export function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <Card className="max-w-lg text-center">
        <p className="text-sm font-semibold text-slate-500">404</p>
        <h1 className="mt-3 text-3xl font-display text-ink">Route not found</h1>
        <p className="mt-4 text-sm leading-6 text-slate-500">
          This route is outside the current frontend shell. Head back to the worker operations dashboard.
        </p>
        <Link
          to="/app/dashboard"
          className="mt-6 inline-flex h-12 items-center justify-center rounded-2xl bg-brand-600 px-5 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          Go to dashboard
        </Link>
      </Card>
    </main>
  );
}
