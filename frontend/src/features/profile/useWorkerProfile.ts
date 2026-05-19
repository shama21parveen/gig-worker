import { useMutation, useQuery } from '@tanstack/react-query';
import { profileService } from '@/services/profile.service';

export const useWorkerProfile = () =>
  useQuery({
    queryKey: ['worker-profile'],
    queryFn: profileService.getProfile,
  });

export const useUpdateProfile = () =>
  useMutation({
    mutationFn: profileService.updateProfile,
  });
