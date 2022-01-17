importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.2/workbox-sw.js')
workbox.setConfig({debug: false})
workbox.loadModule('workbox-range-requests')
workbox.loadModule('workbox-expiration')

workbox.core.clientsClaim()
self.skipWaiting()

workbox.routing.registerRoute(
  ({request}) => ['image', 'script', 'style', 'manifest'].includes(request.destination),
  new workbox.strategies.NetworkFirst()
)

workbox.routing.registerRoute(
  ({url}) => url.pathname.endsWith('.mp3'),
  new workbox.strategies.NetworkFirst({
    plugins: [
      new workbox.rangeRequests.RangeRequestsPlugin()
    ]
  })
)

workbox.routing.registerRoute(
  ({url}) => url.pathname.endsWith('/') || url.host === 'api.lufei.im',
  new workbox.strategies.NetworkFirst()
)
