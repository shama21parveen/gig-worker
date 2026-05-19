import { safetyData } from '@/mocks/data/safety';
import { mockRequest } from '@/services/mock/mock-api';

export const safetyService = {
  getOverview: async () => mockRequest(safetyData),
};
