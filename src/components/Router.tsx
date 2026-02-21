import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet, useLocation, Link } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { ScrollToTop } from '@/lib/scroll-to-top';
import { SEO_CONFIG } from '@/lib/seo-config';
import { getPageSEO } from '@/lib/seo-config';
import { ROUTES } from '@/lib/routes';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import OrganizationSchema from '@/components/OrganizationSchema';
import LocalBusinessSchema from '@/components/LocalBusinessSchema';
import WebsiteSchema from '@/components/WebsiteSchema';
import SearchConsoleVerification from '@/components/SearchConsoleVerification';
import SitemapNotification from '@/components/SitemapNotification';
import ConsentBanner from '@/components/ConsentBanner';
import { initializeGA4, trackPageView } from '@/services/ga4-tracking';
import HowToSchema from '@/components/HowToSchema';
import ReviewSchema from '@/components/ReviewSchema';
import FAQPageSchema from '@/components/FAQPageSchema';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import SEOHead from '@/components/SEOHead';

// Error fallback for lazy-loaded routes - defined before lazy imports
const LazyErrorFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-4">Fehler beim Laden der Seite</h1>
      <p className="text-gray-600">Die Seite konnte nicht geladen werden. Bitte versuchen Sie es später erneut.</p>
    </div>
  </div>
);

// Fallback component for lazy-loaded routes
const LazyFallback = () => <div className="min-h-screen flex items-center justify-center" />;

