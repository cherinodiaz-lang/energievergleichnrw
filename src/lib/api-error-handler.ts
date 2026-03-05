import { analytics } from '@/services/analytics';

export class APIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public context?: Record<string, any>
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export async function handleAPIError(
  error: unknown,
  context?: Record<string, any>
): Promise<never> {
  if (error instanceof APIError) {
    analytics.trackError('api_error', error.message, {
      status_code: error.statusCode,
      ...error.context,
      ...context,
    });
    throw error;
  }

  if (error instanceof Error) {
    const apiError = new APIError(error.message, undefined, context);
    analytics.trackError('unknown_api_error', error.message, context);
    throw apiError;
  }

  const unknownError = new APIError('An unknown error occurred', undefined, context);
  analytics.trackError('unknown_error', 'Unknown error type', context);
  throw unknownError;
}

export async function fetchWithErrorHandling<T>(
  url: string,
  options?: RequestInit,
  context?: Record<string, any>
): Promise<T> {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new APIError(`HTTP ${response.status}: ${response.statusText}`, response.status, {
        url,
        ...context,
      });
    }

    return await response.json();
  } catch (error) {
    return handleAPIError(error, { url, ...context });
  }
}
