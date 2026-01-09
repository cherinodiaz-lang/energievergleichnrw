import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path: string;
}

const BREADCRUMB_MAP: Record<string, BreadcrumbItem[]> = {
  '/': [],
  '/gewerbestrom': [
    { label: 'Startseite', path: '/' },
    { label: 'Gewerbestrom', path: '/gewerbestrom' },
  ],
  '/gewerbegas': [
    { label: 'Startseite', path: '/' },
    { label: 'Gewerbegas', path: '/gewerbegas' },
  ],
};

export default function Breadcrumbs() {
  const location = useLocation();
  const breadcrumbs = BREADCRUMB_MAP[location.pathname] || [];

  // Don't show breadcrumbs on homepage
  if (breadcrumbs.length === 0) {
    return null;
  }

  // Generate JSON-LD structured data
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Startseite',
        item: 'https://energievergleich.nrw/',
      },
      ...breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: item.label,
        item: `https://energievergleich.nrw${item.path}`,
      })),
    ],
  };

  // Add JSON-LD to head
  useEffect(() => {
    let script = document.getElementById('breadcrumb-schema');
    if (!script) {
      script = document.createElement('script');
      script.id = 'breadcrumb-schema';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(breadcrumbSchema);
      document.head.appendChild(script);
    } else {
      script.textContent = JSON.stringify(breadcrumbSchema);
    }
  }, [breadcrumbs]);

  return (
    <nav
      aria-label="Breadcrumb"
      className="bg-gray-50 border-b border-gray-200 px-4 sm:px-6 lg:px-12 py-3 sm:py-4"
    >
      <div className="max-w-[120rem] mx-auto">
        <ol className="flex items-center gap-2 text-sm">
          <li>
            <Link
              to="/"
              className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors"
              aria-current="page"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Startseite</span>
            </Link>
          </li>

          {breadcrumbs.map((item, index) => (
            <li key={item.path} className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-gray-400" />
              {index === breadcrumbs.length - 1 ? (
                <span className="text-gray-700 font-medium" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
