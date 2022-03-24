import {Player, Controls} from '@lottiefiles/react-lottie-player'

import {useMount, useReducer} from '~/util'

export default React.memo(function() {
  const [state, dispatch] = useReducer({
    list: [
      {title: 'First Step', desc: 'Place the brush vertically on the elastic net and gently pick up the powder.', img: 'https://cdn.shopify.com/s/files/1/0528/2486/7015/files/13.jpg?v=1645697258'},
      {title: 'Second Step', desc: 'Gently rub the brush on the back of your hand to buff off any excessive powder.', img: 'https://cdn.shopify.com/s/files/1/0528/2486/7015/files/14.jpg?v=1645699853'},
      {title: 'Third Step', desc: 'Apply the powder brush to the skin surface of the hand and spread it evenly on the face.', img: 'https://cdn.shopify.com/s/files/1/0528/2486/7015/files/15_480x480.jpg?v=1645700441'}
    ]
  })

  useMount(() => {
    document.body.classList.add('white')
    return () => document.body.classList.remove('white')
  })

  return <section>
    {
      state.list.map((item, i) => {
        return <section key={i} style={{display: 'flex', marginBottom: 16, alignItems: 'center'}}>
          <div style={{flex: 1}}><img style={{width: '100%', margin: 0}} src={item.img}/></div>
          <div style={{flex: 1, padding: '16px 24px'}}>
            <p><b>{item.title}</b></p>
            <p>{item.desc}</p>
          </div>
        </section>
      })
    }
  </section>
})
