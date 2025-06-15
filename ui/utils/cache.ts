const proxyTtlInHours = 24
const browserTtlInHours = 4
const extraCacheWhileStaleInDays = 30
const extraCacheWhileStale = extraCacheWhileStaleInDays * 24 * 60 * 60

const cache = [
  'public',
  `max-age=${browserTtlInHours * 60 * 60}`,
  `s-maxage=${proxyTtlInHours * 60 * 60}`,
  `stale-while-revalidate=${extraCacheWhileStale}`,
  `stale-if-error=${extraCacheWhileStale}`,
]

export const loaderCache = {
  'Cache-Control': cache.join(','),
}

export const documentCache = loaderCache
