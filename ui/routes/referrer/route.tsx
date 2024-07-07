import { lazy, Suspense } from 'react'
import * as layout from '@ui/components/layout/layout'
import { Handler } from '@jutils/ui/components/HydrateOnEligibleRoutes/HydrateOnEligibleRoutes'
import Spinner from '@jutils/ui/components/spinner/spinner'
import { ClientOnly } from 'remix-utils/client-only'

const Referrer = lazy(() => import('@ui/components/referrer/Referrer'))

export const handle: Handler = { useScripts: true }

export default function ReferrerPage() {
  return (
    <layout.MainContainer top="Referrer">
      <ClientOnly fallback={<Spinner />}>
        {() => (
          <Suspense fallback={<Spinner />}>
            <Referrer />
          </Suspense>
        )}
      </ClientOnly>
    </layout.MainContainer>
  )
}
