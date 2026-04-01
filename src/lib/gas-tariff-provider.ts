const POSTCODE_REGEX = /^\d{5}$/;
const MODEL_MESSAGE = 'Es werden transparente Gaskosten-Szenarien auf Basis Ihrer Eingaben berechnet, weil aktuell keine Live-Tarifquelle aktiv ist.';
const PROVIDER_ERROR_MESSAGE = 'Die Tarifdaten konnten gerade nicht geladen werden. Bitte versuchen Sie es spaeter erneut.';
const EMPTY_RESULTS_MESSAGE = 'Fuer diese Eingabe konnten aktuell keine Gastarife gefunden werden.';

export interface GasTariffSearchInput {
  postcode: string;
  annualConsumption: number;
  heatingType?: string;
  bioGasOnly: boolean;
  bonusOnly: boolean;
}

export interface GasTariffSearchErrors {
  postcode?: string;
  annualConsumption?: string;
}

export interface GasTariffResult {
  providerName: string;
  tariffName: string;
  annualCost: number;
  monthlyCost: number;
  basePriceMonthly: number;
  workPriceCt: number;
  contractMonths?: number | null;
  priceGuaranteeMonths?: number | null;
  bioGas?: boolean;
  bonus?: number | null;
  ctaUrl?: string | null;
  notes?: string[];
}

export type GasTariffSearchStatus = 'success' | 'empty' | 'error';

export interface GasTariffSearchResponse {
  status: GasTariffSearchStatus;
  message: string;
  tariffs: GasTariffResult[];
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

export function validateGasTariffInput(input: Record<string, unknown>): {
  valid: boolean;
  data?: GasTariffSearchInput;
  errors: GasTariffSearchErrors;
} {
  const errors: GasTariffSearchErrors = {};
  const postcode = toTrimmedString(input.postcode);
  const annualConsumptionValue = toFiniteNumber(input.annualConsumption);

  if (!POSTCODE_REGEX.test(postcode)) {
    errors.postcode = 'Bitte geben Sie eine gueltige deutsche Postleitzahl mit 5 Ziffern ein.';
  }

  if (annualConsumptionValue === null || annualConsumptionValue < 500 || annualConsumptionValue > 1000000) {
    errors.annualConsumption = 'Bitte geben Sie einen realistischen Jahresverbrauch zwischen 500 und 1.000.000 kWh ein.';
  }

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    data: {
      postcode,
      annualConsumption: annualConsumptionValue as number,
      heatingType: typeof input.heatingType === 'string' ? input.heatingType : undefined,
      bioGasOnly: toBoolean(input.bioGasOnly),
      bonusOnly: toBoolean(input.bonusOnly),
    },
    errors,
  };
}

export function hasGasTariffProviderConfig(env: ImportMetaEnv | NodeJS.ProcessEnv = import.meta.env): boolean {
  return Boolean((env as Record<string, unknown>).GAS_TARIFF_API_BASE_URL);
}

function calculateScenarioAnnualCost(annualConsumption: number, workPriceCt: number, basePriceMonthly: number, bonus: number | null = null) {
  const grossAnnualCost = (annualConsumption * (workPriceCt / 100)) + (basePriceMonthly * 12);
  return Math.max(grossAnnualCost - (bonus ?? 0), 0);
}

