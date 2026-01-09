import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { Link } from 'react-router-dom';

export default function StromCategoryPage() {
  const articles = [
    {
      id: 'grundversorgung',
      title: 'Stromgrundversorgung: Was Sie wissen müssen',
      excerpt: 'Die Grundversorgung ist Ihr Sicherheitsnetz bei der Stromversorgung. Erfahren Sie, wie sie funktioniert und wann ein Wechsel sinnvoll ist.',
      link: '/ratgeber/strom/grundversorgung'
    },
    {
      id: 'preisgarantie',
      title: 'Preisgarantie bei Stromtarifen erklärt',
      excerpt: 'Wie lange sind Sie wirklich vor Preiserhöhungen geschützt? Verstehen Sie die Unterschiede zwischen Preis- und Strompreisbremse.',
      link: '/ratgeber/strom/preisgarantie'
    },
    {
      id: 'bonus-fallen',
      title: 'Neukundenbonus und Bonus-Fallen vermeiden',
      excerpt: 'Hohe Boni locken, aber verstecken sich dahinter Fallen? Wir zeigen, worauf Sie achten sollten.',
      link: '/ratgeber/strom/bonus-fallen'
    },
    {
      id: 'laufzeit-kündigung',
      title: 'Laufzeit und Kündigung: Ihre Flexibilität',
      excerpt: 'Wie lange sind Sie an einen Vertrag gebunden? Wann können Sie kündigen? Alle wichtigen Fristen erklärt.',
      link: '/ratgeber/strom/laufzeit-kündigung'
    },
    {
      id: 'umzug',
      title: 'Stromwechsel beim Umzug: Schritt für Schritt',
      excerpt: 'Ein Umzug ist der perfekte Zeitpunkt für einen Stromwechsel. Wir zeigen Ihnen, wie es richtig funktioniert.',
      link: '/ratgeber/strom/umzug'
    },
    {
      id: 'abschläge',
      title: 'Stromabschläge: Berechnung und Anpassung',
      excerpt: 'Warum zahlen Sie monatliche Abschläge? Wie werden sie berechnet und wann sollten Sie diese anpassen?',
      link: '/ratgeber/strom/abschläge'
    },
    {
      id: 'zählernummer',
      title: 'Zählernummer finden und verstehen',
      excerpt: 'Wo finden Sie Ihre Zählernummer und warum ist sie wichtig? Ein kurzer Überblick.',
      link: '/ratgeber/strom/zählernummer'
    },
    {
      id: 'neukundenbonus',
      title: 'Neukundenbonus maximieren: Tipps und Tricks',
      excerpt: 'Wie Sie den Neukundenbonus optimal nutzen und dabei keine versteckten Kosten übersehen.',
      link: '/ratgeber/strom/neukundenbonus'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Stromvergleich Ratgeber | Tipps zu Tarifen & Wechsel"
        description="Umfassender Ratgeber zu Stromtarifen, Wechsel und Sparpotenzial. Erfahren Sie alles über Grundversorgung, Preisgarantie und Neukundenbonus."
        keywords="Stromratgeber, Stromtarife, Stromwechsel, Preisgarantie, Neukundenbonus"
        ogTitle="Stromvergleich Ratgeber"
        ogDescription="Alles über Stromtarife und Wechsel in NRW"
      />
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-blue-500 to-blue-600 text-white py-20 md:py-32">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <Zap className="w-8 h-8" />
              <span className="font-bold text-sm uppercase tracking-wider">Ratgeber</span>
            </div>
            <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Stromvergleich & Tarife
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-white/90 max-w-2xl">
              Alles über Stromtarife, Wechsel und wie Sie Geld sparen. Von Grundversorgung bis Neukundenbonus.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="w-full py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link to={article.link} className="group h-full">
                  <Card className="h-full hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500 hover:border-l-blue-600">
                    <CardHeader>
                      <CardTitle className="font-heading text-xl group-hover:text-blue-600 transition-colors">
                        {article.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="font-paragraph text-gray-600 mb-6">{article.excerpt}</p>
                      <div className="flex items-center text-blue-600 font-bold text-sm group-hover:translate-x-2 transition-transform">
                        Artikel lesen
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 bg-blue-50 border-t">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-2">
                Bereit zum Stromwechsel?
              </h2>
              <p className="font-paragraph text-gray-600">
                Nutzen Sie unseren Vergleichsrechner und finden Sie den besten Tarif für Ihre Situation.
              </p>
            </div>
            <Link to="/stromvergleich-nrw">
              <Button className="bg-primary text-white hover:bg-primary/90 h-12 px-8 font-bold whitespace-nowrap">
                Jetzt vergleichen
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
