import { Figure } from 'react-bootstrap'
import { Props } from '@jutils/ui/reactUtils'

/**
 * Renders an SVG image from a Pintora SVG string.
 */
export default function Pintora(svg: string, title?: string) {
  return (
    <Figure className="post__figure post__figure--image">
      <div dangerouslySetInnerHTML={{ __html: svg }} />
      {title && <Figure.Caption>{title}</Figure.Caption>}
    </Figure>
  )
}

export function isPintora(props: Props): boolean {
  return props?.children?.props?.className.includes('pintora')
}
