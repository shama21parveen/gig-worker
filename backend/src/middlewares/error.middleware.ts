import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { env } from '../config/env';
import { ApiError } from '../utils/api-error';

export function errorMiddleware(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  const isApiError = error instanceof ApiError;
  const isZodError = error instanceof ZodError;

  if (isZodError) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: error.flatten(),
    });
  }

  const statusCode = isApiError ? error.statusCode : 500;
  const message = isApiError ? error.message : 'Internal server error';

  return res.status(statusCode).json({
    success: false,
    message,
    ...(isApiError && error.details ? { details: error.details } : {}),
    ...(env.nodeEnv !== 'production' && error instanceof Error ? { stack: error.stack } : {}),
  });
}
