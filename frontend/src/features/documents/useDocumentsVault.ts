import { useQuery } from '@tanstack/react-query';
import { documentsService } from '@/services/documents.service';

export const useDocumentsVault = () =>
  useQuery({
    queryKey: ['documents-vault'],
    queryFn: documentsService.getVault,
  });
