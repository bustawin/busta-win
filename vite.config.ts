import { vitePlugin as remix } from '@remix-run/dev'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path'

export default defineConfig({
  plugins: [remix({ appDirectory: 'ui' }), tsconfigPaths()],
  resolve: {
    alias: {
      // even if we have tsconfigPaths we require this one here due to sass
      '@jutils': path.resolve(__dirname, 'jutils', 'src'),
      '@bootstrap': path.resolve(__dirname, 'node_modules/bootstrap/scss'),
      '@style': path.resolve(__dirname, 'ui/styles/style.sass'),
    },
  },
})
