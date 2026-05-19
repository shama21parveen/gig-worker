import type { DocumentsVaultData } from '@/types';

export const documentsVaultData: DocumentsVaultData = {
  documents: [
    {
      id: 'doc-1',
      label: { en: 'Driving licence', hi: 'ड्राइविंग लाइसेंस' },
      documentNumber: 'DL-****-2841',
      status: 'verified',
      expiresOn: '2028-01-14T00:00:00.000Z',
      issuedBy: 'Karnataka Transport Department',
    },
    {
      id: 'doc-2',
      label: { en: 'Aadhaar card', hi: 'आधार कार्ड' },
      documentNumber: 'XXXX XXXX 4482',
      status: 'verified',
      expiresOn: '2035-12-31T00:00:00.000Z',
      issuedBy: 'UIDAI',
    },
    {
      id: 'doc-3',
      label: { en: 'Vehicle insurance', hi: 'वाहन बीमा' },
      documentNumber: 'IFFCO-****-1189',
      status: 'expiring',
      expiresOn: '2026-05-09T00:00:00.000Z',
      issuedBy: 'IFFCO Tokio',
    },
    {
      id: 'doc-4',
      label: { en: 'PUC certificate', hi: 'पीयूसी सर्टिफिकेट' },
      documentNumber: 'PUC-****-7782',
      status: 'review',
      expiresOn: '2026-07-28T00:00:00.000Z',
      issuedBy: 'Bengaluru Emission Centre',
    },
    {
      id: 'doc-5',
      label: { en: 'Platform verification selfie', hi: 'प्लेटफ़ॉर्म वेरिफिकेशन सेल्फी' },
      documentNumber: 'Awaiting upload',
      status: 'missing',
      expiresOn: '2026-04-30T00:00:00.000Z',
      issuedBy: 'Platform compliance',
    },
  ],
  reminders: [
    {
      en: 'Vehicle insurance renewal is due in 23 days.',
      hi: 'वाहन बीमा नवीनीकरण 23 दिनों में देय है।',
    },
    {
      en: 'Upload the latest verification selfie before the month-end platform audit.',
      hi: 'महीने के अंत की प्लेटफ़ॉर्म ऑडिट से पहले नवीनतम वेरिफिकेशन सेल्फी अपलोड करें।',
    },
  ],
};
