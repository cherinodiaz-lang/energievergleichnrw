/**
 * Formatting Utilities
 */

/**
 * Format PLZ (5-stellig)
 */
export function formatPLZ(plz: string): string {
  return plz.replace(/\D/g, '').slice(0, 5);
}

/**
 * Validate PLZ
 */
export function isValidPLZ(plz: string): boolean {
  return /^\d{5}$/.test(plz);
}

/**
 * Format phone number (German)
 */
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3,5})(\d{3,8})$/);
  if (match) {
    return `${match[1]} ${match[2]}`;
  }
  return phone;
}

/**
 * Format currency (EUR)
 */
export function formatCurrency(amount: number, locale = 'de-DE'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
}

/**
 * Format number with locale
 */
export function formatNumber(num: number, locale = 'de-DE'): string {
  return new Intl.NumberFormat(locale).format(num);
}

/**
 * Format date (German)
 */
export function formatDate(date: Date | string, format: 'short' | 'long' = 'long'): string {
  const d = typeof date === 'string' ? new Date(date) : date;

  if (format === 'short') {
    return new Intl.DateTimeFormat('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(d);
  }

  return new Intl.DateTimeFormat('de-DE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(d);
}

/**
 * Format consumption (kWh)
 */
export function formatConsumption(kwh: number): string {
  return `${formatNumber(kwh)} kWh`;
}

/**
 * Calculate savings percentage
 */
export function calculateSavings(oldPrice: number, newPrice: number): number {
  return Math.round(((oldPrice - newPrice) / oldPrice) * 100);
}

/**
 * Format URL slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Truncate text
 */
export function truncate(text: string, length: number, suffix = '...'): string {
  if (text.length <= length) return text;
  return text.slice(0, length - suffix.length) + suffix;
}
