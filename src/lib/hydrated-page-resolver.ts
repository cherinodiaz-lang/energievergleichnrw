import type { ComponentType } from "react";
import AgbPage from "@/components/pages/AgbPage";
import DatenschutzPage from "@/components/pages/DatenschutzPage";
import FaqPage from "@/components/pages/FaqPage";
import GasvergleichNrwPage from "@/components/pages/GasvergleichNrwPage";
import GewerbegasPage from "@/components/pages/GewerbegasPage";
import GewerbestromPage from "@/components/pages/GewerbestromPage";
import HomePage from "@/components/pages/HomePage";
import ImpressumPage from "@/components/pages/ImpressumPage";
import KontaktPage from "@/components/pages/KontaktPage";
import MethodologyPage from "@/components/pages/MethodologyPage";
import NotFoundPage from "@/components/pages/NotFoundPage";
import PhotovoltaikNrwPage from "@/components/pages/PhotovoltaikNrwPage";
import RatgeberPage from "@/components/pages/RatgeberPage";
import SitemapPage from "@/components/pages/SitemapPage";
import StromvergleichNrwPage from "@/components/pages/StromvergleichNrwPage";
import ThankYouPage from "@/components/pages/ThankYouPage";
import WiderrufPage from "@/components/pages/WiderrufPage";
import GasCategoryPage from "@/components/pages/ratgeber/GasCategoryPage";
import GewerbeCategoryPage from "@/components/pages/ratgeber/GewerbeCategoryPage";
import PhotovoltaikCategoryPage from "@/components/pages/ratgeber/PhotovoltaikCategoryPage";
import RatgeberArticlePage from "@/components/pages/ratgeber/RatgeberArticlePage";
import StromCategoryPage from "@/components/pages/ratgeber/StromCategoryPage";
import WechselwissenCategoryPage from "@/components/pages/ratgeber/WechselwissenCategoryPage";

function normalizePath(pathname: string): string {
  return pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
}

const STATIC_PAGE_COMPONENTS = {
  "/": HomePage,
  "/agb": AgbPage,
  "/danke": ThankYouPage,
  "/datenschutz": DatenschutzPage,
  "/faq": FaqPage,
  "/gasvergleich-nrw": GasvergleichNrwPage,
  "/gewerbegas": GewerbegasPage,
  "/gewerbestrom": GewerbestromPage,
  "/impressum": ImpressumPage,
  "/kontakt": KontaktPage,
  "/methodik": MethodologyPage,
  "/photovoltaik-nrw": PhotovoltaikNrwPage,
  "/ratgeber": RatgeberPage,
  "/ratgeber/gas": GasCategoryPage,
  "/ratgeber/gewerbe": GewerbeCategoryPage,
  "/ratgeber/photovoltaik": PhotovoltaikCategoryPage,
  "/ratgeber/strom": StromCategoryPage,
  "/ratgeber/wechselwissen": WechselwissenCategoryPage,
  "/sitemap": SitemapPage,
  "/stromvergleich-nrw": StromvergleichNrwPage,
  "/widerruf": WiderrufPage,
} satisfies Record<string, ComponentType>;

export function resolveHydratedPage(pathname: string): ComponentType {
  const normalizedPath = normalizePath(pathname);
  const staticPage = STATIC_PAGE_COMPONENTS[normalizedPath];

  if (staticPage) {
    return staticPage;
  }

  if (/^\/ratgeber\/[^/]+\/[^/]+$/.test(normalizedPath)) {
    return RatgeberArticlePage;
  }

  return NotFoundPage;
}
