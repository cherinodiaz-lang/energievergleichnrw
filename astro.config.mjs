import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  site: 'https://energievergleich.shop',
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
        'https://energievergleich.shop/',
        'https://energievergleich.shop/stromvergleich-koeln',
        'https://energievergleich.shop/stromvergleich-duesseldorf',
        'https://energievergleich.shop/stromvergleich-dortmund',
        'https://energievergleich.shop/stromvergleich-essen',
        'https://energievergleich.shop/stromvergleich-duisburg',
        'https://energievergleich.shop/stromvergleich-bochum',
        'https://energievergleich.shop/stromvergleich-wuppertal',
        'https://energievergleich.shop/stromvergleich-bielefeld',
        'https://energievergleich.shop/stromvergleich-bonn',
        'https://energievergleich.shop/stromvergleich-muenster'
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
