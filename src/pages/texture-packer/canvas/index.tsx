import style from './style.module.scss'

export default React.memo(function({className, ...props}: Props) {
  return <section
    {...props}
    className={[style.root, className].join(' ').trim()}
  >
    canvas
  </section>
})

interface Props extends React.PropsWithChildren<React.HTMLAttributes<HTMLElement>> {

}
