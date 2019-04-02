import axios from 'axios'
import store from '../Redux/store'

const service = axios.create({
  timeout: 5000 // request timeout
})

// request interceptor
// service.interceptors.request.use(config => {
//   let taken = store.getState().lang;
//   return config
// })

service.interceptors.response.use(
  response => response,
  response => {
    const res = response.data
  }
)

export default service