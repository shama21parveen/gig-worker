import { Schema, model, type InferSchemaType } from 'mongoose';
import { SUPPORTED_LANGUAGES, USER_ROLES } from '../constants/auth.constants';

const userSchema = new Schema(
  {
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    role: {
      type: String,
      enum: USER_ROLES,
      default: 'worker',
      required: true,
    },
    preferredLanguage: {
      type: String,
      enum: SUPPORTED_LANGUAGES,
      default: 'en',
      required: true,
    },
    isPhoneVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLoginAt: {
      type: Date,
      default: null,
    },
    refreshTokenVersion: {
      type: Number,
      default: 0,
    },
    otp: {
      type: {
        code: { type: String, default: null },
        expiresAt: { type: Date, default: null },
        purpose: { type: String, enum: ['sign_in', 'sign_up'], default: null },
        attempts: { type: Number, default: 0 },
      },
      default: null,
    },
    onboardingSnapshot: {
      type: {
        fullName: { type: String, default: '' },
        city: { type: String, default: '' },
        preferredLanguage: {
          type: String,
          enum: SUPPORTED_LANGUAGES,
          default: 'en',
        },
      },
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export type UserDocument = InferSchemaType<typeof userSchema>;
export const UserModel = model<UserDocument>('User', userSchema);
