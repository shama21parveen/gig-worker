import type { DashboardOverview } from '@/types';

export const dashboardOverview: DashboardOverview = {
  todayEarnings: 1820,
  completedTrips: 21,
  weeklyGoalProgress: 74,
  nextPayout: {
    date: '2026-04-19T10:00:00.000Z',
    amount: 6840,
    cycle: {
      en: 'Weekly settlement on Sunday 3 PM',
      hi: 'रविवार दोपहर 3 बजे साप्ताहिक सेटलमेंट',
    },
  },
  activeShift: {
    status: {
      en: 'Live on delivery apps',
      hi: 'डिलीवरी ऐप्स पर लाइव',
    },
    startedAt: '2026-04-16T12:30:00.000Z',
    targetHours: 10,
    elapsedHours: 5.5,
  },
  safetyScore: 92,
  weeklyEarnings: [
    { label: 'Mon', amount: 1240 },
    { label: 'Tue', amount: 1680 },
    { label: 'Wed', amount: 1540 },
    { label: 'Thu', amount: 1720 },
    { label: 'Fri', amount: 1980 },
    { label: 'Sat', amount: 2140 },
    { label: 'Sun', amount: 1860 },
  ],
  quickActions: [
    {
      id: 'log-expense',
      title: { en: 'Log expense', hi: 'खर्च दर्ज करें' },
      description: { en: 'Fuel, repairs, food, mobile recharge', hi: 'फ्यूल, रिपेयर, खाना, मोबाइल रिचार्ज' },
      route: '/app/earnings',
    },
    {
      id: 'plan-shift',
      title: { en: 'Plan next shift', hi: 'अगली शिफ्ट प्लान करें' },
      description: { en: 'Check demand windows and hotspots', hi: 'डिमांड स्लॉट और हॉटस्पॉट देखें' },
      route: '/app/shifts',
    },
    {
      id: 'trigger-sos',
      title: { en: 'Safety SOS', hi: 'सेफ्टी एसओएस' },
      description: { en: 'Emergency contacts and location share', hi: 'इमरजेंसी कॉन्टैक्ट और लोकेशन शेयर' },
      route: '/app/safety',
    },
    {
      id: 'raise-ticket',
      title: { en: 'Raise support ticket', hi: 'सपोर्ट टिकट बनाएं' },
      description: { en: 'Wrong payout or platform issue', hi: 'गलत पेआउट या प्लेटफ़ॉर्म समस्या' },
      route: '/app/support',
    },
  ],
  aiInsight: {
    title: {
      en: 'Rain pickup likely between 7:30 PM and 9:30 PM',
      hi: 'शाम 7:30 से 9:30 बजे के बीच बारिश के कारण ऑर्डर बढ़ सकते हैं',
    },
    body: {
      en: 'Koramangala and BTM are forecast to yield 14% higher order density. Keep payout threshold alerts on to avoid missed surges.',
      hi: 'कोरमंगला और बीटीएम में 14% अधिक ऑर्डर डेंसिटी का अनुमान है। सर्ज मिस न हो इसलिए पेआउट थ्रेशोल्ड अलर्ट चालू रखें।',
    },
    tag: {
      en: 'Forecast recommendation',
      hi: 'पूर्वानुमान सुझाव',
    },
  },
};
