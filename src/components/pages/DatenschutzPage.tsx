import Header from '@/components/Header';
import DeferredFooter from '@/components/DeferredFooter';
import SEOHead from '@/components/SEOHead';
import { getPageSEO } from '@/lib/seo-config';

export default function DatenschutzPage() {
  const seo = getPageSEO('datenschutz');

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
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Datenschutz
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-white/90">
              Ihre Privatsphäre ist uns wichtig
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="w-full py-24 bg-white pb-10">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="space-y-8 break-words overflow-x-hidden min-w-0">
            {/* Info Box */}
            <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-6">
              <h3 className="font-heading text-lg font-bold text-blue-900 mb-4">ℹ️ Datenschutzerklärung</h3>
              <p className="text-sm text-blue-800 font-paragraph">
                Diese Datenschutzerklärung entspricht den Anforderungen der DSGVO und informiert Sie über die Verarbeitung Ihrer personenbezogenen Daten.
              </p>
            </div>

            {/* 1. Verantwortlicher */}
            <div>
              <h2 className="font-heading text-3xl font-bold text-primary mb-6 mt-6">1. Verantwortlicher für die Datenverarbeitung</h2>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4 font-paragraph text-slate-900 break-words">
                <div>
                  <p className="font-bold mb-2">Verantwortlicher (Art. 4 Abs. 7 DSGVO):</p>
                  <p>ENERGIEVERGLEICH NRW<br />59302 Oelde, NRW</p>
                </div>

                <div className="border-t pt-4">
                  <p className="font-bold mb-2">Kontakt:</p>
                  <p>E-Mail: support@energievergleich.nrw<br />Telefon: +49 (0) 2 01 - 1 03 - 39 39<br />Website: energievergleich.shop</p>
                </div>

                <div className="border-t pt-4">
                  <p className="font-bold mb-2">Datenschutzbeauftragter:</p>
                  <p>Derzeit nicht benannt</p>
                  <p className="text-sm text-gray-500 mt-2">Hinweis: Für Datenschutzfragen kontaktieren Sie bitte direkt die oben genannte Adresse.</p>
                </div>
              </div>
            </div>

            {/* 2. Übersicht der Verarbeitungen */}
            <div>
              <h2 className="font-heading text-3xl font-bold text-primary mb-6 mt-6">2. Übersicht der Datenverarbeitungen</h2>
              
              <p className="font-paragraph text-slate-900 mb-6">
                Wir verarbeiten personenbezogene Daten nur, wenn dies rechtlich zulässig ist. Nachfolgend erhalten Sie einen Überblick über die Verarbeitungen:
              </p>

              {/* 2.1 Hosting & Server-Logs */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4 font-paragraph text-slate-900 mb-6 break-words">
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
                  <p>Server-Logs: in der Regel 7-30 Tage (Musterwert)</p>
                </div>

                <div className="border-t pt-4">
                  <p className="font-bold mb-2">Auftragsverarbeiter:</p>
                  <p>Wix.com Ltd. (Hosting-Provider)<br />Datenschutzerklärung: <a href="https://www.wix.com/de/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline break-all">https://www.wix.com/de/privacy</a></p>
                </div>
              </div>

              {/* 2.2 Kontaktformular */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4 font-paragraph text-slate-900 mb-6 break-words">
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
                  <p>Bis zur vollständigen Bearbeitung der Anfrage, danach 12 Monate (Musterwert für Archivierung)</p>
                </div>

                <div className="border-t pt-4">
                  <p className="font-bold mb-2">Empfänger:</p>
                  <p>Interne Bearbeitung durch ENERGIEVERGLEICH NRW, ggf. Weitergabe an externe Dienstleister</p>
                </div>
              </div>

              {/* 2.3 E-Mail und Telefon */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4 font-paragraph text-slate-900 mb-6 break-words">
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
                  <p>12 Monate nach letztem Kontakt (Musterwert)</p>
                </div>
              </div>

              {/* 2.4 Cookies - Technisch notwendig */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4 font-paragraph text-slate-900 mb-6 break-words">
                <h3 className="font-bold text-lg text-primary">2.4 Cookies (technisch notwendig)</h3>
                
                <div>
                  <p className="font-bold mb-2">Verarbeitete Daten:</p>
                  <p>Cookie-ID, Sitzungsinformationen, Benutzereinstellungen, Consent-Status</p>
                </div>

                <div className="border-t pt-4">
                  <p className="font-bold mb-2">Zweck:</p>
                  <p>Gewährleistung der Funktionalität der Website, Speicherung von Benutzereinstellungen, Verwaltung von Datenschutzeinwilligungen</p>
                </div>

                <div className="border-t pt-4">
                  <p className="font-bold mb-2">Rechtsgrundlage:</p>
                  <p>Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse) für notwendige Cookies; Art. 6 Abs. 1 lit. a DSGVO (Einwilligung) für nicht-notwendige Cookies</p>
                </div>

                <div className="border-t pt-4">
                  <p className="font-bold mb-2">Speicherdauer:</p>
                  <p>Abhängig vom Cookie-Typ, in der Regel bis zum Ende der Browsersitzung oder bis zur Löschung (Musterwert)</p>
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm text-gray-500">
                    Hinweis: Weitere Informationen zu Cookies finden Sie in unserem Cookie-Banner auf der Website. Sie können Ihre Cookie-Einstellungen jederzeit über die Datenschutzeinstellungen ändern.
                  </p>
                </div>
              </div>

              {/* 2.5 Analyse und Tracking - Google Analytics 4 */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4 font-paragraph text-slate-900 mb-6 break-words">
                <h3 className="font-bold text-lg text-primary">2.5 Analyse und Tracking - Google Analytics 4 (GA4)</h3>
                
                <div className="bg-green-50 border border-green-200 rounded p-4 mb-4">
                  <p className="text-sm text-green-800 font-bold">Status: Aktiv (mit Consent-Handling)</p>
                  <p className="text-sm text-green-700 mt-2">Google Analytics 4 wird nur nach ausdrücklicher Einwilligung des Nutzers aktiviert.</p>
                </div>

                <div>
                  <p className="font-bold mb-2">Verarbeitete Daten:</p>
                  <p>IP-Adresse (anonymisiert), Geräte-ID, Browser-Informationen, Betriebssystem, Besuchte Seiten, Verweildauer, Klicks, Scroll-Verhalten, Referrer, Gerätetyp, Spracheinstellungen</p>
                </div>

                <div className="border-t pt-4">
                  <p className="font-bold mb-2">Zweck:</p>
                  <p>Analyse des Nutzerverhaltens, Optimierung der Website-Performance, Erstellung von Statistiken, Verbesserung der Benutzerfreundlichkeit</p>
                </div>

                <div className="border-t pt-4">
                  <p className="font-bold mb-2">Rechtsgrundlage:</p>
                  <p>Art. 6 Abs. 1 lit. a DSGVO (Einwilligung) - GA4 wird AUSSCHLIESSLICH nach Erteilung der Einwilligung durch den Nutzer aktiviert</p>
                </div>

                <div className="border-t pt-4">
                  <p className="font-bold mb-2">Speicherdauer:</p>
                  <p>Standardmäßig 14 Monate (Google Analytics Standard-Aufbewahrungsfrist)</p>
                </div>

                <div className="border-t pt-4">
                  <p className="font-bold mb-2">Auftragsverarbeiter:</p>
                  <p>Google Ireland Limited<br />Gordon House, Barrow Street<br />Dublin 4, Irland<br />Datenschutzerklärung: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline break-all">https://policies.google.com/privacy</a></p>
                </div>

                <div className="border-t pt-4">
                  <p className="font-bold mb-2">Drittlandtransfer:</p>
                  <p>Daten werden in die USA übermittelt. Google hat sich dem EU-US Data Privacy Framework angeschlossen. Weitere Informationen: <a href="https://policies.google.com/privacy/frameworks" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline break-all">https://policies.google.com/privacy/frameworks</a></p>
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm text-gray-500">
                    Hinweis: Sie können Ihre Einwilligung jederzeit über die Datenschutzeinstellungen (Cookie-Banner) widerrufen. GA4 wird dann sofort deaktiviert.
                  </p>
                </div>
              </div>

              {/* 2.6 Externe Dienste */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4 font-paragraph text-slate-900 mb-6 break-words">
                <h3 className="font-bold text-lg text-primary">2.6 Eingebettete externe Inhalte</h3>
                
                <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-4">
                  <p className="text-sm text-blue-800 font-bold">Status: Nicht im Einsatz (Musterangabe)</p>
                  <p className="text-sm text-blue-700 mt-2">Derzeit werden keine externen Dienste eingebettet.</p>
                </div>

                <div>
                  <p className="font-bold mb-2">Falls zukünftig aktiv - Verwendete Dienste:</p>
                  <p>Beispiele: YouTube, Google Maps, Vimeo, etc.</p>
                </div>

                <div className="border-t pt-4">
                  <p className="font-bold mb-2">Falls zukünftig aktiv - Verarbeitete Daten:</p>
                  <p>IP-Adresse, Cookie-Daten, Geräte-Informationen (abhängig vom Dienst)</p>
                </div>

                <div className="border-t pt-4">
                  <p className="font-bold mb-2">Falls zukünftig aktiv - Rechtsgrundlage:</p>
                  <p>Art. 6 Abs. 1 lit. a DSGVO (Einwilligung) oder Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse)</p>
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm text-gray-500">
                    Hinweis: Sollten externe Dienste zukünftig eingesetzt werden, wird diese Datenschutzerklärung entsprechend aktualisiert. Externe Dienste können Daten in Länder außerhalb der EU übermitteln.
                  </p>
                </div>
              </div>
            </div>

            {/* 3. Betroffenenrechte */}
            <div>
              <h2 className="font-heading text-3xl font-bold text-primary mb-6 mt-6">3. Ihre Rechte nach der DSGVO (Art. 15-22 DSGVO)</h2>
              
              <p className="font-paragraph text-slate-900 mb-6">
                Sie haben folgende Rechte bezüglich Ihrer personenbezogenen Daten:
              </p>

              <div className="space-y-4 font-paragraph text-slate-900">
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
              <h2 className="font-heading text-3xl font-bold text-primary mb-6 mt-6">4. Kontakt für Datenschutzfragen</h2>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4 font-paragraph text-slate-900 break-words">
                <p>Wenn Sie Fragen zum Datenschutz haben oder Ihre Rechte ausüben möchten, kontaktieren Sie uns bitte:</p>
                
                <div>
                  <p className="font-bold mb-2">E-Mail:</p>
                  <p>support@energievergleich.nrw</p>
                </div>

                <div className="border-t pt-4">
                  <p className="font-bold mb-2">Postanschrift:</p>
                  <p>ENERGIEVERGLEICH NRW<br />59302 Oelde, NRW</p>
                </div>

                <div className="border-t pt-4">
                  <p className="font-bold mb-2">Telefon:</p>
                  <p>+49 (0) 2 01 - 1 03 - 39 39</p>
                </div>
              </div>
            </div>

            {/* 5. Zuständige Aufsichtsbehörde */}
            <div>
              <h2 className="font-heading text-3xl font-bold text-primary mb-6 mt-6">5. Zuständige Datenschutzbehörde</h2>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 font-paragraph text-slate-900 break-words">
                <p className="mb-4">Die zuständige Datenschutzbehörde ist:</p>
                <p className="font-bold mb-4">Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen (LDI NRW)</p>
                <p className="text-sm text-gray-500">Diese Angabe ist eine Musterangabe für Unternehmen in NRW.</p>
              </div>
            </div>

            {/* 6. Änderungen */}
            <div>
              <h2 className="font-heading text-3xl font-bold text-primary mb-6 mt-6">6. Änderungen dieser Datenschutzerklärung</h2>
              
              <p className="font-paragraph text-slate-900">
                Wir behalten uns das Recht vor, diese Datenschutzerklärung jederzeit zu ändern. Die aktuelle Fassung finden Sie immer auf dieser Seite. Wesentliche Änderungen werden wir Ihnen per E-Mail oder durch einen prominenten Hinweis auf unserer Website mitteilen.
              </p>
            </div>

            {/* Hinweis */}
            <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-6 mt-8">
              <p className="font-paragraph text-sm text-slate-900">
                <strong>Hinweis:</strong> Diese Datenschutzerklärung ist ein Muster und muss an die spezifischen Anforderungen und Praktiken Ihres Unternehmens angepasst werden. Bitte konsultieren Sie einen Rechtsanwalt, um sicherzustellen, dass Ihre Datenschutzerklärung vollständig und konform mit der DSGVO ist.
              </p>
            </div>
          </div>
        </div>
      </section>

      <DeferredFooter />
    </div>
  );
}
