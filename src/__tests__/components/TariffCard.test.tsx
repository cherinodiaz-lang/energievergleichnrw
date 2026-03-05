/**
 * Example Test für TariffCard Component
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Mock Component (wird später durch echten Component ersetzt)
function TariffCard({ title, price, features }: any) {
  return (
    <div data-testid="tariff-card">
      <h3>{title}</h3>
      <p className="price">{price}€/Monat</p>
      <ul>
        {features.map((feature: string, idx: number) => (
          <li key={idx}>{feature}</li>
        ))}
      </ul>
      <button>Jetzt wechseln</button>
    </div>
  );
}

describe('TariffCard', () => {
  const mockTariff = {
    title: 'Ökostrom Plus',
    price: 45.99,
    features: ['100% Ökostrom', '12 Monate Preisgarantie', 'Keine Vorkasse']
  };

  it('renders tariff information correctly', () => {
    render(<TariffCard {...mockTariff} />);

    expect(screen.getByText('Ökostrom Plus')).toBeInTheDocument();
    expect(screen.getByText('45.99€/Monat')).toBeInTheDocument();
    expect(screen.getByText('100% Ökostrom')).toBeInTheDocument();
  });

  it('displays all features', () => {
    render(<TariffCard {...mockTariff} />);

    mockTariff.features.forEach((feature) => {
      expect(screen.getByText(feature)).toBeInTheDocument();
    });
  });

  it('has a call-to-action button', async () => {
    const user = userEvent.setup();
    render(<TariffCard {...mockTariff} />);

    const button = screen.getByRole('button', { name: /jetzt wechseln/i });
    expect(button).toBeInTheDocument();

    await user.click(button);
    // Add assertions for button click behavior
  });

  it('matches snapshot', () => {
    const { container } = render(<TariffCard {...mockTariff} />);
    expect(container).toMatchSnapshot();
  });
});
