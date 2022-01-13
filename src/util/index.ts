import * as api from '~/api'
import {default as merge} from './merge'
import createPromise from './createPromise'

import type {Options} from './merge'

export {default as createPromise} from './createPromise'
export * as context from './context'
export {default as net} from './net'

export function useMount(cb: Function) {
  const ref = React.useRef<Function>()
  ref.current = cb
  React.useEffect(() => {
    return ref.current()
  }, [])
}

export function useReducer<T>(state: T, opts?: Options) {
  return React.useReducer((state: T, data: RecursivePartial<T> | ((old: T) => RecursivePartial<T>)) => {
    if (data instanceof Function) return merge<T>(state, data(state), opts)
    return merge<T>(state, data, opts)
  }, state)
}

export function ok<T>(result: T): [T, null] {
  return [result, null]
}

export function error(err: Error): [null, Error] {
  return [null, err]
}

export async function authorize(type: 'weibo' | 'twitter' | 'github' | 'facebook') {
  await api.quit()
  switch (type) {
    case 'weibo': {
      window.open('https://api.weibo.com/oauth2/authorize?client_id=73680884&redirect_uri=https://api.lufei.im&state=weibo&response_type=code', '_self')
      break
    }

    case 'twitter': {
      window.open('https://twitter.com/i/oauth2/authorize?response_type=code&client_id=VC1sMllCZGNYeGdDTHpSaXRPeVo6MTpjaQ&redirect_uri=https://api.lufei.im&scope=tweet.read%20users.read&state=twitter&code_challenge=challenge&code_challenge_method=plain', '_self')
      break
    }

    case 'github': {
      window.open('https://github.com/login/oauth/authorize?client_id=48a72c86f3d065d33914&redirect_uri=https://api.lufei.im&state=github&scope=user', '_self')
      break
    }

    case 'facebook': {
      window.open('https://www.facebook.com/v12.0/dialog/oauth?client_id=256593459931233&redirect_uri=https://api.lufei.im&state=facebook', '_self')
      break
    }
  }
}

export function readFile(file: File) {
  const [promise, resolve] = createPromise<string>()
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => resolve(reader.result as string)
  return promise
}
