import { Router } from 'express';
import {
  getCurrentUser,
  logout,
  refreshToken,
  sendOtp,
  verifyOtp,
} from '../controllers/auth.controller';
import { requireAuth } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { asyncHandler } from '../utils/async-handler';
import {
  authMeSchema,
  refreshTokenSchema,
  sendOtpSchema,
  verifyOtpSchema,
} from '../validators/auth.validator';

const router = Router();

router.post('/send-otp', validate(sendOtpSchema), asyncHandler(sendOtp));
router.post('/verify-otp', validate(verifyOtpSchema), asyncHandler(verifyOtp));
router.post('/refresh-token', validate(refreshTokenSchema), asyncHandler(refreshToken));
router.post('/logout', requireAuth, validate(authMeSchema), asyncHandler(logout));
router.get('/me', requireAuth, validate(authMeSchema), asyncHandler(getCurrentUser));

export { router as authRoutes };
