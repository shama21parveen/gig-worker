import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { ApiError } from '../utils/api-error';

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return next(new ApiError(401, 'Authentication token is required'));
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const payload = jwt.verify(token, env.jwtAccessSecret) as {
      sub: string;
      role: 'worker' | 'admin';
    };

    req.user = {
      userId: payload.sub,
      role: payload.role,
    };

    return next();
  } catch {
    return next(new ApiError(401, 'Invalid or expired authentication token'));
  }
}
