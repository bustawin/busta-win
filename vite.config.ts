import { vitePlugin as remix } from '@remix-run/dev'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path'

export default defineConfig({
  plugins: [
    remix({
      appDirectory: 'ui',
      future: {
        // from https://remix.run/docs/en/main/guides/dependency-optimization
        unstable_optimizeDeps: true,
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_lazyRouteDiscovery: true,
        v3_singleFetch: true,
      },
    }),
    tsconfigPaths(),
  ],
  resolve: {
    alias: {
      // even if we have tsconfigPaths we require this one here due to sass
      '@jutils': path.resolve(__dirname, 'jutils', 'src'),
      '@bootstrap': path.resolve(__dirname, 'node_modules/bootstrap/scss'),
      '@highlight': path.resolve(__dirname, 'node_modules/highlight.js/scss'),
      '@style': path.resolve(__dirname, 'ui/styles/style.sass'),
    },
  },
  server: {
    allowedHosts: ['bustabook.local'],
  },
})
