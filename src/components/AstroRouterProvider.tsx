import type { ComponentType, ReactNode } from 'react';
import { BrowserRouter, StaticRouter } from 'react-router-dom';
import AnalyticsBootstrap from '@/components/AnalyticsBootstrap';
import ConsentBanner from '@/components/ConsentBanner';
import { SEO_CONFIG } from '@/lib/seo-config';

interface AstroRouterProviderProps {
  path: string;
  Page?: ComponentType;
  children?: ReactNode;
}

export default function AstroRouterProvider({ path, Page, children }: AstroRouterProviderProps) {
  const content = (
    <>
      <AnalyticsBootstrap measurementId={SEO_CONFIG.googleAnalyticsId} />
      {Page ? <Page /> : children}
      <ConsentBanner />
    </>
  );

  if (typeof window === 'undefined') {
    return <StaticRouter location={path}>{content}</StaticRouter>;
  }

  return <BrowserRouter>{content}</BrowserRouter>;
}
