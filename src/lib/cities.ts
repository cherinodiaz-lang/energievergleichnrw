export type CityData = {
  slug: string;
  name: string;
  postalCodeHint: string;
  stromGrundversorger: string;
  gasGrundversorger: string;
  localIntro: string;
  localHighlights: string[];
  stromGrundversorgungCt: number;
  stromVergleichCt: number;
  gasGrundversorgungCt: number;
  gasVergleichCt: number;
  stromSampleConsumptionKwh: number;
  gasSampleConsumptionKwh: number;
};

export type CityFaqItem = {
  question: string;
  answer: string;
};

export const CITIES: CityData[] = [
  {
    slug: 'koeln',
    name: 'Köln',
    postalCodeHint: '50xxx',
    stromGrundversorger: 'RheinEnergie',
    gasGrundversorger: 'RheinEnergie',
    localIntro: 'In Köln lohnt sich ein Tarifvergleich besonders in dicht besiedelten Stadtteilen und bei häufig wechselnden Sonderaktionen der großen Regionalanbieter.',
    localHighlights: [
      'Hohe Tarifdynamik im Großraum Köln mit vielen überregionalen Alternativen.',
      'Für valide Ergebnisse reichen meist Postleitzahl und Jahresverbrauch.',
      'Den konkreten Grundversorger prüfen Sie zusätzlich über Ihre letzte Rechnung oder den zuständigen Netzbetreiber.',
    ],
    stromGrundversorgungCt: 39.8,
    stromVergleichCt: 31.1,
    gasGrundversorgungCt: 12.4,
    gasVergleichCt: 9.7,
    stromSampleConsumptionKwh: 3500,
    gasSampleConsumptionKwh: 20000,
  },
  {
    slug: 'duesseldorf',
    name: 'Düsseldorf',
    postalCodeHint: '40xxx',
    stromGrundversorger: 'Stadtwerke Düsseldorf',
    gasGrundversorger: 'Stadtwerke Düsseldorf',
    localIntro: 'In Düsseldorf ist der Tarifabstand zwischen Grundversorgung und wechselbereiten Angeboten oft deutlich sichtbar, vor allem bei Haushalten mit mittlerem Verbrauch.',
    localHighlights: [
      'Die PLZ entscheidet über den Netzbereich und damit über die konkret angezeigten Tarife.',
      'Preisgarantie und Vertragslaufzeit unterscheiden sich je nach Anbieter stark.',
      'Ein sauberer Vergleich ist in Düsseldorf oft schneller als eine Einzelrecherche über mehrere Anbieterwebsites.',
    ],
    stromGrundversorgungCt: 38.7,
    stromVergleichCt: 30.8,
    gasGrundversorgungCt: 11.9,
    gasVergleichCt: 9.3,
    stromSampleConsumptionKwh: 3500,
    gasSampleConsumptionKwh: 20000,
  },
  {
    slug: 'dortmund',
    name: 'Dortmund',
    postalCodeHint: '44xxx',
    stromGrundversorger: 'DEW21',
    gasGrundversorger: 'DEW21',
    localIntro: 'Für Dortmund sind die Unterschiede zwischen Standardtarifen und regional passenden Angeboten vor allem bei Familienhaushalten relevant.',
    localHighlights: [
      'Gerade in größeren Haushalten fallen kleine Preisunterschiede im Arbeitspreis stark ins Gewicht.',
      'Lokale Tarifbedingungen sollten immer zusammen mit Bonus, Laufzeit und Preisgarantie bewertet werden.',
      'Der Vergleich bleibt unverbindlich und dient zuerst der belastbaren Orientierung.',
    ],
    stromGrundversorgungCt: 37.9,
    stromVergleichCt: 30.4,
    gasGrundversorgungCt: 11.6,
    gasVergleichCt: 9.1,
    stromSampleConsumptionKwh: 3800,
    gasSampleConsumptionKwh: 21000,
  },
  {
    slug: 'essen',
    name: 'Essen',
    postalCodeHint: '45xxx',
    stromGrundversorger: 'Stadtwerke Essen',
    gasGrundversorger: 'Stadtwerke Essen',
    localIntro: 'In Essen sind Tarifwechsel oft dann interessant, wenn laufende Verträge auslaufen oder Preisgarantien enden.',
    localHighlights: [
      'Ein Tarifvergleich zeigt schneller, ob sich ein Wechsel gegenüber der Grundversorgung lohnt.',
      'Für Essen sind sowohl städtische als auch überregionale Anbieter im Vergleich relevant.',
      'Achten Sie besonders auf Kündigungsfristen und die Dauer der Preisgarantie.',
    ],
    stromGrundversorgungCt: 38.4,
    stromVergleichCt: 30.9,
    gasGrundversorgungCt: 12.0,
    gasVergleichCt: 9.5,
    stromSampleConsumptionKwh: 3500,
    gasSampleConsumptionKwh: 20000,
  },
  {
    slug: 'duisburg',
    name: 'Duisburg',
    postalCodeHint: '47xxx',
    stromGrundversorger: 'Stadtwerke Duisburg',
    gasGrundversorger: 'Stadtwerke Duisburg',
    localIntro: 'In Duisburg hilft ein sauberer Tarifvergleich vor allem dabei, Grundversorgung, Laufzeiten und Boni transparent nebeneinander zu sehen.',
    localHighlights: [
      'Unterschiede bei Grundpreis und Arbeitspreis wirken sich je nach Verbrauch unterschiedlich aus.',
      'Auch innerhalb derselben Stadt bleibt die Postleitzahl für den Tarifabgleich relevant.',
      'Ein neutraler Live-Rechner ist oft der schnellste Weg zu belastbaren Tarifdetails.',
    ],
    stromGrundversorgungCt: 38.1,
    stromVergleichCt: 30.7,
    gasGrundversorgungCt: 11.8,
    gasVergleichCt: 9.4,
    stromSampleConsumptionKwh: 3500,
    gasSampleConsumptionKwh: 20000,
  },
  {
    slug: 'bochum',
    name: 'Bochum',
    postalCodeHint: '44xxx',
    stromGrundversorger: 'Stadtwerke Bochum',
    gasGrundversorger: 'Stadtwerke Bochum',
    localIntro: 'Bochum ist für Vergleichsseiten interessant, weil Haushalte mit durchschnittlichem Verbrauch bereits bei kleinen Preisunterschieden spürbar sparen können.',
    localHighlights: [
      'Tarifkosten sollten immer als Gesamtbild und nicht nur über Boni beurteilt werden.',
      'Bochumer Haushalte profitieren häufig von klaren Preisgarantien statt von komplexen Aktionsmodellen.',
      'Die belastbarsten Ergebnisse entstehen mit echter PLZ und realistischem Verbrauch.',
    ],
    stromGrundversorgungCt: 37.6,
    stromVergleichCt: 30.2,
    gasGrundversorgungCt: 11.5,
    gasVergleichCt: 9.0,
    stromSampleConsumptionKwh: 3300,
    gasSampleConsumptionKwh: 19000,
  },
  {
    slug: 'bonn',
    name: 'Bonn',
    postalCodeHint: '53xxx',
    stromGrundversorger: 'Stadtwerke Bonn',
    gasGrundversorger: 'Stadtwerke Bonn',
    localIntro: 'In Bonn sind Preisstabilität und transparente Vertragslaufzeiten oft wichtiger als kurzfristige Bonusversprechen.',
    localHighlights: [
      'Ein Vergleich hilft, lokale Anbieter und bundesweite Tarife sachlich gegenüberzustellen.',
      'Gerade bei Umzug oder Vertragsende lohnt sich ein frischer Tarifcheck.',
      'Die Bonner PLZ steuert, welche Tarife im Live-Rechner überhaupt verfügbar sind.',
    ],
    stromGrundversorgungCt: 38.8,
    stromVergleichCt: 30.6,
    gasGrundversorgungCt: 12.1,
    gasVergleichCt: 9.5,
    stromSampleConsumptionKwh: 3400,
    gasSampleConsumptionKwh: 19500,
  },
  {
    slug: 'muenster',
    name: 'Münster',
    postalCodeHint: '48xxx',
    stromGrundversorger: 'Stadtwerke Münster',
    gasGrundversorger: 'Stadtwerke Münster',
    localIntro: 'Für Münster ist ein Vergleich besonders hilfreich, wenn nachhaltige Tarife, Preisgarantie und planbare Monatskosten zusammen betrachtet werden sollen.',
    localHighlights: [
      'Ökostrom- und Standardtarife lassen sich im Live-Rechner schneller vergleichen als in Einzelportalen.',
      'In Münster lohnt sich der Blick auf Laufzeit und Kündigungsfrist besonders.',
      'Die konkreten Ergebnisse hängen von PLZ, Verbrauch und Tarifmerkmalen ab.',
    ],
    stromGrundversorgungCt: 37.8,
    stromVergleichCt: 30.1,
    gasGrundversorgungCt: 11.7,
    gasVergleichCt: 9.2,
    stromSampleConsumptionKwh: 3200,
    gasSampleConsumptionKwh: 18500,
  },
  {
    slug: 'aachen',
    name: 'Aachen',
    postalCodeHint: '52xxx',
    stromGrundversorger: 'STAWAG',
    gasGrundversorger: 'STAWAG',
    localIntro: 'Aachen eignet sich gut für lokale Vergleichsseiten, weil der Tarifmarkt zwischen regionaler Prägung und überregionalen Alternativen steht.',
    localHighlights: [
      'Ein Vergleich schafft Transparenz zwischen Grundversorgung, Bonusmodell und Preisgarantie.',
      'Auch in Aachen bleibt der Netzbereich ein wichtiger Faktor für die konkreten Tarife.',
      'Die beste Entscheidung ergibt sich meist aus Gesamtpreis, Laufzeit und Wechselprozess zusammen.',
    ],
    stromGrundversorgungCt: 38.2,
    stromVergleichCt: 30.5,
    gasGrundversorgungCt: 11.9,
    gasVergleichCt: 9.3,
    stromSampleConsumptionKwh: 3300,
    gasSampleConsumptionKwh: 19000,
  },
  {
    slug: 'bielefeld',
    name: 'Bielefeld',
    postalCodeHint: '33xxx',
    stromGrundversorger: 'Stadtwerke Bielefeld',
    gasGrundversorger: 'Stadtwerke Bielefeld',
    localIntro: 'In Bielefeld lohnt ein Vergleich vor allem bei auslaufenden Verträgen und dann, wenn Transparenz über Gesamtkosten statt nur über Einzelpreise gebraucht wird.',
    localHighlights: [
      'Die Kombination aus Grundpreis, Arbeitspreis und Laufzeit entscheidet über die echte Tarifqualität.',
      'Bielefelder Haushalte profitieren oft von einer nüchternen Gesamtsicht auf den Wechsel.',
      'Mit PLZ und Verbrauch erhalten Sie im Live-Rechner die belastbarsten Ergebnisse.',
    ],
    stromGrundversorgungCt: 37.5,
    stromVergleichCt: 29.9,
    gasGrundversorgungCt: 11.4,
    gasVergleichCt: 8.9,
    stromSampleConsumptionKwh: 3300,
    gasSampleConsumptionKwh: 19000,
  },
];

