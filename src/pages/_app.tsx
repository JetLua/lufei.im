import Head from 'next/head'
import Script from 'next/script'
import type {AppProps} from 'next/app'

import {context, useMount, useReducer} from '~/util'

import './style.scss'

export default React.memo(function({Component, pageProps}: AppProps) {
  const [state, dispatch] = useReducer({
    user: context.data.user,
    error: '',
    standalone: false,
  })

  useMount(() => {
    if (navigator.standalone) dispatch({standalone: true})
  })

  return <React.Fragment>
    <Head>
      <title>Choogo</title>
      <meta name="description" content="从未停止对美好事物的探索"/>
      <meta name="keywords" content="choogo.app,日历,农历,万年历"></meta>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover"/>
      <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
      <meta name="apple-mobile-web-app-capable" content="yes"/>
      <meta name="theme-color" content="#03a9f4"/>
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
      <link rel="manifest" href="manifest.json"/>
      <link rel="apple-touch-icon" sizes="152x152" href="img/favicon.152.png"/>
      <link rel="apple-touch-icon" sizes="180x180" href="img/favicon.180.png"/>
      <link rel="apple-touch-icon" sizes="167x167" href="img/favicon.167.png"/>
      <link rel="icon" href="img/favicon.svg"/>
      <script src="https://cdn.tailwindcss.com"></script>
      {state.standalone && <style dangerouslySetInnerHTML={{__html: 'body {height: 100vh !important}'}}/>}
      <script dangerouslySetInnerHTML={{
        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-KJS8J7M');`
      }}/>
      <style type="text/tailwindcss"
        dangerouslySetInnerHTML={{
          __html: `
            @layer utilities {
              .max-w-500 {
                max-width: 500px;
              }
            }
          `
        }}
      />
    </Head>
    <context.context.Provider value={{user: state.user, dispatch}}>
      <React.Fragment>
        <Component {...pageProps}/>
      </React.Fragment>
    </context.context.Provider>
  </React.Fragment>
})

// if (typeof indexedDB !== 'undefined') {
//   const request = indexedDB.open('sw')

//   const onUpgradeneeded = (request: IDBOpenDBRequest) => {
//     const db = request.result
//     const store = db.createObjectStore('version')
//     const req = store.add({id: 'gid', value: process.env.GID}, 'id')
//     store.createIndex('id', 'id', {unique: true})
//     req.onsuccess = () => {
//       console.log('gid added')
//       db.close()
//     }
//     req.onerror = e => {
//       console.log('gid add failed:', e)
//       db.close()
//     }
//   }

//   request.addEventListener('upgradeneeded', () => onUpgradeneeded(request))

//   const onSuccess = (request: IDBOpenDBRequest) => {
//     const db = request.result

//     if (!db.objectStoreNames.contains('version')) {
//       db.close()
//       const request = indexedDB.open('sw', db.version + 1)
//       request.addEventListener('upgradeneeded', () => onUpgradeneeded(request))
//       return
//     }

//     let req = db.transaction('version', 'readwrite')
//       .objectStore('version')
//       .index('id').get('gid')

//     req.onsuccess = () => {
//       if (req.result.value === process.env.GID) return

//       req = db.transaction('version', 'readwrite')
//         .objectStore('version')
//         .put({id: 'gid', value: process.env.GID}, 'id')

//       req.onsuccess = () => {
//         console.log('version updated')
//         db.close()
//       }

//       req.onerror = e => {
//         console.log('version update failed:', e)
//         db.close()
//       }
//     }
//   }

//   request.addEventListener('success', () => onSuccess(request))
// }

// if (typeof navigator !== 'undefined' && navigator.serviceWorker) {
//   navigator.serviceWorker.getRegistration('/').then(registration => {
//     if (registration) return registration
//     return navigator.serviceWorker.register('sw.js', {scope: '/'})
//   }).catch(err => console.log('sw.js: failed', err.message))
// }
