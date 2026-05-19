import type { ShiftPlannerData } from '@/types';

export const shiftPlannerData: ShiftPlannerData = {
  upcoming: [
    {
      id: 'shift-1',
      title: { en: 'Lunch delivery block', hi: 'लंच डिलीवरी ब्लॉक' },
      date: '2026-04-17T00:00:00.000Z',
      start: '2026-04-17T11:30:00.000Z',
      end: '2026-04-17T14:30:00.000Z',
      status: 'scheduled',
      zone: 'Koramangala',
      earningsTarget: 850,
    },
    {
      id: 'shift-2',
      title: { en: 'Evening ride-share surge', hi: 'ईवनिंग राइड-शेयर सर्ज' },
      date: '2026-04-17T00:00:00.000Z',
      start: '2026-04-17T18:00:00.000Z',
      end: '2026-04-17T22:00:00.000Z',
      status: 'recommended',
      zone: 'BTM Layout',
      earningsTarget: 1450,
    },
    {
      id: 'shift-3',
      title: { en: 'Quick commerce peak', hi: 'क्विक कॉमर्स पीक' },
      date: '2026-04-18T00:00:00.000Z',
      start: '2026-04-18T19:00:00.000Z',
      end: '2026-04-18T23:00:00.000Z',
      status: 'recommended',
      zone: 'Indiranagar',
      earningsTarget: 1680,
    },
  ],
  demandSlots: [
    { id: 'slot-1', day: 'Fri', window: '11 AM - 2 PM', demandScore: 78, hotspot: 'Koramangala' },
    { id: 'slot-2', day: 'Fri', window: '7 PM - 10 PM', demandScore: 92, hotspot: 'BTM Layout' },
    { id: 'slot-3', day: 'Sat', window: '8 AM - 11 AM', demandScore: 63, hotspot: 'HSR Layout' },
    { id: 'slot-4', day: 'Sat', window: '6 PM - 11 PM', demandScore: 95, hotspot: 'Indiranagar' },
  ],
  productivity: {
    activeDays: 6,
    avgHours: 8.4,
    bestWindow: {
      en: 'Friday dinner peak',
      hi: 'शुक्रवार डिनर पीक',
    },
    weeklyTarget: 14000,
  },
  aiSuggestion: {
    headline: {
      en: 'Bundle food + quick-commerce between 6 PM and 10 PM',
      hi: 'शाम 6 बजे से 10 बजे के बीच फूड + क्विक कॉमर्स बंडल करें',
    },
    body: {
      en: 'Demand history shows fewer idle minutes when you switch from Swiggy to Blinkit near Koramangala after 8 PM.',
      hi: 'डिमांड हिस्ट्री दिखाती है कि रात 8 बजे के बाद कोरमंगला के पास स्विगी से ब्लिंकिट पर जाने से idle minutes कम होते हैं।',
    },
  },
};
