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
        description="Datenschutzerklärung von Energievergleich.shop - DSGVO konform"
        keywords="Datenschutz, Datenschutzerklärung, DSGVO, Datenschutzerklärung"
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
            className="space-y-8"
          >
            {/* Checklist */}
            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6">
              <h3 className="font-heading text-lg font-bold text-yellow-900 mb-4">⚠️ Erforderliche Informationen zum Ausfüllen</h3>
              <ul className="space-y-2 text-sm text-yellow-800 font-paragraph">
                <li>☐ [UNTERNEHMENSNAME] - Name des Verantwortlichen</li>
                <li>☐ [STRASSE_HAUSNUMMER] - Adresse des Verantwortlichen</li>
                <li>☐ [PLZ_STADT] - PLZ und Stadt</li>
                <li>☐ [EMAIL] - E-Mail-Adresse des Verantwortlichen</li>
                <li>☐ [TELEFON] - Telefonnummer (optional)</li>
                <li>☐ [DATENSCHUTZBEAUFTRAGTER] - Name und Kontakt (falls vorhanden)</li>
                <li>☐ [HOSTING_PROVIDER] - Name des Hosting-Providers (z.B. Wix)</li>
                <li>☐ [TRACKING_TOOLS] - Welche Tracking-Tools sind aktiv? (Google Analytics, etc.)</li>
                <li>☐ [EXTERNE_DIENSTE] - Welche externen Dienste werden genutzt? (YouTube, Google Maps, etc.)</li>
                <li>☐ [AUFSICHTSBEHOERDE] - Zuständige Datenschutzbehörde</li>
              </ul>
            </div>

            {/* 1. Verantwortlicher */}
            <div>
              <h2 className="font-heading text-3xl font-bold text-primary mb-6">1. Verantwortlicher für die Datenverarbeitung</h2>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4 font-paragraph text-gray-700">
                <div>
                  <p className="font-bold mb-2">Verantwortlicher (Art. 4 Abs. 7 DSGVO):</p>
                  <p>[UNTERNEHMENSNAME]<br />[STRASSE_HAUSNUMMER]<br />[PLZ_STADT]<br />Deutschland</p>
                </div>

                <div className="border-t pt-4">
                  <p className="font-bold mb-2">Kontakt:</p>
                  <p>E-Mail: [EMAIL]<br />Telefon: [TELEFON]<br />Website: energievergleich.shop</p>
                </div>

                <div className="border-t pt-4">
                  <p className="font-bold mb-2">Datenschutzbeauftragter (falls vorhanden):</p>
                  <p>[DATENSCHUTZBEAUFTRAGTER]</p>
                  <p className="text-sm text-gray-500 mt-2">Falls nicht vorhanden: „Kein Datenschutzbeauftragter bestellt"</p>
                </div>
              </div>
            </div>

            {/* 2. Übersicht der Verarbeitungen */}
            <div>
              <h2 className="font-heading text-3xl font-bold text-primary mb-6">2. Übersicht der Datenverarbeitungen</h2>
              
              <p className="font-paragraph text-gray-700 mb-6">
                Wir verarbeiten personenbezogene Daten nur, wenn dies rechtlich zulässig ist. Nachfolgend erhalten Sie einen Überblick über die Verarbeitungen:
              </p>

              {/* 2.1 Hosting & Server-Logs */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4 font-paragraph text-gray-700 mb-6">
                <h3 className="font-bold text-lg text-primary">2.1 Hosting und Server-Logs</h3>
                
                <div>
                  <p className="font-bold mb-2">Verarbeitete Daten:</p>
                  <p>IP-Adresse, Browser-Typ, Betriebssystem, Referrer-URL, Zugriffsdatum und -uhrzeit, Anfragegröße, HTTP-Statuscode</p>
                </div>

                <div className="border-t pt-4">
                  <p className="font-bold mb-2">Zweck:</p>
                  <p>Bereitstellung und Sicherheit der Website, Fehleranalyse</p>
                </div>

                <div className="border-t pt-4">
                  <p className="font-bold mb-2">Rechtsgrundlage:</p>
                  <p>Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse)</p>
                </div>

                <div className="border-t pt-4">
                  <p className="font-bold mb-2">Speicherdauer:</p>
                  <p>Server-Logs: in der Regel 7-30 Tage</p>
                </div>

                <div className="border-t pt-4">
                  <p className="font-bold mb-2">Auftragsverarbeiter:</p>
                  <p>Wix.com (Hosting-Provider)<br />Datenschutzerklärung: <a href="https://www.wix.com/de/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://www.wix.com/de/privacy</a></p>
                </div>
              </div>

              {/* 2.2 Kontaktformular */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4 font-paragraph text-gray-700 mb-6">
                <h3 className="font-bold text-lg text-primary">2.2 Kontaktformular</h3>
                
                <div>
                  <p className="font-bold mb-2">Verarbeitete Daten:</p>
                  <p>Name, E-Mail-Adresse, Telefonnummer (optional), Nachrichtentext, Anfragekategorie</p>
                </div>

                <div className="border-t pt-4">
                  <p className="font-bold mb-2">Zweck:</p>
                  <p>Bearbeitung Ihrer Anfrage und Kontaktaufnahme</p>
                </div>

                <div className="border-t pt-4">
                  <p className="font-bold mb-2">Rechtsgrundlage:</p>
                  <p>Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung) oder Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)</p>
                </div>

                <div className="border-t pt-4">
                  <p className="font-bold mb-2">Speicherdauer:</p>
                  <p>Bis zur vollständigen Bearbeitung der Anfrage, danach [SPEICHERDAUER_KONTAKT] (z.B. 12 Monate für Archivierung)</p>
                </div>

                <div className="border-t pt-4">
                  <p className="font-bold mb-2">Empfänger:</p>
                  <p>Interne Bearbeitung durch [UNTERNEHMENSNAME], ggf. Weitergabe an externe Dienstleister</p>
                </div>
              </div>

              {/* 2.3 E-Mail und Telefon */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4 font-paragraph text-gray-700 mb-6">
                <h3 className="font-bold text-lg text-primary">2.3 Direktkontakt per E-Mail oder Telefon</h3>
                
                <div>
                  <p className="font-bold mb-2">Verarbeitete Daten:</p>
                  <p>E-Mail-Adresse, Telefonnummer, Name, Inhalt der Kommunikation</p>
                </div>

                <div className="border-t pt-4">
                  <p className="font-bold mb-2">Zweck:</p>
                  <p>Beantwortung Ihrer Anfrage und Kommunikation</p>
                </div>

                <div className="border-t pt-4">
                  <p className="font-bold mb-2">Rechtsgrundlage:</p>
                  <p>Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung)</p>
                </div>

                <div className="border-t pt-4">
                  <p className="font-bold mb-2">Speicherdauer:</p>
                  <p>[SPEICHERDAUER_EMAIL] (z.B. 12 Monate nach letztem Kontakt)</p>
                </div>
              </div>

              {/* 2.4 Cookies - Technisch notwendig */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4 font-paragraph text-gray-700 mb-6">
                <h3 className="font-bold text-lg text-primary">2.4 Cookies (technisch notwendig)</h3>
                
                <div>
                  <p className="font-bold mb-2">Verarbeitete Daten:</p>
                  <p>Cookie-ID, Sitzungsinformationen, Benutzereinstellungen</p>
                </div>

                <div className="border-t pt-4">
                  <p className="font-bold mb-2">Zweck:</p>
                  <p>Gewährleistung der Funktionalität der Website, Speicherung von Benutzereinstellungen</p>
                </div>

                <div className="border-t pt-4">
                  <p className="font-bold mb-2">Rechtsgrundlage:</p>
                  <p>Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse) oder Art. 6 Abs. 1 lit. a DSGVO (Einwilligung für nicht-notwendige Cookies)</p>
                </div>

                <div className="border-t pt-4">
                  <p className="font-bold mb-2">Speicherdauer:</p>
                  <p>Abhängig vom Cookie-Typ, in der Regel bis zum Ende der Browsersitzung oder [COOKIE_DAUER]</p>
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm text-gray-500">
                    Hinweis: Weitere Informationen zu Cookies finden Sie in unserem Cookie-Banner auf der Website.
                  </p>
                </div>
              </div>

              {/* 2.5 Analyse und Tracking */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4 font-paragraph text-gray-700 mb-6">
                <h3 className="font-bold text-lg text-primary">2.5 Analyse und Tracking</h3>
                
                <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-4">
                  <p className="text-sm text-blue-800 font-bold">Status: [TRACKING_STATUS]</p>
                  <p className="text-sm text-blue-700 mt-2">Bitte ausfüllen mit: „Aktiv" oder „Nicht im Einsatz"</p>
                </div>

                <div>
                  <p className="font-bold mb-2">Falls aktiv - Verarbeitete Daten:</p>
                  <p>IP-Adresse (ggf. anonymisiert), Geräte-ID, Browser-Informationen, Besuchte Seiten, Verweildauer, Klicks, Scroll-Verhalten</p>
                </div>

                <div className="border-t pt-4">
                  <p className="font-bold mb-2">Falls aktiv - Zweck:</p>
                  <p>Analyse des Nutzerverhaltens, Optimierung der Website, Erstellung von Statistiken</p>
                </div>

                <div className="border-t pt-4">
                  <p className="font-bold mb-2">Falls aktiv - Rechtsgrundlage:</p>
                  <p>Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)</p>
                </div>

                <div className="border-t pt-4">
                  <p className="font-bold mb-2">Falls aktiv - Verwendete Tools:</p>
                  <p>[TRACKING_TOOLS]</p>
                  <p className="text-sm text-gray-500 mt-2">Beispiele: Google Analytics, Matomo, Hotjar, etc.</p>
                </div>

                <div className="border-t pt-4">
                  <p className="font-bold mb-2">Falls aktiv - Speicherdauer:</p>
                  <p>[TRACKING_SPEICHERDAUER] (z.B. 26 Monate bei Google Analytics)</p>
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm text-gray-500">
                    Hinweis: Falls Tracking-Tools nicht im Einsatz sind, können Sie diesen Abschnitt entfernen oder mit „Nicht im Einsatz" kennzeichnen.
                  </p>
                </div>
              </div>

              {/* 2.6 Externe Dienste */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4 font-paragraph text-gray-700 mb-6">
                <h3 className="font-bold text-lg text-primary">2.6 Eingebettete externe Inhalte</h3>
                
                <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-4">
                  <p className="text-sm text-blue-800 font-bold">Status: [EXTERNE_DIENSTE_STATUS]</p>
                  <p className="text-sm text-blue-700 mt-2">Bitte ausfüllen mit: „Aktiv" oder „Nicht im Einsatz"</p>
                </div>

                <div>
                  <p className="font-bold mb-2">Falls aktiv - Verwendete Dienste:</p>
                  <p>[EXTERNE_DIENSTE]</p>
                  <p className="text-sm text-gray-500 mt-2">Beispiele: YouTube, Google Maps, Vimeo, etc.</p>
                </div>

                <div className="border-t pt-4">
                  <p className="font-bold mb-2">Falls aktiv - Verarbeitete Daten:</p>
                  <p>IP-Adresse, Cookie-Daten, Geräte-Informationen (abhängig vom Dienst)</p>
                </div>

                <div className="border-t pt-4">
                  <p className="font-bold mb-2">Falls aktiv - Rechtsgrundlage:</p>
                  <p>Art. 6 Abs. 1 lit. a DSGVO (Einwilligung) oder Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse)</p>
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm text-gray-500">
                    Hinweis: Externe Dienste können Daten in Länder außerhalb der EU übermitteln. Weitere Informationen finden Sie in den Datenschutzerklärungen der jeweiligen Anbieter.
                  </p>
                </div>
              </div>
            </div>

            {/* 3. Betroffenenrechte */}
            <div>
              <h2 className="font-heading text-3xl font-bold text-primary mb-6">3. Ihre Rechte nach der DSGVO (Art. 15-22 DSGVO)</h2>
              
              <p className="font-paragraph text-gray-700 mb-6">
                Sie haben folgende Rechte bezüglich Ihrer personenbezogenen Daten:
              </p>

              <div className="space-y-4 font-paragraph text-gray-700">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="font-bold mb-2">1. Auskunftsrecht (Art. 15 DSGVO)</p>
                  <p>Sie können jederzeit Auskunft darüber verlangen, welche personenbezogenen Daten wir über Sie speichern, woher diese stammen und wie wir sie verwenden.</p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="font-bold mb-2">2. Recht auf Berichtigung (Art. 16 DSGVO)</p>
                  <p>Sie können die Berichtigung unrichtiger oder unvollständiger Daten verlangen.</p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="font-bold mb-2">3. Recht auf Löschung (Art. 17 DSGVO)</p>
                  <p>Sie können unter bestimmten Bedingungen die Löschung Ihrer Daten verlangen („Recht auf Vergessenwerden").</p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="font-bold mb-2">4. Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</p>
                  <p>Sie können die Einschränkung der Verarbeitung Ihrer Daten verlangen, z.B. wenn Sie die Richtigkeit der Daten bestreiten.</p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="font-bold mb-2">5. Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</p>
                  <p>Sie können Ihre Daten in einem strukturierten, gängigen und maschinenlesbaren Format erhalten und an einen anderen Verantwortlichen übermitteln.</p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="font-bold mb-2">6. Widerspruchsrecht (Art. 21 DSGVO)</p>
                  <p>Sie können der Verarbeitung Ihrer Daten widersprechen, insbesondere bei Verarbeitung für Direktmarketing oder Profiling.</p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="font-bold mb-2">7. Recht auf Beschwerde (Art. 77 DSGVO)</p>
                  <p>Sie haben das Recht, sich bei einer Datenschutzbehörde zu beschweren, wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer Daten gegen die DSGVO verstößt.</p>
                </div>
              </div>
            </div>

            {/* 4. Kontakt für Datenschutz */}
            <div>
              <h2 className="font-heading text-3xl font-bold text-primary mb-6">4. Kontakt für Datenschutzfragen</h2>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4 font-paragraph text-gray-700">
                <p>Wenn Sie Fragen zum Datenschutz haben oder Ihre Rechte ausüben möchten, kontaktieren Sie uns bitte:</p>
                
                <div>
                  <p className="font-bold mb-2">E-Mail:</p>
                  <p>[EMAIL]</p>
                </div>

                <div className="border-t pt-4">
                  <p className="font-bold mb-2">Postanschrift:</p>
                  <p>[UNTERNEHMENSNAME]<br />[STRASSE_HAUSNUMMER]<br />[PLZ_STADT]<br />Deutschland</p>
                </div>

                <div className="border-t pt-4">
                  <p className="font-bold mb-2">Telefon:</p>
                  <p>[TELEFON]</p>
                </div>
              </div>
            </div>

            {/* 5. Zuständige Aufsichtsbehörde */}
            <div>
              <h2 className="font-heading text-3xl font-bold text-primary mb-6">5. Zuständige Datenschutzbehörde</h2>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 font-paragraph text-gray-700">
                <p className="mb-4">Die zuständige Datenschutzbehörde ist:</p>
                <p>[AUFSICHTSBEHOERDE]</p>
                <p className="text-sm text-gray-500 mt-4">Beispiel für NRW: Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen (LDI NRW)</p>
              </div>
            </div>

            {/* 6. Änderungen */}
            <div>
              <h2 className="font-heading text-3xl font-bold text-primary mb-6">6. Änderungen dieser Datenschutzerklärung</h2>
              
              <p className="font-paragraph text-gray-700">
                Wir behalten uns das Recht vor, diese Datenschutzerklärung jederzeit zu ändern. Die aktuelle Fassung finden Sie immer auf dieser Seite. Wesentliche Änderungen werden wir Ihnen per E-Mail oder durch einen prominenten Hinweis auf unserer Website mitteilen.
              </p>
            </div>

            {/* Hinweis */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
              <p className="font-paragraph text-sm text-gray-700">
                <strong>Hinweis:</strong> Diese Datenschutzerklärung ist ein Muster und muss an die spezifischen Anforderungen und Praktiken Ihres Unternehmens angepasst werden. Bitte konsultieren Sie einen Rechtsanwalt, um sicherzustellen, dass Ihre Datenschutzerklärung vollständig und konform mit der DSGVO ist.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
