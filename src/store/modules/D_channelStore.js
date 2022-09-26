/* eslint-disable camelcase */

const D_CHANNEL = {
  namespaced: true,
  state: {
    chanList: [],
    recentChangeTeamKey: null
  },
  getters: {
    GE_MAIN_CHAN_LIST (state) {
      return state.chanList
    },
    GE_RECENT_CHANGE_TEAM (state) {
      return state.recentChangeTeamKey
    }
  },
  mutations: {
    MU_MAIN_CHAN_LIST: (state, payload) => {
      for (var i = 0; i < payload.length; i++) {
        if (!payload[i].initYn) {
          if (payload[i].D_CHAN_ELEMENT) {
            if (!payload[i].D_CHAN_ELEMENT.alimList) {
              payload[i].D_CHAN_ELEMENT.alimList = []
            }
            if (!payload[i].D_CHAN_ELEMENT.commonList) {
              payload[i].D_CHAN_ELEMENT.commonList = { type: 'ALIM', list: [] }
            }
            if ((!payload[i].D_CHAN_ELEMENT.boardList)) {
              payload[i].D_CHAN_ELEMENT.boardList = []
            }
            if ((!payload[i].D_CHAN_ELEMENT.cabinetList)) {
              payload[i].D_CHAN_ELEMENT.cabinetList = []
            }
            if ((!payload[i].D_CHAN_ELEMENT.managerList)) {
              payload[i].D_CHAN_ELEMENT.managerList = []
            }
          } else {
            payload[i].D_CHAN_ELEMENT = {
              alimList: [],
              boardList: [],
              cabinetList: [],
              commonList: { type: 'ALIM', list: [] },
              managerList: []
            }
          }
          if (payload[i].CABI_QUEUE) {
          } else {
            payload[i].CABI_QUEUE = []
          }

          if (payload[i].CONT_QUEUE) {
          } else {
            payload[i].CONT_QUEUE = []
          }
          if (!payload[i].D_CHAN_AUTH) {
            payload[i].D_CHAN_AUTH = {
              followerTypeText: '',
              followYn: false,
              recvAlimYn: false,
              showProfileYn: false,
              userGrade: '',
              ownerYn: false,
              ownYn: false,
              managerYn: false,
              memberYn: false
            }
            payload[i].initYn = false
          } else {
            payload[i].initYn = true
          }
        }
      }
      state.chanList = payload
      return true
    },
    MU_ADD_MAIN_CHAN_LIST: (state, payload) => {
      if (!payload.initYn) {
        if (payload.D_CHAN_ELEMENT) {
          if (!payload.D_CHAN_ELEMENT.alimList) {
            payload.D_CHAN_ELEMENT.alimList = []
          }
          if (!payload.D_CHAN_ELEMENT.commonList) {
            payload.D_CHAN_ELEMENT.commonList = { type: 'ALIM', list: [] }
          }
          if ((!payload.D_CHAN_ELEMENT.boardList)) {
            payload.D_CHAN_ELEMENT.boardList = []
          }
          if ((!payload.D_CHAN_ELEMENT.cabinetList)) {
            payload.D_CHAN_ELEMENT.cabinetList = []
          }
          if ((!payload.D_CHAN_ELEMENT.managerList)) {
            payload.D_CHAN_ELEMENT.managerList = []
          }
        } else {
          payload.D_CHAN_ELEMENT = {
            commonList: { type: 'ALIM', list: [] },
            alimList: [],
            boardList: [],
            cabinetList: [],
            managerList: []
          }
        }

        if (!payload.D_CHAN_AUTH) {
          payload.D_CHAN_AUTH = {
            followerTypeText: '',
            followYn: false,
            recvAlimYn: false,
            showProfileYn: false,
            userGrade: '',
            ownerYn: false,
            ownYn: false,
            managerYn: false,
            memberYn: false
          }
          payload.initYn = false
        } else {
          payload.initYn = true
        }
      }
      state.chanList.push(payload)
      return true
    },
    MU_RECENT_CHANGE_TEAM: (state, payload) => {
      console.log('UPDATE_CHANGE_TEAM: ' + payload)
      state.recentChangeTeamKey = 0
      state.recentChangeTeamKey = payload
    }
  },
  actions: {
    AC_MAIN_CHAN_LIST: ({ commit }, payload) => {
      // eslint-disable-next-line no-debugger
      debugger
      commit('MU_MAIN_CHAN_LIST', payload)
    },
    AC_RECENT_CHANGE_TEAM: ({ commit }, payload) => {
      commit('MU_RECENT_CHANGE_TEAM', payload)
    },
    /* AC_RECENT_CHANGE_TEAM: ({ commit }, payload) => {
      commit('MU_RECENT_CHANGE_TEAM', payload)
    }, */
    AC_GET_CHAN_DETAIL ({ state }, payload) {
      var list = state.chanList
      for (var i = 0; i < list.length; i++) {
        if (list[i].teamKey === payload.targetKey) {
          return list[i]
        }
      }
    },
    AC_SET_CHAN_CONT_LIST ({ state, commit }, payload) {
      var index
      var dataList
      for (var i = 0; i < payload.D_CHAN_ELEMENT.commonList.list.length; i++) {
        if (payload.D_CHAN_ELEMENT.commonList.type === 'ALIM') {
          dataList = payload.D_CHAN_ELEMENT.alimList
        } else {
          dataList = payload.D_CHAN_ELEMENT.boardList
        }

        index = dataList.findIndex((item) => item.mccKey === payload.D_CHAN_ELEMENT.commonList.list[i].mccKey)
        if (index >= 0) {
          payload.D_CHAN_ELEMENT.commonList.list[i] = dataList[index]
        }
      }
      var channelList = state.chanList
      index = channelList.findIndex((item) => item.teamKey === payload.teamKey)
      channelList[index] = payload
      // eslint-disable-next-line no-debugger
      debugger
      commit('MU_MAIN_CHAN_LIST', channelList)
    }
  }
}

export default D_CHANNEL
