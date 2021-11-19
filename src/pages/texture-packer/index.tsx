import Config from './config'
import Canvas from './canvas'
import Folder from './folder'

import {useReducer} from '~/util'
import style from './style.module.scss'

export default React.memo(function() {
  const [state, dispatch] = useReducer({
    padding: 0,
    extruded: 0,
    cropped: false,
    files: [] as File[],
  })

  return <section className={style.root}>
    <Folder onFiles={files => dispatch({files})}/>
    <Canvas
      files={state.files}
      padding={state.padding}
      cropped={state.cropped}
      extruded={state.extruded}
    />
    <Config
      cropped={state.cropped}
      onCrop={cropped => dispatch({cropped})}
      onExtrude={extruded => dispatch({extruded})}
      onPadding={padding => dispatch({padding})}
    />
  </section>
})
