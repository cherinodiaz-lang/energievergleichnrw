import type { ComponentType } from "react";
import { useEffect } from "react";
import { BrowserRouter, StaticRouter } from "react-router-dom";
import HomePage from "@/components/pages/HomePage";
import GasvergleichNrwPage from "@/components/pages/GasvergleichNrwPage";
import ImpressumPage from "@/components/pages/ImpressumPage";
import KontaktPage from "@/components/pages/KontaktPage";
import StromvergleichNrwPage from "@/components/pages/StromvergleichNrwPage";
import EditorBridge from "@/components/EditorBridge";

type MarketingPageKey = "home" | "impressum" | "stromvergleich" | "gasvergleich" | "kontakt";

interface HydratedMarketingPageProps {
  path: string;
  page: MarketingPageKey;
}

const PAGE_COMPONENTS = {
  home: HomePage,
  gasvergleich: GasvergleichNrwPage,
  impressum: ImpressumPage,
  kontakt: KontaktPage,
  stromvergleich: StromvergleichNrwPage,
} satisfies Record<MarketingPageKey, ComponentType>;

function EditorInitializer() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Signal to Wix Vibe that the page is ready
    const notifyReady = () => {
      try {
        if (window.__EDITOR_BRIDGE__?.notifyReady) {
          window.__EDITOR_BRIDGE__.notifyReady();
        }
        if (window.__WIX_VIBE_EDITOR__?.ready) {
          window.__WIX_VIBE_EDITOR__.ready();
        }
        if (window.parent && window.parent !== window) {
          try {
            window.parent.postMessage({ type: "EDITOR_READY" }, "*");
          } catch (e) {
            // Silently ignore cross-origin errors
          }
        }
      } catch (error) {
        // Silently ignore initialization errors
      }
    };

    // Notify immediately and after a short delay
    notifyReady();
    const timeoutId = setTimeout(notifyReady, 50);

    return () => clearTimeout(timeoutId);
  }, []);

  return null;
}

export default function HydratedMarketingPage({ path, page }: HydratedMarketingPageProps) {
  const Page = PAGE_COMPONENTS[page];

  if (typeof window === "undefined") {
    return (
      <StaticRouter location={path}>
        <Page />
      </StaticRouter>
    );
  }

  return (
    <>
      <EditorBridge />
      <EditorInitializer />
      <BrowserRouter>
        <Page />
      </BrowserRouter>
    </>
  );
}
