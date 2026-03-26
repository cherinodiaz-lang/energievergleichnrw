/**
 * Form Validation Utility
 * Provides consistent validation rules and German error messages for all lead forms
 */

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

export interface FormFieldConfig {
  name: string;
  required: boolean;
  type?: 'email' | 'phone' | 'plz' | 'number' | 'text';
}

// German error messages
const ERROR_MESSAGES: Record<string, string> = {
  required: 'Dieses Feld ist erforderlich.',
  email: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
  phone: 'Bitte geben Sie eine gültige Telefonnummer ein.',
  plz: 'Postleitzahl muss 5 Ziffern sein.',
  number: 'Bitte geben Sie eine gültige Zahl ein.',
};

/**
 * Validate a single field
 */
export function validateField(
  _fieldName: string,
  value: unknown,
  fieldType: 'email' | 'phone' | 'plz' | 'number' | 'text' = 'text'
): { valid: boolean; error?: string } {
  // Check if empty
  const trimmedValue = value != null ? String(value).trim() : '';
  if (trimmedValue === '') {
    return {
      valid: false,
      error: ERROR_MESSAGES.required
    };
  }

  // Email validation
  if (fieldType === 'email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedValue)) {
      return {
        valid: false,
        error: ERROR_MESSAGES.email
      };
    }
  }

  // Phone validation
  if (fieldType === 'phone') {
    const phoneRegex = /^[\d\s\-\+\(\)]{7,}$/;
    if (!phoneRegex.test(trimmedValue)) {
      return {
        valid: false,
        error: ERROR_MESSAGES.phone
      };
    }
  }

  // PLZ validation (5 digits)
  if (fieldType === 'plz') {
    const plzRegex = /^\d{5}$/;
    if (!plzRegex.test(trimmedValue)) {
      return {
        valid: false,
        error: ERROR_MESSAGES.plz
      };
    }
  }

  // Number validation
  if (fieldType === 'number') {
    if (isNaN(Number(trimmedValue)) || Number(trimmedValue) <= 0) {
      return {
        valid: false,
        error: ERROR_MESSAGES.number
      };
    }
  }

  return { valid: true };
}

/**
 * Validate entire form
 */
export function validateFormFields(
  formData: Record<string, unknown>,
  fieldConfigs: FormFieldConfig[]
): ValidationResult {
  const errors: Record<string, string> = {};

  for (const config of fieldConfigs) {
    if (config.required) {
      const validation = validateField(
        config.name,
        formData[config.name],
        config.type || 'text'
      );
      if (!validation.valid && validation.error) {
        errors[config.name] = validation.error;
      }
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Form field configurations for each form type
 */
export const FORM_CONFIGS = {
  // Private forms: PLZ, Verbrauch/Auswahl, Name, E-Mail, Telefon optional
  private: [
    { name: 'postleitzahl', required: true, type: 'plz' as const },
    { name: 'verbrauch', required: true, type: 'text' as const },
    { name: 'name', required: true, type: 'text' as const },
    { name: 'email', required: true, type: 'email' as const },
    { name: 'phone', required: false, type: 'phone' as const },
  ] as FormFieldConfig[],

  // PV forms: PLZ, Name, E-Mail, Telefon optional, Dach-Info optional
  photovoltaik: [
    { name: 'plz', required: true, type: 'plz' as const },
    { name: 'name', required: true, type: 'text' as const },
    { name: 'email', required: true, type: 'email' as const },
    { name: 'phone', required: false, type: 'phone' as const },
    { name: 'dachform', required: false, type: 'text' as const },
  ] as FormFieldConfig[],

  // Commercial forms: PLZ, Verbrauch kWh, Name, E-Mail, Telefon optional, Firma optional
  commercial: [
    { name: 'postcode', required: true, type: 'plz' as const },
    { name: 'consumption', required: true, type: 'number' as const },
    { name: 'contactPerson', required: true, type: 'text' as const },
    { name: 'email', required: true, type: 'email' as const },
    { name: 'phone', required: false, type: 'phone' as const },
    { name: 'companyName', required: false, type: 'text' as const },
  ] as FormFieldConfig[],

  // Contact form: Name, E-Mail, Telefon optional
  contact: [
    { name: 'name', required: true, type: 'text' as const },
    { name: 'email', required: true, type: 'email' as const },
    { name: 'phone', required: false, type: 'phone' as const },
  ] as FormFieldConfig[],
};
