/* eslint-disable camelcase */

// import { methods } from '../../../public/commonAssets/Tal_axiosFunction'
import { commonMethods } from '../../assets/js/Tal_common'
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
        var team = payload[i]
        if (team.ELEMENTS) {
          if (!team.ELEMENTS.alimList) {
            team.ELEMENTS.alimList = []
          }
          if (!team.ELEMENTS.commonList) {
            team.ELEMENTS.commonList = { type: 'ALIM', list: [] }
          }
          if ((!team.ELEMENTS.boardList)) {
            team.ELEMENTS.boardList = []
          }
          if ((!team.ELEMENTS.cabinetList)) {
            team.ELEMENTS.cabinetList = []
          }
          if ((!team.ELEMENTS.managerList)) {
            team.ELEMENTS.managerList = []
          }
        } else {
          team.ELEMENTS = {
            alimList: [],
            boardList: [],
            cabinetList: [],
            commonList: { type: 'ALIM', list: [] },
            managerList: []
          }
        }
        team.teamTypeText = commonMethods.teamTypeString(team.teamType)
        // var title = '[더알림]' + commonMethods.changeText(team.nameMtext)
        // var message = commonMethods.changeText(team.memoMtext)
        // team.copyTextStr = await commonMethods.makeShareLink(team.teamKey, 'chanDetail', message, title)

        // eslint-disable-next-line no-new-object
        var D_CHAN_AUTH = {}
        D_CHAN_AUTH.recvAlimYn = true
        if (team.userTeamInfo !== undefined && team.userTeamInfo !== null && team.userTeamInfo !== '') {
          if (team.userTeamInfo.notiYn === false || Number(team.userTeamInfo.notiYn) === 0) {
            D_CHAN_AUTH.recvAlimYn = team.userTeamInfo.notiYn
          }
          if (team.userTeamInfo.showProfileYn === 1) {
            D_CHAN_AUTH.showProfileYn = true
            D_CHAN_AUTH.userGrade = '(공개)'
          }
          D_CHAN_AUTH.followYn = true
          team.detailShowYn = false
          D_CHAN_AUTH.followTypeText = '구독자'
          if (team.userTeamInfo.managerKey !== undefined && team.userTeamInfo.managerKey !== null && team.userTeamInfo.managerKey !== '') {
            if (team.userTeamInfo.ownerYn === true || team.userTeamInfo.ownerYn === 'true') {
              D_CHAN_AUTH.followTypeText = '소유자'
              D_CHAN_AUTH.userGrade = '(관리자)'
              D_CHAN_AUTH.ownerYn = true
              D_CHAN_AUTH.admYn = true
            } else {
              D_CHAN_AUTH.followTypeText = '관리자'
              D_CHAN_AUTH.userGrade = '(매니저)'
            }
            D_CHAN_AUTH.adminYn = true
          }
        }

        team.D_CHAN_AUTH = D_CHAN_AUTH
        payload[i] = team
      }

      state.chanList = payload
      return true
    },
    MU_ADD_CHANNEL: (state, payload) => {
      var index
      for (var i = 0; i < payload.length; i++) {
        var team = payload[i]
        index = state.chanList.findIndex((item) => item.teamKey === team.teamKey)
        if (index === -1) {
          if (team.ELEMENTS) {
            if (!team.ELEMENTS.alimList) {
              team.ELEMENTS.alimList = []
            }
            if (!team.ELEMENTS.commonList) {
              team.ELEMENTS.commonList = { type: 'ALIM', list: [] }
            }
            if ((!team.ELEMENTS.boardList)) {
              team.ELEMENTS.boardList = []
            }
            if ((!team.ELEMENTS.cabinetList)) {
              team.ELEMENTS.cabinetList = []
            }
            if ((!team.ELEMENTS.managerList)) {
              team.ELEMENTS.managerList = []
            }
          } else {
            team.ELEMENTS = {
              alimList: [],
              boardList: [],
              cabinetList: [],
              commonList: { type: 'ALIM', list: [] },
              managerList: []
            }
          }
          team.teamTypeText = commonMethods.teamTypeString(team.teamType)
          // var title = '[더알림]' + commonMethods.changeText(team.nameMtext)
          // var message = commonMethods.changeText(team.memoMtext)
          // team.copyTextStr = await commonMethods.makeShareLink(team.teamKey, 'chanDetail', message, title)

          // eslint-disable-next-line no-new-object
          var D_CHAN_AUTH = {}
          D_CHAN_AUTH.recvAlimYn = true
          if (team.userTeamInfo !== undefined && team.userTeamInfo !== null && team.userTeamInfo !== '') {
            if (team.userTeamInfo.notiYn === false || Number(team.userTeamInfo.notiYn) === 0) {
              D_CHAN_AUTH.recvAlimYn = team.userTeamInfo.notiYn
            }
            if (team.userTeamInfo.showProfileYn === 1) {
              D_CHAN_AUTH.showProfileYn = true
              D_CHAN_AUTH.userGrade = '(공개)'
            }
            D_CHAN_AUTH.followYn = true
            team.detailShowYn = false
            D_CHAN_AUTH.followTypeText = '구독자'
            if (team.userTeamInfo.managerKey !== undefined && team.userTeamInfo.managerKey !== null && team.userTeamInfo.managerKey !== '') {
              if (team.userTeamInfo.ownerYn === true || team.userTeamInfo.ownerYn === 'true') {
                D_CHAN_AUTH.followTypeText = '소유자'
                D_CHAN_AUTH.userGrade = '(관리자)'
                D_CHAN_AUTH.ownerYn = true
                D_CHAN_AUTH.admYn = true
              } else {
                D_CHAN_AUTH.followTypeText = '관리자'
                D_CHAN_AUTH.userGrade = '(매니저)'
              }
              D_CHAN_AUTH.adminYn = true
            }
          }

          team.D_CHAN_AUTH = D_CHAN_AUTH
          state.chanList.push(team)
        }
      }
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
      var chanList = state.chanList

      idx1 = chanList.findIndex((item) => item.teamKey === payload[0].creTeamKey)
      var chanDetail = chanList[idx1]
      for (var i = 0; i < payload.length; i++) {
        if (payload[i].jobkindId === 'BOAR') {
          idx2 = chanDetail.ELEMENTS.boardList.findIndex((item) => item.mccKey === payload[i].mccKey)
        } else {
          idx2 = chanDetail.ELEMENTS.alimList.findIndex((item) => item.mccKey === payload[i].mccKey)
        }
        if (idx2 !== -1) {
          if (payload[i].jobkindId === 'BOAR') {
            chanDetail.ELEMENTS.boardList[idx2] = payload[i]
          } else {
            chanDetail.ELEMENTS.alimList[idx2] = payload[i]
          }
        }
      }
      chanList[idx1] = chanDetail
      state.chanList = chanList
      state.recentChangeTeamKey = chanDetail.teamKey
      return true
    },
    MU_ADD_CONTENTS: (state, payload) => {
      var idx1, idx2
      var chanList = state.chanList
      if (payload.length === 0) return
      idx1 = chanList.findIndex((item) => item.teamKey === payload[0].creTeamKey)
      var chanDetail = chanList[idx1]
      for (var i = 0; i < payload.length; i++) {
        if (payload[i].jobkindId === 'BOAR') {
          idx2 = chanDetail.ELEMENTS.boardList.findIndex((item) => item.mccKey === payload[i].mccKey)
        } else {
          idx2 = chanDetail.ELEMENTS.alimList.findIndex((item) => item.mccKey === payload[i].mccKey)
        }

        if (idx2 === -1) {
          if (payload[i].jobkindId === 'BOAR') {
            chanDetail.ELEMENTS.boardList.push(payload[i])
          } else {
            chanDetail.ELEMENTS.alimList.push(payload[i])
          }
        }
      }
      chanList[idx1] = chanDetail
      state.chanList = chanList
      state.recentChangeTeamKey = chanDetail.teamKey
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
    AC_ADD_CHANNEL: ({ commit }, payload) => {
      commit('MU_ADD_CHANNEL', payload)
    },
    AC_REPLACE_CONTENTS: ({ commit }, payload) => { // 채널 부분 치환 (ALIM/BOARD)
      if (payload.length > 0) {
        commit('MU_REPLACE_CONTENTS', payload)
      }
    },
    AC_ADD_CONTENTS: ({ commit }, payload) => { // 채널의 컨텐츠 부분 추가 (ALIM/BOARD)
      commit('MU_ADD_CONTENTS', payload)
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
    AC_REPLACE_CHANNEL: ({ commit }, payload) => {
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
