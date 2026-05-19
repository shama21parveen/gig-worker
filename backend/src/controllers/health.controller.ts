import type { Request, Response } from 'express';
import { healthService } from '../services/health.service';
import { sendSuccess } from '../utils/api-response';

export function getHealth(_req: Request, res: Response) {
  return sendSuccess(res, {
    message: 'API is healthy',
    data: healthService.getStatus(),
  });
}
