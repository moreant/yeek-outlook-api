import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/',
    redirect: '/home'
  },
  { path: '*', name: '404', component: () => import('@/views/404.vue') }
]

const router = new VueRouter({
  routes
})

export default router
