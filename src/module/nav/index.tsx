import {Tabs, Tab} from '@mui/material'
import {useReducer} from '~/util'
import style from './style.module.scss'

interface Props extends React.HtmlHTMLAttributes<HTMLElement> {
  items: Array<{name: string, icon: JSX.Element}>
}

export default React.memo(function({items, className, ...props}: Props) {
  const [state, dispatch] = useReducer({
    index: 0
  })
  return <Tabs value={state.index}
    onChange={(_, index) => dispatch({index})}
  >
    {
      items.map((item, i) => {
        const title = <div className={style.title}>
          {item.icon}
          <i>{item.name}</i>
        </div>

        return <Tab key={i}
          label={title}
        />
      })
    }
  </Tabs>
})
