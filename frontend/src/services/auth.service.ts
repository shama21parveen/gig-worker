import { demoWorker } from '@/mocks/data/auth';
import { mockRequest } from '@/services/mock/mock-api';

export const authService = {
  getProfile: async () => mockRequest(demoWorker),
  signIn: async (_payload: unknown) => mockRequest({ next: '/auth/verify', workerId: demoWorker.id }),
  signUp: async (_payload: unknown) => mockRequest({ next: '/auth/verify', workerId: demoWorker.id }),
  verifyOtp: async (_payload: unknown) => mockRequest({ workerId: demoWorker.id, next: '/app/dashboard' }),
};
