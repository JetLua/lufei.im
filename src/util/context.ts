export const data = {
  user: {
    name: '',
    avatar: ''
  }
}

export type IData = typeof data

export const context = React.createContext<RecursivePartial<IData> & {
  dispatch?: React.Dispatch<RecursivePartial<IData>>
}>(data)
