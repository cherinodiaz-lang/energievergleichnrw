import Header from '@/components/Header';
import DeferredFooter from '@/components/DeferredFooter';
import SEOHead from '@/components/SEOHead';
import Breadcrumb from '@/components/Breadcrumb';

export default function AgbPage() {
  const breadcrumbItems = [
    { label: 'Startseite', path: '/' },
    { label: 'AGB', path: '/agb' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="AGB | energievergleich.shop Allgemeine Geschäftsbedingungen"
        description="Allgemeine Geschäftsbedingungen von energievergleich.shop. Lesen Sie unsere Nutzungsbedingungen."
        keywords="AGB, Allgemeine Geschäftsbedingungen, Nutzungsbedingungen"
        robots="index, follow"
      />
      <Header />
      <Breadcrumb items={breadcrumbItems} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-primary mb-8">
          Allgemeine Geschäftsbedingungen (AGB)
        </h1>
        <div className="prose max-w-none font-paragraph text-gray-700 space-y-6">
          <p className="text-lg">
            Die Allgemeinen Geschäftsbedingungen werden derzeit überarbeitet und in Kürze veröffentlicht.
          </p>
          <p>
            Bei Fragen wenden Sie sich bitte an:{' '}
            <a href="mailto:support@energievergleich.nrw" className="text-primary hover:underline">
              support@energievergleich.nrw
            </a>
          </p>
        </div>
      </main>

      <DeferredFooter />
    </div>
  );
}
