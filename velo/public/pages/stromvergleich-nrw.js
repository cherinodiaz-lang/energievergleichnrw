/**
 * Wix Velo Frontend: Stromvergleich NRW
 */

import { getPageContent } from 'backend/pages-router';
import { setSEO } from 'backend/seo-manager';

$w.onReady(async () => {
  try {
    await setSEO('stromvergleich-nrw');
    
    const content = await getPageContent('stromvergleich-nrw');
    
    if (!content) {
      $w('#errorMessage').text = 'Content konnte nicht geladen werden';
      return;
    }
    
    // Hero
    $w('#pageTitle').text = content.h1;
    $w('#pageSubline').text = content.subline;
    $w('#primaryCTA').label = content.primaryCta;
    
    // FAQ
    if (content.faq?.items) {
      $w('#faqRepeater').data = content.faq.items;
      $w('#faqRepeater').onItemReady(($item, itemData) => {
        $item('#faqQuestion').text = itemData.q;
        $item('#faqAnswer').text = itemData.a;
      });
    }
    
    console.log('✅ Stromvergleich NRW loaded');
    
  } catch (error) {
    console.error('❌ Page Load Error:', error);
  }
});
