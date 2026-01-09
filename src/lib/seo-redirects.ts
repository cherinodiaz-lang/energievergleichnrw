/**
 * SEO Redirects Configuration
 * 
 * IMPORTANT: Domain redirects (energievergleich.shop -> energievergleich.nrw) are handled
 * via Wix Domain Settings with 301 redirects, NOT client-side.
 * 
 * Configuration Steps in Wix Dashboard:
 * 1. Go to Settings → Domains & URLs
 * 2. Set energievergleich.nrw as the PRIMARY DOMAIN
 * 3. Add energievergleich.shop as a Parked Domain with 301 Redirect to energievergleich.nrw
 * 4. In Google Search Console:
 *    - Add both domains as properties
 *    - Set energievergleich.nrw as the preferred domain
 *    - Remove energievergleich.shop from indexing
 * 5. Update robots.txt and sitemap.xml to reference energievergleich.nrw only
 */

/**
 * Get canonical URL for current page
 */
export function getCanonicalUrl(pathname: string): string {
  const baseUrl = 'https://energievergleich.nrw';
  return `${baseUrl}${pathname}`;
}

/**
 * Normalize URL to canonical domain
 */
export function normalizeUrl(url: string): string {
  if (!url.startsWith('http')) {
    return url; // Relative URL, return as-is
  }
  
  // Replace any non-canonical domains with canonical domain
  return url.replace(/https?:\/\/(www\.)?energievergleich\.(shop|de|com)/, 'https://energievergleich.nrw');
}

/**
 * Check for redirects on app initialization
 * NOTE: This function is deprecated. Use Wix server-side redirects instead.
 */
export function checkAndApplyRedirects() {
  // Server-side redirects should handle domain redirects
  // This is kept for backwards compatibility but should not be used
  console.log('Note: Domain redirects should be configured via Wix Domain Settings');
}
