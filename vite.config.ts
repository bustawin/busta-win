import { unstable_vitePlugin as remix } from '@remix-run/dev'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [remix({ appDirectory: 'ui' }), tsconfigPaths()],
  optimizeDeps: {
    include: ['iterated'],
  },
  build: {
    commonjsOptions: {
      include: ['iterated'],
    },
  },
})
