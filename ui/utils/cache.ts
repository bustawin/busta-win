const ttlInHours = 2
const ttlInSeconds = ttlInHours * 60 * 60
const proxyTtl = ttlInSeconds
const browserTtl = ttlInSeconds / 2

export const loaderCache = {
  'Cache-Control': `public, max-age=${browserTtl}, s-maxage=${proxyTtl}`,
}

export const documentCache = loaderCache
