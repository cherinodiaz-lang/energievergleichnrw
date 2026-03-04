/**
 * Wix Velo Frontend: Homepage
 * Loads content from SiteContent CMS collection
 */

import { getPageContent, getGlobalContent } from 'backend/pages-router';
import { setSEO } from 'backend/seo-manager';

$w.onReady(async () => {
  try {
    // Set SEO
    await setSEO('home');
    
    // Load content
    const [pageContent, globalContent] = await Promise.all([
      getPageContent('home'),
      getGlobalContent()
    ]);
    
    if (!pageContent) {
      $w('#errorMessage').text = 'Content konnte nicht geladen werden';
      $w('#errorMessage').show();
      return;
    }
    
    // Render Hero
    renderHero(pageContent.hero);
    
    // Render Benefits
    if (pageContent.sections?.benefits) {
      renderBenefits(pageContent.sections.benefits);
    }
    
    // Render FAQ
    if (pageContent.sections?.faq) {
      renderFAQ(pageContent.sections.faq);
    }
    
    // Render Global Navigation
    if (globalContent?.nav) {
      renderNavigation(globalContent.nav);
    }
    
    console.log('✅ Homepage loaded');
    
  } catch (error) {
    console.error('❌ Homepage Load Error:', error);
    $w('#errorMessage').text = 'Fehler beim Laden der Seite';
    $w('#errorMessage').show();
  }
});

function renderHero(hero) {
  if (!hero) return;
  
  $w('#heroTitle').text = hero.h1;
  $w('#heroSubline').text = hero.subline;
  $w('#heroCTA').label = hero.primaryCta;
  $w('#heroCTA').link = hero.primaryCtaHref;
}

function renderBenefits(benefits) {
  if (!benefits.cards) return;
  
  benefits.cards.forEach((card, i) => {
    const index = i + 1;
    $w(`#benefit${index}Title`).text = card.title;
    $w(`#benefit${index}Text`).text = card.text;
  });
}

function renderFAQ(faq) {
  if (!faq.items) return;
  
  // Option 1: Repeater
  if ($w('#faqRepeater')) {
    $w('#faqRepeater').data = faq.items;
    $w('#faqRepeater').onItemReady(($item, itemData) => {
      $item('#faqQuestion').text = itemData.q;
      $item('#faqAnswer').text = itemData.a;
    });
  }
  
  // Option 2: Static elements
  faq.items.forEach((item, i) => {
    const index = i + 1;
    if ($w(`#faq${index}Question`)) {
      $w(`#faq${index}Question`).text = item.q;
      $w(`#faq${index}Answer`).text = item.a;
    }
  });
}

function renderNavigation(nav) {
  // Implement navigation menu rendering
  console.log('Navigation items:', nav);
}
