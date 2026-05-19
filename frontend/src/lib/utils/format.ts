export const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);

export const formatCompactCurrency = (amount: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(amount);

export const formatPercent = (value: number) => `${value.toFixed(0)}%`;

export const formatDate = (value: string, locale = 'en-IN') =>
  new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short' }).format(new Date(value));

export const formatDateTime = (value: string, locale = 'en-IN') =>
  new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value));

export const formatTime = (value: string, locale = 'en-IN') =>
  new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value));

export const formatNumber = (value: number) =>
  new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(value);
