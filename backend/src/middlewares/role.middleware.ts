import type { NextFunction, Request, Response } from 'express';
import type { UserRole } from '../constants/auth.constants';
import { ApiError } from '../utils/api-error';

export function authorize(...allowedRoles: UserRole[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new ApiError(401, 'Authentication is required'));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(new ApiError(403, 'You do not have access to this resource'));
    }

    return next();
  };
}
