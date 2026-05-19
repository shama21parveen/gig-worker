import type { Request, Response } from 'express';
import { authService } from '../services/auth.service';
import { sendSuccess } from '../utils/api-response';

export async function sendOtp(req: Request, res: Response) {
  const result = await authService.sendOtp(req.body);

  return sendSuccess(res, {
    statusCode: 200,
    message: 'OTP sent successfully',
    data: result,
  });
}

export async function verifyOtp(req: Request, res: Response) {
  const result = await authService.verifyOtp(req.body);

  return sendSuccess(res, {
    statusCode: 200,
    message: 'OTP verified successfully',
    data: result,
  });
}

export async function refreshToken(req: Request, res: Response) {
  const result = await authService.refreshAccessToken(req.body.refreshToken);

  return sendSuccess(res, {
    statusCode: 200,
    message: 'Token refreshed successfully',
    data: result,
  });
}

export async function logout(req: Request, res: Response) {
  const result = await authService.logout(req.user!.userId);

  return sendSuccess(res, {
    statusCode: 200,
    message: 'Logged out successfully',
    data: result,
  });
}

export async function getCurrentUser(req: Request, res: Response) {
  const result = await authService.getCurrentSession(req.user!.userId);

  return sendSuccess(res, {
    statusCode: 200,
    message: 'Current session fetched successfully',
    data: result,
  });
}
