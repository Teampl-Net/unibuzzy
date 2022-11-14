/* eslint-disable camelcase */
// import { nextTick } from '@vue/runtime-core'
// import store from '..'
const D_NOTI = {
  namespaced: true,
  state: {
    newNoti: null,
    notiList: []
  },
  getters: {
    GE_NEW_NOTI (state) {
      return state.newNoti
    },
    GE_NEW_NOTI_LIST (state) {
      return state.notiList
    }
  },
  mutations: {
    MU_ADD_NEW_NOTI: (state, payload) => {
      // alert(JSON.stringify(payload))
      // {notiDetailObj: notiDetailObj, currentPage: currentPage, addVueResult: addVueResult}
      state.newNoti = payload
      state.notiList.unshift(payload)
    }
  },
  actions: {
    AC_ADD_NEW_NOTI: ({ commit, state }, payload) => {
      commit('MU_ADD_NEW_NOTI', payload)
    }
  }
}

export default D_NOTI
