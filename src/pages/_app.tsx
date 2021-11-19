import Head from 'next/head'
import type {AppProps} from 'next/app'

import './style.scss'

export default React.memo(function({Component, pageProps}: AppProps) {
  return <React.Fragment>
    <Head>
      <title>Zero</title>
      <meta name="description" content="从未停止对美好事物的探索"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover"/>
      <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
      <link rel="manifest" href="manifest.json"/>
      <link rel="icon" href="/img/favicon.svg"/>
    </Head>
    <Component {...pageProps}/>
  </React.Fragment>
})


if (typeof navigator !== 'undefined' && navigator.serviceWorker && process.env.PROD) {
  navigator.serviceWorker.register('/js/sw.js', {scope: '/'})
    .then(() => console.log('sw.js: done'))
    .catch(() => console.log('sw.js: failed'))
}
