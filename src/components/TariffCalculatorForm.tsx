import { useState, useCallback, useMemo } from 'react';
import { useDebounce } from '@/lib/hooks/useDebounce';
import { validateZipCode, sanitizeInput } from '@/lib/utils/validation';
import type { EgonCity, EgonStreet, EgonRate, EgonRatesResponse } from '@/types/egon';
import egonApi from '../services/egonApi';

interface FormState {
  step: number;
  zip: string;
  city: string;
  street: string;
  houseNumber: string;
  consum: string;
}

interface LoadingState {
  cities: boolean;
  streets: boolean;
  rates: boolean;
}

export default function TariffCalculatorForm() {
  // Form State mit TypeScript
  const [formState, setFormState] = useState<FormState>({
    step: 1,
    zip: '',
    city: '',
    street: '',
    houseNumber: '',
    consum: '2500'
  });

  // Data State
  const [cities, setCities] = useState<EgonCity[]>([]);
  const [streets, setStreets] = useState<EgonStreet[]>([]);
  const [rates, setRates] = useState<EgonRatesResponse | null>(null);
  
  // UI State
  const [loading, setLoading] = useState<LoadingState>({
    cities: false,
    streets: false,
    rates: false
  });
  const [error, setError] = useState<string | null>(null);

  // Debounced zip code für bessere UX
  const debouncedZip = useDebounce(formState.zip, 300);

  // Validation mit useMemo
  const validation = useMemo(() => ({
    isZipValid: validateZipCode(debouncedZip),
    isCityValid: formState.city.length > 0,
    isStreetValid: formState.street.length > 0,
    isHouseNumberValid: formState.houseNumber.length > 0,
    isConsumValid: parseInt(formState.consum) > 0 && parseInt(formState.consum) <= 50000
  }), [debouncedZip, formState]);

  // Optimized State Updater mit useCallback
  const updateFormField = useCallback(<K extends keyof FormState>(
    field: K,
    value: FormState[K]
  ) => {
    setFormState(prev => ({
      ...prev,
      [field]: sanitizeInput(String(value))
    }));
    setError(null);
  }, []);

  // Schritt 1: PLZ eingeben → Städte laden
  const loadCities = useCallback(async () => {
    if (!validation.isZipValid) {
      setError('Bitte geben Sie eine gültige 5-stellige PLZ ein.');
      return;
    }

    setLoading(prev => ({ ...prev, cities: true }));
    setError(null);
    
    try {
      const data = await egonApi.getCities(debouncedZip);
      
      if (!data?.result || data.result.length === 0) {
        throw new Error('Keine Städte für diese PLZ gefunden.');
      }

      setCities(data.result);
      
      // Auto-select wenn nur eine Stadt
      if (data.result.length === 1) {
        updateFormField('city', data.result[0].city);
      }
      
      updateFormField('step', 2);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unbekannter Fehler';
      setError(`Fehler beim Laden der Städte: ${errorMessage}`);
    } finally {
      setLoading(prev => ({ ...prev, cities: false }));
    }
  }, [validation.isZipValid, debouncedZip, updateFormField]);

  // Schritt 2: Stadt wählen → Straßen laden
  const loadStreets = useCallback(async () => {
    if (!validation.isCityValid) {
      setError('Bitte wählen Sie eine Stadt aus.');
      return;
    }

    setLoading(prev => ({ ...prev, streets: true }));
    setError(null);
    
    try {
      const data = await egonApi.getStreets(formState.zip, formState.city);
      
      if (!data?.result || data.result.length === 0) {
        throw new Error('Keine Straßen für diese Stadt gefunden.');
      }

      setStreets(data.result);
      updateFormField('step', 3);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unbekannter Fehler';
      setError(`Fehler beim Laden der Straßen: ${errorMessage}`);
    } finally {
      setLoading(prev => ({ ...prev, streets: false }));
    }
  }, [validation.isCityValid, formState.zip, formState.city, updateFormField]);

  // Schritt 3: Tarife laden mit vollständiger Validierung
  const loadRates = useCallback(async () => {
    const validations = [
      { check: validation.isStreetValid, message: 'Bitte wählen Sie eine Straße aus.' },
      { check: validation.isHouseNumberValid, message: 'Bitte geben Sie eine Hausnummer ein.' },
      { check: validation.isConsumValid, message: 'Bitte geben Sie einen gültigen Verbrauch ein (1-50000 kWh).' }
    ];

    const failedValidation = validations.find(v => !v.check);
    if (failedValidation) {
      setError(failedValidation.message);
      return;
    }

    setLoading(prev => ({ ...prev, rates: true }));
    setError(null);
    
    try {
      const data = await egonApi.getRates({
        zip: formState.zip,
        city: formState.city,
        street: formState.street,
        houseNumber: formState.houseNumber,
        consum: formState.consum
      });

      if (!data?.result || data.result.length === 0) {
        throw new Error('Keine Tarife für diese Adresse gefunden.');
      }

      setRates(data);
      updateFormField('step', 4);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unbekannter Fehler';
      setError(`Fehler beim Laden der Tarife: ${errorMessage}`);
    } finally {
      setLoading(prev => ({ ...prev, rates: false }));
    }
  }, [
    validation,
    formState.zip,
    formState.city,
    formState.street,
    formState.houseNumber,
    formState.consum,
    updateFormField
  ]);

  // Keyboard Navigation Support
  const handleKeyPress = useCallback((e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      action();
    }
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Energie-Tarifrechner
      </h2>

      {/* Error Display mit besserer UX */}
      {error && (
        <div 
          role="alert"
          aria-live="polite"
          className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-start gap-3"
        >
          <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {/* Schritt 1: PLZ */}
      {formState.step >= 1 && (
        <div className="mb-6">
          <label htmlFor="zip" className="block text-sm font-semibold mb-2 text-gray-700">
            Postleitzahl *
          </label>
          <input
            id="zip"
            type="text"
            value={formState.zip}
            onChange={(e) => updateFormField('zip', e.target.value)}
            onKeyPress={(e) => handleKeyPress(e, loadCities)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="z.B. 01067"
            maxLength={5}
            pattern="[0-9]{5}"
            aria-required="true"
            aria-invalid={!validation.isZipValid && formState.zip.length > 0}
            aria-describedby="zip-hint"
          />
          <p id="zip-hint" className="mt-1 text-sm text-gray-500">
            Bitte geben Sie Ihre 5-stellige Postleitzahl ein
          </p>
          <button
            onClick={loadCities}
            disabled={loading.cities || !validation.isZipValid}
            className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2"
            aria-label="Städte für PLZ laden"
          >
            {loading.cities ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Lädt Städte...</span>
              </>
            ) : (
              'Städte laden'
            )}
          </button>
        </div>
      )}

      {/* Schritt 2: Stadt */}
      {formState.step >= 2 && cities.length > 0 && (
        <div className="mb-6">
          <label htmlFor="city" className="block text-sm font-semibold mb-2 text-gray-700">
            Stadt *
          </label>
          {cities.length === 1 ? (
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800">
              {formState.city}
            </div>
          ) : (
            <select
              id="city"
              value={formState.city}
              onChange={(e) => updateFormField('city', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              aria-required="true"
            >
              <option value="">Bitte wählen Sie eine Stadt</option>
              {cities.map((c) => (
                <option key={c.city} value={c.city}>
                  {c.city}
                </option>
              ))}
            </select>
          )}
          <button
            onClick={loadStreets}
            disabled={loading.streets || !validation.isCityValid}
            className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2"
            aria-label="Straßen für Stadt laden"
          >
            {loading.streets ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Lädt Straßen...</span>
              </>
            ) : (
              'Straßen laden'
            )}
          </button>
        </div>
      )}

      {/* Schritt 3: Straße, Hausnummer & Verbrauch */}
      {formState.step >= 3 && streets.length > 0 && (
        <div className="mb-6 space-y-4">
          <div>
            <label htmlFor="street" className="block text-sm font-semibold mb-2 text-gray-700">
              Straße *
            </label>
            <select
              id="street"
              value={formState.street}
              onChange={(e) => updateFormField('street', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              aria-required="true"
            >
              <option value="">Bitte wählen Sie eine Straße</option>
              {streets.map((s) => (
                <option key={s.street} value={s.street}>
                  {s.street}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="houseNumber" className="block text-sm font-semibold mb-2 text-gray-700">
              Hausnummer *
            </label>
            <input
              id="houseNumber"
              type="text"
              value={formState.houseNumber}
              onChange={(e) => updateFormField('houseNumber', e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, loadRates)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="z.B. 15"
              aria-required="true"
            />
          </div>

          <div>
            <label htmlFor="consum" className="block text-sm font-semibold mb-2 text-gray-700">
              Jahresverbrauch (kWh) *
            </label>
            <input
              id="consum"
              type="number"
              value={formState.consum}
              onChange={(e) => updateFormField('consum', e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, loadRates)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="z.B. 2500"
              min="1"
              max="50000"
              aria-required="true"
              aria-describedby="consum-hint"
            />
            <p id="consum-hint" className="mt-1 text-sm text-gray-500">
              Durchschnitt: 1-Personen-Haushalt ~2.000 kWh, 4-Personen-Haushalt ~4.000 kWh
            </p>
          </div>

          <button
            onClick={loadRates}
            disabled={
              loading.rates ||
              !validation.isStreetValid ||
              !validation.isHouseNumberValid ||
              !validation.isConsumValid
            }
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-4 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2 text-lg"
            aria-label="Tarife vergleichen"
          >
            {loading.rates ? (
              <>
                <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Vergleiche Tarife...</span>
              </>
            ) : (
              <>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span>Tarife jetzt vergleichen</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Schritt 4: Ergebnisse mit besserer Darstellung */}
      {formState.step >= 4 && rates && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-800">
              Ihre Top-Tarife
            </h3>
            <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-semibold">
              {rates.result?.length || 0} Tarife gefunden
            </span>
          </div>

          <div className="space-y-4" role="list" aria-label="Tarifvergleich Ergebnisse">
            {rates.result?.slice(0, 5).map((rate, index) => (
              <article
                key={rate.rateId}
                className="p-6 border-2 border-gray-200 rounded-xl bg-gradient-to-br from-white to-gray-50 hover:shadow-lg transition-shadow duration-200"
                role="listitem"
                aria-label={`Tarif ${index + 1}: ${rate.rateName} von ${rate.providerName}`}
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    {index === 0 && (
                      <span className="inline-block px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full mb-2">
                        BESTER PREIS
                      </span>
                    )}
                    <h4 className="font-bold text-xl text-gray-900 mb-1">
                      {rate.rateName}
                    </h4>
                    <p className="text-gray-600 font-medium">
                      {rate.providerName}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-green-600">
                      {rate.totalPrice?.toFixed(2)} €
                    </p>
                    <p className="text-sm text-gray-500 font-medium">
                      pro Jahr
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200 flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-700">Grundpreis:</span>
                    <span className="text-gray-600">{rate.basePriceYear?.toFixed(2)} €/Jahr</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-700">Arbeitspreis:</span>
                    <span className="text-gray-600">{rate.workPrice} ct/kWh</span>
                  </div>
                </div>

                <button
                  className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
                  aria-label={`Tarif ${rate.rateName} abschließen`}
                >
                  Jetzt abschließen
                </button>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
