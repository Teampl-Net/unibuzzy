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
          if (payload[i].ELEMENTS) {
            if (!payload[i].ELEMENTS.alimList) {
              payload[i].ELEMENTS.alimList = []
            }
            if (!payload[i].ELEMENTS.commonList) {
              payload[i].ELEMENTS.commonList = { type: 'ALIM', list: [] }
            }
            if ((!payload[i].ELEMENTS.boardList)) {
              payload[i].ELEMENTS.boardList = []
            }
            if ((!payload[i].ELEMENTS.cabinetList)) {
              payload[i].ELEMENTS.cabinetList = []
            }
            if ((!payload[i].ELEMENTS.managerList)) {
              payload[i].ELEMENTS.managerList = []
            }
          } else {
            payload[i].ELEMENTS = {
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
    MU_REPLACE_CHANNEL: (state, payload) => {
      var idx1
      var chanList = state.chanList

      idx1 = chanList.findIndex((item) => item.teamKey === payload.teamKey)
      chanList[idx1] = payload
      state.chanList = chanList
      state.recentChangeTeamKey = payload.teamKey
      return true
    },
    MU_REPLACE_MANAGER: (state, payload) => {
      var idx1, idx2
      var chanList = state.chanList

      idx1 = chanList.findIndex((item) => item.teamKey === payload.creTeamKey)
      var chanDetail = chanList[idx1]

      var dataList = chanDetail.ELEMENTS.managerList
      idx2 = dataList.findIndex((item) => item.managerKey === payload.managerKey)
      dataList[idx2] = payload
      chanDetail.ELEMENTS.managerList = dataList

      chanList[idx1] = chanDetail
      state.chanList = chanList
      state.recentChangeTeamKey = payload.creTeamKey
      return true
    },
    MU_REPLACE_SHOW_PROFILE_USER: (state, payload) => {
      var idx1, idx2
      var chanList = state.chanList

      idx1 = chanList.findIndex((item) => item.teamKey === payload.creTeamKey)
      var chanDetail = chanList[idx1]

      var dataList = chanDetail.ELEMENTS.showProfileUserList
      idx2 = dataList.findIndex((item) => item.followerKey === payload.followerKey)
      dataList[idx2] = payload
      chanDetail.ELEMENTS.showProfileUserList = dataList

      chanList[idx1] = chanDetail
      state.chanList = chanList
      state.recentChangeTeamKey = payload.creTeamKey
      return true
    },
    MU_REPLACE_CONTENTS: (state, payload) => {
      var idx1, idx2
      var dataList
      var chanList = state.chanList

      idx1 = chanList.findIndex((item) => item.teamKey === payload.creTeamKey)
      var chanDetail = chanList[idx1]
      if (payload.jobkindId === 'BOAR') {
        dataList = chanDetail.ELEMENTS.boarList
      } else {
        dataList = chanDetail.ELEMENTS.alimList
      }
      idx2 = dataList.findIndex((item) => item.mccKey === payload.mccKey)
      dataList[idx2] = payload
      if (payload.jobkindId === 'BOAR') {
        chanDetail.ELEMENTS.boarList = dataList
      } else {
        chanDetail.ELEMENTS.alimList = dataList
      }
      chanList[idx1] = chanDetail
      state.chanList = chanList
      state.recentChangeTeamKey = payload.creTeamKey
      return true
    },
    MU_REPLACE_ALIM_CONTENTS: (state, payload) => {
      for (var i = 0; i < payload.length; i++) {
        if (!payload[i].initYn) {
          if (payload[i].ELEMENTS) {
            if (!payload[i].ELEMENTS.alimList) {
              payload[i].ELEMENTS.alimList = []
            }
            if (!payload[i].ELEMENTS.commonList) {
              payload[i].ELEMENTS.commonList = { type: 'ALIM', list: [] }
            }
            if ((!payload[i].ELEMENTS.boardList)) {
              payload[i].ELEMENTS.boardList = []
            }
            if ((!payload[i].ELEMENTS.cabinetList)) {
              payload[i].ELEMENTS.cabinetList = []
            }
            if ((!payload[i].ELEMENTS.managerList)) {
              payload[i].ELEMENTS.managerList = []
            }
          } else {
            payload[i].ELEMENTS = {
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
        if (payload.ELEMENTS) {
          if (!payload.ELEMENTS.alimList) {
            payload.ELEMENTS.alimList = []
          }
          if (!payload.ELEMENTS.commonList) {
            payload.ELEMENTS.commonList = { type: 'ALIM', list: [] }
          }
          if ((!payload.ELEMENTS.boardList)) {
            payload.ELEMENTS.boardList = []
          }
          if ((!payload.ELEMENTS.cabinetList)) {
            payload.ELEMENTS.cabinetList = []
          }
          if ((!payload.ELEMENTS.managerList)) {
            payload.ELEMENTS.managerList = []
          }
        } else {
          payload.ELEMENTS = {
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
    AC_MAIN_CHAN_LIST: ({ commit }, payload) => { // 채널전체 치환
      // eslint-disable-next-line no-debugger
      debugger
      commit('MU_MAIN_CHAN_LIST', payload)
    },
    AC_REPLACE_CONTENTS: ({ commit }, payload) => { // 채널 부분 치환 (ALIM/BOARD)
      commit('MU_REPLACE_CONTENTS', payload)
    },
    AC_REPLACE_SHOW_PROFILE_USER: ({ commit }, payload) => { // 채널 부분 치환 (ALIM/BOARD)
      commit('MU_REPLACE_FOLLOWER', payload)
    },
    AC_REPLACE_MANAGER: ({ commit }, payload) => { // 채널 부분 치환 (ALIM/BOARD)
      commit('MU_REPLACE_FOLLOWER', payload)
    },
    AC_RECENT_CHANGE_TEAM: ({ commit }, payload) => {
      commit('MU_RECENT_CHANGE_TEAM', payload)
    },
    MU_REPLACE_CHANNEL: ({ commit }, payload) => {
      commit('MU_REPLACE_CHANNEL', payload)
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
      for (var i = 0; i < payload.ELEMENTS.commonList.list.length; i++) {
        if (payload.ELEMENTS.commonList.type === 'ALIM') {
          dataList = payload.ELEMENTS.alimList
        } else {
          dataList = payload.ELEMENTS.boardList
        }

        index = dataList.findIndex((item) => item.mccKey === payload.ELEMENTS.commonList.list[i].mccKey)
        if (index >= 0) {
          payload.ELEMENTS.commonList.list[i] = dataList[index]
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
