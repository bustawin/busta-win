import { describe, it, expect } from 'vitest'
import * as commands from '@src/service/commands'
describe('commands', () => {
  describe('getPosts', () => {
    it('gets all the posts', async () => {
      const posts = await commands.posts()
      expect(posts.length).toEqual(1)

      const post = posts[0]
      expect(post.id).toEqual('building-bustawin')
    })
  })
})
