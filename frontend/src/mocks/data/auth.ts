import type { WorkerProfile } from '@/types';

export const demoWorker: WorkerProfile = {
  id: 'worker-001',
  name: 'Ravi Kumar',
  phone: '+91 98765 43210',
  city: 'Bengaluru',
  zone: 'HSR Layout',
  preferredLanguage: 'en',
  role: 'worker',
  avatarInitials: 'RK',
  platforms: ['Swiggy', 'Uber', 'Blinkit'],
  vehicle: {
    type: 'Two wheeler',
    model: 'Honda Activa 125',
    registration: 'KA 05 MQ 1284',
    fuelType: 'Petrol',
  },
  notificationSettings: {
    payoutAlerts: true,
    shiftReminders: true,
    safetyBroadcasts: true,
    quietHours: '23:00 - 06:00',
  },
  safetyPreferences: {
    shareLiveLocation: true,
    nightShiftCheckIn: true,
    emergencyContactName: 'Meena Devi',
    emergencyContactPhone: '+91 98450 21184',
  },
};
