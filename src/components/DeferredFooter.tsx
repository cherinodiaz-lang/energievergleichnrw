import { lazy, Suspense, useEffect, useRef, useState } from 'react';

const Footer = lazy(() => import('@/components/Footer'));

export default function DeferredFooter() {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (shouldRender) {
      return;
    }

    const node = sentinelRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setShouldRender(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: '320px 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [shouldRender]);

  return (
    <div ref={sentinelRef}>
      {shouldRender ? (
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      ) : (
        <div aria-hidden="true" className="min-h-px" />
      )}
    </div>
  );
}
