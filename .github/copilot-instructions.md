# energievergleich.nrw · Copilot Instructions

## Project
German energy comparison site for NRW consumers.
~400 city landing pages, affiliate revenue (Check24, Verivox), zero ad budget.

## Stack
Wix CMS + Wix Velo, GA4, GTM, Schema.org FAQPage + Organization

## File Structure
/data/nrw-cities.json
/scripts/generate-city-pages.js
/scripts/generate-faq-schema.js
/styles/tokens.css
/templates/city-template.html

## Code Rules
- ES2022+ only, no jQuery, no frameworks
- Always UTF-8 encoding
- German content, English code/comments
- Always error handling with console.error + fallback
- Log progress: "✓ [Stadt]" per file, summary at end
