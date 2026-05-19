import { shiftPlannerData } from '@/mocks/data/shifts';
import { mockRequest } from '@/services/mock/mock-api';

export const shiftsService = {
  getPlanner: async () => mockRequest(shiftPlannerData),
};
