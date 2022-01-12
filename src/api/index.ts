import {net, ok, error} from '~/util'

export function getUser() {
  return net.get<null, Respond<{name: string, avatar: string}>>('/user')
  .then(ok)
  .catch(error)
}

export function quit() {
  return net.get<null, Respond>('/quit').then(ok).catch(error)
}
