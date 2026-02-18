import type { ReactNode } from "react";

export type RouteKey =
  | "home"
  | "stromvergleich"
  | "gasvergleich"
  | "photovoltaik"
  | "gewerbestrom"
  | "gewerbegas"
  | "ratgeberHub"
  | "ratgeberStrom"
  | "ratgeberGas"
  | "ratgeberGewerbe"
  | "ratgeberPhotovoltaik"
  | "ratgeberWechselwissen"
  | "kontakt"
  | "impressum"
  | "datenschutz"
  | "agb"
  | "widerruf"
  | "sitemap"
  | "faq"
  | "about"
  // Legacy uppercase variants (for backward compatibility with existing code)
  | "STROMVERGLEICH_NRW"
  | "GASVERGLEICH_NRW"
  | "PHOTOVOLTAIK_NRW"
  | "KONTAKT"
  | "IMPRESSUM"
  | "DATENSCHUTZ";

/**
 * Zentrale Pfade (keine hardcodierten Strings mehr in Header/Footer/Buttons/CTAs).
 * Domain bleibt vorerst energievergleich.shop (Routing-Pfade sind davon unabhängig).
 */
export const ROUTES: Record<RouteKey, string> = {
  home: "/",
  stromvergleich: "/stromvergleich-nrw",
  gasvergleich: "/gasvergleich-nrw",
  photovoltaik: "/photovoltaik-nrw",
  gewerbestrom: "/gewerbestrom",
  gewerbegas: "/gewerbegas",
  ratgeberHub: "/ratgeber",
  ratgeberStrom: "/ratgeber/strom",
  ratgeberGas: "/ratgeber/gas",
  ratgeberGewerbe: "/ratgeber/gewerbe",
  ratgeberPhotovoltaik: "/ratgeber/photovoltaik",
  ratgeberWechselwissen: "/ratgeber/wechselwissen",
  kontakt: "/kontakt",
  impressum: "/impressum",
  datenschutz: "/datenschutz",
  agb: "/agb",
  widerruf: "/widerruf",
  sitemap: "/sitemap",
  faq: "/faq",
  about: "/about",
  // Legacy uppercase variants (for backward compatibility)
  STROMVERGLEICH_NRW: "/stromvergleich-nrw",
  GASVERGLEICH_NRW: "/gasvergleich-nrw",
  PHOTOVOLTAIK_NRW: "/photovoltaik-nrw",
  KONTAKT: "/kontakt",
  IMPRESSUM: "/impressum",
  DATENSCHUTZ: "/datenschutz",
};

export type NavItem = {
  key: string;
  label: string;
  to: string;
  description?: string;
  icon?: ReactNode;
  submenu?: NavItem[];
};

/**
 * Hauptnavigation (Header).
 * Exakte Reihenfolge gemäß Spezifikation.
 */
export const NAV_MAIN: NavItem[] = [
  { key: "stromvergleich", label: "Strom", to: ROUTES.stromvergleich },
  { key: "gasvergleich", label: "Gas", to: ROUTES.gasvergleich },
  { key: "photovoltaik", label: "Photovoltaik", to: ROUTES.photovoltaik },
  {
    key: "gewerbe",
    label: "Gewerbe",
    to: ROUTES.gewerbestrom,
    submenu: [
      { key: "gewerbestrom", label: "Gewerbestrom", to: ROUTES.gewerbestrom },
      { key: "gewerbegas", label: "Gewerbegas", to: ROUTES.gewerbegas },
    ],
  },
  {
    key: "ratgeber",
    label: "Ratgeber",
    to: ROUTES.ratgeberHub,
    submenu: [
      { key: "ratgeberStrom", label: "Strom-Ratgeber", to: ROUTES.ratgeberStrom },
      { key: "ratgeberGas", label: "Gas-Ratgeber", to: ROUTES.ratgeberGas },
      { key: "ratgeberPhotovoltaik", label: "Photovoltaik-Ratgeber", to: ROUTES.ratgeberPhotovoltaik },
      { key: "ratgeberWechselwissen", label: "Spartipps", to: ROUTES.ratgeberWechselwissen },
    ],
  },
  { key: "kontakt", label: "Kontakt", to: ROUTES.kontakt },
];

/**
 * Sekundärnavigation (z.B. Footer Schnellzugriff oder Ratgeber-Kategorien).
 */
export const NAV_SECONDARY: NavItem[] = [
  { key: "ratgeberHub", label: "Ratgeber-Übersicht", to: ROUTES.ratgeberHub },
  { key: "ratgeberStrom", label: "Ratgeber Strom", to: ROUTES.ratgeberStrom },
  { key: "ratgeberGas", label: "Ratgeber Gas", to: ROUTES.ratgeberGas },
  { key: "ratgeberGewerbe", label: "Ratgeber Gewerbe", to: ROUTES.ratgeberGewerbe },
  { key: "ratgeberPhotovoltaik", label: "Ratgeber Photovoltaik", to: ROUTES.ratgeberPhotovoltaik },
  { key: "ratgeberWechselwissen", label: "Ratgeber Wechselwissen", to: ROUTES.ratgeberWechselwissen },
];

/**
 * Rechtliches (Footer - Spalte 1).
 */
export const NAV_LEGAL: NavItem[] = [
  { key: "about", label: "Über uns", to: ROUTES.about },
  { key: "impressum", label: "Impressum", to: ROUTES.impressum },
  { key: "datenschutz", label: "Datenschutz", to: ROUTES.datenschutz },
  { key: "agb", label: "AGB", to: ROUTES.agb },
  { key: "widerruf", label: "Widerrufsbelehrung", to: ROUTES.widerruf },
];

/**
 * Service-Links (Footer - Spalte 2).
 */
export const NAV_SERVICE: NavItem[] = [
  { key: "sitemap", label: "Sitemap", to: ROUTES.sitemap },
  { key: "methodik", label: "So vergleichen wir", to: "/methodik" },
  { key: "faq", label: "FAQ", to: ROUTES.faq },
  { key: "kontakt", label: "Kontakt", to: ROUTES.kontakt },
];
