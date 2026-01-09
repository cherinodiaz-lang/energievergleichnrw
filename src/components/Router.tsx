import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import { SEO_CONFIG } from '@/lib/seo-config';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import GewerbestromPage from '@/components/pages/GewerbestromPage';
import GewerbegasPage from '@/components/pages/GewerbegasPage';
import OrganizationSchema from '@/components/OrganizationSchema';
import WebsiteSchema from '@/components/WebsiteSchema';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import SearchConsoleVerification from '@/components/SearchConsoleVerification';
import SitemapNotification from '@/components/SitemapNotification';

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
