import { useState, type SyntheticEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Send, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import NativeSelect from '@/components/ui/native-select';
import Header from '@/components/Header';
import DeferredFooter from '@/components/DeferredFooter';
import SEOHead from '@/components/SEOHead';
import PassendeRatgeber from '@/components/PassendeRatgeber';
import FormSubmissionDialog from '@/components/FormSubmissionDialog';
import { trackCTAClick } from '@/services/form-submission';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/lib/routes';
import { getPageSEO } from '@/lib/seo-config';

export default function KontaktPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    type: 'allgemein',
  });
  const [showDialog, setShowDialog] = useState(false);

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Track CTA click
    trackCTAClick('Kontaktformular');
    // Show dialog instead of alert
    setShowDialog(true);
  };

  const handleDialogSuccess = () => {
    // Reset form after successful submission
    setFormData({ name: '', email: '', phone: '', subject: '', message: '', type: 'allgemein' });
  };

  const seo = getPageSEO('kontakt');

  return (
    <div className="min-h-screen bg-background break-words leading-mobile">
      <SEOHead
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        ogTitle={seo.ogTitle}
        ogDescription={seo.ogDescription}
      />
      <Header />
      <main>

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
              Kontakt
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
              Haben Sie Fragen zu unseren Angeboten? Wir sind gerne für Sie da und helfen Ihnen weiter.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="w-full py-24 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="font-heading text-xl text-primary">E-Mail</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-paragraph text-gray-600 mb-2">
                    Schreiben Sie uns eine E-Mail und wir antworten schnellstmöglich.
                  </p>
                  <a
                    href="mailto:support@energievergleich.nrw"
                    className="font-bold text-primary hover:underline"
                    aria-label="E-Mail an support@energievergleich.nrw"
                  >
                    support@energievergleich.nrw
                  </a>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="font-heading text-xl text-primary">Telefon</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-paragraph text-gray-600 mb-2">
                    Rufen Sie uns an und sprechen Sie direkt mit unseren Experten.
                  </p>
                  <a href="tel:+492011033939" className="font-bold text-primary hover:underline">
                    +49 (0) 2 01 - 1 03 - 39 39
                  </a>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="font-heading text-xl text-primary">Öffnungszeiten</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="font-paragraph text-gray-600 space-y-1 text-sm">
                    <p>Mo - Fr: 09:00 - 18:00 Uhr</p>
                    <p>Sa: 10:00 - 14:00 Uhr</p>
                    <p>So: Geschlossen</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="w-full py-24 bg-background">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-2">
              <Card className="shadow-xl">
                <CardHeader className="bg-primary text-white">
                  <CardTitle className="font-heading text-2xl">Kontaktformular</CardTitle>
                </CardHeader>
                <CardContent className="p-8 ox-hidden">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="font-paragraph">Name *</Label>
                        <Input
                          id="name"
                          placeholder="Max Mustermann"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          className="font-paragraph w-full"
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
                          className="font-paragraph w-full"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="font-paragraph">Telefon</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+49 (0) 2 01 - 1 03 - 39 39"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="font-paragraph w-full"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="type" className="font-paragraph">Anfrage zu *</Label>
                        <NativeSelect
                          id="type"
                          value={formData.type}
                          onValueChange={(value) => setFormData({ ...formData, type: value })}
                          options={[
                            { value: 'strom', label: 'Stromvergleich' },
                            { value: 'gas', label: 'Gasvergleich' },
                            { value: 'photovoltaik', label: 'Photovoltaik' },
                            { value: 'allgemein', label: 'Allgemeine Anfrage' },
                          ]}
                          required
                          className="font-paragraph w-full"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="font-paragraph">Betreff *</Label>
                      <Input
                        id="subject"
                        placeholder="Worum geht es?"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        required
                        className="font-paragraph w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="font-paragraph">Nachricht *</Label>
                      <Textarea
                        id="message"
                        placeholder="Wie können wir Ihnen helfen?"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        rows={6}
                        className="font-paragraph w-full"
                      />
                    </div>

                    <div className="flex justify-stretch sm:justify-start">
                      <Button type="submit" className="w-full sm:w-auto bg-secondary text-secondary-foreground hover:bg-secondary/90 h-12 font-bold text-lg rounded-lg">
                        <Send className="w-5 h-5 mr-2" />
                        Nachricht senden
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Form Submission Dialog */}
              <FormSubmissionDialog
                isOpen={showDialog}
                onClose={() => setShowDialog(false)}
                formType="kontakt"
                formData={formData}
                requiredFields={['name', 'email', 'subject', 'message']}
                onSuccess={handleDialogSuccess}
                title="Nachricht senden"
              />
            </div>

            <div className="space-y-6">
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="font-heading text-lg text-primary">Schnelle Antwort</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-paragraph text-sm text-gray-600">
                    Wir beantworten Ihre Anfrage in der Regel innerhalb von 24 Stunden.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-heading text-lg text-primary">Weitere Seiten</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link to={ROUTES.STROMVERGLEICH_NRW} className="block text-primary hover:underline font-paragraph text-sm">
                    → Stromvergleich NRW
                  </Link>
                  <Link to={ROUTES.GASVERGLEICH_NRW} className="block text-primary hover:underline font-paragraph text-sm">
                    → Gasvergleich NRW
                  </Link>
                  <Link to={ROUTES.PHOTOVOLTAIK_NRW} className="block text-primary hover:underline font-paragraph text-sm">
                    → Photovoltaik NRW
                  </Link>
                  <Link to={ROUTES.IMPRESSUM} className="block text-primary hover:underline font-paragraph text-sm">
                    → Impressum
                  </Link>
                  <Link to={ROUTES.DATENSCHUTZ} className="block text-primary hover:underline font-paragraph text-sm">
                    → Datenschutz
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Passende Ratgeber */}
      <PassendeRatgeber moneyPageId="kontakt" limit={4} />

      </main>
      <DeferredFooter />
    </div>
  );
}
