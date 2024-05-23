import { Post } from '@src/domain/post'
import { Feed, Item } from 'feed'
import favicon from '@src/../public/favicon.png'
import it from 'iterated'

// From https://camchenry.com/blog/how-to-add-a-rss-feed-to-a-remix-app

const bustawinUrl = 'http://busta.win'
const postsUrl = `${bustawinUrl}/posts`
export const url = `${postsUrl}/feed`
const author = {
  name: 'Xavier Bustamante Talavera',
  email: 'hello@bustawin.com',
}
const copyright = 'CC-BY-4.0'
export const title = "bustawin's posts"

export function feed(posts: Post[]): string {
  const feed = new Feed({
    title,
    description: 'The collection of posts from busta.win',
    id: bustawinUrl,
    link: bustawinUrl,
    image: favicon,
    favicon,
    copyright,
    updated: posts[0].created,
    feedLinks: {
      atom: url,
    },
    author,
  })
  for (const post of posts) {
    feed.addItem(postToFeed(post))
  }
  return feed.atom1()
}

function postToFeed(post: Post): Item {
  return {
    title: post.title,
    id: post.id,
    link: `${postsUrl}/${post.id}`,
    description: post.summary,
    content: '',
    author: [author],
    date: post.created,
    image: '',
    category: it.array(
      it.map(post.categories, (category) => ({ name: category }))
    ),
    copyright,
  }
}
