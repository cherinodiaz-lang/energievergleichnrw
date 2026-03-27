import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import VerivoxCalculatorEmbed from '@/components/VerivoxCalculatorEmbed';

describe('VerivoxCalculatorEmbed', () => {
  it('injects the Verivox container, loader script and tracking pixel exactly once', () => {
    render(
      <VerivoxCalculatorEmbed
        title="Live-Stromtarife vergleichen"
        description="Direkter Verivox-Rechner fuer aktuelle Tarife."
        target="Energie_Strom_Privat_Rechner"
        wmid="104"
        campaignId="stromvergleich_nrw"
        trackingProductId="93"
      />,
    );

    expect(screen.getByText(/live-stromtarife vergleichen/i)).toBeInTheDocument();

    const slot = screen.getByTestId('verivox-calculator-slot');
    const queries = within(slot);

    const container = queries.getByText('', { selector: '#vxcp-container' });
    expect(container).toHaveAttribute('data-target', 'Energie_Strom_Privat_Rechner');
    expect(container).toHaveAttribute('data-wmid', '104');
    expect(container).toHaveAttribute('data-partner-id', '6746');
    expect(container).toHaveAttribute('data-sub-partner-id', 'website');
    expect(container).toHaveAttribute('data-campaign-id', 'stromvergleich_nrw');

    const loader = slot.querySelector('script[data-verivox-loader="true"]');
    expect(loader).not.toBeNull();
    expect(loader).toHaveAttribute('src', 'https://partner.vxcp.de/_js/helper/vxcp_qualityClickLoader.js');

    const trackingPixel = slot.querySelector('img.verivox-tracking-pixel');
    expect(trackingPixel).not.toBeNull();
    expect(trackingPixel).toHaveAttribute(
      'src',
      'https://partner.verivox.de/go.cgi?pid=6746&wmid=104&cpid=1&prid=93&subid=&view=1',
    );
    expect(slot.querySelectorAll('script[data-verivox-loader="true"]')).toHaveLength(1);
  });
});
