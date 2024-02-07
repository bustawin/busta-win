import { unstable_vitePlugin as remix } from '@remix-run/dev'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path'

export default defineConfig({
  plugins: [remix({ appDirectory: 'ui' }), tsconfigPaths()],
  server: {
    fs: {
      // Allow serving from jutils
      allow: ['../jutils', '.'],
    },
  },
  resolve: {
    alias: {
      // even if we have tsconfigPaths we require this one here due to sass
      '@jutils': path.resolve(__dirname, '..', 'jutils', 'src'),
    },
  },
})
