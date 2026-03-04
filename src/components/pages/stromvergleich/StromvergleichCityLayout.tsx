import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import Breadcrumb from '@/components/Breadcrumb';
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
  children: React.ReactNode;
}

export default function StromvergleichCityLayout({
  seo,
  breadcrumbLabel,
  breadcrumbPath,
  children,
}: StromvergleichCityLayoutProps) {
  const breadcrumbItems = [
    { label: 'Startseite', path: ROUTES.home },
    { label: breadcrumbLabel, path: breadcrumbPath },
  ];

  return (
    <div className="min-h-screen bg-background break-words leading-mobile">
      <SEOHead
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical={seo.canonical}
        ogTitle={seo.ogTitle}
        ogDescription={seo.ogDescription}
        ogImage={seo.ogImage}
      />
      <Header />
      <Breadcrumb items={breadcrumbItems} />
      {children}
      <Footer />
    </div>
  );
}
