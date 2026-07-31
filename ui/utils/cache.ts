const proxyTtlInHours = 24
const browserTtlInHours = 4
const extraCacheWhileStaleInDays = 30
const extraCacheWhileStale = extraCacheWhileStaleInDays * 24 * 60 * 60

const browserCache = [
  'public',
  `max-age=${browserTtlInHours * 60 * 60}`,
]

const cloudflareCache = [
  'public',
  `max-age=${proxyTtlInHours * 60 * 60}`,
  `stale-while-revalidate=${extraCacheWhileStale}`,
  `stale-if-error=${extraCacheWhileStale}`,
]

export const loaderCache = {
  'Cache-Control': browserCache.join(','),
  // Keep Cloudflare's cache policy separate from the browser policy. In
  // particular, s-maxage implies proxy-revalidate and prevents Cloudflare
  // from serving stale content while the tunnel is unavailable.
  'Cloudflare-CDN-Cache-Control': cloudflareCache.join(','),
}

export const documentCache = loaderCache
