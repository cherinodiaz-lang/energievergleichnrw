import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Outlet, useLocation } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ScrollToTop } from '@/lib/scroll-to-top';
import { SEO_CONFIG } from '@/lib/seo-config';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import AnalyticsBootstrap from '@/components/AnalyticsBootstrap';
import OrganizationSchema from '@/components/OrganizationSchema';
import LocalBusinessSchema from '@/components/LocalBusinessSchema';
import WebsiteSchema from '@/components/WebsiteSchema';
import SearchConsoleVerification from '@/components/SearchConsoleVerification';
import HowToSchema from '@/components/HowToSchema';
import ReviewSchema from '@/components/ReviewSchema';
import FAQPageSchema from '@/components/FAQPageSchema';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

// Fallback component for lazy-loaded routes
const LazyFallback = () => <div className="min-h-screen flex items-center justify-center" />;

// Lazy-loaded page components
const HomePage = lazy(() => import('@/components/pages/HomePage'));
const ThankYouPage = lazy(() => import('@/components/pages/ThankYouPage'));
const BlogPage = lazy(() => import('@/components/pages/BlogPage'));
const BlogDetailPage = lazy(() => import('@/components/pages/BlogDetailPage'));
const NotFoundPage = lazy(() => import('@/components/pages/NotFoundPage'));
const AgbPage = lazy(() => import('@/components/pages/AgbPage'));
const DatenschutzPage = lazy(() => import('@/components/pages/DatenschutzPage'));
const FaqPage = lazy(() => import('@/components/pages/FaqPage'));
const GasvergleichNrwPage = lazy(() => import('@/components/pages/GasvergleichNrwPage'));
const GewerbegasPage = lazy(() => import('@/components/pages/GewerbegasPage'));
const GewerbestromPage = lazy(() => import('@/components/pages/GewerbestromPage'));
const ImpressumPage = lazy(() => import('@/components/pages/ImpressumPage'));
const KontaktPage = lazy(() => import('@/components/pages/KontaktPage'));
const MethodologyPage = lazy(() => import('@/components/pages/MethodologyPage'));
const PhotovoltaikNrwPage = lazy(() => import('@/components/pages/PhotovoltaikNrwPage'));
const StromvergleichNrwPage = lazy(() => import('@/components/pages/StromvergleichNrwPage'));
const WiderrufPage = lazy(() => import('@/components/pages/WiderrufPage'));
const SitemapPage = lazy(() => import('@/components/pages/SitemapPage'));
const RatgeberPage = lazy(() => import('@/components/pages/RatgeberPage'));
const GasCategoryPage = lazy(() => import('@/components/pages/ratgeber/GasCategoryPage'));
const StromCategoryPage = lazy(() => import('@/components/pages/ratgeber/StromCategoryPage'));
const PhotovoltaikCategoryPage = lazy(() => import('@/components/pages/ratgeber/PhotovoltaikCategoryPage'));
const GewerbeCategoryPage = lazy(() => import('@/components/pages/ratgeber/GewerbeCategoryPage'));
const WechselwissenCategoryPage = lazy(() => import('@/components/pages/ratgeber/WechselwissenCategoryPage'));
const RatgeberArticlePage = lazy(() => import('@/components/pages/ratgeber/RatgeberArticlePage'));

// Layout component that includes ScrollToTop and SEO components
function Layout() {
  const location = useLocation();

  const normalizedPath =
    location.pathname === '/' ? '/' : location.pathname.replace(/\/+$/, '');
  const isHomePage = normalizedPath === '/';
  const isFaqPage = normalizedPath === '/faq';
  const shouldRenderHowToAndReviewSchema = isHomePage;
  const shouldRenderFaqSchema = isHomePage || isFaqPage;

  return (
    <div className="min-w-0 overflow-x-hidden">
      <ScrollToTop />
      <OrganizationSchema />
      <LocalBusinessSchema />
      <WebsiteSchema />
      {shouldRenderHowToAndReviewSchema && <HowToSchema />}
      {shouldRenderHowToAndReviewSchema && <ReviewSchema />}
      {shouldRenderFaqSchema && <FAQPageSchema />}
      <BreadcrumbSchema />
      <AnalyticsBootstrap measurementId={SEO_CONFIG.googleAnalyticsId} />
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
      },
      {
        path: "danke",
        element: <ThankYouPage />,
      },
      {
        path: "thank-you",
        element: <ThankYouPage />,
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
        path: "agb",
        element: <AgbPage />,
      },
      {
        path: "datenschutz",
        element: <DatenschutzPage />,
      },
      {
        path: "faq",
        element: <FaqPage />,
      },
      {
        path: "gasvergleich-nrw",
        element: <GasvergleichNrwPage />,
      },
      {
        path: "gewerbegas",
        element: <GewerbegasPage />,
      },
      {
        path: "gewerbestrom",
        element: <GewerbestromPage />,
      },
      {
        path: "impressum",
        element: <ImpressumPage />,
      },
      {
        path: "kontakt",
        element: <KontaktPage />,
      },
      {
        path: "methodik",
        element: <MethodologyPage />,
      },
      {
        path: "photovoltaik-nrw",
        element: <PhotovoltaikNrwPage />,
      },
      {
        path: "stromvergleich-nrw",
        element: <StromvergleichNrwPage />,
      },
      {
        path: "widerruf",
        element: <WiderrufPage />,
      },
      {
        path: "sitemap",
        element: <SitemapPage />,
      },
      {
        path: "ratgeber",
        element: <RatgeberPage />,
      },
      {
        path: "ratgeber/gas",
        element: <GasCategoryPage />,
      },
      {
        path: "ratgeber/strom",
        element: <StromCategoryPage />,
      },
      {
        path: "ratgeber/photovoltaik",
        element: <PhotovoltaikCategoryPage />,
      },
      {
        path: "ratgeber/gewerbe",
        element: <GewerbeCategoryPage />,
      },
      {
        path: "ratgeber/wechselwissen",
        element: <WechselwissenCategoryPage />,
      },
      {
        path: "ratgeber/:category/:article",
        element: <RatgeberArticlePage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
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
