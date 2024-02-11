import { TocEntry } from 'remark-mdx-toc'
import * as rb from 'react-bootstrap'
import { Link } from '@remix-run/react'
import invariant from 'tiny-invariant'

interface Props {
  toc: TocEntry[]
}

function list(entries: TocEntry[]) {
  return (
    <nav>
      <ol>
        {entries.map(({ attributes: { id }, value }) => (
          <li key={id}>
            <Link to={`#${id}`} className="toc__link">
              {value}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default function Toc({ toc }: Props) {
  invariant(toc.length > 0, 'No entries found')

  return (
    <aside className="toc">
      <rb.Card>
        <rb.Card.Header>Table of contents</rb.Card.Header>
        <rb.Card.Body className="toc__body">{list(toc)}</rb.Card.Body>
      </rb.Card>
    </aside>
  )
}
