import type { ComponentType } from 'react';
import { BrowserRouter, StaticRouter, useLocation } from 'react-router-dom';
import AnalyticsBootstrap from '@/components/AnalyticsBootstrap';
import ConsentBanner from '@/components/ConsentBanner';
import EditorBridge from '@/components/EditorBridge';
import { resolvePageComponent } from '@/lib/page-registry';
import { SEO_CONFIG } from '@/lib/seo-config';

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
  if (PageOverride) {
    return <PageOverride {...(pageProps ?? {})} />;
  }

  const location = useLocation();
  const Page = resolvePageComponent(location.pathname);
  return <Page {...(pageProps ?? {})} />;
}

export default function AstroRouterProvider({
  path,
  Page,
  pageProps,
}: AstroRouterProviderProps) {
  const content = (
    <>
      <EditorBridge />
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
