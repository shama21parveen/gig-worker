import { env } from '../config/env';
import { DEFAULT_WORKER_ZONE, type SupportedLanguage } from '../constants/auth.constants';
import { UserModel } from '../models/user.model';
import { WorkerModel } from '../models/worker.model';
import type { AuthTokens } from '../types/api.types';
import { ApiError } from '../utils/api-error';
import { issueAuthTokens, verifyRefreshToken } from '../utils/jwt';
import { normalizeIndianPhone } from '../utils/phone';

interface SendOtpInputBase {
  phone: string;
  purpose: 'sign_in' | 'sign_up';
}

interface SendOtpSignUpInput extends SendOtpInputBase {
  purpose: 'sign_up';
  fullName: string;
  city: string;
  preferredLanguage: SupportedLanguage;
}

interface SendOtpSignInInput extends SendOtpInputBase {
  purpose: 'sign_in';
}

type SendOtpInput = SendOtpSignInInput | SendOtpSignUpInput;

const buildOtpCode = () => env.mockOtpFixedCode ?? `${Math.floor(100000 + Math.random() * 900000)}`;

const otpExpiryDate = () => new Date(Date.now() + env.otpTtlMinutes * 60 * 1000);

export const authService = {
  async sendOtp(payload: SendOtpInput) {
    const phone = normalizeIndianPhone(payload.phone);
    const otpCode = buildOtpCode();
    const expiresAt = otpExpiryDate();

    let user = await UserModel.findOne({ phone });

    if (payload.purpose === 'sign_up') {
      if (user?.isPhoneVerified) {
        throw new ApiError(409, 'An account with this mobile number already exists');
      }

      if (!user) {
        user = await UserModel.create({
          phone,
          role: 'worker',
          preferredLanguage: payload.preferredLanguage,
          onboardingSnapshot: {
            fullName: payload.fullName,
            city: payload.city,
            preferredLanguage: payload.preferredLanguage,
          },
        });
      } else {
        user.preferredLanguage = payload.preferredLanguage;
        user.onboardingSnapshot = {
          fullName: payload.fullName,
          city: payload.city,
          preferredLanguage: payload.preferredLanguage,
        };
      }
    } else {
      if (!user) {
        throw new ApiError(404, 'No account found for this mobile number');
      }
    }

    user.otp = {
      code: otpCode,
      expiresAt,
      purpose: payload.purpose,
      attempts: 0,
    };

    await user.save();

    return {
      phone,
      purpose: payload.purpose,
      expiresAt: expiresAt.toISOString(),
      ...(env.nodeEnv !== 'production' ? { otpPreview: otpCode } : {}),
    };
  },

  async verifyOtp({ phone, code }: { phone: string; code: string }) {
    const normalizedPhone = normalizeIndianPhone(phone);
    const user = await UserModel.findOne({ phone: normalizedPhone });

    if (!user?.otp?.code || !user.otp.expiresAt) {
      throw new ApiError(400, 'No OTP request found for this mobile number');
    }

    if (user.otp.expiresAt.getTime() < Date.now()) {
      user.otp = null;
      await user.save();
      throw new ApiError(400, 'OTP has expired. Please request a new one');
    }

    if (user.otp.code !== code) {
      user.otp.attempts += 1;
      await user.save();
      throw new ApiError(400, 'Invalid OTP');
    }

    user.isPhoneVerified = true;
    user.lastLoginAt = new Date();

    let worker = await WorkerModel.findOne({ userId: user._id });

    if (!worker && user.role === 'worker') {
      if (!user.onboardingSnapshot?.fullName || !user.onboardingSnapshot.city) {
        throw new ApiError(400, 'Worker onboarding details are incomplete');
      }

      worker = await WorkerModel.create({
        userId: user._id,
        fullName: user.onboardingSnapshot.fullName,
        city: user.onboardingSnapshot.city,
        zone: DEFAULT_WORKER_ZONE,
        preferredLanguage: user.onboardingSnapshot.preferredLanguage ?? user.preferredLanguage,
        platformAffiliations: [],
        emergencyContacts: [],
      });
    }

    user.otp = null;
    await user.save();

    const tokens = issueAuthTokens({
      userId: user.id,
      role: user.role,
      refreshTokenVersion: user.refreshTokenVersion,
    });

    return {
      tokens,
      user: {
        id: user.id,
        phone: user.phone,
        role: user.role,
        preferredLanguage: user.preferredLanguage,
        isPhoneVerified: user.isPhoneVerified,
      },
      worker: worker
        ? {
            id: worker.id,
            fullName: worker.fullName,
            city: worker.city,
            zone: worker.zone,
            preferredLanguage: worker.preferredLanguage,
          }
        : null,
    };
  },

  async refreshAccessToken(refreshToken: string) {
    let payload: ReturnType<typeof verifyRefreshToken>;

    try {
      payload = verifyRefreshToken(refreshToken);
    } catch {
      throw new ApiError(401, 'Invalid or expired refresh token');
    }

    const user = await UserModel.findById(payload.sub);

    if (!user || !user.isActive) {
      throw new ApiError(401, 'User is not active');
    }

    if (payload.tokenVersion !== user.refreshTokenVersion) {
      throw new ApiError(401, 'Refresh token is no longer valid');
    }

    const tokens: AuthTokens = issueAuthTokens({
      userId: user.id,
      role: user.role,
      refreshTokenVersion: user.refreshTokenVersion,
    });

    return { tokens };
  },

  async logout(userId: string) {
    const user = await UserModel.findById(userId);

    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    user.refreshTokenVersion += 1;
    await user.save();

    return {
      userId: user.id,
      loggedOut: true,
    };
  },

  async getCurrentSession(userId: string) {
    const user = await UserModel.findById(userId);

    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    const worker = user.role === 'worker' ? await WorkerModel.findOne({ userId: user._id }) : null;

    return {
      user: {
        id: user.id,
        phone: user.phone,
        role: user.role,
        preferredLanguage: user.preferredLanguage,
        isPhoneVerified: user.isPhoneVerified,
        lastLoginAt: user.lastLoginAt,
      },
      worker: worker
        ? {
            id: worker.id,
            fullName: worker.fullName,
            city: worker.city,
            zone: worker.zone,
            preferredLanguage: worker.preferredLanguage,
            platformAffiliations: worker.platformAffiliations,
          }
        : null,
    };
  },
};
