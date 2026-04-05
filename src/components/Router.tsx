import { MemberProvider } from '@/integrations';
import {
  BrowserRouter,
  Navigate,
  Outlet,
  useLocation,
  useRoutes,
} from 'react-router-dom';
import { StaticRouter, type RouteObject } from 'react-router';
import { lazy, Suspense, useEffect } from 'react';
import { ScrollToTop } from '@/lib/scroll-to-top';
import { SEO_CONFIG } from '@/lib/seo-config';
import { ROUTES } from '@/lib/routes';
import { initializeGA4, trackPageView } from '@/services/ga4-tracking';
import EditorBridge from '@/components/EditorBridge';
import HomePage from '@/components/pages/HomePage';

// ... keep existing code (imports and other components) ...

// Fallback component for lazy-loaded routes
const LazyFallback = () => <div className="min-h-screen flex items-center justify-center bg-background" />;

// Lazy load non-critical pages for code-splitting
const GewerbestromPage = lazy(() => import('@/components/pages/GewerbestromPage'));
const GewerbegasPage = lazy(() => import('@/components/pages/GewerbegasPage'));
const StromvergleichNrwPage = lazy(() => import('@/components/pages/StromvergleichNrwPage'));
const GasvergleichNrwPage = lazy(() => import('@/components/pages/GasvergleichNrwPage'));
const PhotovoltaikNrwPage = lazy(() => import('@/components/pages/PhotovoltaikNrwPage'));
const KontaktPage = lazy(() => import('@/components/pages/KontaktPage'));
const ImpressumPage = lazy(() => import('@/components/pages/ImpressumPage'));
const DatenschutzPage = lazy(() => import('@/components/pages/DatenschutzPage'));
const RatgeberPage = lazy(() => import('@/components/pages/RatgeberPage'));
const StromCategoryPage = lazy(() => import('@/components/pages/ratgeber/StromCategoryPage'));
const GasCategoryPage = lazy(() => import('@/components/pages/ratgeber/GasCategoryPage'));
const GewerbeCategoryPage = lazy(() => import('@/components/pages/ratgeber/GewerbeCategoryPage'));
const PhotovoltaikCategoryPage = lazy(() => import('@/components/pages/ratgeber/PhotovoltaikCategoryPage'));
const WechselwissenCategoryPage = lazy(() => import('@/components/pages/ratgeber/WechselwissenCategoryPage'));
const StromGrundversorgungArticle = lazy(() => import('@/components/pages/ratgeber/articles/StromGrundversorgungArticle'));
const StromanbieterwechselnNrwArticle = lazy(() => import('@/components/pages/ratgeber/articles/StromanbieterwechselnNrwArticle'));
const GrundversorgungVsSondervertragArticle = lazy(() => import('@/components/pages/ratgeber/articles/GrundversorgungVsSondervertragArticle'));
const SofortSparmoeglichkeitenArticle = lazy(() => import('@/components/pages/ratgeber/articles/SofortSparmoeglichkeitenArticle'));
const MethodologyPage = lazy(() => import('@/components/pages/MethodologyPage'));
const NeukndenbonusFallenArticle = lazy(() => import('@/components/pages/ratgeber/articles/NeukndenbonusFallenArticle'));
const PreiserhoeungWasTunArticle = lazy(() => import('@/components/pages/ratgeber/articles/PreiserhoeungWasTunArticle'));
const UmzugStromvertragArticle = lazy(() => import('@/components/pages/ratgeber/articles/UmzugStromvertragArticle'));
const StromtarifVertragslaufzeitArticle = lazy(() => import('@/components/pages/ratgeber/articles/StromtarifVertragslaufzeitArticle'));
const MaloIdZaehlernummerArticle = lazy(() => import('@/components/pages/ratgeber/articles/MaloIdZaehlernummerArticle'));
const GasanbieterWechselnNrwArticle = lazy(() => import('@/components/pages/ratgeber/articles/GasanbieterWechselnNrwArticle'));
const GrundversorgungGasSondervertragArticle = lazy(() => import('@/components/pages/ratgeber/articles/GrundversorgungGasSondervertragArticle'));
const PreiserhoeungGasRechteArticle = lazy(() => import('@/components/pages/ratgeber/articles/PreiserhoeungGasRechteArticle'));
const UmzugGasvertragArticle = lazy(() => import('@/components/pages/ratgeber/articles/UmzugGasvertragArticle'));
const HeizungsartVerbrauchArticle = lazy(() => import('@/components/pages/ratgeber/articles/HeizungsartVerbrauchArticle'));
const GaspreisgarantieArticle = lazy(() => import('@/components/pages/ratgeber/articles/GaspreisgarantieArticle'));
const GewerbestromVertragArticle = lazy(() => import('@/components/pages/ratgeber/articles/GewerbestromVertragArticle'));
const GewerbegasBeschaffungArticle = lazy(() => import('@/components/pages/ratgeber/articles/GewerbegasBeschaffungArticle'));
const LastprofilLeistungspreisArticle = lazy(() => import('@/components/pages/ratgeber/articles/LastprofilLeistungspreisArticle'));
const PVKostenNrwArticle = lazy(() => import('@/components/pages/ratgeber/articles/PVKostenNrwArticle'));
const PVSpeicherArticle = lazy(() => import('@/components/pages/ratgeber/articles/PVSpeicherArticle'));
const EinspeiseverguetungArticle = lazy(() => import('@/components/pages/ratgeber/articles/EinspeiseverguetungArticle'));
const DachEignungArticle = lazy(() => import('@/components/pages/ratgeber/articles/DachEignungArticle'));
const AngeboteVergleichenArticle = lazy(() => import('@/components/pages/ratgeber/articles/AngeboteVergleichenArticle'));
const KuendigungsfristenArticle = lazy(() => import('@/components/pages/ratgeber/articles/KuendigungsfristenArticle'));
const LieferantenwechselAblaufArticle = lazy(() => import('@/components/pages/ratgeber/articles/LieferantenwechselAblaufArticle'));
const WechselSchiefgehtArticle = lazy(() => import('@/components/pages/ratgeber/articles/WechselSchiefgehtArticle'));
const ThankYouPage = lazy(() => import('@/components/pages/ThankYouPage'));
const BlogPage = lazy(() => import('@/components/pages/BlogPage'));
const BlogDetailPage = lazy(() => import('@/components/pages/BlogDetailPage'));
const AgbPage = lazy(() => import('@/components/pages/AgbPage'));
const WiderrufPage = lazy(() => import('@/components/pages/WiderrufPage'));
const SitemapPage = lazy(() => import('@/components/pages/SitemapPage'));
const FaqPage = lazy(() => import('@/components/pages/FaqPage'));

