#!/usr/bin/env node
// generate-city-pages.js
// Generates city landing pages for NRW from the city data and HTML template.
// Usage: node scripts/generate-city-pages.js [--output ./content/cities]

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');

const CITIES_DATA = path.join(PROJECT_ROOT, 'data', 'nrw-cities.json');
const TEMPLATE_FILE = path.join(PROJECT_ROOT, 'templates', 'city-template.html');
const OUTPUT_DIR = process.argv.includes('--output')
  ? path.resolve(process.argv[process.argv.indexOf('--output') + 1])
  : path.join(PROJECT_ROOT, 'content', 'cities');

const YEAR = new Date().getFullYear();
const CTA_BASE_URL = 'https://www.check24.de/strom/?partnerid=YOUR_PARTNER_ID&zip=';

// Load cities and template
let cities;
let template;

try {
  cities = JSON.parse(fs.readFileSync(CITIES_DATA, 'utf8'));
} catch (err) {
  console.error('✗ Failed to load city data:', err.message);
  process.exit(1);
}

try {
  template = fs.readFileSync(TEMPLATE_FILE, 'utf8');
} catch (err) {
  console.error('✗ Failed to load template:', err.message);
  process.exit(1);
}

// Ensure output directory exists
try {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
} catch (err) {
  console.error('✗ Failed to create output directory:', err.message);
  process.exit(1);
}

let generated = 0;
let failed = 0;

for (const city of cities) {
  const { slug, name, zip, region } = city;

  try {
    // Build FAQ schema and HTML for this city
    const { schemaJson, faqHtml } = buildFaq(name, zip);

    const html = template
      .replaceAll('{{CITY_NAME}}', name)
      .replaceAll('{{CITY_SLUG}}', slug)
      .replaceAll('{{CITY_ZIP}}', zip)
      .replaceAll('{{CITY_REGION}}', region)
      .replaceAll('{{YEAR}}', String(YEAR))
      .replaceAll('{{SAVINGS_ESTIMATE}}', '300')
      .replaceAll('{{CTA_URL}}', `${CTA_BASE_URL}${zip}`)
      .replaceAll('{{FAQ_SCHEMA}}', schemaJson)
      .replaceAll('{{FAQ_HTML}}', faqHtml);

    const outputFile = path.join(OUTPUT_DIR, `stromvergleich-${slug}.html`);
    fs.writeFileSync(outputFile, html, 'utf8');

    console.log(`✓ ${name}`);
    generated++;
  } catch (err) {
    console.error(`✗ ${name}: ${err.message}`);
    failed++;
  }
}

console.log(`\n─── Summary ───────────────────────────`);
console.log(`✓ Generated : ${generated} pages`);
if (failed > 0) {
  console.log(`✗ Failed    : ${failed} pages`);
}
console.log(`📁 Output   : ${OUTPUT_DIR}`);

// Build city-specific FAQ structured data and HTML markup
function buildFaq(cityName, cityZip) {
  const faqs = [
    {
      question: `Wie wechsle ich meinen Stromanbieter in ${cityName}?`,
      answer: `Sie vergleichen Tarife für ${cityName} (PLZ ${cityZip}), wählen das günstigste Angebot und beantragen den Wechsel online. Der neue Anbieter übernimmt die Kündigung beim alten Anbieter.`,
    },
    {
      question: `Wie lange dauert ein Stromanbieterwechsel in ${cityName}?`,
      answer: `Ein Wechsel dauert in der Regel 4–6 Wochen. Sie müssen dabei nicht ohne Strom sein – die Versorgung ist durchgehend sichergestellt.`,
    },
    {
      question: `Gibt es in ${cityName} einen Grundversorger?`,
      answer: `Ja. Jede Stadt in NRW hat einen gesetzlichen Grundversorger, dessen Tarife jedoch oft teurer sind als Angebote alternativer Anbieter.`,
    },
    {
      question: `Kann ich in ${cityName} auch Ökostrom beziehen?`,
      answer: `Ja. Viele Stromanbieter bieten auch in ${cityName} zertifizierten Ökostrom an. Beim Vergleich können Sie gezielt nach Ökostromtarifen filtern.`,
    },
  ];

  const schemaJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  }, null, 2);

  const faqHtml = faqs
    .map(
      ({ question, answer }) =>
        `<details>\n  <summary><strong>${escapeHtml(question)}</strong></summary>\n  <p>${escapeHtml(answer)}</p>\n</details>`,
    )
    .join('\n');

  return { schemaJson, faqHtml };
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
