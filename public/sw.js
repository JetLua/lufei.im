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

  e.respondWith(respond(e.request, {priority: 'Cache'}))
})

sw.addEventListener('install', () => {
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
    cache.add(req, res.clone())
  } else {
    res = await cache.match(req, {ignoreVary: true, ignoreSearch: true})
    if (!res) {
      res = await fetch(req)
      !res.ok && console.log(range, req)
      cache.add(req, res.clone())
    }
  }

  if (!range) return res

  const blob = await res.blob()
  let [start, end] = range.replace('bytes=', '').split('-')
  end = end ? +end : blob.size - 1
  return new Response(
    blob.slice(+start, end ? +end : undefined, blob.type),
    {
      status: 206,
      statusText: 'Partial Content',
      headers: {
        'content-range': `bytes ${start}-${end}/${blob.size}`,
        'content-length': end - start + 1
      }
    }
  )
}
