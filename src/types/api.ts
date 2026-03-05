/**
 * API Type Definitions
 */

// EGON API Types
export interface EgonTariff {
  id: string;
  provider: string;
  name: string;
  price: number;
  priceUnit: 'kWh' | 'month' | 'year';
  basePrice: number;
  workingPrice: number;
  bonus?: number;
  contractDuration: number;
  priceGuarantee: number;
  renewableEnergy: boolean;
  localProvider: boolean;
  rating?: number;
  features: string[];
}

export interface EgonSearchParams {
  zipCode: string;
  consumption: number;
  currentProvider?: string;
  energyType: 'electricity' | 'gas';
  filters?: {
    renewableOnly?: boolean;
    maxContractDuration?: number;
    localOnly?: boolean;
  };
}

export interface EgonSearchResponse {
  tariffs: EgonTariff[];
  totalCount: number;
  averagePrice: number;
  potentialSavings: number;
}

// Analytics API Types
export interface AnalyticsEvent {
  type: 'pageview' | 'event' | 'conversion' | 'error';
  data: Record<string, any>;
  timestamp: string;
  userAgent: string;
  url: string;
  referrer: string;
}

// Form Types
export interface TariffCalculatorFormData {
  zipCode: string;
  consumption: string;
  currentProvider?: string;
  energyType: 'electricity' | 'gas';
  houseType?: 'apartment' | 'house';
  residents?: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  consent: boolean;
}

// Error Types
export interface ApiError {
  message: string;
  code?: string;
  statusCode?: number;
  details?: Record<string, any>;
}

export type ApiResponse<T> = { success: true; data: T } | { success: false; error: ApiError };
