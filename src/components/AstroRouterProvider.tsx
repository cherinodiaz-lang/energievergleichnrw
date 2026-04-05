import type { ComponentType } from 'react';
import React from 'react';
import { BrowserRouter, StaticRouter, useLocation } from 'react-router-dom';
import AnalyticsBootstrap from '@/components/AnalyticsBootstrap';
import ConsentBanner from '@/components/ConsentBanner';
import { resolvePageComponent } from '@/lib/page-registry';
import { SEO_CONFIG } from '@/lib/seo-config';

const PageLoadingFallback = () => (
  <div className="min-h-screen w-full bg-background" aria-hidden="true" />
);

interface AstroRouterProviderProps {
  path: string;
  Page?: ComponentType<any>;
  pageProps?: Record<string, unknown>;
}

function ResolvedRouteContent({
  PageOverride,
  pageProps,
}: {
  PageOverride?: ComponentType<any>;
  pageProps?: Record<string, unknown>;
}) {
  const location = useLocation();
  const Page = PageOverride ?? resolvePageComponent(location.pathname);
  return (
    <React.Suspense fallback={<PageLoadingFallback />}>
      <Page {...(pageProps ?? {})} />
    </React.Suspense>
  );
}

export default function AstroRouterProvider({
  path,
  Page,
  pageProps,
}: AstroRouterProviderProps) {
  const content = (
    <>
      <AnalyticsBootstrap measurementId={SEO_CONFIG.googleAnalyticsId} />
      <ResolvedRouteContent PageOverride={Page} pageProps={pageProps} />
      <ConsentBanner />
    </>
  );

  if (typeof window === 'undefined') {
    return <StaticRouter location={path}>{content}</StaticRouter>;
  }

  return <BrowserRouter>{content}</BrowserRouter>;
}
