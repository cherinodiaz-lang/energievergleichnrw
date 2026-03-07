/**
 * SEO Configuration - Server-Side Redirects Only
 * 
 * ⚠️ IMPORTANT: All domain redirects are handled EXCLUSIVELY via Wix Domain Settings
 * 
 * Server-Side Configuration (Wix Dashboard):
 * 1. Go to Settings → Domains & URLs
 * 2. Set https://www.energievergleich.shop as the PRIMARY DOMAIN
 * 3. Add energievergleich.shop (non-www) as a Parked Domain with 301 Redirect to https://www.energievergleich.shop
 * 4. Add energievergleich.nrw as a Parked Domain with 301 Redirect to https://www.energievergleich.shop
 * 5. Wix automatically handles all HTTP/HTTPS redirects at the server level
 * 
 * Redirect Chain Prevention:
 * - energievergleich.shop/* → https://www.energievergleich.shop/* (1 hop)
 * - energievergleich.nrw/* → https://www.energievergleich.shop/* (1 hop)
 * - NO intermediate redirects between domains
 * 
 * This file contains ONLY canonical URL generation for SEO purposes.
 * NO client-side redirect logic is implemented here.
 */

/**
 * Get canonical URL for current page
 * Used for SEO canonical tags and structured data
 * 
 * @param pathname - The current page path (e.g., '/gewerbestrom')
 * @returns Full canonical URL pointing to energievergleich.shop
 */
export function getCanonicalUrl(pathname: string): string {
  const baseUrl = 'https://www.energievergleich.shop';
  return `${baseUrl}${pathname}`;
}
