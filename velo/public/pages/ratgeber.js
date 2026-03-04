import { getPageContent } from 'backend/pages-router';
import { setSEO } from 'backend/seo-manager';

$w.onReady(async () => {
  try {
    await setSEO('ratgeber');
    const content = await getPageContent('ratgeber');
    
    if (!content) return;
    
    // Hero
    $w('#pageTitle').text = content.hero.h1;
    $w('#pageSubline').text = content.hero.subline;
    
    // Category Cards (5 cards)
    const cards = [
      {title: content.cards.card1Title, text: content.cards.card1Text, href: content.cards.card1Href},
      {title: content.cards.card2Title, text: content.cards.card2Text, href: content.cards.card2Href},
      {title: content.cards.card3Title, text: content.cards.card3Text, href: content.cards.card3Href},
      {title: content.cards.card4Title, text: content.cards.card4Text, href: content.cards.card4Href},
      {title: content.cards.card5Title, text: content.cards.card5Text, href: content.cards.card5Href}
    ];
    
    // Option 1: Repeater
    if ($w('#categoryRepeater')) {
      $w('#categoryRepeater').data = cards;
      $w('#categoryRepeater').onItemReady(($item, itemData) => {
        $item('#cardTitle').text = itemData.title;
        $item('#cardText').text = itemData.text;
        $item('#cardLink').link = itemData.href;
      });
    }
    
    // Option 2: Static elements
    cards.forEach((card, i) => {
      const index = i + 1;
      if ($w(`#card${index}Title`)) {
        $w(`#card${index}Title`).text = card.title;
        $w(`#card${index}Text`).text = card.text;
        $w(`#card${index}Link`).link = card.href;
      }
    });
    
    // CTA Section
    if (content.cta) {
      $w('#ctaTitle').text = content.cta.title;
      $w('#ctaText').text = content.cta.text;
      $w('#ctaButton').label = content.cta.button;
      $w('#ctaButton').link = content.cta.href;
    }
    
  } catch (error) {
    console.error('Page Error:', error);
  }
});
