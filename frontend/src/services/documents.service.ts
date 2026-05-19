import { documentsVaultData } from '@/mocks/data/documents';
import { mockRequest } from '@/services/mock/mock-api';

export const documentsService = {
  getVault: async () => mockRequest(documentsVaultData),
};
