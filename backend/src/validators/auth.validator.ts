import { z } from 'zod';
import { AUTH_OTP_PURPOSES, SUPPORTED_LANGUAGES } from '../constants/auth.constants';

const signInBodySchema = z.object({
  phone: z.string().min(10),
  purpose: z.literal('sign_in'),
});

const signUpBodySchema = z.object({
  phone: z.string().min(10),
  purpose: z.literal('sign_up'),
  fullName: z.string().min(2, 'Full name is required'),
  city: z.string().min(2, 'City is required'),
  preferredLanguage: z.enum(SUPPORTED_LANGUAGES).default('en'),
});

export const sendOtpSchema = z.object({
  body: z.discriminatedUnion('purpose', [signInBodySchema, signUpBodySchema]),
  query: z.object({}).passthrough(),
  params: z.object({}).passthrough(),
});

export const verifyOtpSchema = z.object({
  body: z.object({
    phone: z.string().min(10),
    code: z.string().length(6, 'OTP must be 6 digits'),
  }),
  query: z.object({}).passthrough(),
  params: z.object({}).passthrough(),
});

export const refreshTokenSchema = z.object({
  body: z.object({
    refreshToken: z.string().min(1, 'Refresh token is required'),
  }),
  query: z.object({}).passthrough(),
  params: z.object({}).passthrough(),
});

export const authMeSchema = z.object({
  body: z.object({}).passthrough(),
  query: z.object({}).passthrough(),
  params: z.object({}).passthrough(),
});
