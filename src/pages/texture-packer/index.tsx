import Config from './config'
import Canvas from './canvas'
import Folder from './folder'

import {useReducer} from '~/util'
import style from './style.module.scss'

export default React.memo(function() {
  const [state, dispatch] = useReducer({
    files: [] as File[],
    cropped: false,
    extruded: 0
  })

  return <section className={style.root}>
    <Folder onFiles={files => dispatch({files})}/>
    <Canvas files={state.files} cropped={state.cropped} extruded={state.extruded}/>
    <Config
      cropped={state.cropped}
      onCrop={cropped => dispatch({cropped})}
      onExtrude={extruded => dispatch({extruded})}
    />
  </section>
})
