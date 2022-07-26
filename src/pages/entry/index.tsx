import {v4 as uuid} from 'uuid'
import Head from 'next/head'

import {Select, MenuItem, Card, IconButton} from '@mui/material'
import {KeyboardArrowLeftRounded, KeyboardArrowRightRounded, KeyboardDoubleArrowLeftRounded, KeyboardDoubleArrowRightRounded} from '@mui/icons-material'

import {calendar} from '~/mod'
import {useMount, useReducer} from '~/util'

interface Props extends React.DOMAttributes<HTMLElement> {
  year: number
  month: number
  day: number
  week: number
}

export default React.memo(function({year, month, day, week, ...props}: Props) {
  const weekNames = ['日', '一', '二', '三', '四', '五', '六']

  const [state, dispatch] = useReducer({
    year, month, day, week,
    details: {
      gzDay: '',
      gzMonth: '',
      gzYear: '',
      cDay: day
    }
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

  useMount(() => {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    const details = calendar.solar2lunar(year, month, day)

    dispatch({
      year, month, day,
      details: details === -1 ? {} : details
    })
  })

  const {details} = state

  return <section>
    <Head>
      <title>日历</title>
      <meta name="keywords" content="老黄历,农历,日历"/>
    </Head>
    <div className="text-center py-2 lg:py-4 transition-all text-lg text-teal-900">
      <IconButton disabled={state.year === 1901} onClick={() => dispatch({year: state.year - 1})}><KeyboardDoubleArrowLeftRounded/></IconButton>
      <IconButton
        className="mr-2"
        onClick={() => {
          if (state.month === 1) return dispatch({year: Math.max(state.year - 1, 1901), month: 12})
          dispatch({month: state.month - 1})
        }}
      ><KeyboardArrowLeftRounded/></IconButton>
      <Select variant="standard" value={state.year}
        onChange={e => dispatch({year: +e.target.value})}
      >
        {Array.from({length: 201}, (_, i) => <MenuItem key={i} value={1901 + i}>{1901 + i}</MenuItem>)}
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
          if (state.month === 12) return dispatch({year: Math.min(2100, state.year + 1), month: 1})
          dispatch({month: state.month + 1})
        }}
      ><KeyboardArrowRightRounded/></IconButton>
      <IconButton disabled={state.year === 2100} onClick={() => dispatch({year: state.year + 1})}><KeyboardDoubleArrowRightRounded/></IconButton>
    </div>
    <section>
      <section className="max-w-full transition-all grid grid-cols-7 md:max-w-500 mx-auto md:border md:rounded-lg overflow-hidden md:shadow-2xl">
        {Array.from({length: 7}, (_, i) => {
          return <div key={i}
            className="text-center bg-teal-500 text-white py-2"
          >{weekNames[i]}</div>
        })}

        {days.map(({
          day, cYear, cMonth, IDayCn, IMonthCn, festival,
          lunarFestival, isToday, gzYear, gzMonth, gzDay
        }, i) => {
          const color = lunarFestival ? 'text-rose-500' :
            festival ? 'text-sky-500' : 'text-stone-400'

          const child = <React.Fragment>
            <p className="text-lg text-lime-800">{day}</p>
            <p className={`text-xs ${color} overflow-hidden text-ellipsis whitespace-nowrap`}>
              {lunarFestival ? lunarFestival : festival ? festival : IDayCn === '初一' ? IMonthCn : IDayCn}
            </p>
          </React.Fragment>

          return <div key={uuid()}
            onClick={() => {dispatch({details: {gzDay, gzMonth, gzYear, cDay: day}})}}
            className={[
              'text-center', 'py-2',
              'md:px-4', 'transition-all',
              'hover:bg-lime-100', 'cursor-pointer',
              isToday ? 'bg-teal-100' : '',
              cYear ? '' : 'invisible'
            ].join(' ')}
          >{day ? child : ''}</div>
        })}
      </section>
      <Card className={['m-4', 'p-4', 'md:max-w-500', 'md:m-auto', 'md:mt-8'].join(' ')}>
        <p className="text-center text-teal-700">
          <span>{details.gzYear}年</span>
          <span className="ml-2">{details.gzMonth}月</span>
          <span className="ml-2">{details.gzDay}日</span>
        </p>
        <p className="text-emerald-600 mt-4 text-4xl text-center text">{details.cDay}</p>
      </Card>
    </section>
  </section>
})

export async function getServerSideProps() {
  const now = new Date()

  return {
    props: {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate(),
      week: now.getDay()
    }
  }
}
