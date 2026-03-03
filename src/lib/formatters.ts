/**
 * Format number as Euro currency
 */
export function formatCurrency(amount: number, locale = 'de-DE'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format number with thousand separators
 */
export function formatNumber(num: number, locale = 'de-DE'): string {
  return new Intl.NumberFormat(locale).format(num);
}

/**
 * Format consumption with unit
 */
export function formatConsumption(kwh: number): string {
  return `${formatNumber(kwh)} kWh`;
}

/**
 * Format date to German locale
 */
export function formatDate(date: Date | string, format: 'short' | 'long' = 'short'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  if (format === 'long') {
    return new Intl.DateTimeFormat('de-DE', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(d);
  }
  
  return new Intl.DateTimeFormat('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(d);
}

/**
 * Format relative time (e.g., "vor 2 Stunden")
 */
export function formatRelativeTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) return `vor ${days} Tag${days > 1 ? 'en' : ''}`;
  if (hours > 0) return `vor ${hours} Stunde${hours > 1 ? 'n' : ''}`;
  if (minutes > 0) return `vor ${minutes} Minute${minutes > 1 ? 'n' : ''}`;
  return 'gerade eben';
}

/**
 * Format percentage
 */
export function formatPercentage(value: number, decimals = 0): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Format file size
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/**
 * Format phone number (German)
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.startsWith('49')) {
    // International format
    return `+49 ${cleaned.slice(2, 5)} ${cleaned.slice(5)}`;
  }
  
  if (cleaned.startsWith('0')) {
    // National format
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4)}`;
  }
  
  return phone;
}