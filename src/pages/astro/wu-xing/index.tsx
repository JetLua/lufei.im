import {SVG} from '@svgdotjs/svg.js'
import {useMount} from '~/util'

import style from './style.module.scss'

export default React.memo(function() {
  const dom = React.useRef<HTMLElement>()

  useMount(() => {
    const svg = SVG().addTo(dom.current).viewbox(0, 0, 400, 400)
    const R = 150
    const properties = [
      {text: '木', bg: '#98ee99'},
      {text: '火', bg: '#ff6090'},
      {text: '土', bg: '#a98274'},
      {text: '金', bg: '#eeeeee'},
      {text: '水', bg: '#b3e5fc'},
    ]



    const translates = properties.map((item, i) => {
      const g = svg.group()
      const r = 50
      const text = svg.text(item.text).font({fill: '#333', size: 20, align: 'middle'})
      const c =  svg.circle(r).fill(svg.gradient('radial', add => {
        add.stop(0, '#fff')
        add.stop(1, item.bg)
      }))

      {
        const {width, cy, y} = text.bbox()
        text
          .dx((r - width) / 2)
          .dy((-y + cy + r) / 2)
      }

      const translate: [number, number] = [
        -r / 2 + Math.sin(i * Math.PI / 2.5) * R + 200,
        -r / 2 + 200 - Math.cos(i * Math.PI / 2.5) * R
      ]

      g
        .add(c)
        .add(text)
        .transform({
          translate,
          origin: 'center center',
        })

      return translate
    })

    const gradient = svg.gradient('linear', add => {
      add.stop(0, '#bbdefb')
        .animate(1e3, 1e3)
        .attr({'stop-color': '#f06292'})
        .loop({
          swing: true,
          wait: 2e3,
          when: 'after',
          times: Infinity,
          duration: 1e3,
          delay: 0
        })


      add.stop(.5, '#bbdefb')
        .animate(1e3, 2e3)
        .attr({'stop-color': '#f06292'})
        .loop({
          swing: true,
          wait: 2e3,
          when: 'after',
          times: Infinity,
          duration: 1e3,
          delay: 0
        })


      add.stop(1, '#bbdefb')
        .animate(1e3, 3e3)
        .attr({'stop-color': '#f06292'})
        .loop({
          swing: true,
          wait: 2e3,
          when: 'after',
          times: Infinity,
          duration: 1e3,
          delay: 0
        })

    })


    for (let i = 0; i < translates.length; i++) {
      const j = i === translates.length - 1 ? 0 : i + 1
      const x = (translates[i][0] + translates[j][0]) / 2 + 25
      const y = (translates[i][1] + translates[j][1]) / 2 + 25

      svg.polygon('-56,-2 44,-2, 44,-7, 56,0, 44,7, 44,2, -56,2 -56,-2')
        .stroke({color: 'none'})
        .fill(gradient)
        .transform({
          rotate: 36 + i * 72,
          translate: [x, y]
        })
        // .attr({fill: gradient})
    }

    return () => svg.remove()
  })

  return <section ref={dom} className={['w-fit', 'm-auto', style.root].join(' ')}>

  </section>
})
