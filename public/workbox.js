importScripts('https://cdn.jsdelivr.net/npm/workbox-cdn/workbox/workbox-sw.js')
workbox.setConfig({debug: false})
workbox.loadModule('workbox-range-requests')

self.skipWaiting()
workbox.core.clientsClaim()

workbox.routing.registerRoute(
  ({request}) => ['image', 'script', 'style', 'manifest'].includes(request.destination),
  new workbox.strategies.CacheFirst()
)

workbox.routing.registerRoute(
  ({url}) => url.pathname.endsWith('.mp3'),
  new workbox.strategies.CacheFirst({
    plugins: [
      new workbox.rangeRequests.RangeRequestsPlugin()
    ]
  })
)

workbox.routing.registerRoute(
  ({url}) => url.pathname.endsWith('/') || url.host === 'api.lufei.im',
  new workbox.strategies.NetworkFirst()
)
