import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import GasCalculatorForm from '@/components/gas/GasCalculatorForm';
import * as gasTariffProvider from '@/lib/gas-tariff-provider';

function renderCalculator() {
  return render(
    <MemoryRouter>
      <GasCalculatorForm />
    </MemoryRouter>,
  );
}

describe('GasCalculatorForm', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows validation errors for invalid input', async () => {
    renderCalculator();

    fireEvent.click(screen.getByRole('button', { name: /tarife vergleichen/i }));

    expect(await screen.findByText(/bitte pruefen sie die markierten eingaben/i)).toBeInTheDocument();
    expect(screen.getAllByText(/gueltige deutsche postleitzahl/i).length).toBeGreaterThan(0);
  });

  it('renders normalized results for valid provider data', async () => {
    vi.spyOn(gasTariffProvider, 'searchGasTariffs').mockResolvedValue({
      status: 'success',
      message: '1 Gastarif gefunden.',
      source: 'provider_api',
      configured: true,
      tariffs: [
        {
          providerName: 'Gaswerk',
          tariffName: 'GasFix 12',
          annualCost: 1440,
          monthlyCost: 120,
          basePriceMonthly: 10,
          workPriceCt: 9.5,
          contractMonths: 12,
          priceGuaranteeMonths: 12,
          bioGas: false,
          bonus: null,
          ctaUrl: 'https://anbieter.example/gas-fix-12',
        },
      ],
    });

    renderCalculator();

    fireEvent.change(screen.getByLabelText(/postleitzahl/i), { target: { value: '40210' } });
    fireEvent.change(screen.getByLabelText(/jahresverbrauch/i), { target: { value: '15000' } });
    fireEvent.click(screen.getByRole('button', { name: /tarife vergleichen/i }));

    expect(await screen.findByText('Gaswerk')).toBeInTheDocument();
    expect(screen.getByText('GasFix 12')).toBeInTheDocument();
    expect(screen.getByText(/1 Gastarif gefunden/i)).toBeInTheDocument();
    expect(screen.getByText(/Jahrespreis/i)).toBeInTheDocument();
  });

  it('renders transparent model results when no live provider is configured', async () => {
    vi.spyOn(gasTariffProvider, 'searchGasTariffs').mockResolvedValue({
      status: 'success',
      source: 'transparent_model',
      message: 'Es werden transparente Gaskosten-Szenarien auf Basis Ihrer Eingaben berechnet, weil aktuell keine Live-Tarifquelle aktiv ist.',
      configured: false,
      tariffs: [
        {
          providerName: 'Modellrechnung NRW',
          tariffName: 'Gaskorridor Ausgewogen',
          annualCost: 1395,
          monthlyCost: 116.25,
          basePriceMonthly: 10.4,
          workPriceCt: 9.2,
          contractMonths: 12,
          priceGuaranteeMonths: 12,
          bioGas: false,
          bonus: null,
          ctaUrl: null,
          notes: ['Transparente Modellrechnung'],
        },
      ],
    });

    renderCalculator();

    fireEvent.change(screen.getByLabelText(/postleitzahl/i), { target: { value: '40210' } });
    fireEvent.change(screen.getByLabelText(/jahresverbrauch/i), { target: { value: '15000' } });
    fireEvent.click(screen.getByRole('button', { name: /tarife vergleichen/i }));

    expect(await screen.findByText(/Gaskorridor Ausgewogen/i)).toBeInTheDocument();
    expect(screen.getByText(/transparente gaskosten-szenarien/i)).toBeInTheDocument();
  });

  it('renders the error state for provider failures', async () => {
    vi.spyOn(gasTariffProvider, 'searchGasTariffs').mockResolvedValue({
      status: 'error',
      source: 'provider_api',
      message: 'Die Tarifdaten konnten gerade nicht geladen werden.',
      configured: true,
      tariffs: [],
    });

    renderCalculator();

    fireEvent.change(screen.getByLabelText(/postleitzahl/i), { target: { value: '40210' } });
    fireEvent.change(screen.getByLabelText(/jahresverbrauch/i), { target: { value: '15000' } });
    fireEvent.click(screen.getByRole('button', { name: /tarife vergleichen/i }));

    expect(await screen.findByText(/die tarifdaten konnten gerade nicht geladen werden/i)).toBeInTheDocument();
  });

  it('does not render fake tariffs before any successful lookup', async () => {
    renderCalculator();

    await waitFor(() => {
      expect(screen.queryByText(/tarif option/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/gaswerk nrw/i)).not.toBeInTheDocument();
    });
  });
});
