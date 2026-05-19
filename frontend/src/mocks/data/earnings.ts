import type { EarningsDataset } from '@/types';

export const earningsDataByView: Record<'daily' | 'weekly' | 'monthly', EarningsDataset> = {
  daily: {
    summary: {
      total: 1980,
      incentives: 240,
      deductions: 90,
      expenses: 260,
      net: 1630,
    },
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
        id: 'exp-01',
        label: { en: 'Petrol refill at Shell HSR', hi: 'शेल एचएसआर पर पेट्रोल भरवाया' },
        amount: 220,
        date: '2026-04-16T14:30:00.000Z',
        category: 'fuel',
      },
      {
        id: 'exp-02',
        label: { en: 'Tea and snack during break', hi: 'ब्रेक के दौरान चाय और स्नैक' },
        amount: 40,
        date: '2026-04-16T17:00:00.000Z',
        category: 'food',
      },
    ],
    forecast: {
      amount: 2120,
      confidence: 88,
      note: {
        en: 'If current completion rate holds through dinner demand, you are on track to cross today’s target by 8%.',
        hi: 'अगर मौजूदा कम्प्लीशन रेट डिनर डिमांड तक बना रहा, तो आप आज का टारगेट 8% से पार कर सकते हैं।',
      },
    },
  },
  weekly: {
    summary: {
      total: 11860,
      incentives: 1460,
      deductions: 420,
      expenses: 1780,
      net: 9660,
    },
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
        id: 'exp-03',
        label: { en: 'Fuel top-up', hi: 'फ्यूल टॉप-अप' },
        amount: 820,
        date: '2026-04-15T19:00:00.000Z',
        category: 'fuel',
      },
      {
        id: 'exp-04',
        label: { en: 'Bike service advance', hi: 'बाइक सर्विस एडवांस' },
        amount: 550,
        date: '2026-04-14T10:30:00.000Z',
        category: 'maintenance',
      },
      {
        id: 'exp-05',
        label: { en: 'Mobile recharge', hi: 'मोबाइल रिचार्ज' },
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
        hi: 'वीकेंड डिमांड मजबूत है। दो लेट-ईवनिंग ब्लॉक पूरे करने से नेट पेआउट लगभग 1,600 रुपये बढ़ सकता है।',
      },
    },
  },
  monthly: {
    summary: {
      total: 47480,
      incentives: 6240,
      deductions: 1610,
      expenses: 7620,
      net: 38250,
    },
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
        id: 'exp-06',
        label: { en: 'Monthly fuel spend', hi: 'मासिक फ्यूल खर्च' },
        amount: 4120,
        date: '2026-04-10T10:00:00.000Z',
        category: 'fuel',
      },
      {
        id: 'exp-07',
        label: { en: 'Brake pad replacement', hi: 'ब्रेक पैड बदले' },
        amount: 1500,
        date: '2026-04-06T11:30:00.000Z',
        category: 'maintenance',
      },
      {
        id: 'exp-08',
        label: { en: 'Rain gear + phone holder', hi: 'रेन गियर + फोन होल्डर' },
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
        hi: 'आपकी मासिक रन रेट अच्छी है। अगले हफ्ते मेंटेनेंस खर्च नियंत्रित रखने से टेक-होम मार्जिन सुरक्षित रहेगा।',
      },
    },
  },
};
