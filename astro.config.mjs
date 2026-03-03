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
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date()
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