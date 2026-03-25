import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/services/form-submission', () => ({
  trackCTAClick: vi.fn(),
}));

import Header from '@/components/Header';

function renderHeader(initialPath = '/') {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Header />
    </MemoryRouter>,
  );
}

describe('Header mobile menu', () => {
  it('opens the mobile menu as an accessible dialog and locks page scroll', async () => {
    renderHeader();

    const trigger = screen.getByRole('button', { name: /menü öffnen/i });
    fireEvent.click(trigger);

    const dialog = await screen.findByRole('dialog', { name: /navigation/i });
    const closeButton = within(dialog).getByRole('button', { name: /navigation schließen/i });

    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(screen.getByTestId('mobile-menu-overlay')).toBeInTheDocument();
    expect(document.body).toHaveStyle({ overflow: 'hidden' });
    expect(document.documentElement).toHaveStyle({ overflow: 'hidden' });

    await waitFor(() => {
      expect(closeButton).toHaveFocus();
    });
  });

  it('closes the mobile menu on Escape and returns focus to the trigger', async () => {
    renderHeader();

    const trigger = screen.getByRole('button', { name: /menü öffnen/i });
    fireEvent.click(trigger);

    await screen.findByRole('dialog', { name: /navigation/i });
    fireEvent.keyDown(document, { key: 'Escape' });

    await waitFor(() => {
      expect(screen.queryByRole('dialog', { name: /navigation/i })).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(trigger).toHaveFocus();
    });

    expect(document.body.style.overflow).toBe('');
    expect(document.documentElement.style.overflow).toBe('');
  });

  it('traps keyboard focus inside the mobile menu dialog', async () => {
    renderHeader();

    fireEvent.click(screen.getByRole('button', { name: /menü öffnen/i }));

    const dialog = await screen.findByRole('dialog', { name: /navigation/i });
    const closeButton = within(dialog).getByRole('button', { name: /navigation schließen/i });
    const ctaButton = within(dialog).getByRole('button', { name: /kostenlos vergleichen/i });

    await waitFor(() => {
      expect(closeButton).toHaveFocus();
    });

    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
    expect(ctaButton).toHaveFocus();

    fireEvent.keyDown(document, { key: 'Tab' });
    expect(closeButton).toHaveFocus();
  });
});
