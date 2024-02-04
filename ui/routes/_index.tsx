import { Link, useLoaderData } from '@remix-run/react'
import * as commands from '@src/service/commands'

export const loader = async () => {
  const posts = await commands.posts()
  return {
    posts,
  }
}

export default function Index() {
  const { posts } = useLoaderData<typeof loader>()
  return (
    <main>
      <h1>Posts</h1>
      {posts.map((post) => (
        <li key={post.id}>
          <Link to={`posts/${post.id}`} className="text-blue-600 underline">
            {post.title}
          </Link>
        </li>
      ))}
    </main>
  )
}
