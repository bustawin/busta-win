import * as commands from '@src/service/commands'
describe('commands', () => {
  describe('getPosts', () => {
    it('gets all the posts', () => {
      const posts = commands.getPosts()
      expect(posts.length).toEqual(1)
      const post = posts[0]
      expect(post.slug).toEqual('')
    })
  })
})
