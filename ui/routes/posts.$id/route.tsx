import { useLoaderData } from '@remix-run/react'
import * as commands from '@src/service/commands'
import { LoaderFunctionArgs } from '@remix-run/node'
import invariant from 'tiny-invariant'
import { getMDXExport } from 'mdx-bundler/client'
import ui from '@ui/utils/posts'
import React from 'react'
import Toc from './toc'
import * as layout from '@ui/utils/layout'

const MDX_BUNDLE = {
  ui,
}

export const loader = async ({ params: { id } }: LoaderFunctionArgs) => {
  invariant(id, 'id required')
  const post = await commands.post(id)
  return {
    post,
  }
}

export default function Post() {
  const { post } = useLoaderData<typeof loader>()

  const mdxExport = getMDXExport(post.content, MDX_BUNDLE)

  const Component = React.useMemo(() => mdxExport.default, [post.content])
  return (
    <layout.MainContainer top={post.title}>
      <layout.Main className="post">
        <Component />
      </layout.Main>
      <layout.Aside>
        <Toc toc={mdxExport.toc} />
      </layout.Aside>
    </layout.MainContainer>
  )
}
