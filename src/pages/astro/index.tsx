import Head from 'next/head'
import {useMount} from '~/util'

import WuXing from './wu-xing'

export default React.memo(function() {


  return <section>
    <Head>
      <title>神机妙算</title>
      <meta name="keywords" content="八字,奇门遁甲"/>
    </Head>

    <WuXing/>
  </section>
})
