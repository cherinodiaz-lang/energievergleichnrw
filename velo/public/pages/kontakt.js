import { getPageContent } from 'backend/pages-router';
import { setSEO } from 'backend/seo-manager';

$w.onReady(async () => {
  try {
    await setSEO('kontakt');
    const content = await getPageContent('kontakt');
    
    if (!content) return;
    
    // Hero
    $w('#pageTitle').text = content.hero.h1;
    $w('#pageSubline').text = content.hero.subline;
    
    // Form Labels
    const form = content.form;
    $w('#topicLabel').text = form.fieldLabels[0];
    $w('#messageLabel').text = form.fieldLabels[1];
    $w('#emailLabel').text = form.fieldLabels[2];
    $w('#phoneLabel').text = form.fieldLabels[3];
    $w('#consentLabel').text = form.fieldLabels[4];
    
    // Submit Button
    $w('#submitButton').label = form.submit;
    
    // Form Submission
    $w('#contactForm').onSubmit(async (event) => {
      try {
        // Add form logic here
        $w('#successMessage').text = form.success;
        $w('#successMessage').show();
      } catch (error) {
        $w('#errorMessage').text = form.error;
        $w('#errorMessage').show();
      }
    });
    
  } catch (error) {
    console.error('Page Error:', error);
  }
});
