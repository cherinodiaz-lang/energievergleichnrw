import { BrowserRouter, StaticRouter } from "react-router-dom";
import HomePage from "@/components/pages/HomePage";
import ImpressumPage from "@/components/pages/ImpressumPage";
import StromvergleichNrwPage from "@/components/pages/StromvergleichNrwPage";

type MarketingPageKey = "home" | "impressum" | "stromvergleich";

interface HydratedMarketingPageProps {
  path: string;
  page: MarketingPageKey;
}

const PAGE_COMPONENTS = {
  home: HomePage,
  impressum: ImpressumPage,
  stromvergleich: StromvergleichNrwPage,
} satisfies Record<MarketingPageKey, () => JSX.Element>;

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
    <BrowserRouter>
      <Page />
    </BrowserRouter>
  );
}
