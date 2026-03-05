import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  site: 'https://energievergleichnrw.de',
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false
    }),
    sitemap({
      filter: (page) => !page.includes('/admin/') && !page.includes('/api/'),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date()
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
    resolve: {
      alias: {
        '@content': path.resolve(__dirname, './src/content')
      }
    },
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'ui-vendor': [
              '@radix-ui/react-accordion',
              '@radix-ui/react-dialog',
              '@radix-ui/react-dropdown-menu',
              '@radix-ui/react-select'
            ],
            'form-vendor': ['react-hook-form', '@hookform/resolvers'],
            'utils': ['clsx', 'tailwind-merge', 'class-variance-authority']
          }
        }
      }
    },
    ssr: {
      noExternal: ['@radix-ui/*', '@wix/*']
    },
    optimizeDeps: {
      include: ['react', 'react-dom', '@radix-ui/*'],
      exclude: []
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
  }
});
