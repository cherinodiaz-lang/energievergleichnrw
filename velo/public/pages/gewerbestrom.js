import { getPageContent } from 'backend/pages-router';
import { setSEO } from 'backend/seo-manager';

$w.onReady(async () => {
  try {
    await setSEO('gewerbestrom');
    const content = await getPageContent('gewerbestrom');

    if (!content) return;

    $w('#pageTitle').text = content.h1;
    $w('#pageSubline').text = content.subline;
    $w('#primaryCTA').label = content.primaryCta;

    if (content.faq?.items) {
      $w('#faqRepeater').data = content.faq.items;
      $w('#faqRepeater').onItemReady(($item, itemData) => {
        $item('#faqQuestion').text = itemData.q;
        $item('#faqAnswer').text = itemData.a;
      });
    }
  } catch (error) {
    console.error('Page Error:', error);
  }
});
