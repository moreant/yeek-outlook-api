import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/setting',
    name: 'Setting',
    component: () => import('@/views/Setting.vue')
  },
  {
    path: '/call',
    name: 'Call',
    component: () => import('@/views/Call.vue')
  },
  { path: '*', name: '404', component: () => import('@/views/404.vue') }
]

const router = new VueRouter({
  routes
})

export default router