// Lazy load non-critical pages for code-splitting with error handling
const GewerbestromPage = lazy(() => import('@/components/pages/GewerbestromPage').catch(() => ({ default: LazyErrorFallback })));
const GewerbegasPage = lazy(() => import('@/components/pages/GewerbegasPage').catch(() => ({ default: LazyErrorFallback })));
const StromvergleichNrwPage = lazy(() => import('@/components/pages/StromvergleichNrwPage').catch(() => ({ default: LazyErrorFallback })));
const StromvergleichKoelnPage = lazy(() => import('@/components/pages/StromvergleichKoelnPage').catch(() => ({ default: LazyErrorFallback })));
const StromvergleichEssenPage = lazy(() => import('@/components/pages/StromvergleichEssenPage').catch(() => ({ default: LazyErrorFallback })));
const StromvergleichBochumPage = lazy(() => import('@/components/pages/StromvergleichBochumPage').catch(() => ({ default: LazyErrorFallback })));
const StromvergleichDuisburgPage = lazy(() => import('@/components/pages/StromvergleichDuisburgPage').catch(() => ({ default: LazyErrorFallback })));
const StromvergleichWuppertalPage = lazy(() => import('@/components/pages/StromvergleichWuppertalPage').catch(() => ({ default: LazyErrorFallback })));
const StromvergleichBielefeldPage = lazy(() => import('@/components/pages/StromvergleichBielefeldPage').catch(() => ({ default: LazyErrorFallback })));
const StromvergleichBonnPage = lazy(() => import('@/components/pages/StromvergleichBonnPage').catch(() => ({ default: LazyErrorFallback })));
const StromvergleichMuensterPage = lazy(() => import('@/components/pages/StromvergleichMuensterPage').catch(() => ({ default: LazyErrorFallback })));
const StromvergleichDuesseldorfPage = lazy(() => import('@/components/pages/StromvergleichDuesseldorfPage').catch(() => ({ default: LazyErrorFallback })));
const StromvergleichDortmundPage = lazy(() => import('@/components/pages/StromvergleichDortmundPage').catch(() => ({ default: LazyErrorFallback })));
const GasvergleichNrwPage = lazy(() => import('@/components/pages/GasvergleichNrwPage').catch(() => ({ default: LazyErrorFallback })));
const PhotovoltaikNrwPage = lazy(() => import('@/components/pages/PhotovoltaikNrwPage').catch(() => ({ default: LazyErrorFallback })));
const KontaktPage = lazy(() => import('@/components/pages/KontaktPage').catch(() => ({ default: LazyErrorFallback })));
const ImpressumPage = lazy(() => import('@/components/pages/ImpressumPage').catch(() => ({ default: LazyErrorFallback })));
const DatenschutzPage = lazy(() => import('@/components/pages/DatenschutzPage').catch(() => ({ default: LazyErrorFallback })));
const RatgeberPage = lazy(() => import('@/components/pages/RatgeberPage').catch(() => ({ default: LazyErrorFallback })));
const StromCategoryPage = lazy(() => import('@/components/pages/ratgeber/StromCategoryPage').catch(() => ({ default: LazyErrorFallback })));
const GasCategoryPage = lazy(() => import('@/components/pages/ratgeber/GasCategoryPage').catch(() => ({ default: LazyErrorFallback })));
const GewerbeCategoryPage = lazy(() => import('@/components/pages/ratgeber/GewerbeCategoryPage').catch(() => ({ default: LazyErrorFallback })));
const PhotovoltaikCategoryPage = lazy(() => import('@/components/pages/ratgeber/PhotovoltaikCategoryPage').catch(() => ({ default: LazyErrorFallback })));
const WechselwissenCategoryPage = lazy(() => import('@/components/pages/ratgeber/WechselwissenCategoryPage').catch(() => ({ default: LazyErrorFallback })));
const StromGrundversorgungArticle = lazy(() => import('@/components/pages/ratgeber/articles/StromGrundversorgungArticle').catch(() => ({ default: LazyErrorFallback })));
const StromanbieterwechselnNrwArticle = lazy(() => import('@/components/pages/ratgeber/articles/StromanbieterwechselnNrwArticle').catch(() => ({ default: LazyErrorFallback })));
const GrundversorgungVsSondervertragArticle = lazy(() => import('@/components/pages/ratgeber/articles/GrundversorgungVsSondervertragArticle').catch(() => ({ default: LazyErrorFallback })));
const SofortSparmoeglichkeitenArticle = lazy(() => import('@/components/pages/ratgeber/articles/SofortSparmoeglichkeitenArticle').catch(() => ({ default: LazyErrorFallback })));
const MethodologyPage = lazy(() => import('@/components/pages/MethodologyPage').catch(() => ({ default: LazyErrorFallback })));
const NeukndenbonusFallenArticle = lazy(() => import('@/components/pages/ratgeber/articles/NeukndenbonusFallenArticle').catch(() => ({ default: LazyErrorFallback })));
const PreiserhoeungWasTunArticle = lazy(() => import('@/components/pages/ratgeber/articles/PreiserhoeungWasTunArticle').catch(() => ({ default: LazyErrorFallback })));
const UmzugStromvertragArticle = lazy(() => import('@/components/pages/ratgeber/articles/UmzugStromvertragArticle').catch(() => ({ default: LazyErrorFallback })));
const StromtarifVertragslaufzeitArticle = lazy(() => import('@/components/pages/ratgeber/articles/StromtarifVertragslaufzeitArticle').catch(() => ({ default: LazyErrorFallback })));
const MaloIdZaehlernummerArticle = lazy(() => import('@/components/pages/ratgeber/articles/MaloIdZaehlernummerArticle').catch(() => ({ default: LazyErrorFallback })));
const GasanbieterWechselnNrwArticle = lazy(() => import('@/components/pages/ratgeber/articles/GasanbieterWechselnNrwArticle').catch(() => ({ default: LazyErrorFallback })));
const GrundversorgungGasSondervertragArticle = lazy(() => import('@/components/pages/ratgeber/articles/GrundversorgungGasSondervertragArticle').catch(() => ({ default: LazyErrorFallback })));
const PreiserhoeungGasRechteArticle = lazy(() => import('@/components/pages/ratgeber/articles/PreiserhoeungGasRechteArticle').catch(() => ({ default: LazyErrorFallback })));
const UmzugGasvertragArticle = lazy(() => import('@/components/pages/ratgeber/articles/UmzugGasvertragArticle').catch(() => ({ default: LazyErrorFallback })));
const HeizungsartVerbrauchArticle = lazy(() => import('@/components/pages/ratgeber/articles/HeizungsartVerbrauchArticle').catch(() => ({ default: LazyErrorFallback })));
const GaspreisgarantieArticle = lazy(() => import('@/components/pages/ratgeber/articles/GaspreisgarantieArticle').catch(() => ({ default: LazyErrorFallback })));
const GewerbestromVertragArticle = lazy(() => import('@/components/pages/ratgeber/articles/GewerbestromVertragArticle').catch(() => ({ default: LazyErrorFallback })));
const GewerbegasBeschaffungArticle = lazy(() => import('@/components/pages/ratgeber/articles/GewerbegasBeschaffungArticle').catch(() => ({ default: LazyErrorFallback })));
const LastprofilLeistungspreisArticle = lazy(() => import('@/components/pages/ratgeber/articles/LastprofilLeistungspreisArticle').catch(() => ({ default: LazyErrorFallback })));
const PVKostenNrwArticle = lazy(() => import('@/components/pages/ratgeber/articles/PVKostenNrwArticle').catch(() => ({ default: LazyErrorFallback })));
const PVSpeicherArticle = lazy(() => import('@/components/pages/ratgeber/articles/PVSpeicherArticle').catch(() => ({ default: LazyErrorFallback })));
const EinspeiseverguetungArticle = lazy(() => import('@/components/pages/ratgeber/articles/EinspeiseverguetungArticle').catch(() => ({ default: LazyErrorFallback })));
const DachEignungArticle = lazy(() => import('@/components/pages/ratgeber/articles/DachEignungArticle').catch(() => ({ default: LazyErrorFallback })));
const AngeboteVergleichenArticle = lazy(() => import('@/components/pages/ratgeber/articles/AngeboteVergleichenArticle').catch(() => ({ default: LazyErrorFallback })));
const KuendigungsfristenArticle = lazy(() => import('@/components/pages/ratgeber/articles/KuendigungsfristenArticle').catch(() => ({ default: LazyErrorFallback })));
const LieferantenwechselAblaufArticle = lazy(() => import('@/components/pages/ratgeber/articles/LieferantenwechselAblaufArticle').catch(() => ({ default: LazyErrorFallback })));
const WechselSchiefgehtArticle = lazy(() => import('@/components/pages/ratgeber/articles/WechselSchiefgehtArticle').catch(() => ({ default: LazyErrorFallback })));
const ThankYouPage = lazy(() => import('@/components/pages/ThankYouPage').catch(() => ({ default: LazyErrorFallback })));
const BlogPage = lazy(() => import('@/components/pages/BlogPage').catch(() => ({ default: LazyErrorFallback })));
const BlogDetailPage = lazy(() => import('@/components/pages/BlogDetailPage').catch(() => ({ default: LazyErrorFallback })));
const AboutPage = lazy(() => import('@/components/pages/AboutPage').catch(() => ({ default: LazyErrorFallback })));
const UeberUnsPage = lazy(() => import('@/components/pages/UeberUnsPage').catch(() => ({ default: LazyErrorFallback })));

