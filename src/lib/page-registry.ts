import { lazy } from "react";
import type { ComponentType } from "react";
import NotFoundPage from "@/components/pages/NotFoundPage";
import { getAllCitySlugs } from "@/lib/cities-nrw";

// Eagerly load only the 404 fallback — everything else is lazy-loaded on demand.
// This reduces the initial page-registry chunk from ~924 KB to ~10 KB.
const HomePage = lazy(() => import("@/components/pages/HomePage"));
const AgbPage = lazy(() => import("@/components/pages/AgbPage"));
const DatenschutzPage = lazy(() => import("@/components/pages/DatenschutzPage"));
const FaqPage = lazy(() => import("@/components/pages/FaqPage"));
const GasvergleichNrwPage = lazy(() => import("@/components/pages/GasvergleichNrwPage"));
const GewerbegasPage = lazy(() => import("@/components/pages/GewerbegasPage"));
const GewerbestromPage = lazy(() => import("@/components/pages/GewerbestromPage"));
const ImpressumPage = lazy(() => import("@/components/pages/ImpressumPage"));
const KontaktPage = lazy(() => import("@/components/pages/KontaktPage"));
const MethodologyPage = lazy(() => import("@/components/pages/MethodologyPage"));
const PhotovoltaikNrwPage = lazy(() => import("@/components/pages/PhotovoltaikNrwPage"));
const RatgeberPage = lazy(() => import("@/components/pages/RatgeberPage"));
const SitemapPage = lazy(() => import("@/components/pages/SitemapPage"));
const StromvergleichNrwPage = lazy(() => import("@/components/pages/StromvergleichNrwPage"));
const ThankYouPage = lazy(() => import("@/components/pages/ThankYouPage"));
const VergleichGasHubPage = lazy(() => import("@/components/pages/VergleichGasHubPage"));
const VergleichStromHubPage = lazy(() => import("@/components/pages/VergleichStromHubPage"));
const WiderrufPage = lazy(() => import("@/components/pages/WiderrufPage"));
const CityStromvergleichPage = lazy(() => import("@/components/pages/CityStromvergleichPage"));

// Blog
const BlogHubPage = lazy(() => import("@/components/pages/blog/BlogHubPage"));
const EnergievergleichKostenTippsArticle = lazy(() => import("@/components/pages/blog/EnergievergleichKostenTippsArticle"));
const GaspreiseVergleichenNrwArticle = lazy(() => import("@/components/pages/blog/GaspreiseVergleichenNrwArticle"));
const OekostromNrwAnbieterArticle = lazy(() => import("@/components/pages/blog/OekostromNrwAnbieterArticle"));
const StromanbieterWechselnSchritteArticle = lazy(() => import("@/components/pages/blog/StromanbieterWechselnSchritteArticle"));
const StrompreiseNrw2026Article = lazy(() => import("@/components/pages/blog/StrompreiseNrw2026Article"));

// Ratgeber categories
const GasCategoryPage = lazy(() => import("@/components/pages/ratgeber/GasCategoryPage"));
const GewerbeCategoryPage = lazy(() => import("@/components/pages/ratgeber/GewerbeCategoryPage"));
const PhotovoltaikCategoryPage = lazy(() => import("@/components/pages/ratgeber/PhotovoltaikCategoryPage"));
const StromCategoryPage = lazy(() => import("@/components/pages/ratgeber/StromCategoryPage"));
const WechselwissenCategoryPage = lazy(() => import("@/components/pages/ratgeber/WechselwissenCategoryPage"));

