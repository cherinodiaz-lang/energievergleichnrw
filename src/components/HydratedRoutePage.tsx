import type { ComponentType } from "react";
import React, { useEffect } from "react";
import { BrowserRouter, StaticRouter } from "react-router-dom";
import AnalyticsBootstrap from "@/components/AnalyticsBootstrap";
import ConsentBanner from "@/components/ConsentBanner";
import { SEO_CONFIG } from "@/lib/seo-config";

interface HydratedRoutePageProps {
  path: string;
  Page: ComponentType;
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
    console.error("[ErrorBoundary] Caught error:", error, info);
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

function EditorInitializer() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const notifyReady = () => {
      if (window.__EDITOR_BRIDGE__?.notifyReady) {
        window.__EDITOR_BRIDGE__.notifyReady();
      }
      if (window.__WIX_VIBE_EDITOR__?.ready) {
        window.__WIX_VIBE_EDITOR__.ready();
      }
      if (window.parent && window.parent !== window) {
        try {
          window.parent.postMessage({ type: "EDITOR_READY" }, "*");
        } catch (error) {
          console.debug("Failed to post ready message:", error);
        }
      }
    };

    notifyReady();
    const timeoutId = setTimeout(notifyReady, 50);

    return () => clearTimeout(timeoutId);
  }, []);

  return null;
}

export default function HydratedRoutePage({
  path,
  Page,
}: HydratedRoutePageProps) {
  const pageWithGlobalUi = (
    <ErrorBoundary>
      <>
        <AnalyticsBootstrap
          measurementId={SEO_CONFIG.googleAnalyticsId}
          clarityProjectId={SEO_CONFIG.clarityProjectId}
        />
        <EditorInitializer />
        <Page />
        <ConsentBanner />
      </>
    </ErrorBoundary>
  );

  if (typeof window === "undefined") {
    return <StaticRouter location={path}>{pageWithGlobalUi}</StaticRouter>;
  }

  return <BrowserRouter>{pageWithGlobalUi}</BrowserRouter>;
}
