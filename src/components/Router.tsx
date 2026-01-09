import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import { SEO_CONFIG } from '@/lib/seo-config';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import GewerbestromPage from '@/components/pages/GewerbestromPage';
import GewerbegasPage from '@/components/pages/GewerbegasPage';
import StromvergleichNrwPage from '@/components/pages/StromvergleichNrwPage';
import GasvergleichNrwPage from '@/components/pages/GasvergleichNrwPage';
import PhotovoltaikNrwPage from '@/components/pages/PhotovoltaikNrwPage';
import KontaktPage from '@/components/pages/KontaktPage';
import ImpressumPage from '@/components/pages/ImpressumPage';
import DatenschutzPage from '@/components/pages/DatenschutzPage';
import RatgeberPage from '@/components/pages/RatgeberPage';
import StromCategoryPage from '@/components/pages/ratgeber/StromCategoryPage';
import GasCategoryPage from '@/components/pages/ratgeber/GasCategoryPage';
import GewerbeCategoryPage from '@/components/pages/ratgeber/GewerbeCategoryPage';
import PhotovoltaikCategoryPage from '@/components/pages/ratgeber/PhotovoltaikCategoryPage';
import WechselwissenCategoryPage from '@/components/pages/ratgeber/WechselwissenCategoryPage';
import StromGrundversorgungArticle from '@/components/pages/ratgeber/articles/StromGrundversorgungArticle';
import StromanbieterwechselnNrwArticle from '@/components/pages/ratgeber/articles/StromanbieterwechselnNrwArticle';
import GrundversorgungVsSondervertragArticle from '@/components/pages/ratgeber/articles/GrundversorgungVsSondervertragArticle';
import NeukndenbonusFallenArticle from '@/components/pages/ratgeber/articles/NeukndenbonusFallenArticle';
import PreiserhoeungWasTunArticle from '@/components/pages/ratgeber/articles/PreiserhoeungWasTunArticle';
import UmzugStromvertragArticle from '@/components/pages/ratgeber/articles/UmzugStromvertragArticle';
import StromtarifVertragslaufzeitArticle from '@/components/pages/ratgeber/articles/StromtarifVertragslaufzeitArticle';
import MaloIdZaehlernummerArticle from '@/components/pages/ratgeber/articles/MaloIdZaehlernummerArticle';
import GasanbieterWechselnNrwArticle from '@/components/pages/ratgeber/articles/GasanbieterWechselnNrwArticle';
import GrundversorgungGasSondervertragArticle from '@/components/pages/ratgeber/articles/GrundversorgungGasSondervertragArticle';
import PreiserhoeungGasRechteArticle from '@/components/pages/ratgeber/articles/PreiserhoeungGasRechteArticle';
import UmzugGasvertragArticle from '@/components/pages/ratgeber/articles/UmzugGasvertragArticle';
import HeizungsartVerbrauchArticle from '@/components/pages/ratgeber/articles/HeizungsartVerbrauchArticle';
import GaspreisgarantieArticle from '@/components/pages/ratgeber/articles/GaspreisgarantieArticle';
import GewerbestromVertragArticle from '@/components/pages/ratgeber/articles/GewerbestromVertragArticle';
import GewerbegasBeschaffungArticle from '@/components/pages/ratgeber/articles/GewerbegasBeschaffungArticle';
import LastprofilLeistungspreisArticle from '@/components/pages/ratgeber/articles/LastprofilLeistungspreisArticle';
import PVKostenNrwArticle from '@/components/pages/ratgeber/articles/PVKostenNrwArticle';
import PVSpeicherArticle from '@/components/pages/ratgeber/articles/PVSpeicherArticle';
import EinspeiseverguetungArticle from '@/components/pages/ratgeber/articles/EinspeiseverguetungArticle';
import DachEignungArticle from '@/components/pages/ratgeber/articles/DachEignungArticle';
import AngeboteVergleichenArticle from '@/components/pages/ratgeber/articles/AngeboteVergleichenArticle';
import KuendigungsfristenArticle from '@/components/pages/ratgeber/articles/KuendigungsfristenArticle';
import LieferantenwechselAblaufArticle from '@/components/pages/ratgeber/articles/LieferantenwechselAblaufArticle';
import WechselSchiefgehtArticle from '@/components/pages/ratgeber/articles/WechselSchiefgehtArticle';
import OrganizationSchema from '@/components/OrganizationSchema';
import WebsiteSchema from '@/components/WebsiteSchema';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import SearchConsoleVerification from '@/components/SearchConsoleVerification';
import SitemapNotification from '@/components/SitemapNotification';
import ConsentBanner from '@/components/ConsentBanner';

