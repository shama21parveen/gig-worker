import type { GrievanceCenterData } from '@/types';

export const grievanceCenterData: GrievanceCenterData = {
  categories: [
    { value: 'payout', label: { en: 'Payout issue', hi: 'पेआउट समस्या' } },
    { value: 'safety', label: { en: 'Safety incident', hi: 'सेफ्टी घटना' } },
    { value: 'account', label: { en: 'Account or suspension', hi: 'अकाउंट या सस्पेंशन' } },
    { value: 'documents', label: { en: 'Document verification', hi: 'डॉक्यूमेंट वेरिफिकेशन' } },
    { value: 'other', label: { en: 'Other support', hi: 'अन्य सपोर्ट' } },
  ],
  tickets: [
    {
      id: 'TCK-1842',
      title: 'Missing incentive for Friday dinner block',
      category: 'Payout issue',
      createdAt: '2026-04-15T18:40:00.000Z',
      status: 'in_review',
      summary: {
        en: 'Friday surge incentive did not reflect in settlement despite 18 completed orders.',
        hi: '18 ऑर्डर पूरे करने के बावजूद शुक्रवार का सर्ज इंसेंटिव सेटलमेंट में नहीं दिखा।',
      },
      attachments: ['screenshot-orders.png', 'settlement-summary.pdf'],
      timeline: [
        {
          id: 'tl-1',
          label: { en: 'Ticket created', hi: 'टिकट बनाया गया' },
          date: '2026-04-15T18:40:00.000Z',
        },
        {
          id: 'tl-2',
          label: { en: 'Platform review started', hi: 'प्लेटफ़ॉर्म रिव्यू शुरू हुआ' },
          date: '2026-04-16T09:15:00.000Z',
        },
      ],
    },
    {
      id: 'TCK-1794',
      title: 'Unsafe pickup spot near service lane',
      category: 'Safety incident',
      createdAt: '2026-04-11T20:10:00.000Z',
      status: 'resolved',
      summary: {
        en: 'Repeated pickup orders near dark service lane requested for safer rerouting.',
        hi: 'अंधेरी सर्विस लेन के पास बार-बार pickup orders आने पर सुरक्षित rerouting का अनुरोध किया गया।',
      },
      attachments: ['lane-photo.jpg'],
      timeline: [
        {
          id: 'tl-3',
          label: { en: 'Ticket created', hi: 'टिकट बनाया गया' },
          date: '2026-04-11T20:10:00.000Z',
        },
        {
          id: 'tl-4',
          label: { en: 'Rerouting applied', hi: 'रीरूटिंग लागू हुई' },
          date: '2026-04-13T11:30:00.000Z',
        },
      ],
    },
  ],
  faqs: [
    {
      id: 'faq-1',
      question: {
        en: 'How long do payout corrections usually take?',
        hi: 'पेआउट करेक्शन में आमतौर पर कितना समय लगता है?',
      },
      answer: {
        en: 'Mock SLA is 24 to 72 hours depending on platform settlement cycle and evidence quality.',
        hi: 'मॉक SLA प्लेटफ़ॉर्म सेटलमेंट साइकिल और सबूत की गुणवत्ता के अनुसार 24 से 72 घंटे है।',
      },
    },
    {
      id: 'faq-2',
      question: {
        en: 'Can I submit a voice note instead of typing?',
        hi: 'क्या मैं टाइप करने के बजाय वॉइस नोट सबमिट कर सकता हूँ?',
      },
      answer: {
        en: 'Yes, if your browser supports speech recognition and voice input is enabled.',
        hi: 'हाँ, यदि आपका ब्राउज़र speech recognition सपोर्ट करता है और voice input enabled है।',
      },
    },
  ],
};
