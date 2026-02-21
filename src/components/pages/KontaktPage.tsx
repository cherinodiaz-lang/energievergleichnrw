import React, { useState } from 'react';
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
import { CONTACT } from '@/config/contact';

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

  const telHref = `tel:${CONTACT.phone.replace(/\s+/g, '')}`;
  const mailtoHref = `mailto:${CONTACT.email}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackCTAClick('Kontaktformular');
    setShowDialog(true);
  };

  const handleDialogSuccess = () => {
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
                  <a href={mailtoHref} className="font-bold text-primary hover:underline">
                    {CONTACT.email}
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
                  <a href={telHref} className="font-bold text-primary hover:underline">
                    {CONTACT.phone}
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
                  <p className="font-paragraph text-gray-600 mb-2">
                    Wir beantworten Ihre Anfrage in der Regel innerhalb von 24 Stunden.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-heading text-lg text-primary">Adresse</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-paragraph text-gray-600 mb-2">
                    Besuchen Sie uns vor Ort oder kontaktieren Sie uns per Post.
                  </p>
                  <p className="font-paragraph font-semibold text-foreground">
                    {CONTACT.addressLines.map((line, idx) => (
                      <React.Fragment key={idx}>
                        {line}
                        {idx < CONTACT.addressLines.length - 1 ? <br /> : null}
                      </React.Fragment>
                    ))}
                  </p>
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
                          placeholder="Ihr Name"
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
                          placeholder="Ihre E-Mail"
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
                          placeholder="Ihre Telefonnummer"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="font-paragraph w-full"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="type" className="font-paragraph">Anfrage zu *</Label>
                        <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })} required>
                          <SelectTrigger id="type" className="font-paragraph w-full">
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
                    Wir beantworten Ihre Anfrage in der Regel innerhalb eines Werktags.
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

      <PassendeRatgeber moneyPageId="kontakt" limit={4} />

      <Footer />
    </div>
  );
}
