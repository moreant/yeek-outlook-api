import router from './router'
import store from './store'
import { getToken } from '@/utils/token'

router.beforeEach(async (to, from, next) => {
  document.title = 'Yeek Outlokk API'

  console.log(to.path)
  if ((to.path.indexOf('access_token') === 1)) {
    const accessToken = /(?<=access_token=).+?(?=&)/.exec(to.path)
    await store.dispatch('setToken', accessToken[0])
    window.location.replace('/#/home')
  }

  if (getToken()) {
    if (store.state.infos.name) {
      next()
    } else {
      await store.dispatch('getInfo')
      next()
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})
