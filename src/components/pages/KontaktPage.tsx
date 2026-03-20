import { useState, type ComponentProps } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Send, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import PassendeRatgeber from '@/components/PassendeRatgeber';
import FormSubmissionDialog from '@/components/FormSubmissionDialog';
import { trackCTAClick } from '@/services/form-submission';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/lib/routes';
import { getPageSEO } from '@/lib/seo-config';

export default function KontaktPage() {
  type FormSubmitEvent = Parameters<NonNullable<ComponentProps<'form'>['onSubmit']>>[0];
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    type: 'allgemein',
  });
  const [showDialog, setShowDialog] = useState(false);

  const handleSubmit = (e: FormSubmitEvent) => {
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

      {/* Hero Section */}
      <section className="w-full bg-primary text-primary-foreground py-12 sm:py-16 md:py-24 lg:py-32">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-4 sm:mb-6 leading-tight break-words">
              Kontakt
            </h1>
            <p className="font-paragraph text-base sm:text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed">
              Haben Sie Fragen zu unseren Angeboten? Wir sind gerne für Sie da und helfen Ihnen weiter.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="w-full py-12 sm:py-14 md:py-18 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-5 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mb-10 sm:mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full shadow-sm">
                <CardHeader className="p-4 sm:p-5">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 sm:mb-4">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <CardTitle className="font-heading text-lg sm:text-xl text-primary">E-Mail</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-5 pt-0 sm:pt-0">
                  <p className="font-paragraph text-xs sm:text-sm text-gray-600 mb-2 leading-relaxed">
                    Schreiben Sie uns eine E-Mail und wir antworten schnellstmöglich.
                  </p>
                  <a href="mailto:support@energievergleich.nrw" className="font-bold text-primary hover:underline text-sm break-all">
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
              <Card className="h-full shadow-sm">
                <CardHeader className="p-4 sm:p-5">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 sm:mb-4">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <CardTitle className="font-heading text-lg sm:text-xl text-primary">Telefon</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-5 pt-0 sm:pt-0">
                  <p className="font-paragraph text-xs sm:text-sm text-gray-600 mb-2 leading-relaxed">
                    Rufen Sie uns an und sprechen Sie direkt mit unseren Experten.
                  </p>
                  <a href="tel:+492111234567" className="font-bold text-primary hover:underline text-sm">
                    +49 211 1234567
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
              <Card className="h-full shadow-sm">
                <CardHeader className="p-4 sm:p-5">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 sm:mb-4">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <CardTitle className="font-heading text-lg sm:text-xl text-primary">Öffnungszeiten</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-5 pt-0 sm:pt-0">
                  <div className="font-paragraph text-gray-600 space-y-1 text-xs sm:text-sm">
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
      <section className="w-full py-12 sm:py-14 md:py-18 bg-background">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-5 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-2">
              <Card className="shadow-lg">
                <CardHeader className="bg-primary text-white p-5 sm:p-6">
                  <CardTitle className="font-heading text-xl sm:text-2xl">Kontaktformular</CardTitle>
                </CardHeader>
                <CardContent className="p-5 sm:p-6 overflow-hidden">
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div className="space-y-1.5 sm:space-y-2">
                        <Label htmlFor="name" className="font-paragraph text-sm">Name *</Label>
                        <Input
                          id="name"
                          placeholder="Max Mustermann"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          className="font-paragraph w-full text-sm"
                        />
                      </div>
                      <div className="space-y-1.5 sm:space-y-2">
                        <Label htmlFor="email" className="font-paragraph text-sm">E-Mail *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="max@beispiel.de"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          className="font-paragraph w-full text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div className="space-y-1.5 sm:space-y-2">
                        <Label htmlFor="phone" className="font-paragraph text-sm">Telefon</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+49 211 1234 5678"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="font-paragraph w-full text-sm"
                        />
                      </div>
                      <div className="space-y-1.5 sm:space-y-2">
                        <Label htmlFor="type" className="font-paragraph text-sm">Anfrage zu *</Label>
                        <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })} required>
                          <SelectTrigger id="type" className="font-paragraph w-full text-sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="strom">Stromvergleich</SelectItem>
                            <SelectItem value="gas">Gasvergleich</SelectItem>
                            <SelectItem value="photovoltaik">Photovoltaik</SelectItem>
                            <SelectItem value="allgemein">Allgemeine Anfrage</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-1.5 sm:space-y-2">
                      <Label htmlFor="subject" className="font-paragraph text-sm">Betreff *</Label>
                      <Input
                        id="subject"
                        placeholder="Worum geht es?"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        required
                        className="font-paragraph w-full text-sm"
                      />
                    </div>

                    <div className="space-y-1.5 sm:space-y-2">
                      <Label htmlFor="message" className="font-paragraph text-sm">Nachricht *</Label>
                      <Textarea
                        id="message"
                        placeholder="Wie können wir Ihnen helfen?"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        rows={5}
                        className="font-paragraph w-full text-sm"
                      />
                    </div>

                    <div className="flex pt-2 sm:pt-3">
                      <Button type="submit" className="w-full sm:w-auto bg-secondary text-secondary-foreground hover:bg-secondary/90 h-11 sm:h-12 font-bold text-sm sm:text-base rounded-lg">
                        <Send className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
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

            <div className="space-y-4 sm:space-y-6">
              <Card className="bg-blue-50 border-blue-200 shadow-sm">
                <CardHeader className="p-4 sm:p-5">
                  <CardTitle className="font-heading text-base sm:text-lg text-primary">Schnelle Antwort</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-5 pt-0 sm:pt-0">
                  <p className="font-paragraph text-xs sm:text-sm text-gray-600 leading-relaxed">
                    Wir beantworten Ihre Anfrage in der Regel innerhalb von 24 Stunden.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardHeader className="p-4 sm:p-5">
                  <CardTitle className="font-heading text-base sm:text-lg text-primary">Weitere Seiten</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-5 pt-0 sm:pt-0 space-y-2 sm:space-y-3">
                  <Link to={ROUTES.STROMVERGLEICH_NRW} className="block text-primary hover:underline font-paragraph text-xs sm:text-sm">
                    → Stromvergleich NRW
                  </Link>
                  <Link to={ROUTES.GASVERGLEICH_NRW} className="block text-primary hover:underline font-paragraph text-xs sm:text-sm">
                    → Gasvergleich NRW
                  </Link>
                  <Link to={ROUTES.PHOTOVOLTAIK_NRW} className="block text-primary hover:underline font-paragraph text-xs sm:text-sm">
                    → Photovoltaik NRW
                  </Link>
                  <Link to={ROUTES.IMPRESSUM} className="block text-primary hover:underline font-paragraph text-xs sm:text-sm">
                    → Impressum
                  </Link>
                  <Link to={ROUTES.DATENSCHUTZ} className="block text-primary hover:underline font-paragraph text-xs sm:text-sm">
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

      <Footer />
    </div>
  );
}
