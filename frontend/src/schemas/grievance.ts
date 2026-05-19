import { z } from 'zod';

export const grievanceSchema = z.object({
  category: z.string().min(1, 'Choose a category'),
  title: z.string().min(5, 'Add a short title'),
  note: z.string().min(10, 'Describe the issue in a bit more detail'),
});

export type GrievanceFormValues = z.infer<typeof grievanceSchema>;
