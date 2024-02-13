import './root.sass'
import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
} from '@remix-run/react'
import type { MetaFunction } from '@remix-run/node'
import * as commands from '@src/service/commands'
import { dump } from '@src/adapters/serializers/categories'
import * as layout from '@ui/components/layout/layout'
import MainNavigation from '@ui/root/MainNavigation'
import { envPro } from '@src/service/utils'
import * as ut from '@jutils/ui/reactUtils'
import { Category } from '@src/domain/category'

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
    <AppLayout categories={categories}>
      <Outlet />
    </AppLayout>
  )
}

export function ErrorBoundary() {
  const error = useRouteError()
  console.error(error)

  let title = 'Unknown Error'
  let description = null

  if (isRouteErrorResponse(error)) {
    title = `${error.status} ${error.statusText}`
    description = error.data
  } else if (error instanceof Error) {
    title = 'Error'
    description = (
      <div>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    )
  }

  return (
    <AppLayout>
      <layout.MainContainer top={title}>
        <layout.Main>
          {description}
          <p>
            <Link to="/">Let&apos;s go back home</Link>
          </p>
        </layout.Main>
      </layout.MainContainer>
    </AppLayout>
  )
}

interface Props {
  children: ut.Children
  categories?: Category[]
}

function AppLayout({ categories = [], children }: Props) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <MainNavigation categories={categories} />
        {children}
        {!envPro && <Scripts />}
        {!envPro && <ScrollRestoration />}
      </body>
    </html>
  )
}
