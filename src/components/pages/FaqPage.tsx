import Header from '@/components/Header';
import DeferredFooter from '@/components/DeferredFooter';
import SEOHead from '@/components/SEOHead';
import Breadcrumb from '@/components/Breadcrumb';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/lib/routes';

const faqSections = [
  {
    title: 'Allgemeines zum Energievergleich',
    faqs: [
      {
        q: 'Ist der Vergleich kostenlos?',
        a: 'Ja, unser Vergleichsrechner ist vollständig kostenlos und unverbindlich. Es entstehen keine Kosten für Sie.',
      },
      {
        q: 'Wie unabhängig ist Ihr Vergleich?',
        a: 'Wir vergleichen Strom- und Gastarife neutral und unabhängig von den Anbietern. Unser Ziel ist es, Ihnen das beste Angebot für Ihre Situation zu zeigen.',
      },
      {
        q: 'Welche Daten benötige ich für einen Vergleich?',
        a: 'Sie benötigen Ihre Postleitzahl und Ihren jährlichen Verbrauch in kWh. Den Verbrauch finden Sie auf Ihrer letzten Jahresabrechnung.',
      },
    ],
  },
  {
    title: 'Stromwechsel',
    faqs: [
      {
        q: 'Wie oft kann ich meinen Stromanbieter wechseln?',
        a: 'Sie können Ihren Stromanbieter jederzeit wechseln, sofern Sie die Kündigungsfrist einhalten. Bei den meisten Verträgen beträgt diese 4 Wochen zum Ende des Kalendermonats.',
      },
      {
        q: 'Wie lange dauert ein Stromwechsel?',
        a: 'Ein Stromwechsel dauert in der Regel 4–6 Wochen. Ihre Stromversorgung wird dabei nicht unterbrochen. Der neue Anbieter kümmert sich um alle Formalitäten.',
      },
      {
        q: 'Kann ich während des Wechsels ohne Strom sein?',
        a: 'Nein. Ihre Stromversorgung ist gesetzlich geschützt und wird nicht unterbrochen. Im Notfall springt der Grundversorger ein.',
      },
      {
        q: 'Was ist eine Preisgarantie beim Strom?',
        a: 'Eine Preisgarantie bedeutet, dass der Arbeitspreis für einen bestimmten Zeitraum nicht erhöht wird. Steuern und Abgaben können sich jedoch trotzdem ändern, da diese gesetzlich festgelegt werden.',
      },
    ],
  },
  {
    title: 'Gaswechsel',
    faqs: [
      {
        q: 'Wie wechsle ich meinen Gasanbieter?',
        a: 'Nutzen Sie unseren Gasvergleich, wählen Sie einen günstigeren Tarif aus und geben Sie Ihre Daten ein. Wir übernehmen die Kündigung beim alten Anbieter und die Anmeldung beim neuen.',
      },
      {
        q: 'Wie hoch ist die Kündigungsfrist bei Gasverträgen?',
        a: 'Bei den meisten Gasverträgen beträgt die Kündigungsfrist 4–6 Wochen zum Ende der Vertragslaufzeit. Prüfen Sie Ihren aktuellen Vertrag für die genauen Konditionen.',
      },
      {
        q: 'Was bedeutet Gasgrundversorgung?',
        a: 'Die Gasgrundversorgung ist die Belieferung durch den örtlichen Grundversorger zu gesetzlich geregelten Bedingungen. Sie gilt automatisch, wenn kein anderer Vertrag abgeschlossen wurde – meist jedoch zu höheren Preisen.',
      },
    ],
  },
  {
    title: 'Photovoltaik',
    faqs: [
      {
        q: 'Lohnt sich eine Photovoltaikanlage in NRW?',
        a: 'Ja, in NRW lohnt sich eine PV-Anlage in den meisten Fällen. Die Amortisationszeit liegt typischerweise bei 10–15 Jahren, und die Anlage läuft danach viele weitere Jahre mit nahezu kostenlosem Strom.',
      },
      {
        q: 'Was ist die Einspeisevergütung?',
        a: 'Die Einspeisevergütung ist der Betrag, den Sie für ins Netz eingespeisten Solarstrom erhalten. Sie wird durch das Erneuerbare-Energien-Gesetz (EEG) geregelt und gilt für 20 Jahre ab Inbetriebnahme.',
      },
      {
        q: 'Welche Förderungen gibt es für Photovoltaik in NRW?',
        a: 'In NRW gibt es verschiedene Förderprogramme über die KfW-Bank (zinsgünstige Kredite), das BAFA sowie landesspezifische Förderprogramme. Wir helfen Ihnen, die passende Förderung zu finden.',
      },
    ],
  },
  {
    title: 'Gewerbekunden',
    faqs: [
      {
        q: 'Unterscheiden sich Gewerbestromtarife von Haushaltsstromtarifen?',
        a: 'Ja. Gewerbestromtarife berücksichtigen das Lastprofil, die Anschlussleistung und den Jahresverbrauch des Unternehmens. Sie enthalten oft Leistungspreise zusätzlich zum Arbeitspreis.',
      },
      {
        q: 'Kann ich als Unternehmen auch online wechseln?',
        a: 'Ja. Nutzen Sie unseren Gewerbeenergievergleich für Strom oder Gas. Bei größeren Abnahmemengen empfehlen wir eine persönliche Beratung für individuell ausgehandelte Konditionen.',
      },
    ],
  },
];

export default function FaqPage() {
  const breadcrumbItems = [
    { label: 'Startseite', path: '/' },
    { label: 'FAQ', path: '/faq' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="FAQ | Häufig gestellte Fragen – energievergleich.shop"
        description="Antworten auf häufige Fragen zu Stromvergleich, Gaswechsel, Photovoltaik und Gewerbeenergie in NRW."
        keywords="FAQ, Häufige Fragen, Stromwechsel, Gasvergleich, Photovoltaik, NRW"
        robots="index, follow"
      />
      <Header />
      <Breadcrumb items={breadcrumbItems} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-primary mb-4">
          Häufig gestellte Fragen
        </h1>
        <p className="font-paragraph text-gray-600 mb-12">
          Finden Sie schnell Antworten auf die wichtigsten Fragen rund um Energie in NRW.
        </p>

        <div className="space-y-12">
          {faqSections.map((section) => (
            <div key={section.title}>
              <h2 className="font-heading text-xl sm:text-2xl font-semibold text-primary mb-6 pb-2 border-b">
                {section.title}
              </h2>
              <div className="space-y-3">
                {section.faqs.map((faq, i) => (
                  <Accordion key={i} type="single" collapsible className="bg-white rounded-lg border">
                    <AccordionItem value={`item-${i}`} className="border-none">
                      <AccordionTrigger className="font-heading font-semibold text-base hover:text-primary px-6 py-4 text-left">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="font-paragraph text-gray-600 px-6 pb-4">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-6 bg-primary/5 rounded-xl border border-primary/10 text-center">
          <p className="font-paragraph text-gray-700 mb-4">
            Ihre Frage war nicht dabei? Kontaktieren Sie uns direkt.
          </p>
          <Link
            to={ROUTES.kontakt}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-paragraph font-semibold px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Zur Kontaktseite
          </Link>
        </div>
      </main>

      <DeferredFooter />
    </div>
  );
}
