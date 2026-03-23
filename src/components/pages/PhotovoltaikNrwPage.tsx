import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, CheckCircle, TrendingUp, Leaf, Zap, Send, ArrowRight, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import NativeSelect from '@/components/ui/native-select';
import Header from '@/components/Header';
import DeferredFooter from '@/components/DeferredFooter';
import SEOHead from '@/components/SEOHead';
import PassendeRatgeber from '@/components/PassendeRatgeber';
import Breadcrumb from '@/components/Breadcrumb';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import TrustRow from '@/components/TrustRow';
import RelatedPages from '@/components/RelatedPages';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/lib/routes';
import { getPageSEO } from '@/lib/seo-config';
import { trackMethodikClick } from '@/services/form-submission';
import { getRelatedPages } from '@/lib/internal-linking';

export default function PhotovoltaikNrwPage() {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    eigentumsart: '',
    dachform: '',
    personen: '',
    strasse: '',
    hausnummer: '',
    plz: '',
    ort: '',
    name: '',
    email: '',
    phone: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitSuccess(true);
    setFormData({
      eigentumsart: '',
      dachform: '',
      personen: '',
      strasse: '',
      hausnummer: '',
      plz: '',
      ort: '',
      name: '',
      email: '',
      phone: '',
    });
  };

  const seo = getPageSEO('photovoltaik');

  const breadcrumbItems = [
    { label: 'Startseite', path: '/' },
    { label: 'Photovoltaik NRW', path: '/photovoltaik-nrw' },
  ];

  const breadcrumbSchema = [
    { name: 'Startseite', url: `${typeof window !== 'undefined' ? window.location.origin : ''}${ROUTES.home}` },
    { name: 'Photovoltaik NRW', url: `${typeof window !== 'undefined' ? window.location.origin : ''}${ROUTES.photovoltaik}` },
  ];

  return (
    <div className="min-h-screen bg-background break-words leading-mobile">
      <SEOHead
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        ogTitle={seo.ogTitle}
        ogDescription={seo.ogDescription}
      />
      <BreadcrumbSchema items={breadcrumbSchema} />
      <Header />
      <main>
      <Breadcrumb items={breadcrumbItems} />

      {/* Hero Section */}
      <section className="w-full bg-primary text-primary-foreground py-20 md:py-32">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-6 leading-tight max-w-[22ch] sm:max-w-none break-words">
              Photovoltaik für NRW
            </h1>
            <p className="font-paragraph text-[15px] sm:text-base md:text-xl text-white/90 mb-8 max-w-2xl">
              Nutzen Sie die Kraft der Sonne und werden Sie unabhängig von steigenden Strompreisen. Kostenlose Beratung für Ihre Solaranlage.
            </p>
            <div className="flex flex-col gap-4">
              <Button
                onClick={() => document.getElementById('beratung')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto bg-secondary text-secondary-foreground hover:bg-secondary/90 h-14 px-8 rounded-full text-lg font-semibold shadow-lg"
              >
                Jetzt Angebote anfordern
              </Button>
              <Link to="/methodik" onClick={trackMethodikClick} className="text-white/80 hover:text-white transition-colors text-sm font-medium underline">
                So vergleichen wir (Methodik)
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

       {/* Content Section */}
       <section className="w-full py-24 bg-white">
         <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
           <div className="space-y-8">
             <div>
               <h2 className="font-heading text-3xl font-bold text-primary mb-6">Kurz erklärt: Photovoltaik-Angebotsvergleich für NRW</h2>
               
               <p className="font-paragraph text-lg text-gray-700 mb-6">
                 Mit unserem kostenlosen Photovoltaik-Vergleich finden Sie in wenigen Minuten die beste Solaranlage für Ihr Zuhause in Nordrhein-Westfalen. Der Vergleich ist völlig kostenlos und unverbindlich – Sie geben nur wenige Angaben ein und erhalten sofort Angebote von zertifizierten Fachbetrieben. Sparen Sie bis zu 40% der Installationskosten durch den Vergleich mehrerer Anbieter und profitieren Sie von maßgeschneiderten Lösungen für Ihr Dach.
               </p>
             </div>

             <div>
               <h3 className="font-heading text-2xl font-bold text-primary mb-4">So funktioniert der Angebotsvergleich – 5 Schritte</h3>
               <ol className="font-paragraph text-gray-700 space-y-3 mb-6 list-decimal list-inside">
                 <li><strong>Dachfläche und Ausrichtung angeben:</strong> Geben Sie die Größe und Ausrichtung Ihres Daches ein (Süd, Ost, West)</li>
                 <li><strong>Stromverbrauch eintragen:</strong> Tragen Sie Ihren jährlichen Stromverbrauch in kWh ein (zu finden auf der Stromrechnung)</li>
                 <li><strong>Postleitzahl und Standort:</strong> Geben Sie Ihre PLZ ein, um Angebote für Ihre Region zu erhalten</li>
                 <li><strong>Angebote vergleichen:</strong> Sehen Sie alle verfügbaren Angebote mit Anlagengröße, Kosten, Ertrag und Amortisationszeit</li>
                 <li><strong>Wunsch-Angebot wählen:</strong> Entscheiden Sie sich für den besten Anbieter und erhalten Sie eine kostenlose Vor-Ort-Beratung</li>
               </ol>
             </div>

             <div>
               <h3 className="font-heading text-2xl font-bold text-primary mb-4">Welche Angaben du brauchst</h3>
               <ul className="font-paragraph text-gray-700 space-y-2 mb-6">
                 <li className="flex items-start gap-3">
                   <span className="text-secondary font-bold flex-shrink-0">•</span>
                   <span><strong>Dachfläche:</strong> Größe in Quadratmetern und Ausrichtung (Süd, Ost, West, Nord)</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <span className="text-secondary font-bold flex-shrink-0">•</span>
                   <span><strong>Postleitzahl:</strong> Bestimmt die Sonneneinstrahlung und verfügbare Fachbetriebe in Ihrer Region</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <span className="text-secondary font-bold flex-shrink-0">•</span>
                   <span><strong>Stromverbrauch in kWh:</strong> Finden Sie auf Ihrer letzten Stromrechnung unter „Jahresverbrauch"</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <span className="text-secondary font-bold flex-shrink-0">•</span>
                   <span><strong>Fotos des Daches (optional):</strong> Helfen bei der genauen Planung und Verschattungsanalyse</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <span className="text-secondary font-bold flex-shrink-0">•</span>
                   <span><strong>Zählernummer/Anschluss:</strong> Optional, für präzisere Ertragsprognosen</span>
                 </li>
               </ul>
             </div>

             <div>
               <h3 className="font-heading text-2xl font-bold text-primary mb-4">Worauf du achten solltest</h3>
               <ul className="font-paragraph text-gray-700 space-y-3 mb-6">
                 <li className="flex items-start gap-3">
                   <span className="text-secondary font-bold flex-shrink-0">✓</span>
                   <span><strong>Anlagengröße:</strong> Sollte zu Ihrem Stromverbrauch passen – zu kleine Anlagen nutzen Ihr Dach nicht optimal, zu große erzeugen unnötige Überschüsse</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <span className="text-secondary font-bold flex-shrink-0">✓</span>
                   <span><strong>Komponentenqualität:</strong> Achten Sie auf hochwertige Module (Leistungsgarantie 25+ Jahre) und zuverlässige Wechselrichter</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <span className="text-secondary font-bold flex-shrink-0">✓</span>
                   <span><strong>Garantie und Gewährleistung:</strong> Mindestens 10 Jahre Gewährleistung und 25 Jahre Leistungsgarantie auf Module sind Standard</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <span className="text-secondary font-bold flex-shrink-0">✓</span>
                   <span><strong>Ertragsprognose:</strong> Vergleichen Sie die erwarteten Jahreserträge in kWh – diese bestimmen Ihre Einsparungen</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <span className="text-secondary font-bold flex-shrink-0">✓</span>
                   <span><strong>Stromspeicher-Option:</strong> Prüfen Sie, ob ein Speicher sinnvoll ist – erhöht Eigennutzung und Unabhängigkeit</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <span className="text-secondary font-bold flex-shrink-0">✓</span>
                   <span><strong>Finanzierungsmöglichkeiten:</strong> KfW-Kredite, Zuschüsse und Eigenkapitaloptionen sollten berücksichtigt werden</span>
                 </li>
               </ul>
             </div>

             <div>
               <h3 className="font-heading text-2xl font-bold text-primary mb-4">Häufige Fehler beim Photovoltaik-Vergleich</h3>
               <ul className="font-paragraph text-gray-700 space-y-3 mb-6">
                 <li className="flex items-start gap-3">
                   <span className="text-secondary font-bold flex-shrink-0">✗</span>
                   <span><strong>Nur auf den Preis schauen:</strong> Der günstigste Anbieter ist nicht immer die beste Wahl – Qualität, Garantie und Ertragsprognose sind entscheidend</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <span className="text-secondary font-bold flex-shrink-0">✗</span>
                   <span><strong>Dachfläche unterschätzen:</strong> Eine zu kleine Anlage nutzt Ihr Dachpotenzial nicht aus – analysieren Sie die verfügbare Fläche genau</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <span className="text-secondary font-bold flex-shrink-0">✗</span>
                   <span><strong>Förderungen ignorieren:</strong> KfW-Kredite, Zuschüsse und Einspeisevergütung können die Amortisationszeit um Jahre verkürzen</span>
                 </li>
               </ul>
             </div>

             <div>
               <h3 className="font-heading text-2xl font-bold text-primary mb-4">Photovoltaik in NRW</h3>
               <p className="font-paragraph text-gray-700 mb-4">
                 Nordrhein-Westfalen ist mit über 18 Millionen Einwohnern das bevölkerungsreichste Bundesland und bietet ideale Bedingungen für Photovoltaik. Obwohl NRW nicht die sonnigste Region Deutschlands ist, amortisieren sich Solaranlagen durch die hohen Strompreise und Förderungen schnell. Die durchschnittliche Sonneneinstrahlung ermöglicht stabile Erträge von 900-1.000 kWh pro kWp installierter Leistung pro Jahr. Mit unserem Vergleich finden Sie die besten Fachbetriebe in Ihrer Stadt – ob in Düsseldorf, Köln, Essen, Dortmund oder einer anderen Stadt in NRW.
               </p>
             </div>

             <div className="bg-secondary/10 border-l-4 border-secondary p-6 rounded">
               <p className="font-paragraph text-gray-700 italic">
                 Jetzt kostenlos Angebote anfordern und finden Sie die perfekte Solaranlage für Ihr Zuhause!
               </p>
             </div>
           </div>
         </div>
       </section>

      {/* Benefits Section */}
      <section className="w-full py-24 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-primary mb-16 text-center">
            Warum Photovoltaik in NRW?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                title: 'Wertsteigerung',
                description: 'Eine Solaranlage erhöht den Wert Ihrer Immobilie um 5-10%.'
              },
              {
                icon: Leaf,
                title: 'Klimaschutz',
                description: 'Produzieren Sie sauberen Strom und reduzieren Sie Ihren CO₂-Fußabdruck.'
              },
              {
                icon: Zap,
                title: 'Unabhängigkeit',
                description: 'Bis zu 80% Autarkie möglich. Weniger abhängig von Strompreisen.'
              },
              {
                icon: CheckCircle,
                title: 'Förderungen',
                description: 'KfW-Förderung und Einspeisevergütung reduzieren Ihre Kosten.'
              },
              {
                icon: Home,
                title: 'Langlebigkeit',
                description: '25-30 Jahre Lebensdauer. Garantie auf die Module.'
              },
              {
                icon: Sun,
                title: 'Kostenloser Strom',
                description: 'Nach der Amortisation produzieren Sie kostenlosen Strom.'
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="font-heading text-xl text-primary">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-paragraph text-gray-600">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* So funktioniert's Section */}
      <section className="w-full py-24 bg-background">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-primary mb-16 text-center">
            So funktioniert die Installation
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg h-full">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl mb-6">
                  1
                </div>
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">Kostenlose Beratung</h3>
                <p className="font-paragraph text-gray-600">
                  Wir analysieren Ihr Dach, Ihren Stromverbrauch und erstellen ein individuelles Angebot.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg h-full">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl mb-6">
                  2
                </div>
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">Planung & Genehmigung</h3>
                <p className="font-paragraph text-gray-600">
                  Wir kümmern uns um alle Genehmigungen und die technische Planung.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg h-full">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl mb-6">
                  3
                </div>
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">Installation & Betrieb</h3>
                <p className="font-paragraph text-gray-600">
                  Professionelle Installation und Inbetriebnahme. Danach produzieren Sie Ihren eigenen Strom.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PV-Angebote Checklist Section */}
      <section className="w-full py-24 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-primary mb-16 text-center">
            PV-Angebote vergleichen: Checkliste
          </h2>

          <div className="max-w-3xl mx-auto bg-background rounded-lg p-8 border border-gray-200">
            <ul className="space-y-4">
              {[
                'Dachfläche & Ausrichtung',
                'Jahresverbrauch',
                'Anlagengröße (kWp)',
                'Komponenten (Module/Wechselrichter)',
                'Speicher ja/nein',
                'Garantien',
                'Wirtschaftlichkeit/Amortisation',
                'Netzanschluss & Anmeldung'
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-sm">
                    {index + 1}
                  </div>
                  <span className="font-paragraph text-lg text-gray-700 pt-0.5">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Comparison Criteria Section */}
      <section className="w-full py-24 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-primary mb-16 text-center">
            Worauf achten wir beim Vergleich?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Dachfläche', description: 'Größe und Ausrichtung Ihres Daches bestimmen die Anlagengröße.' },
              { title: 'Stromverbrauch', description: 'Wir dimensionieren die Anlage optimal für Ihren Bedarf.' },
              { title: 'Verschattung', description: 'Bäume und Gebäude können die Leistung beeinflussen.' },
              { title: 'Speicher', description: 'Optional: Stromspeicher für höhere Unabhängigkeit.' },
              { title: 'Förderungen', description: 'Wir nutzen alle verfügbaren Förderprogramme für Sie.' },
              { title: 'Qualität', description: 'Hochwertige Module mit 25 Jahren Leistungsgarantie.' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="font-heading text-xl text-primary">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-paragraph text-gray-600">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Form Section */}
      <section id="beratung" className="w-full py-24 bg-background">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-2">
              <Card className="shadow-xl">
                <CardHeader className="bg-primary text-white">
                  <CardTitle className="font-heading text-2xl">Kostenlose Beratung anfragen</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  {submitSuccess && (
                    <div
                      className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
                      role="status"
                      aria-live="polite"
                    >
                      Vielen Dank für Ihre Anfrage. Wir melden uns in Kürze bei Ihnen.
                    </div>
                  )}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="eigentumsart" className="font-paragraph">Eigentumsart *</Label>
                        <NativeSelect
                          id="eigentumsart"
                          value={formData.eigentumsart}
                          onValueChange={(value) => setFormData({ ...formData, eigentumsart: value })}
                          options={[
                            { value: 'einfamilienhaus', label: 'Einfamilienhaus' },
                            { value: 'mehrfamilienhaus', label: 'Mehrfamilienhaus' },
                            { value: 'gewerbe', label: 'Gewerbe' },
                            { value: 'miete', label: 'Wohnung zur Miete' },
                          ]}
                          placeholder="Wählen Sie..."
                          required
                          className="font-paragraph"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dachform" className="font-paragraph">Dachform *</Label>
                        <NativeSelect
                          id="dachform"
                          value={formData.dachform}
                          onValueChange={(value) => setFormData({ ...formData, dachform: value })}
                          options={[
                            { value: 'satteldach', label: 'Satteldach' },
                            { value: 'flachdach', label: 'Flachdach' },
                            { value: 'pultdach', label: 'Pultdach' },
                            { value: 'mansardendach', label: 'Mansardendach' },
                            { value: 'walmdach', label: 'Walmdach' },
                            { value: 'andere', label: 'Andere' },
                          ]}
                          placeholder="Wählen Sie..."
                          required
                          className="font-paragraph"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="personen" className="font-paragraph">Anzahl Personen im Haushalt</Label>
                      <Input
                        id="personen"
                        type="number"
                        placeholder="z.B. 4"
                        value={formData.personen}
                        onChange={(e) => setFormData({ ...formData, personen: e.target.value })}
                        className="font-paragraph"
                      />
                    </div>

                    <div className="border-t pt-6">
                      <h3 className="font-heading font-bold text-primary mb-4">Adresse</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="strasse" className="font-paragraph">Straße *</Label>
                          <Input
                            id="strasse"
                            placeholder="Musterstraße"
                            value={formData.strasse}
                            onChange={(e) => setFormData({ ...formData, strasse: e.target.value })}
                            required
                            className="font-paragraph"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="hausnummer" className="font-paragraph">Hausnummer *</Label>
                          <Input
                            id="hausnummer"
                            placeholder="123"
                            value={formData.hausnummer}
                            onChange={(e) => setFormData({ ...formData, hausnummer: e.target.value })}
                            required
                            className="font-paragraph"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="plz" className="font-paragraph">PLZ *</Label>
                          <Input
                            id="plz"
                            placeholder="40210"
                            value={formData.plz}
                            onChange={(e) => setFormData({ ...formData, plz: e.target.value })}
                            required
                            className="font-paragraph"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="ort" className="font-paragraph">Ort *</Label>
                          <Input
                            id="ort"
                            placeholder="Düsseldorf"
                            value={formData.ort}
                            onChange={(e) => setFormData({ ...formData, ort: e.target.value })}
                            required
                            className="font-paragraph"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h3 className="font-heading font-bold text-primary mb-4">Kontaktinformationen</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="font-paragraph">Name *</Label>
                          <Input
                            id="name"
                            placeholder="Max Mustermann"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            className="font-paragraph"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="font-paragraph">E-Mail *</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="max@beispiel.de"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            className="font-paragraph"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="font-paragraph">Telefon</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+49 211 1234 5678"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="font-paragraph"
                          />
                        </div>
                      </div>
                    </div>

                    <Button type="submit" className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 h-12 font-bold text-lg rounded-lg">
                      <Send className="w-5 h-5 mr-2" />
                      Kostenlose Beratung anfragen
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="font-heading font-bold text-primary mb-4">Ihre Vorteile</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-sm">Kostenlose Beratung</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-sm">Individuelle Planung</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-sm">Alle Förderungen nutzen</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-sm">Professionelle Installation</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="w-full py-24 bg-background">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-bold text-primary mb-8">Warum energievergleich.shop?</h2>
          <div className="bg-white rounded-lg p-8 border border-gray-200">
            <p className="font-paragraph text-gray-700 leading-relaxed mb-6">
              Bei energievergleich.shop vergleichen wir Photovoltaik-Angebote mit vollständiger Transparenz und Unabhängigkeit. Wir arbeiten nicht für einzelne Anbieter, sondern für Sie – und das völlig kostenlos. Unser Vergleich berücksichtigt nicht nur den Preis, sondern auch Vertragsbedingungen, Komponenten-Qualität und Garantieleistungen. So finden Sie die beste Solaranlage für Ihre Situation in NRW. Alle Informationen auf dieser Seite sind aktuell zum Stand Februar 2026.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 text-sm">
              <Link 
                to="/methodik"
                className="text-primary hover:text-primary/80 font-semibold underline transition-colors"
              >
                So vergleichen wir (Methodik)
              </Link>
              <Link 
                to="/kontakt"
                className="text-primary hover:text-primary/80 font-semibold underline transition-colors"
              >
                Kontakt
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-primary mb-16 text-center">
            Häufig gestellte Fragen
          </h2>

          <div className="space-y-4">
            {[
              {
                q: 'Lohnt sich eine Solaranlage?',
                a: 'Ja. Durch Einspeisevergütung und Eigennutzung amortisiert sich die Anlage meist nach 8-12 Jahren. Danach produzieren Sie kostenlosen Strom für 15-20 Jahre.'
              },
              {
                q: 'Wie viel Strom produziert eine Anlage?',
                a: 'Eine 5-kW-Anlage produziert in NRW etwa 4.500-5.000 kWh pro Jahr. Das hängt von Ausrichtung, Neigung und Verschattung ab.'
              },
              {
                q: 'Welche Förderungen gibt es?',
                a: 'KfW-Förderung, Einspeisevergütung und regionale Programme. Wir informieren Sie über alle verfügbaren Optionen.'
              },
              {
                q: 'Wie lange hält eine Solaranlage?',
                a: 'Module halten 25-30 Jahre. Die meisten Hersteller geben 25 Jahre Leistungsgarantie. Der Wechselrichter sollte nach 10-15 Jahren ausgetauscht werden.'
              },
              {
                q: 'Brauche ich einen Stromspeicher?',
                a: 'Optional. Ein Speicher erhöht Ihre Unabhängigkeit und Eigennutzung. Mit Speicher erreichen Sie bis zu 80% Autarkie.'
              },
              {
                q: 'Was kostet eine Solaranlage?',
                a: 'Eine 5-kW-Anlage kostet etwa 8.000-12.000 Euro (netto). Mit Förderungen reduziert sich die Amortisationszeit erheblich.'
              },
              {
                q: 'Kann ich eine Anlage mieten?',
                a: 'Ja. Mit Mietmodellen zahlen Sie monatlich, ohne die Anlage zu kaufen. Gut für weniger Kapitalaufwand.'
              },
              {
                q: 'Wie lange dauert die Installation?',
                a: 'Installation: 1-3 Tage. Genehmigung: 4-8 Wochen. Insgesamt: 2-3 Monate bis zur Inbetriebnahme.'
              },
              {
                q: 'Brauche ich eine Versicherung?',
                a: 'Ja, empfohlen. Sie schützt vor Hagel, Blitzschlag und Diebstahl. Kosten: etwa 100-200 Euro pro Jahr.'
              },
              {
                q: 'Wie funktioniert die Einspeisevergütung?',
                a: 'Sie erhalten Vergütung für Strom, den Sie ins Netz einspeisen. Aktuelle Rate: etwa 8-10 Cent pro kWh.'
              },
              {
                q: 'Kann ich die Anlage später erweitern?',
                a: 'Ja. Erweiterung ist sinnvoll bei Stromspeicher oder Elektroauto. Wir beraten Sie zu den Möglichkeiten.'
              },
              {
                q: 'Wie funktioniert die Beratung?',
                a: 'Kostenlose Beratung, Dachanalyse, Stromverbrauchsanalyse und individuelles Angebot. Wir kümmern uns um Formalitäten und Installation.'
              }
            ].map((item, index) => (
              <details key={index} className="group rounded-lg border bg-background">
                <summary className="font-heading cursor-pointer list-none px-6 py-4 text-lg font-bold hover:text-primary">
                  <span>{item.q}</span>
                </summary>
                <div className="px-6 pb-4 font-paragraph text-gray-600">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Passende Ratgeber */}
      <PassendeRatgeber moneyPageId="photovoltaik-nrw" limit={4} />

      {/* Related Pages - Cross-Linking */}
      <RelatedPages pages={getRelatedPages('/photovoltaik-nrw')} />

      {/* More on Topic Section */}
      <section className="w-full py-24 bg-background">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-bold text-primary mb-12">Mehr zum Thema</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <a href="https://www.energievergleich.shop/stromvergleich-nrw" className="group">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors">Stromvergleich NRW</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-paragraph text-sm text-gray-600 mb-4">Vergleichen Sie Stromtarife und sparen Sie Kosten.</p>
                  <Button variant="outline" size="sm">Mehr erfahren</Button>
                </CardContent>
              </Card>
            </a>
            <a href="https://www.energievergleich.shop/gasvergleich-nrw" className="group">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors">Gasvergleich NRW</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-paragraph text-sm text-gray-600 mb-4">Vergleichen Sie auch Ihre Gastarife.</p>
                  <Button variant="outline" size="sm">Mehr erfahren</Button>
                </CardContent>
              </Card>
            </a>
            <a href="https://www.energievergleich.shop/ratgeber/photovoltaik" className="group">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors">Ratgeber: Photovoltaik verstehen</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-paragraph text-sm text-gray-600 mb-4">Umfassender Leitfaden zu Solaranlagen.</p>
                  <Button variant="outline" size="sm">Mehr erfahren</Button>
                </CardContent>
              </Card>
            </a>
            <a href="https://www.energievergleich.shop/kontakt" className="group">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors">Kontakt & PV-Angebot anfordern</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-paragraph text-sm text-gray-600 mb-4">Kostenlose Beratung für Ihre Solaranlage.</p>
                  <Button variant="outline" size="sm">Kontakt aufnehmen</Button>
                </CardContent>
              </Card>
            </a>
            <a href="https://www.energievergleich.shop/methodik" className="group">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors">So vergleichen wir: Methodik & Transparenz</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-paragraph text-sm text-gray-600 mb-4">Erfahren Sie unsere Vergleichskriterien.</p>
                  <Button variant="outline" size="sm">Mehr erfahren</Button>
                </CardContent>
              </Card>
            </a>
          </div>
        </div>
      </section>

      {/* Internal Links Section */}
      <section className="w-full py-16 bg-white border-t">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <h3 className="font-heading text-2xl font-bold text-primary mb-8">Weitere Informationen</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to={ROUTES.stromvergleich} className="group">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors">Stromvergleich NRW</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-paragraph text-sm text-gray-600 mb-4">Vergleichen Sie Stromtarife und sparen Sie Kosten.</p>
                  <Button variant="outline" size="sm">Mehr erfahren</Button>
                </CardContent>
              </Card>
            </Link>
            <Link to={ROUTES.gasvergleich} className="group">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors">Gasvergleich NRW</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-paragraph text-sm text-gray-600 mb-4">Vergleichen Sie auch Ihre Gastarife.</p>
                  <Button variant="outline" size="sm">Mehr erfahren</Button>
                </CardContent>
              </Card>
            </Link>
            <Link to={ROUTES.kontakt} className="group">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors">Kontakt</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-paragraph text-sm text-gray-600 mb-4">Haben Sie Fragen? Kontaktieren Sie uns direkt.</p>
                  <Button variant="outline" size="sm">Kontakt aufnehmen</Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      </main>
      <DeferredFooter />
    </div>
  );
}
