import { ExpenseRecordModel } from '../models/expense-record.model';
import { EarningsRecordModel } from '../models/earnings-record.model';
import { PayoutModel } from '../models/payout.model';
import { workerRepository } from '../repositories/worker.repository';
import type { EarningsView } from '../types/api.types';
import { ApiError } from '../utils/api-error';

const fallbackDatasets = {
  daily: {
    summary: { total: 1980, incentives: 240, deductions: 90, expenses: 260, net: 1630 },
    trend: [
      { label: '7 AM', amount: 120, incentive: 0, expense: 0 },
      { label: '9 AM', amount: 260, incentive: 0, expense: 60 },
      { label: '11 AM', amount: 340, incentive: 40, expense: 0 },
      { label: '1 PM', amount: 420, incentive: 50, expense: 80 },
      { label: '3 PM', amount: 280, incentive: 0, expense: 0 },
      { label: '6 PM', amount: 560, incentive: 90, expense: 120 },
    ],
    comparison: [
      { label: 'Base pay', amount: 1420 },
      { label: 'Bonuses', amount: 240 },
      { label: 'Tips', amount: 320 },
    ],
    platformBreakdown: [
      { platform: 'Swiggy', amount: 960, trips: 11, avgPerTrip: 87 },
      { platform: 'Blinkit', amount: 540, trips: 6, avgPerTrip: 90 },
      { platform: 'Uber', amount: 480, trips: 4, avgPerTrip: 120 },
    ],
    expenses: [
      {
        id: 'exp-fallback-01',
        label: { en: 'Petrol refill at Shell HSR', hi: 'Petrol refill at Shell HSR' },
        amount: 220,
        date: '2026-04-16T14:30:00.000Z',
        category: 'fuel',
      },
      {
        id: 'exp-fallback-02',
        label: { en: 'Tea and snack during break', hi: 'Tea and snack during break' },
        amount: 40,
        date: '2026-04-16T17:00:00.000Z',
        category: 'food',
      },
    ],
    forecast: {
      amount: 2120,
      confidence: 88,
      note: {
        en: "If current completion rate holds through dinner demand, you are on track to cross today's target by 8%.",
        hi: "If current completion rate holds through dinner demand, you are on track to cross today's target by 8%.",
      },
    },
  },
  weekly: {
    summary: { total: 11860, incentives: 1460, deductions: 420, expenses: 1780, net: 9660 },
    trend: [
      { label: 'Mon', amount: 1240, expense: 220 },
      { label: 'Tue', amount: 1680, incentive: 180, expense: 260 },
      { label: 'Wed', amount: 1540, incentive: 120, expense: 240 },
      { label: 'Thu', amount: 1720, incentive: 190, expense: 260 },
      { label: 'Fri', amount: 1980, incentive: 250, expense: 320 },
      { label: 'Sat', amount: 2140, incentive: 360, expense: 280 },
      { label: 'Sun', amount: 1560, incentive: 160, expense: 200 },
    ],
    comparison: [
      { label: 'Swiggy', amount: 4680 },
      { label: 'Uber', amount: 3260 },
      { label: 'Blinkit', amount: 3920 },
    ],
    platformBreakdown: [
      { platform: 'Swiggy', amount: 4680, trips: 49, avgPerTrip: 96 },
      { platform: 'Blinkit', amount: 3920, trips: 37, avgPerTrip: 106 },
      { platform: 'Uber', amount: 3260, trips: 24, avgPerTrip: 136 },
    ],
    expenses: [
      {
        id: 'exp-fallback-03',
        label: { en: 'Fuel top-up', hi: 'Fuel top-up' },
        amount: 820,
        date: '2026-04-15T19:00:00.000Z',
        category: 'fuel',
      },
      {
        id: 'exp-fallback-04',
        label: { en: 'Bike service advance', hi: 'Bike service advance' },
        amount: 550,
        date: '2026-04-14T10:30:00.000Z',
        category: 'maintenance',
      },
      {
        id: 'exp-fallback-05',
        label: { en: 'Mobile recharge', hi: 'Mobile recharge' },
        amount: 410,
        date: '2026-04-13T09:00:00.000Z',
        category: 'mobile',
      },
    ],
    forecast: {
      amount: 13450,
      confidence: 81,
      note: {
        en: 'Weekend demand is strong. Completing two late-evening blocks can raise net payout by about Rs. 1,600.',
        hi: 'Weekend demand is strong. Completing two late-evening blocks can raise net payout by about Rs. 1,600.',
      },
    },
  },
  monthly: {
    summary: { total: 47480, incentives: 6240, deductions: 1610, expenses: 7620, net: 38250 },
    trend: [
      { label: 'Week 1', amount: 10980, expense: 1810 },
      { label: 'Week 2', amount: 12140, incentive: 1420, expense: 1880 },
      { label: 'Week 3', amount: 11760, incentive: 1560, expense: 1960 },
      { label: 'Week 4', amount: 12600, incentive: 1890, expense: 1970 },
    ],
    comparison: [
      { label: 'Base pay', amount: 32870 },
      { label: 'Incentives', amount: 6240 },
      { label: 'Tips', amount: 8370 },
    ],
    platformBreakdown: [
      { platform: 'Swiggy', amount: 19120, trips: 204, avgPerTrip: 94 },
      { platform: 'Uber', amount: 13240, trips: 97, avgPerTrip: 136 },
      { platform: 'Blinkit', amount: 15120, trips: 149, avgPerTrip: 101 },
    ],
    expenses: [
      {
        id: 'exp-fallback-06',
        label: { en: 'Monthly fuel spend', hi: 'Monthly fuel spend' },
        amount: 4120,
        date: '2026-04-10T10:00:00.000Z',
        category: 'fuel',
      },
      {
        id: 'exp-fallback-07',
        label: { en: 'Brake pad replacement', hi: 'Brake pad replacement' },
        amount: 1500,
        date: '2026-04-06T11:30:00.000Z',
        category: 'maintenance',
      },
      {
        id: 'exp-fallback-08',
        label: { en: 'Rain gear + phone holder', hi: 'Rain gear + phone holder' },
        amount: 2000,
        date: '2026-04-02T16:15:00.000Z',
        category: 'other',
      },
    ],
    forecast: {
      amount: 51200,
      confidence: 78,
      note: {
        en: 'Your monthly run rate is healthy. Containing maintenance spend next week will protect take-home margin.',
        hi: 'Your monthly run rate is healthy. Containing maintenance spend next week will protect take-home margin.',
      },
    },
  },
} as const;

