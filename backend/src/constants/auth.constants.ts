export const USER_ROLES = ['worker', 'admin'] as const;
export const SUPPORTED_LANGUAGES = ['en', 'hi'] as const;
export const AUTH_OTP_PURPOSES = ['sign_in', 'sign_up'] as const;
export const DEFAULT_WORKER_ZONE = 'General';

export type UserRole = (typeof USER_ROLES)[number];
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];
export type AuthOtpPurpose = (typeof AUTH_OTP_PURPOSES)[number];
