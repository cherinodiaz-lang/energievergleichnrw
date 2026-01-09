/**
 * SEO Redirects Configuration
 * 
 * IMPORTANT: Domain redirects (energievergleich.nrw -> energievergleich.shop) are handled
 * via Wix Domain Settings with 301 redirects, NOT client-side.
 * 
 * Configuration Steps in Wix Dashboard:
 * 1. Go to Settings → Domains & URLs
 * 2. Set energievergleich.shop as the PRIMARY DOMAIN
 * 3. Add energievergleich.nrw as a Parked Domain with 301 Redirect to energievergleich.shop
 * 4. In Google Search Console:
 *    - Add both domains as properties
 *    - Set energievergleich.shop as the preferred domain
 *    - Remove energievergleich.nrw from indexing
 * 5. Update robots.txt and sitemap.xml to reference energievergleich.shop only
 */

/**
 * Get canonical URL for current page
 */
export function getCanonicalUrl(pathname: string): string {
  const baseUrl = 'https://energievergleich.shop';
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
  return url.replace(/https?:\/\/(www\.)?energievergleich\.(nrw|de|com)/, 'https://energievergleich.shop');
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
