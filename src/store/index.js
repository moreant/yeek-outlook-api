import Vue from 'vue'
import Vuex from 'vuex'
import request from '@/utils/request'
import { setToken, removeToken } from '@/utils/token'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    infos: {
      name: '',
      emailAddress: '',
      photo: {}
    }
  },
  mutations: {
    SET_TOKEN (state, token) {
      state.token = token
    },
    SET_INFO (state, { displayName, EmailAddress }) {
      state.infos.name = displayName
      state.infos.emailAddress = EmailAddress
    },
    SET_PHOTO (state, photo) {
      state.infos.photo = photo
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
          url: 'https://graph.microsoft.com/v1.0/me'
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
