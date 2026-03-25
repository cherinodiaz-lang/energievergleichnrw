import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface ArticleComparatorCTAProps {
  comparatorPages: string[];
  comparatorTitles?: Record<string, string>;
}

export default function ArticleComparatorCTA({
  comparatorPages,
  comparatorTitles = {
    '/stromvergleich-nrw': 'Stromvergleich NRW',
    '/gasvergleich-nrw': 'Gasvergleich NRW',
    '/photovoltaik-nrw': 'Photovoltaik NRW',
    '/gewerbestrom': 'Gewerbestrom',
    '/gewerbegas': 'Gewerbegas',
  }
}: ArticleComparatorCTAProps) {
  if (!comparatorPages || comparatorPages.length === 0) {
    return null;
  }

  return (
    <section className="py-8 md:py-12 bg-primary/5 rounded-lg border border-primary/20 my-8 md:my-12">
      <div className="px-6 md:px-8">
        <h3 className="font-heading text-lg md:text-xl font-bold text-foreground mb-4">
          Jetzt vergleichen und sparen
        </h3>

        <p className="font-paragraph text-sm md:text-base text-gray-700 mb-6">
          Nutzen Sie unsere Vergleichsrechner, um die besten Tarife zu finden:
        </p>

        <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
          {comparatorPages.map((page) => (
            <Link
              key={page}
              to={page}
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-paragraph font-semibold px-4 md:px-6 py-2 md:py-3 rounded-lg transition-colors text-sm md:text-base"
            >
              {comparatorTitles[page] || page}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
