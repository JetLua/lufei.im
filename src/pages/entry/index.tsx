import {Select, MenuItem, InputLabel, FormControl, Button, IconButton} from '@mui/material'
import {KeyboardArrowLeftRounded, KeyboardArrowRightRounded, KeyboardDoubleArrowLeftRounded, KeyboardDoubleArrowRightRounded} from '@mui/icons-material'

import {calendar} from '~/mod'
import {useMount, useReducer} from '~/util'

export default React.memo(function() {
  const date = new Date()

  const weekNames = ['日', '一', '二', '三', '四', '五', '六']

  const [state, dispatch] = useReducer({
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    week: date.getDay()
  })

  const today = React.useMemo(() => {
    return new Date(`${state.year}/${state.month}/${state.day}`)
  }, [state.year, state.month, state.day])

  const days = React.useMemo(() => {
    const day = today.getDate()
    const total = calendar.solarDays(today.getFullYear(), today.getMonth() + 1)

    let week = today.getDay()

    for (let i = day; i > 1; i--) {
      week = week === 0 ? 6 : week - 1
    }

    const days = [] as Array<{day?: number} & Partial<Exclude<ReturnType<typeof calendar.solar2lunar>, number>>>

    for (let i = 0; i < week; i++) {
      days.push({day: null})
    }

    for (let i = 1; i <= total; i++) {
      const info = calendar.solar2lunar(state.year, state.month, i)
      info === -1 ? days.push({day: i}) : days.push({day: i, ...info})
    }

    return days
  }, [today])

  return <section>
    <div className="text-center py-2 lg:py-4 transition-all text-lg text-teal-900">
      <IconButton disabled={state.year === 1900} onClick={() => dispatch({year: state.year - 1})}><KeyboardDoubleArrowLeftRounded/></IconButton>
      <IconButton
        className="mr-2"
        onClick={() => {
          if (state.month === 1) return dispatch({year: state.year - 1, month: 12})
          dispatch({month: state.month - 1})
        }}
      ><KeyboardArrowLeftRounded/></IconButton>
      <Select variant="standard" value={state.year}
        onChange={e => dispatch({year: +e.target.value})}
      >
        {Array.from({length: 201}, (_, i) => <MenuItem key={i} value={1900 + i}>{1900 + i}</MenuItem>)}
      </Select>
      <Select variant="standard" value={state.month}
        onChange={e => dispatch({month: +e.target.value})}
        className="ml-4"
      >
        {Array.from({length: 12}, (_, i) => <MenuItem key={i} value={1 + i}>{1 + i}</MenuItem>)}
      </Select>
      <IconButton
        className="ml-2"
        onClick={() => {
          if (state.month === 12) return dispatch({year: state.year + 1, month: 1})
          dispatch({month: state.month + 1})
        }}
      ><KeyboardArrowRightRounded/></IconButton>
      <IconButton disabled={state.year === 2100} onClick={() => dispatch({year: state.year + 1})}><KeyboardDoubleArrowRightRounded/></IconButton>
    </div>
    <section className="max-w-full transition-all grid grid-cols-7 md:max-w-screen-md mx-auto md:border md:rounded-lg overflow-hidden md:shadow-2xl" style={{maxWidth: 500}}>
      {Array.from({length: 7}, (_, i) => {
        return <div key={i}
          className="text-center bg-teal-500 text-white py-2"
        >{weekNames[i]}</div>
      })}

      {days.map(({day, IDayCn, IMonthCn, festival, lunarFestival, isToday}, i) => {
        const color = lunarFestival ? 'text-rose-500' :
          festival ? 'text-sky-500' : 'text-stone-400'
        const child = <React.Fragment>
          <p className="text-lg text-lime-800">{day}</p>
          <p className={`text-xs ${color} overflow-hidden text-ellipsis whitespace-nowrap`}>
            {lunarFestival ? lunarFestival : festival ? festival : IDayCn === '初一' ? IMonthCn : IDayCn}
          </p>
        </React.Fragment>
        return <div key={i} className={`text-center py-2 md:px-4 transition-all hover:bg-lime-100 cursor-pointer ${isToday ? 'bg-teal-100' : ''}`}>
          {day ? child : ''}
        </div>
      })}
    </section>
  </section>
})
