/**
 * SEO Configuration - Server-Side Redirects Only
 * 
 * ⚠️ IMPORTANT: All domain redirects are handled EXCLUSIVELY via Wix Domain Settings
 * 
 * Server-Side Configuration (Wix Dashboard):
 * 1. Go to Settings → Domains & URLs
 * 2. Set energievergleich.shop as the PRIMARY DOMAIN
 * 3. Add energievergleich.nrw as a Parked Domain with 301 Redirect to energievergleich.shop
 * 4. Wix automatically handles all HTTP/HTTPS redirects at the server level
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
