/**
 * Form Submission Dialog Component
 * Reusable component for handling form submissions with:
 * - Privacy checkbox (GDPR compliant)
 * - Form validation
 * - Thank you state
 * - GA4 tracking (consent-safe)
 */

import { useEffect, useRef, useState, type SyntheticEvent } from 'react';
import { CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Link, useNavigate } from 'react-router-dom';
import { submitForm, trackFormSubmission, validateForm, type FormSubmissionData } from '@/services/form-submission';

export interface FormSubmissionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  formType: 'kontakt' | 'stromvergleich' | 'gasvergleich' | 'photovoltaik' | 'gewerbestrom' | 'gewerbegas';
  formData: Record<string, any>;
  requiredFields: string[];
  onSuccess?: () => void;
  title?: string;
}

export default function FormSubmissionDialog({
  isOpen,
  onClose,
  formType,
  formData,
  requiredFields,
  onSuccess,
  title = 'Anfrage senden'
}: FormSubmissionDialogProps) {
  const navigate = useNavigate();
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!isOpen || submitted) {
      return;
    }

    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
        return;
      }

      if (event.key !== 'Tab' || !dialogRef.current) {
        return;
      }

      const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );

      if (focusableElements.length === 0) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, submitted]);

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check privacy consent
    if (!privacyConsent) {
      setErrors({
        privacy: 'Sie müssen den Datenschutzhinweisen zustimmen'
      });
      return;
    }

    // Validate form
    const validation = validateForm(formData, requiredFields);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const submissionData: FormSubmissionData = {
        ...(formData as Record<string, any>),
        type: formType,
        name: String(formData.name ?? ''),
        email: String(formData.email ?? ''),
      };

      const result = await submitForm(submissionData);

      if (result.success) {
        // Track in GA4 (consent-safe)
        trackFormSubmission(formType);

        // Show thank you state
        setSubmitted(true);

        // Call success callback
        if (onSuccess) {
          onSuccess();
        }

        // Redirect to /danke after 2 seconds
        setTimeout(() => {
          handleClose();
          navigate('/danke');
        }, 2000);
      } else {
        setErrors({
          submit: result.message || 'Ein Fehler ist aufgetreten'
        });
      }
    } catch (error) {
      setErrors({
        submit: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    setPrivacyConsent(false);
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div
        ref={dialogRef}
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="form-dialog-title"
        aria-describedby="form-dialog-description"
      >
        {/* Thank You State */}
        {submitted ? (
          <div className="p-8 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>

            <div>
              <h3 className="font-heading text-2xl font-bold text-gray-900 mb-2">
                Danke! Wir melden uns kurzfristig.
              </h3>
              <p className="font-paragraph text-gray-600 mb-6">
                Ihre Anfrage wurde erfolgreich übermittelt.
              </p>
              <p className="font-paragraph text-sm text-gray-500">
                Sie werden in Kürze weitergeleitet...
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="bg-primary text-white p-6 border-b">
              <h2 id="form-dialog-title" className="font-heading text-xl font-bold">
                {title}
              </h2>
              <p id="form-dialog-description" className="text-white/80 text-sm mt-1">
                Füllen Sie das Formular aus und wir melden uns schnellstmöglich
              </p>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Error Messages */}
              {Object.keys(errors).length > 0 && (
                <div
                  className="bg-red-50 border border-red-200 rounded-lg p-4"
                  role="alert"
                  aria-live="assertive"
                >
                  {Object.entries(errors).map(([field, error]) => (
                    <div key={field} className="flex items-start gap-2 text-red-700 text-sm mb-2 last:mb-0">
                      <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Privacy Checkbox */}
              <div className="border-t pt-4">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="privacy-consent"
                    checked={privacyConsent}
                    onCheckedChange={(checked) => {
                      setPrivacyConsent(checked as boolean);
                      if (checked) {
                        const newErrors = { ...errors };
                        delete newErrors.privacy;
                        setErrors(newErrors);
                      }
                    }}
                    className="mt-1"
                    aria-invalid={Boolean(errors.privacy)}
                    aria-describedby={errors.privacy ? 'privacy-consent-error' : undefined}
                  />
                  <Label
                    htmlFor="privacy-consent"
                    className="font-paragraph text-sm text-gray-700 cursor-pointer"
                  >
                    Mit Absenden akzeptierst du die{' '}
                    <Link
                      to="https://www.energievergleich.shop/datenschutz"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-bold"
                    >
                      Datenschutzerklärung
                    </Link>
                    . *
                  </Label>
                </div>
                {errors.privacy && (
                  <p
                    id="privacy-consent-error"
                    className="text-red-600 text-xs mt-2 ml-7"
                    aria-live="polite"
                  >
                    {errors.privacy}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 h-12 font-bold rounded-lg mt-6"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                    Wird gesendet...
                  </>
                ) : (
                  'Anfrage senden'
                )}
              </Button>

              {/* Close Button */}
              <Button
                ref={closeButtonRef}
                type="button"
                variant="outline"
                onClick={handleClose}
                className="w-full"
              >
                Abbrechen
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
