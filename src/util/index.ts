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

export function readFile(file: File) {
  const [promise, resolve] = createPromise<string>()
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => resolve(reader.result as string)
  return promise
}
