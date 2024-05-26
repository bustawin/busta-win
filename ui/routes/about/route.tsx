import { useLoaderData } from '@remix-run/react'
import { json } from '@remix-run/node'
import * as commands from '@src/service/commands'
import { getMDXExport } from 'mdx-bundler/client'
import ui from '@ui/utils/posts'
import React from 'react'
import * as layout from '@ui/components/layout/layout'
import { Image } from 'react-bootstrap'
import { loaderCache } from '@ui/utils/cache'

const MDX_BUNDLE = {
  ui,
}

function PostImage(props) {
  return <Image className="post__image" {...props} />
}

export const loader = async () => {
  const post = await commands.post('_about')
  return json(
    {
      post,
    },
    { headers: { ...loaderCache } }
  )
}

export default function Post() {
  const { post } = useLoaderData<typeof loader>()

  const mdxExport = getMDXExport(post.content, MDX_BUNDLE)

  const Component = React.useMemo(() => mdxExport.default, [post.content])
  return (
    <layout.MainContainer top="About me and this place">
      <layout.Main className="post">
        <Component components={{ img: PostImage }} />
      </layout.Main>
    </layout.MainContainer>
  )
}
