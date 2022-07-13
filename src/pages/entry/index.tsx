import {} from '@shopify/polaris'

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

  const total = React.useMemo(() => {
    const day = calendar.solarDays(state.year, state.month)
    let week = state.week
    for (let i = state.day; i > 1; i--) {
      week = week === 0 ? 6 : week - 1
    }
    const m = day / 7 | 0
    const n = day % 7

    return {day, week}
  }, [state.year, state.month, state.week, state.day])

  return <section className="grid grid-cols-7">
    {Array.from({length: 7}, (_, i) => {
      return <div key={i}
        className="text-center"
      >{weekNames[i]}</div>
    })}
  </section>
})
