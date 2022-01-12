import {net, ok, error} from '~/util'

export function user() {
  return net.get<null, Respond<{name: string, avatar: string}>>('/user')
  .then(ok)
  .catch(error)
}
