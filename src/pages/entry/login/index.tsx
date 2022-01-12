import {Button, Dialog, DialogActions, DialogTitle, DialogContent, SvgIcon} from '@mui/material'
import {useReducer, context, authorize} from '~/util'

import style from './style.module.scss'

interface Props extends React.HTMLAttributes<HTMLElement> {
  visible: boolean
  onCancel: () => void
}

export default React.memo(function(props: Props) {
  const ctx = React.useContext(context.context)

  const quit = () => {
    // todo
    props.onCancel()
  }

  return <Dialog
    PaperProps={{className: style.dialog}}
    open={props.visible}
  >
    {
      ctx.user.name ? <React.Fragment>
        <DialogTitle>{`你好, ${ctx.user.name}`}</DialogTitle>
        <DialogActions>
          <Button onClick={quit}>退出</Button>
          <Button onClick={props.onCancel}>取消</Button>
        </DialogActions>
      </React.Fragment> : <React.Fragment>
        <DialogTitle>请选择登录方式</DialogTitle>
        <DialogContent className={style.content}>
          <Button sx={{backgroundImage: `url(${require('@/public/img/weibo.svg').default.src})`}}
            onClick={() => authorize('weibo')}
          />
          <Button
            sx={{
              backgroundImage: `url(${require('@/public/img/twitter.svg').default.src})`
            }}
            onClick={() => authorize('twitter')}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onCancel}>取消</Button>
        </DialogActions>
      </React.Fragment>
    }
  </Dialog>
})
