import Config from './config'
import Canvas from './canvas'
import Folder from './folder'

import style from './style.module.scss'

export default React.memo(function() {
  return <section className={style.root}>
    <Folder style={{backgroundColor: 'red'}}/>
    <Canvas/>
    <Config/>
  </section>
})