const fallbackPayout = {
  date: '2026-04-19T10:00:00.000Z',
  amount: 6840,
  cycle: {
    en: 'Weekly settlement on Sunday 3 PM',
    hi: 'Weekly settlement on Sunday 3 PM',
  },
  status: 'scheduled',
};

function cloneFallbackDataset(view: EarningsView) {
  return structuredClone(fallbackDatasets[view]);
}

function getDateRange(view: EarningsView) {
  const now = new Date();
  const start = new Date(now);
  const end = new Date(now);

  if (view === 'daily') {
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);
    return { start, end };
  }

  if (view === 'weekly') {
    const day = start.getDay();
    const diffToMonday = (day + 6) % 7;
    start.setDate(start.getDate() - diffToMonday);
    start.setHours(0, 0, 0, 0);
    end.setDate(start.getDate() + 6);
    end.setHours(23, 59, 59, 999);
    return { start, end };
  }

  start.setDate(1);
  start.setHours(0, 0, 0, 0);
  end.setMonth(end.getMonth() + 1, 0);
  end.setHours(23, 59, 59, 999);
  return { start, end };
}

function buildEmptyTrend(view: EarningsView) {
  if (view === 'daily') {
    return ['7 AM', '9 AM', '11 AM', '1 PM', '3 PM', '6 PM'].map((label) => ({
      label,
      amount: 0,
      incentive: 0,
      expense: 0,
    }));
  }

  if (view === 'weekly') {
    return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((label) => ({
      label,
      amount: 0,
      incentive: 0,
      expense: 0,
    }));
  }

  return ['Week 1', 'Week 2', 'Week 3', 'Week 4'].map((label) => ({
    label,
    amount: 0,
    incentive: 0,
    expense: 0,
  }));
}

function getTrendLabel(date: Date, view: EarningsView) {
  if (view === 'daily') {
    const hour = date.getHours();
    if (hour < 8) return '7 AM';
    if (hour < 10) return '9 AM';
    if (hour < 12) return '11 AM';
    if (hour < 14) return '1 PM';
    if (hour < 16) return '3 PM';
    return '6 PM';
  }

  if (view === 'weekly') {
    return new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);
  }

  const dayOfMonth = date.getDate();
  if (dayOfMonth <= 7) return 'Week 1';
  if (dayOfMonth <= 14) return 'Week 2';
  if (dayOfMonth <= 21) return 'Week 3';
  return 'Week 4';
}

function forecastFor(summary: {
  total: number;
  incentives: number;
  deductions: number;
  expenses: number;
  net: number;
}, view: EarningsView) {
  const multiplier = view === 'daily' ? 1.08 : view === 'weekly' ? 1.11 : 1.07;
  const amount = Math.round(summary.net * multiplier);
  const confidence = view === 'daily' ? 82 : view === 'weekly' ? 79 : 75;

  return {
    amount,
    confidence,
    note: {
      en:
        view === 'daily'
          ? 'Dinner-demand momentum can push take-home modestly above the current run rate.'
          : view === 'weekly'
            ? 'Weekend peaks and lower idle time can improve the week-end payout from the current trend.'
            : 'Sustaining current activity with controlled expenses should improve month-end take-home.',
      hi:
        view === 'daily'
          ? 'Dinner-demand momentum can push take-home modestly above the current run rate.'
          : view === 'weekly'
            ? 'Weekend peaks and lower idle time can improve the week-end payout from the current trend.'
            : 'Sustaining current activity with controlled expenses should improve month-end take-home.',
    },
  };
}

