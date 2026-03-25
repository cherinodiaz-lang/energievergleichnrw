const POSTCODE_REGEX = /^\d{5}$/;
const MODEL_MESSAGE = 'Es werden transparente Stromkosten-Szenarien auf Basis Ihrer Eingaben berechnet, weil aktuell keine Live-Tarifquelle aktiv ist.';
const PROVIDER_ERROR_MESSAGE = 'Die Tarifdaten konnten gerade nicht geladen werden. Bitte versuchen Sie es spaeter erneut.';
const EMPTY_RESULTS_MESSAGE = 'Fuer diese Eingabe konnten aktuell keine Stromtarife gefunden werden.';

export interface StromTariffSearchInput {
  postcode: string;
  annualConsumption: number;
  householdSize?: number;
  ecoOnly: boolean;
  bonusOnly: boolean;
}

export interface StromTariffSearchErrors {
  postcode?: string;
  annualConsumption?: string;
  householdSize?: string;
}

export interface StromTariffResult {
  providerName: string;
  tariffName: string;
  annualCost: number;
  monthlyCost: number;
  basePriceMonthly: number;
  workPriceCt: number;
  contractMonths?: number | null;
  priceGuaranteeMonths?: number | null;
  eco?: boolean;
  bonus?: number | null;
  ctaUrl?: string | null;
  notes?: string[];
}

export type StromTariffSearchStatus = 'success' | 'empty' | 'error';

export interface StromTariffSearchResponse {
  status: StromTariffSearchStatus;
  message: string;
  tariffs: StromTariffResult[];
  configured: boolean;
  source: 'provider_api' | 'transparent_model';
}

interface RawTariffRecord {
  [key: string]: unknown;
}

interface ProviderResponseEnvelope {
  tariffs?: unknown;
  results?: unknown;
  data?: unknown;
  body?: unknown;
}

function toTrimmedString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function toBoolean(value: unknown): boolean {
  return value === true || value === 'true' || value === 1 || value === '1';
}

function toFiniteNumber(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === 'string') {
    const normalized = value.replace(',', '.').trim();
    if (!normalized) {
      return null;
    }

    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

function toNullableInteger(value: unknown): number | null {
  const parsed = toFiniteNumber(value);
  if (parsed === null) {
    return null;
  }

  return Number.isInteger(parsed) ? parsed : Math.round(parsed);
}

function firstDefined(record: RawTariffRecord, keys: string[]): unknown {
  for (const key of keys) {
    if (record[key] !== undefined && record[key] !== null && record[key] !== '') {
      return record[key];
    }
  }

  return undefined;
}

function normalizeBasePriceMonthly(record: RawTariffRecord): number | null {
  const monthly = toFiniteNumber(firstDefined(record, [
    'basePriceMonthly',
    'base_price_monthly',
    'grundpreisMonat',
    'monthlyBasePrice',
  ]));

  if (monthly !== null) {
    return monthly;
  }

  const yearly = toFiniteNumber(firstDefined(record, [
    'basePriceYear',
    'base_price_year',
    'grundpreisJahr',
  ]));

  return yearly !== null ? yearly / 12 : null;
}

function normalizeAnnualCost(record: RawTariffRecord, basePriceMonthly: number | null, workPriceCt: number | null, annualConsumption: number): number | null {
  const directAnnualCost = toFiniteNumber(firstDefined(record, [
    'annualCost',
    'annual_cost',
    'jahreskosten',
    'totalPrice',
    'total_price',
    'pricePerYear',
  ]));

  if (directAnnualCost !== null) {
    return directAnnualCost;
  }

  if (basePriceMonthly === null || workPriceCt === null) {
    return null;
  }

  return (basePriceMonthly * 12) + (annualConsumption * (workPriceCt / 100));
}

function extractResultRecords(payload: unknown): RawTariffRecord[] {
  if (Array.isArray(payload)) {
    return payload.filter((entry): entry is RawTariffRecord => typeof entry === 'object' && entry !== null);
  }

  if (payload && typeof payload === 'object') {
    const envelope = payload as ProviderResponseEnvelope;
    const nested = envelope.tariffs ?? envelope.results ?? envelope.data ?? envelope.body;
    if (nested !== undefined) {
      return extractResultRecords(nested);
    }
  }

  return [];
}

export function validateStromTariffInput(input: Record<string, unknown>): {
  valid: boolean;
  data?: StromTariffSearchInput;
  errors: StromTariffSearchErrors;
} {
  const errors: StromTariffSearchErrors = {};
  const postcode = toTrimmedString(input.postcode);
  const annualConsumptionValue = toFiniteNumber(input.annualConsumption);
  const householdSizeValue = toFiniteNumber(input.householdSize);

  if (!POSTCODE_REGEX.test(postcode)) {
    errors.postcode = 'Bitte geben Sie eine gueltige deutsche Postleitzahl mit 5 Ziffern ein.';
  }

  if (annualConsumptionValue === null || annualConsumptionValue < 500 || annualConsumptionValue > 100000) {
    errors.annualConsumption = 'Bitte geben Sie einen realistischen Jahresverbrauch zwischen 500 und 100000 kWh ein.';
  }

  if (householdSizeValue !== null && (householdSizeValue < 1 || householdSizeValue > 10)) {
    errors.householdSize = 'Bitte waehlen Sie eine Haushaltsgroesse zwischen 1 und 10 Personen.';
  }

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    data: {
      postcode,
      annualConsumption: annualConsumptionValue as number,
      householdSize: householdSizeValue === null ? undefined : householdSizeValue,
      ecoOnly: toBoolean(input.ecoOnly),
      bonusOnly: toBoolean(input.bonusOnly),
    },
    errors,
  };
}

