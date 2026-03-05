/**
 * Enhanced Structured Data Components
 * Vollständige Schema.org Implementierung für besseres SEO
 */

import type { Organization, WebSite, BreadcrumbList, FAQPage } from 'schema-dts';

interface StructuredDataProps {
  type: 'organization' | 'website' | 'breadcrumb' | 'faq';
  data: Organization | WebSite | BreadcrumbList | FAQPage;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          ...data
        })
      }}
    />
  );
}

// Organization Schema
export function OrganizationSchema() {
  const organizationData: Organization = {
    '@type': 'Organization',
    name: 'EnergieVergleich NRW',
    url: 'https://energievergleichnrw.de',
    logo: 'https://energievergleichnrw.de/logo.png',
    description: 'Unabhängiger Energievergleich für Nordrhein-Westfalen. Vergleichen Sie Strom- und Gastarife und sparen Sie bis zu 800€ jährlich.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+49-xxx-xxxxxxx',
      contactType: 'Customer Service',
      areaServed: 'DE',
      availableLanguage: 'German'
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'NRW',
      addressCountry: 'DE'
    },
    sameAs: [
      'https://www.facebook.com/energievergleichnrw',
      'https://twitter.com/energievergleichnrw'
    ]
  };

  return <StructuredData type="organization" data={organizationData} />;
}

// Website Schema mit Sitelinks Search Box
export function WebsiteSchema() {
  const websiteData: WebSite = {
    '@type': 'WebSite',
    name: 'EnergieVergleich NRW',
    url: 'https://energievergleichnrw.de',
    description: 'Der unabhängige Energiepreisvergleich für NRW',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://energievergleichnrw.de/search?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    },
    inLanguage: 'de-DE'
  };

  return <StructuredData type="website" data={websiteData} />;
}

// FAQ Schema Generator
interface FAQItem {
  q: string;
  a: string;
}

interface FAQSchemaProps {
  items: FAQItem[];
}

export function FAQSchema({ items }: FAQSchemaProps) {
  const faqData: FAQPage = {
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a
      }
    }))
  };

  return <StructuredData type="faq" data={faqData} />;
}

// Breadcrumb Schema Generator
export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const breadcrumbData: BreadcrumbList = {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };

  return <StructuredData type="breadcrumb" data={breadcrumbData} />;
}
