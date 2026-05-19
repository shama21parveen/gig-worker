import { z } from 'zod';
import { SUPPORTED_LANGUAGES } from '../constants/auth.constants';

const optionalPhone = z.string().min(10, 'Emergency contact number is required').optional();

export const workerProfileGetSchema = z.object({
  body: z.object({}).passthrough(),
  query: z.object({}).passthrough(),
  params: z.object({}).passthrough(),
});

export const workerProfileUpdateSchema = z.object({
  body: z.object({
    preferredLanguage: z.enum(SUPPORTED_LANGUAGES),
    quietHours: z.string().min(3, 'Quiet hours are required'),
    emergencyContactName: z.string().min(2, 'Emergency contact name is required'),
    emergencyContactPhone: z.string().min(10, 'Emergency contact number is required'),
    payoutAlerts: z.boolean().optional(),
    shiftReminders: z.boolean().optional(),
    safetyBroadcasts: z.boolean().optional(),
    shareLiveLocation: z.boolean().optional(),
    nightShiftCheckIn: z.boolean().optional(),
  }),
  query: z.object({}).passthrough(),
  params: z.object({}).passthrough(),
});

export type WorkerProfileUpdateInput = z.infer<typeof workerProfileUpdateSchema>['body'];
