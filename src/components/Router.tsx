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
        path: "ratgeber/gas",
        element: <GasCategoryPage />,
        routeMetadata: {
          pageIdentifier: 'ratgeber-gas',
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
        path: "ratgeber/photovoltaik",
        element: <PhotovoltaikCategoryPage />,
        routeMetadata: {
          pageIdentifier: 'ratgeber-photovoltaik',
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
