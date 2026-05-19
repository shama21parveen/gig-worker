import { Outlet } from 'react-router-dom';
import { ShieldCheck, WalletCards } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';

export function AuthLayout() {
  const { t } = useI18n();

  return (
    <main className="grid min-h-screen bg-slate-950 lg:grid-cols-[1.05fr_0.95fr]">
      <section className="hidden p-10 text-white lg:block">
        <div className="grid-surface relative h-full overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-brand-900 via-ink to-slate-950 p-10">
          <div className="absolute -right-10 top-12 h-52 w-52 rounded-full bg-accent-400/20 blur-3xl" />
          <div className="absolute left-10 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-brand-400/20 blur-3xl" />
          <div className="relative flex h-full flex-col justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-brand-200">Gig Worker OS</p>
              <h1 className="mt-5 max-w-xl font-display text-5xl leading-tight">{t('auth.hero')}</h1>
              <p className="mt-6 max-w-lg text-lg leading-8 text-slate-300">{t('auth.roleHint')}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <ShieldCheck className="h-8 w-8 text-brand-200" />
                <h2 className="mt-4 text-xl font-bold">Safety intelligence</h2>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Risk zones, emergency workflows, and document readiness in a single operational flow.
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <WalletCards className="h-8 w-8 text-accent-200" />
                <h2 className="mt-4 text-xl font-bold">Earnings clarity</h2>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Payout estimates, incentive visibility, expense tracking, and forecasted weekly take-home.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:px-12">
        <div className="w-full max-w-lg">
          <Outlet />
        </div>
      </section>
    </main>
  );
}