export const earningsService = {
  async getDataset(userId: string, view: EarningsView) {
    const worker = await workerRepository.findByUserId(userId);

    if (!worker) {
      throw new ApiError(404, 'Worker profile not found');
    }

    const { start, end } = getDateRange(view);

    const [records, expenses] = await Promise.all([
      EarningsRecordModel.find({
        userId,
        occurredAt: { $gte: start, $lte: end },
      }).sort({ occurredAt: 1 }),
      ExpenseRecordModel.find({
        userId,
        occurredAt: { $gte: start, $lte: end },
      }).sort({ occurredAt: -1 }),
    ]);

    if (records.length === 0 && expenses.length === 0) {
      return cloneFallbackDataset(view);
    }

    const summary = {
      total: 0,
      incentives: 0,
      deductions: 0,
      expenses: 0,
      net: 0,
    };

    const trend = buildEmptyTrend(view);
    const trendMap = new Map(trend.map((item) => [item.label, item]));
    const platformMap = new Map<
      string,
      { platform: string; amount: number; trips: number; avgPerTrip: number }
    >();

    let tipsTotal = 0;
    let basePayTotal = 0;

    for (const record of records as any[]) {
      const amount = record.basePay + record.tips + record.incentives;
      summary.total += amount;
      summary.incentives += record.incentives;
      summary.deductions += record.deductions;
      basePayTotal += record.basePay;
      tipsTotal += record.tips;

      const label = getTrendLabel(new Date(record.occurredAt), view);
      const trendDatum = trendMap.get(label);

      if (trendDatum) {
        trendDatum.amount += amount;
        trendDatum.incentive = (trendDatum.incentive ?? 0) + record.incentives;
      }

      const existing = platformMap.get(record.platform) ?? {
        platform: record.platform,
        amount: 0,
        trips: 0,
        avgPerTrip: 0,
      };

      existing.amount += amount;
      existing.trips += record.trips;
      existing.avgPerTrip = existing.trips > 0 ? Math.round(existing.amount / existing.trips) : 0;
      platformMap.set(record.platform, existing);
    }

    for (const expense of expenses as any[]) {
      summary.expenses += expense.amount;

      const label = getTrendLabel(new Date(expense.occurredAt), view);
      const trendDatum = trendMap.get(label);

      if (trendDatum) {
        trendDatum.expense = (trendDatum.expense ?? 0) + expense.amount;
      }
    }

    summary.net = summary.total - summary.deductions - summary.expenses;

    const comparison =
      view === 'daily'
        ? [
            { label: 'Base pay', amount: basePayTotal },
            { label: 'Bonuses', amount: summary.incentives },
            { label: 'Tips', amount: tipsTotal },
          ]
        : Array.from(platformMap.values()).map((item) => ({
            label: item.platform,
            amount: item.amount,
          }));

    return {
      summary,
      trend,
      comparison,
      platformBreakdown: Array.from(platformMap.values()),
      expenses: expenses.map((expense: any) => ({
        id: expense.id ?? String(expense._id),
        label: {
          en: expense.label?.en ?? '',
          hi: expense.label?.hi || expense.label?.en || '',
        },
        amount: expense.amount,
        date: new Date(expense.occurredAt).toISOString(),
        category: expense.category,
      })),
      forecast: forecastFor(summary, view),
    };
  },

  async createExpense(
    userId: string,
    payload: {
      label: { en: string; hi?: string };
      amount: number;
      category: 'fuel' | 'maintenance' | 'food' | 'mobile' | 'other';
      occurredAt?: string;
    },
  ) {
    const worker = await workerRepository.findByUserId(userId);

    if (!worker) {
      throw new ApiError(404, 'Worker profile not found');
    }

    const expense = await ExpenseRecordModel.create({
      userId,
      workerId: worker._id,
      label: {
        en: payload.label.en,
        hi: payload.label.hi ?? payload.label.en,
      },
      amount: payload.amount,
      category: payload.category,
      occurredAt: payload.occurredAt ? new Date(payload.occurredAt) : new Date(),
    });

    return {
      id: expense.id ?? String(expense._id),
      label: {
        en: expense.label.en,
        hi: expense.label.hi,
      },
      amount: expense.amount,
      category: expense.category,
      date: new Date(expense.occurredAt).toISOString(),
    };
  },

  async getUpcomingPayout(userId: string) {
    const worker = await workerRepository.findByUserId(userId);

    if (!worker) {
      throw new ApiError(404, 'Worker profile not found');
    }

    const payout = await PayoutModel.findOne({
      userId,
      scheduledFor: { $gte: new Date() },
    }).sort({ scheduledFor: 1 });

    if (!payout) {
      return structuredClone(fallbackPayout);
    }

    return {
      date: new Date((payout as any).scheduledFor).toISOString(),
      amount: (payout as any).amount,
      cycle: {
        en: (payout as any).cycle.en,
        hi: (payout as any).cycle.hi || (payout as any).cycle.en,
      },
      status: (payout as any).status,
    };
  },
};
