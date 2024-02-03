import './styles.sass'
import { Link, useLoaderData } from '@remix-run/react'
import { LoaderArgs } from '@remix-run/node'

export const loader = async ({ context: { commands } }: LoaderArgs) => {
  return commands.getPosts()
}

export default function Posts() {
  console.log('hi')
  const { posts } = useLoaderData<typeof loader>()
  return (
    <main>
      <h1>Posts</h1>
      {posts.map((post) => (
        <li key={post.slug}>
          <Link to={post.slug} className="text-blue-600 underline">
            {post.title}
          </Link>
        </li>
      ))}
    </main>
  )
}
