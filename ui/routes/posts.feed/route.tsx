import * as commands from '@src/service/commands'
import { feed } from './feed'
import { documentCache } from '@ui/utils/cache'

export const loader = async () => {
  const posts = await commands.posts()
  const output = feed(posts)
  return new Response(output, {
    headers: {
      'Content-Type': 'application/atom+xml',
      ...documentCache,
    },
  })
}
