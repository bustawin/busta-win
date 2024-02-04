import { Link } from '@remix-run/react'
import { Category } from '@src/domain/category'
import * as changeCase from 'change-case'
interface MainNavigationProps {
  categories: Category[]
}

export default function MainNavigation({ categories }: MainNavigationProps) {
  return (
    <ul>
      {categories.map((category) => (
        <li key={category}>
          <Link to={`/categories/${category}`}>
            {changeCase.capitalCase(category)}
          </Link>
        </li>
      ))}
    </ul>
  )
}
