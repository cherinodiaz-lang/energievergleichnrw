/**
 * Astro Middleware
 * Aktiviert Security Headers für alle Requests
 */

import { sequence } from 'astro:middleware';
import { securityHeaders } from './security';

// Weitere Middleware können hier hinzugefügt werden
export const onRequest = sequence(
  securityHeaders
  // rateLimiter,
  // authentication,
  // logging
);
