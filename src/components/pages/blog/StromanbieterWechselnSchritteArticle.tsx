import { useEffect } from 'react';
import { Zap, CheckCircle, ArrowRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import DeferredFooter from '@/components/DeferredFooter';
import SEOHead from '@/components/SEOHead';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/lib/routes';

export default function StromanbieterWechselnSchritteArticle() {
  useEffect(() => {
    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Stromanbieter wechseln NRW – Schritt fuer Schritt 2026',
      description:
        'Schritt-fuer-Schritt-Anleitung zum Stromanbieter wechseln in NRW 2026. Wann wechseln, worauf achten und wie Sie sparen.',
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
      name: 'Stromanbieter wechseln in NRW – Schritt fuer Schritt',
      description:
        'Wie Sie in NRW Ihren Stromanbieter einfach und sicher wechseln und dabei Geld sparen.',
      totalTime: 'PT15M',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Kuendigungsfrist pruefen',
          text: 'Pruefen Sie, bis wann Sie Ihren aktuellen Vertrag kuendigen koennen. Meistens sind es 4 Wochen zum Monatsende.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Neuen Tarif auswaehlen',
          text: 'Nutzen Sie unseren Stromvergleich, geben Sie PLZ und Jahresverbrauch ein und waehlen Sie den guenstigsten passenden Tarif.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Online anmelden',
          text: 'Melden Sie sich direkt beim neuen Anbieter an. Den alten Vertrag kuen digt der neue Anbieter fuer Sie.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Bestaetigung erhalten',
          text: 'Sie erhalten eine Bestaetigung vom neuen Anbieter. Halten Sie Zaehlernummer und Netzbetreiber bereit.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Wechsel abschliessen',
          text: 'Nach 4–6 Wochen beliefert der neue Anbieter Sie. Ihre Stromversorgung wird dabei nicht unterbrochen.',
        },
      ],
    };

    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Wie lange dauert ein Stromwechsel in NRW?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ein Stromwechsel in NRW dauert in der Regel 4–6 Wochen. Ihre Stromversorgung wird dabei niemals unterbrochen.',
          },
        },
        {
          '@type': 'Question',
          name: 'Muss ich selbst kuendigen?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Nein. Der neue Stromanbieter kuendigt Ihren alten Vertrag in Ihrem Namen. Sie muessen nur den neuen Vertrag abschliessen.',
          },
        },
        {
          '@type': 'Question',
          name: 'Wann ist der beste Zeitpunkt fuer einen Stromwechsel?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Der beste Zeitpunkt ist, wenn Ihr aktueller Vertrag auslaeuft oder sich verlaengert. Dann koennen Sie oft ohne Mindestlaufzeit wechseln.',
          },
        },
        {
          '@type': 'Question',
          name: 'Welche Unterlagen benoetigt man fuer einen Stromwechsel?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sie benoetigen Ihren Jahresstromverbrauch (aus der Rechnung), Ihre PLZ und optional Ihre Zaehlernummer. Der Wechsel geht in wenigen Minuten online.',
          },
        },
        {
          '@type': 'Question',
          name: 'Kann ich nach einem Wechsel sofort wieder wechseln?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Das haengt von den Vertragsbedingungen Ihres neuen Anbieters ab. Bei einem Jahresvertrag muessen Sie die Mindestlaufzeit einhalten. Danach koennen Sie jederzeit wechseln.',
          },
        },
      ],
    };

    const schemas = [articleSchema, howToSchema, faqSchema];
    schemas.forEach((schema, i) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = `blog-wechseln-schema-${i}`;
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    return () => {
      schemas.forEach((_, i) => {
        const el = document.getElementById(`blog-wechseln-schema-${i}`);
        if (el) document.head.removeChild(el);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-background break-words leading-mobile">
      <SEOHead
        title="Stromanbieter wechseln NRW – Schritt fuer Schritt 2026 | energievergleich.shop"
        description="Schritt-fuer-Schritt-Anleitung zum Stromanbieter wechseln in NRW 2026. Wann wechseln, worauf achten und wie Sie mit dem Wechsel bis zu 400 Euro sparen."
        keywords="Stromanbieter wechseln NRW, Stromwechsel Anleitung, Stromanbieter NRW 2026, Strom wechseln Tipps"
        ogType="article"
        canonical="/blog/stromanbieter-wechseln-nrw"
      />
      <Header />
      <main>
        <section className="w-full py-12 md:py-20 bg-gradient-to-br from-blue-700 to-primary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
            >
              <div className="flex items-center gap-2 text-white/80 text-sm mb-4">
                <Link to={ROUTES.blog} className="hover:text-white">
                  Blog
                </Link>
                <span>/</span>
                <span>Stromanbieter wechseln NRW</span>
              </div>
              <h1 className="font-heading text-3xl md:text-5xl font-bold text-white mb-4">
                Stromanbieter wechseln NRW – Schritt für Schritt 2026
              </h1>
              <p className="font-paragraph text-lg text-white/90 max-w-2xl">
                So wechseln Sie Ihren Stromanbieter in NRW sicher und einfach. Alles, was Sie
                wissen müssen – in 5 einfachen Schritten.
              </p>
              <div className="flex flex-wrap gap-3 mt-6 text-sm text-white/80">
                <span>📅 Aktualisiert: März 2026</span>
                <span>⏱ 6 Min. Lesezeit</span>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="prose prose-lg max-w-none">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
              Warum jetzt wechseln?
            </h2>
            <p className="font-paragraph text-foreground/80 mb-6">
              In NRW sind die Preisunterschiede zwischen Grundversorgung und günstigsten
              Neukundentarifen erheblich. Wer noch nie gewechselt hat, zahlt oft 30–50 % mehr als
              nötig.
            </p>

            <div className="bg-primary/5 rounded-xl p-6 mb-8 flex items-start gap-4">
              <Clock className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-heading font-bold text-foreground mb-1">
                  Der Wechsel dauert nur 15 Minuten
                </h3>
                <p className="font-paragraph text-sm text-foreground/70">
                  Online anmelden, Daten eingeben, fertig. Den Rest erledigt der neue Anbieter.
                </p>
              </div>
            </div>

            <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
              5 Schritte zum günstigeren Strom
            </h2>
            <ol className="space-y-6 mb-8">
              {[
                {
                  step: 1,
                  title: 'Kündigungsfrist prüfen',
                  desc: 'Schauen Sie auf Ihren aktuellen Stromvertrag: Wann läuft er ab? Beträgt die Frist 4 Wochen zum Monatsende? Notieren Sie sich das Datum.',
                  tip: 'Tipp: Den Vertrag finden Sie in Ihrem Online-Kundenportal oder auf der letzten Jahresabrechnung.',
                },
                {
                  step: 2,
                  title: 'Jahresverbrauch ermitteln',
                  desc: 'Den Jahresverbrauch in kWh finden Sie auf Ihrer letzten Stromrechnung. Alternativ: 3.500 kWh für einen 2-Personen-Haushalt als Richtwert.',
                  tip: 'Tipp: Der Verbrauch steht meist groß auf dem Deckblatt der Jahresabrechnung.',
                },
                {
                  step: 3,
                  title: 'Tarife vergleichen',
                  desc: 'Nutzen Sie unseren Stromvergleich. PLZ und Verbrauch eingeben, passenden Tarif wählen. Achten Sie auf Laufzeit, Preisgarantie und Grundpreis.',
                  tip: 'Tipp: Kurze Laufzeit und Preisgarantie bieten mehr Flexibilität.',
                },
                {
                  step: 4,
                  title: 'Online anmelden',
                  desc: 'Direkt beim neuen Anbieter anmelden. Halten Sie Zählernummer und aktuelle Ablesewerte bereit. Der neue Anbieter kündigt den alten Vertrag.',
                  tip: 'Tipp: Die Zählernummer steht auf Ihrem Zähler oder auf der Rechnung.',
                },
                {
                  step: 5,
                  title: 'Bestätigung erhalten & fertig',
                  desc: 'Sie erhalten eine Bestätigungs-E-Mail. Nach 4–6 Wochen beliefert der neue Anbieter Sie. Ihre Versorgung wird nicht unterbrochen.',
                  tip: 'Tipp: Heben Sie die Bestätigung auf für eventuelle Rückfragen.',
                },
              ].map((item) => (
                <li key={item.step} className="flex items-start gap-4">
                  <span className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg flex-shrink-0">
                    {item.step}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-heading font-semibold text-foreground text-lg mb-1">
                      {item.title}
                    </h3>
                    <p className="font-paragraph text-foreground/70 mb-2">{item.desc}</p>
                    <div className="bg-primary/5 rounded-lg px-3 py-2 text-sm text-primary font-medium">
                      💡 {item.tip}
                    </div>
                  </div>
                </li>
              ))}
            </ol>

            <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
              Häufige Fragen zum Stromwechsel
            </h2>
            <div className="space-y-4 mb-8">
              {[
                {
                  q: 'Wird mein Strom unterbrochen?',
                  a: 'Nein. Der physische Stromfluss ist unabhängig vom Lieferanten. Ihre Versorgung ist jederzeit gesichert.',
                },
                {
                  q: 'Was passiert bei einer Insolvenz des neuen Anbieters?',
                  a: 'Im Insolvenzfall übernimmt automatisch der lokale Grundversorger die Belieferung. Sie sind also immer versorgt.',
                },
                {
                  q: 'Kann ich als Mieter wechseln?',
                  a: 'Ja, grundsätzlich können Sie als Mieter Ihren Stromlieferanten frei wählen. Lediglich beim Strom aus Mieterstrom-Modellen gelten andere Regeln.',
                },
              ].map((item) => (
                <div key={item.q} className="border rounded-lg p-4">
                  <h3 className="font-heading font-semibold text-foreground mb-1">{item.q}</h3>
                  <p className="font-paragraph text-sm text-foreground/70">{item.a}</p>
                </div>
              ))}
            </div>

            <div className="bg-primary/10 rounded-xl p-6 text-center">
              <Zap className="w-12 h-12 text-primary mx-auto mb-3" />
              <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                Jetzt Stromanbieter wechseln
              </h3>
              <p className="font-paragraph text-foreground/70 mb-4">
                Starten Sie Ihren Vergleich – kostenlos und unverbindlich.
              </p>
              <Button asChild size="lg">
                <Link to={ROUTES.stromvergleich}>
                  Stromvergleich starten <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
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
                { title: 'Ökostrom NRW – Die besten Anbieter', href: ROUTES.blogOekostromNrwAnbieter },
                {
                  title: 'Energievergleich Kosten – Tipps',
                  href: ROUTES.blogEnergievergleichKostenTipps,
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
