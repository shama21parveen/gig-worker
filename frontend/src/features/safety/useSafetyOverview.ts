import { useQuery } from '@tanstack/react-query';
import { safetyService } from '@/services/safety.service';

export const useSafetyOverview = () =>
  useQuery({
    queryKey: ['safety-overview'],
    queryFn: safetyService.getOverview,
  });
