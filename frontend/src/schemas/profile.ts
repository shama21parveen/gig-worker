import { z } from 'zod';

export const profileSchema = z.object({
  preferredLanguage: z.enum(['en', 'hi']),
  quietHours: z.string().min(3, 'Enter quiet hours'),
  emergencyContactName: z.string().min(2, 'Add an emergency contact name'),
  emergencyContactPhone: z.string().min(10, 'Add an emergency contact number'),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
