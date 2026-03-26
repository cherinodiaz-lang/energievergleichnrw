import type { ComponentType } from "react";
import { BrowserRouter, StaticRouter } from "react-router-dom";
import AnalyticsBootstrap from "@/components/AnalyticsBootstrap";
import ConsentBanner from "@/components/ConsentBanner";
import { SEO_CONFIG } from "@/lib/seo-config";

interface HydratedRoutePageProps {
  path: string;
  Page: ComponentType;
}

export default function HydratedRoutePage({ path, Page }: HydratedRoutePageProps) {
  const pageWithGlobalUi = (
    <>
      <AnalyticsBootstrap measurementId={SEO_CONFIG.googleAnalyticsId} />
      <Page />
      <ConsentBanner />
    </>
  );

  if (typeof window === "undefined") {
    return (
      <StaticRouter location={path}>
        {pageWithGlobalUi}
      </StaticRouter>
    );
  }

  return (
    <BrowserRouter>
      {pageWithGlobalUi}
    </BrowserRouter>
  );
}
