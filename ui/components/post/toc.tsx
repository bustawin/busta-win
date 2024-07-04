import { TocEntry } from 'remark-mdx-toc'
import { Link } from '@remix-run/react'
import card from '@jutils/ui/components/card/card'

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
  if (toc.length == 0) return null

  return (
    <aside className="toc">
      <card.Card>
        <card.Header>Table of contents</card.Header>
        <card.Body className="toc__body">{list(toc)}</card.Body>
      </card.Card>
    </aside>
  )
}
