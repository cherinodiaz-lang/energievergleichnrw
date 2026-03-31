import { describe, expect, it, vi } from 'vitest';
import {
  normalizeProviderGasTariffs,
  searchGasTariffs,
  validateGasTariffInput,
} from '@/lib/gas-tariff-provider';

describe('gas-tariff-provider', () => {
  it('validates postcode and annual consumption', () => {
    const result = validateGasTariffInput({
      postcode: '123',
      annualConsumption: '0',
    });

    expect(result.valid).toBe(false);
    expect(result.errors.postcode).toBeTruthy();
    expect(result.errors.annualConsumption).toBeTruthy();
  });

  it('accepts a valid postcode and consumption', () => {
    const result = validateGasTariffInput({
      postcode: '40210',
      annualConsumption: '15000',
      bioGasOnly: false,
      bonusOnly: false,
    });

    expect(result.valid).toBe(true);
    expect(result.data?.postcode).toBe('40210');
    expect(result.data?.annualConsumption).toBe(15000);
  });

  it('normalizes provider gas tariffs to the internal result shape', () => {
    const tariffs = normalizeProviderGasTariffs(
      {
        results: [
          {
            providerName: 'Gaswerk',
            tariffName: 'GasFix 12',
            totalPrice: 1440,
            basePriceYear: 120,
            workPrice: 9.5,
            contractMonths: 12,
            priceGuaranteeMonths: 12,
            bioGas: false,
          },
        ],
      },
      15000,
    );

    expect(tariffs).toHaveLength(1);
    expect(tariffs[0]).toMatchObject({
      providerName: 'Gaswerk',
      tariffName: 'GasFix 12',
      annualCost: 1440,
      basePriceMonthly: 10,
      workPriceCt: 9.5,
      bioGas: false,
    });
  });

  it('returns transparent model results when no provider is configured', async () => {
    const result = await searchGasTariffs(
      {
        postcode: '40210',
        annualConsumption: 15000,
        bioGasOnly: false,
        bonusOnly: false,
      },
      {},
      vi.fn(),
    );

    expect(result.status).toBe('success');
    expect(result.tariffs.length).toBeGreaterThan(0);
    expect(result.configured).toBe(false);
    expect(result.source).toBe('transparent_model');
  });

  it('returns transparent model results sorted by annual cost ascending', async () => {
    const result = await searchGasTariffs(
      {
        postcode: '50667',
        annualConsumption: 20000,
        bioGasOnly: false,
        bonusOnly: false,
      },
      {},
      vi.fn(),
    );

    expect(result.status).toBe('success');
    for (let i = 1; i < result.tariffs.length; i++) {
      expect(result.tariffs[i].annualCost).toBeGreaterThanOrEqual(result.tariffs[i - 1].annualCost);
    }
  });

  it('applies biogas markup in transparent model', async () => {
    const [plain, bio] = await Promise.all([
      searchGasTariffs({ postcode: '40210', annualConsumption: 10000, bioGasOnly: false, bonusOnly: false }, {}, vi.fn()),
      searchGasTariffs({ postcode: '40210', annualConsumption: 10000, bioGasOnly: true, bonusOnly: false }, {}, vi.fn()),
    ]);

    expect(bio.tariffs[1].workPriceCt).toBeGreaterThan(plain.tariffs[1].workPriceCt);
  });

  it('returns an error response when the provider request fails', async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error('network failed'));

    const result = await searchGasTariffs(
      {
        postcode: '40210',
        annualConsumption: 15000,
        bioGasOnly: false,
        bonusOnly: false,
      },
      {
        GAS_TARIFF_API_BASE_URL: 'https://provider.example',
        GAS_TARIFF_API_PATH: '/rates',
      },
      fetchMock,
    );

    expect(result.status).toBe('error');
    expect(result.tariffs).toEqual([]);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('returns an error response when the provider returns a non-ok status', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: false });

    const result = await searchGasTariffs(
      {
        postcode: '40210',
        annualConsumption: 15000,
        bioGasOnly: false,
        bonusOnly: false,
      },
      {
        GAS_TARIFF_API_BASE_URL: 'https://provider.example',
      },
      fetchMock,
    );

    expect(result.status).toBe('error');
    expect(result.configured).toBe(true);
    expect(result.source).toBe('provider_api');
  });

  it('returns empty response when provider returns no normalizable tariffs', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ results: [] }),
    });

    const result = await searchGasTariffs(
      {
        postcode: '40210',
        annualConsumption: 15000,
        bioGasOnly: false,
        bonusOnly: false,
      },
      {
        GAS_TARIFF_API_BASE_URL: 'https://provider.example',
      },
      fetchMock,
    );

    expect(result.status).toBe('empty');
    expect(result.tariffs).toEqual([]);
  });
});
