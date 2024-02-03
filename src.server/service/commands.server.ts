import { json } from '@remix-run/node'

function getPosts() {
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

export const commands = {
  getPosts,
}
