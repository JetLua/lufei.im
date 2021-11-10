import {createPromise, readFile, useMount, useReducer} from '~/util'
import style from './style.module.scss'

export default React.memo(function({className, files, cropped, extruded, ...props}: Props) {
  const [state, dispatch] = useReducer({
    gap: 0,
  })

  const dom = React.useRef<HTMLCanvasElement>()

  const {current: mut} = React.useRef<Partial<{
    ctx: CanvasRenderingContext2D
  }>>({})

  React.useEffect(() => {
    Promise.all(Array.from(files, file => {
      return new Promise<HTMLImageElement>(async resolve => {
        const img = new Image()
        img.src = await readFile(file)
        img.onload = () => resolve(img)
      })
    })).then(imgs => {
      let x = 0
      let y = 0
      mut.ctx.clearRect(0, 0, dom.current.offsetWidth, dom.current.offsetHeight)
      for (const img of imgs) {
        const sprite = new Sprite({img, cropped, extruded})
        mut.ctx.drawImage(sprite.canvas, x, y)
        x += sprite.width
        y += sprite.height
      }
    })
  }, [files, cropped, extruded])

  useMount(() => {
    dom.current.width = dom.current.offsetWidth
    dom.current.height = dom.current.offsetHeight
    mut.ctx = dom.current.getContext('2d')
  })

  return <section {...props}
    className={[style.root, className].join(' ').trim()}
  >
    <canvas ref={dom}/>
  </section>
})

interface Props extends React.PropsWithChildren<React.HTMLAttributes<HTMLElement>> {
  cropped: boolean
  extruded: number
  files: File[]
}

class Sprite {
  raw: HTMLImageElement
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D

  get width() {
    return this.canvas.width
  }

  get height() {
    return this.canvas.height
  }

  constructor({img, cropped, extruded}: {img: HTMLImageElement, cropped?: boolean, extruded?: number}) {
    const canvas = this.canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height

    this.ctx = canvas.getContext('2d')
    this.raw = img

    if (cropped) this.crop()
    else this.ctx.drawImage(img, 0, 0)

    extruded && this.extrude(extruded)
  }

  extrude(size: number) {
    const {canvas, ctx, width, height} = this

    const data = ctx.getImageData(0, 0, width, height)
    const top = ctx.getImageData(0, 0, width, 1)
    const left = ctx.getImageData(0, 0, 1, height)
    const right = ctx.getImageData(width - 1, 0, 1, height)
    const bottom = ctx.getImageData(0, height - 1, width, 1)

    canvas.width += size * 2
    canvas.height += size * 2

    // top
    for (let i = 0; i < size; i++) {
      ctx.putImageData(top, size, i)
    }
    // left
    for (let i = 0; i < size; i++) {
      ctx.putImageData(left, i, size)
    }
    // right
    for (let i = canvas.width - 1; i >= canvas.width - size; i--) {
      ctx.putImageData(right, i, size)
    }
    // bottom
    for (let i = canvas.height - 1; i >= canvas.height - size; i--) {
      ctx.putImageData(bottom, size, i)
    }

    ctx.putImageData(data, size, size)
  }

  crop() {
    const {ctx, width, height, raw, canvas} = this
    ctx.drawImage(raw, 0, 0)
    // left
    let left = 0
    loop: for (let x = 0; x < width; x++) {
      const {data} = ctx.getImageData(x, 0, 1, height)
      for (let i = 3; i < data.length; i += 4) {
        if (data[i]) {
          left = x
          break loop
        }
      }
    }

    // right
    let right = width
    loop: for (let x = width - 1; x > -1; x--) {
      const {data} = ctx.getImageData(x, 0, 1, height)
      for (let i = 3; i < data.length; i += 4) {
        if (data[i]) {
          right = x + 1
          break loop
        }
      }
    }

    let top = 0
    loop: for (let y = 0; y < height; y++) {
      const {data} = ctx.getImageData(0, y , width, 1)
      for (let i = 3; i < data.length; i += 4) {
        if (data[i]) {
          top = y
          break loop
        }
      }
    }

    let bottom = height
    loop: for (let y = height - 1; y > -1; y--) {
      const {data} = ctx.getImageData(0, y , width, 1)
      for (let i = 3; i < data.length; i += 4) {
        if (data[i]) {
          bottom = y + 1
          break loop
        }
      }
    }

    const w = right - left
    const h = bottom - top

    canvas.width = w
    canvas.height = h

    ctx.drawImage(this.raw, left, top, w, h, 0, 0, w, h)
  }
}
