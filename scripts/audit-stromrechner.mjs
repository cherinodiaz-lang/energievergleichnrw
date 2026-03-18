import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();
const scanRoots = [
  'package.json',
  'README.md',
  'astro.config.mjs',
  'wrangler.jsonc',
  'wrangler.jsonc.example',
  'lighthouserc.json',
  '.github/workflows',
  'src/pages',
  'src/components',
  'src/lib',
  'src/services',
  'src/features',
  'src/utils',
];

const ignoreDirectories = new Set(['node_modules', '.git', 'dist', '.astro', '.wrangler', 'coverage']);
const routePatterns = ['stromvergleich', 'tarifrechner', 'ergebnis', 'results', 'compare', 'tariff'];
const inputPatterns = ['postleitzahl', 'postcode', 'verbrauch', 'consumption', 'kwh', 'jahresverbrauch', 'form', 'submit', 'input'];
const resultPatterns = ['annual_cost', 'annualCost', 'jahreskosten', 'arbeitspreis', 'grundpreis', 'provider', 'anbieter', 'tariff', 'tarif', 'result', 'ergebnis'];
const uiPatterns = ['loading', 'error', 'empty', 'non_live', 'anbietername', 'jahreskosten', 'tarifkarten', 'ctaUrl'];
const dataSourcePatterns = ['fetch(', 'APIRoute', '/api/stromtarife', 'searchStromTariffs', 'STROM_TARIFF_API_BASE_URL', 'provider_api', 'non_live'];

function walk(relativePath) {
  const absolutePath = path.join(projectRoot, relativePath);
  if (!fs.existsSync(absolutePath)) {
    return [];
  }

  const stats = fs.statSync(absolutePath);
  if (stats.isFile()) {
    return [relativePath];
  }

  if (ignoreDirectories.has(path.basename(relativePath))) {
    return [];
  }

  return fs.readdirSync(absolutePath).flatMap((entry) => {
    const childRelativePath = path.join(relativePath, entry);
    const childAbsolutePath = path.join(projectRoot, childRelativePath);
    if (fs.statSync(childAbsolutePath).isDirectory() && ignoreDirectories.has(entry)) {
      return [];
    }

    return walk(childRelativePath);
  });
}

function fileContainsPatterns(filePath, patterns) {
  const absolutePath = path.join(projectRoot, filePath);
  const content = fs.readFileSync(absolutePath, 'utf8');
  return patterns.some((pattern) => content.includes(pattern));
}

const allFiles = scanRoots.flatMap((entry) => walk(entry));
const matchedFiles = allFiles.filter((filePath) => {
  const lower = filePath.toLowerCase();
  return routePatterns.some((pattern) => lower.includes(pattern)) || fileContainsPatterns(filePath, [
    ...routePatterns,
    ...inputPatterns,
    ...resultPatterns,
    ...uiPatterns,
    ...dataSourcePatterns,
  ]);
});

const routeFound = matchedFiles.some((filePath) => /src\/pages\/.*stromvergleich|src\/pages\/api\/stromtarife|StromvergleichNrwPage/.test(filePath));
const inputFlowFound = matchedFiles.some((filePath) => fileContainsPatterns(filePath, ['postleitzahl', 'annualConsumption', 'Jahresverbrauch', 'Tarife vergleichen']));
const resultFlowFound = matchedFiles.some((filePath) => fileContainsPatterns(filePath, ['searchStromTariffs', 'normalizeProviderTariffs', 'status:', 'annualCost']));
const resultUIFound = matchedFiles.some((filePath) => fileContainsPatterns(filePath, ['data-testid="strom-tariff-results"', 'Tarifergebnisse', 'non_live', 'Keine Stromtarife gefunden', 'Tarifrechner derzeit im Aufbau']));
const dataSourceFound = matchedFiles.some((filePath) => fileContainsPatterns(filePath, ['STROM_TARIFF_API_BASE_URL', '/api/stromtarife', 'provider_api', 'non_live']));

const gaps = [];
if (!routeFound) gaps.push('Keine oeffentliche Stromrechner-Route gefunden.');
if (!inputFlowFound) gaps.push('Keine belastbare Eingabestrecke fuer PLZ und Jahresverbrauch gefunden.');
if (!resultFlowFound) gaps.push('Keine serverseitige Ergebnislogik gefunden.');
if (!resultUIFound) gaps.push('Keine Ergebnis-UI mit Loading-/Error-/Empty-/Non-Live-Zustaenden gefunden.');
if (!dataSourceFound) gaps.push('Keine Datenquellen-Anbindung oder kein sauberer Non-Live-Guard gefunden.');

const status = gaps.length === 0 ? 'FOUND' : routeFound || inputFlowFound || resultFlowFound || resultUIFound ? 'PARTIAL' : 'MISSING';
const recommendation =
  status === 'FOUND'
    ? 'Die technische Rechnerstrecke ist vorhanden. Fuer echte Live-Tarife muss die externe Tarifdatenquelle zur Laufzeit konfiguriert sein.'
    : 'Route, Eingabestrecke, serverseitige Ergebnislogik, Ergebnis-UI und Non-Live-Guard vervollstaendigen.';

const result = {
  STATUS: status,
  routeFound,
  inputFlowFound,
  resultFlowFound,
  resultUIFound,
  dataSourceFound,
  filesMatched: matchedFiles.sort(),
  gaps,
  recommendation,
};

console.log(JSON.stringify(result, null, 2));
console.log('');
console.log('Zusammenfassung:');
console.log(`- Route: ${routeFound ? 'gefunden' : 'nicht gefunden'}`);
console.log(`- Input-Strecke: ${inputFlowFound ? 'gefunden' : 'nicht gefunden'}`);
console.log(`- Ergebnislogik: ${resultFlowFound ? 'gefunden' : 'nicht gefunden'}`);
console.log(`- Ergebnis-UI: ${resultUIFound ? 'gefunden' : 'nicht gefunden'}`);
console.log(`- Datenquelle/Guard: ${dataSourceFound ? 'gefunden' : 'nicht gefunden'}`);
console.log(`- Gesamtstatus: ${status}`);
