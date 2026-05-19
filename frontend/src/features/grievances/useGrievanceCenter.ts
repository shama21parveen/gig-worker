import { useMutation, useQuery } from '@tanstack/react-query';
import { grievancesService } from '@/services/grievances.service';

export const useGrievanceCenter = () =>
  useQuery({
    queryKey: ['grievance-center'],
    queryFn: grievancesService.getCenter,
  });

export const useSubmitGrievance = () =>
  useMutation({
    mutationFn: grievancesService.submit,
  });
