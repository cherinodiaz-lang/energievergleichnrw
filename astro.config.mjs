import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  site: 'https://energievergleich-nrw.de',
  output: 'server',
  adapter: vercel({
    imageService: true,
    webAnalytics: { enabled: true },
    speedInsights: { enabled: true }
  }),
  
  integrations: [
    tailwind(),
    react(),
    sitemap({
      filter: (page) => {
        // Exclude admin/internal pages from sitemap
        return !page.includes('/admin') && !page.includes('/api/');
      },
      customPages: [
        'https://energievergleich-nrw.de/',
        'https://energievergleich-nrw.de/stromvergleich-koeln',
        'https://energievergleich-nrw.de/stromvergleich-duesseldorf',
        'https://energievergleich-nrw.de/stromvergleich-dortmund',
        'https://energievergleich-nrw.de/stromvergleich-essen',
        'https://energievergleich-nrw.de/stromvergleich-duisburg',
        'https://energievergleich-nrw.de/stromvergleich-bochum',
        'https://energievergleich-nrw.de/stromvergleich-wuppertal',
        'https://energievergleich-nrw.de/stromvergleich-bielefeld',
        'https://energievergleich-nrw.de/stromvergleich-bonn',
        'https://energievergleich-nrw.de/stromvergleich-muenster'
      ],
      serialize: (item) => {
        // High priority for city pages
        if (item.url.includes('/stromvergleich-')) {
          item.priority = 0.9;
          item.changefreq = 'daily';
        }
        // Medium priority for main pages
        else if (item.url.endsWith('/') || item.url.includes('/gasvergleich') || item.url.includes('/photovoltaik')) {
          item.priority = 0.8;
          item.changefreq = 'weekly';
        }
        // Lower priority for info pages
        else {
          item.priority = 0.6;
          item.changefreq = 'monthly';
        }
        
        item.lastmod = new Date();
        return item;
      }
    })
  ],
  
  // PERFORMANCE OPTIMIZATIONS
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'form-components': ['react-hook-form', '@hookform/resolvers', 'zod'],
            'ui-components': ['@radix-ui/react-accordion', '@radix-ui/react-select'],
            'icons': ['lucide-react']
          }
        }
      },
      chunkSizeWarningLimit: 500
    },
    ssr: {
      noExternal: ['@radix-ui/*']
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'clsx', 'tailwind-merge']
    }
  },
  
  image: {
    domains: ['images.unsplash.com', 'cdn.energievergleich-nrw.de'],
    remotePatterns: [{ protocol: 'https' }],
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: false
      }
    }
  },
  
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport'
  },
  
  compressHTML: true,
  
  build: {
    inlineStylesheets: 'auto',
    assets: '_assets'
  }
});