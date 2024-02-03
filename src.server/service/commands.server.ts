import { json } from '@remix-run/node'

export function getPosts() {
  return json({
    posts: [
      {
        slug: 'my-first-post',
        title: 'My First Post',
      },
      {
        slug: '90s-mixtape',
        title: 'A Mixtape I Made Just For You',
      },
    ],
  })
}
