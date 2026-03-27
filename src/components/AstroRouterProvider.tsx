import type { ComponentType, ReactNode } from 'react';
import { BrowserRouter, StaticRouter, useLocation } from 'react-router-dom';
import AnalyticsBootstrap from '@/components/AnalyticsBootstrap';
import ConsentBanner from '@/components/ConsentBanner';
import { resolvePageComponent } from '@/lib/page-registry';
import { SEO_CONFIG } from '@/lib/seo-config';

interface AstroRouterProviderProps {
  path: string;
  Page?: ComponentType;
  children?: ReactNode;
}

function ResolvedRouteContent({ children }: { children?: ReactNode }) {
  const location = useLocation();
  const Page = resolvePageComponent(location.pathname);

  if (!Page && children) {
    return <>{children}</>;
  }

  return <Page />;
}

export default function AstroRouterProvider({ path, children }: AstroRouterProviderProps) {
  const content = (
    <>
      <AnalyticsBootstrap
        measurementId={SEO_CONFIG.googleAnalyticsId}
        clarityProjectId={SEO_CONFIG.clarityProjectId}
      />
      <ResolvedRouteContent>{children}</ResolvedRouteContent>
      <ConsentBanner />
    </>
  );

  if (typeof window === 'undefined') {
    return <StaticRouter location={path}>{content}</StaticRouter>;
  }

  return <BrowserRouter>{content}</BrowserRouter>;
}
