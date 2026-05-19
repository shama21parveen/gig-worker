import { z } from 'zod';

export const emptyRequestSchema = z.object({
  body: z.object({}).passthrough(),
  query: z.object({}).passthrough(),
  params: z.object({}).passthrough(),
});
