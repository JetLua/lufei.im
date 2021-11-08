import style from './style.module.scss'

export default React.memo(function(props: Props) {
  return <section className={style.root}
    style={{...props.style}}
  >
    folder
  </section>
})

interface Props extends React.PropsWithChildren<React.HTMLAttributes<HTMLElement>> {
  // style?: React.CSSProperties
}
