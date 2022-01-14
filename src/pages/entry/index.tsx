import {Icon, IconButton, Slider, SpeedDial, SpeedDialAction, SpeedDialIcon} from '@mui/material'

import {
  FastForwardRounded, FastRewindRounded, PauseRounded, PlayArrowRounded,
  FileUploadRounded, ManageAccountsRounded
} from '@mui/icons-material'

import type {SliderProps} from '@mui/material'

import {useReducer, context, authorize} from '~/util'
import Login from './login'

import style from './style.module.scss'

export default React.memo(function() {
  const [state, dispatch] = useReducer({
    cursor: 1,
    playing: false,
    progress: 0,
    list: [
      {
        name: '等一分钟',
        singer: '徐誉滕',
        album: '《滕·爱》',
        src: 'https://static.safish.org/music/%E7%AD%89%E4%B8%80%E5%88%86%E9%92%9F.mp3',
        cover: 'https://static.safish.org/music/%E7%AD%89%E4%B8%80%E5%88%86%E9%92%9F.cover.jpg'
      },
      {
        name: '挪威的森林',
        singer: '伍佰',
        album: '滚石香港黄金十年 伍佰精选',
        src: 'https://static.safish.org/music/%E6%8C%AA%E5%A8%81%E7%9A%84%E6%A3%AE%E6%9E%97.mp3',
        cover: 'https://static.safish.org/music/%E6%8C%AA%E5%A8%81%E7%9A%84%E6%A3%AE%E6%9E%97.cover.jpg'
      },
      {
        name: '发如雪',
        singer: '周杰伦',
        album: '十一月的萧邦',
        src: 'https://static.safish.org/music/%E5%8F%91%E5%A6%82%E9%9B%AA.mp3',
        cover: 'https://static.safish.org/music/%E5%8F%91%E5%A6%82%E9%9B%AA.cover.jpg'
      },
    ],
    dialog: {
      visible: false
    }
  })

  const ctx = React.useContext(context.context)

  const audio = React.useRef<HTMLAudioElement>()

  const onTimeUpdate = () => {
    const sound = audio.current

    if (!sound) return

    const playing = !sound.ended && !sound.paused

    dispatch({
      playing,
      progress: sound.duration ? sound.currentTime / sound.duration * 100 : 0
    })
  }

  const toggle = () => {
    const sound = audio.current
    const playing = !sound.ended && !sound.paused
    playing ? sound.pause() : sound.play()
    dispatch({playing: !playing})
  }

  const change: SliderProps['onChange'] = (_, v: number) => {
    const sound = audio.current
    sound.currentTime = sound.duration * v / 100
  }

  const item = state.list[state.cursor]

  const actions = [
    {icon: <ManageAccountsRounded/>, name: '账户'},
    {icon: <FileUploadRounded/>, name: '上传'},
  ]

  return <section className={style.root}>
    <audio autoPlay={true}
      src={item.src}
      ref={audio}
      style={{display: 'none'}}
      onTimeUpdate={onTimeUpdate}
      onPause={() => dispatch({playing: false})}
      onCanPlay={() => audio.current.play()}
    />
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
        <IconButton disabled={state.cursor < 1}
          onClick={() => dispatch({cursor: state.cursor - 1, playing: false})}
        ><FastRewindRounded fontSize="large"/></IconButton>
        <IconButton size="large" onClick={toggle}>
          {state.playing ? <PauseRounded fontSize="large"/> : <PlayArrowRounded fontSize="large"/>}
        </IconButton>
        <IconButton disabled={state.cursor === state.list.length - 1}
          onClick={() => dispatch({cursor: state.cursor + 1, playing: false})}
        ><FastForwardRounded fontSize="large"/></IconButton>
      </div>
    </section>

    <SpeedDial ariaLabel="Action"
      sx={{
        position: 'absolute', bottom: 16, right: 16,
        '& .MuiSpeedDial-fab, & .MuiSpeedDial-fab:hover': {
          backgroundColor: '#fff'
        },
        '& svg': {
          fill: '#03a9f4'
        }
      }}
      // icon={ctx.user.avatar ? <SpeedDialIcon/> : <div
      //   onClick={() => authorize('weibo')}
      //   style={{width: '100%', height: '100%'}}
      // ><Icon
      //   className={style['sd-button']}
      //   sx={{backgroundImage: `url(${require('@/public/img/weibo.svg').default.src})`}}
      // ></Icon></div>}
      icon={<SpeedDialIcon/>}
    >
      {
        actions.map((item, i) => {
          return <SpeedDialAction
            key={i}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={() => {
              if (i === 0) dispatch({dialog: {visible: true}})
            }}
          />
        })
      }
    </SpeedDial>

    <Login visible={state.dialog.visible}
      onCancel={() => dispatch({dialog: {visible: false}})}
    />
  </section>
})
