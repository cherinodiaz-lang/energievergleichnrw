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
import { trackFormSubmit } from '@/services/ga4-tracking';

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
    const result = await BaseCrudService.create('formsubmissions', data);

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
export function trackCTAClick(buttonName: string) {
  const { trackCTAClick: trackCTAClickGA4 } = require('@/services/ga4-tracking');
  trackCTAClickGA4(buttonName, 'cta_button');
}

/**
 * Validate form field
 */
export function validateField(
  fieldName: string,
  value: any,
  required: boolean = true
): { valid: boolean; error?: string } {
  if (required && (!value || value.toString().trim() === '')) {
    return {
      valid: false,
      error: `${fieldName} ist erforderlich`
    };
  }

  // Email validation
  if (fieldName.toLowerCase().includes('email') && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return {
        valid: false,
        error: 'Ungültige E-Mail-Adresse'
      };
    }
  }

  // Phone validation (optional, but if provided should be valid)
  if (fieldName.toLowerCase().includes('phone') && value) {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(value)) {
      return {
        valid: false,
        error: 'Ungültige Telefonnummer'
      };
    }
  }

  // Postleitzahl validation
  if (fieldName.toLowerCase().includes('postleitzahl') && value) {
    const plzRegex = /^\d{5}$/;
    if (!plzRegex.test(value.toString())) {
      return {
        valid: false,
        error: 'Postleitzahl muss 5 Ziffern sein'
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
