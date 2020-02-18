import Vue from 'vue'
import Vuex from 'vuex'
import { setToken, removeToken } from '@/utils/token'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: ''
  },
  mutations: {
    SET_TOKEN (state, token) {
      state.token = token
    }
  },
  actions: {
    setToken ({ commit }, token) {
      setToken(token)
      commit('SET_TOKEN', token)
    },
    removeToken ({ commit }) {
      removeToken()
      commit('SET_TOKEN', '')
    }
  },
  modules: {
  }
})