export function getCityBySlug(slug: string) {
  return CITIES.find((city) => city.slug === slug);
}

export function getStromCityPath(slug: string) {
  return `/stromvergleich/${slug}`;
}

export function getGasCityPath(slug: string) {
  return `/gasvergleich/${slug}`;
}

export function calcJahresersparnis(
  grundversorgungCtKwh: number,
  vergleichCtKwh: number,
  verbrauchKwh: number,
  grundpreisDifferenzEuro = 0,
) {
  const ctDelta = Math.max(0, grundversorgungCtKwh - vergleichCtKwh);
  return Math.round((ctDelta / 100) * verbrauchKwh + grundpreisDifferenzEuro);
}

export function getStromCityFaqs(city: CityData): CityFaqItem[] {
  const savings = calcJahresersparnis(
    city.stromGrundversorgungCt,
    city.stromVergleichCt,
    city.stromSampleConsumptionKwh,
  );

  return [
    {
      question: `Wie funktioniert der Stromvergleich in ${city.name}?`,
      answer: `Geben Sie im Live-Rechner Ihre Postleitzahl aus ${city.postalCodeHint} und Ihren Jahresverbrauch ein. Danach sehen Sie aktuelle Tarife, Preisgarantien, Laufzeiten und weitere Tarifmerkmale für ${city.name}.`,
    },
    {
      question: `Wie viel kann ich beim Stromvergleich in ${city.name} sparen?`,
      answer: `Für einen Beispielhaushalt mit ${city.stromSampleConsumptionKwh.toLocaleString('de-DE')} kWh liegt die rechnerische Differenz zwischen Grundversorgung und günstigeren Vergleichstarifen in ${city.name} bei rund ${savings.toLocaleString('de-DE')} Euro pro Jahr. Die tatsächliche Ersparnis hängt von PLZ, Verbrauch und Tarifdetails ab.`,
    },
    {
      question: `Welcher Grundversorger ist in ${city.name} relevant?`,
      answer: `Im Marktumfeld von ${city.name} ist ${city.stromGrundversorger} häufig ein prägender lokaler Anbieter. Ihren konkreten Grundversorger prüfen Sie sicherheitshalber zusätzlich über Vertragsunterlagen, Rechnung oder Netzbetreiber.`,
    },
    {
      question: `Brauche ich für ${city.name} zwingend meine letzte Stromrechnung?`,
      answer: `Nein. Für die Erstorientierung reichen Postleitzahl und ein realistischer Jahresverbrauch. Mit Ihrer letzten Rechnung werden die Ergebnisse für ${city.name} allerdings genauer, weil Sie damit Verbrauch und Tarifdaten leichter abgleichen können.`,
    },
  ];
}

