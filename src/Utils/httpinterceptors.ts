import axios from 'axios'
import { getToken } from '../Components/Auth/handleJWT'

 const configureInterceptor = () => {
  axios.interceptors.request.use(
    (config) => {
      const token = getToken()
      if (token) {
        if (config) {
        }
        config.headers!.Authorization = `Bearer ${token}`
      }

      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
}

export default configureInterceptor
