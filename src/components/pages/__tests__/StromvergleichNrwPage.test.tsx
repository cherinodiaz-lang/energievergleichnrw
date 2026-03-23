import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import CalculatorForm from '@/components/strom/CalculatorForm';

function renderCalculator() {
  return render(
    <MemoryRouter>
      <CalculatorForm />
    </MemoryRouter>,
  );
}

describe('StromTarifCalculator', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('shows validation errors for invalid input', async () => {
    renderCalculator();

    fireEvent.click(screen.getByRole('button', { name: /tarife vergleichen/i }));

    expect(await screen.findByText(/bitte pruefen sie die markierten eingaben/i)).toBeInTheDocument();
    expect(screen.getAllByText(/gueltige deutsche postleitzahl/i).length).toBeGreaterThan(0);
  });

  it('renders normalized results for valid provider data', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      status: 200,
      json: async () => ({
        status: 'success',
        message: '1 Stromtarif gefunden.',
        configured: true,
        tariffs: [
          {
            providerName: 'Tarifwerk',
            tariffName: 'Fix 12',
            annualCost: 1188,
            monthlyCost: 99,
            basePriceMonthly: 12,
            workPriceCt: 29.5,
            contractMonths: 12,
            priceGuaranteeMonths: 12,
            eco: true,
            bonus: 120,
            ctaUrl: 'https://anbieter.example/fix-12',
          },
        ],
      }),
    }) as typeof fetch;

    renderCalculator();

    fireEvent.change(screen.getByLabelText(/postleitzahl/i), { target: { value: '40210' } });
    fireEvent.change(screen.getByLabelText(/jahresverbrauch/i), { target: { value: '3500' } });
    fireEvent.click(screen.getByRole('button', { name: /tarife vergleichen/i }));

    expect(await screen.findByText('Tarifwerk')).toBeInTheDocument();
    expect(screen.getByText('Fix 12')).toBeInTheDocument();
    expect(screen.getByText(/1 Stromtarif gefunden/i)).toBeInTheDocument();
    expect(screen.getByText(/Jahrespreis/i)).toBeInTheDocument();
  });

  it('renders transparent model results when no live provider is configured', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      status: 200,
      json: async () => ({
        status: 'success',
        source: 'transparent_model',
        message: 'Es werden transparente Stromkosten-Szenarien auf Basis Ihrer Eingaben berechnet, weil aktuell keine Live-Tarifquelle aktiv ist.',
        configured: false,
        tariffs: [
          {
            providerName: 'Transparente Modellrechnung',
            tariffName: 'Kostenkorridor Ausgewogen',
            annualCost: 1234,
            monthlyCost: 102.83,
            basePriceMonthly: 12,
            workPriceCt: 30.6,
            contractMonths: 12,
            priceGuaranteeMonths: 12,
            eco: false,
            bonus: null,
            ctaUrl: null,
            notes: ['Transparente Modellrechnung'],
          },
        ],
      }),
    }) as typeof fetch;

    renderCalculator();

    fireEvent.change(screen.getByLabelText(/postleitzahl/i), { target: { value: '40210' } });
    fireEvent.change(screen.getByLabelText(/jahresverbrauch/i), { target: { value: '3500' } });
    fireEvent.click(screen.getByRole('button', { name: /tarife vergleichen/i }));

    expect(await screen.findByText(/Kostenkorridor Ausgewogen/i)).toBeInTheDocument();
    expect(screen.getByText(/transparente stromkosten-szenarien/i)).toBeInTheDocument();
    expect(screen.queryByText(/tarif option/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/gruenerstrom nrw/i)).not.toBeInTheDocument();
  });

  it('renders the error state for provider failures', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      status: 502,
      json: async () => ({
        status: 'error',
        message: 'Die Tarifdaten konnten gerade nicht geladen werden.',
        configured: true,
        tariffs: [],
      }),
    }) as typeof fetch;

    renderCalculator();

    fireEvent.change(screen.getByLabelText(/postleitzahl/i), { target: { value: '40210' } });
    fireEvent.change(screen.getByLabelText(/jahresverbrauch/i), { target: { value: '3500' } });
    fireEvent.click(screen.getByRole('button', { name: /tarife vergleichen/i }));

    expect(await screen.findByText(/die tarifdaten konnten gerade nicht geladen werden/i)).toBeInTheDocument();
  });

  it('does not render fake tariffs before any successful lookup', async () => {
    renderCalculator();

    await waitFor(() => {
      expect(screen.queryByText(/tarif option/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/gruenerstrom nrw/i)).not.toBeInTheDocument();
    });
  });
});
