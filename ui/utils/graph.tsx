import { ClientOnly } from 'remix-utils/client-only'

import { lazy, Suspense } from 'react'
import Spinner from '@jutils/ui/components/spinner/spinner'

// Plotly library can only be imported at client side
const Plotly = lazy(() => import('./plot'))

export interface PlotProps {
  data: Record<string, unknown>
  layout: Record<string, unknown>
}

export function Plot({ data, layout }: PlotProps) {
  return (
    <ClientOnly fallback={<Spinner />}>
      {() => (
        <Suspense fallback={<Spinner />}>
          <Plotly
            data={data}
            layout={layout}
            useResizeHandler={true}
            style={{ width: '100%', height: '100%' }}
          />
        </Suspense>
      )}
    </ClientOnly>
  )
}
