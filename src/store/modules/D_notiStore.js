/* eslint-disable camelcase */
// import { nextTick } from '@vue/runtime-core'
// import store from '..'
const D_NOTI = {
  namespaced: true,
  state: {
    newNoti: null,
    clickNotiList: [],
    allNotiList: []
  },
  getters: {
    GE_NEW_NOTI (state) {
      return state.newNoti
    },
    GE_NEW_NOTI_LIST (state) {
      return state.clickNotiList
    },
    GE_RECENT_NOTI_LIST (state) {
      return state.allNotiList
    }
  },
  mutations: {
    MU_ADD_NEW_NOTI: (state, payload) => {
      state.newNoti = payload
      state.clickNotiList.unshift(payload)
    },
    MU_ADD_NOTI_LIST: (state, payload) => {
      if (!payload) return
      state.allNotiList.unshift(payload)
      var notiSetList = state.allNotiList
      var uniqueArr = notiSetList.reduce(function (data, current) {
        if (data.findIndex((item) => (item.tag !== current.tag)) === -1) {
          data.push(current)
        }
        return data
      }, [])
      state.allNotiList = uniqueArr
    }
  },
  actions: {
    AC_ADD_NEW_NOTI: ({ commit, state }, payload) => {
      commit('MU_ADD_NEW_NOTI', payload)
    },
    AC_ADD_NOTI_LIST: ({ commit, state }, payload) => {
      commit('MU_ADD_NOTI_LIST', payload)
    }
  }
}

export default D_NOTI
