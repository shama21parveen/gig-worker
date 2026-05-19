import { Link } from 'react-router-dom';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { Activity, BrainCircuit, IndianRupee, Shield, Timer } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { PageHeader } from '@/components/ui/PageHeader';
import { ErrorState, LoadingState } from '@/components/ui/QueryStates';
import { StatCard } from '@/components/ui/StatCard';
import { useDashboardOverview } from '@/features/dashboard/useDashboardOverview';
import { useI18n } from '@/hooks/useI18n';
import { formatCompactCurrency, formatCurrency, formatPercent, formatTime } from '@/lib/utils/format';
import { getLocalizedText } from '@/lib/utils/localization';

export function DashboardOverviewScreen() {
  const { t, language } = useI18n();
  const { data, isLoading, isError } = useDashboardOverview();

  if (isLoading) return <LoadingState label={t('common.loading')} />;
  if (isError || !data) return <ErrorState title={t('common.error')} description="Dashboard data could not be loaded." />;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Field operations"
        title={t('dashboard.title')}
        description={t('dashboard.subtitle')}
        action={<Badge tone="success">{getLocalizedText(data.aiInsight.tag, language)}</Badge>}
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Today’s earnings"
          value={formatCurrency(data.todayEarnings)}
          hint={`${data.completedTrips} completed trips`}
          icon={<IndianRupee className="h-5 w-5" />}
        />
        <StatCard
          label={t('dashboard.nextPayout')}
          value={formatCompactCurrency(data.nextPayout.amount)}
          hint={getLocalizedText(data.nextPayout.cycle, language)}
          icon={<Timer className="h-5 w-5" />}
        />
        <StatCard
          label={t('dashboard.activeShift')}
          value={formatTime(data.activeShift.startedAt)}
          hint={`${data.activeShift.elapsedHours}/${data.activeShift.targetHours} hrs tracked`}
          icon={<Activity className="h-5 w-5" />}
        />
        <StatCard
          label={t('dashboard.safetyScore')}
          value={formatPercent(data.safetyScore)}
          hint="Strong compliance and check-in pattern"
          icon={<Shield className="h-5 w-5" />}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <Card className="overflow-hidden">
          <div className="mb-6 flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-slate-500">Weekly earnings</p>
              <h2 className="mt-2 text-2xl font-bold text-ink">{formatCurrency(12160)}</h2>
            </div>
            <Badge tone="info">Goal progress {formatPercent(data.weeklyGoalProgress)}</Badge>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.weeklyEarnings}>
                <defs>
                  <linearGradient id="earningsFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor="#248b71" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#248b71" stopOpacity={0.04} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#e2e8f0" strokeDasharray="4 4" vertical={false} />
                <XAxis dataKey="label" stroke="#64748b" tickLine={false} axisLine={false} />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Area
                  dataKey="amount"
                  type="monotone"
                  stroke="#248b71"
                  strokeWidth={3}
                  fill="url(#earningsFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="bg-ink text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-brand-200">{t('dashboard.aiInsight')}</p>
              <h2 className="mt-3 text-2xl font-display">{getLocalizedText(data.aiInsight.title, language)}</h2>
            </div>
            <div className="rounded-2xl bg-white/10 p-3">
              <BrainCircuit className="h-6 w-6 text-accent-200" />
            </div>
          </div>
          <p className="mt-4 text-sm leading-7 text-slate-300">{getLocalizedText(data.aiInsight.body, language)}</p>

          <div className="mt-8 grid gap-3">
            {data.quickActions.map((action) => (
              <Link
                key={action.id}
                to={action.route}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
              >
                <p className="text-sm font-semibold text-white">{getLocalizedText(action.title, language)}</p>
                <p className="mt-1 text-xs leading-5 text-slate-300">{getLocalizedText(action.description, language)}</p>
              </Link>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
