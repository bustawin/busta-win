import { describe, expect, it } from 'vitest'
import * as commands from '@src/service/commands'

describe('commands', () => {
  describe('getPosts', () => {
    it('gets all the posts', async () => {
      const posts = await commands.posts()
      expect(posts.length).toBeGreaterThan(10)

      const post = posts[posts.length - 1]
      expect(post.id).toEqual('create-a-custom-live-debian-the-pro-way')
    })
  })
})
