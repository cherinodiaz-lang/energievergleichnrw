/**
 * Type-safe Local Storage Wrapper
 */

type StorageValue = string | number | boolean | object | null;

class Storage {
  private prefix: string;

  constructor(prefix = 'energievergleich_') {
    this.prefix = prefix;
  }

  /**
   * Get item from storage
   */
  get<T extends StorageValue>(key: string, defaultValue?: T): T | null {
    if (typeof window === 'undefined') return defaultValue ?? null;

    try {
      const item = localStorage.getItem(this.prefix + key);
      if (item === null) return defaultValue ?? null;
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Error reading from storage (${key}):`, error);
      return defaultValue ?? null;
    }
  }

  /**
   * Set item in storage
   */
  set(key: string, value: StorageValue): boolean {
    if (typeof window === 'undefined') return false;

    try {
      localStorage.setItem(this.prefix + key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error writing to storage (${key}):`, error);
      return false;
    }
  }

  /**
   * Remove item from storage
   */
  remove(key: string): boolean {
    if (typeof window === 'undefined') return false;

    try {
      localStorage.removeItem(this.prefix + key);
      return true;
    } catch (error) {
      console.error(`Error removing from storage (${key}):`, error);
      return false;
    }
  }

  /**
   * Clear all items with prefix
   */
  clear(): boolean {
    if (typeof window === 'undefined') return false;

    try {
      const keys = Object.keys(localStorage);
      keys.forEach((key) => {
        if (key.startsWith(this.prefix)) {
          localStorage.removeItem(key);
        }
      });
      return true;
    } catch (error) {
      console.error('Error clearing storage:', error);
      return false;
    }
  }

  /**
   * Check if key exists
   */
  has(key: string): boolean {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(this.prefix + key) !== null;
  }
}

export const storage = new Storage();
