import { reactRouter } from '@react-router/dev/vite'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path'

export default defineConfig({
  plugins: [reactRouter(), tsconfigPaths()],
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
