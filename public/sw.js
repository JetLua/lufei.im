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

sw.addEventListener('fetch', e => {
  if (e.request.destination === 'audio' || e.request.destination === 'video') {
    return e.respondWith(respond(e.request, {priority: 'Cache'}))
  }

  const online = navigator.onLine !== false
  const url = new URL(e.request.url)

  if (online && url.pathname === '/') return e.respondWith(respond(e.request, {priority: 'Network'}))

  const isApi = url.host === 'api.lufei.im'

  if (isApi && online) return e.respondWith(respond(e.request, {priority: 'Network'}))

  return e.respondWith(respond(e.request, {priority: 'Cache'}))
})

sw.addEventListener('install', e => {
  sw.skipWaiting()
})

sw.addEventListener('message', ({data: {type, id}}) => {
  if (type !== 'GID') return
  _resolve(caches.open(id))
  caches.keys().then(keys => {
    for (const key of keys) {
      key !== id && caches.delete(key)
    }
  })
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
  const cache = await getCache
  if (!cache) return fetch(req)

  /** @type {Response} */
  let res

  const range = req.headers.get('range')

  req = (range || req.url.includes('static.safish.org')) ? req.url : req

  if (opts.priority === 'Network') {
    res = await fetch(req)
    cache.put(req, res.clone())
  } else {
    res = await cache.match(req, {ignoreVary: true, ignoreSearch: true})
    if (!res) {
      res = await fetch(req)
      cache.put(req, res.clone())
    }
  }

  if (!range || res.status === 206) return res

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
