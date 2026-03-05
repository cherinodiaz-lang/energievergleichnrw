/**
 * Passende Ratgeber Module
 * Displays 3-5 related articles for Money Pages
 * Filters by targetMoneyPage, supplements with Wechselwissen if needed
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { getPassendeRatgeber, RatgeberArticleMeta } from '@/lib/ratgeber-map';
import { ROUTES } from '@/lib/routes';

interface PassendeRatgeberProps {
  moneyPageId: RatgeberArticleMeta['targetMoneyPage'];
  limit?: number;
  className?: string;
}

export default function PassendeRatgeber({
  moneyPageId,
  limit = 4,
  className = '',
}: PassendeRatgeberProps) {
  const articles = getPassendeRatgeber(moneyPageId, limit);

  if (articles.length === 0) {
    return null;
  }

  return (
    <section className={`w-full py-16 sm:py-24 bg-background ${className}`}>
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="mb-8 sm:mb-12">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-2 sm:mb-4">
            Passende Ratgeber
          </h2>
          <p className="font-paragraph text-sm sm:text-base text-gray-600">
            Weitere hilfreiche Artikel zu diesem Thema
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/${article.slug}`} className="group h-full">
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-none overflow-hidden flex flex-col">
                  <CardHeader className="pb-3">
                    <CardTitle className="font-heading text-base sm:text-lg group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col pb-4 sm:pb-6">
                    <p className="font-paragraph text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6 line-clamp-2 flex-1">
                      {article.teaser}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500 border-t pt-3 sm:pt-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{article.readingTime} Min</span>
                      </div>
                      <span className="text-gray-400">
                        {new Date(article.lastUpdated).toLocaleDateString('de-DE', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 sm:mt-12 text-center">
          <Button
            asChild
            variant="outline"
            className="border-primary text-primary hover:bg-primary/5"
          >
            <Link to={ROUTES.RATGEBER}>
              Alle Ratgeber ansehen
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
