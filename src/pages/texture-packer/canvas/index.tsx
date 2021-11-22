import {MaxRectsPacker, Rectangle} from 'maxrects-packer'

import {createPromise, readFile, useMount, useReducer} from '~/util'
import style from './style.module.scss'


interface Props extends React.PropsWithChildren<React.HTMLAttributes<HTMLElement>> {
  files: File[]
  padding: number
  cropped: boolean
  extruded: number
}

export default React.memo(function({className, files, padding, cropped, extruded, ...props}: Props) {
  const [state, dispatch] = useReducer({
    gap: 0,
  })

  const root = React.useRef<HTMLElement>()
  const canvas = React.useRef<HTMLCanvasElement>()

  const {current: mut} = React.useRef<Partial<{
    ctx: CanvasRenderingContext2D
    packer: MaxRectsPacker<{width: number, height: number, x: number, y: number, sprite: Sprite}>
  }>>({
    packer: new MaxRectsPacker(2048, 2048)
  })

  /**
   * 对图片进行排列
   */
  const layout = (sprites: Sprite[], padding = 0) => {
    const {packer, ctx} = mut

    packer.reset()
    packer.padding = padding
    packer.addArray(sprites.map(sprite => ({
      sprite,
      width: sprite.width,
      height: sprite.height,
      x: 0,
      y: 0
    })))

    let w = 0
    let h = 0

    for (const item of packer.rects) {
      w = Math.max(item.x + item.width, w)
      h = Math.max(item.y + item.height, h)
    }

    canvas.current.width = w
    canvas.current.height = h
    canvas.current.style.width = `${w}px`
    canvas.current.style.height = `${h}px`

    for (const item of packer.rects) {
      ctx.drawImage(item.sprite.canvas, item.x, item.y)
    }
  }

  React.useEffect(() => {
    Promise.all(Array.from(files, file => {
      return new Promise<HTMLImageElement>(async resolve => {
        const img = new Image()
        img.dataset.name = file.name
        img.src = await readFile(file)
        img.onload = () => resolve(img)
      })
    })).then(imgs => {
      let x = 0
      let y = 0
      mut.ctx.clearRect(0, 0, canvas.current.offsetWidth, canvas.current.offsetHeight)
      layout(imgs.map(img => new Sprite({img, cropped, extruded})), padding)
    })
  }, [files, cropped, extruded, padding])

  useMount(() => {
    canvas.current.width = canvas.current.offsetWidth
    canvas.current.height = canvas.current.offsetHeight
    mut.ctx = canvas.current.getContext('2d')

    root.current.addEventListener('contextmenu', onContextmenu)
    root.current.addEventListener('wheel', onWheel)

    return () => {
      root.current.removeEventListener('contextmenu', onContextmenu)
    }
  })

  const onContextmenu = (e: MouseEvent) => {
    e.preventDefault()
  }

  const onWheel = (e: WheelEvent) => {
    e.preventDefault()
    // 无需放缩
    if (!canvas.current.offsetWidth) return
  }

  return <section {...props} ref={root}
    className={[style.root, className].join(' ').trim()}
  >
    <canvas ref={canvas}/>
  </section>
})



class Sprite {
  name: string
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
    this.name = img.dataset.name

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
