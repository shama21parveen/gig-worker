import { userRepository } from '../repositories/user.repository';
import { workerRepository } from '../repositories/worker.repository';
import type { WorkerProfileUpdateInput } from '../validators/worker.validator';
import { ApiError } from '../utils/api-error';
import { normalizeIndianPhone } from '../utils/phone';

function getAvatarInitials(fullName: string) {
  return fullName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

function serializeWorkerProfile(user: any, worker: any) {
  const primaryEmergencyContact = worker.emergencyContacts?.[0];
  const rawVehicle = worker.vehicle as any;
  const vehicle =
    rawVehicle && typeof rawVehicle.type === 'object' && rawVehicle.type !== null
      ? rawVehicle.type
      : rawVehicle;

  return {
    id: worker.id ?? String(worker._id),
    userId: user.id ?? String(user._id),
    name: worker.fullName,
    phone: user.phone,
    city: worker.city,
    zone: worker.zone,
    preferredLanguage: worker.preferredLanguage,
    role: user.role,
    avatarInitials: getAvatarInitials(worker.fullName),
    platforms: worker.platformAffiliations ?? [],
    vehicle: {
      type: vehicle?.type ?? '',
      model: vehicle?.model ?? '',
      registration: vehicle?.registrationNumber ?? '',
      fuelType: vehicle?.fuelType ?? '',
    },
    notificationSettings: {
      payoutAlerts: worker.notificationSettings?.payoutAlerts ?? true,
      shiftReminders: worker.notificationSettings?.shiftReminders ?? true,
      safetyBroadcasts: worker.notificationSettings?.safetyBroadcasts ?? true,
      quietHours: worker.notificationSettings?.quietHours ?? '',
    },
    safetyPreferences: {
      shareLiveLocation: worker.safetyPreferences?.shareLiveLocation ?? true,
      nightShiftCheckIn: worker.safetyPreferences?.nightShiftCheckIn ?? true,
      emergencyContactName: primaryEmergencyContact?.name ?? '',
      emergencyContactPhone: primaryEmergencyContact?.phone ?? '',
    },
  };
}

export const workerService = {
  async getMyProfile(userId: string) {
    const [user, worker] = await Promise.all([
      userRepository.findById(userId),
      workerRepository.findByUserId(userId),
    ]);

    if (!user || user.role !== 'worker') {
      throw new ApiError(404, 'Worker account not found');
    }

    if (!worker) {
      throw new ApiError(404, 'Worker profile not found');
    }

    return serializeWorkerProfile(user, worker);
  },

  async updateMyProfile(userId: string, payload: WorkerProfileUpdateInput) {
    const [user, worker] = await Promise.all([
      userRepository.findById(userId),
      workerRepository.findByUserId(userId),
    ]);

    if (!user || user.role !== 'worker') {
      throw new ApiError(404, 'Worker account not found');
    }

    if (!worker) {
      throw new ApiError(404, 'Worker profile not found');
    }

    const normalizedEmergencyPhone = normalizeIndianPhone(payload.emergencyContactPhone);

    user.preferredLanguage = payload.preferredLanguage;
    worker.preferredLanguage = payload.preferredLanguage;
    worker.notificationSettings = {
      ...worker.notificationSettings,
      quietHours: payload.quietHours,
      payoutAlerts: payload.payoutAlerts ?? worker.notificationSettings?.payoutAlerts ?? true,
      shiftReminders: payload.shiftReminders ?? worker.notificationSettings?.shiftReminders ?? true,
      safetyBroadcasts: payload.safetyBroadcasts ?? worker.notificationSettings?.safetyBroadcasts ?? true,
    };
    worker.safetyPreferences = {
      ...worker.safetyPreferences,
      shareLiveLocation: payload.shareLiveLocation ?? worker.safetyPreferences?.shareLiveLocation ?? true,
      nightShiftCheckIn: payload.nightShiftCheckIn ?? worker.safetyPreferences?.nightShiftCheckIn ?? true,
    };
    worker.emergencyContacts = [
      {
        name: payload.emergencyContactName,
        relation: 'Primary contact',
        phone: normalizedEmergencyPhone,
      },
      ...(worker.emergencyContacts?.slice(1) ?? []),
    ] as any;

    await Promise.all([user.save(), worker.save()]);

    return serializeWorkerProfile(user, worker);
  },
};
