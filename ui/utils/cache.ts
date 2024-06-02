const proxyTtlInHours = 12
const proxyTtl = proxyTtlInHours * 60 * 60

const browserTtlInHours = 2
const browserTtl = browserTtlInHours * 60 * 60

export const loaderCache = {
  'Cache-Control': `public, max-age=${browserTtl}, s-maxage=${proxyTtl}`,
}

export const documentCache = loaderCache
