/**
 * SEO Redirects Configuration
 * Handles 301 redirects for domain variations and URL canonicalization
 */

export const SEO_REDIRECTS = {
  // Domain redirects (.shop -> .nrw)
  'energievergleich.shop': 'https://energievergleich.nrw',
  'www.energievergleich.shop': 'https://energievergleich.nrw',
  
  // WWW redirects (optional - uncomment if needed)
  // 'www.energievergleich.nrw': 'https://energievergleich.nrw',
};

/**
 * Check if current domain needs redirect
 * This function should be called on app initialization
 */
export function checkAndApplyRedirects() {
  const currentHost = window.location.hostname;
  
  // Check if current host matches any redirect rule
  for (const [fromDomain, toUrl] of Object.entries(SEO_REDIRECTS)) {
    if (currentHost === fromDomain || currentHost === fromDomain.replace('www.', '')) {
      // Perform 301 redirect
      window.location.href = toUrl + window.location.pathname + window.location.search + window.location.hash;
      return;
    }
  }
}

/**
 * Generate canonical URL for current page
 */
export function getCanonicalUrl(pathname: string): string {
  const baseUrl = 'https://energievergleich.nrw';
  return `${baseUrl}${pathname}`;
}

/**
 * Ensure all links use the canonical domain
 */
export function normalizeUrl(url: string): string {
  if (!url.startsWith('http')) {
    return url; // Relative URL, return as-is
  }
  
  // Replace any non-canonical domains with canonical domain
  return url.replace(/https?:\/\/(www\.)?energievergleich\.(shop|de|com)/, 'https://energievergleich.nrw');
}