export function hasStromTariffProviderConfig(env: ImportMetaEnv | NodeJS.ProcessEnv = import.meta.env): boolean {
  return Boolean(env.STROM_TARIFF_API_BASE_URL);
}

function calculateScenarioAnnualCost(annualConsumption: number, workPriceCt: number, basePriceMonthly: number, bonus: number | null = null) {
  const grossAnnualCost = (annualConsumption * (workPriceCt / 100)) + (basePriceMonthly * 12);
  return Math.max(grossAnnualCost - (bonus ?? 0), 0);
}

function buildTransparentModelTariffs(input: StromTariffSearchInput): StromTariffResult[] {
  const annualConsumption = input.annualConsumption;
  const householdSize = input.householdSize ?? (
    annualConsumption <= 1800 ? 1 :
      annualConsumption <= 2800 ? 2 :
        annualConsumption <= 4200 ? 3 :
          annualConsumption <= 5500 ? 4 : 5
  );

  const baseWorkPriceCt = annualConsumption <= 1800
    ? 33.4
    : annualConsumption <= 2800
      ? 31.8
      : annualConsumption <= 4200
        ? 30.6
        : annualConsumption <= 5500
          ? 29.8
          : 29.1;

  const ecoMarkup = input.ecoOnly ? 0.6 : 0;
  const bonusAmount = input.bonusOnly ? 90 : null;
  const profileBasePrice = 11.4 + Math.min(Math.max(householdSize - 1, 0), 4) * 0.7;

  const scenarios = [
    {
      tariffName: 'Kostenkorridor Effizienz',
      workPriceCt: Math.max(baseWorkPriceCt - 1.4, 24),
      basePriceMonthly: Math.max(profileBasePrice - 0.8, 8.5),
      contractMonths: 12,
      priceGuaranteeMonths: 12,
      eco: input.ecoOnly,
      bonus: bonusAmount,
      notes: [
        'Modellrechnung fuer ein preisorientiertes Wechselziel.',
        'Keine Live-Tarifzusage, sondern transparente Rechenbasis aus Ihrem Verbrauch.',
      ],
    },
    {
      tariffName: 'Kostenkorridor Ausgewogen',
      workPriceCt: baseWorkPriceCt + ecoMarkup,
      basePriceMonthly: profileBasePrice,
      contractMonths: 12,
      priceGuaranteeMonths: 12,
      eco: input.ecoOnly,
      bonus: bonusAmount,
      notes: [
        'Ausgewogenes Referenzszenario fuer typische Haushaltsprofile in NRW.',
        input.ecoOnly ? 'Oekostrom-Aufschlag ist in diesem Modell bereits enthalten.' : 'Ohne expliziten Oekostrom-Aufschlag gerechnet.',
      ],
    },
    {
      tariffName: input.ecoOnly ? 'Kostenkorridor Oekostrom Plus' : 'Kostenkorridor Preisstabil',
      workPriceCt: baseWorkPriceCt + ecoMarkup + (input.ecoOnly ? 1.1 : 0.9),
      basePriceMonthly: profileBasePrice + (input.ecoOnly ? 1.2 : 1.0),
      contractMonths: 24,
      priceGuaranteeMonths: 18,
      eco: true,
      bonus: input.bonusOnly ? Math.max((bonusAmount ?? 0) - 20, 0) : null,
      notes: [
        input.ecoOnly
          ? 'Fokus auf zertifizierte Gruenstrom-Profile mit stabilerer Kalkulation.'
          : 'Preisstabileres Szenario mit etwas hoeherem Sicherheitspuffer in Arbeitspreis und Grundpreis.',
        'Die Berechnung bleibt modellbasiert und ersetzt kein konkretes Anbieterangebot.',
      ],
    },
  ];

  return scenarios.map((scenario) => {
    const annualCost = calculateScenarioAnnualCost(
      annualConsumption,
      scenario.workPriceCt,
      scenario.basePriceMonthly,
      scenario.bonus,
    );

    return {
      providerName: 'Modellrechnung NRW',
      tariffName: scenario.tariffName,
      annualCost,
      monthlyCost: annualCost / 12,
      basePriceMonthly: scenario.basePriceMonthly,
      workPriceCt: scenario.workPriceCt,
      contractMonths: scenario.contractMonths,
      priceGuaranteeMonths: scenario.priceGuaranteeMonths,
      eco: scenario.eco,
      bonus: scenario.bonus,
      ctaUrl: null,
      notes: [
        `Berechnet fuer ${annualConsumption} kWh/Jahr und ${householdSize} Person${householdSize === 1 ? '' : 'en'}.`,
        ...scenario.notes,
      ],
    } satisfies StromTariffResult;
  }).sort((left, right) => left.annualCost - right.annualCost);
}

