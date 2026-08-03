import { Props } from '@jutils/ui/reactUtils'
import { isValidElement } from 'react'
import './pintora.css'

/**
 * Renders an SVG image from a Pintora SVG string.
 */
export default function Pintora(svg: string, title?: string) {
  return (
    <figure className="post__figure figure--image post__figure--pintora">
      <div dangerouslySetInnerHTML={{ __html: svg }} />
      {title && <figcaption>{title}</figcaption>}
    </figure>
  )
}

export function isPintora(props: Props): boolean {
  return (
    isValidElement<Props>(props.children) &&
    Boolean(props.children.props.className?.includes('pintora'))
  )
}
