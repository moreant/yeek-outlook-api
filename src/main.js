import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

// import axios from 'axios'
import VueAxios from 'vue-axios'

import './token'
import request from './utils/request'

Vue.use(VueAxios, request)

Vue.config.productionTip = false

console.log(process.env.NODE_ENV)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
