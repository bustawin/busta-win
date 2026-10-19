import { getMDXExport } from 'mdx-bundler/client'
import { isValidElement, type ReactElement } from 'react'
import Note from '@jutils/ui/components/note/note'
import { Plot } from '@ui/utils/graph'
import C from '@jutils/ui/components/citation/citation'
import Icon from '@jutils/ui/components/icon/Icon'
import { Post as PostType } from '@src/domain/post'
import Toc from './toc'
import { Props } from '@jutils/ui/reactUtils'
import Pintora, { isPintora } from '@ui/components/post/pintora'
import { MdxPre, MdxTable, mdxComponents } from '@ui/mdx/components'
import './post.css'

interface PostProps {
  content: PostType['content']
}

export default function Post({
  content,
}: PostProps): [ReactElement, ReactElement] {
  const mdxExport = getMDXExport(content)
  const Component = mdxExport.default

  const post = (
    <article className="post" itemProp="articleBody">
      <Component
        components={{
          ...mdxComponents,
          Table: MdxTable,
          Note,
          Plot,
          C,
          Icon,
          pre,
        }}
      />
    </article>
  )
  const toc = <Toc toc={mdxExport.toc} />
  return [post, toc]
}

function pre(props: Props) {
  if (isPintora(props) && isValidElement<Props>(props.children)) {
    return Pintora(String(props.children.props.children), props.title)
  }
  return <MdxPre {...props} />
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
