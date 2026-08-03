import type { TocEntry } from '@src/adapters/posts/remark-mdx-toc'
import { Link } from 'react-router'
import './toc.css'

interface Props {
  toc: TocEntry[]
}

function list(entries: TocEntry[]) {
  return (
    <nav>
      <ol>
        {entries.map(({ attributes, value }) => (
          <li key={String(attributes.id)}>
            <Link to={`#${String(attributes.id)}`} className="toc__link">
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
    <div className="toc">
      <h6 className="toc__title">Table of contents</h6>
      {list(toc)}
    </div>
  )
}
