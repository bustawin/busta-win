import { TocEntry } from 'remark-mdx-toc'
import * as rb from 'react-bootstrap'
import { Link } from '@remix-run/react'

interface Props {
  toc: TocEntry[]
}

export default function Toc({ toc }: Props) {
  console.log(toc)
  return (
    <rb.Card>
      <rb.Card.Header>Table of contents</rb.Card.Header>
      <rb.Card.Body>
        <ol>
          {toc.map(({ attributes: { id }, value }) => (
            <li key={id}>
              <Link to={`#${id}`}>{value}</Link>
            </li>
          ))}
        </ol>
      </rb.Card.Body>
    </rb.Card>
  )
}
