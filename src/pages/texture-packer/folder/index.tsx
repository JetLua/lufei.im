import {Button} from '@mui/material'
import {FileUpload} from '@mui/icons-material'

import {useReducer} from '~/util'
import style from './style.module.scss'

export default React.memo(function({className, ...props}: Props) {
  const [state, dispatch] = useReducer({
    buttons: ['添加图片', '添加文件夹', '清除']
  })

  return <section {...props}
    className={[style.root, className].join(' ').trim()}
  >
    <section className={style.head}>
      {
        state.buttons.map((item, i) => {
          return <Button variant="contained"
            size="small"
          >{item}</Button>
        })
      }
    </section>
    <section className={style.tip}>
      <FileUpload color="action" fontSize="large"/>
      <i className={style.text}>拖拽文件到此处</i>
    </section>
  </section>
})

interface Props extends React.PropsWithChildren<React.HTMLAttributes<HTMLElement>> {
  // style?: React.CSSProperties
}
