declare module '*.scss'

declare const React = await import('react')
declare const ReactDOM = await import('react-dom')

declare const ENV: 'prod' | 'mock' | 'dev' | 'test'
declare const PROD: boolean

interface Navigator {
  standalone: boolean
}

type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>
}

type Respond<T = {}> = {data?: T} & {
  code: 200 | 401
  msg: string
}

// 解压提取api函数ok时的返回类型
type Unpack<T extends (...args: any[]) => void> = ReturnType<T> extends PromiseLike<infer U> ?
  Extract<U, [unknown, null]>[0] : T
