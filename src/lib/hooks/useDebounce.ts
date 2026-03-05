import { useState, useEffect } from 'react';

/**
 * Custom hook für debounced values
 * Verzögert die Aktualisierung eines Werts um die angegebene Zeit
 * 
 * @param value - Der zu debouncende Wert
 * @param delay - Verzögerung in Millisekunden (Standard: 500ms)
 * @returns Der debounced Wert
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set debouncedValue nach delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup bei unmount oder value/delay Änderung
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
