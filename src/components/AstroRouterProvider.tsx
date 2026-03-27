import type { ComponentType, ReactNode } from 'react';
import { BrowserRouter, StaticRouter } from 'react-router-dom';
import AnalyticsBootstrap from '@/components/AnalyticsBootstrap';
import ConsentBanner from '@/components/ConsentBanner';
import NotFoundPage from '@/components/pages/NotFoundPage';
import { SEO_CONFIG } from '@/lib/seo-config';
import { resolveHydratedPage } from '@/lib/hydrated-page-resolver';

interface AstroRouterProviderProps {
  path: string;
  Page?: ComponentType;
  children?: ReactNode;
}

export default function AstroRouterProvider({ path, Page, children }: AstroRouterProviderProps) {
  const ResolvedPage = resolveHydratedPage(path) ?? Page;
  const content = (
    <>
      <AnalyticsBootstrap measurementId={SEO_CONFIG.googleAnalyticsId} />
      {ResolvedPage ? <ResolvedPage /> : children ?? <NotFoundPage />}
      <ConsentBanner />
    </>
  );

  if (typeof window === 'undefined') {
    return <StaticRouter location={path}>{content}</StaticRouter>;
  }

  return <BrowserRouter>{content}</BrowserRouter>;
}
