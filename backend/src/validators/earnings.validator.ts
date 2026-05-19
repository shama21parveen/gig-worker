import { z } from 'zod';
import { EARNINGS_VIEWS, EXPENSE_CATEGORIES } from '../constants/earnings.constants';

export const earningsDatasetSchema = z.object({
  body: z.object({}).passthrough(),
  query: z.object({
    view: z.enum(EARNINGS_VIEWS as [string, ...string[]]).default('weekly'),
  }),
  params: z.object({}).passthrough(),
});

export const createExpenseSchema = z.object({
  body: z.object({
    label: z.object({
      en: z.string().min(2, 'English label is required'),
      hi: z.string().optional(),
    }),
    amount: z.number().positive('Amount must be greater than 0'),
    category: z.enum(EXPENSE_CATEGORIES),
    occurredAt: z.string().datetime().optional(),
  }),
  query: z.object({}).passthrough(),
  params: z.object({}).passthrough(),
});

export const payoutSchema = z.object({
  body: z.object({}).passthrough(),
  query: z.object({}).passthrough(),
  params: z.object({}).passthrough(),
});
