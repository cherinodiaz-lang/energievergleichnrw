import { useMemo } from "react";
import { trackEvent } from "@/services/ga4-tracking";

// ─── Typen ───────────────────────────────────────────────────────────────────

type Product = "strom" | "gas" | "stromgas";

interface AffiliateCtaBannerProps {
  citySlug: string;        // z.B. "koeln", "duesseldorf", "bochum"
  product: Product;        // "strom" | "gas" | "stromgas"
  cityName?: string;       // z.B. "Köln" (für Anzeigetext)
  className?: string;
}

// ─── Konstanten ──────────────────────────────────────────────────────────────

const PARTNER_ID = "6746";

const PRODUCT_CONFIG: Record<Product, { path: string; label: string; labelShort: string }> = {
  strom: {
    path: "strom",
    label: "Stromanbieter vergleichen",
    labelShort: "Jetzt Strom vergleichen",
  },
  gas: {
    path: "gas",
    label: "Gasanbieter vergleichen",
    labelShort: "Jetzt Gas vergleichen",
  },
  stromgas: {
    path: "strom-gas",
    label: "Strom & Gas vergleichen",
    labelShort: "Jetzt Strom & Gas vergleichen",
  },
};

// ─── URL-Generator ───────────────────────────────────────────────────────────

export function buildVerivoxUrl(citySlug: string, product: Product): string {
  const { path } = PRODUCT_CONFIG[product];
  const subId = `ev_${citySlug}_${product}`;
  const url = new URL(`https://www.verivox.de/${path}/`);
  url.searchParams.set("vx_source", PARTNER_ID);
  url.searchParams.set("subid", subId);
  return url.toString();
}

export function buildCampaignId(citySlug: string, product: Product): string {
  return `ev_${citySlug}_${product}`;
}

// ─── Komponente ──────────────────────────────────────────────────────────────

export default function AffiliateCtaBanner({
  citySlug,
  product,
  cityName,
  className = "",
}: AffiliateCtaBannerProps) {
  const url = useMemo(() => buildVerivoxUrl(citySlug, product), [citySlug, product]);
  const { label, labelShort } = PRODUCT_CONFIG[product];

  const locationText = cityName ? ` in ${cityName}` : " in NRW";
  const subId = `ev_${citySlug}_${product}`;

  const handleClick = () => {
    trackEvent("affiliate_click", {
      partner: "verivox",
      product,
      city: citySlug,
      subid: subId,
    });
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="inline-flex items-center justify-between gap-3 rounded-xl bg-primary px-5 py-3.5 font-semibold text-white shadow-md transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        data-subid={subId}
        data-partner={PARTNER_ID}
        onClick={handleClick}
      >
        <span className="hidden sm:inline">{label}{locationText}</span>
        <span className="sm:hidden">{labelShort}</span>
        <span aria-hidden="true">→</span>
      </a>

      <p className="text-xs text-slate-500">
        Kostenlos &amp; unverbindlich. Partnerlink zu Verivox.
      </p>
    </div>
  );
}