// Layout component that includes ScrollToTop and SEO components
function Layout() {
  return (
    <>
      <ScrollToTop />
      <OrganizationSchema />
      <WebsiteSchema />
      <GoogleAnalytics measurementId={SEO_CONFIG.googleAnalyticsId} />
      <SearchConsoleVerification verificationCode={SEO_CONFIG.googleSearchConsoleVerification} />
      <SitemapNotification />
      <ConsentBanner />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        routeMetadata: {
          pageIdentifier: 'home',
        },
      },
      {
        path: "gewerbestrom",
        element: <GewerbestromPage />,
        routeMetadata: {
          pageIdentifier: 'gewerbestrom',
        },
      },
      {
        path: "gewerbegas",
        element: <GewerbegasPage />,
        routeMetadata: {
          pageIdentifier: 'gewerbegas',
        },
      },
      {
        path: "stromvergleich-nrw",
        element: <StromvergleichNrwPage />,
        routeMetadata: {
          pageIdentifier: 'stromvergleich-nrw',
        },
      },
      {
        path: "gasvergleich-nrw",
        element: <GasvergleichNrwPage />,
        routeMetadata: {
          pageIdentifier: 'gasvergleich-nrw',
        },
      },
      {
        path: "photovoltaik-nrw",
        element: <PhotovoltaikNrwPage />,
        routeMetadata: {
          pageIdentifier: 'photovoltaik-nrw',
        },
      },
      {
        path: "kontakt",
        element: <KontaktPage />,
        routeMetadata: {
          pageIdentifier: 'kontakt',
        },
      },
      {
        path: "impressum",
        element: <ImpressumPage />,
        routeMetadata: {
          pageIdentifier: 'impressum',
        },
      },
      {
        path: "datenschutz",
        element: <DatenschutzPage />,
        routeMetadata: {
          pageIdentifier: 'datenschutz',
        },
      },
      {
        path: "ratgeber",
        element: <RatgeberPage />,
        routeMetadata: {
          pageIdentifier: 'ratgeber',
        },
      },
      {
        path: "ratgeber/strom",
        element: <StromCategoryPage />,
        routeMetadata: {
          pageIdentifier: 'ratgeber-strom',
        },
      },
      {
        path: "ratgeber/strom/grundversorgung",
        element: <StromGrundversorgungArticle />,
        routeMetadata: {
          pageIdentifier: 'ratgeber-strom-grundversorgung',
        },
      },
      {
        path: "ratgeber/strom/stromanbieterwechsel-nrw",
        element: <StromanbieterwechselnNrwArticle />,
        routeMetadata: {
          pageIdentifier: 'ratgeber-strom-anbieterwechsel',
        },
      },
      {
        path: "ratgeber/strom/grundversorgung-vs-sondervertrag",
        element: <GrundversorgungVsSondervertragArticle />,
        routeMetadata: {
          pageIdentifier: 'ratgeber-strom-grundversorgung-vs-sondervertrag',
        },
      },
      {
        path: "ratgeber/strom/neukundenboni-fallen",
        element: <NeukndenbonusFallenArticle />,
        routeMetadata: {
          pageIdentifier: 'ratgeber-strom-neukundenboni',
        },
      },
      {
        path: "ratgeber/strom/preiserhoeung-was-tun",
        element: <PreiserhoeungWasTunArticle />,
        routeMetadata: {
          pageIdentifier: 'ratgeber-strom-preiserhoeung',
        },
      },
      {
        path: "ratgeber/strom/umzug-stromvertrag",
        element: <UmzugStromvertragArticle />,
        routeMetadata: {
          pageIdentifier: 'ratgeber-strom-umzug',
        },
      },
      {
        path: "ratgeber/strom/stromtarif-vertragslaufzeit",
        element: <StromtarifVertragslaufzeitArticle />,
        routeMetadata: {
          pageIdentifier: 'ratgeber-strom-vertragslaufzeit',
        },
      },
      {
        path: "ratgeber/strom/malo-id-zaehlernummer",
        element: <MaloIdZaehlernummerArticle />,
        routeMetadata: {
          pageIdentifier: 'ratgeber-strom-malo-id',
        },
      },
      {
        path: "ratgeber/gas",
        element: <GasCategoryPage />,
        routeMetadata: {
          pageIdentifier: 'ratgeber-gas',
        },
      },
      {
        path: "ratgeber/gas/gasanbieter-wechseln-nrw",
        element: <GasanbieterWechselnNrwArticle />,
        routeMetadata: {
          pageIdentifier: 'ratgeber-gas-anbieterwechsel',
        },
      },
      {
        path: "ratgeber/gas/grundversorgung-gas-sondervertrag",
        element: <GrundversorgungGasSondervertragArticle />,
        routeMetadata: {
          pageIdentifier: 'ratgeber-gas-grundversorgung-vs-sondervertrag',
        },
      },
      {
        path: "ratgeber/gas/preiserhoeung-gas-rechte",
        element: <PreiserhoeungGasRechteArticle />,
        routeMetadata: {
          pageIdentifier: 'ratgeber-gas-preiserhoeung',
        },
      },
      {
        path: "ratgeber/gas/umzug-gasvertrag",
        element: <UmzugGasvertragArticle />,
        routeMetadata: {
          pageIdentifier: 'ratgeber-gas-umzug',
        },
      },
      {
        path: "ratgeber/gas/heizungsart-verbrauch",
        element: <HeizungsartVerbrauchArticle />,
        routeMetadata: {
          pageIdentifier: 'ratgeber-gas-heizungsart',
        },
      },
      {
        path: "ratgeber/gas/gaspreisgarantie-worauf-achten",
        element: <GaspreisgarantieArticle />,
        routeMetadata: {
          pageIdentifier: 'ratgeber-gas-preisgarantie',
        },
      },
      {
        path: "ratgeber/gewerbe",
        element: <GewerbeCategoryPage />,
        routeMetadata: {
          pageIdentifier: 'ratgeber-gewerbe',
        },
      },
      {
        path: "ratgeber/gewerbe/gewerbestrom-vertrag-worauf-achten",
        element: <GewerbestromVertragArticle />,
        routeMetadata: {
          pageIdentifier: 'ratgeber-gewerbe-stromvertrag',
        },
      },
      {
        path: "ratgeber/gewerbe/gewerbegas-beschaffung-tipps",
        element: <GewerbegasBeschaffungArticle />,
        routeMetadata: {
          pageIdentifier: 'ratgeber-gewerbe-gasbeschaffung',
        },
      },
      {
        path: "ratgeber/gewerbe/lastprofil-leistungspreis-arbeitspreis",
        element: <LastprofilLeistungspreisArticle />,
        routeMetadata: {
          pageIdentifier: 'ratgeber-gewerbe-lastprofil',
        },
      },
      {
        path: "ratgeber/photovoltaik",
        element: <PhotovoltaikCategoryPage />,
        routeMetadata: {
          pageIdentifier: 'ratgeber-photovoltaik',
        },
      },
      {
        path: "ratgeber/photovoltaik/pv-kosten-nrw-wovon-abhaengig",
        element: <PVKostenNrwArticle />,
        routeMetadata: {
          pageIdentifier: 'ratgeber-photovoltaik-kosten',
        },
      },
      {
        path: "ratgeber/photovoltaik/pv-speicher-lohnt-sich",
        element: <PVSpeicherArticle />,
        routeMetadata: {
          pageIdentifier: 'ratgeber-photovoltaik-speicher',
        },
      },
      {
        path: "ratgeber/photovoltaik/einspeiseverguetung-verstehen",
        element: <EinspeiseverguetungArticle />,
        routeMetadata: {
          pageIdentifier: 'ratgeber-photovoltaik-einspeiseverguetung',
        },
      },
      {
        path: "ratgeber/photovoltaik/dach-eignung-checkliste",
        element: <DachEignungArticle />,
        routeMetadata: {
          pageIdentifier: 'ratgeber-photovoltaik-dacheignung',
        },
      },
      {
        path: "ratgeber/photovoltaik/angebote-vergleichen-fehler",
        element: <AngeboteVergleichenArticle />,
        routeMetadata: {
          pageIdentifier: 'ratgeber-photovoltaik-angebote',
        },
      },
      {
        path: "ratgeber/wechselwissen",
        element: <WechselwissenCategoryPage />,
        routeMetadata: {
          pageIdentifier: 'ratgeber-wechselwissen',
        },
      },
      {
        path: "ratgeber/wechselwissen/kuendigungsfristen-strom-gas",
        element: <KuendigungsfristenArticle />,
        routeMetadata: {
          pageIdentifier: 'ratgeber-wechselwissen-kuendigungsfristen',
        },
      },
      {
        path: "ratgeber/wechselwissen/lieferantenwechsel-ablauf",
        element: <LieferantenwechselAblaufArticle />,
        routeMetadata: {
          pageIdentifier: 'ratgeber-wechselwissen-wechselablauf',
        },
      },
      {
        path: "ratgeber/wechselwissen/was-tun-wenn-wechsel-schiefgeht",
        element: <WechselSchiefgehtArticle />,
        routeMetadata: {
          pageIdentifier: 'ratgeber-wechselwissen-probleme',
        },
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
