import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Datenschutz | Energievergleich"
        description="Datenschutzerklärung von Energievergleich. Erfahren Sie, wie wir Ihre Daten schützen."
        keywords="Datenschutz, Datenschutzerklärung, DSGVO"
        ogTitle="Datenschutz | Energievergleich"
        ogDescription="Datenschutzerklärung und Informationen zum Datenschutz."
      />
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-primary text-primary-foreground py-20 md:py-32">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Datenschutz
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-white/90">
              Ihre Privatsphäre ist uns wichtig
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="w-full py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="prose prose-lg max-w-none"
          >
            {/* Checklist */}
            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6 mb-8">
              <h3 className="font-heading text-lg font-bold text-yellow-900 mb-4">⚠️ Bitte ausfüllen - Erforderliche Informationen</h3>
              <ul className="space-y-2 text-sm text-yellow-800">
                <li>☐ Verantwortlicher (Name, Adresse, Kontakt)</li>
                <li>☐ Datenschutzbeauftragter (falls vorhanden)</li>
                <li>☐ Hosting-Provider und Datenspeicherort</li>
                <li>☐ Verwendete Cookies und Tracking-Tools</li>
                <li>☐ Externe Dienste und deren Datenschutzrichtlinien</li>
                <li>☐ Kontaktformular-Verarbeitung dokumentieren</li>
              </ul>
            </div>

            <h2 className="font-heading text-3xl font-bold text-primary mb-6">Datenschutzerklärung</h2>

            <div className="space-y-8">
              <div>
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">1. Verantwortlicher und Kontakt</h3>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3 font-paragraph text-gray-700">
                  <p><strong>Verantwortlicher für die Datenverarbeitung:</strong></p>
                  <p>[Unternehmensname]<br />[Straße und Hausnummer]<br />[PLZ] [Stadt]<br />Telefon: [Bitte eintragen]<br />E-Mail: [Bitte eintragen]</p>
                  <p><strong>Datenschutzbeauftragter (falls vorhanden):</strong></p>
                  <p>[Name und Kontakt eintragen oder "nicht vorhanden"]</p>
                </div>
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">2. Datenschutz auf einen Blick</h3>
                <p className="font-paragraph text-gray-700">
                  Die folgenden Informationen geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">3. Datenerfassung auf unserer Website</h3>
                <h4 className="font-heading text-xl font-bold text-gray-800 mb-3">Wer ist verantwortlich für die Datenerfassung?</h4>
                <p className="font-paragraph text-gray-700">
                  Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber (siehe Abschnitt 1).
                </p>
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">4. Hosting und Speicherung</h3>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3 font-paragraph text-gray-700">
                  <p><strong>Hosting-Provider:</strong></p>
                  <p>[Name des Hosting-Anbieters eintragen]</p>
                  <p><strong>Datenspeicherort:</strong></p>
                  <p>[Land/Region eintragen, z.B. "Deutschland" oder "EU"]</p>
                  <p><strong>Datenschutzrichtlinie des Providers:</strong></p>
                  <p>[Link zur Datenschutzrichtlinie eintragen]</p>
                </div>
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">5. Kontaktformulare</h3>
                <p className="font-paragraph text-gray-700 mb-4">
                  Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
                </p>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3 font-paragraph text-gray-700">
                  <p><strong>Verarbeitete Daten:</strong> Name, E-Mail, Telefon, Nachricht</p>
                  <p><strong>Rechtsgrundlage:</strong> Ihre Einwilligung (Art. 6 Abs. 1 a DSGVO)</p>
                  <p><strong>Speicherdauer:</strong> [Bitte eintragen, z.B. "12 Monate nach Bearbeitung"]</p>
                  <p><strong>Empfänger:</strong> [Bitte eintragen, z.B. "Nur interne Bearbeitung"]</p>
                </div>
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">6. Cookies und Tracking (Optional)</h3>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3 font-paragraph text-gray-700">
                  <p><strong>Verwendete Cookies:</strong></p>
                  <p>[Bitte eintragen oder "Keine Cookies verwendet"]</p>
                  <p><strong>Tracking-Tools:</strong></p>
                  <p>[z.B. Google Analytics, Matomo, etc. - bitte eintragen oder "Nicht verwendet"]</p>
                  <p><strong>Externe Dienste:</strong></p>
                  <p>[z.B. YouTube, Google Maps, etc. - bitte eintragen oder "Nicht verwendet"]</p>
                </div>
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">7. Ihre Rechte nach der DSGVO</h3>
                <p className="font-paragraph text-gray-700 mb-4">
                  Sie haben das Recht:
                </p>
                <ul className="font-paragraph text-gray-700 space-y-2 ml-6">
                  <li>• <strong>Auskunft:</strong> Sie können jederzeit Auskunft über die bei uns gespeicherten Daten erhalten</li>
                  <li>• <strong>Berichtigung:</strong> Sie können unrichtige Daten berichtigen lassen</li>
                  <li>• <strong>Löschung:</strong> Sie können die Löschung Ihrer Daten verlangen ("Recht auf Vergessenwerden")</li>
                  <li>• <strong>Einschränkung:</strong> Sie können die Einschränkung der Verarbeitung verlangen</li>
                  <li>• <strong>Datenübertragbarkeit:</strong> Sie können Ihre Daten in einem strukturierten Format erhalten</li>
                  <li>• <strong>Widerspruch:</strong> Sie können der Verarbeitung widersprechen</li>
                  <li>• <strong>Beschwerde:</strong> Sie können sich bei einer Aufsichtsbehörde beschweren</li>
                </ul>
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">8. Kontakt zum Datenschutz</h3>
                <p className="font-paragraph text-gray-700">
                  Bei Fragen zum Datenschutz kontaktieren Sie bitte:
                </p>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-2 font-paragraph text-gray-700 mt-4">
                  <p><strong>E-Mail:</strong> [Bitte eintragen]</p>
                  <p><strong>Telefon:</strong> [Bitte eintragen]</p>
                  <p><strong>Adresse:</strong> [Bitte eintragen]</p>
                </div>
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">9. Zuständige Aufsichtsbehörde</h3>
                <p className="font-paragraph text-gray-700">
                  Die zuständige Datenschutzbehörde für Nordrhein-Westfalen ist:
                </p>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-2 font-paragraph text-gray-700 mt-4">
                  <p><strong>Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen (LDI NRW)</strong><br />
                  Kavalleriestraße 8<br />
                  40213 Düsseldorf<br />
                  Telefon: +49 211 38424-0<br />
                  E-Mail: poststelle@ldi.nrw.de<br />
                  Website: www.ldi.nrw.de</p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
                <p className="font-paragraph text-sm text-gray-700">
                  <strong>Hinweis:</strong> Diese Datenschutzerklärung ist ein Muster und muss an die spezifischen Anforderungen und Praktiken Ihres Unternehmens angepasst werden. Bitte konsultieren Sie einen Rechtsanwalt, um sicherzustellen, dass Ihre Datenschutzerklärung vollständig und konform mit der DSGVO ist.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
