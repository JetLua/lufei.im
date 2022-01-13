import axios from 'axios'

const net = axios.create({
  withCredentials: true,
  baseURL: 'https://api.lufei.im'
})

// net.interceptors.request.use(ctx => {
//   ctx.headers['Authorization'] = localStorage.token
//   return ctx
// })

net.interceptors.response.use(
  async ({data}) => data
)

export default net
