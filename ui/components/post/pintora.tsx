import { Props } from '@jutils/ui/reactUtils'
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
  return props?.children?.props?.className?.includes('pintora')
}
