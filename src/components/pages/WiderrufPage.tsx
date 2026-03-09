import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import Breadcrumb from '@/components/Breadcrumb';

export default function WiderrufPage() {
  const breadcrumbItems = [
    { label: 'Startseite', path: '/' },
    { label: 'Widerrufsbelehrung', path: '/widerruf' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Widerrufsbelehrung | energievergleich.shop"
        description="Widerrufsbelehrung und Widerrufsformular von energievergleich.shop."
        keywords="Widerrufsbelehrung, Widerrufsrecht, Widerrufsformular"
        robots="index, follow"
      />
      <Header />
      <Breadcrumb items={breadcrumbItems} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-primary mb-8">
          Widerrufsbelehrung
        </h1>
        <div className="prose max-w-none font-paragraph text-gray-700 space-y-6">
          <p className="text-lg">
            Die Widerrufsbelehrung wird derzeit überarbeitet und in Kürze veröffentlicht.
          </p>
          <p>
            Bei Fragen wenden Sie sich bitte an:{' '}
            <a href="mailto:info@energievergleich.nrw" className="text-primary hover:underline">
              info@energievergleich.nrw
            </a>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
