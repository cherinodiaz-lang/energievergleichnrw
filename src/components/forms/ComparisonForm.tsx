import { useState, useCallback, useMemo, Suspense, lazy } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { analytics } from '@/services/analytics';

const Button = lazy(() => import('@/components/ui/Button'));
const Select = lazy(() => import('@/components/ui/Select'));

const formSchema = z.object({
  zipCode: z.string().min(5, 'PLZ muss 5 Ziffern haben').max(5),
  consumption: z.number().min(500, 'Mindestens 500 kWh').max(50000, 'Maximal 50.000 kWh'),
  currentProvider: z.string().optional(),
  contractType: z.enum(['strom', 'gas', 'beide']).default('strom'),
});

type FormData = z.infer<typeof formSchema>;

interface ComparisonFormProps {
  city?: string;
  initialValues?: Partial<FormData>;
  onSuccess?: (data: FormData) => void;
}

export function ComparisonForm({ city, initialValues, onSuccess }: ComparisonFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    defaultValues: initialValues,
  });
  
  const consumption = watch('consumption');
  
  const estimatedSavings = useMemo(() => {
    if (!consumption || consumption < 500) return 0;
    return Math.round(consumption * 0.15);
  }, [consumption]);
  
  const onSubmit = useCallback(async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    analytics.track('form_submit_start', {
      city: city,
      form_type: 'comparison',
      contract_type: data.contractType,
    });
    
    try {
      const response = await fetch('/api/submit-comparison', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, city }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const result = await response.json();
      
      setSubmitStatus('success');
      analytics.trackFormSubmit('comparison', true, city);
      
      onSuccess?.(data);
      
      setTimeout(() => {
        reset();
        setSubmitStatus('idle');
      }, 3000);
      
    } catch (error) {
      setSubmitStatus('error');
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      analytics.trackFormSubmit('comparison', false, city);
      analytics.trackError('form_submission', errorMessage, {
        form_type: 'comparison',
        city: city,
        contract_type: data.contractType,
      });
      
      if (typeof window !== 'undefined' && window.location.search.includes('debug=1')) {
        console.error('[Form Error]', error);
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [city, reset, onSuccess]);
  
  const formClasses = useMemo(
    () => ({
      container: 'space-y-6 max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg',
      field: 'space-y-2',
      label: 'block text-sm font-medium text-gray-700',
      input: 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all',
      inputError: 'border-red-500 focus:ring-red-500',
      error: 'text-sm text-red-600 mt-1 flex items-center gap-1',
      button: 'w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium',
      savings: 'p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 font-medium',
    }),
    []
  );
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={formClasses.container} aria-label="Energievergleich Formular">
      <div className="mb-4">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {city ? `Energieanbieter in ${city} vergleichen` : 'Energieanbieter vergleichen'}
        </h3>
        <p className="text-gray-600">Finden Sie in wenigen Schritten den besten Tarif</p>
      </div>
      
      {/* Contract Type */}
      <div className={formClasses.field}>
        <label htmlFor="contractType" className={formClasses.label}>
          Was möchten Sie vergleichen?
        </label>
        <Suspense fallback={<div className="h-12 bg-gray-100 animate-pulse rounded-lg" />}>
          <select
            id="contractType"
            className={formClasses.input}
            {...register('contractType')}
            aria-required="true"
          >
            <option value="strom">Strom</option>
            <option value="gas">Gas</option>
            <option value="beide">Strom & Gas</option>
          </select>
        </Suspense>
      </div>
      
      {/* ZIP Code */}
      <div className={formClasses.field}>
        <label htmlFor="zipCode" className={formClasses.label}>
          Postleitzahl *
        </label>
        <input
          id="zipCode"
          type="text"
          inputMode="numeric"
          pattern="[0-9]{5}"
          placeholder="z.B. 50667"
          maxLength={5}
          className={`${formClasses.input} ${errors.zipCode ? formClasses.inputError : ''}`}
          {...register('zipCode')}
          aria-invalid={errors.zipCode ? 'true' : 'false'}
          aria-describedby={errors.zipCode ? 'zipCode-error' : undefined}
          aria-required="true"
        />
        {errors.zipCode && (
          <p id="zipCode-error" className={formClasses.error} role="alert">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {errors.zipCode.message}
          </p>
        )}
      </div>
      
      {/* Consumption */}
      <div className={formClasses.field}>
        <label htmlFor="consumption" className={formClasses.label}>
          Jahresverbrauch (kWh) *
        </label>
        <input
          id="consumption"
          type="number"
          inputMode="numeric"
          placeholder="z.B. 3500"
          min="500"
          max="50000"
          step="100"
          className={`${formClasses.input} ${errors.consumption ? formClasses.inputError : ''}`}
          {...register('consumption', { valueAsNumber: true })}
          aria-invalid={errors.consumption ? 'true' : 'false'}
          aria-describedby={errors.consumption ? 'consumption-error consumption-hint' : 'consumption-hint'}
          aria-required="true"
        />
        <p id="consumption-hint" className="text-sm text-gray-500 mt-1">
          Durchschnitt: 1-Personen-Haushalt 2.000 kWh, 4-Personen 4.000 kWh
        </p>
        {errors.consumption && (
          <p id="consumption-error" className={formClasses.error} role="alert">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {errors.consumption.message}
          </p>
        )}
      </div>
      
      {/* Current Provider */}
      <div className={formClasses.field}>
        <label htmlFor="currentProvider" className={formClasses.label}>
          Aktueller Anbieter (optional)
        </label>
        <input
          id="currentProvider"
          type="text"
          placeholder="z.B. Stadtwerke"
          className={formClasses.input}
          {...register('currentProvider')}
        />
      </div>
      
      {/* Estimated Savings */}
      {estimatedSavings > 0 && (
        <div className={formClasses.savings} role="status" aria-live="polite">
          💰 Geschätztes Sparpotenzial: bis zu {estimatedSavings}€ pro Jahr
        </div>
      )}
      
      {/* Submit Button */}
      <Suspense fallback={<div className="h-12 bg-gray-200 animate-pulse rounded-lg" />}>
        <Button
          type="submit"
          disabled={isSubmitting || !isValid}
          className={formClasses.button}
          onClick={() => analytics.trackCtaClick('Jetzt vergleichen', 'comparison_form')}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Wird gesendet...
            </span>
          ) : (
            'Jetzt kostenlos vergleichen'
          )}
        </Button>
      </Suspense>
      
      {/* Status Messages */}
      {submitStatus === 'success' && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800" role="status">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Anfrage erfolgreich gesendet!</span>
          </div>
          <p className="text-sm mt-2">Wir senden Ihnen die besten Tarife per E-Mail zu.</p>
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800" role="alert">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Fehler beim Senden</span>
          </div>
          <p className="text-sm mt-2">Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.</p>
        </div>
      )}
      
      {/* Data Privacy Notice */}
      <p className="text-xs text-gray-500 text-center mt-4">
        * Pflichtfelder. Ihre Daten werden verschlüsselt übertragen und DSGVO-konform verarbeitet.
      </p>
    </form>
  );
}