import type { ComponentProps } from 'react';
import { useMemo, useState } from 'react';
import { AlertCircle, LoaderCircle, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  searchGasTariffs,
  type GasTariffResult,
  type GasTariffSearchErrors,
  type GasTariffSearchResponse,
  type GasTariffSearchStatus,
  validateGasTariffInput,
} from '@/lib/gas-tariff-provider';
import { trackEvent } from '@/services/ga4-tracking';

type FormSubmitEvent = Parameters<NonNullable<ComponentProps<'form'>['onSubmit']>>[0];

type GasCalculatorFormData = {
  postcode: string;
  annualConsumption: string;
  bioGasOnly: boolean;
  bonusOnly: boolean;
};

type SearchState = {
  status: GasTariffSearchStatus | 'idle' | 'loading';
  message: string;
  tariffs: GasTariffResult[];
  configured: boolean;
  source: GasTariffSearchResponse['source'] | null;
};

const INITIAL_FORM_DATA: GasCalculatorFormData = {
  postcode: '',
  annualConsumption: '',
  bioGasOnly: false,
  bonusOnly: false,
};

const INITIAL_STATE: SearchState = {
  status: 'idle',
  message: 'Geben Sie Ihre PLZ und Ihren Jahresverbrauch ein.',
  tariffs: [],
  configured: false,
  source: null,
};

function getStatusTone(status: SearchState['status']) {
  if (status === 'error') return 'border-red-200 bg-red-50 text-red-800';
  if (status === 'empty') return 'border-slate-200 bg-slate-50 text-slate-800';
  if (status === 'success') return 'border-emerald-200 bg-emerald-50 text-emerald-900';
  return 'border-blue-200 bg-blue-50 text-blue-900';
}

function formatMoney(value: number) {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 2,
  }).format(value);
}

