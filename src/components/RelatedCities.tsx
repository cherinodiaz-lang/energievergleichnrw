import React from 'react';
import { Link } from 'react-router-dom';

interface City {
  name: string;
  slug: string;
}

interface RelatedCitiesProps {
  currentCity: string;
  cities?: City[];
}

const defaultCities: City[] = [
  { name: 'Köln', slug: 'koeln' },
  { name: 'Düsseldorf', slug: 'duesseldorf' },
  { name: 'Dortmund', slug: 'dortmund' },
  { name: 'Essen', slug: 'essen' },
  { name: 'Duisburg', slug: 'duisburg' },
  { name: 'Bochum', slug: 'bochum' },
  { name: 'Wuppertal', slug: 'wuppertal' },
  { name: 'Bielefeld', slug: 'bielefeld' },
  { name: 'Bonn', slug: 'bonn' },
  { name: 'Münster', slug: 'muenster' },
];

export default function RelatedCities({ currentCity, cities = defaultCities }: RelatedCitiesProps) {
  // Filter aus aktuelle Stadt
  const filteredCities = cities.filter((city) => city.slug !== currentCity);

  // Zeige max 6 Städte
  const displayCities = filteredCities.slice(0, 6);

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 font-heading">
          Stromvergleich in weiteren Städten
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {displayCities.map((city) => (
            <Link
              key={city.slug}
              to={`/stromvergleich-${city.slug}`}
              className="flex items-center justify-center px-4 py-3 bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200 hover:border-primary"
            >
              <span className="text-sm font-medium text-gray-700">{city.name}</span>
            </Link>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link
            to="/stromvergleich-nrw"
            className="inline-flex items-center text-primary hover:text-primary font-medium font-paragraph"
          >
            Alle Städte anzeigen
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
