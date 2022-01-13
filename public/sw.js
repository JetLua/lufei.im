/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

/**
 * @type {ServiceWorkerGlobalScope}
 */
const sw = self

/**
 * @type {Promise<Cache>}
 */
let cache

sw.addEventListener('fetch', e => {
  const online = navigator.onLine !== false

  const url = new URL(e.request.url)

  if (online && url.pathname === '/') return fetch(e.request)

  const isApi = e.request.url.includes('api.lufei.im')

  if (isApi && online) {
    // api online
    return e.respondWith(fetch(e.request).then(async res => {
      const data = await res.clone().json()
      if (data.code === 200) cache?.then(c => c.put(e.request, res.clone()))
      return res
    }))
  }

  e.respondWith(caches.match(e.request).then(res => {
    if (res) return res
    else return fetch(e.request).then(res => {
      if (res.status !== 200 && res.status !== 304) return res
      cache?.then(c => c.put(e.request, res.clone()))
      return res
    })
  }))
})

sw.addEventListener('install', () => {
  sw.skipWaiting()
})

sw.addEventListener('message', ({data: {type, id}}) => {
  if (type !== 'GID') return
  cache = caches.open(id)
  caches.keys().then(keys => {
    for (const key of keys) {
      key !== id && caches.delete(key)
    }
  })
})
