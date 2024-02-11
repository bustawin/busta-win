import './root.sass'
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react'
import type { MetaFunction } from '@remix-run/node'
import * as commands from '@src/service/commands'
import MainNavigation from '@ui/root/MainNavigation'
import { dump } from '@src/adapters/serializers/categories'

export const meta: MetaFunction = () => {
  return [{ title: 'bustawin' }]
}

export const loader = async () => {
  const categories = commands.categories()
  return {
    categories: dump(categories),
  }
}

export default function App() {
  const { categories } = useLoaderData<typeof loader>()
  return (
    <html lang="en" data-bs-theme="auto">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <MainNavigation categories={categories} />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}
