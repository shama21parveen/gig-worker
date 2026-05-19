import { dashboardOverview } from '@/mocks/data/dashboard';
import { mockRequest } from '@/services/mock/mock-api';

export const dashboardService = {
  getOverview: async () => mockRequest(dashboardOverview),
};
