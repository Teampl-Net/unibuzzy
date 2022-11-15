/* eslint-disable camelcase */
import { nextTick } from '@vue/runtime-core'
import store from '../../store'
const D_CONTENTS = {
  namespaced: true,
  state: {
    alimList: [],
    boardList: [],
    teamList: [],
    changeContentsKey: null
  },
  getters: {
    GE_MAIN_ALIM_LIST (state) {
      nextTick(() => {
        var dataList = store.getters['D_CHANNEL/GE_MAIN_CHAN_LIST']
        var chanDetail = null
        if (dataList) {
          for (var i = 0; i < state.alimList.length; i++) {
            var index = dataList.findIndex((item) => item.teamKey === state.alimList[i].creTeamKey)
            if (index >= 0) {
              chanDetail = dataList[index]
              var chanBoardList = chanDetail.ELEMENTS.alimList
              index = chanBoardList.findIndex((item) => item.mccKey === state.alimList[i].mccKey)
              if (index >= 0) {
                state.alimList[i] = chanBoardList[index]
              }
            }
          }
        }
        return state.alimList
      })
    },
    GE_MAIN_BOARD_LIST (state) {
      var dataList = store.getters['D_CHANNEL/GE_MAIN_CHAN_LIST']
      var chanDetail = null
      if (dataList) {
        for (var i = 0; i < state.boardList.length; i++) {
          var index = dataList.findIndex((item) => item.teamKey === state.boardList[i].creTeamKey)
          if (index >= 0) {
            chanDetail = dataList[index]
            var chanBoardList = chanDetail.ELEMENTS.boardList
            index = chanBoardList.findIndex((item) => item.mccKey === state.boardList[i].mccKey)
            if (index >= 0) {
              state.boardList[i] = chanBoardList[index]
            }
          }
        }
      }
      return state.boardList
    },
    GE_MAIN_TEAM_LIST (state) {
      return state.teamList
    },
    GE_RECENT_CHANGE_CONTENTS (state) {
      return state.changeContentsKey
    }
  },
  mutations: {
    MU_MAIN_ALIM_LIST: (state, payload) => {
      state.alimList = payload
    },
    MU_MAIN_BOARD_LIST: (state, payload) => {
      state.boardList = payload
    },
    MU_MAIN_TEAM_LIST: (state, payload) => {
      state.teamList = payload
    },
    MU_RECENT_CHANGE_CONTENTS: (state, payload) => {
      state.changeContentsKey = 0
      state.changeContentsKey = payload
    }
  },
  actions: {
    AC_MAIN_ALIM_LIST: ({ commit, state }, payload) => {
      commit('MU_MAIN_ALIM_LIST', payload)
    },
    AC_MAIN_BOARD_LIST: ({ commit }, payload) => {
      commit('MU_MAIN_BOARD_LIST', payload)
    },
    getContentsDetail: ({ commit, state }, payload) => {
      var dataList = store.getters['D_CHANNEL/GE_MAIN_CHAN_LIST']
      if (dataList) {
        for (var i = 0; i < payload.length; i++) {
          var index = dataList.findIndex((item) => item.teamKey === payload[i].teamKey)
          if (index >= 0) {
            payload[i] = dataList[index]
          }
        }
      }
      commit('MU_MAIN_TEAM_LIST', payload)
    }
  }
}

export default D_CONTENTS
