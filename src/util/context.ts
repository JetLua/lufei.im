export const data = {
  user: {
    name: '',
    avatar: ''
  }
}

export type IData = typeof data

export const context = React.createContext<IData & {
  dispatch?: React.Dispatch<RecursivePartial<IData>>
}>(data)
