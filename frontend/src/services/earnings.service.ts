import { earningsDataByView } from '@/mocks/data/earnings';
import { mockRequest } from '@/services/mock/mock-api';

export const earningsService = {
  getDataset: async (view: 'daily' | 'weekly' | 'monthly') => mockRequest(earningsDataByView[view]),
};
