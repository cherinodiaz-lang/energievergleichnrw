import type { ComponentType } from "react";
import React from "react";
import { BrowserRouter, StaticRouter, useLocation } from "react-router-dom";
import AnalyticsBootstrap from "@/components/AnalyticsBootstrap";
import ConsentBanner from "@/components/ConsentBanner";
import EditorBridge from "@/components/EditorBridge";
import { resolvePageComponent } from "@/lib/page-registry";
import { SEO_CONFIG } from "@/lib/seo-config";

interface HydratedRoutePageProps {
  path: string;
  Page?: ComponentType<any>;
  pageProps?: Record<string, unknown>;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    void error;
    void info;
    // Silently catch errors to prevent editor blocking
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "sans-serif",
            background: "#f9fafb",
            padding: "2rem",
            textAlign: "center",
          }}
        >
          <h1 style={{ color: "#1a3a5c", marginBottom: "1rem" }}>
            Energievergleich NRW
          </h1>
          <p
            style={{
              color: "#6b7280",
              maxWidth: "480px",
              marginBottom: "2rem",
            }}
          >
            Die Seite konnte leider nicht geladen werden. Bitte laden Sie die
            Seite neu oder versuchen Sie es später erneut.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: "#1a3a5c",
              color: "white",
              border: "none",
              padding: "0.75rem 2rem",
              borderRadius: "0.5rem",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            Seite neu laden
          </button>
          {process.env.NODE_ENV === "development" && this.state.error && (
            <pre
              style={{
                marginTop: "2rem",
                background: "#fee2e2",
                color: "#991b1b",
                padding: "1rem",
                borderRadius: "0.5rem",
                fontSize: "0.75rem",
                textAlign: "left",
                maxWidth: "100%",
                overflow: "auto",
              }}
            >
              {this.state.error.toString()}
            </pre>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}

function ResolvedRoutePage({
  PageOverride,
  pageProps,
}: {
  PageOverride?: ComponentType<any>;
  pageProps?: Record<string, unknown>;
}) {
  const location = useLocation();
  const Page = PageOverride ?? resolvePageComponent(location.pathname);
  return <Page {...(pageProps ?? {})} />;
}

export default function HydratedRoutePage({
  path,
  Page,
  pageProps,
}: HydratedRoutePageProps) {
  const pageWithGlobalUi = (
    <ErrorBoundary>
      <>
        <AnalyticsBootstrap measurementId={SEO_CONFIG.googleAnalyticsId} />
        <EditorBridge />
        <ResolvedRoutePage PageOverride={Page} pageProps={pageProps} />
        <ConsentBanner />
      </>
    </ErrorBoundary>
  );

  if (typeof window === "undefined") {
    return <StaticRouter location={path}>{pageWithGlobalUi}</StaticRouter>;
  }

  return <BrowserRouter>{pageWithGlobalUi}</BrowserRouter>;
}
