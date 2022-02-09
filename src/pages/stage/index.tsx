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
    <Player
      autoplay loop
      src="AnimatedSticker.json"
    />
  </section>
})
