import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import Breadcrumb from '@/components/Breadcrumb';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import LocalBusinessSchema from '@/components/LocalBusinessSchema';
import { ROUTES } from '@/lib/routes';

type BreadcrumbSchemaItem = {
  name: string;
  url: string;
};

interface StromvergleichCityLayoutProps {
  seo: {
    title: string;
    description: string;
    keywords?: string;
    canonical?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
  };
  breadcrumbLabel: string;
  breadcrumbPath: string;
  breadcrumbAbsoluteUrl?: string;
  cityName: string;
  citySlug: string;
  children: React.ReactNode;
}

const PREFERRED_ORIGIN = 'https://www.energievergleich.shop';

const buildAbsoluteUrl = (pathOrUrl: string) => {
  if (!pathOrUrl) return pathOrUrl;
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) return pathOrUrl;
  if (!pathOrUrl.startsWith('/')) return `${PREFERRED_ORIGIN}/${pathOrUrl}`;
  return `${PREFERRED_ORIGIN}${pathOrUrl}`;
};

export default function StromvergleichCityLayout({
  seo,
  breadcrumbLabel,
  breadcrumbPath,
  breadcrumbAbsoluteUrl,
  cityName,
  citySlug,
  children,
}: StromvergleichCityLayoutProps) {
  const breadcrumbItems = [
    { label: 'Startseite', path: ROUTES.home },
    { label: breadcrumbLabel, path: breadcrumbPath },
  ];

  const breadcrumbSchema: BreadcrumbSchemaItem[] = [
    { name: 'Startseite', url: buildAbsoluteUrl(ROUTES.home) },
    { name: breadcrumbLabel, url: breadcrumbAbsoluteUrl ? breadcrumbAbsoluteUrl : buildAbsoluteUrl(breadcrumbPath) },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background break-words leading-mobile">
      <SEOHead
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical={seo.canonical}
        ogTitle={seo.ogTitle}
        ogDescription={seo.ogDescription}
        ogImage={seo.ogImage}
      />
      <BreadcrumbSchema items={breadcrumbSchema} />
      <LocalBusinessSchema cityName={cityName} citySlug={citySlug} />
      <Header />
      <Breadcrumb items={breadcrumbItems} />
      <div className="flex-1 flex flex-col [&>main]:!min-h-0 [&>main]:flex-1">
        {children}
      </div>
      <Footer />
    </div>
  );
}
