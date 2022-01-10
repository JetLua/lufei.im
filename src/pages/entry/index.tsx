import {Howl} from 'howler'
import {IconButton, Slider} from '@mui/material'
import {FastForwardRounded, FastRewindRounded, PauseRounded, PlayArrowRounded} from '@mui/icons-material'

import type {SliderProps} from '@mui/material'


import {useMount, useReducer} from '~/util'

import style from './style.module.scss'

export default React.memo(function() {
  const [state, dispatch] = useReducer({
    cursor: 0,
    playing: false,
    progress: 0,
    list: [
      {
        name: '等一分钟',
        singer: '徐誉滕',
        album: '《滕·爱》',
        src: 'https://static.safish.org/music/%E7%AD%89%E4%B8%80%E5%88%86%E9%92%9F.mp3',
        cover: 'https://static.safish.org/music/%E7%AD%89%E4%B8%80%E5%88%86%E9%92%9F.cover.webp'
      }
    ]
  })

  const {current: mut} = React.useRef({
    id: undefined as number,
    sound: null as Howl
  })

  useMount(() => {
    mut.sound = new Howl({
      preload: true,
      src: state.list[state.cursor].src
    })
    tick()
  })

  const tick = () => {
    setTimeout(tick, 5e2)
    if (!mut.sound) return
    const progress = mut.sound.seek() / mut.sound.duration() * 1e2
    dispatch({
      playing: mut.sound.playing(),
      progress: isNaN(progress) ? 0 : progress
    })
  }

  const toggle = () => {
    if (mut.sound.playing()) {
      mut.sound.pause()
    } else {
      mut.sound.play()
    }
  }

  const change: SliderProps['onChange'] = (_, v: number) => {
    mut.sound.seek(mut.sound.duration() * v / 100)
  }

  const item = state.list[state.cursor]

  return <section className={style.root}>
    <section className={style.card}>
      <div className={style.head}>
        <div className={style.cover}
          style={{backgroundImage: `url(${item.cover})`}}
        />
        <div className={style.right}>
          <p>{item.name}</p>
          <p>
            {item.singer && <i>{item.singer}</i>}
            {item.album && <i>{item.album}</i>}
          </p>
        </div>
      </div>

      <Slider className={style.slider} size="small"
        value={state.progress}
        onChange={change}
      />

      <div className={style.control}>
        <IconButton disabled={state.cursor < 1}>
          <FastRewindRounded fontSize="large"/>
        </IconButton>
        <IconButton onClick={toggle}>
          {state.playing ? <PauseRounded fontSize="large"/> : <PlayArrowRounded fontSize="large"/>}
        </IconButton>
        <IconButton disabled={state.cursor === state.list.length - 1}>
          <FastForwardRounded fontSize="large"/>
        </IconButton>
      </div>
    </section>
  </section>
})
