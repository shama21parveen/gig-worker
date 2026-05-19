export interface ApiSuccessResponse<T> {
  success: true;
  message: string;
  data: T;
  meta?: Record<string, unknown>;
}

export interface AuthenticatedUser {
  userId: string;
  role: 'worker' | 'admin';
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export type EarningsView = 'daily' | 'weekly' | 'monthly';
