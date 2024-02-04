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
      <p>
        Hello, I'm bustawin (aka Xavier Bustamante).
        <br />
        I'm a geeky software engineer focused on product development, with a
        spice of academic research and python.
      </p>
      <p>In here, I talk about things I do—publications, notes, and tricks.</p>
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
