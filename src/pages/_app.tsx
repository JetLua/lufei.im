import Head from 'next/head'
import Script from 'next/script'
import type {AppProps} from 'next/app'

import {context, useMount, useReducer} from '~/util'
import * as api from '~/api'

import './style.scss'
import {Alert, Snackbar} from '@mui/material'

export default React.memo(function({Component, pageProps}: AppProps) {
  const [state, dispatch] = useReducer({
    user: context.data.user,
    error: '',
    standalone: false,
  })

  useMount(() => {
    api.getUser().then(([data, err]) => {
      if (err) return dispatch({error: err.message})
      if (data && data.code !== 200) return dispatch({error: data.msg})
      data?.data && dispatch({user: {name: data.data.name, avatar: data.data.avatar}})
    })

    if (navigator.standalone) dispatch({standalone: true})
  })

  return <React.Fragment>
    <Head>
      <title>Zero</title>
      <meta name="description" content="从未停止对美好事物的探索"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover"/>
      <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
      <meta name="apple-mobile-web-app-capable" content="yes"/>
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
      <link rel="manifest" href="manifest.json"/>
      <link rel="apple-touch-icon" sizes="152x152" href="img/favicon.152.png"/>
      <link rel="apple-touch-icon" sizes="180x180" href="img/favicon.180.png"/>
      <link rel="apple-touch-icon" sizes="167x167" href="img/favicon.167.png"/>
      <link rel="icon" href="img/favicon.svg"/>
      {state.standalone && <style dangerouslySetInnerHTML={{__html: 'body {height: 100vh !important}'}}/>}
    </Head>
    <context.context.Provider value={{user: state.user, dispatch}}>
      <React.Fragment>
        <Component {...pageProps}/>
        <Snackbar open={!!state.error}
          autoHideDuration={3e3}
          onClose={() => dispatch({error: ''})}
          anchorOrigin={{vertical: 'top', horizontal: 'center'}}
        >
          <Alert severity="error"
            sx={{width: '100%'}}
          >{state.error}</Alert>
        </Snackbar>
      </React.Fragment>
    </context.context.Provider>
  </React.Fragment>
})

if (typeof navigator !== 'undefined' && navigator.serviceWorker) {
  navigator.serviceWorker.getRegistration().then(registration => {
    if (registration && registration.active?.scriptURL.endsWith('sw.js')) return registration
    return navigator.serviceWorker.register('sw.js', {scope: '/'})
  }).then(registration => {
    const sw = registration.installing ?? registration.active ?? registration.waiting
    if (!sw) return
    if (sw.state === 'activated') {
      sw.postMessage({type: 'GID', id: process.env.GID})
    } else {
      sw.addEventListener('statechange', () => {
        if (sw.state !== 'activated') return
        sw.postMessage({type: 'GID', id: process.env.GID})
      })
    }
  }).catch(err => console.log('sw.js: failed', err.message))
}
