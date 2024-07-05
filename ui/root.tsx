import './root.sass'
import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  useLoaderData,
  useRouteError,
} from '@remix-run/react'
import type {
  HeadersFunction,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from '@remix-run/node'
import * as commands from '@src/service/commands'
import { dump } from '@src/adapters/serializers/categories'
import * as layout from '@ui/components/layout/layout'
import MainNavigation from '@ui/root/MainNavigation'
import * as ut from '@jutils/ui/reactUtils'
import { Category } from '@src/domain/category'
import { feedLink } from '@ui/routes/posts.feed/link'
import { documentCache } from '@ui/utils/cache'
import GlobalLoading from '@jutils/ui/components/globalLoading'
import NotFound from '@ui/components/NotFound/NotFound'
import HydrateOnEligibleRoutes from '@jutils/ui/components/HydrateOnEligibleRoutes/HydrateOnEligibleRoutes'

export const meta: MetaFunction = () => {
  return [
    { title: 'bustawin' },
    { charSet: 'utf-8' },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'theme-color',
      media: '(prefers-color-scheme: light)',
      content: '#45695F',
    },
    {
      name: 'theme-color',
      media: '(prefers-color-scheme: dark)',
      content: '#233530',
    },
  ]
}

export const headers: HeadersFunction = () => {
  return {
    ...documentCache,
  }
}

export const links: LinksFunction = () => {
  return [
    {
      rel: 'icon',
      type: 'image/png',
      size: '512x512',
      href: '/favicon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      size: '32x32',
      href: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      size: '16x16',
      type: 'image/png',
      href: '/favicon-16x16.png',
    },
    feedLink,
  ]
}

export const loader: LoaderFunction = async () => {
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
      <HydrateOnEligibleRoutes />
    </AppLayout>
  )
}

export function ErrorBoundary() {
  const error = useRouteError()
  console.error(error)

  let title = 'Unknown Error'
  let description = null

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      title = 'A dramatic short story'
      description = <NotFound />
    } else {
      title = `${error.status} ${error.statusText}`
      description = error.data
    }
  } else if (error instanceof Error) {
    title = 'Error'
    description = (
      <div>
        <p>{error.message}</p>
        {error.stack && <p>The stack trace is:</p>}
        <pre>{error.stack}</pre>
      </div>
    )
  }

  return (
    <AppLayout>
      <layout.MainContainer top={title}>
        <layout.Main>
          {description}
          <p className="text-center">
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
        <Meta />
        <Links />
      </head>
      <body>
        <GlobalLoading />
        <MainNavigation categories={categories} />
        {children}
      </body>
    </html>
  )
}
