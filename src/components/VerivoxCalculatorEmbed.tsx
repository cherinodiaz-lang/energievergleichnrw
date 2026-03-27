import { useEffect, useRef } from 'react';

type VerivoxCalculatorEmbedProps = {
  badge?: string;
  title: string;
  description: string;
  target: string;
  wmid: string;
  campaignId: string;
  trackingProductId: string;
};

const VERIVOX_PARTNER_ID = '6746';
const VERIVOX_SUB_PARTNER_ID = 'website';
const VERIVOX_LOADER_SRC = 'https://partner.vxcp.de/_js/helper/vxcp_qualityClickLoader.js';

function createTrackingPixel(wmid: string, trackingProductId: string): HTMLImageElement {
  const trackingPixel = document.createElement('img');
  trackingPixel.src = `https://partner.verivox.de/go.cgi?pid=${VERIVOX_PARTNER_ID}&wmid=${wmid}&cpid=1&prid=${trackingProductId}&subid=&view=1`;
  trackingPixel.alt = '';
  trackingPixel.width = 1;
  trackingPixel.height = 1;
  trackingPixel.className = 'verivox-tracking-pixel';
  trackingPixel.setAttribute('aria-hidden', 'true');
  return trackingPixel;
}

export default function VerivoxCalculatorEmbed({
  badge = 'Live-Tarifvergleich',
  title,
  description,
  target,
  wmid,
  campaignId,
  trackingProductId,
}: VerivoxCalculatorEmbedProps) {
  const slotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const slot = slotRef.current;
    if (!slot || typeof document === 'undefined') {
      return;
    }

    slot.replaceChildren();

    const container = document.createElement('div');
    container.id = 'vxcp-container';
    container.setAttribute('data-target', target);
    container.setAttribute('data-wmid', wmid);
    container.setAttribute('data-partner-id', VERIVOX_PARTNER_ID);
    container.setAttribute('data-sub-partner-id', VERIVOX_SUB_PARTNER_ID);
    container.setAttribute('data-campaign-id', campaignId);
    container.setAttribute('data-color', '0');
    container.setAttribute('data-parameters', '');

    const loaderScript = document.createElement('script');
    loaderScript.async = true;
    loaderScript.defer = true;
    loaderScript.src = VERIVOX_LOADER_SRC;
    loaderScript.setAttribute('data-verivox-loader', 'true');

    slot.append(container, loaderScript, createTrackingPixel(wmid, trackingProductId));

    return () => {
      slot.replaceChildren();
    };
  }, [campaignId, target, trackingProductId, wmid]);

  return (
    <div className="verivox-calculator-shell rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-7 lg:p-8">
      <div className="space-y-3">
        <p className="font-paragraph text-xs font-semibold uppercase tracking-[0.24em] text-secondary">
          {badge}
        </p>
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-primary sm:text-3xl">
          {title}
        </h2>
        <p className="max-w-3xl font-paragraph text-sm leading-7 text-slate-600 sm:text-base">
          {description}
        </p>
      </div>

      <div className="mt-6 rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-2 shadow-inner sm:p-4">
        <div
          ref={slotRef}
          data-testid="verivox-calculator-slot"
          className="verivox-calculator-slot min-w-0 overflow-hidden rounded-[1.25rem] bg-white"
        />
      </div>

      <p className="mt-4 font-paragraph text-xs text-slate-500">
        Tarifrechner und Tarifdaten werden direkt von Verivox bereitgestellt.
      </p>
    </div>
  );
}
