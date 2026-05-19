import { demoWorker } from '@/mocks/data/auth';
import { mockRequest } from '@/services/mock/mock-api';

export const profileService = {
  getProfile: async () => mockRequest(demoWorker),
  updateProfile: async (payload: unknown) => mockRequest({ success: true, payload }),
};
