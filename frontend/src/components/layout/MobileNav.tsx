import { NavLink } from 'react-router-dom';
import { BarChart3, FileBadge2, LayoutDashboard, LifeBuoy, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useI18n } from '@/hooks/useI18n';

const navItems = [
  { key: 'dashboard', path: '/app/dashboard', icon: LayoutDashboard },
  { key: 'earnings', path: '/app/earnings', icon: BarChart3 },
  { key: 'safety', path: '/app/safety', icon: ShieldAlert },
  { key: 'documents', path: '/app/documents', icon: FileBadge2 },
  { key: 'grievances', path: '/app/support', icon: LifeBuoy },
] as const;

export function MobileNav() {
  const { t } = useI18n();

  return (
    <nav className="fixed bottom-4 left-4 right-4 z-40 rounded-[1.7rem] border border-white/70 bg-white/95 p-2 shadow-lift backdrop-blur xl:hidden">
      <div className="grid grid-cols-5 gap-1">
        {navItems.map((item) => (
          <NavLink
            key={item.key}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center justify-center rounded-2xl px-2 py-2 text-[11px] font-semibold',
                isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-500',
              )
            }
          >
            <item.icon className="mb-1 h-4 w-4" />
            {t(`nav.${item.key}`)}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
