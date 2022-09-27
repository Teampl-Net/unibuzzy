/* eslint-disable camelcase */
// import { nextTick } from '@vue/runtime-core'
// import store from '..'
const D_UPDATE = {
  namespaced: true,
  state: {
    newAlim: null,
    notiList: []
  },
  getters: {
    GE_NEW_ALIM (state) {
      return state.newAlim
    },
    GE_NEW_NOTI_LIST (state) {
      return state.notiList
    }
  },
  mutations: {
    MU_ADD_NEW_NOTI: (state, payload) => {
      if (state.notiList.length > 20) {
        state.notiList.pop()
      }
      state.notiList.unshift(payload)
    }
  },
  actions: {
    AC_ADD_NEW_NOTI: ({ commit, state }, payload) => {
      if (payload.jobkindId === 'ALIM') { commit('MU_ADD_NEW_NOTI', payload) }
    }
  }
}

export default D_UPDATE
