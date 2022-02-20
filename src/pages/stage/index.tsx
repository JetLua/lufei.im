import {Player, Controls} from '@lottiefiles/react-lottie-player'

import {useMount, useReducer} from '~/util'

export default React.memo(function() {
  const [state, dispatch] = useReducer({

  })

  useMount(() => {
    document.body.classList.add('white')
    return () => document.body.classList.remove('white')
  })

  return <section>
    <section style={{display: 'flex', marginBottom: 16}}>
      <div style={{flex: 1}}><img style={{width: '100%'}} src="https://cdn.shopify.com/s/files/1/0528/2486/7015/files/2282.png"/></div>
      <div style={{flex: 1, padding: '16px 24px'}}>
        <p><b>First</b></p>
        <p>Apply a generous amount of <a href="https://florasis.com/products/coverage-foundation?_pos=2&_sid=e688b2e74&_ss=r">foundation</a> onto the face.</p>
      </div>
    </section>
    <section>
      <section style={{display: 'flex'}}>
        <div style={{flex: 1}}><img style={{width: '100%'}} src="https://cdn.shopify.com/s/files/1/0528/2486/7015/files/2655.png"/></div>
        <div style={{flex: 1, padding: '16px 24px'}}>
          <p><b>Second</b></p>
          <p>Use the brush directly onto face using circular motion to follow the texture of the skin and disperse the foundation evenly onto the whole face in order to cover quickly large areas.</p>
        </div>
      </section>
    </section>
  </section>
})
