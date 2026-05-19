import { useQuery } from '@tanstack/react-query';
import { shiftsService } from '@/services/shifts.service';

export const useShiftPlanner = () =>
  useQuery({
    queryKey: ['shift-planner'],
    queryFn: shiftsService.getPlanner,
  });
