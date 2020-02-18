import router from './router'
import store from './store'
import { getToken } from '@/utils/token'

router.beforeEach(async (to, from, next) => {
  if ((to.path.indexOf('access_token') === 1)) {
    const accessToken = /(?<=access_token=).+(?=&token_type)/.exec(to.path)
    await store.dispatch('setToken', accessToken[0])
    next({ path: '/setting' })
  }
  next()
})
