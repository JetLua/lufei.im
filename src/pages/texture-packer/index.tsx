import Config from './config'
import Canvas from './canvas'
import Folder from './folder'

import style from './style.module.scss'

export default React.memo(function() {
  return <section className={style.root}>
    <Folder style={{width: 300}}/>
    <Canvas/>
    <Config style={{width: 300}}/>
  </section>
})
