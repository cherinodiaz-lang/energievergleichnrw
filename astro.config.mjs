import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://energievergleichnrw.de',
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false
    })
  ],
  
  // Output configuration
  output: 'static',
  
  // Build configuration
  build: {
    inlineStylesheets: 'auto',
    assets: '_assets'
  },
  
  // Vite configuration
  vite: {
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'ui-vendor': ['@radix-ui/react-accordion', '@radix-ui/react-dialog']
          }
        }
      }
    },
    ssr: {
      noExternal: ['@radix-ui/*']
    }
  },
  
  // Markdown configuration
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    }
  },
  
  // Image optimization
  image: {
    domains: ['energievergleichnrw.de'],
    remotePatterns: [{ protocol: 'https' }]
  },
  
  // Compression
  compressHTML: true,
  
  // Prefetch
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport'
  },
  
  // Experimental features
  experimental: {
    optimizeHoistedScript: true,
    contentCollectionCache: true
  }
});