export function normalizeProviderTariffs(payload: unknown, annualConsumption: number): StromTariffResult[] {
  const records = extractResultRecords(payload);
  const normalizedTariffs: Array<StromTariffResult | null> = records.map((record) => {
      const providerName = toTrimmedString(firstDefined(record, ['providerName', 'provider', 'anbieter', 'supplierName']));
      const tariffName = toTrimmedString(firstDefined(record, ['tariffName', 'rateName', 'tariff', 'tarif', 'productName']));
      const basePriceMonthly = normalizeBasePriceMonthly(record);
      const workPriceCt = toFiniteNumber(firstDefined(record, ['workPriceCt', 'workPrice', 'arbeitspreis', 'pricePerKwhCt']));
      const annualCost = normalizeAnnualCost(record, basePriceMonthly, workPriceCt, annualConsumption);

      if (!providerName || !tariffName || basePriceMonthly === null || workPriceCt === null || annualCost === null) {
        return null;
      }

      const monthlyCost = annualCost / 12;
      const notes = [
        toTrimmedString(firstDefined(record, ['note', 'notes', 'description'])),
      ].filter(Boolean);

      return {
        providerName,
        tariffName,
        annualCost,
        monthlyCost,
        basePriceMonthly,
        workPriceCt,
        contractMonths: toNullableInteger(firstDefined(record, ['contractMonths', 'contract_months', 'laufzeitMonate'])),
        priceGuaranteeMonths: toNullableInteger(firstDefined(record, ['priceGuaranteeMonths', 'price_guarantee_months', 'preisgarantieMonate'])),
        eco: toBoolean(firstDefined(record, ['eco', 'isEco', 'oekostrom'])),
        bonus: toFiniteNumber(firstDefined(record, ['bonus', 'bonusAmount', 'wechselbonus'])),
        ctaUrl: toTrimmedString(firstDefined(record, ['ctaUrl', 'url', 'tariffUrl', 'wechselLink'])) || null,
        notes,
      } satisfies StromTariffResult;
    });

  return normalizedTariffs
    .filter((tariff): tariff is StromTariffResult => tariff !== null)
    .sort((left, right) => left.annualCost - right.annualCost);
}

export async function searchStromTariffs(
  input: StromTariffSearchInput,
  env: ImportMetaEnv | NodeJS.ProcessEnv = import.meta.env,
  fetchImpl: typeof fetch = fetch,
): Promise<StromTariffSearchResponse> {
  if (!hasStromTariffProviderConfig(env)) {
    const tariffs = buildTransparentModelTariffs(input);
    return {
      status: 'success',
      message: MODEL_MESSAGE,
      tariffs,
      configured: false,
      source: 'transparent_model',
    };
  }

  const baseUrl = env.STROM_TARIFF_API_BASE_URL!;
  const path = env.STROM_TARIFF_API_PATH || '/rates';
  const authHeader = env.STROM_TARIFF_API_AUTH_HEADER || 'x-api-key';
  const apiKey = env.STROM_TARIFF_API_KEY;
  const url = new URL(path, baseUrl).toString();

  const headers: HeadersInit = {
    'content-type': 'application/json',
  };

  if (apiKey) {
    headers[authHeader] = apiKey;
  }

  try {
    const response = await fetchImpl(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        energyType: 'electricity',
        postcode: input.postcode,
        annualConsumption: input.annualConsumption,
        householdSize: input.householdSize,
        ecoOnly: input.ecoOnly,
        bonusOnly: input.bonusOnly,
      }),
    });

    if (!response.ok) {
      return {
        status: 'error',
        message: PROVIDER_ERROR_MESSAGE,
        tariffs: [],
        configured: true,
        source: 'provider_api',
      };
    }

    const payload = await response.json();
    const tariffs = normalizeProviderTariffs(payload, input.annualConsumption);

    if (tariffs.length === 0) {
      return {
        status: 'empty',
        message: EMPTY_RESULTS_MESSAGE,
        tariffs: [],
        configured: true,
        source: 'provider_api',
      };
    }

    return {
      status: 'success',
      message: `${tariffs.length} Stromtarife fuer ${input.postcode} gefunden.`,
      tariffs,
      configured: true,
      source: 'provider_api',
    };
  } catch {
    return {
      status: 'error',
      message: PROVIDER_ERROR_MESSAGE,
      tariffs: [],
      configured: true,
      source: 'provider_api',
    };
  }
}
