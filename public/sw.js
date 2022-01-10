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

sw.addEventListener('fetch', async e => {
  e.respondWith(caches.match(e.request).then(res => {
    if (res) return res
    else return fetch(e.request).then(res => {
      if (res.status !== 200 && res.status !== 304) return res
      cache.then(c => c.put(e.request, res.clone()))
      return res
    })
  }))
})

sw.addEventListener('install', () => {
  sw.skipWaiting()
})

sw.addEventListener('message', e => {
  caches.keys().then(keys => {
    for (const key of keys) {
      if (key === e.data.id) cache = caches.open(key)
      else caches.delete(key)
    }

    if (!cache) cache = caches.open(e.data.id)
  })
})
