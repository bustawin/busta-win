import { getMDXExport } from 'mdx-bundler/client'
import React from 'react'
import Note from '@jutils/ui/components/note/note'
import { Plot } from '@ui/utils/graph'
import Q from '@jutils/ui/components/quote/quote'
import Icon from '@jutils/ui/components/icon/Icon'
import { Post as PostType } from '@src/domain/post'
import Toc from './toc'
import { Props } from '@jutils/ui/reactUtils'
import Pintora, { isPintora } from '@ui/components/post/pintora'
import './post.css'

interface PostProps {
  content: PostType['content']
}

export default function Post({
  content,
}: PostProps): [JSX.Element, JSX.Element] {
  const mdxExport = getMDXExport(content)
  const Component = React.useMemo(() => mdxExport.default, [content])

  const post = (
    <article className="post" itemProp="articleBody">
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
    <figure className="figure--image">
      <img {...props} />
      {props.title && <figcaption className="muted">{props.title}</figcaption>}
    </figure>
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
    <div className="table-wrapper">
      <table>{children}</table>
    </div>
  )
}

function pre(props: Props) {
  if (isPintora(props))
    return Pintora(props.children.props.children, props.title)
  return (
    <figure className="post__figure post__figure--pre">
      <pre {...props} />
      {props.title && <figcaption className="muted">{props.title}</figcaption>}
    </figure>
  )
}

function Subtitle({ children }: Props) {
  return <strong className="subtitle">{children}</strong>
}

export interface postInfoProps {
  created: PostType['created']
  short?: boolean
}

export function postInfo({ created, short }: postInfoProps) {
  return (
    <div className="muted">
      <time
        className="post-info__created"
        itemProp="dateCreated"
        dateTime={created.toISOString()}
      >
        {!short && 'Published in '}
        <span className="post-info__created__month">
          {created.toLocaleString('en-US', {
            month: short ? 'short' : 'long',
          })}
        </span>
        <span className="post-info__created__year">
          {created.toISOString().slice(0, 4)}
        </span>
      </time>
      {!short && (
        <div>
          by <span itemProp="author">bustawin</span>
        </div>
      )}
    </div>
  )
}
