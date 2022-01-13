import style from './style.module.scss'

export default React.memo(function() {
  return <section className={style.root}>
    <h1>Privacy</h1>
    <p>When you use our services, you’re trusting us with your information. We understand this is a big responsibility and work hard to protect your information and put you in control.</p>
    <p>This Privacy Policy is meant to help you understand what information we collect, why we collect it, and how you can update, manage, export, and delete your information.</p>
  </section>
})