function buildTransparentModelTariffs(input: GasTariffSearchInput): GasTariffResult[] {
  const annualConsumption = input.annualConsumption;

  // NRW average gas work price ranges by consumption tier (ct/kWh)
  const baseWorkPriceCt = annualConsumption <= 5000
    ? 9.8
    : annualConsumption <= 10000
      ? 9.2
      : annualConsumption <= 20000
        ? 8.7
        : annualConsumption <= 50000
          ? 8.3
          : 7.9;

  const bioGasMarkup = input.bioGasOnly ? 0.5 : 0;
  const bonusAmount = input.bonusOnly ? 80 : null;
  // Gas base price is higher than electricity due to metering costs
  const profileBasePrice = 9.5 + Math.min(annualConsumption / 10000, 3) * 0.9;

  const scenarios = [
    {
      tariffName: 'Gaskorridor Effizienz',
      workPriceCt: Math.max(baseWorkPriceCt - 0.8, 6.5),
      basePriceMonthly: Math.max(profileBasePrice - 0.5, 7.0),
      contractMonths: 12,
      priceGuaranteeMonths: 12,
      bioGas: input.bioGasOnly,
      bonus: bonusAmount,
      notes: [
        'Modellrechnung fuer ein preisorientiertes Wechselziel.',
        'Keine Live-Tarifzusage, sondern transparente Rechenbasis aus Ihrem Verbrauch.',
      ],
    },
    {
      tariffName: 'Gaskorridor Ausgewogen',
      workPriceCt: baseWorkPriceCt + bioGasMarkup,
      basePriceMonthly: profileBasePrice,
      contractMonths: 12,
      priceGuaranteeMonths: 12,
      bioGas: input.bioGasOnly,
      bonus: bonusAmount,
      notes: [
        'Ausgewogenes Referenzszenario fuer typische Gasprofile in NRW.',
        input.bioGasOnly ? 'Biogas-Aufschlag ist in diesem Modell bereits enthalten.' : 'Ohne expliziten Biogas-Aufschlag gerechnet.',
      ],
    },
    {
      tariffName: input.bioGasOnly ? 'Gaskorridor Biogas Plus' : 'Gaskorridor Preisstabil',
      workPriceCt: baseWorkPriceCt + bioGasMarkup + (input.bioGasOnly ? 0.8 : 0.6),
      basePriceMonthly: profileBasePrice + (input.bioGasOnly ? 1.0 : 0.8),
      contractMonths: 24,
      priceGuaranteeMonths: 18,
      bioGas: true,
      bonus: input.bonusOnly ? Math.max((bonusAmount ?? 0) - 20, 0) : null,
      notes: [
        input.bioGasOnly
          ? 'Fokus auf zertifizierte Biogas-Tarife mit stabilerer Kalkulation.'
          : 'Preisstabileres Szenario mit etwas hoeherem Sicherheitspuffer.',
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
      bioGas: scenario.bioGas,
      bonus: scenario.bonus,
      ctaUrl: null,
      notes: [
        `Berechnet fuer ${annualConsumption} kWh/Jahr.`,
        ...scenario.notes,
      ],
    } satisfies GasTariffResult;
  }).sort((left, right) => left.annualCost - right.annualCost);
}

export function normalizeProviderGasTariffs(payload: unknown, annualConsumption: number): GasTariffResult[] {
  const records = extractResultRecords(payload);
  const normalizedTariffs: Array<GasTariffResult | null> = records.map((record) => {
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
        bioGas: toBoolean(firstDefined(record, ['bioGas', 'isBioGas', 'biogas', 'isGreen'])),
        bonus: toFiniteNumber(firstDefined(record, ['bonus', 'bonusAmount', 'wechselbonus'])),
        ctaUrl: toTrimmedString(firstDefined(record, ['ctaUrl', 'url', 'tariffUrl', 'wechselLink'])) || null,
        notes,
      } satisfies GasTariffResult;
    });

  return normalizedTariffs
    .filter((tariff): tariff is GasTariffResult => tariff !== null)
    .sort((left, right) => left.annualCost - right.annualCost);
}

export async function searchGasTariffs(
  input: GasTariffSearchInput,
  env: ImportMetaEnv | NodeJS.ProcessEnv = import.meta.env,
  fetchImpl: typeof fetch = fetch,
): Promise<GasTariffSearchResponse> {
  if (!hasGasTariffProviderConfig(env)) {
    const tariffs = buildTransparentModelTariffs(input);
    return {
      status: 'success',
      message: MODEL_MESSAGE,
      tariffs,
      configured: false,
      source: 'transparent_model',
    };
  }

  const baseUrl = (env as Record<string, unknown>).GAS_TARIFF_API_BASE_URL as string;
  const path = (env as Record<string, unknown>).GAS_TARIFF_API_PATH as string || '/rates';
  const authHeader = (env as Record<string, unknown>).GAS_TARIFF_API_AUTH_HEADER as string || 'x-api-key';
  const apiKey = (env as Record<string, unknown>).GAS_TARIFF_API_KEY as string | undefined;
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
        energyType: 'gas',
        postcode: input.postcode,
        annualConsumption: input.annualConsumption,
        heatingType: input.heatingType,
        bioGasOnly: input.bioGasOnly,
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
    const tariffs = normalizeProviderGasTariffs(payload, input.annualConsumption);

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
      message: `${tariffs.length} Gastarif${tariffs.length === 1 ? '' : 'e'} fuer ${input.postcode} gefunden.`,
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
