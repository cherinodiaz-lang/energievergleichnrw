/**
 * Security Middleware für Astro
 * Implementiert alle wichtigen Security Headers
 */

import type { MiddlewareHandler } from 'astro';

export const securityHeaders: MiddlewareHandler = async (context, next) => {
  const response = await next();

  // Content Security Policy
  response.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https: blob:",
      "connect-src 'self' https://www.google-analytics.com https://analytics.google.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'"
    ].join('; ')
  );

  // HTTP Strict Transport Security (HSTS)
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload'
  );

  // X-Frame-Options (Clickjacking Protection)
  response.headers.set('X-Frame-Options', 'DENY');

  // X-Content-Type-Options (MIME-Sniffing Protection)
  response.headers.set('X-Content-Type-Options', 'nosniff');

  // X-XSS-Protection
  response.headers.set('X-XSS-Protection', '1; mode=block');

  // Referrer Policy
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Permissions Policy
  response.headers.set(
    'Permissions-Policy',
    'geolocation=(), microphone=(), camera=()'
  );

  // Cross-Origin Policies
  response.headers.set('Cross-Origin-Embedder-Policy', 'require-corp');
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  response.headers.set('Cross-Origin-Resource-Policy', 'same-origin');

  return response;
};
