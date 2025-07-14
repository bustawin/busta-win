import timmy from './timmy.webp'

import { Category } from '@src/domain/category'
import { NavLink } from '@remix-run/react'
import { humanize } from '@ui/utils/categories'
import './main-navigation.css'

interface MainNavigationProps {
  categories: Category[]
}

export default function MainNavigation({ categories }: MainNavigationProps) {
  return (
    <header id="main-navigation">
      <NavLink to="/">
        <img src={timmy} id="timmy" alt="Site logo" />
      </NavLink>
      <nav className="nav">
        <div>
          <NavLink to="/" id="logo-name">
            busta<span className="period">.</span>win
          </NavLink>
        </div>
        <div className="nav-links">
          {categories.map((category) => (
            <NavLink
              key={category}
              to={`/categories/${category}`}
              className={`main-navigation__nav-link main-navigation__nav-link--${category}`}
              prefetch="intent"
            >
              {humanize(category)}
            </NavLink>
          ))}
          <NavLink to="/about" className="main-navigation__nav-link">
            About
          </NavLink>
        </div>
      </nav>
    </header>
  )
}
