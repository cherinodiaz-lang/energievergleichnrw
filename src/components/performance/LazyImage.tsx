/**
 * Lazy Loading Image Component mit WebP/AVIF Support
 * Performance-optimierte Bilder mit automatischer Format-Auswahl
 */

import { useState, useEffect, useRef } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  sizes?: string;
  onLoad?: () => void;
}

export function LazyImage({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  priority = false,
  sizes,
  onLoad
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (priority || !imgRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px'
      }
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  // Generate WebP and AVIF sources
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  const avifSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.avif');

  return (
    <picture ref={imgRef}>
      {isInView && (
        <>
          {/* AVIF - best compression */}
          <source type="image/avif" srcSet={avifSrc} sizes={sizes} />
          {/* WebP - good compression, wide support */}
          <source type="image/webp" srcSet={webpSrc} sizes={sizes} />
        </>
      )}
      <img
        src={isInView ? src : ''}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
        className={`${className} ${isLoaded ? 'loaded' : 'loading'}`}
        onLoad={handleLoad}
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out'
        }}
      />
    </picture>
  );
}
