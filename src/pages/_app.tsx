import Head from 'next/head'
import type {AppProps} from 'next/app'

import './style.scss'

export default React.memo(function({Component, pageProps}: AppProps) {
  return <React.Fragment>
    <Head>
      <title>Zero</title>
      <meta name="description" content="从未停止对美好事物的探索"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover"/>
      <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
      <link rel="manifest" href="manifest.json"/>
      <link rel="icon" href="/img/favicon.svg"/>
    </Head>
    <Component {...pageProps}/>
  </React.Fragment>
})


if (typeof navigator !== 'undefined' && navigator.serviceWorker) {
  navigator.serviceWorker.register('sw.js', {scope: '/'})
    .then((registration) => {
      const sw = registration.installing ?? registration.active
      if (sw.state === 'activated') {
        sw.postMessage({type: 'GID', id: process.env.GID})
      } else {
        sw.onstatechange = e => {
          if (sw.state === 'activated') {
            sw.postMessage({type: 'GID', id: process.env.GID})
          }
        }
      }
    })
    .catch(err => console.log('sw.js: failed', err.message))
}
