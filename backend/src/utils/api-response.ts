import type { Response } from 'express';
import type { ApiSuccessResponse } from '../types/api.types';

export function sendSuccess<T>(
  res: Response,
  {
    statusCode = 200,
    message = 'Request completed successfully',
    data,
    meta,
  }: {
    statusCode?: number;
    message?: string;
    data: T;
    meta?: Record<string, unknown>;
  },
) {
  const response: ApiSuccessResponse<T> = {
    success: true,
    message,
    data,
    ...(meta ? { meta } : {}),
  };

  return res.status(statusCode).json(response);
}
