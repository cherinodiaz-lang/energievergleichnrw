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
import VergleichGasHubPage from "@/components/pages/VergleichGasHubPage";
import VergleichStromHubPage from "@/components/pages/VergleichStromHubPage";
import WiderrufPage from "@/components/pages/WiderrufPage";
import BlogHubPage from "@/components/pages/blog/BlogHubPage";
import EnergievergleichKostenTippsArticle from "@/components/pages/blog/EnergievergleichKostenTippsArticle";
import GaspreiseVergleichenNrwArticle from "@/components/pages/blog/GaspreiseVergleichenNrwArticle";
import OekostromNrwAnbieterArticle from "@/components/pages/blog/OekostromNrwAnbieterArticle";
import StromanbieterWechselnSchritteArticle from "@/components/pages/blog/StromanbieterWechselnSchritteArticle";
import StrompreiseNrw2026Article from "@/components/pages/blog/StrompreiseNrw2026Article";
import GasCategoryPage from "@/components/pages/ratgeber/GasCategoryPage";
import GewerbeCategoryPage from "@/components/pages/ratgeber/GewerbeCategoryPage";
import PhotovoltaikCategoryPage from "@/components/pages/ratgeber/PhotovoltaikCategoryPage";
import StromCategoryPage from "@/components/pages/ratgeber/StromCategoryPage";
import WechselwissenCategoryPage from "@/components/pages/ratgeber/WechselwissenCategoryPage";
import AngeboteVergleichenArticle from "@/components/pages/ratgeber/articles/AngeboteVergleichenArticle";
import DachEignungArticle from "@/components/pages/ratgeber/articles/DachEignungArticle";
import EinspeiseverguetungArticle from "@/components/pages/ratgeber/articles/EinspeiseverguetungArticle";
import GasanbieterWechselnNrwArticle from "@/components/pages/ratgeber/articles/GasanbieterWechselnNrwArticle";
import GaspreisgarantieArticle from "@/components/pages/ratgeber/articles/GaspreisgarantieArticle";
import GewerbegasBeschaffungArticle from "@/components/pages/ratgeber/articles/GewerbegasBeschaffungArticle";
import GewerbestromVertragArticle from "@/components/pages/ratgeber/articles/GewerbestromVertragArticle";
import GrundversorgungGasSondervertragArticle from "@/components/pages/ratgeber/articles/GrundversorgungGasSondervertragArticle";
import GrundversorgungVsSondervertragArticle from "@/components/pages/ratgeber/articles/GrundversorgungVsSondervertragArticle";
import HeizungsartVerbrauchArticle from "@/components/pages/ratgeber/articles/HeizungsartVerbrauchArticle";
import KuendigungsfristenArticle from "@/components/pages/ratgeber/articles/KuendigungsfristenArticle";
import LastprofilLeistungspreisArticle from "@/components/pages/ratgeber/articles/LastprofilLeistungspreisArticle";
import LieferantenwechselAblaufArticle from "@/components/pages/ratgeber/articles/LieferantenwechselAblaufArticle";
import MaloIdZaehlernummerArticle from "@/components/pages/ratgeber/articles/MaloIdZaehlernummerArticle";
import NeukndenbonusFallenArticle from "@/components/pages/ratgeber/articles/NeukndenbonusFallenArticle";
import PVKostenNrwArticle from "@/components/pages/ratgeber/articles/PVKostenNrwArticle";
import PVSpeicherArticle from "@/components/pages/ratgeber/articles/PVSpeicherArticle";
import PreiserhoeungGasRechteArticle from "@/components/pages/ratgeber/articles/PreiserhoeungGasRechteArticle";
import PreiserhoeungWasTunArticle from "@/components/pages/ratgeber/articles/PreiserhoeungWasTunArticle";
import SofortSparmoeglichkeitenArticle from "@/components/pages/ratgeber/articles/SofortSparmoeglichkeitenArticle";
import StromGrundversorgungArticle from "@/components/pages/ratgeber/articles/StromGrundversorgungArticle";
import StromanbieterwechselnNrwArticle from "@/components/pages/ratgeber/articles/StromanbieterwechselnNrwArticle";
import StromtarifVertragslaufzeitArticle from "@/components/pages/ratgeber/articles/StromtarifVertragslaufzeitArticle";
import UmzugGasvertragArticle from "@/components/pages/ratgeber/articles/UmzugGasvertragArticle";
import UmzugStromvertragArticle from "@/components/pages/ratgeber/articles/UmzugStromvertragArticle";
import WechselSchiefgehtArticle from "@/components/pages/ratgeber/articles/WechselSchiefgehtArticle";

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
  "/thank-you": ThankYouPage,
  "/widerruf": WiderrufPage,
} satisfies Record<string, ComponentType>;

