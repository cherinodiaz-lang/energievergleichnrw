#!/usr/bin/env node
// generate-faq-schema.js
// Generates Schema.org FAQPage JSON-LD files for each NRW city.
// Usage: node scripts/generate-faq-schema.js [--output ./data/faq-schemas]

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');

const CITIES_DATA = path.join(PROJECT_ROOT, 'data', 'nrw-cities.json');
const OUTPUT_DIR = process.argv.includes('--output')
  ? path.resolve(process.argv[process.argv.indexOf('--output') + 1])
  : path.join(PROJECT_ROOT, 'data', 'faq-schemas');

// Load city data
let cities;
try {
  cities = JSON.parse(fs.readFileSync(CITIES_DATA, 'utf8'));
} catch (err) {
  console.error('✗ Failed to load city data:', err.message);
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
  const { slug, name, zip } = city;

  try {
    const schema = buildFaqSchema(name, zip);
    const outputFile = path.join(OUTPUT_DIR, `${slug}.json`);
    fs.writeFileSync(outputFile, JSON.stringify(schema, null, 2), 'utf8');

    console.log(`✓ ${name}`);
    generated++;
  } catch (err) {
    console.error(`✗ ${name}: ${err.message}`);
    failed++;
  }
}

console.log(`\n─── Summary ───────────────────────────`);
console.log(`✓ Generated : ${generated} FAQ schema files`);
if (failed > 0) {
  console.log(`✗ Failed    : ${failed} files`);
}
console.log(`📁 Output   : ${OUTPUT_DIR}`);

// Build Schema.org FAQPage structured data for a city
function buildFaqSchema(cityName, cityZip) {
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
    {
      question: `Was ist der günstigste Stromtarif in ${cityName}?`,
      answer: `Den günstigsten Tarif für ${cityName} finden Sie über unseren kostenlosen Tarifrechner. Die Preise variieren je nach Anbieter, Verbrauch und Vertragslaufzeit.`,
    },
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  };
}
