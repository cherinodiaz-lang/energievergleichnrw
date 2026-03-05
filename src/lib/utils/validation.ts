/**
 * Validierungs- und Sanitization-Utilities
 * Alle Input-Validierungen für bessere Sicherheit
 */

/**
 * Validiert eine deutsche Postleitzahl (5 Ziffern)
 */
export function validateZipCode(zip: string): boolean {
  return /^\d{5}$/.test(zip);
}

/**
 * Sanitiert User-Input gegen XSS
 */
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>"']/g, '') // Entferne potentiell gefährliche Zeichen
    .slice(0, 100); // Max 100 Zeichen
}

/**
 * Validiert Hausnummer (Alphanumerisch mit max 10 Zeichen)
 */
export function validateHouseNumber(houseNumber: string): boolean {
  return /^[a-zA-Z0-9\s-]{1,10}$/.test(houseNumber);
}

/**
 * Validiert Verbrauchswert (1-50000 kWh)
 */
export function validateConsumption(consum: string | number): boolean {
  const value = typeof consum === 'string' ? parseInt(consum, 10) : consum;
  return !isNaN(value) && value > 0 && value <= 50000;
}

/**
 * Validiert Email-Adresse
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

/**
 * Validiert Telefonnummer (deutsche Formate)
 */
export function validatePhoneNumber(phone: string): boolean {
  const cleanPhone = phone.replace(/[\s-]/g, '');
  return /^(\+49|0)[1-9]\d{1,14}$/.test(cleanPhone);
}

/**
 * Rate Limiting Helper
 */
export class RateLimiter {
  private requests: number[] = [];

  constructor(
    private maxRequests: number = 5,
    private windowMs: number = 60000 // 1 Minute
  ) {}

  /**
   * Prüft ob Request erlaubt ist
   */
  canMakeRequest(): boolean {
    const now = Date.now();
    this.requests = this.requests.filter((time) => now - time < this.windowMs);

    if (this.requests.length >= this.maxRequests) {
      return false;
    }

    this.requests.push(now);
    return true;
  }

  /**
   * Gibt die verbleibende Zeit bis zum nächsten Request zurück
   */
  getTimeUntilNextRequest(): number {
    if (this.requests.length < this.maxRequests) {
      return 0;
    }

    const oldestRequest = Math.min(...this.requests);
    return this.windowMs - (Date.now() - oldestRequest);
  }
}
