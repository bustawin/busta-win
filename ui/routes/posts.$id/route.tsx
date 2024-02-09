import { useLoaderData } from '@remix-run/react'
import { LoaderFunctionArgs } from '@remix-run/node'
import invariant from 'tiny-invariant'
import Post, { attributes } from './post.mdx'
import { MDXComponents } from 'mdx/types'

export const loader = async ({ params: { id } }: LoaderFunctionArgs) => {
  invariant(id, 'id required')
  return {
    post: attributes,
  }
}

export default function Posts() {
  const { post } = useLoaderData<typeof loader>()
  const components: MDXComponents = {
    em(props) {
      return <i {...props}></i>
    },
  }

  return (
    <main>
      <h1>{post.title}</h1>
      <Post />
    </main>
  )
}
