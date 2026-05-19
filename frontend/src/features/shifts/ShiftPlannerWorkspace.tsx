import { useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { CalendarClock, Clock3, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PageHeader } from '@/components/ui/PageHeader';
import { ErrorState, LoadingState } from '@/components/ui/QueryStates';
import { useShiftPlanner } from '@/features/shifts/useShiftPlanner';
import { useI18n } from '@/hooks/useI18n';
import { formatCompactCurrency, formatDate, formatTime } from '@/lib/utils/format';
import { getLocalizedText } from '@/lib/utils/localization';

const weekdaySequence = ['Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu'];

export function ShiftPlannerWorkspace() {
  const { t, language } = useI18n();
  const { data, isLoading, isError } = useShiftPlanner();

  const calendarView = useMemo(() => {
    if (!data) return [];
    return weekdaySequence.map((day) => ({
      day,
      shifts: data.upcoming.filter((shift) =>
        new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(new Date(shift.date)) === day,
      ),
    }));
  }, [data]);

  if (isLoading) return <LoadingState label={t('common.loading')} />;
  if (isError || !data) return <ErrorState title={t('common.error')} description="Shift planning data is unavailable right now." />;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Planning engine"
        title={t('shifts.title')}
        description={t('shifts.subtitle')}
        action={<Button variant="secondary">Schedule block</Button>}
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <p className="text-sm font-semibold text-slate-500">Active days this week</p>
          <p className="mt-3 text-3xl font-extrabold text-ink">{data.productivity.activeDays}</p>
        </Card>
        <Card>
          <p className="text-sm font-semibold text-slate-500">Average hours</p>
          <p className="mt-3 text-3xl font-extrabold text-ink">{data.productivity.avgHours} hrs</p>
        </Card>
        <Card>
          <p className="text-sm font-semibold text-slate-500">Best window</p>
          <p className="mt-3 text-2xl font-extrabold text-ink">{getLocalizedText(data.productivity.bestWindow, language)}</p>
        </Card>
        <Card className="bg-ink text-white">
          <p className="text-sm font-semibold text-brand-200">Weekly target</p>
          <p className="mt-3 text-3xl font-extrabold">{formatCompactCurrency(data.productivity.weeklyTarget)}</p>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <Card>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500">Upcoming shift blocks</p>
              <h2 className="mt-2 text-2xl font-bold text-ink">List view</h2>
            </div>
            <CalendarClock className="h-6 w-6 text-brand-700" />
          </div>
          <div className="space-y-3">
            {data.upcoming.map((shift) => (
              <div key={shift.id} className="rounded-3xl border border-slate-100 bg-white p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold text-ink">{getLocalizedText(shift.title, language)}</p>
                      <Badge tone={shift.status === 'recommended' ? 'warning' : shift.status === 'completed' ? 'success' : 'info'}>
                        {shift.status}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm text-slate-500">
                      {formatDate(shift.date)} · {shift.zone}
                    </p>
                  </div>
                  <div className="text-sm font-semibold text-slate-700">
                    {formatTime(shift.start)} - {formatTime(shift.end)}
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-sm">
                  <span className="text-slate-500">Earnings target</span>
                  <span className="font-bold text-ink">{formatCompactCurrency(shift.earningsTarget)}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-accent-100 to-white">
          <Badge tone="warning">Mock AI logic</Badge>
          <div className="mt-4 flex items-start justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold text-ink">{getLocalizedText(data.aiSuggestion.headline, language)}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{getLocalizedText(data.aiSuggestion.body, language)}</p>
            </div>
            <Sparkles className="h-6 w-6 text-accent-700" />
          </div>
          <div className="mt-8 h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.demandSlots}>
                <CartesianGrid stroke="#e2e8f0" strokeDasharray="4 4" vertical={false} />
                <XAxis dataKey="day" stroke="#64748b" tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="demandScore" fill="#e88f12" radius={[12, 12, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <div className="mb-5">
            <p className="text-sm font-semibold text-slate-500">Calendar-style view</p>
            <h2 className="mt-2 text-2xl font-bold text-ink">See how the week is stacked</h2>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-7">
            {calendarView.map((day) => (
              <div key={day.day} className="rounded-3xl border border-slate-100 bg-slate-50 p-3">
                <p className="text-sm font-bold text-ink">{day.day}</p>
                <div className="mt-3 space-y-2">
                  {day.shifts.length > 0 ? (
                    day.shifts.map((shift) => (
                      <div key={shift.id} className="rounded-2xl bg-white p-3 text-xs shadow-sm">
                        <p className="font-semibold text-slate-700">{shift.zone}</p>
                        <p className="mt-1 text-slate-500">{formatTime(shift.start)}</p>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-2xl border border-dashed border-slate-200 p-3 text-xs text-slate-400">No block</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="mb-5 flex items-center gap-2">
            <Clock3 className="h-5 w-5 text-brand-700" />
            <h2 className="text-2xl font-bold text-ink">High-demand slots</h2>
          </div>
          <div className="space-y-3">
            {data.demandSlots.map((slot) => (
              <div key={slot.id} className="rounded-2xl border border-slate-100 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-ink">
                      {slot.day} · {slot.window}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">{slot.hotspot}</p>
                  </div>
                  <Badge tone={slot.demandScore > 85 ? 'danger' : slot.demandScore > 70 ? 'warning' : 'success'}>
                    Demand {slot.demandScore}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
