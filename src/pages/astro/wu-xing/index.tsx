import {SVG} from '@svgdotjs/svg.js'
import {useMount} from '~/util'


export default React.memo(function() {
  const dom = React.useRef<HTMLElement>()

  useMount(() => {
    const svg = SVG().addTo(dom.current).size(400, 400).viewbox(0, 0, 400, 400)
    const R = 150
    const properties = [
      {text: '木', bg: '#98ee99', color: '#212121'},
      {text: '火', bg: '#ff6090', color: '#fff'},
      {text: '土', bg: '#a98274', color: '#fff'},
      {text: '金', bg: '#eee', color: '#212121'},
      {text: '水', bg: '#212121', color: '#fff'},
    ]

    svg
      .circle(300)
      .stroke({color: 'red'})
      .fill({color: 'transparent'})
      .transform({translate: [50, 50]})

    properties.forEach((item, i) => {


      const g = svg.group()
      const r = 50
      const text = svg.text(item.text).font({fill: item.color, size: 20, align: 'middle'})
      const c =  svg.circle(r).fill(item.bg)


      {
        const {width, cy, y} = text.bbox()
        text
          .dx((r - width) / 2)
          .dy((-y + cy + r) / 2)
      }

      g
        .add(c)
        .add(text)
        .transform({
          origin: 'center center',
          translate: [
            -r / 2 + Math.sin(i * Math.PI / 2.5) * R + 200,
            -r / 2 + 200 - Math.cos(i * Math.PI / 2.5) * R
          ]
        })
    })

    return () => svg.remove()
  })

  return <section ref={dom} className="w-fit m-auto">

  </section>
})
