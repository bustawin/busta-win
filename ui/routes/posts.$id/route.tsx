import { useLoaderData } from '@remix-run/react'
import * as commands from '@src/service/commands'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import invariant from 'tiny-invariant'
import { getMDXExport } from 'mdx-bundler/client'
import ui from '@ui/utils/posts'
import React from 'react'
import Toc from './toc'
import * as layout from '@ui/components/layout/layout'
import { Figure } from 'react-bootstrap'
import Note from '@jutils/ui/components/note/note'
import { Plot } from '@ui/utils/graph'
import Q from '@jutils/ui/components/quote/quote'
import Icon from '@jutils/ui/components/icon/Icon'
import { PostNotFound } from '@src/adapters/posts/posts'
import { raiseNotFound } from '@jutils/ui/responses'
import { loaderCache } from '@ui/utils/cache'

const MDX_BUNDLE = {
  ui,
}

function PostImage(props) {
  return (
    <Figure className="post__figure">
      <Figure.Image {...props} />
      {props.title && <Figure.Caption>{props.title}</Figure.Caption>}
    </Figure>
  )
}

function Paragraph(props) {
  if (props.children.type === PostImage) {
    // Remove <p> from figures as it's invalid HTML
    //  failing hydration
    //  from https://github.com/kentcdodds/mdx-bundler/blob/main/README.md#image-bundling
    return <>{props.children}</>
  }
  return <p {...props} />
}

function Table({ children }) {
  return (
    <ui.rb.Table striped bordered hover responsive>
      {children}
    </ui.rb.Table>
  )
}

function Subtitle({ children }) {
  return <strong className="subtitle">{children}</strong>
}

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
    <>
      <layout.MainContainer top={post.title}>
        <layout.Main className="post">
          <article>
            <Component
              components={{
                img: PostImage,
                Note,
                p: Paragraph,
                Table,
                Plot,
                Q,
                Icon,
                Subtitle,
              }}
            />
          </article>
        </layout.Main>
        <layout.Aside>
          <Toc toc={mdxExport.toc} />
        </layout.Aside>
      </layout.MainContainer>
    </>
  )
}
