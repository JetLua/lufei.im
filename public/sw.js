/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

/**
 * @type {ServiceWorkerGlobalScope}
 */
const sw = self

/**
 * @type {Cache}
 */
let cache

const types = ['audio', 'video', 'image']

sw.addEventListener('fetch', e => {
  if (types.includes(e.request.destination)) {
    return e.respondWith(respond(e.request, {priority: 'Cache'}))
  }

  const url = new URL(e.request.url)

  if (url.pathname === '/') return e.respondWith(respond(e.request, {priority: 'Network'}))

  const isApi = url.host === 'api.lufei.im'

  if (isApi) return e.respondWith(respond(e.request, {priority: 'Network'}))

  return e.respondWith(respond(e.request, {priority: 'Cache'}))
})

sw.addEventListener('install', e => {
  e.waitUntil(sw.skipWaiting())
})

sw.addEventListener('activate', e => {
  openDB()
  e.waitUntil(sw.clients.claim())
})

/**
 * @typedef {Object} Options
 * @property {'Network' | 'Cache'} priority
 */

/**
 * @param {Request} req
 * @param {Options} opts
 * @returns {Response}
 */
async function respond(req, opts = {}) {
  if (!cache) return fetch(req)

  /** @type {Response} */
  let res

  const range = req.headers.get('range')

  req = (range || req.url.includes('static.safish.org')) ? req.url : req

  if (opts.priority === 'Network') {
    res = await fetch(req).then(res => {
      cache.put(req, res.clone())
      return res
    }).catch(() => cache.match(req, {ignoreVary: true, ignoreSearch: true}))
  } else {
    res = await cache.match(req, {ignoreVary: true, ignoreSearch: true})
      .then(res => {
        if (res) return res
        return fetch(req).then(res => {
          cache.put(req, res.clone())
          return res
        }).cache(() => null)
      })
  }

  if (!res) return new Response('404', {status: 404})

  if (res.status === 206 || !range) return res

  const blob = await res.blob()
  const parts = range.replace('bytes=', '').split('-')
  const start = +parts[0]
  const end = parts[1] ? +parts[1] : blob.size - 1

  return new Response(
    blob.slice(start, end + 1, blob.type),
    {
      status: 206,
      headers: {
        'Content-Range': `bytes ${start}-${end}/${blob.size}`,
        'Content-Length': end - start + 1,
      }
    }
  )
}


function openDB() {
  const request = indexedDB.open('sw')

  request.onsuccess = () => {
    const db = request.result

    if (!db.objectStoreNames.contains('version')) return db.close()

    const store = db.transaction('version', 'readonly').objectStore('version')
    const req = store.index('id').get('gid')

    req.onsuccess = () => {
      db.close()
      const id = req.result.value
      if (!id) return
      caches.open(id).then(c => cache = c)
      caches.keys().then(keys => {
        for (const key of keys) {
          key !== id && caches.delete(key)
        }
      })
    }

    req.onerror = () => db.close()
  }
}
