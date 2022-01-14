/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

/**
 * @type {ServiceWorkerGlobalScope}
 */
const sw = self

/**
 * @type {(opt: Cache | PromiseLike<Cache>) => void}
 */
let _resolve
/**
 * @type {Promise<Cache>}
 */
const getCache = new Promise(resolve => _resolve = resolve)

const statuses = [200, 304]
const suffixes = /\.(js|mp3|jpg|png|svg|css|json)/

sw.addEventListener('fetch', async e => {
  const cache = await getCache
  const online = navigator.onLine !== false

  const url = new URL(e.request.url)

  if (online && url.pathname === '/') return e.respondWith(fetch(e.request).then(res => {
    if (statuses.includes(res.status)) cache.put(e.request, res.clone())
    return res
  }))

  const isApi = url.host === 'api.lufei.im'

  if (isApi && online) {
    // api online
    return e.respondWith(fetch(e.request).then(async res => {
      const data = await res.clone().json()
      if (data.code === 200) cache.put(e.request, res.clone())
      return res
    }))
  }

  e.respondWith(caches.match(e.request, {ignoreSearch: true, ignoreVary: true}).then(res => {
    if (res) return res
    else return fetch(e.request).then(res => {
      if (statuses.includes(res.status)) cache.put(e.request, res.clone())
      return res
    })
  }))
})

sw.addEventListener('install', () => {
  sw.skipWaiting()
})

sw.addEventListener('activate', () => {
  console.log('activate')
})

sw.addEventListener('message', ({data: {type, id}}) => {
  console.log('message')
  if (type !== 'GID') return
  _resolve(caches.open(id))
  caches.keys().then(keys => {
    for (const key of keys) {
      key !== id && caches.delete(key)
    }
  })
})
