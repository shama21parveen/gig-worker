import { Schema, Types, model, type InferSchemaType } from 'mongoose';
import { SUPPORTED_LANGUAGES } from '../constants/auth.constants';

const workerSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    zone: {
      type: String,
      default: '',
      trim: true,
    },
    preferredLanguage: {
      type: String,
      enum: SUPPORTED_LANGUAGES,
      default: 'en',
      required: true,
    },
    platformAffiliations: {
      type: [String],
      default: [],
    },
    vehicle: {
      type: {
        type: { type: String, default: '' },
        model: { type: String, default: '' },
        registrationNumber: { type: String, default: '' },
        fuelType: { type: String, default: '' },
      },
      default: {},
    },
    emergencyContacts: {
      type: [
        {
          name: { type: String, required: true, trim: true },
          relation: { type: String, required: true, trim: true },
          phone: { type: String, required: true, trim: true },
        },
      ],
      default: [],
    },
    notificationSettings: {
      type: {
        payoutAlerts: { type: Boolean, default: true },
        shiftReminders: { type: Boolean, default: true },
        safetyBroadcasts: { type: Boolean, default: true },
        quietHours: { type: String, default: '' },
      },
      default: {},
    },
    safetyPreferences: {
      type: {
        shareLiveLocation: { type: Boolean, default: true },
        nightShiftCheckIn: { type: Boolean, default: true },
      },
      default: {},
    },
  },
  {
    timestamps: true,
  },
);

export type WorkerDocument = InferSchemaType<typeof workerSchema> & { userId: Types.ObjectId };
export const WorkerModel = model<WorkerDocument>('Worker', workerSchema);