const CITY_SEO_BY_PATH = {
  '/stromvergleich-essen': 'stromvergleich-essen',
  '/stromvergleich-bochum': 'stromvergleich-bochum',
  '/stromvergleich-duisburg': 'stromvergleich-duisburg',
  '/stromvergleich-koeln': 'stromvergleich-koeln',
  '/stromvergleich-duesseldorf': 'stromvergleich-duesseldorf',
  '/stromvergleich-dortmund': 'stromvergleich-dortmund',
  '/stromvergleich-wuppertal': 'stromvergleich-wuppertal',
  '/stromvergleich-bielefeld': 'stromvergleich-bielefeld',
  '/stromvergleich-bonn': 'stromvergleich-bonn',
  '/stromvergleich-muenster': 'stromvergleich-muenster',
} as const;

type CitySEOKey = (typeof CITY_SEO_BY_PATH)[keyof typeof CITY_SEO_BY_PATH];

const CITY_LINKS: Array<{ path: string; label: string }> = [
  { path: '/stromvergleich-essen', label: 'Stromvergleich Essen' },
  { path: '/stromvergleich-bochum', label: 'Stromvergleich Bochum' },
  { path: '/stromvergleich-duisburg', label: 'Stromvergleich Duisburg' },
  { path: '/stromvergleich-koeln', label: 'Stromvergleich Köln' },
  { path: '/stromvergleich-duesseldorf', label: 'Stromvergleich Düsseldorf' },
  { path: '/stromvergleich-dortmund', label: 'Stromvergleich Dortmund' },
  { path: '/stromvergleich-wuppertal', label: 'Stromvergleich Wuppertal' },
  { path: '/stromvergleich-bielefeld', label: 'Stromvergleich Bielefeld' },
  { path: '/stromvergleich-bonn', label: 'Stromvergleich Bonn' },
  { path: '/stromvergleich-muenster', label: 'Stromvergleich Münster' },
];

