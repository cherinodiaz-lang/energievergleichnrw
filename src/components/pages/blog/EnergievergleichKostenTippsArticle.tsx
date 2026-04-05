import { useEffect } from 'react';
import { DollarSign, CheckCircle, ArrowRight, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import DeferredFooter from '@/components/DeferredFooter';
import SEOHead from '@/components/SEOHead';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/lib/routes';

export default function EnergievergleichKostenTippsArticle() {
  useEffect(() => {
    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Energievergleich Kosten – Tipps fuer Haushalte 2026',
      description:
        'Energievergleich und Kostenoptimierung fuer Haushalte: Praktische Tipps zum Strom und Gas sparen in NRW 2026.',
      datePublished: '2026-01-01',
      dateModified: '2026-03-01',
      author: {
        '@type': 'Organization',
        name: 'energievergleich.shop',
        url: 'https://www.energievergleich.shop',
      },
      publisher: {
        '@type': 'Organization',
        name: 'energievergleich.shop',
        logo: {
          '@type': 'ImageObject',
          url: 'https://static.wixstatic.com/media/32e7c0_8cede5e338be484bb8dcaad81c053c82~mv2.png',
        },
      },
    };

    const howToSchema = {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'Energiekosten optimieren – Schritt fuer Schritt',
      description:
        'So reduzieren Sie Ihre Energiekosten als Haushalt in NRW effektiv und dauerhaft.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Verbrauch analysieren',
          text: 'Pruefen Sie Ihre letzten Strom- und Gasrechnungen und ermitteln Sie Ihren Jahresverbrauch.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Tarife vergleichen',
          text: 'Nutzen Sie einen unabhaengigen Vergleichsrechner fuer Strom und Gas und pruefen Sie die aktuellen Angebote.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Anbieter wechseln',
          text: 'Wechseln Sie zu einem guenstigeren Anbieter. Der Wechsel ist kostenlos und dauert nur wenige Wochen.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Verbrauchsverhalten optimieren',
          text: 'Setzen Sie auf energieeffiziente Geraete, reduzieren Sie den Standby-Verbrauch und nutzen Sie Nachtzeittarife.',
        },
      ],
      totalTime: 'PT30M',
    };

    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Wie viel kann ich durch einen Energievergleich sparen?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ein durchschnittlicher Haushalt kann durch einen Stromanbieter- und Gasanbieterwechsel 200–600 Euro im Jahr sparen. Dies haengt stark vom aktuellen Tarif und dem Jahresverbrauch ab.',
          },
        },
        {
          '@type': 'Question',
          name: 'Wie oft sollte ich meine Energieanbieter vergleichen?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Experten empfehlen, mindestens einmal jaehrlich Strom- und Gastarife zu vergleichen. Idealerweise pruefen Sie vor Ablauf Ihres aktuellen Vertrags, welche Alternativen verfuegbar sind.',
          },
        },
        {
          '@type': 'Question',
          name: 'Ist ein Energievergleich kompliziert?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Nein. Mit unserem Vergleichsrechner geben Sie Postleitzahl und Jahresverbrauch ein und sehen sofort die guenstigsten Tarife in Ihrer Region. Der gesamte Prozess dauert wenige Minuten.',
          },
        },
        {
          '@type': 'Question',
          name: 'Welche Daten benoetigen ich fuer einen Energievergleich?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Fuer einen Stromvergleich benoetigen Sie Ihre Postleitzahl und den Jahresverbrauch in kWh. Fuer Gas genuegt oft auch die Wohnflaeche. Beides finden Sie auf Ihrer letzten Jahresrechnung.',
          },
        },
        {
          '@type': 'Question',
          name: 'Gibt es versteckte Kosten bei einem Anbieterwechsel?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Nein. Ein Anbieterwechsel ist kostenlos. Es fallen keine Gebuehren fuer Kuendigung oder Anmeldung an. Achten Sie lediglich auf die Kuendigungsfristen Ihres aktuellen Vertrags.',
          },
        },
      ],
    };

    const schemas = [articleSchema, howToSchema, faqSchema];
    schemas.forEach((schema, i) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = `blog-kosten-schema-${i}`;
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    return () => {
      schemas.forEach((_, i) => {
        const el = document.getElementById(`blog-kosten-schema-${i}`);
        if (el) document.head.removeChild(el);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-background break-words leading-mobile">
      <SEOHead
        title="Energievergleich Kosten – Tipps fuer Haushalte 2026 | energievergleich.shop"
        description="Energievergleich und Kostenoptimierung fuer Haushalte: Praktische Tipps zum Strom und Gas sparen, Wechsel-Anleitung und Spartricks fuer NRW-Haushalte 2026."
        keywords="Energievergleich Tipps, Energiekosten senken, Strom Gas sparen, Haushalt NRW 2026"
        ogType="article"
        canonical="/blog/energievergleich-kosten-tipps"
      />
      <Header />
      <main>
        <section className="w-full py-12 md:py-20 bg-gradient-to-br from-green-700 to-green-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
            >
              <div className="flex items-center gap-2 text-white/80 text-sm mb-4">
                <Link to={ROUTES.blog} className="hover:text-white">
                  Blog
                </Link>
                <span>/</span>
                <span>Energievergleich Kosten Tipps</span>
              </div>
              <h1 className="font-heading text-3xl md:text-5xl font-bold text-white mb-4">
                Energievergleich Kosten – Tipps für Haushalte 2026
              </h1>
              <p className="font-paragraph text-lg text-white/90 max-w-2xl">
                So optimieren Sie Ihre Energiekosten als Haushalt in NRW: Vergleichen, wechseln und
                dauerhaft sparen.
              </p>
              <div className="flex flex-wrap gap-3 mt-6 text-sm text-white/80">
                <span>📅 Aktualisiert: März 2026</span>
                <span>⏱ 7 Min. Lesezeit</span>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="prose prose-lg max-w-none">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
              Warum lohnt sich ein Energievergleich?
            </h2>
            <p className="font-paragraph text-foreground/80 mb-6">
              Viele Haushalte in NRW zahlen jährlich mehrere Hundert Euro zu viel für Strom und
              Gas – einfach weil sie nie gewechselt haben. Ein regelmäßiger Vergleich und Wechsel
              ist die effektivste Maßnahme zur Kostensenkung.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              {[
                {
                  icon: '⚡',
                  title: 'Strom',
                  saving: 'bis zu 400 €/Jahr',
                  desc: 'Bei einem Jahresverbrauch von 3.500 kWh',
                },
                {
                  icon: '🔥',
                  title: 'Gas',
                  saving: 'bis zu 300 €/Jahr',
                  desc: 'Bei einem Jahresverbrauch von 12.000 kWh',
                },
              ].map((item) => (
                <div key={item.title} className="bg-primary/10 rounded-xl p-6 text-center">
                  <div className="text-4xl mb-2">{item.icon}</div>
                  <h3 className="font-heading text-lg font-bold text-foreground">{item.title}</h3>
                  <p className="font-heading text-2xl font-bold text-primary">{item.saving}</p>
                  <p className="font-paragraph text-sm text-foreground/60">{item.desc}</p>
                </div>
              ))}
            </div>

            <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
              10 Tipps zur Senkung Ihrer Energiekosten
            </h2>
            <ul className="space-y-3 mb-8">
              {[
                'Stromanbieter vergleichen und bei Bedarf wechseln (größter Hebel)',
                'Gasanbieter vergleichen – oft mehrere Hundert Euro Ersparnis',
                'LED-Lampen in allen Räumen nutzen',
                'Standby-Geräte vollständig ausschalten',
                'Energieeffiziente Haushaltsgeräte bevorzugen (A-Label)',
                'Heiztemperatur um 1 Grad senken spart ca. 6 % Heizkosten',
                'Heizkörper nicht mit Möbeln verdecken',
                'Warmwasserbereitung optimieren',
                'Smarte Thermostate einsetzen',
                'Jährlich Jahresabrechnung prüfen und ggf. Abschlag anpassen',
              ].map((tip) => (
                <li key={tip} className="flex items-start gap-3 font-paragraph text-foreground/80">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>

            <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
              So nutzen Sie unseren Vergleich optimal
            </h2>
            <ol className="space-y-4 mb-8">
              {[
                {
                  step: '1.',
                  text: 'Jahresverbrauch von der letzten Rechnung ablesen',
                },
                {
                  step: '2.',
                  text: 'Vergleichsrechner starten und PLZ + Verbrauch eingeben',
                },
                {
                  step: '3.',
                  text: 'Angebote nach Preis und Konditionen sortieren',
                },
                {
                  step: '4.',
                  text: 'Gewünschten Tarif wählen und direkt online abschließen',
                },
              ].map((item) => (
                <li key={item.step} className="flex items-start gap-4">
                  <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {item.step}
                  </span>
                  <p className="font-paragraph text-foreground/80 mt-1">{item.text}</p>
                </li>
              ))}
            </ol>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <div className="bg-primary/10 rounded-xl p-6 text-center">
                <Lightbulb className="w-10 h-10 text-primary mx-auto mb-2" />
                <h3 className="font-heading font-bold text-foreground mb-2">Strom vergleichen</h3>
                <Button asChild>
                  <Link to={ROUTES.stromvergleich}>
                    Jetzt starten <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
              <div className="bg-orange-50 rounded-xl p-6 text-center border border-orange-200">
                <DollarSign className="w-10 h-10 text-orange-500 mx-auto mb-2" />
                <h3 className="font-heading font-bold text-foreground mb-2">Gas vergleichen</h3>
                <Button asChild className="bg-orange-500 hover:bg-orange-600">
                  <Link to={ROUTES.gasvergleich}>
                    Jetzt starten <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-muted/30 py-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-xl font-bold text-foreground mb-4">
              Weitere Artikel
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: 'Strompreise NRW 2026', href: ROUTES.blogStrompreiseNrw2026 },
                { title: 'Gaspreise vergleichen NRW', href: ROUTES.blogGaspreiseVergleichenNrw },
                {
                  title: 'Stromanbieter wechseln NRW',
                  href: ROUTES.blogStromanbieterWechselnNrw,
                },
              ].map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow font-heading font-medium text-primary hover:text-primary/80"
                >
                  {link.title} →
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <DeferredFooter />
    </div>
  );
}
