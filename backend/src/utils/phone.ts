import { ApiError } from './api-error';

export function normalizeIndianPhone(phone: string) {
  const digits = phone.replace(/\D/g, '');

  if (digits.length === 10) {
    return `+91${digits}`;
  }

  if (digits.length === 12 && digits.startsWith('91')) {
    return `+${digits}`;
  }

  if (digits.length === 13 && digits.startsWith('091')) {
    return `+91${digits.slice(3)}`;
  }

  if (phone.startsWith('+91') && phone.replace(/\D/g, '').length === 12) {
    return `+91${digits.slice(-10)}`;
  }

  throw new ApiError(400, 'Please provide a valid Indian mobile number');
}
