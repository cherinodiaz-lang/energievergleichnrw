import type { ComponentProps } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  AlertCircle,
  ArrowRight,
  BarChart3,
  CheckCircle,
  Globe,
  LoaderCircle,
  MapPin,
  Rocket,
  Search,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PassendeRatgeber from '@/components/PassendeRatgeber';
import Breadcrumb from '@/components/Breadcrumb';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import RelatedPages from '@/components/RelatedPages';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { getRelatedPages } from '@/lib/internal-linking';
import { ROUTES } from '@/lib/routes';
import {
  type StromTariffResult,
  type StromTariffSearchErrors,
  type StromTariffSearchResponse,
  type StromTariffSearchStatus,
  validateStromTariffInput,
} from '@/lib/strom-tariff-provider';
import { trackEvent } from '@/services/ga4-tracking';

type FormSubmitEvent = Parameters<NonNullable<ComponentProps<'form'>['onSubmit']>>[0];

type SearchState = {
  status: StromTariffSearchStatus | 'idle' | 'loading';
  message: string;
  tariffs: StromTariffResult[];
  configured: boolean;
  source: StromTariffSearchResponse['source'] | null;
};

type CalculatorFormData = {
  postcode: string;
  annualConsumption: string;
  householdSize: string;
  ecoOnly: boolean;
  bonusOnly: boolean;
};

const INITIAL_FORM_DATA: CalculatorFormData = {
  postcode: '',
  annualConsumption: '',
  householdSize: '',
  ecoOnly: false,
  bonusOnly: false,
};

const INITIAL_STATE: SearchState = {
  status: 'idle',
  message: 'Geben Sie Ihre PLZ und Ihren Jahresverbrauch ein, um verfuegbare Stromtarife fuer Ihren Haushalt abzurufen.',
  tariffs: [],
  configured: false,
  source: null,
};

const FAQ_ITEMS = [
  {
    q: 'Welche Angaben sind fuer den Stromvergleich notwendig?',
    a: 'Fuer belastbare Tarifergebnisse benoetigen Sie mindestens Ihre Postleitzahl und Ihren Jahresverbrauch in kWh. Optional koennen Sie Filter wie Oekostrom oder Bonusangebote setzen.',
  },
  {
    q: 'Werden echte Tarife angezeigt?',
    a: 'Ja. Wenn eine Live-Tarifdatenquelle aktiv ist, werden echte Tarife ausgegeben. Ohne Live-Quelle berechnet der Rechner stattdessen transparente Stromkosten-Szenarien auf Basis Ihrer Eingaben.',
  },
  {
    q: 'Wie funktioniert der Rechner ohne Live-Tarifquelle?',
    a: 'Dann rechnet das System ehrliche Vergleichsszenarien mit offen ausgewiesenen Annahmen. Sie erhalten reale Kosten- und Sparpotenzialwerte aus Ihrem Verbrauch, aber keine als live getarnten Anbieterangebote.',
  },
  {
    q: 'Kann ich nur Oekostrom anzeigen lassen?',
    a: 'Ja. Ueber den Oekostrom-Filter werden Live-Tarife entsprechend gefiltert oder die Modellrechnung auf gruene Szenarien umgestellt.',
  },
  {
    q: 'Wie oft sollte ich Stromtarife neu vergleichen?',
    a: 'Mindestens einmal pro Jahr oder sobald eine Preisgarantie auslaeuft. So erkennen Sie schnell, ob ein Anbieterwechsel wieder Einsparpotenzial bringt.',
  },
];

function buildFaqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}

function getStatusTone(status: SearchState['status']) {
  if (status === 'error') {
    return 'border-red-200 bg-red-50 text-red-800';
  }

  if (status === 'empty') {
    return 'border-slate-200 bg-slate-50 text-slate-800';
  }

  if (status === 'success') {
    return 'border-emerald-200 bg-emerald-50 text-emerald-900';
  }

  return 'border-blue-200 bg-blue-50 text-blue-900';
}

function formatMoney(value: number) {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 2,
  }).format(value);
}

function formatMonths(value?: number | null) {
  if (!value) {
    return 'Keine Angabe';
  }

  return `${value} Monate`;
}

