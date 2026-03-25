/**
 * Image Optimization Utilities
 * Handles lazy loading, responsive images, and performance optimization
 */

export const IMAGE_SIZES = {
  hero: { width: 1920, height: 1024 },
  card: { width: 400, height: 225 },
  icon: { width: 64, height: 64 },
  thumbnail: { width: 300, height: 200 },
} as const;

/**
 * Determine if an image should be lazy-loaded
 * Hero/LCP images should NOT be lazy-loaded
 */
export const shouldLazyLoad = (imageType: 'hero' | 'card' | 'icon' | 'thumbnail' | 'default'): boolean => {
  // Hero images are above-the-fold and should use priority loading
  if (imageType === 'hero') return false;

  // All other images can be lazy-loaded
  return true;
};

/**
 * Get image loading attribute
 */
export const getImageLoading = (imageType: 'hero' | 'card' | 'icon' | 'thumbnail' | 'default'): 'eager' | 'lazy' => {
  return shouldLazyLoad(imageType) ? 'lazy' : 'eager';
};

/**
 * Optimize image URL for WebP/AVIF support
 * Note: Wix CDN handles format negotiation automatically
 */
export const optimizeImageUrl = (url: string, _width?: number, _height?: number): string => {
  if (!url) return '';

  // If it's a Wix static URL, it's already optimized
  if (url.includes('wixstatic.com')) {
    return url;
  }

  return url;
};
