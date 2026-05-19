import type { SafetyData } from '@/types';

export const safetyData: SafetyData = {
  city: 'Bengaluru',
  contacts: [
    {
      id: 'contact-1',
      name: 'Meena Devi',
      relation: { en: 'Mother', hi: 'माता' },
      phone: '+91 98450 21184',
    },
    {
      id: 'contact-2',
      name: 'Sajid Khan',
      relation: { en: 'Friend', hi: 'मित्र' },
      phone: '+91 98861 77841',
    },
  ],
  incidents: [
    {
      id: 'incident-1',
      area: 'Silk Board',
      type: { en: 'Phone snatching alert', hi: 'फोन स्नैचिंग अलर्ट' },
      timestamp: '2026-04-16T16:10:00.000Z',
      severity: 'high',
      note: {
        en: 'Two delivery riders reported theft near the flyover signal.',
        hi: 'फ्लाईओवर सिग्नल के पास दो डिलीवरी राइडर्स ने चोरी की शिकायत की।',
      },
    },
    {
      id: 'incident-2',
      area: 'Bellandur',
      type: { en: 'Rainwater hazard', hi: 'बरसाती पानी का खतरा' },
      timestamp: '2026-04-16T14:20:00.000Z',
      severity: 'medium',
      note: {
        en: 'Waterlogging reported on service road. Slow approach advised.',
        hi: 'सर्विस रोड पर पानी भरने की सूचना है। धीमी गति से जाएं।',
      },
    },
    {
      id: 'incident-3',
      area: 'HSR Layout',
      type: { en: 'Traffic police check', hi: 'ट्रैफिक पुलिस चेक' },
      timestamp: '2026-04-16T10:05:00.000Z',
      severity: 'low',
      note: {
        en: 'Vehicle document checks active near Sector 7 junction.',
        hi: 'सेक्टर 7 जंक्शन के पास वाहन दस्तावेज़ जांच चल रही है।',
      },
    },
  ],
  zones: [
    { id: 'zone-1', label: 'Koramangala', latitude: 12.9352, longitude: 77.6245, risk: 'low' },
    { id: 'zone-2', label: 'Silk Board', latitude: 12.9174, longitude: 77.6232, risk: 'high' },
    { id: 'zone-3', label: 'BTM Layout', latitude: 12.9166, longitude: 77.6101, risk: 'medium' },
    { id: 'zone-4', label: 'Bellandur', latitude: 12.925, longitude: 77.6762, risk: 'medium' },
  ],
  tips: [
    {
      en: 'Keep your phone mount angled inward at crowded traffic lights.',
      hi: 'भीड़ वाले ट्रैफिक सिग्नल पर अपना फोन माउंट अंदर की ओर रखें।',
    },
    {
      en: 'If rain starts, reduce order stacking and avoid low-visibility shortcuts.',
      hi: 'बारिश शुरू होते ही ऑर्डर स्टैकिंग कम करें और कम विज़िबिलिटी वाले शॉर्टकट से बचें।',
    },
    {
      en: 'Confirm helmet buckle and emergency battery level before night blocks.',
      hi: 'रात की शिफ्ट से पहले हेलमेट बकल और इमरजेंसी बैटरी लेवल जरूर जांचें।',
    },
  ],
  status: {
    batterySafe: true,
    helmetCheck: true,
    lastCheckIn: '2026-04-16T15:45:00.000Z',
  },
  routeAlert: {
    title: {
      en: 'Use the 27th Main detour after 9 PM',
      hi: 'रात 9 बजे के बाद 27th Main डिटूर लें',
    },
    body: {
      en: 'Lower incident density and better street lighting than the usual service lane around Silk Board.',
      hi: 'सिल्क बोर्ड के आसपास सामान्य सर्विस लेन की तुलना में कम incidents और बेहतर स्ट्रीट लाइटिंग।',
    },
    severity: 'medium',
  },
};
