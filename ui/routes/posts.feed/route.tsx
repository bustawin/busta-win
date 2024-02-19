import * as commands from '@src/service/commands'
import { feed } from './feed'

export const loader = async () => {
  const posts = await commands.posts()
  const output = feed(posts)
  return new Response(output, {
    headers: {
      'Content-Type': 'application/atom+xml',
    },
  })
}
