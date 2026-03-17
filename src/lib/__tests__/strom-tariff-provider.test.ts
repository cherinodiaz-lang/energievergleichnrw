import { describe, expect, it, vi } from 'vitest';
import {
  normalizeProviderTariffs,
  searchStromTariffs,
  validateStromTariffInput,
} from '@/lib/strom-tariff-provider';

describe('strom-tariff-provider', () => {
  it('validates postcode and annual consumption', () => {
    const result = validateStromTariffInput({
      postcode: '123',
      annualConsumption: '0',
    });

    expect(result.valid).toBe(false);
    expect(result.errors.postcode).toBeTruthy();
    expect(result.errors.annualConsumption).toBeTruthy();
  });

  it('normalizes provider tariffs to the internal result shape', () => {
    const tariffs = normalizeProviderTariffs(
      {
        results: [
          {
            providerName: 'Tarifwerk',
            tariffName: 'Fix 12',
            totalPrice: 1188,
            basePriceYear: 144,
            workPrice: 29.5,
            contractMonths: 12,
            priceGuaranteeMonths: 12,
            eco: true,
          },
        ],
      },
      3500,
    );

    expect(tariffs).toHaveLength(1);
    expect(tariffs[0]).toMatchObject({
      providerName: 'Tarifwerk',
      tariffName: 'Fix 12',
      annualCost: 1188,
      basePriceMonthly: 12,
      workPriceCt: 29.5,
      eco: true,
    });
  });

  it('returns a non-live response when no provider is configured', async () => {
    const result = await searchStromTariffs(
      {
        postcode: '40210',
        annualConsumption: 3500,
        ecoOnly: false,
        bonusOnly: false,
      },
      {},
      vi.fn(),
    );

    expect(result.status).toBe('non_live');
    expect(result.tariffs).toEqual([]);
    expect(result.configured).toBe(false);
  });

  it('returns an error response when the provider request fails', async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error('network failed'));

    const result = await searchStromTariffs(
      {
        postcode: '40210',
        annualConsumption: 3500,
        ecoOnly: false,
        bonusOnly: false,
      },
      {
        STROM_TARIFF_API_BASE_URL: 'https://provider.example',
        STROM_TARIFF_API_PATH: '/rates',
      },
      fetchMock,
    );

    expect(result.status).toBe('error');
    expect(result.tariffs).toEqual([]);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
