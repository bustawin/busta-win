import { isValidElement, type HTMLAttributes } from 'react'

export type MdxComponentProps = HTMLAttributes<HTMLElement>

export function MdxImage(props: MdxComponentProps & { alt?: string }) {
  return (
    <figure className="figure--image">
      <img {...props} alt={props.alt ?? ''} />
      {props.title && <figcaption className="muted">{props.title}</figcaption>}
    </figure>
  )
}

export function MdxParagraph(props: MdxComponentProps) {
  if (isValidElement(props.children) && props.children.type === MdxImage) {
    // Remove <p> from figures as it's invalid HTML
    //  failing hydration
    //  from https://github.com/kentcdodds/mdx-bundler/blob/main/README.md#image-bundling
    return <>{props.children}</>
  }
  return <p {...props} />
}

export function MdxTable({ children }: MdxComponentProps) {
  return (
    <div className="table-wrapper">
      <table>{children}</table>
    </div>
  )
}

export function MdxPre(props: MdxComponentProps) {
  return (
    <figure className="post__figure post__figure--pre">
      <pre {...props} />
      {props.title && <figcaption className="muted">{props.title}</figcaption>}
    </figure>
  )
}

export function MdxSubtitle({ children }: MdxComponentProps) {
  return <strong className="subtitle">{children}</strong>
}

export const mdxComponents = {
  img: MdxImage,
  p: MdxParagraph,
  table: MdxTable,
  Table: MdxTable,
  pre: MdxPre,
  Subtitle: MdxSubtitle,
}
