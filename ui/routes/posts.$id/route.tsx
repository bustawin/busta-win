import { useLoaderData } from '@remix-run/react'
import * as commands from '@src/service/commands'
import { LoaderFunctionArgs } from '@remix-run/node'
import invariant from 'tiny-invariant'
import Markdown from 'react-markdown'

export const loader = async ({ params: { id } }: LoaderFunctionArgs) => {
  invariant(id, 'id required')
  const post = await commands.post(id)
  return {
    post,
  }
}

export default function Posts() {
  const { post } = useLoaderData<typeof loader>()
  return (
    <main>
      <h1>{post.title}</h1>
      <Markdown
        components={{
          // Map `h1` (`# heading`) to use `h2`s.
          h1: 'h2',
          // Rewrite `em`s (`*like so*`) to `i` with a red foreground color.
          em(props) {
            const { node, ...rest } = props
            return <i style={{ color: 'red' }} {...rest} />
          },
        }}
      >
        {post.content}
      </Markdown>
    </main>
  )
}
