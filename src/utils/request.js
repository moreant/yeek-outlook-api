/* eslint-disable no-console */
import axios from 'axios'
import store from '@/store'
import { getToken, removeToken } from '@/utils/token'

// create an axios instance
const service = axios.create({
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers.Authorization = 'Bearer ' + getToken()
    }
    return config
  },
  error => {
    if (error.response) {
      console.log('error')
    }
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(

  response => {
    const res = response.data
    return res
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.log('令牌过期')
          removeToken()
      }
      return Promise.reject(error.response.status)
    }
    return Promise.reject(error)
  }

)

export default service
