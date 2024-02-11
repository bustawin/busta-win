import { useLoaderData } from '@remix-run/react'
import * as commands from '@src/service/commands'
import { LoaderFunctionArgs } from '@remix-run/node'
import { isCategory } from '@src/domain/category'
import { raiseNotFound } from '@jutils/ui/responses'
import invariant from 'tiny-invariant'
import PostsContainer from '@ui/utils/postsContainer'
import * as postSer from '@src/adapters/serializers/post'
import { humanize } from '@ui/utils/categories'

export const loader = async ({ params: { category } }: LoaderFunctionArgs) => {
  invariant(category)
  if (!isCategory(category)) raiseNotFound()

  const posts = await commands.posts(category)
  const rawPosts = postSer.dump(...posts)
  return {
    rawPosts,
    category,
  }
}

export default function PostsByCategory() {
  const { rawPosts, category } = useLoaderData<typeof loader>()
  const posts = postSer.load(...(rawPosts as postSer.RawPost[]))
  return <PostsContainer posts={posts} top={humanize(category)} />
}
