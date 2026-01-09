import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Datenschutz - Energievergleich NRW"
        description="Datenschutzerklärung von Energievergleich NRW. Erfahren Sie, wie wir Ihre Daten schützen."
        keywords="Datenschutz, Datenschutzerklärung, DSGVO"
        ogTitle="Datenschutz - Energievergleich NRW"
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
            <h2 className="font-heading text-3xl font-bold text-primary mb-6">Datenschutzerklärung</h2>

            <div className="space-y-8">
              <div>
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">1. Datenschutz auf einen Blick</h3>
                <p className="font-paragraph text-gray-700">
                  Die folgenden Informationen geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgelisteten Datenschutzerklärung.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">2. Datenerfassung auf unserer Website</h3>
                <h4 className="font-heading text-xl font-bold text-gray-800 mb-3">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h4>
                <p className="font-paragraph text-gray-700">
                  Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">3. Wie erfassen wir Ihre Daten?</h3>
                <p className="font-paragraph text-gray-700 mb-4">
                  Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
                </p>
                <p className="font-paragraph text-gray-700">
                  Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenzugriffs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie unsere Website betreten.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">4. Wofür nutzen wir Ihre Daten?</h3>
                <p className="font-paragraph text-gray-700">
                  Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">5. Welche Rechte haben Sie bezüglich Ihrer Daten?</h3>
                <p className="font-paragraph text-gray-700 mb-4">
                  Sie haben jederzeit das Recht unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung, Sperrung oder Löschung dieser Daten zu verlangen. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden.
                </p>
                <p className="font-paragraph text-gray-700">
                  Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">6. Analyse-Tools und Tools von Drittanbietern</h3>
                <p className="font-paragraph text-gray-700">
                  Beim Besuch unserer Website kann Ihr Surf-Verhalten statistisch ausgewertet werden. Das geschieht vor allem mit Cookies und mit sogenannten Analyseprogrammen. Die Analyse Ihres Surf-Verhaltens erfolgt in der Regel anonym; das Surf-Verhalten kann nicht zu Ihnen zurückverfolgt werden.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">7. Cookies</h3>
                <p className="font-paragraph text-gray-700 mb-4">
                  Die Internetseiten verwenden an mehreren Stellen sogenannte Cookies. Sie ermöglichen es uns, die Benutzung unserer Website nutzerfreundlicher, effektiver und sicherer zu machen. Cookies sind kleine Textdateien, die auf Ihrem Rechner abgelegt werden und die Ihr Browser speichert.
                </p>
                <p className="font-paragraph text-gray-700">
                  Die meisten der von uns verwendeten Cookies sind sogenannte „Session-Cookies". Sie werden nach Ende Ihres Besuchs automatisch gelöscht. Andere Cookies bleiben auf Ihrem Endgerät gespeichert bis Sie diese löschen. Diese Cookies ermöglichen es uns, Ihren Browser beim nächsten Besuch wiederzuerkennen.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">8. Kontaktformulare</h3>
                <p className="font-paragraph text-gray-700">
                  Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">9. Ihre Rechte nach der DSGVO</h3>
                <p className="font-paragraph text-gray-700 mb-4">
                  Sie haben das Recht:
                </p>
                <ul className="font-paragraph text-gray-700 space-y-2 ml-6">
                  <li>• Auskunft über die bei uns gespeicherten Daten zu erhalten</li>
                  <li>• Berichtigung unrichtiger Daten zu verlangen</li>
                  <li>• Löschung Ihrer Daten zu verlangen</li>
                  <li>• Einschränkung der Verarbeitung zu verlangen</li>
                  <li>• Datenübertragbarkeit zu verlangen</li>
                  <li>• Widerspruch gegen die Verarbeitung einzulegen</li>
                  <li>• Beschwerde bei einer Aufsichtsbehörde einzureichen</li>
                </ul>
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">10. Kontakt zum Datenschutzbeauftragten</h3>
                <p className="font-paragraph text-gray-700">
                  Bei Fragen zum Datenschutz kontaktieren Sie bitte den Datenschutzbeauftragten unter der im Impressum angegebenen Adresse oder per E-Mail.
                </p>
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
