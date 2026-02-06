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
};

/**
 * Hauptnavigation (Header).
 * Du darfst Labels NICHT erfinden – nur diese Struktur bereitstellen.
 * Später ersetzen wir im Header hartcodierte Pfade durch NAV_MAIN.
 */
export const NAV_MAIN: NavItem[] = [
  { key: "stromvergleich", label: "Strom", to: ROUTES.stromvergleich },
  { key: "gasvergleich", label: "Gas", to: ROUTES.gasvergleich },
  { key: "photovoltaik", label: "Photovoltaik", to: ROUTES.photovoltaik },
  { key: "gewerbestrom", label: "Gewerbe", to: ROUTES.gewerbestrom },
  { key: "ratgeber", label: "Ratgeber", to: ROUTES.ratgeberHub },
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
 * Rechtliches (Footer).
 */
export const NAV_LEGAL: NavItem[] = [
  { key: "impressum", label: "Impressum", to: ROUTES.impressum },
  { key: "datenschutz", label: "Datenschutz", to: ROUTES.datenschutz },
];
