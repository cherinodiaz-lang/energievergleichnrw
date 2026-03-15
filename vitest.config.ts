import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@/integrations',
        replacement: fileURLToPath(new URL('./integrations', import.meta.url)),
      },
      {
        find: '@wix/codegen-framework-packages',
        replacement: fileURLToPath(new URL('./integrations', import.meta.url)),
      },
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url)),
      },
    ],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
  },
  esbuild: {
    target: 'node20',
  },
})
