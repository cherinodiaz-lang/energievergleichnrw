import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items?: BreadcrumbItem[];
}

export default function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const location = useLocation();

  useEffect(() => {
    const breadcrumbs = items && items.length > 0 ? items : generateBreadcrumbs(location.pathname);
    
    if (breadcrumbs.length <= 1) return; // No breadcrumbs for home page

    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: `https://www.energievergleich.shop${item.url}`,
      })),
    };

    let script = document.getElementById('breadcrumb-schema') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = 'breadcrumb-schema';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(breadcrumbSchema);
      document.head.appendChild(script);
    } else {
      script.textContent = JSON.stringify(breadcrumbSchema);
    }
  }, [items, location.pathname]);

  return null;
}

function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Startseite', url: '/' },
  ];

  // Map routes to breadcrumb labels
  const routeMap: Record<string, string> = {
    'stromvergleich-nrw': 'Stromvergleich NRW',
    'gasvergleich-nrw': 'Gasvergleich NRW',
    'photovoltaik-nrw': 'Photovoltaik NRW',
    'gewerbestrom': 'Gewerbestrom',
    'gewerbegas': 'Gewerbegas',
    'kontakt': 'Kontakt',
    'ratgeber': 'Ratgeber',
    'methodik': 'Methodik',
    'impressum': 'Impressum',
    'datenschutz': 'Datenschutz',
    'danke': 'Danke',
    'thank-you': 'Danke',
    'agb': 'AGB',
    'widerruf': 'Widerrufsbelehrung',
    'sitemap': 'Sitemap',
    'faq': 'FAQ',
    'blog': 'Blog',
  };

  const segments = pathname.split('/').filter(Boolean);
  let currentPath = '';

  segments.forEach((segment) => {
    currentPath += `/${segment}`;
    const label = routeMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
    breadcrumbs.push({ name: label, url: currentPath });
  });

  return breadcrumbs;
}
