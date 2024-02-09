import { useLoaderData } from '@remix-run/react'
import * as commands from '@src/service/commands'
import { LoaderFunctionArgs } from '@remix-run/node'
import invariant from 'tiny-invariant'
import * as rb from 'react-bootstrap'
import { getMDXComponent } from 'mdx-bundler/client'

const MDX_BUNDLE = {
  rb: rb,
}

export const loader = async ({ params: { id } }: LoaderFunctionArgs) => {
  invariant(id, 'id required')
  const post = await commands.post(id)
  return {
    post,
  }
}

export default function Posts() {
  const { post } = useLoaderData<typeof loader>()
  const Component = getMDXComponent(post.content, MDX_BUNDLE)
  return (
    <main>
      <h1>{post.title}</h1>
      <Component />
    </main>
  )
}
