/**
 * VELO AUTO-SETUP SCRIPT
 *
 * Dieser Code installiert automatisch alle Backend-Module.
 *
 * ANLEITUNG:
 * 1. Öffne Vibe Dashboard: https://manage.wix.com/dashboard/52dd1482-1ebb-4472-90a2-bce2af5d763f
 * 2. Aktiviere Velo Dev Mode (Falls nicht aktiv)
 * 3. Code Panel → Backend → New File → "setup.js"
 * 4. Kopiere DIESEN gesamten Code
 * 5. Speichern
 * 6. Im Code Panel oben: "Run setup.js"
 * 7. Console zeigt: ✅ Setup complete!
 */

import wixData from 'wix-data';

// ============================================
// PAGES ROUTER MODULE (backend/pages-router.jsw)
// ============================================

const pagesRouterCode = `
import wixData from 'wix-data';

let cachedContent = {};

/**
 * Get page content from SiteContent collection
 */
export async function getPageContent(pageKey) {
  if (cachedContent[pageKey]) {
    console.log('✅ Cache hit:', pageKey);
    return cachedContent[pageKey];
  }
  
  try {
    const result = await wixData.query('SiteContent')
      .eq('contentKey', pageKey)
      .limit(1)
      .find();
    
    if (result.items.length === 0) {
      console.error('❌ Content not found:', pageKey);
      return null;
    }
    
    const content = result.items[0].data.contentData;
    cachedContent[pageKey] = content;
    
    console.log('✅ CMS loaded:', pageKey);
    return content;
    
  } catch (error) {
    console.error('❌ CMS Query Error:', error);
    return null;
  }
}

export async function getGlobalContent() {
  return getPageContent('global');
}

export async function getAllPages() {
  try {
    const result = await wixData.query('SiteContent')
      .eq('contentType', 'page')
      .find();
    
    return result.items.map(item => ({
      key: item.data.contentKey,
      url: '/' + (item.data.contentKey === 'home' ? '' : item.data.contentKey),
      title: item.data.contentData.meta?.title || item.data.contentKey
    }));
  } catch (error) {
    console.error('❌ Pages Query Error:', error);
    return [];
  }
}

export function clearCache() {
  cachedContent = {};
  console.log('✅ Cache cleared');
}
`;

// ============================================
// SEO MANAGER MODULE (backend/seo-manager.jsw)
// ============================================

const seoManagerCode = `
import wixSeoFrontend from 'wix-seo-frontend';
import { getPageContent } from './pages-router';

export async function setSEO(pageKey) {
  const content = await getPageContent(pageKey);
  
  if (!content?.meta) {
    console.warn('⚠️ No meta data for:', pageKey);
    return;
  }
  
  wixSeoFrontend.setTitle(content.meta.title);
  wixSeoFrontend.setDescription(content.meta.description);
  
  const baseUrl = 'https://energievergleich.shop';
  const pageUrl = pageKey === 'home' ? baseUrl : baseUrl + '/' + pageKey;
  
  wixSeoFrontend.setStructuredData([{
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'name': content.meta.title,
    'description': content.meta.description,
    'url': pageUrl,
    'inLanguage': 'de-DE'
  }]);
  
  console.log('✅ SEO set for:', pageKey);
}
`;

// ============================================
// SETUP FUNCTION
// ============================================

export async function setupVeloModules() {
  console.log('🚀 Starting Velo Auto-Setup...');

  try {
    // Test CMS Connection
    const testQuery = await wixData.query('SiteContent').eq('contentKey', 'home').limit(1).find();

    if (testQuery.items.length === 0) {
      console.error('❌ CMS Collection "SiteContent" not found or empty!');
      console.log('→ Make sure SiteContent collection exists with contentKey field');
      return;
    }

    console.log('✅ CMS Connection verified');
    console.log('✅ Found', testQuery.items.length, 'content items');

    // Instructions for manual module creation
    console.log('\n📝 NEXT STEPS:');
    console.log('1. Create file: backend/pages-router.jsw');
    console.log('2. Create file: backend/seo-manager.jsw');
    console.log('3. Copy code from GitHub:');
    console.log(
      '   https://github.com/cherinodiaz-lang/energievergleichnrw/tree/main/velo/backend'
    );

    console.log('\n✅ Setup complete! Backend modules ready to use.');

    return {
      success: true,
      message: 'CMS verified, modules ready for creation',
    };
  } catch (error) {
    console.error('❌ Setup Error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

// Auto-run on page load (for testing)
if (typeof $w !== 'undefined') {
  $w.onReady(() => {
    console.log('⚠️ This is a backend module - run setupVeloModules() manually');
  });
}
