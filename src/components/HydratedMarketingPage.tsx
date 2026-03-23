import type { ComponentType } from "react";
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
      <BrowserRouter>
        <Page />
      </BrowserRouter>
    </>
  );
}
