import {Select, MenuItem, InputLabel, FormControl} from '@mui/material'

import {calendar} from '~/mod'
import {useMount, useReducer} from '~/util'

export default React.memo(function() {
  const date = new Date()
  const weekNames = ['日', '一', '二', '三', '四', '五', '六']

  const [state, dispatch] = useReducer({
    today: date,
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
      <Select variant="standard" value={state.year}
        onChange={e => dispatch({year: +e.target.value})}
      >
        {Array.from({length: 200}, (_, i) => <MenuItem key={i} value={1900 + i}>{1900 + i}</MenuItem>)}
      </Select>
      <Select variant="standard" value={state.month}
        onChange={e => dispatch({month: +e.target.value})}
        className="ml-4"
      >
        {Array.from({length: 12}, (_, i) => <MenuItem key={i} value={1 + i}>{1 + i}</MenuItem>)}
      </Select>
    </div>
    <section className="grid grid-cols-7 max-w-screen-lg mx-auto lg:border">
      {Array.from({length: 7}, (_, i) => {
        return <div key={i}
          className="text-center bg-teal-500 text-white py-2"
        >{weekNames[i]}</div>
      })}

      {days.map(({day, IDayCn, IMonthCn}, i) => {
        const child = <React.Fragment>
          <p className="text-lg text-lime-800">{day}</p>
          <p className="text-xs text-stone-400">{IDayCn === '初一' ? IMonthCn : IDayCn}</p>
        </React.Fragment>
        return <div key={i} className="text-center py-2">
          {day ? child : ''}
        </div>
      })}
    </section>
  </section>
})
