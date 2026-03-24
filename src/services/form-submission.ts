/**
 * Form Submission Service
 * Handles all form submissions to Wix Collections
 * Integrates with GA4 tracking (consent-safe)
 * 
 * IMPORTANT: All tracking goes through GA4 only.
 * No PII (email, name, phone) is sent to analytics.
 * Events are only tracked after Analytics consent is granted.
 */

import { BaseCrudService } from '@/integrations';
import { trackFormSubmit, trackCTAClick as trackCTAClickGA4, trackMethodikClick as trackMethodikClickGA4 } from '@/services/ga4-tracking';

export interface FormSubmissionData {
  _id?: string;
  type: 'kontakt' | 'stromvergleich' | 'gasvergleich' | 'photovoltaik' | 'gewerbestrom' | 'gewerbegas';
  name: string;
  email: string;
  phone?: string;
  message?: string;
  postleitzahl?: string;
  verbrauch?: string;
  [key: string]: any;
  _createdDate?: Date;
  _updatedDate?: Date;
}

export interface FormSubmissionResponse {
  success: boolean;
  message: string;
  submissionId?: string;
  error?: string;
}

/**
 * Submit form data to Wix Collection
 * Automatically triggers email automations
 */
export async function submitForm(
  data: FormSubmissionData
): Promise<FormSubmissionResponse> {
  try {
    // Validate required fields
    if (!data.name || !data.email || !data.type) {
      return {
        success: false,
        message: 'Erforderliche Felder fehlen',
        error: 'Missing required fields: name, email, type'
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return {
        success: false,
        message: 'Ungültige E-Mail-Adresse',
        error: 'Invalid email format'
      };
    }

    // Generate unique ID if not provided
    if (!data._id) {
      data._id = crypto.randomUUID();
    }

    // Add timestamp
    data._createdDate = new Date();

    // Submit to Wix Collection
    // Note: Collection ID should be 'formsubmissions' or similar
    // This will trigger automations configured in Wix Dashboard
    await BaseCrudService.create('formsubmissions', data);

    // Track event in GA4 (consent-safe) - NO PII included
    trackFormSubmit(data.type);

    return {
      success: true,
      message: 'Vielen Dank für Ihre Anfrage! Wir werden uns in Kürze bei Ihnen melden.',
      submissionId: data._id
    };
  } catch (error) {
    console.error('Form submission error:', error);
    return {
      success: false,
      message: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Track form submission in GA4 (consent-safe)
 * NO PII is included - only form_type, page_location, and timestamp
 */
export function trackFormSubmission(formType: string) {
  trackFormSubmit(formType);
}

/**
 * Track CTA button clicks (consent-safe)
 */
export function trackCTAClick(ctaLabel: string) {
  trackCTAClickGA4(ctaLabel);
}

/**
 * Track Methodik link clicks (consent-safe)
 */
export function trackMethodikClick() {
  trackMethodikClickGA4();
}

/**
 * Validate form field with custom error messages
 */
export function validateField(
  fieldName: string,
  value: any,
  required: boolean = true,
  customErrorMessage?: string
): { valid: boolean; error?: string } {
  if (required && (!value || value.toString().trim() === '')) {
    return {
      valid: false,
      error: customErrorMessage || `${fieldName} ist erforderlich`
    };
  }

  // Email validation
  if (fieldName.toLowerCase().includes('email') && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return {
        valid: false,
        error: 'Bitte eine gültige E-Mail-Adresse eingeben.'
      };
    }
  }

  // Phone validation (optional, but if provided should be valid)
  if (fieldName.toLowerCase().includes('phone') && value) {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(value)) {
      return {
        valid: false,
        error: 'Bitte eine gültige Telefonnummer eingeben.'
      };
    }
  }

  // Postleitzahl validation
  if (fieldName.toLowerCase().includes('plz') && value) {
    const plzRegex = /^\d{5}$/;
    if (!plzRegex.test(value.toString())) {
      return {
        valid: false,
        error: 'Bitte eine gültige PLZ eingeben.'
      };
    }
  }

  // Verbrauch validation (kWh)
  if (fieldName.toLowerCase().includes('verbrauch') && value) {
    const verbrauchNum = parseFloat(value);
    if (isNaN(verbrauchNum) || verbrauchNum <= 0) {
      return {
        valid: false,
        error: 'Bitte einen gültigen Verbrauch eingeben.'
      };
    }
  }

  return { valid: true };
}

/**
 * Validate entire form
 */
export function validateForm(
  formData: Record<string, any>,
  requiredFields: string[]
): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  for (const field of requiredFields) {
    const validation = validateField(field, formData[field], true);
    if (!validation.valid && validation.error) {
      errors[field] = validation.error;
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}
