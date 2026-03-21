import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';

export default function NotFoundPage() {
  return (
    <>
      <SEOHead
        title="Seite nicht gefunden | energievergleich.shop"
        description="Die angeforderte Seite wurde nicht gefunden."
        noindex={true}
        canonical="/404"
      />
      <Header />
      <main className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <p className="font-heading text-sm uppercase tracking-[0.2em] text-primary mb-4">404</p>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Diese Seite existiert nicht.
          </h1>
          <p className="font-paragraph text-lg text-foreground/70 mb-10">
            Der angeforderte Pfad ist nicht verfuegbar oder wurde verschoben.
          </p>
          <div className="flex justify-center">
            <Button asChild className="rounded-lg">
              <Link to="/">Zur Startseite</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
