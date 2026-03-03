import { z } from 'zod';

/**
 * Validate German ZIP code (5 digits)
 */
export function isValidZipCode(zip: string): boolean {
  return /^\d{5}$/.test(zip);
}

/**
 * Validate email address
 */
export function isValidEmail(email: string): boolean {
  return z.string().email().safeParse(email).success;
}

/**
 * Validate German phone number
 */
export function isValidPhoneNumber(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-\/\(\)]/g, '');
  return /^(\+49|0049|0)[1-9]\d{1,14}$/.test(cleaned);
}

/**
 * Validate consumption value (kWh)
 */
export function isValidConsumption(kwh: number): boolean {
  return kwh >= 500 && kwh <= 50000;
}

/**
 * Validate URL
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Sanitize string (remove HTML tags)
 */
export function sanitizeString(str: string): string {
  return str.replace(/<[^>]*>/g, '').trim();
}

/**
 * Validate IBAN (German)
 */
export function isValidIBAN(iban: string): boolean {
  const cleaned = iban.replace(/\s/g, '').toUpperCase();
  return /^DE\d{20}$/.test(cleaned);
}

/**
 * Check if date is in the past
 */
export function isDateInPast(date: Date | string): boolean {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.getTime() < Date.now();
}

/**
 * Check if date is in the future
 */
export function isDateInFuture(date: Date | string): boolean {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.getTime() > Date.now();
}

/**
 * Validate age (min/max)
 */
export function isValidAge(birthDate: Date | string, minAge = 18, maxAge = 120): boolean {
  const d = typeof birthDate === 'string' ? new Date(birthDate) : birthDate;
  const age = Math.floor((Date.now() - d.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
  return age >= minAge && age <= maxAge;
}