export default function GasCalculatorForm() {
  const [formData, setFormData] = useState<GasCalculatorFormData>(INITIAL_FORM_DATA);
  const [formErrors, setFormErrors] = useState<GasTariffSearchErrors>({});
  const [searchState, setSearchState] = useState<SearchState>(INITIAL_STATE);

  const validationSummary = useMemo(() => Object.values(formErrors).filter(Boolean), [formErrors]);

  const handleFieldChange = <Key extends keyof GasCalculatorFormData>(
    field: Key,
    value: GasCalculatorFormData[Key]
  ) => {
    setFormData((current) => ({ ...current, [field]: value }));
    setFormErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = async (event: FormSubmitEvent) => {
    event.preventDefault();

    const validation = validateGasTariffInput({
      postcode: formData.postcode,
      annualConsumption: formData.annualConsumption,
      bioGasOnly: formData.bioGasOnly,
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
      message: 'Gastarife werden geladen ...',
      tariffs: [],
      configured: false,
      source: null,
    });

    trackEvent('tariff_calculator_submit', {
      calculator_type: 'gas',
      postcode_prefix: validation.data.postcode.slice(0, 2),
      bio_gas_only: validation.data.bioGasOnly,
      bonus_only: validation.data.bonusOnly,
      annual_consumption: validation.data.annualConsumption,
    });

    try {
      const payload = await searchGasTariffs(validation.data);
      const nextStatus = payload.status;
      const nextState: SearchState = {
        status: nextStatus,
        message: payload.message ?? 'Es ist ein unerwarteter Fehler aufgetreten.',
        tariffs: payload.tariffs ?? [],
        configured: Boolean(payload.configured),
        source: payload.source ?? null,
      };

      setSearchState(nextState);
      trackEvent(`tariff_calculator_${nextStatus}`, {
        calculator_type: 'gas',
        results_count: nextState.tariffs.length,
        configured: nextState.configured,
      });
    } catch {
      setSearchState({
        status: 'error',
        message: 'Die Tarifberechnung konnte nicht ausgefuehrt werden.',
        tariffs: [],
        configured: false,
        source: null,
      });
      trackEvent('tariff_calculator_error', {
        calculator_type: 'gas',
        reason: 'network_failure',
      });
    }
  };

  return (
    <section id="gas-vergleich" className="w-full py-5 sm:py-6 md:py-8 bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-5 lg:px-6">
        <Card className="shadow-lg">
          <CardHeader className="bg-primary text-white p-5 sm:p-6">
            <CardTitle className="font-heading text-lg sm:text-xl md:text-2xl">Gastarifrechner für NRW</CardTitle>
            <p className="text-xs sm:text-sm text-white/85 mt-1.5 sm:mt-2">
              Finden Sie die besten Gastarife für Ihren Haushalt
            </p>
          </CardHeader>
          <CardContent className="p-5 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" noValidate>
              {validationSummary.length > 0 && (
                <div className={`border-l-4 p-3 sm:p-4 rounded ${getStatusTone('error')}`}>
                  <div className="flex gap-2 sm:gap-3">
                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <p className="font-semibold text-sm mb-1">Eingabefehler</p>
                      <ul className="text-xs sm:text-sm space-y-0.5">
                        {validationSummary.map((error, i) => (
                          <li key={i}>• {error}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <Label htmlFor="gas-postcode" className="font-heading font-semibold text-xs sm:text-sm">
                    Postleitzahl *
                  </Label>
                  <Input
                    id="gas-postcode"
                    type="text"
                    placeholder="z.B. 40210"
                    value={formData.postcode}
                    onChange={(e) => handleFieldChange('postcode', e.target.value)}
                    className={`text-sm ${formErrors.postcode ? 'border-red-500' : ''}`}
                  />
                  {formErrors.postcode && (
                    <p className="text-red-600 text-xs mt-1">{formErrors.postcode}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="gas-consumption" className="font-heading font-semibold text-xs sm:text-sm">
                    Jahresverbrauch (kWh) *
                  </Label>
                  <Input
                    id="gas-consumption"
                    type="number"
                    placeholder="z.B. 15000"
                    value={formData.annualConsumption}
                    onChange={(e) => handleFieldChange('annualConsumption', e.target.value)}
                    className={`text-sm ${formErrors.annualConsumption ? 'border-red-500' : ''}`}
                  />
                  {formErrors.annualConsumption && (
                    <p className="text-red-600 text-xs mt-1">{formErrors.annualConsumption}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="gas-bio"
                    checked={formData.bioGasOnly}
                    onCheckedChange={(checked) => handleFieldChange('bioGasOnly', Boolean(checked))}
                  />
                  <Label htmlFor="gas-bio" className="font-paragraph cursor-pointer text-xs sm:text-sm">
                    Nur Biogas
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="gas-bonus"
                    checked={formData.bonusOnly}
                    onCheckedChange={(checked) => handleFieldChange('bonusOnly', Boolean(checked))}
                  />
                  <Label htmlFor="gas-bonus" className="font-paragraph cursor-pointer text-xs sm:text-sm">
                    Nur mit Bonus
                  </Label>
                </div>
              </div>

              <Button
                type="submit"
                disabled={searchState.status === 'loading'}
                className="w-full bg-secondary hover:bg-secondary/90 text-black font-semibold h-10 sm:h-11 text-sm sm:text-base"
              >
                {searchState.status === 'loading' ? (
                  <>
                    <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />
                    Wird geladen...
                  </>
                ) : (
                  'Tarife vergleichen'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {searchState.status !== 'idle' && (
          <div className={`mt-4 sm:mt-5 border-l-4 p-3 sm:p-4 rounded ${getStatusTone(searchState.status)}`}>
            <div className="flex gap-2 sm:gap-3">
              {searchState.status === 'loading' && (
                <LoaderCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 animate-spin" />
              )}
              {searchState.status === 'success' && (
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 text-emerald-600" />
              )}
              {searchState.status === 'error' && (
                <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 text-red-600" />
              )}
              <div className="min-w-0">
                <p className="font-semibold text-xs sm:text-sm md:text-base">{searchState.message}</p>
                {searchState.tariffs.length > 0 && (
                  <p className="text-xs mt-1 sm:mt-2">
                    {searchState.tariffs.length} Tarife gefunden
                    {searchState.configured && ' (Konfiguriert)'}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {searchState.tariffs.length > 0 && (
          <div className="mt-4 sm:mt-5 space-y-2 sm:space-y-3">
            <h3 className="font-heading text-base sm:text-lg md:text-xl font-bold">Verfügbare Gastarife</h3>
            {searchState.tariffs.map((tariff, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className="min-w-0">
                      <h4 className="font-heading font-semibold text-sm sm:text-base">{tariff.providerName}</h4>
                      <p className="text-gray-600 text-xs truncate">{tariff.tariffName}</p>
                    </div>
                    <Badge variant="default" className="w-fit whitespace-nowrap text-xs sm:text-sm">{formatMoney(tariff.monthlyCost)}/Monat</Badge>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 text-xs sm:text-sm">
                    <div>
                      <p className="text-gray-600 text-xs">Jahrespreis</p>
                      <p className="font-semibold text-sm">{formatMoney(tariff.annualCost)}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-xs">Grundgebühr</p>
                      <p className="font-semibold text-sm">{formatMoney(tariff.basePriceMonthly)}/Monat</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-xs">Arbeitspreis</p>
                      <p className="font-semibold text-sm">{tariff.workPriceCt.toFixed(2)}¢/kWh</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-xs">Vertragslaufzeit</p>
                      <p className="font-semibold">{tariff.contractMonths} Monate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
