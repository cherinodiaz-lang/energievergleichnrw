import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet, useLocation } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { ScrollToTop } from '@/lib/scroll-to-top';
import { SEO_CONFIG } from '@/lib/seo-config';
import { ROUTES } from '@/lib/routes';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import OrganizationSchema from '@/components/OrganizationSchema';
import LocalBusinessSchema from '@/components/LocalBusinessSchema';
import WebsiteSchema from '@/components/WebsiteSchema';
import SearchConsoleVerification from '@/components/SearchConsoleVerification';
import { initializeGA4 } from '@/services/ga4-tracking';
import HowToSchema from '@/components/HowToSchema';
import ReviewSchema from '@/components/ReviewSchema';
import FAQPageSchema from '@/components/FAQPageSchema';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

// Fallback component for lazy-loaded routes
const LazyFallback = () => <div className="min-h-screen flex items-center justify-center" />;

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

  // Initialize GA4 on app load (consent mode enabled by default)
  useEffect(() => {
    if (SEO_CONFIG.googleAnalyticsId) {
      initializeGA4(SEO_CONFIG.googleAnalyticsId);
    }
  }, []);

  const normalizedPath =
    location.pathname === '/' ? '/' : location.pathname.replace(/\/+$/, '');
  const isHomePage = normalizedPath === '/';
  const isFaqPage = normalizedPath === ROUTES.faq;
  const shouldRenderHowToAndReviewSchema = isHomePage;
  const shouldRenderFaqSchema = isHomePage || isFaqPage;

  return (
    <div className="min-w-0 overflow-x-hidden ox-hidden">
      <ScrollToTop />
      <OrganizationSchema />
      <LocalBusinessSchema />
      <WebsiteSchema />
      {shouldRenderHowToAndReviewSchema && <HowToSchema />}
      {shouldRenderHowToAndReviewSchema && <ReviewSchema />}
      {shouldRenderFaqSchema && <FAQPageSchema />}
      <BreadcrumbSchema />
      <SearchConsoleVerification verificationCode={SEO_CONFIG.googleSearchConsoleVerification} />
      <Suspense fallback={<LazyFallback />}>
        <Outlet />
      </Suspense>
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
        path: ROUTES.impressum.slice(1),
        element: <ImpressumPage />,
        routeMetadata: {
          pageIdentifier: 'impressum',
        },
      },
      {
        path: ROUTES.datenschutz.slice(1),
        element: <DatenschutzPage />,
        routeMetadata: {
          pageIdentifier: 'datenschutz',
        },
      },
      {
        path: "methodik",
        element: <MethodologyPage />,
        routeMetadata: {
          pageIdentifier: 'methodik',
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
        path: "ratgeber/strom/sofortige-sparmoeglichkeiten",
        element: <SofortSparmoeglichkeitenArticle />,
        routeMetadata: {
          pageIdentifier: 'ratgeber-strom-sparmoeglichkeiten',
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
        path: ROUTES.agb.slice(1),
        element: <AgbPage />,
        routeMetadata: { pageIdentifier: 'agb' },
      },
      {
        path: ROUTES.widerruf.slice(1),
        element: <WiderrufPage />,
        routeMetadata: { pageIdentifier: 'widerruf' },
      },
      {
        path: ROUTES.sitemap.slice(1),
        element: <SitemapPage />,
        routeMetadata: { pageIdentifier: 'sitemap' },
      },
      {
        path: ROUTES.faq.slice(1),
        element: <FaqPage />,
        routeMetadata: { pageIdentifier: 'faq' },
      },
      {
        path: "danke",
        element: <ThankYouPage />,
        routeMetadata: {
          pageIdentifier: 'thank-you',
        },
      },
      {
        path: "thank-you",
        element: <ThankYouPage />,
        routeMetadata: {
          pageIdentifier: 'thank-you',
        },
      },
      {
        path: "blog",
        element: <BlogPage />,
        routeMetadata: {
          pageIdentifier: 'blog',
        },
      },
      {
        path: "blog/:slug",
        element: <BlogDetailPage />,
        routeMetadata: {
          pageIdentifier: 'blog-detail',
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
