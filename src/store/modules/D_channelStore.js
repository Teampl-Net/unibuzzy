/* eslint-disable camelcase */

// import { methods } from '../../../public/commonAssets/Tal_axiosFunction'
import { commonMethods } from '../../assets/js/Tal_common'
const D_CHANNEL = {
  namespaced: true,
  state: {
    chanList: [],
    recentChangeTeamKey: null,
    addContsList: [],
    addChanList: []
  },
  getters: {
    GE_MAIN_CHAN_LIST (state) {
      return state.chanList
    },
    GE_NEW_CONT_LIST (state) {
      return state.addContsList
    },
    GE_NEW_CHAN_LIST (state) {
      return state.addChanList
    },
    GE_RECENT_CHANGE_TEAM (state) {
      return state.recentChangeTeamKey
    }
  },
  mutations: {
    MU_CLEAN_CHAN_LIST: (state, payload) => {
      state.chanList = []
      return true
    },
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
          if ((!team.ELEMENTS.showProfileUserList)) {
            team.ELEMENTS.showProfileUserList = []
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
          D_CHAN_AUTH.settingYn = true
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
            // eslint-disable-next-line no-debugger
            debugger
            if (team.userTeamInfo.ownerYn === true || team.userTeamInfo.ownerYn === 1) {
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
            if ((!team.ELEMENTS.showProfileUserList)) {
              team.ELEMENTS.showProfileUserList = []
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
              managerList: [],
              showProfileUserList: []
            }
          }
          team.teamTypeText = commonMethods.teamTypeString(team.teamType)
          // eslint-disable-next-line no-new-object
          var D_CHAN_AUTH = {}
          D_CHAN_AUTH.recvAlimYn = true
          if (team.followerKey) D_CHAN_AUTH = true
          if (team.userTeamInfo !== undefined && team.userTeamInfo !== null && team.userTeamInfo !== '') {
            D_CHAN_AUTH.settingYn = true
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
              if (team.userTeamInfo.ownerYn === true || team.userTeamInfo.ownerYn === 1) {
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
          /* state.addChanList.push(team) */
        }
      }
      return true
    },
    MU_REPLACE_CHANNEL: (state, payload) => {
      var idx1
      var chanList = state.chanList
      idx1 = chanList.findIndex((item) => item.teamKey === payload.teamKey)
      chanList[idx1] = payload
      if (!chanList[idx1].changedYn) chanList[idx1].changedYn = true
      else {
        chanList[idx1].changedYn = false
      }
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
      if (payload.length === 0) return null
      idx1 = chanList.findIndex(item => item.teamKey === payload[0].teamKey)
      var chanDetail = chanList[idx1]
      for (let i = 0; i < payload.length - 1; i++) {
        idx2 = chanDetail.ELEMENTS.showProfileUserList.findIndex(item => item.followerKey === payload[i].followerKey)
        if (idx2 === -1) {
          chanDetail.ELEMENTS.showProfileUserList.push(payload[i])
        }
      }

      chanList[idx1] = chanDetail
      state.chanList = chanList
      state.recentChangeTeamKey = payload.creTeamKey
      console.log('?????????????????????')
      return true
    },
    MU_REPLACE_CONTENTS: (state, payload) => {
      var idx1, idx2
      var chanList = state.chanList

      idx1 = chanList.findIndex((item) => item.teamKey === payload[0].creTeamKey)
      var chanDetail = chanList[idx1]
      for (var i = 0; i < payload.length; i++) {
        if (payload[i].jobkindId === 'BOAR') {
          idx2 = chanDetail.ELEMENTS.boardList.findIndex((item) => item.contentsKey === payload[i].contentsKey)
        } else {
          idx2 = chanDetail.ELEMENTS.alimList.findIndex((item) => item.contentsKey === payload[i].contentsKey)
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
    MU_REPLACE_CONTENTS_MEMO_LIST: (state, payload) => {
      var idx1, idx2
      var chanList = state.chanList
      idx1 = chanList.findIndex((item) => item.teamKey === payload[0].creTeamKey)
      var chanDetail = chanList[idx1]
      for (var i = 0; i < payload.length; i++) {
        if (payload[i].jobkindId === 'BOAR') {
          idx2 = chanDetail.ELEMENTS.boardList.findIndex((item) => item.contentsKey === payload[i].contentsKey)
        } else {
          idx2 = chanDetail.ELEMENTS.alimList.findIndex((item) => item.contentsKey === payload[i].contentsKey)
        }
        if (idx2 !== -1) {
          if (payload[i].jobkindId === 'BOAR') {
            chanDetail.ELEMENTS.boardList[idx2].D_MEMO_LIST = payload[i].D_MEMO_LIST
          } else {
            chanDetail.ELEMENTS.alimList[idx2].D_MEMO_LIST = payload[i].D_MEMO_LIST
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
      if (idx1 !== -1) {
        var chanDetail = chanList[idx1]
        for (var i = 0; i < payload.length; i++) {
          if (payload[i].jobkindId === 'BOAR') {
            idx2 = chanDetail.ELEMENTS.boardList.findIndex((item) => item.contentsKey === payload[i].contentsKey)
          } else {
            idx2 = chanDetail.ELEMENTS.alimList.findIndex((item) => item.contentsKey === payload[i].contentsKey)
          }

          if (idx2 === -1) {
            if (payload[i].jobkindId === 'BOAR') {
              chanList[idx1].ELEMENTS.boardList.push(payload[i])
            } else {
              chanList[idx1].ELEMENTS.alimList.push(payload[i])
            }
            state.addContsList.unshift(payload[i])
          }
        }
      }
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
          if ((!payload.ELEMENTS.showProfileUserList)) {
            payload.ELEMENTS.showProfileUserList = []
          }
        } else {
          payload.ELEMENTS = {
            commonList: { type: 'ALIM', list: [] },
            alimList: [],
            boardList: [],
            cabinetList: [],
            managerList: [],
            showProfileUserList: []
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
  // dispatch 를 사용하면 됨
  actions: {
    AC_MAIN_CHAN_LIST: ({ commit }, payload) => { // 채널전체 치환
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
    AC_ADD_CONTENTS: ({ commit, state }, payload) => { // 채널의 컨텐츠 부분 추가 (ALIM/BOARD)
      for (var i = 0; i < payload.length; i++) {
        var userDo = payload[i].userDoList
        var userDoList = [{ doType: 'ST', doKey: 0 }, { doType: 'LI', doKey: 0 }, { doType: 'RE', doKey: false }]
        if (userDo) {
          var index = userDo.findIndex((item) => item.doType === 'ST')
          if (index >= 0) {
            userDoList[0].doKey = userDo[index].doKey
          }
          index = userDo.findIndex((item) => item.doType === 'LI')
          if (index >= 0) {
            userDoList[1].doKey = userDo[index].doKey
          }
          index = userDo.findIndex((item) => item.doType === 'RE')
          if (index >= 0) {
            userDoList[2].doKey = userDo[index].doKey
          }
        }
        payload[i].D_CONT_USER_DO = userDoList
      }
      commit('MU_ADD_CONTENTS', payload)
    },
    AC_REPLACE_SHOW_PROFILE_USER: ({ commit }, payload) => { // 채널 부분 치환 (ALIM/BOARD)
      commit('MU_REPLACE_SHOW_PROFILE_USER', payload)
    },
    AC_REPLACE_MANAGER: ({ commit }, payload) => { // 채널 부분 치환 (ALIM/BOARD)
      commit('MU_REPLACE_MANAGER', payload)
    },
    AC_RECENT_CHANGE_TEAM: ({ commit }, payload) => {
      commit('MU_RECENT_CHANGE_TEAM', payload)
    },
    AC_REPLACE_CHANNEL: ({ commit }, payload) => {
      // eslint-disable-next-line no-debugger
      debugger
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
        if ((!payload.ELEMENTS.showProfileUserList)) {
          payload.ELEMENTS.showProfileUserList = []
        }
        if ((!payload.ELEMENTS.managerList)) {
          payload.ELEMENTS.managerList = []
        }
      } else {
        payload.ELEMENTS = {
          alimList: [],
          boardList: [],
          cabinetList: [],
          commonList: { type: 'ALIM', list: [] },
          managerList: [],
          showProfileUserList: []
        }
      }
      payload.teamTypeText = commonMethods.teamTypeString(payload.teamType)
      // var title = '[더알림]' + commonMethods.changeText(team.nameMtext)
      // var message = commonMethods.changeText(team.memoMtext)
      // team.copyTextStr = await commonMethods.makeShareLink(team.teamKey, 'chanDetail', message, title)

      // eslint-disable-next-line no-new-object
      var D_CHAN_AUTH = {}
      D_CHAN_AUTH.recvAlimYn = true
      if (payload.followerKey) D_CHAN_AUTH.followYn = true
      if (payload.userTeamInfo !== undefined && payload.userTeamInfo !== null && payload.userTeamInfo !== '') {
        D_CHAN_AUTH.settingYn = true
        if (payload.userTeamInfo.notiYn === false || Number(payload.userTeamInfo.notiYn) === 0) {
          D_CHAN_AUTH.recvAlimYn = payload.userTeamInfo.notiYn
        }
        if (payload.userTeamInfo.showProfileYn === 1) {
          D_CHAN_AUTH.showProfileYn = true
          D_CHAN_AUTH.userGrade = '(공개)'
        }
        D_CHAN_AUTH.followYn = true
        payload.detailShowYn = false
        D_CHAN_AUTH.followTypeText = '구독자'
        if (payload.userTeamInfo.managerKey !== undefined && payload.userTeamInfo.managerKey !== null && payload.userTeamInfo.managerKey !== '') {
          if (payload.userTeamInfo.ownerYn === true || payload.userTeamInfo.ownerYn === 1) {
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

      payload.D_CHAN_AUTH = D_CHAN_AUTH
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

        index = dataList.findIndex((item) => item.contentsKey === payload.ELEMENTS.commonList.list[i].contentsKey)
        if (index >= 0) {
          payload.ELEMENTS.commonList.list[i] = dataList[index]
        }
      }
      var channelList = state.chanList
      index = channelList.findIndex((item) => item.teamKey === payload.teamKey)
      channelList[index] = payload
      commit('MU_MAIN_CHAN_LIST', channelList)
    }
  }
}

export default D_CHANNEL
