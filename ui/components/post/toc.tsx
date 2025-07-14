import { TocEntry } from 'remark-mdx-toc'
import { Link } from '@remix-run/react'
import './toc.css'

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
    <div className="toc">
      <h6 className="toc__title">Table of contents</h6>
      {list(toc)}
    </div>
  )
}
