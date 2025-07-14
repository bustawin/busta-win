import { MetaFunction, useLoaderData } from '@remix-run/react'
import * as commands from '@src/service/commands'
import { json, LinksFunction, LoaderFunctionArgs } from '@remix-run/node'
import invariant from 'tiny-invariant'
import * as layout from '@ui/components/layout/layout'
import { PostNotFound } from '@src/adapters/posts/posts'
import { raiseNotFound } from '@jutils/ui/responses'
import { loaderCache } from '@ui/utils/cache'
import * as postSer from '@src/adapters/serializers/post'
import PostComponent, { postInfo } from '@ui/components/post/post'
import { Handler } from '@jutils/ui/components/HydrateOnEligibleRoutes/HydrateOnEligibleRoutes'
import githubLightCSS from 'highlight.js/styles/github.css?url'
import githubDarkCSS from 'highlight.js/styles/github-dark.css?url'

export const handle: Handler = { useScripts: true }

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: githubLightCSS,
    media: '(prefers-color-scheme: light)',
  },
  {
    rel: 'stylesheet',
    href: githubDarkCSS,
    media: '(prefers-color-scheme: dark)',
  },
]

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

  const meta = [
    ...rootMetas,
    {
      title: post.title,
    },
    {
      keywords: [...post.categories, ...post.tags, 'blog post'],
    },
  ]
  if (post.draft) meta.push({ name: 'robots', content: 'noindex, nofollow' })
  return meta
}

export default function Post() {
  const raw = useLoaderData<typeof loader>()
  const [post] = postSer.load(raw.post)

  const [Post, Toc] = PostComponent(post)

  const Info = postInfo(post)

  return (
    <layout.MainContainer
      top={post.title}
      itemScope
      itemType="https://schema.org/BlogPosting"
    >
      <layout.Main>{Post}</layout.Main>
      <layout.Aside>
        <div>{Toc}</div>
        <div>{Info}</div>
      </layout.Aside>
    </layout.MainContainer>
  )
}
