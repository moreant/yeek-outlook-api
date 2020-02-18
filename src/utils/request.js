/* eslint-disable no-console */
import axios from 'axios'
import store from '@/store'
import { getToken } from '@/utils/token'

// create an axios instance
const service = axios.create({
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.state.token) {
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
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.log('令牌过期')
      }
    }
    return Promise.reject(error)
  }
)

export default service
