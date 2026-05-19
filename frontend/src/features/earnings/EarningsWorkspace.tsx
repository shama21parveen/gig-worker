import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Coins, Fuel, ReceiptText, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PageHeader } from '@/components/ui/PageHeader';
import { ErrorState, LoadingState } from '@/components/ui/QueryStates';
import { useEarningsDataset } from '@/features/earnings/useEarningsDataset';
import { useI18n } from '@/hooks/useI18n';
import { formatCompactCurrency, formatCurrency, formatDateTime } from '@/lib/utils/format';
import { getLocalizedText } from '@/lib/utils/localization';

const viewOptions: Array<{ key: 'daily' | 'weekly' | 'monthly'; label: string }> = [
  { key: 'daily', label: 'Daily' },
  { key: 'weekly', label: 'Weekly' },
  { key: 'monthly', label: 'Monthly' },
];

export function EarningsWorkspace() {
  const [view, setView] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const { t, language } = useI18n();
  const { data, isLoading, isError } = useEarningsDataset(view);

  if (isLoading) return <LoadingState label={t('common.loading')} />;
  if (isError || !data) return <ErrorState title={t('common.error')} description="Earnings data is unavailable right now." />;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Income visibility"
        title={t('earnings.title')}
        description={t('earnings.subtitle')}
        action={
          <div className="flex flex-wrap gap-2">
            {viewOptions.map((option) => (
              <Button
                key={option.key}
                variant={option.key === view ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setView(option.key)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        }
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <p className="text-sm font-semibold text-slate-500">Gross earnings</p>
          <p className="mt-3 text-3xl font-extrabold text-ink">{formatCurrency(data.summary.total)}</p>
          <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-brand-700">
            <Coins className="h-4 w-4" />
            Includes base pay, tips, and bonuses
          </div>
        </Card>
        <Card>
          <p className="text-sm font-semibold text-slate-500">Incentives</p>
          <p className="mt-3 text-3xl font-extrabold text-ink">{formatCurrency(data.summary.incentives)}</p>
          <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-accent-700">
            <TrendingUp className="h-4 w-4" />
            Dinner and weekend surge performance
          </div>
        </Card>
        <Card>
          <p className="text-sm font-semibold text-slate-500">Expenses</p>
          <p className="mt-3 text-3xl font-extrabold text-ink">{formatCurrency(data.summary.expenses)}</p>
          <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-slate-600">
            <Fuel className="h-4 w-4" />
            Fuel, maintenance, device and meal costs
          </div>
        </Card>
        <Card className="bg-ink text-white">
          <p className="text-sm font-semibold text-brand-200">Net take-home</p>
          <p className="mt-3 text-3xl font-extrabold">{formatCurrency(data.summary.net)}</p>
          <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-accent-200">
            <ReceiptText className="h-4 w-4" />
            Deductions already considered
          </div>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <div className="mb-6">
            <p className="text-sm font-semibold text-slate-500">Earnings trend</p>
            <h2 className="mt-2 text-2xl font-bold text-ink">Activity over the selected period</h2>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.trend}>
                <CartesianGrid stroke="#e2e8f0" strokeDasharray="4 4" vertical={false} />
                <XAxis dataKey="label" stroke="#64748b" tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" tickLine={false} axisLine={false} />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Line dataKey="amount" type="monotone" stroke="#248b71" strokeWidth={3} dot={{ r: 4 }} />
                <Line dataKey="expense" type="monotone" stroke="#e88f12" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-brand-900 via-brand-800 to-ink text-white">
          <Badge tone="warning" className="bg-accent-100/20 text-accent-100">
            {t('earnings.forecast')}
          </Badge>
          <h2 className="mt-4 text-3xl font-extrabold">{formatCompactCurrency(data.forecast.amount)}</h2>
          <p className="mt-3 text-sm leading-7 text-slate-200">{getLocalizedText(data.forecast.note, language)}</p>
          <div className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-100">Confidence</p>
            <div className="mt-3 h-3 rounded-full bg-white/10">
              <div
                className="h-3 rounded-full bg-accent-300"
                style={{ width: `${data.forecast.confidence}%` }}
              />
            </div>
            <p className="mt-2 text-sm font-semibold text-accent-100">{data.forecast.confidence}% forecast confidence</p>
          </div>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <div className="mb-6">
            <p className="text-sm font-semibold text-slate-500">Platform-wise breakdown</p>
            <h2 className="mt-2 text-2xl font-bold text-ink">Compare where the best take-home comes from</h2>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.platformBreakdown}>
                <CartesianGrid stroke="#e2e8f0" strokeDasharray="4 4" vertical={false} />
                <XAxis dataKey="platform" stroke="#64748b" tickLine={false} axisLine={false} />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Bar dataKey="amount" fill="#248b71" radius={[12, 12, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-5 space-y-3">
            {data.platformBreakdown.map((item) => (
              <div key={item.platform} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                <div>
                  <p className="font-semibold text-ink">{item.platform}</p>
                  <p className="text-xs text-slate-500">
                    {item.trips} trips · Avg {formatCurrency(item.avgPerTrip)}
                  </p>
                </div>
                <Badge tone="success">{formatCurrency(item.amount)}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500">{t('earnings.expenses')}</p>
              <h2 className="mt-2 text-2xl font-bold text-ink">Recent operating costs</h2>
            </div>
            <Button size="sm" variant="secondary">
              Add entry
            </Button>
          </div>
          <div className="space-y-3">
            {data.expenses.map((expense) => (
              <div key={expense.id} className="rounded-2xl border border-slate-100 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-ink">{getLocalizedText(expense.label, language)}</p>
                    <p className="mt-1 text-xs text-slate-500">{formatDateTime(expense.date)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-ink">{formatCurrency(expense.amount)}</p>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{expense.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
