/**
 * TypeScript Type Definitions für EGON API
 * Vollständige Type Safety für alle API-Responses
 */

// Base Response Interface
export interface EgonBaseResponse<T = unknown> {
  result?: T;
  error?: {
    code: string;
    message: string;
  };
  status: 'success' | 'error';
}

// City Response
export interface EgonCity {
  city: string;
  zip: string;
}

export interface EgonCitiesResponse extends EgonBaseResponse<EgonCity[]> {}

// Street Response
export interface EgonStreet {
  street: string;
}

export interface EgonStreetsResponse extends EgonBaseResponse<EgonStreet[]> {}

// Rate Response
export interface EgonRate {
  rateId: string;
  rateName: string;
  providerName: string;
  providerId: string;
  totalPrice: number;
  basePriceYear: number;
  basePriceMonth: number;
  workPrice: number; // ct/kWh
  eco?: boolean;
  renewable?: boolean;
  runtime?: number; // Monate
  priceGuarantee?: number; // Monate
  bonus?: number;
  bonusNewCustomer?: number;
  cancellationPeriod?: number; // Tage
}

export interface EgonRatesResponse extends EgonBaseResponse<EgonRate[]> {
  requestId?: string;
  timestamp?: string;
}

// Request Interfaces
export interface EgonRateRequest {
  zip: string;
  city: string;
  street: string;
  houseNumber: string;
  consum: string | number;
  product?: 'electricity' | 'gas';
}

// API Error Types
export class EgonApiError extends Error {
  constructor(
    message: string,
    public code?: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = 'EgonApiError';
  }
}
