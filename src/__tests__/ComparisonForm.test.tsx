import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ComparisonForm } from '@/components/forms/ComparisonForm';
import * as analytics from '@/services/analytics';

vi.mock('@/services/analytics', () => ({
  analytics: {
    track: vi.fn(),
    trackFormSubmit: vi.fn(),
    trackCtaClick: vi.fn(),
    trackError: vi.fn(),
  },
}));

global.fetch = vi.fn();

describe('ComparisonForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  it('renders form with all fields', () => {
    render(<ComparisonForm />);
    
    expect(screen.getByLabelText(/postleitzahl/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/jahresverbrauch/i)).toBeInTheDocument();
    expect(screen.getByText(/jetzt kostenlos vergleichen/i)).toBeInTheDocument();
  });
  
  it('validates ZIP code format', async () => {
    render(<ComparisonForm />);
    
    const zipInput = screen.getByLabelText(/postleitzahl/i);
    fireEvent.change(zipInput, { target: { value: '123' } });
    fireEvent.blur(zipInput);
    
    await waitFor(() => {
      expect(screen.getByText(/plz muss 5 ziffern haben/i)).toBeInTheDocument();
    });
  });
  
  it('validates consumption range', async () => {
    render(<ComparisonForm />);
    
    const consumptionInput = screen.getByLabelText(/jahresverbrauch/i);
    fireEvent.change(consumptionInput, { target: { value: '100' } });
    fireEvent.blur(consumptionInput);
    
    await waitFor(() => {
      expect(screen.getByText(/mindestens 500 kwh/i)).toBeInTheDocument();
    });
  });
  
  it('submits form with valid data', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });
    
    render(<ComparisonForm city="Cologne" />);
    
    fireEvent.change(screen.getByLabelText(/postleitzahl/i), {
      target: { value: '50667' },
    });
    fireEvent.change(screen.getByLabelText(/jahresverbrauch/i), {
      target: { value: '3500' },
    });
    
    fireEvent.click(screen.getByText(/jetzt kostenlos vergleichen/i));
    
    await waitFor(() => {
      expect(analytics.analytics.trackFormSubmit).toHaveBeenCalledWith(
        'comparison',
        true,
        'Cologne'
      );
    });
  });
  
  it('tracks analytics events', async () => {
    render(<ComparisonForm city="Cologne" />);
    
    fireEvent.click(screen.getByText(/jetzt kostenlos vergleichen/i));
    
    await waitFor(() => {
      expect(analytics.analytics.trackCtaClick).toHaveBeenCalledWith(
        'Jetzt vergleichen',
        'comparison_form'
      );
    });
  });
  
  it('handles submission errors', async () => {
    (global.fetch as any).mockRejectedValueOnce(new Error('Network error'));
    
    render(<ComparisonForm />);
    
    fireEvent.change(screen.getByLabelText(/postleitzahl/i), {
      target: { value: '50667' },
    });
    fireEvent.change(screen.getByLabelText(/jahresverbrauch/i), {
      target: { value: '3500' },
    });
    
    fireEvent.click(screen.getByText(/jetzt kostenlos vergleichen/i));
    
    await waitFor(() => {
      expect(screen.getByText(/fehler beim senden/i)).toBeInTheDocument();
    });
    
    expect(analytics.analytics.trackFormSubmit).toHaveBeenCalledWith(
      'comparison',
      false,
      undefined
    );
  });
  
  it('calculates estimated savings', async () => {
    render(<ComparisonForm />);
    
    fireEvent.change(screen.getByLabelText(/jahresverbrauch/i), {
      target: { value: '3500' },
    });
    
    await waitFor(() => {
      expect(screen.getByText(/sparpotenzial: bis zu 525€/i)).toBeInTheDocument();
    });
  });
});