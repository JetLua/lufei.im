import {Button} from '@mui/material'
import {ArticleOutlined, PhotoCameraBackOutlined} from '@mui/icons-material'

import {Nav} from '~/module'
import {useReducer} from '~/util'

import style from './style.module.scss'

export default React.memo(function() {
  const [state, dispatch] = useReducer({
    nav: {
      items: [
        {name: '文', icon: <ArticleOutlined/>},
        {name: '图', icon: <PhotoCameraBackOutlined/>},
      ]
    }
  })
  return <section className={style.root}>
    <Nav items={state.nav.items}/>
    <Button variant="contained">ok</Button>
  </section>
})
