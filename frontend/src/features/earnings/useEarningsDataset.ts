import { useQuery } from '@tanstack/react-query';
import { earningsService } from '@/services/earnings.service';

export const useEarningsDataset = (view: 'daily' | 'weekly' | 'monthly') =>
  useQuery({
    queryKey: ['earnings-dataset', view],
    queryFn: () => earningsService.getDataset(view),
  });
