import { grievanceCenterData } from '@/mocks/data/grievances';
import { mockRequest } from '@/services/mock/mock-api';

export const grievancesService = {
  getCenter: async () => mockRequest(grievanceCenterData),
  submit: async (payload: unknown) => mockRequest({ success: true, referenceId: 'TCK-1948', payload }),
};
