import dotenv from 'dotenv';
import { z } from 'zod';
import { DEFAULT_API_PREFIX, DEFAULT_PORT } from '../constants/app.constants';
import type { AppEnv } from '../types/env.types';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(DEFAULT_PORT),
  API_PREFIX: z.string().min(1).default(DEFAULT_API_PREFIX),
  MONGODB_URI: z.string().min(1, 'MONGODB_URI is required'),
  JWT_ACCESS_SECRET: z.string().min(1, 'JWT_ACCESS_SECRET is required'),
  JWT_REFRESH_SECRET: z.string().min(1, 'JWT_REFRESH_SECRET is required'),
  JWT_ACCESS_EXPIRES_IN: z.string().min(1).default('15m'),
  JWT_REFRESH_EXPIRES_IN: z.string().min(1).default('7d'),
  CORS_ORIGIN: z.string().default('http://localhost:5173'),
  OTP_TTL_MINUTES: z.coerce.number().int().positive().default(5),
  MOCK_OTP_FIXED_CODE: z.string().length(6).optional(),
});

const parsedEnv = envSchema.parse(process.env);

export const env: AppEnv = {
  nodeEnv: parsedEnv.NODE_ENV,
  port: parsedEnv.PORT,
  apiPrefix: parsedEnv.API_PREFIX,
  mongodbUri: parsedEnv.MONGODB_URI,
  jwtAccessSecret: parsedEnv.JWT_ACCESS_SECRET,
  jwtRefreshSecret: parsedEnv.JWT_REFRESH_SECRET,
  jwtAccessExpiresIn: parsedEnv.JWT_ACCESS_EXPIRES_IN,
  jwtRefreshExpiresIn: parsedEnv.JWT_REFRESH_EXPIRES_IN,
  corsOrigin: parsedEnv.CORS_ORIGIN.split(',').map((origin) => origin.trim()),
  otpTtlMinutes: parsedEnv.OTP_TTL_MINUTES,
  mockOtpFixedCode: parsedEnv.MOCK_OTP_FIXED_CODE,
};
