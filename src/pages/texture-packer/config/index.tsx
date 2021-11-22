import {Checkbox, Input} from '@mui/material'
import style from './style.module.scss'

interface Props extends React.PropsWithChildren<React.HTMLAttributes<HTMLElement>> {
  cropped: boolean
  padding: number
  extruded: number
  onCrop: (ok: boolean) => void
  onExtrude: (extrude: number) => void
  onPad: (padding: number) => void
}

export default React.memo(function({
  className, cropped, onCrop, onExtrude, onPad,
  padding, extruded,
  ...props}: Props) {
  return <section
    {...props}
    className={[style.root, className].join(' ').trim()}
  >
      <i className={style.label}>文件名(File name)</i><Input className={style.input} type="text"/>
      <i className={style.label}>前缀(Prefix)</i><Input className={style.input} type="text"/>
      <i className={style.label}>挤压(Extrude)</i>
      <Input className={style.input} type="number"
        inputProps={{min: 0, step: 1}}
        onChange={e => onExtrude(+e.target.value)}
        defaultValue={extruded}
      />
      <i className={style.label}>边距(Padding)</i>
      <Input className={style.input} type="number"
        inputProps={{min: 0, step: 1}}
        defaultValue={padding}
        onChange={e => onPad(+e.target.value)}
      />
      <i className={style.label}>裁剪(Crop)</i>
      <div><Checkbox sx={{margin: 0, padding: 0}} checked={cropped}
        onChange={(_, ok) => onCrop(ok)}
      /></div>
  </section>
})
