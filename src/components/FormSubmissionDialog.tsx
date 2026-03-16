/**
 * Form Submission Dialog Component
 * Reusable component for handling form submissions with:
 * - Privacy checkbox (GDPR compliant)
 * - Form validation
 * - Thank you state
 * - GA4 tracking (consent-safe)
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
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
          window.location.assign('/danke');
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
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Thank You State */}
            {submitted ? (
              <div className="p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-6"
                >
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="font-heading text-2xl font-bold text-gray-900 mb-2">
                    Danke! Wir melden uns kurzfristig.
                  </h3>
                  <p className="font-paragraph text-gray-600 mb-6">
                    Ihre Anfrage wurde erfolgreich übermittelt.
                  </p>
                  <p className="font-paragraph text-sm text-gray-500">
                    Sie werden in Kürze weitergeleitet...
                  </p>
                </motion.div>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="bg-primary text-white p-6 border-b">
                  <h2 className="font-heading text-xl font-bold">{title}</h2>
                  <p className="text-white/80 text-sm mt-1">
                    Füllen Sie das Formular aus und wir melden uns schnellstmöglich
                  </p>
                </div>

                {/* Form Content */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  {/* Error Messages */}
                  {Object.keys(errors).length > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
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
                      <p className="text-red-600 text-xs mt-2 ml-7">{errors.privacy}</p>
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
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
