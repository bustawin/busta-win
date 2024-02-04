import { Link, useLoaderData } from '@remix-run/react'
import * as commands from '@src/service/commands'
import { LoaderFunctionArgs } from '@remix-run/node'
import { isCategory } from '@src/domain/category'
import { raiseNotFound } from '@ui/utils/responses'
import invariant from 'tiny-invariant'

export const loader = async ({ params: { category } }: LoaderFunctionArgs) => {
  invariant(category)
  if (!isCategory(category)) raiseNotFound()

  const posts = await commands.posts(category)
  return {
    posts,
    category,
  }
}

export default function PostsByCategory() {
  const { posts, category } = useLoaderData<typeof loader>()
  return (
    <main>
      <h1>{category}</h1>
      {posts.map((post) => (
        <li key={post.id}>
          <Link to={`/posts/${post.id}`}>{post.title}</Link>
        </li>
      ))}
    </main>
  )
}
