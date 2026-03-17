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

const ThankYouPage = lazy(() => import('@/components/pages/ThankYouPage'));
const BlogPage = lazy(() => import('@/components/pages/BlogPage'));
const BlogDetailPage = lazy(() => import('@/components/pages/BlogDetailPage'));
const NotFoundPage = lazy(() => import('@/components/pages/NotFoundPage'));

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
    <div className="min-w-0 overflow-x-hidden ox-hidden">
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
