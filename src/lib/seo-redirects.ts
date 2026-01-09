/**
 * SEO Redirects Configuration
 * NOTE: Domain redirects (energievergleich.shop -> energievergleich.nrw) should be handled
 * via Wix Domain Settings and Server-side Redirects, NOT client-side.
 * This file is kept for reference only.
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
