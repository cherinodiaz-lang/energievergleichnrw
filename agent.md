# energievergleichnrw – Codex Agent Kontext

## Projekt
- **URL:** https://energievergleich.shop
- **Stack:** Astro 6, React, TypeScript strict, Tailwind CSS
- **Hosting:** Wix (Headless) + GitHub Actions CI/CD
- **Ziel:** NRW-Energievergleich – Strom & Gas Tarife vergleichen

## Architektur
- src/pages/ → Astro-Seiten (SSR bevorzugen)
- src/components/ → React-Komponenten (nur wenn interaktiv)
- src/lib/ → Business-Logik, API-Provider
- .github/workflows/ → CI/CD Automation

## Coding Standards
- TypeScript strict: kein `any`, kein `!` non-null assertion
- Astro-Komponenten VOR React-Komponenten bevorzugen
- Alle Texte auf Deutsch
- DSGVO: kein Tracking ohne Cookie-Consent
- Keine hardcodierten Preise (immer API oder Config)

## SEO-Pflichtfelder auf jeder Seite
- <title> (max 60 Zeichen)
- <meta description> (max 160 Zeichen)
- FAQPage Schema.org
- BreadcrumbList Schema.org
- Canonical Tag

## Verboten
- Keine console.log in Produktion
- Keine npm install ohne Begründung
- Keine Änderungen an .env Dateien
- Keine API Keys im Code

## Wichtige Commands
- npm run dev → lokale Entwicklung
- npm run build → Production Build
- npm run test → Tests ausführen
- npm run lhci:collect → Lighthouse Test
