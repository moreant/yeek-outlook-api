import Vue from 'vue'
import Vuex from 'vuex'
import request from '@/utils/request'
import { setToken, removeToken } from '@/utils/token'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    infos: {
      alias: '',
      emailAddress: ''
    }
  },
  mutations: {
    SET_TOKEN (state, token) {
      state.token = token
    },
    SET_INFO (state, { Alias, EmailAddress }) {
      state.infos.alias = Alias
      state.infos.emailAddress = EmailAddress
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
    },
    getInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        request({
          method: 'get',
          url: 'https://outlook.office.com/api/v2.0/me/photo/$value'
        })
        request({
          method: 'get',
          url: 'https://outlook.office.com/api/v2.0/me'
        }).then(response => {
          commit('SET_INFO', response)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  },
  modules: {
  }
})
