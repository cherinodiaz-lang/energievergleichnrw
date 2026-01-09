/**
 * Form Submission Service
 * Handles all form submissions to Wix Collections
 * Integrates with email automations and GA4 tracking
 */

import { BaseCrudService } from '@/integrations';

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

    // Track event in GA4 if available
    trackFormSubmission(data.type, data.email);

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
 * Track form submission in GA4
 */
export function trackFormSubmission(formType: string, email: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'form_submit', {
      form_type: formType,
      user_email: email,
      timestamp: new Date().toISOString()
    });
  }
}

/**
 * Track CTA button clicks in GA4
 */
export function trackCTAClick(buttonName: string, location: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'cta_click', {
      button_name: buttonName,
      page_location: location,
      timestamp: new Date().toISOString()
    });
  }
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
