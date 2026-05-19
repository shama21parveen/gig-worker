import { useMutation } from '@tanstack/react-query';
import { authService } from '@/services/auth.service';

export const useSignIn = () =>
  useMutation({
    mutationFn: authService.signIn,
  });

export const useSignUp = () =>
  useMutation({
    mutationFn: authService.signUp,
  });

export const useVerifyOtp = () =>
  useMutation({
    mutationFn: authService.verifyOtp,
  });
