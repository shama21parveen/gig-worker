import type { EarningsView } from '../types/api.types';

export const EARNINGS_VIEWS: EarningsView[] = ['daily', 'weekly', 'monthly'];
export const EXPENSE_CATEGORIES = ['fuel', 'maintenance', 'food', 'mobile', 'other'] as const;
export const PLATFORM_NAMES = [
  'Swiggy',
  'Zomato',
  'Uber',
  'Ola',
  'Blinkit',
  'Porter',
  'Zepto',
] as const;

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];
export type PlatformName = (typeof PLATFORM_NAMES)[number];
