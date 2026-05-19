import jwt, { type Secret, type SignOptions } from 'jsonwebtoken';
import { env } from '../config/env';
import type { AuthTokens } from '../types/api.types';

interface TokenPayload {
  sub: string;
  role: 'worker' | 'admin';
  tokenVersion?: number;
}

function signToken(payload: TokenPayload, secret: Secret, expiresIn: SignOptions['expiresIn']) {
  return jwt.sign(payload, secret, { expiresIn });
}

export function issueAuthTokens({
  userId,
  role,
  refreshTokenVersion,
}: {
  userId: string;
  role: 'worker' | 'admin';
  refreshTokenVersion: number;
}): AuthTokens {
  const accessToken = signToken(
    { sub: userId, role },
    env.jwtAccessSecret,
    env.jwtAccessExpiresIn as SignOptions['expiresIn'],
  );

  const refreshToken = signToken(
    {
      sub: userId,
      role,
      tokenVersion: refreshTokenVersion,
    },
    env.jwtRefreshSecret,
    env.jwtRefreshExpiresIn as SignOptions['expiresIn'],
  );

  return {
    accessToken,
    refreshToken,
  };
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, env.jwtRefreshSecret) as {
    sub: string;
    role: 'worker' | 'admin';
    tokenVersion: number;
  };
}
