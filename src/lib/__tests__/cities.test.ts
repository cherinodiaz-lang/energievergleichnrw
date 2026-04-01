import { describe, expect, it } from 'vitest';
import {
  CITIES,
  calcJahresersparnis,
  getCityBySlug,
  getGasCityFaqs,
  getGasCityPath,
  getStromCityFaqs,
  getStromCityPath,
} from '@/lib/cities';

describe('cities helpers', () => {
  it('returns a city by slug', () => {
    expect(getCityBySlug('koeln')?.name).toBe('Köln');
    expect(getCityBySlug('missing')).toBeUndefined();
  });

  it('calculates annual savings as a non-negative value', () => {
    expect(calcJahresersparnis(39.8, 31.1, 3500)).toBeGreaterThan(0);
    expect(calcJahresersparnis(30, 31, 3500)).toBe(0);
  });

  it('builds stable city paths', () => {
    expect(getStromCityPath('koeln')).toBe('/stromvergleich/koeln');
    expect(getGasCityPath('koeln')).toBe('/gasvergleich/koeln');
  });

  it('generates FAQs for both comparison types', () => {
    const city = CITIES[0];
    expect(getStromCityFaqs(city)).toHaveLength(4);
    expect(getGasCityFaqs(city)).toHaveLength(4);
  });
});
