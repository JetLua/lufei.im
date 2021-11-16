import {Button, IconButton, Input, Snackbar} from '@mui/material'
import {Close} from '@mui/icons-material'

import {useReducer} from '~/util'

export default React.memo(function() {
  const [state, dispatch] = useReducer({
    toast: false
  })

  const tap = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.currentTarget

    switch (target.dataset.name) {
      case 'btn': {
        dispatch({toast: true})
        break
      }

      case 'btn:close': {
        dispatch({toast: false})
        break
      }
    }
  }

  return <section>
    <Button color="primary" variant="contained"
      onClick={tap}
      data-name="btn"
    >Tap</Button>
    <Snackbar
      anchorOrigin={{vertical: 'top', horizontal: 'center'}}
      open={state.toast}
      message="是不是很帅"
      autoHideDuration={3e3}
      onClose={() => dispatch({toast: false})}
      action={<React.Fragment>
        <IconButton
          onClick={tap}
          data-name="btn:close"
        ><Close style={{color: '#fff'}}/></IconButton>
      </React.Fragment>}
    />
  </section>
})
