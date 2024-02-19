import { Post } from '@src/domain/post'
import { Feed, Item } from 'feed'
import favicon from '@src/../public/favicon.png'
import it from 'iterated'

// From https://camchenry.com/blog/how-to-add-a-rss-feed-to-a-remix-app

const bustawinUrl = 'http://busta.win'
const postsUrl = `${bustawinUrl}/posts`
const feedUrl = `${postsUrl}/feed`
const author = {
  name: 'Xavier Bustamante Talavera',
  email: 'hello@bustawin.com',
}
const copyright = 'CC-BY-4.0'

export function feed(posts: Post[]): string {
  const feed = new Feed({
    title: "bustawin's posts",
    description: 'The collection of posts from busta.win',
    id: bustawinUrl,
    link: bustawinUrl,
    image: favicon,
    favicon,
    copyright,
    updated: posts[0].created,
    feedLinks: {
      atom: feedUrl,
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