// Layout component that includes ScrollToTop and SEO components
function Layout() {
  const location = useLocation();

  useEffect(() => {
    const measurementId = SEO_CONFIG.googleAnalyticsId;
    if (!measurementId || typeof window === 'undefined') return;
    const runInit = () => initializeGA4(measurementId);

    if ('requestIdleCallback' in window) {
      const idleId = (window as Window & { requestIdleCallback: (callback: () => void, options?: { timeout: number }) => number }).requestIdleCallback(runInit, { timeout: 2500 });
      return () => {
        if ('cancelIdleCallback' in window) {
          (window as Window & { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(idleId);
        }
      };
    }

    const timeoutId = globalThis.setTimeout(runInit, 0);
    return () => globalThis.clearTimeout(timeoutId);
  }, []);

  // Track SPA page navigation in GA4
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-w-0 overflow-x-hidden">
      <EditorBridge />
      <ScrollToTop />
      {location.pathname === '/' ? (
        <Outlet />
      ) : (
        <Suspense fallback={<LazyFallback />}>
          <Outlet />
        </Suspense>
      )}
    </div>
  );
}

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "gewerbestrom",
        element: <GewerbestromPage />,
      },
      {
        path: "gewerbegas",
        element: <GewerbegasPage />,
      },
      {
        path: "stromvergleich-nrw",
        element: <StromvergleichNrwPage />,
      },
      {
        path: "gasvergleich-nrw",
        element: <GasvergleichNrwPage />,
      },
      {
        path: "photovoltaik-nrw",
        element: <PhotovoltaikNrwPage />,
      },
      {
        path: "kontakt",
        element: <KontaktPage />,
      },
      {
        path: ROUTES.impressum.slice(1),
        element: <ImpressumPage />,
      },
      {
        path: ROUTES.datenschutz.slice(1),
        element: <DatenschutzPage />,
      },
      {
        path: "methodik",
        element: <MethodologyPage />,
      },
      {
        path: "ratgeber",
        element: <RatgeberPage />,
      },
      {
        path: "ratgeber/strom",
        element: <StromCategoryPage />,
      },
      {
        path: "ratgeber/strom/grundversorgung",
        element: <StromGrundversorgungArticle />,
      },
      {
        path: "ratgeber/strom/sofortige-sparmoeglichkeiten",
        element: <SofortSparmoeglichkeitenArticle />,
      },
      {
        path: "ratgeber/strom/stromanbieterwechsel-nrw",
        element: <StromanbieterwechselnNrwArticle />,
      },
      {
        path: "ratgeber/strom/grundversorgung-vs-sondervertrag",
        element: <GrundversorgungVsSondervertragArticle />,
      },
      {
        path: "ratgeber/strom/neukundenboni-fallen",
        element: <NeukndenbonusFallenArticle />,
      },
      {
        path: "ratgeber/strom/preiserhoeung-was-tun",
        element: <PreiserhoeungWasTunArticle />,
      },
      {
        path: "ratgeber/strom/umzug-stromvertrag",
        element: <UmzugStromvertragArticle />,
      },
      {
        path: "ratgeber/strom/stromtarif-vertragslaufzeit",
        element: <StromtarifVertragslaufzeitArticle />,
      },
      {
        path: "ratgeber/strom/malo-id-zaehlernummer",
        element: <MaloIdZaehlernummerArticle />,
      },
      {
        path: "ratgeber/gas",
        element: <GasCategoryPage />,
      },
      {
        path: "ratgeber/gas/gasanbieter-wechseln-nrw",
        element: <GasanbieterWechselnNrwArticle />,
      },
      {
        path: "ratgeber/gas/grundversorgung-gas-sondervertrag",
        element: <GrundversorgungGasSondervertragArticle />,
      },
      {
        path: "ratgeber/gas/preiserhoeung-gas-rechte",
        element: <PreiserhoeungGasRechteArticle />,
      },
      {
        path: "ratgeber/gas/umzug-gasvertrag",
        element: <UmzugGasvertragArticle />,
      },
      {
        path: "ratgeber/gas/heizungsart-verbrauch",
        element: <HeizungsartVerbrauchArticle />,
      },
      {
        path: "ratgeber/gas/gaspreisgarantie-worauf-achten",
        element: <GaspreisgarantieArticle />,
      },
      {
        path: "ratgeber/gewerbe",
        element: <GewerbeCategoryPage />,
      },
      {
        path: "ratgeber/gewerbe/gewerbestrom-vertrag-worauf-achten",
        element: <GewerbestromVertragArticle />,
      },
      {
        path: "ratgeber/gewerbe/gewerbegas-beschaffung-tipps",
        element: <GewerbegasBeschaffungArticle />,
      },
      {
        path: "ratgeber/gewerbe/lastprofil-leistungspreis-arbeitspreis",
        element: <LastprofilLeistungspreisArticle />,
      },
      {
        path: "ratgeber/photovoltaik",
        element: <PhotovoltaikCategoryPage />,
      },
      {
        path: "ratgeber/photovoltaik/pv-kosten-nrw-wovon-abhaengig",
        element: <PVKostenNrwArticle />,
      },
      {
        path: "ratgeber/photovoltaik/pv-speicher-lohnt-sich",
        element: <PVSpeicherArticle />,
      },
      {
        path: "ratgeber/photovoltaik/einspeiseverguetung-verstehen",
        element: <EinspeiseverguetungArticle />,
      },
      {
        path: "ratgeber/photovoltaik/dach-eignung-checkliste",
        element: <DachEignungArticle />,
      },
      {
        path: "ratgeber/photovoltaik/angebote-vergleichen-fehler",
        element: <AngeboteVergleichenArticle />,
      },
      {
        path: "ratgeber/wechselwissen",
        element: <WechselwissenCategoryPage />,
      },
      {
        path: "ratgeber/wechselwissen/kuendigungsfristen-strom-gas",
        element: <KuendigungsfristenArticle />,
      },
      {
        path: "ratgeber/wechselwissen/lieferantenwechsel-ablauf",
        element: <LieferantenwechselAblaufArticle />,
      },
      {
        path: "ratgeber/wechselwissen/was-tun-wenn-wechsel-schiefgeht",
        element: <WechselSchiefgehtArticle />,
      },
      {
        path: ROUTES.agb.slice(1),
        element: <AgbPage />,
      },
      {
        path: ROUTES.widerruf.slice(1),
        element: <WiderrufPage />,
      },
      {
        path: ROUTES.sitemap.slice(1),
        element: <SitemapPage />,
      },
      {
        path: ROUTES.faq.slice(1),
        element: <FaqPage />,
      },
      {
        path: "danke",
        element: <ThankYouPage />,
      },
      {
        path: "thank-you",
        element: <Navigate to="/danke" replace />,
      },
      {
        path: "blog",
        element: <BlogPage />,
      },
      {
        path: "blog/:slug",
        element: <BlogDetailPage />,
      },
      {
        path: "*",
        element: <Navigate to={ROUTES.home} replace />,
      },
    ],
  },
];

function AppRoutes() {
  return useRoutes(routes);
}

type AppRouterProps = {
  pathname?: string;
};

export default function AppRouter({ pathname = '/' }: AppRouterProps) {
  return (
    <MemberProvider>
      {typeof window === 'undefined' ? (
        <StaticRouter basename={import.meta.env.BASE_NAME} location={pathname}>
          <AppRoutes />
        </StaticRouter>
      ) : (
        <BrowserRouter basename={import.meta.env.BASE_NAME}>
          <AppRoutes />
        </BrowserRouter>
      )}
    </MemberProvider>
  );
}
