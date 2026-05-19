import { z } from 'zod';

export const signInSchema = z.object({
  phone: z.string().min(10, 'Enter a valid mobile number'),
  password: z.string().min(4, 'Enter at least 4 characters'),
});

export const signUpSchema = z.object({
  fullName: z.string().min(2, 'Enter your full name'),
  phone: z.string().min(10, 'Enter a valid mobile number'),
  city: z.string().min(2, 'Select your city'),
  language: z.enum(['en', 'hi']),
});

export const otpSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

export type SignInFormValues = z.infer<typeof signInSchema>;
export type SignUpFormValues = z.infer<typeof signUpSchema>;
export type OtpFormValues = z.infer<typeof otpSchema>;
