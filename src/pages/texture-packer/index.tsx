import Config from './config'
import Canvas from './canvas'
import Folder from './folder'

import {useReducer} from '~/util'
import style from './style.module.scss'

export default React.memo(function() {
  const [state, dispatch] = useReducer({
    files: [] as File[]
  })

  return <section className={style.root}>
    <Folder style={{width: 300}}
      onFiles={files => dispatch({files})}
    />
    <Canvas files={state.files}/>
    <Config style={{width: 300}}/>
  </section>
})
