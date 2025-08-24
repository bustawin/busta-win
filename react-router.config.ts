import type { Config } from '@react-router/dev/config'

export default {
  appDirectory: 'ui',
  ssr: true,
  async prerender() {
    return ['/', '/about']
  },
} satisfies Config
