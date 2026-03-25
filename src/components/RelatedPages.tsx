import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { RelatedPage } from '@/lib/internal-linking';

interface RelatedPagesProps {
  pages: RelatedPage[];
}

export default function RelatedPages({ pages }: RelatedPagesProps) {
  if (!pages || pages.length === 0) {
    return null;
  }

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="max-w-[100rem] mx-auto px-4 md:px-6 lg:px-12">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8 md:mb-12">
          Weitere Vergleiche
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pages.map((page, index) => (
            <Link
              key={index}
              to={page.path}
              className="group bg-white rounded-lg border border-gray-200 p-6 hover:border-primary hover:shadow-lg transition-all duration-300"
            >
              <div className="flex flex-col h-full">
                <h3 className="font-heading text-lg md:text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {page.title}
                </h3>

                <p className="font-paragraph text-sm md:text-base text-gray-600 mb-4 flex-grow">
                  {page.description}
                </p>

                <div className="flex items-center gap-2 text-primary font-paragraph font-semibold text-sm md:text-base">
                  Jetzt vergleichen
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