// Ratgeber articles
const AngeboteVergleichenArticle = lazy(() => import("@/components/pages/ratgeber/articles/AngeboteVergleichenArticle"));
const DachEignungArticle = lazy(() => import("@/components/pages/ratgeber/articles/DachEignungArticle"));
const EinspeiseverguetungArticle = lazy(() => import("@/components/pages/ratgeber/articles/EinspeiseverguetungArticle"));
const GasanbieterWechselnNrwArticle = lazy(() => import("@/components/pages/ratgeber/articles/GasanbieterWechselnNrwArticle"));
const GaspreisgarantieArticle = lazy(() => import("@/components/pages/ratgeber/articles/GaspreisgarantieArticle"));
const GewerbegasBeschaffungArticle = lazy(() => import("@/components/pages/ratgeber/articles/GewerbegasBeschaffungArticle"));
const GewerbestromVertragArticle = lazy(() => import("@/components/pages/ratgeber/articles/GewerbestromVertragArticle"));
const GrundversorgungGasSondervertragArticle = lazy(() => import("@/components/pages/ratgeber/articles/GrundversorgungGasSondervertragArticle"));
const GrundversorgungVsSondervertragArticle = lazy(() => import("@/components/pages/ratgeber/articles/GrundversorgungVsSondervertragArticle"));
const HeizungsartVerbrauchArticle = lazy(() => import("@/components/pages/ratgeber/articles/HeizungsartVerbrauchArticle"));
const KuendigungsfristenArticle = lazy(() => import("@/components/pages/ratgeber/articles/KuendigungsfristenArticle"));
const LastprofilLeistungspreisArticle = lazy(() => import("@/components/pages/ratgeber/articles/LastprofilLeistungspreisArticle"));
const LieferantenwechselAblaufArticle = lazy(() => import("@/components/pages/ratgeber/articles/LieferantenwechselAblaufArticle"));
const MaloIdZaehlernummerArticle = lazy(() => import("@/components/pages/ratgeber/articles/MaloIdZaehlernummerArticle"));
const NeukndenbonusFallenArticle = lazy(() => import("@/components/pages/ratgeber/articles/NeukndenbonusFallenArticle"));
const PVKostenNrwArticle = lazy(() => import("@/components/pages/ratgeber/articles/PVKostenNrwArticle"));
const PVSpeicherArticle = lazy(() => import("@/components/pages/ratgeber/articles/PVSpeicherArticle"));
const PreiserhoeungGasRechteArticle = lazy(() => import("@/components/pages/ratgeber/articles/PreiserhoeungGasRechteArticle"));
const PreiserhoeungWasTunArticle = lazy(() => import("@/components/pages/ratgeber/articles/PreiserhoeungWasTunArticle"));
const SofortSparmoeglichkeitenArticle = lazy(() => import("@/components/pages/ratgeber/articles/SofortSparmoeglichkeitenArticle"));
const StromGrundversorgungArticle = lazy(() => import("@/components/pages/ratgeber/articles/StromGrundversorgungArticle"));
const StromanbieterwechselnNrwArticle = lazy(() => import("@/components/pages/ratgeber/articles/StromanbieterwechselnNrwArticle"));
const StromtarifVertragslaufzeitArticle = lazy(() => import("@/components/pages/ratgeber/articles/StromtarifVertragslaufzeitArticle"));
const UmzugGasvertragArticle = lazy(() => import("@/components/pages/ratgeber/articles/UmzugGasvertragArticle"));
const UmzugStromvertragArticle = lazy(() => import("@/components/pages/ratgeber/articles/UmzugStromvertragArticle"));
const WechselSchiefgehtArticle = lazy(() => import("@/components/pages/ratgeber/articles/WechselSchiefgehtArticle"));

const STATIC_PAGE_COMPONENTS = {
  "/": HomePage,
  "/agb": AgbPage,
  "/blog": BlogHubPage,
  "/blog/energievergleich-kosten-tipps": EnergievergleichKostenTippsArticle,
  "/blog/gaspreise-vergleichen-nrw": GaspreiseVergleichenNrwArticle,
  "/blog/oekostrom-nrw-anbieter": OekostromNrwAnbieterArticle,
  "/blog/stromanbieter-wechseln-nrw": StromanbieterWechselnSchritteArticle,
  "/blog/strompreise-nrw-2026": StrompreiseNrw2026Article,
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

// Build city page routes dynamically from cities-nrw data
const CITY_PAGE_COMPONENTS = Object.fromEntries(
  getAllCitySlugs().map((slug) => [`/${slug}`, CityStromvergleichPage])
) as Record<string, ComponentType>;

const PAGE_COMPONENTS = {
  ...STATIC_PAGE_COMPONENTS,
  ...ARTICLE_PAGE_COMPONENTS,
  ...CITY_PAGE_COMPONENTS,
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
