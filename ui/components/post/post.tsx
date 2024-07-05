import { getMDXExport } from 'mdx-bundler/client'
import React from 'react'
import { Figure, Table as RBTable } from 'react-bootstrap'
import Note from '@jutils/ui/components/note/note'
import { Plot } from '@ui/utils/graph'
import Q from '@jutils/ui/components/quote/quote'
import Icon from '@jutils/ui/components/icon/Icon'
import { Post as PostType } from '@src/domain/post'
import Toc from './toc'
import { Props } from '@jutils/ui/reactUtils'

interface PostProps {
  content: PostType['content']
}

export default function Post({
  content,
}: PostProps): [JSX.Element, JSX.Element] {
  const mdxExport = getMDXExport(content)
  const Component = React.useMemo(() => mdxExport.default, [content])

  const post = (
    <article className="post">
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
          pre,
        }}
      />
    </article>
  )
  const toc = <Toc toc={mdxExport.toc} />
  return [post, toc]
}

function PostImage(props: Props) {
  return (
    <Figure className="post__figure post__figure--image">
      <Figure.Image {...props} />
      {props.title && <Figure.Caption>{props.title}</Figure.Caption>}
    </Figure>
  )
}

function Paragraph(props: Props) {
  if (props.children!.type === PostImage) {
    // Remove <p> from figures as it's invalid HTML
    //  failing hydration
    //  from https://github.com/kentcdodds/mdx-bundler/blob/main/README.md#image-bundling
    return <>{props.children}</>
  }
  return <p {...props} />
}

function Table({ children }: Props) {
  return (
    <RBTable striped bordered hover responsive>
      {children}
    </RBTable>
  )
}

function pre(props: Props) {
  return (
    <Figure className="post__figure post__figure--pre">
      <pre {...props} />
      {props.title && <Figure.Caption>{props.title}</Figure.Caption>}
    </Figure>
  )
}

function Subtitle({ children }: Props) {
  return <strong className="subtitle">{children}</strong>
}
