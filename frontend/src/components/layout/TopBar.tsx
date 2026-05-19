import { Bell, Globe2, Search } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';
import { useAppStore } from '@/store/app-store';
import { Button } from '@/components/ui/Button';

export function TopBar() {
  const { language, setLanguage, t } = useI18n();
  const signOut = useAppStore((state) => state.signOut);

  return (
    <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative max-w-lg flex-1">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          className="h-12 w-full rounded-2xl border border-white/70 bg-white/80 pl-11 pr-4 text-sm shadow-sm outline-none ring-0 placeholder:text-slate-400 focus:border-brand-200"
          placeholder="Search earnings, documents, zones, or tickets"
        />
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <div className="hidden items-center gap-2 rounded-2xl border border-white/70 bg-white/80 px-3 py-2 sm:flex">
          <Globe2 className="h-4 w-4 text-slate-500" />
          <label className="sr-only">{t('common.language')}</label>
          <select
            className="bg-transparent text-sm font-semibold text-slate-700 outline-none"
            value={language}
            onChange={(event) => setLanguage(event.target.value as 'en' | 'hi')}
          >
            <option value="en">{t('common.english')}</option>
            <option value="hi">{t('common.hindi')}</option>
          </select>
        </div>

        <button className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/70 bg-white/80 text-slate-600 shadow-sm">
          <Bell className="h-5 w-5" />
        </button>

        <Button variant="secondary" onClick={signOut} className="hidden sm:inline-flex">
          {t('nav.signOut')}
        </Button>
      </div>
    </header>
  );
}