// Layout component that includes ScrollToTop and SEO components
function Layout() {
  const location = useLocation();

  // Initialize GA4 on app load (consent mode enabled by default)
  useEffect(() => {
    if (SEO_CONFIG.googleAnalyticsId) {
      initializeGA4(SEO_CONFIG.googleAnalyticsId);
    }
  }, []);

  // Track SPA page views on route changes (consent-safe)
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);

  const cityKey = (CITY_SEO_BY_PATH as Record<string, CitySEOKey | undefined>)[location.pathname];
  const citySeo = cityKey ? getPageSEO(cityKey) : null;

  const relatedCityLinks = CITY_LINKS.filter((c) => c.path !== location.pathname).slice(0, 8);

  return (
    <div className="min-w-0 overflow-x-hidden ox-hidden">
      <ScrollToTop />
      {citySeo ? (
        <SEOHead
          title={citySeo.title}
          description={citySeo.description}
          keywords={citySeo.keywords}
          ogTitle={citySeo.ogTitle}
          ogDescription={citySeo.ogDescription}
        />
      ) : null}
      <OrganizationSchema />
      <LocalBusinessSchema />
      <WebsiteSchema />
      <HowToSchema />
      <ReviewSchema />
      <FAQPageSchema />
      <BreadcrumbSchema />
      <SearchConsoleVerification verificationCode={SEO_CONFIG.googleSearchConsoleVerification} />
      <SitemapNotification />
      <ConsentBanner />
      <Suspense fallback={<LazyFallback />}>
        <Outlet />
      </Suspense>

      {citySeo ? (
        <section className="bg-white">
          <div className="mx-auto w-full max-w-5xl px-4 pb-12">
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
              <h2 className="text-lg font-semibold text-gray-900">Weitere Städte in NRW</h2>
              <p className="mt-2 text-sm text-gray-700">
                Interne Verlinkung hilft, die passenden Seiten schneller zu finden – und stärkt die thematische Struktur.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  to={ROUTES.stromvergleich}
                  className="rounded-full bg-white px-3 py-1 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-gray-200 hover:bg-gray-100"
                >
                  Stromvergleich NRW
                </Link>
                {relatedCityLinks.map((c) => (
                  <Link
                    key={c.path}
                    to={c.path}
                    className="rounded-full bg-white px-3 py-1 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-gray-200 hover:bg-gray-100"
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </div>
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
        element: <Suspense fallback={<LazyFallback />}><GewerbestromPage /></Suspense>,
        routeMetadata: {
          pageIdentifier: 'gewerbestrom',
        },
      },
      {
        path: "gewerbegas",
        element: <Suspense fallback={<LazyFallback />}><GewerbegasPage /></Suspense>,
        routeMetadata: {
          pageIdentifier: 'gewerbegas',
        },
      },
      {
        path: "stromvergleich-nrw",
        element: <Suspense fallback={<LazyFallback />}><StromvergleichNrwPage /></Suspense>,
        routeMetadata: {
          pageIdentifier: 'stromvergleich-nrw',
        },
      },
      {
        path: "stromvergleich-koeln",
        element: <Suspense fallback={<LazyFallback />}><StromvergleichKoelnPage /></Suspense>,
        routeMetadata: {
          pageIdentifier: 'stromvergleich-koeln',
        },
      },
      {
        path: "stromvergleich-essen",
        element: <Suspense fallback={<LazyFallback />}><StromvergleichEssenPage /></Suspense>,
        routeMetadata: {
          pageIdentifier: 'stromvergleich-essen',
        },
      },
      {
        path: "stromvergleich-bochum",
        element: <Suspense fallback={<LazyFallback />}><StromvergleichBochumPage /></Suspense>,
        routeMetadata: {
          pageIdentifier: 'stromvergleich-bochum',
        },
      },
      {
        path: "stromvergleich-duisburg",
        element: <Suspense fallback={<LazyFallback />}><StromvergleichDuisburgPage /></Suspense>,
        routeMetadata: {
          pageIdentifier: 'stromvergleich-duisburg',
        },
      },
      {
        path: "stromvergleich-wuppertal",
        element: <Suspense fallback={<LazyFallback />}><StromvergleichWuppertalPage /></Suspense>,
        routeMetadata: {
          pageIdentifier: 'stromvergleich-wuppertal',
        },
      },
      {
        path: "stromvergleich-bielefeld",
        element: <Suspense fallback={<LazyFallback />}><StromvergleichBielefeldPage /></Suspense>,
        routeMetadata: {
          pageIdentifier: 'stromvergleich-bielefeld',
        },
      },
      {
        path: "stromvergleich-bonn",
        element: <Suspense fallback={<LazyFallback />}><StromvergleichBonnPage /></Suspense>,
        routeMetadata: {
          pageIdentifier: 'stromvergleich-bonn',
        },
      },
      {
        path: "stromvergleich-muenster",
        element: <Suspense fallback={<LazyFallback />}><StromvergleichMuensterPage /></Suspense>,
        routeMetadata: {
          pageIdentifier: 'stromvergleich-muenster',
        },
      },
      {
        path: "stromvergleich-duesseldorf",
        element: <Suspense fallback={<LazyFallback />}><StromvergleichDuesseldorfPage /></Suspense>,
        routeMetadata: {
          pageIdentifier: 'stromvergleich-duesseldorf',
        },
      },
      {
        path: "stromvergleich-dortmund",
        element: <Suspense fallback={<LazyFallback />}><StromvergleichDortmundPage /></Suspense>,
        routeMetadata: {
          pageIdentifier: 'stromvergleich-dortmund',
        },
      },
      {
        path: "gasvergleich-nrw",
        element: <Suspense fallback={<LazyFallback />}><GasvergleichNrwPage /></Suspense>,
        routeMetadata: {
          pageIdentifier: 'gasvergleich-nrw',
        },
      },
      {
        path: "photovoltaik-nrw",
        element: <Suspense fallback={<LazyFallback />}><PhotovoltaikNrwPage /></Suspense>,
        routeMetadata: {
          pageIdentifier: 'photovoltaik-nrw',
        },
      },
      {
        path: "kontakt",
        element: <Suspense fallback={<LazyFallback />}><KontaktPage /></Suspense>,
        routeMetadata: {
          pageIdentifier: 'kontakt',
        },
      },
      {
        path: ROUTES.impressum.slice(1),
        element: <Suspense fallback={<LazyFallback />}><ImpressumPage /></Suspense>,
        routeMetadata: {
          pageIdentifier: 'impressum',
        },
      },
      {
        path: ROUTES.datenschutz.slice(1),
        element: <Suspense fallback={<LazyFallback />}><DatenschutzPage /></Suspense>,
        routeMetadata: {
          pageIdentifier: 'datenschutz',
        },
      },
      {
        path: "methodik",
        element: <Suspense fallback={<LazyFallback />}><MethodologyPage /></Suspense>,
        routeMetadata: {
          pageIdentifier: 'methodik',
        },
      },
      {
        path: "ratgeber",
        element: <Suspense fallback={<LazyFallback />}><RatgeberPage /></Suspense>,
        routeMetadata: {
          pageIdentifier: 'ratgeber',
        },
      },
      {
        path: "ratgeber/strom",
        element: <Suspense fallback={<LazyFallback />}><StromCategoryPage /></Suspense>,
        routeMetadata: {
          pageIdentifier: 'ratgeber-strom',
        },
      },
      {
        path: "ratgeber/strom/grundversorgung",
        element: <Suspense fallback={<LazyFallback />}><StromGrundversorgungArticle /></Suspense>,
        routeMetadata: {
          pageIdentifier: 'ratgeber-strom-grundversorgung',
        },
      },
      {
        path: "ratgeber/strom/sofortige-sparmoeglichkeiten",
        element: <Suspense fallback={<LazyFallback />}><SofortSparmoeglichkeitenArticle /></Suspense>,
        routeMetadata: {
          pageIdentifier: 'ratgeber-strom-sparmoeglichkeiten',
        },
      },
      {
        path: "ratgeber/strom/stromanbieterwechsel-nrw",
        element: <Suspense fallback={<LazyFallback />}><StromanbieterwechselnNrwArticle /></Suspense>,
        routeMetadata: {
          pageIdentifier: 'ratgeber-strom-anbieterwechsel',
        },
      },
      {
        path: "ratgeber/strom/grundversorgung-vs-sondervertrag",
        element: <Suspense fallback={<LazyFallback />}><GrundversorgungVsSondervertragArticle /></Suspense>,
        routeMetadata: {
          pageIdentifier: 'ratgeber-strom-grundversorgung-vs-sondervertrag',
        },
      },
      {
        path: "ratgeber/strom/neukundenboni-fallen",
        element: <Suspense fallback={<LazyFallback />}><NeukndenbonusFallenArticle /></Suspense>,
        routeMetadata: {
          pageIdentifier: 'ratgeber-strom-neukundenboni',
        },
      },
      {
        path: "ratgeber/strom/preiserhoeung-was-tun",
        element: <Suspense fallback={<LazyFallback />}><PreiserhoeungWasTunArticle /></Suspense>,
        routeMetadata: {
          pageIdentifier: 'ratgeber-strom-preiserhoeung',
        },
      },
      {
        path: "ratgeber/strom/umzug-stromvertrag",
        element: <Suspense fallback={<LazyFallback />}><UmzugStromvertragArticle /></Suspense>,
        routeMetadata: {
          pageIdentifier: 'ratgeber-strom-umzug',
        },
      },
      {
        path: "ratgeber/strom/stromtarif-vertragslaufzeit",
        element: <Suspense fallback={<LazyFallback />}><StromtarifVertragslaufzeitArticle /></Suspense>,
        routeMetadata: {
          pageIdentifier: 'ratgeber-strom-vertragslaufzeit',
        },
      },
      {
        path: "ratgeber/strom/malo-id-zaehlernummer",
        element: <Suspense fallback={<LazyFallback />}><MaloIdZaehlernummerArticle /></Suspense>,
        routeMetadata: {
          pageIdentifier: 'ratgeber-strom-malo-id',
        },
      },
      {
        path: "ratgeber/gas",
        element: <Suspense fallback={<LazyFallback />}><GasCategoryPage /></Suspense>,
        routeMetadata: {
          pageIdentifier: 'ratgeber-gas',
        },
      },
      {
        path: "ratgeber/gas/gasanbieter-wechseln-nrw",
        element: <Suspense fallback={<LazyFallback />}><GasanbieterWechselnNrwArticle /></Suspense>,
        routeMetadata: {
          pageIdentifier: 'ratgeber-gas-anbieterwechsel',
        },
      },
      {
        path: "ratgeber/gas/grundversorgung-gas-sondervertrag",
        element: <Suspense fallback={<LazyFallback />}><GrundversorgungGasSondervertragArticle /></Suspense>,
        routeMetadata: {
          pageIdentifier: 'ratgeber-gas-grundversorgung-vs-sondervertrag',
        },
      },
      {
        path: "ratgeber/gas/preiserhoeung-gas-rechte",
        element: <Suspense fallback={<LazyFallback />}><PreiserhoeungGasRechteArticle /></Suspense>,
        routeMetadata: {
          pageIdentifier: 'ratgeber-gas-preiserhoeung',
        },
      },
      {
        path: "ratgeber/gas/umzug-gasvertrag",
        element: <Suspense fallback={<LazyFallback />}><UmzugGasvertragArticle /></Suspense>,
        routeMetadata: {
          pageIdentifier: 'ratgeber-gas-umzug',
        },
      },
      {
        path: "ratgeber/gas/heizungsart-verbrauch",
        element: <Suspense fallback={<LazyFallback />}><HeizungsartVerbrauchArticle /></Suspense>,
        routeMetadata: {
          pageIdentifier: 'ratgeber-gas-heizungsart',
        },
      },
      {
        path: "ratgeber/gas/gaspreisgarantie-worauf-achten",
        element: <Suspense fallback={<LazyFallback />}><GaspreisgarantieArticle /></Suspense>,
        routeMetadata: {
          pageIdentifier: 'ratgeber-gas-preisgarantie',
        },
      },
      {
        path: "ratgeber/gewerbe",
        element: <Suspense fallback={<LazyFallback />}><GewerbeCategoryPage /></Suspense>,
        routeMetadata: {
          pageIdentifier: 'ratgeber-gewerbe',
        },
      },
      {
        path: "ratgeber/gewerbe/gewerbestrom-vertrag-worauf-achten",
        element: <Suspense fallback={<LazyFallback />}><GewerbestromVertragArticle /></Suspense>,
        routeMetadata: {
          pageIdentifier: 'ratgeber-gewerbe-stromvertrag',
        },
      },
      {
        path: "ratgeber/gewerbe/gewerbegas-beschaffung-tipps",
        element: <Suspense fallback={<LazyFallback />}><GewerbegasBeschaffungArticle /></Suspense>,
        routeMetadata: {
          pageIdentifier: 'ratgeber-gewerbe-gasbeschaffung',
        },
      },
      {
        path: "ratgeber/gewerbe/lastprofil-leistungspreis-arbeitspreis",
        element: <Suspense fallback={<LazyFallback />}><LastprofilLeistungspreisArticle /></Suspense>,
        routeMetadata: {
          pageIdentifier: 'ratgeber-gewerbe-lastprofil',
        },
      },
      {
        path: "ratgeber/photovoltaik",
        element: <Suspense fallback={<LazyFallback />}><PhotovoltaikCategoryPage /></Suspense>,
        routeMetadata: {
          pageIdentifier: 'ratgeber-photovoltaik',
        },
      },
      {
        path: "ratgeber/photovoltaik/pv-kosten-nrw-wovon-abhaengig",
        element: <Suspense fallback={<LazyFallback />}><PVKostenNrwArticle /></Suspense>,
        routeMetadata: {
          pageIdentifier: 'ratgeber-photovoltaik-kosten',
        },
      },
      {
        path: "ratgeber/photovoltaik/pv-speicher-lohnt-sich",
        element: <Suspense fallback={<LazyFallback />}><PVSpeicherArticle /></Suspense>,
        routeMetadata: {
          pageIdentifier: 'ratgeber-photovoltaik-speicher',
        },
      },
      {
        path: "ratgeber/photovoltaik/einspeiseverguetung-verstehen",
        element: <Suspense fallback={<LazyFallback />}><EinspeiseverguetungArticle /></Suspense>,
        routeMetadata: {
          pageIdentifier: 'ratgeber-photovoltaik-einspeiseverguetung',
        },
      },
      {
        path: "ratgeber/photovoltaik/dach-eignung-checkliste",
        element: <Suspense fallback={<LazyFallback />}><DachEignungArticle /></Suspense>,
        routeMetadata: {
          pageIdentifier: 'ratgeber-photovoltaik-dacheignung',
        },
      },
      {
        path: "ratgeber/photovoltaik/angebote-vergleichen-fehler",
        element: <Suspense fallback={<LazyFallback />}><AngeboteVergleichenArticle /></Suspense>,
        routeMetadata: {
          pageIdentifier: 'ratgeber-photovoltaik-angebote',
        },
      },
      {
        path: "ratgeber/wechselwissen",
        element: <Suspense fallback={<LazyFallback />}><WechselwissenCategoryPage /></Suspense>,
        routeMetadata: {
          pageIdentifier: 'ratgeber-wechselwissen',
        },
      },
      {
        path: "ratgeber/wechselwissen/kuendigungsfristen-strom-gas",
        element: <Suspense fallback={<LazyFallback />}><KuendigungsfristenArticle /></Suspense>,
        routeMetadata: {
          pageIdentifier: 'ratgeber-wechselwissen-kuendigungsfristen',
        },
      },
      {
        path: "ratgeber/wechselwissen/lieferantenwechsel-ablauf",
        element: <Suspense fallback={<LazyFallback />}><LieferantenwechselAblaufArticle /></Suspense>,
        routeMetadata: {
          pageIdentifier: 'ratgeber-wechselwissen-wechselablauf',
        },
      },
      {
        path: "ratgeber/wechselwissen/was-tun-wenn-wechsel-schiefgeht",
        element: <Suspense fallback={<LazyFallback />}><WechselSchiefgehtArticle /></Suspense>,
        routeMetadata: {
          pageIdentifier: 'ratgeber-wechselwissen-probleme',
        },
      },
      {
        path: "danke",
        element: <Suspense fallback={<LazyFallback />}><ThankYouPage /></Suspense>,
        routeMetadata: {
          pageIdentifier: 'thank-you',
        },
      },
      {
        path: "thank-you",
        element: <Suspense fallback={<LazyFallback />}><ThankYouPage /></Suspense>,
        routeMetadata: {
          pageIdentifier: 'thank-you',
        },
      },
      {
        path: "blog",
        element: <Suspense fallback={<LazyFallback />}><BlogPage /></Suspense>,
        routeMetadata: {
          pageIdentifier: 'blog',
        },
      },
      {
        path: "blog/:slug",
        element: <Suspense fallback={<LazyFallback />}><BlogDetailPage /></Suspense>,
        routeMetadata: {
          pageIdentifier: 'blog-detail',
        },
      },
      {
        path: "about",
        element: <Suspense fallback={<LazyFallback />}><AboutPage /></Suspense>,
        routeMetadata: {
          pageIdentifier: 'about',
        },
      },
      {
        path: "ueber-uns",
        element: <Suspense fallback={<LazyFallback />}><UeberUnsPage /></Suspense>,
        routeMetadata: {
          pageIdentifier: 'ueber-uns',
        },
      },
      {
        path: "*",
        element: <Navigate to={ROUTES.home} replace />,
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