export function getGasCityFaqs(city: CityData): CityFaqItem[] {
  const savings = calcJahresersparnis(
    city.gasGrundversorgungCt,
    city.gasVergleichCt,
    city.gasSampleConsumptionKwh,
  );

  return [
    {
      question: `Wie funktioniert der Gasvergleich in ${city.name}?`,
      answer: `Tragen Sie Ihre Postleitzahl aus ${city.postalCodeHint} und Ihren Jahresverbrauch in den Live-Rechner ein. Anschließend sehen Sie aktuelle Gastarife für ${city.name} mit Preisgarantie, Vertragslaufzeit und weiteren Tarifdetails.`,
    },
    {
      question: `Wie viel kann ich beim Gasvergleich in ${city.name} sparen?`,
      answer: `Bei einem Beispielverbrauch von ${city.gasSampleConsumptionKwh.toLocaleString('de-DE')} kWh liegt die rechnerische Differenz zwischen Grundversorgung und günstigeren Vergleichstarifen in ${city.name} bei etwa ${savings.toLocaleString('de-DE')} Euro pro Jahr. Die tatsächliche Ersparnis hängt von Ihrem Haushalt und dem verfügbaren Tarif ab.`,
    },
    {
      question: `Welcher lokale Gasanbieter spielt in ${city.name} eine Rolle?`,
      answer: `Im lokalen Markt rund um ${city.name} ist ${city.gasGrundversorger} häufig ein relevanter Referenzanbieter. Ob das in Ihrer konkreten Adresse der Grundversorger ist, prüfen Sie bitte zusätzlich über Rechnung, Netzbetreiber oder Vertragsunterlagen.`,
    },
    {
      question: `Welche Angaben verbessern den Gasvergleich für ${city.name}?`,
      answer: `Die stärksten Ergebnisse erhalten Sie mit echter Postleitzahl, Ihrem Jahresverbrauch und einer groben Einschätzung zur Wohnfläche oder Heizsituation. Damit wird der Vergleich für ${city.name} belastbarer als mit pauschalen Standardwerten.`,
    },
  ];
}