function normalizeQueryPrefill() {
  if (typeof window === 'undefined') {
    return null;
  }

  const params = new URLSearchParams(window.location.search);
  const postcode = params.get('postcode') ?? params.get('plz') ?? '';
  const annualConsumption = params.get('annualConsumption') ?? params.get('verbrauch') ?? '';
  const householdSize = params.get('householdSize') ?? '';

  if (!postcode && !annualConsumption && !householdSize) {
    return null;
  }

  return { postcode, annualConsumption, householdSize };
}

export function StromTarifCalculator() {
  const [formData, setFormData] = useState<CalculatorFormData>(INITIAL_FORM_DATA);
  const [formErrors, setFormErrors] = useState<StromTariffSearchErrors>({});
  const [searchState, setSearchState] = useState<SearchState>(INITIAL_STATE);

  useEffect(() => {
    const queryPrefill = normalizeQueryPrefill();
    if (!queryPrefill) {
      return;
    }

    setFormData((current) => ({
      ...current,
      postcode: queryPrefill.postcode || current.postcode,
      annualConsumption: queryPrefill.annualConsumption || current.annualConsumption,
      householdSize: queryPrefill.householdSize || current.householdSize,
    }));
  }, []);

  const validationSummary = useMemo(() => Object.values(formErrors).filter(Boolean), [formErrors]);

  const handleFieldChange = <Key extends keyof CalculatorFormData>(field: Key, value: CalculatorFormData[Key]) => {
    setFormData((current) => ({ ...current, [field]: value }));
    setFormErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = async (event: FormSubmitEvent) => {
    event.preventDefault();

    const validation = validateStromTariffInput({
      postcode: formData.postcode,
      annualConsumption: formData.annualConsumption,
      householdSize: formData.householdSize,
      ecoOnly: formData.ecoOnly,
      bonusOnly: formData.bonusOnly,
    });

    if (!validation.valid || !validation.data) {
      setFormErrors(validation.errors);
      setSearchState({
        ...INITIAL_STATE,
        status: 'error',
        message: 'Bitte pruefen Sie die markierten Eingaben.',
        source: null,
      });
      return;
    }

    setFormErrors({});
    setSearchState({
      status: 'loading',
      message: 'Stromtarife werden geladen ...',
      tariffs: [],
      configured: false,
      source: null,
    });

    trackEvent('tariff_calculator_submit', {
      calculator_type: 'strom',
      postcode_prefix: validation.data.postcode.slice(0, 2),
      eco_only: validation.data.ecoOnly,
      bonus_only: validation.data.bonusOnly,
      annual_consumption: validation.data.annualConsumption,
    });

    try {
      const response = await fetch('/api/stromtarife', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(validation.data),
      });

      const payload = await response.json() as {
        status?: SearchState['status'];
        message?: string;
        tariffs?: StromTariffResult[];
        configured?: boolean;
        source?: StromTariffSearchResponse['source'];
        errors?: StromTariffSearchErrors;
      };

      if (response.status === 400) {
        setFormErrors(payload.errors ?? {});
        setSearchState({
          ...INITIAL_STATE,
          status: 'error',
          message: payload.message ?? 'Bitte pruefen Sie die Eingaben.',
          source: null,
        });
        return;
      }

      const nextStatus = payload.status ?? 'error';
      const nextState: SearchState = {
        status: nextStatus,
        message: payload.message ?? 'Es ist ein unerwarteter Fehler aufgetreten.',
        tariffs: payload.tariffs ?? [],
        configured: Boolean(payload.configured),
        source: payload.source ?? null,
      };

      setSearchState(nextState);
      trackEvent(`tariff_calculator_${nextStatus}`, {
        calculator_type: 'strom',
        results_count: nextState.tariffs.length,
        configured: nextState.configured,
      });
    } catch {
      setSearchState({
        status: 'error',
        message: 'Die Anfrage konnte nicht gesendet werden. Bitte pruefen Sie Ihre Verbindung und versuchen Sie es erneut.',
        tariffs: [],
        configured: false,
        source: null,
      });
      trackEvent('tariff_calculator_error', {
        calculator_type: 'strom',
        reason: 'network_failure',
      });
    }
  };

  return (
    <section id="vergleich" className="w-full py-24 bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.3fr)_minmax(300px,0.7fr)] gap-12 items-start">
          <Card className="shadow-xl">
            <CardHeader className="bg-primary text-white">
              <CardTitle className="font-heading text-2xl">Stromtarifrechner fuer NRW</CardTitle>
              <p className="text-sm text-white/85">
                Live-Tarife bei aktiver Datenquelle, ansonsten transparente Kosten- und Sparszenarien statt Platzhalter-Angeboten.
              </p>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {validationSummary.length > 0 && (
                  <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
                    Bitte pruefen Sie Ihre Eingaben. Fuer belastbare Tarifergebnisse sind PLZ und Jahresverbrauch erforderlich.
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="strom-postcode">Postleitzahl *</Label>
                    <Input
                      id="strom-postcode"
                      inputMode="numeric"
                      autoComplete="postal-code"
                      placeholder="z.B. 40210"
                      value={formData.postcode}
                      onChange={(event) => handleFieldChange('postcode', event.target.value)}
                      aria-invalid={Boolean(formErrors.postcode)}
                      aria-describedby={formErrors.postcode ? 'strom-postcode-error' : undefined}
                    />
                    {formErrors.postcode && (
                      <p id="strom-postcode-error" className="text-sm text-red-700">
                        {formErrors.postcode}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="strom-consumption">Jahresverbrauch in kWh *</Label>
                    <Input
                      id="strom-consumption"
                      type="number"
                      min="500"
                      step="1"
                      inputMode="numeric"
                      placeholder="z.B. 3500"
                      value={formData.annualConsumption}
                      onChange={(event) => handleFieldChange('annualConsumption', event.target.value)}
                      aria-invalid={Boolean(formErrors.annualConsumption)}
                      aria-describedby={formErrors.annualConsumption ? 'strom-consumption-error' : undefined}
                    />
                    {formErrors.annualConsumption && (
                      <p id="strom-consumption-error" className="text-sm text-red-700">
                        {formErrors.annualConsumption}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="strom-household-size">Haushaltsgroesse (optional)</Label>
                    <Input
                      id="strom-household-size"
                      type="number"
                      min="1"
                      max="10"
                      step="1"
                      placeholder="z.B. 3"
                      value={formData.householdSize}
                      onChange={(event) => handleFieldChange('householdSize', event.target.value)}
                      aria-invalid={Boolean(formErrors.householdSize)}
                      aria-describedby={formErrors.householdSize ? 'strom-household-size-error' : undefined}
                    />
                    {formErrors.householdSize && (
                      <p id="strom-household-size-error" className="text-sm text-red-700">
                        {formErrors.householdSize}
                      </p>
                    )}
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                    <p className="font-semibold text-slate-900">Empfehlung zur Eingabe</p>
                    <p className="mt-1">
                      Nutzen Sie nach Moeglichkeit den kWh-Wert Ihrer letzten Jahresabrechnung. Das sorgt fuer die belastbarste Tarifsortierung.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex items-start gap-3 rounded-lg border border-slate-200 p-4">
                    <Checkbox
                      id="strom-eco-only"
                      checked={formData.ecoOnly}
                      onCheckedChange={(checked) => handleFieldChange('ecoOnly', checked === true)}
                    />
                    <span>
                      <span className="block font-medium text-slate-900">Nur Oekostrom</span>
                      <span className="block text-sm text-slate-600">Filtert Live-Tarife oder verschiebt die Modellrechnung auf gruene Kostenprofile.</span>
                    </span>
                  </label>

                  <label className="flex items-start gap-3 rounded-lg border border-slate-200 p-4">
                    <Checkbox
                      id="strom-bonus-only"
                      checked={formData.bonusOnly}
                      onCheckedChange={(checked) => handleFieldChange('bonusOnly', checked === true)}
                    />
                    <span>
                      <span className="block font-medium text-slate-900">Nur Tarife mit Bonus</span>
                      <span className="block text-sm text-slate-600">Zeigt bevorzugt Tarife mit ausgewiesenem Neukunden- oder Wechselbonus.</span>
                    </span>
                  </label>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button type="submit" className="w-full sm:w-auto bg-secondary text-secondary-foreground hover:bg-secondary/90 h-12 px-8 font-bold">
                    {searchState.status === 'loading' ? (
                      <>
                        <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
                        Tarife werden geladen
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 h-5 w-5" />
                        Tarife abrufen
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full sm:w-auto"
                    onClick={() => {
                      setFormData(INITIAL_FORM_DATA);
                      setFormErrors({});
                      setSearchState(INITIAL_STATE);
                    }}
                  >
                    Eingaben zuruecksetzen
                  </Button>
                </div>
              </form>

              <div className={`mt-8 rounded-xl border px-4 py-4 ${getStatusTone(searchState.status)}`} role={searchState.status === 'error' ? 'alert' : 'status'}>
                <div className="flex items-start gap-3">
                  {searchState.status === 'loading' ? (
                    <LoaderCircle className="mt-0.5 h-5 w-5 animate-spin" />
                  ) : (
                    <AlertCircle className="mt-0.5 h-5 w-5" />
                  )}
                  <div>
                    <p className="font-semibold">
                      {searchState.status === 'success' && 'Tarifergebnisse verfuegbar'}
                      {searchState.status === 'empty' && 'Keine Stromtarife gefunden'}
                      {searchState.status === 'error' && 'Tarifabfrage fehlgeschlagen'}
                      {(searchState.status === 'idle' || searchState.status === 'loading') && 'Stromvergleich'}
                    </p>
                    <p className="mt-1 text-sm">{searchState.message}</p>
                  </div>
                </div>
              </div>

              <div className="mt-10" data-testid="strom-tariff-results">
                {searchState.status === 'loading' && (
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {[0, 1].map((index) => (
                      <div key={index} className="rounded-2xl border border-slate-200 p-6 animate-pulse">
                        <div className="h-6 w-40 rounded bg-slate-200" />
                        <div className="mt-4 h-4 w-28 rounded bg-slate-200" />
                        <div className="mt-8 grid grid-cols-2 gap-4">
                          <div className="h-16 rounded bg-slate-100" />
                          <div className="h-16 rounded bg-slate-100" />
                          <div className="h-16 rounded bg-slate-100" />
                          <div className="h-16 rounded bg-slate-100" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {searchState.status === 'success' && (
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {searchState.tariffs.map((tariff, index) => (
                      <motion.div
                        key={`${tariff.providerName}-${tariff.tariffName}-${index}`}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.08 }}
                      >
                        <Card className="h-full border-slate-200 shadow-sm hover:shadow-lg transition-shadow">
                          <CardHeader className="space-y-4">
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <p className="text-sm font-medium text-slate-500">{tariff.providerName}</p>
                                <CardTitle className="text-2xl text-primary">{tariff.tariffName}</CardTitle>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-slate-500">Jahreskosten</p>
                                <p className="text-3xl font-bold text-primary">{formatMoney(tariff.annualCost)}</p>
                                <p className="text-sm text-slate-500">{formatMoney(tariff.monthlyCost)} / Monat</p>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {tariff.eco && <Badge>Oekostrom</Badge>}
                              {tariff.bonus ? <Badge variant="secondary">Bonus {formatMoney(tariff.bonus)}</Badge> : null}
                              {index === 0 && <Badge variant="outline">Beste Kostenposition</Badge>}
                              {searchState.source === 'transparent_model' && <Badge variant="outline">Transparente Modellrechnung</Badge>}
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="rounded-xl border border-slate-200 p-4">
                                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Arbeitspreis</p>
                                <p className="mt-2 text-lg font-bold text-slate-900">{tariff.workPriceCt.toFixed(2)} ct/kWh</p>
                              </div>
                              <div className="rounded-xl border border-slate-200 p-4">
                                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Grundpreis</p>
                                <p className="mt-2 text-lg font-bold text-slate-900">{formatMoney(tariff.basePriceMonthly)} / Monat</p>
                              </div>
                              <div className="rounded-xl border border-slate-200 p-4">
                                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Vertragslaufzeit</p>
                                <p className="mt-2 text-lg font-bold text-slate-900">{formatMonths(tariff.contractMonths)}</p>
                              </div>
                              <div className="rounded-xl border border-slate-200 p-4">
                                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Preisgarantie</p>
                                <p className="mt-2 text-lg font-bold text-slate-900">{formatMonths(tariff.priceGuaranteeMonths)}</p>
                              </div>
                            </div>

                            {tariff.notes && tariff.notes.length > 0 && (
                              <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
                                {tariff.notes.join(' ')}
                              </div>
                            )}

                            <div className="flex flex-col sm:flex-row gap-3">
                              {tariff.ctaUrl ? (
                                <a href={tariff.ctaUrl} target="_blank" rel="noreferrer" className="w-full sm:w-auto">
                                  <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
                                    Zum Tarif
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                  </Button>
                                </a>
                              ) : (
                                <Link to={ROUTES.kontakt} className="w-full sm:w-auto">
                                  <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
                                    {searchState.source === 'transparent_model' ? 'Persoenliches Angebot anfragen' : 'Beratung anfragen'}
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                  </Button>
                                </Link>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}

                {searchState.status === 'empty' && (
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                    <h3 className="font-heading text-2xl font-semibold text-slate-900">Keine passenden Tarife gefunden</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-700">
                      Fuer diese Kombination aus PLZ, Verbrauch und Filtern konnten keine Tarife normalisiert werden. Bitte pruefen Sie die Eingaben oder entfernen Sie einzelne Filter.
                    </p>
                  </div>
                )}

                {searchState.status === 'error' && (
                  <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
                    <h3 className="font-heading text-2xl font-semibold text-red-950">Tarifdaten derzeit nicht verfuegbar</h3>
                    <p className="mt-3 text-sm leading-6 text-red-900">
                      Die Anfrage konnte nicht sauber abgeschlossen werden. Es werden keine unvollstaendigen oder erfundenen Ergebnisse angezeigt.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="font-heading text-xl font-semibold text-primary">Was der Rechner heute leistet</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-700">
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 text-primary" />
                  <span>PLZ- und Verbrauchsvalidierung direkt vor der Anfrage</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 text-primary" />
                  <span>Serverseitiger Ergebnisabruf ueber eine zentrale Tarif-Provider-Schicht</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 text-primary" />
                  <span>Klare Zustandslogik fuer Loading, Success, Empty und Error</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 text-primary" />
                  <span>Keine Beispieltarife, keine erfundenen Preise, keine Platzhalter-Anbieter</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
              <h3 className="font-heading text-xl font-semibold text-primary">Fuer eine belastbare Abfrage hilfreich</h3>
              <ul className="mt-4 space-y-3 text-sm text-blue-900">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-primary" />
                  <span>PLZ aus dem Liefergebiet, nicht aus einer alten Adresse</span>
                </li>
                <li className="flex items-start gap-3">
                  <BarChart3 className="mt-0.5 h-5 w-5 text-primary" />
                  <span>Jahresverbrauch laut letzter Abrechnung statt grober Schaetzung</span>
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 text-primary" />
                  <span>Optional Filter fuer Oekostrom und Bonus nur dann aktivieren, wenn sie wirklich erforderlich sind</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
              <h3 className="font-heading text-xl font-semibold text-primary">Naechster Schritt nach den Ergebnissen</h3>
              <p className="mt-3 text-sm leading-6 text-emerald-950">
                Wenn eine echte Tarifquelle konfiguriert ist, kann die Ergebnisliste direkt in Angebots- oder Wechselstrecken fuehren. Bis dahin bleibt die Beratung ueber unsere Kontaktseite der korrekte Anschluss.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function StromvergleichNrwPage() {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(buildFaqSchema());
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const breadcrumbItems = [
    { label: 'Startseite', path: ROUTES.home },
    { label: 'Stromvergleich NRW', path: ROUTES.stromvergleich },
  ];

  const breadcrumbSchema = [
    { name: 'Startseite', url: `${typeof window !== 'undefined' ? window.location.origin : ''}${ROUTES.home}` },
    { name: 'Stromvergleich NRW', url: `${typeof window !== 'undefined' ? window.location.origin : ''}${ROUTES.stromvergleich}` },
  ];

  return (
    <div className="min-h-screen bg-background break-words leading-mobile">
      <BreadcrumbSchema items={breadcrumbSchema} />
      <Header />
      <Breadcrumb items={breadcrumbItems} />

      <section className="w-full bg-primary py-20 text-primary-foreground md:py-28">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-3xl"
          >
            <Badge variant="secondary" className="mb-6 bg-white/15 text-white">
              Stromtarifrechner NRW
            </Badge>
            <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
              Stromtarife fuer NRW ehrlich abrufen, ohne Fake-Ergebnisse
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/90">
              Diese Seite liefert echte Live-Tarife, wenn eine Datenquelle aktiv ist. Ohne Live-Quelle rechnet sie stattdessen transparente Stromkosten-Szenarien aus Ihren Eingaben, statt Ihnen Platzhalter-Anbieter zu zeigen.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 h-12 px-8 font-semibold"
                onClick={() => document.getElementById('vergleich')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Zum Rechner
              </Button>
              <Link to="/methodik" className="inline-flex items-center text-sm font-medium text-white underline underline-offset-4">
                So vergleichen wir
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <StromTarifCalculator />

      <section className="w-full bg-white py-24">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                icon: Zap,
                title: 'Serverseitiger Tarifabruf',
                text: 'Die Ergebnislogik liegt nicht mehr in statischen React-Beispieldaten, sondern hinter einem API-Endpoint.',
              },
              {
                icon: Globe,
                title: 'Kein Anbieter-Bias',
                text: 'Ohne echte Datenquelle werden keine erfundenen Rankings gezeigt. Das verhindert irrefuehrende Entscheidungen.',
              },
              {
                icon: Rocket,
                title: 'Saubere Ergebniszustande',
                text: 'Loading, Success, Empty und Error sind getrennt modelliert. Ohne Live-Quelle greift automatisch die transparente Modellrechnung.',
              },
              {
                icon: ShieldCheck,
                title: 'Wartbar und testbar',
                text: 'Validierung, Provider-Adapter und Ergebnisnormalisierung liegen zentral und sind testbar isoliert.',
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <Card className="h-full shadow-sm">
                    <CardHeader>
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-xl text-primary">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm leading-6 text-slate-700">{item.text}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="w-full bg-background py-24">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-center text-3xl font-semibold text-primary">Haeufige Fragen zum Stromrechner</h2>
          <div className="mt-12 space-y-4">
            {FAQ_ITEMS.map((item, index) => (
              <Accordion key={item.q} type="single" collapsible className="rounded-xl border bg-white">
                <AccordionItem value={`strom-faq-${index}`} className="border-none">
                  <AccordionTrigger className="px-6 py-4 text-left font-heading text-lg hover:text-primary">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-5 text-sm leading-6 text-slate-700">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full border-t bg-white py-16">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          <Link to={ROUTES.gasvergleich} className="group">
            <Card className="h-full transition-shadow group-hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-primary">Gasvergleich NRW</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">Gastarife in NRW vergleichen und Energiekosten ganzheitlich betrachten.</p>
              </CardContent>
            </Card>
          </Link>
          <Link to={ROUTES.photovoltaik} className="group">
            <Card className="h-full transition-shadow group-hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-primary">Photovoltaik NRW</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">Eigenverbrauch senken und Reststrombedarf mit dem passenden Tarif kombinieren.</p>
              </CardContent>
            </Card>
          </Link>
          <Link to={ROUTES.ratgeberStrom} className="group">
            <Card className="h-full transition-shadow group-hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-primary">Ratgeber Strom</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">Vertragslaufzeit, Preisgarantie und Wechselwissen fuer bessere Entscheidungen.</p>
              </CardContent>
            </Card>
          </Link>
          <Link to="/methodik" className="group">
            <Card className="h-full transition-shadow group-hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-primary">Methodik</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">Transparente Einordnung, wie Tarife aufbereitet und bewertet werden.</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      <PassendeRatgeber moneyPageId="stromvergleich-nrw" limit={4} />
      <RelatedPages pages={getRelatedPages('/stromvergleich-nrw')} />
      <Footer />
    </div>
  );
}
