import {useMount, useReducer} from '~/util'
import style from './style.module.scss'

export default React.memo(function({className, files, ...props}: Props) {
  const [state, dispatch] = useReducer({
    gap: 0,
  })

  const dom = React.useRef<HTMLCanvasElement>()

  const {current: mut} = React.useRef<Partial<{
    ctx: CanvasRenderingContext2D
  }>>({})

  React.useEffect(() => {
    let x = 0
    let y = 0
    for (const file of files) {
      const img = new Image()
      img.src = URL.createObjectURL(file)
      img.onload = () => {
        const {width, height} = img
        console.log(file.name)
        mut.ctx.drawImage(img, x, y)
        x += width
        y += height
        URL.revokeObjectURL(img.src)
      }
    }
  }, [files])

  useMount(() => {
    dom.current.width = dom.current.offsetWidth
    dom.current.height = dom.current.offsetHeight
    mut.ctx = dom.current.getContext('2d')
  })

  return <section
    {...props}
    className={[style.root, className].join(' ').trim()}
  >
    <canvas ref={dom}/>
  </section>
})

interface Props extends React.PropsWithChildren<React.HTMLAttributes<HTMLElement>> {
  files: File[]
}
