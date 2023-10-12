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

      /* var notiDate = JSON.parse(payload.creDate)
      var date = new Date()
      date.setFullYear(parseInt(notiDate.year))
      date.setMonth(parseInt(notiDate.monthValue) - 1)
      date.setDate(parseInt(notiDate.dayOfMonth))
      date.setHours(parseInt(notiDate.hour))
      date.setMinutes(parseInt(notiDate.minute))
      date.setSeconds(parseInt(notiDate.second)) */
      payload.D_CRE_DATE = payload.creDate

      if (!payload.clickListYn) {
        try {
          // var notiSetList = state.allNotiList
          // var findIndex = notiSetList.indexOf((item) => item.tag === payload.tag)
          // if (notiSetList.length > 0) {
          //   for (let i = 0; i < notiSetList.length; i++) {
          //     if (notiSetList[i].tag.trim() !== payload.tag.trim()) {
          //       state.allNotiList.unshift(payload)
          //     }
          //   }
          // } else {
          //   state.allNotiList.push(payload)
          // }
          // if (findIndex === -1) {

          // }
          state.allNotiList.unshift(payload)
          var notiSetList = state.allNotiList
          var uniqueArr = notiSetList.reduce(function (data, current) {
            if (data.findIndex(item => item.tag === current.tag) === -1) {
              data.push(current)
            }
            return data
          }, [])
          state.allNotiList = uniqueArr
        } catch (error) {
        }
        // if (findIndex === -1) {
        //   state.allNotiList.unshift(payload)
        // }
        // var notiSetList = state.allNotiList
        // var uniqueArr = notiSetList.reduce(function (data, current) {
        //   if (data.findIndex(item => item.tag === current.tag) === -1) {
        //     data.push(current)
        //   }
        //   return data
        // }, [])
        // state.allNotiList = uniqueArr
      }
    },
    MU_CLEAR_NOTI_LIST: (state, payload) => {
      state.allNotiList = []
    }
  },
  actions: {
    AC_CLEAR_NOTI_LIST: ({ commit, state }, payload) => {
      commit('MU_CLEAR_NOTI_LIST', payload)
    },
    AC_ADD_NEW_NOTI: ({ commit, state }, payload) => {
      commit('MU_ADD_NEW_NOTI', payload)
    },
    AC_ADD_NOTI_LIST: ({ commit, state }, payload) => {
      commit('MU_ADD_NOTI_LIST', payload)
    }
  }
}

export default D_NOTI