const ARTICLE_PAGE_COMPONENTS = {
  "/ratgeber/gas/gasanbieter-wechseln-nrw": GasanbieterWechselnNrwArticle,
  "/ratgeber/gas/gaspreisgarantie-worauf-achten": GaspreisgarantieArticle,
  "/ratgeber/gas/grundversorgung-gas-sondervertrag":
    GrundversorgungGasSondervertragArticle,
  "/ratgeber/gas/heizungsart-verbrauch": HeizungsartVerbrauchArticle,
  "/ratgeber/gas/preiserhoeung-gas-rechte": PreiserhoeungGasRechteArticle,
  "/ratgeber/gas/umzug-gasvertrag": UmzugGasvertragArticle,
  "/ratgeber/gewerbe/gewerbegas-beschaffung-tipps":
    GewerbegasBeschaffungArticle,
  "/ratgeber/gewerbe/gewerbestrom-vertrag-worauf-achten":
    GewerbestromVertragArticle,
  "/ratgeber/gewerbe/lastprofil-leistungspreis-arbeitspreis":
    LastprofilLeistungspreisArticle,
  "/ratgeber/photovoltaik/angebote-vergleichen-fehler":
    AngeboteVergleichenArticle,
  "/ratgeber/photovoltaik/dach-eignung-checkliste": DachEignungArticle,
  "/ratgeber/photovoltaik/einspeiseverguetung-verstehen":
    EinspeiseverguetungArticle,
  "/ratgeber/photovoltaik/pv-kosten-nrw-wovon-abhaengig":
    PVKostenNrwArticle,
  "/ratgeber/photovoltaik/pv-speicher-lohnt-sich": PVSpeicherArticle,
  "/ratgeber/strom/grundversorgung": StromGrundversorgungArticle,
  "/ratgeber/strom/grundversorgung-vs-sondervertrag":
    GrundversorgungVsSondervertragArticle,
  "/ratgeber/strom/malo-id-zaehlernummer": MaloIdZaehlernummerArticle,
  "/ratgeber/strom/neukundenboni-fallen": NeukndenbonusFallenArticle,
  "/ratgeber/strom/preiserhoeung-was-tun": PreiserhoeungWasTunArticle,
  "/ratgeber/strom/sofortige-sparmoeglichkeiten":
    SofortSparmoeglichkeitenArticle,
  "/ratgeber/strom/stromanbieterwechsel-nrw": StromanbieterwechselnNrwArticle,
  "/ratgeber/strom/stromtarif-vertragslaufzeit":
    StromtarifVertragslaufzeitArticle,
  "/ratgeber/strom/umzug-stromvertrag": UmzugStromvertragArticle,
  "/ratgeber/wechselwissen/kuendigungsfristen-strom-gas":
    KuendigungsfristenArticle,
  "/ratgeber/wechselwissen/lieferantenwechsel-ablauf":
    LieferantenwechselAblaufArticle,
  "/ratgeber/wechselwissen/was-tun-wenn-wechsel-schiefgeht":
    WechselSchiefgehtArticle,
} satisfies Record<string, ComponentType>;

const PAGE_COMPONENTS = {
  ...STATIC_PAGE_COMPONENTS,
  ...ARTICLE_PAGE_COMPONENTS,
} satisfies Record<string, ComponentType>;

export function normalizePathname(pathname: string): string {
  if (!pathname) {
    return "/";
  }

  const rawPathname = pathname.startsWith("http")
    ? new URL(pathname).pathname
    : pathname;

  const normalizedPathname = rawPathname.startsWith("/")
    ? rawPathname
    : `/${rawPathname}`;

  if (normalizedPathname === "/") {
    return normalizedPathname;
  }

  return normalizedPathname.replace(/\/+$/, "");
}

export function hasResolvedPage(pathname: string): boolean {
  return normalizePathname(pathname) in PAGE_COMPONENTS;
}

export function resolvePageComponent(pathname: string): ComponentType {
  return PAGE_COMPONENTS[normalizePathname(pathname)] ?? NotFoundPage;
}
