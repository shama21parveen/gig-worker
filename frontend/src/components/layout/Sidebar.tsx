import { NavLink } from 'react-router-dom';
import { BarChart3, FileBadge2, LayoutDashboard, LifeBuoy, ShieldAlert, UserCircle2, CalendarRange } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useI18n } from '@/hooks/useI18n';

const iconMap = {
  dashboard: LayoutDashboard,
  earnings: BarChart3,
  shifts: CalendarRange,
  safety: ShieldAlert,
  documents: FileBadge2,
  grievances: LifeBuoy,
  profile: UserCircle2,
};

const navItems = [
  { key: 'dashboard', path: '/app/dashboard' },
  { key: 'earnings', path: '/app/earnings' },
  { key: 'shifts', path: '/app/shifts' },
  { key: 'safety', path: '/app/safety' },
  { key: 'documents', path: '/app/documents' },
  { key: 'grievances', path: '/app/support' },
  { key: 'profile', path: '/app/profile' },
] as const;

export function Sidebar() {
  const { t } = useI18n();

  return (
    <aside className="hidden w-72 shrink-0 xl:block">
      <div className="sticky top-6 rounded-[2rem] bg-ink p-6 text-white shadow-lift">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-brand-200">Worker OS</p>
          <h2 className="mt-3 font-display text-3xl">Shift safer. Earn sharper.</h2>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Frontline workflows for payouts, planning, compliance, and rapid support.
          </p>
        </div>

        <nav className="mt-8 space-y-2">
          {navItems.map((item) => {
            const Icon = iconMap[item.key];
            return (
              <NavLink
                key={item.key}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition',
                    isActive ? 'bg-white text-ink shadow-panel' : 'text-slate-200 hover:bg-white/10',
                  )
                }
              >
                <Icon className="h-5 w-5" />
                {t(`nav.${item.key}`)}
              </NavLink>
            );
          })}
        </nav>

        <div className="mt-8 rounded-3xl border border-brand-300/20 bg-brand-400/15 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-100">Ops note</p>
          <p className="mt-2 text-sm text-slate-100">
            Keep insurance and PUC documents current before weekend demand spikes.
          </p>
        </div>
      </div>
    </aside>
  );
}
