import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { StromvergleichExampleState } from '@/components/pages/StromvergleichNrwPage';

function renderExampleState(props: {
  postcode: string;
  annualConsumption: number;
  usedDefaultConsumption: boolean;
}) {
  return render(
    <MemoryRouter>
      <StromvergleichExampleState {...props} />
    </MemoryRouter>,
  );
}

describe('StromvergleichExampleState', () => {
  it('renders an honest example mode state without fake tariffs', () => {
    renderExampleState({
      postcode: '40210',
      annualConsumption: 4200,
      usedDefaultConsumption: false,
    });

    expect(screen.getByText(/beispielmodus/i)).toBeInTheDocument();
    expect(screen.getByText(/keine live-tarifquelle aktiv/i)).toBeInTheDocument();
    expect(screen.getByText('40210')).toBeInTheDocument();
    expect(screen.getByText(/4\.200 kwh\/jahr/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /kontakt aufnehmen/i })).toHaveAttribute('href', '/kontakt');
    expect(screen.queryByText(/tarif option a/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/angebot anfordern/i)).not.toBeInTheDocument();
  });

  it('discloses when the default consumption is used for the example state', () => {
    renderExampleState({
      postcode: '44135',
      annualConsumption: 3500,
      usedDefaultConsumption: true,
    });

    expect(
      screen.getByText(/für diese beispielansicht verwenden wir 3\.500 kwh\/jahr, weil kein jahresverbrauch eingetragen wurde/i),
    ).toBeInTheDocument();
  });
});
