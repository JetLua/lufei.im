import {Button} from '@mui/material'
import {useReducer} from '~/util'
import style from './style.module.scss'

export default React.memo(function(props: Props) {
  const [state, dispatch] = useReducer({
    buttons: ['添加图片', '添加文件夹']
  })
  return <section className={style.root}
    style={{...props.style}}
  >
    <section>
      {
        state.buttons.map((item, i) => {
          return <Button variant="contained"
            size="small"
          >{item}</Button>
        })
      }
    </section>
  </section>
})

interface Props extends React.PropsWithChildren<React.HTMLAttributes<HTMLElement>> {
  // style?: React.CSSProperties
}
