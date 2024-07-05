import { MetaFunction, useLoaderData } from '@remix-run/react'
import * as commands from '@src/service/commands'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import invariant from 'tiny-invariant'
import * as layout from '@ui/components/layout/layout'
import { PostNotFound } from '@src/adapters/posts/posts'
import { raiseNotFound } from '@jutils/ui/responses'
import { loaderCache } from '@ui/utils/cache'
import * as postSer from '@src/adapters/serializers/post'
import PostComponent from '@ui/components/post/post'
import { Handler } from '@jutils/ui/components/HydrateOnEligibleRoutes/HydrateOnEligibleRoutes'

export const handle: Handler = { useScripts: true }

export const loader = async ({ params: { id } }: LoaderFunctionArgs) => {
  invariant(id, 'Post ID Required')
  let post

  try {
    post = await commands.post(id)
  } catch (err) {
    if (err instanceof PostNotFound) {
      raiseNotFound()
    } else {
      throw err
    }
  }
  return json(
    {
      post: postSer.dump(post)[0],
    },
    { headers: { ...loaderCache } }
  )
}

export const meta: MetaFunction<typeof loader> = ({ data, matches }) => {
  if (!data?.post) return
  const post = data.post
  const rootMetas = matches[0].meta.filter(({ title }) => !title)

  return [
    ...rootMetas,
    {
      title: post.title,
    },
    {
      keywords: [...post.categories, ...post.tags, 'blog post'],
    },
  ]
}

export default function Post() {
  const { post } = useLoaderData<typeof loader>()
  const [Post, Toc] = PostComponent({ content: post.content })

  return (
    <layout.MainContainer top={post.title}>
      <layout.Main>{Post}</layout.Main>
      <layout.Aside>{Toc}</layout.Aside>
    </layout.MainContainer>
  )
}
