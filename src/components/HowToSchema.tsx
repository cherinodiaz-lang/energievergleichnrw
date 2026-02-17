import { useEffect } from 'react';

export default function HowToSchema() {
  useEffect(() => {
    const howToSchema = {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'Wie wechseln Sie Ihren Energieanbieter in NRW',
      description: 'Ein einfacher 3-Schritte-Prozess zum Wechsel Ihres Strom- oder Gasanbieters in Nordrhein-Westfalen',
      image: 'https://static.wixstatic.com/media/32e7c0_8cede5e338be484bb8dcaad81c053c82~mv2.png',
      step: [
        {
          '@type': 'HowToStep',
          position: '1',
          name: 'Daten eingeben',
          text: 'Geben Sie Ihre Postleitzahl und Ihren Verbrauch in unseren Vergleichsrechner ein. Dies dauert nur wenige Sekunden.',
          image: 'https://static.wixstatic.com/media/32e7c0_5f85b8d9458c4ccbafdde2a4f3bc3cce~mv2.png',
          duration: 'PT2M',
        },
        {
          '@type': 'HowToStep',
          position: '2',
          name: 'Angebote vergleichen',
          text: 'Sehen Sie alle verfügbaren Tarife mit Preisen, Vertragsbedingungen und Kundenbewertungen. Filtern Sie nach Ihren Kriterien.',
          image: 'https://static.wixstatic.com/media/32e7c0_5f85b8d9458c4ccbafdde2a4f3bc3cce~mv2.png',
          duration: 'PT3M',
        },
        {
          '@type': 'HowToStep',
          position: '3',
          name: 'Online wechseln',
          text: 'Wählen Sie Ihren bevorzugten Tarif und schließen Sie den Wechsel online ab. Wir kümmern uns um die Kündigung bei Ihrem alten Anbieter.',
          image: 'https://static.wixstatic.com/media/32e7c0_5f85b8d9458c4ccbafdde2a4f3bc3cce~mv2.png',
          duration: 'PT5M',
        },
      ],
      totalTime: 'PT10M',
    };

    let script = document.getElementById('howto-schema');
    if (!script) {
      script = document.createElement('script');
      script.id = 'howto-schema';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(howToSchema);
      document.head.appendChild(script);
    } else {
      script.textContent = JSON.stringify(howToSchema);
    }
  }, []);

  return null;
}
