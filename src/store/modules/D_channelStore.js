/* eslint-disable no-debugger */
/* eslint-disable camelcase */

// import { methods } from '../../../public/commonAssets/Tal_axiosFunction'
import { commonMethods } from '../../assets/js/Tal_common'
const D_CHANNEL = {
  namespaced: true,
  state: {
    chanList: [],
    recentChangeTeamKey: null,
    addContsList: [],
    addChanList: [],
    addMemoList: [],
    addManagerList: [],
    addShowProfileUserList: []

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
    GE_NEW_MAN_LIST (state) {
      return state.addManagerList
    },
    GE_NEW_MEMO_LIST (state) {
      return state.addMemoList
    },
    GE_NEW_SHOW_LIST (state) {
      return state.addShowProfileUserList
    },
    GE_RECENT_CHANGE_TEAM (state) {
      return state.recentChangeTeamKey
    }
  },
  mutations: {
    MU_CLEAN_CHAN_LIST: (state, payload) => {
      state.chanList = []
      state.recentChangeTeamKey = null
      state.addContsList = []
      state.addChanList = []
      state.addMemoList = []
      state.addManagerList = []
      state.addShowProfileUserList = []
      return true
    },
    MU_REPLACE_NEW_MEMO: (state, payload) => {
      var index = null
      if (!payload) return
      // alert(JSON.stringify(payload))
      var chanIndex = state.chanList.findIndex((item) => item.teamKey === payload.creTeamKey)
      if (chanIndex === -1) return
      var chan = state.chanList[chanIndex]

      if (payload.parentMemoKey) {
        index = state.addMemoList.findIndex((item) => item.memoKey === payload.parentMemoKey)
        if (index !== -1) {
          state.addMemoList = state.addMemoList.splice(index, 1)
        }
      } else {
        index = state.addMemoList.findIndex((item) => item.memoKey === payload.memoKey)
        if (index !== -1) {
          state.addMemoList = state.addMemoList.splice(index, 1)
        }
      }
      // alert(index)
      // alert(JSON.stringify(payload))
      /* if (index) { */
      var index3 = null
      var dataList = null
      // alert(JSON.stringify(payload))
      if (payload.jobkindId === 'ALIM') {
        // alert(payload.targetKey)
        dataList = chan.ELEMENTS.alimList
        index3 = chan.ELEMENTS.alimList.findIndex((item) => item.contentsKey === payload.targetKey)
      } else {
        dataList = chan.ELEMENTS.boardList
        index3 = chan.ELEMENTS.boardList.findIndex((item) => item.contentsKey === payload.targetKey)
      }
      // alert(2)
      if (index3 === -1) return
      if (payload.parentMemoKey) {
        // alert('JSON.stringify(payload)')
        // (JSON.stringify(payload))
        var pMemoIndex = dataList[index3].D_MEMO_LIST.findIndex((item) => item.memoKey === payload.parentMemoKey)
        if (pMemoIndex === -1) return
        var pMemo = dataList[index3].D_MEMO_LIST[pMemoIndex]
        if (!pMemo.cmemoList) pMemo.cmemoList = []
        var cIndex = pMemo.cmemoList.findIndex((item) => item.memoKey === payload.memoKey)
        // alert(cIndex)
        if (cIndex !== -1) {
          pMemo.cmemoList[cIndex] = payload
        } else {
          pMemo.cmemoList.unshift(payload)
        }
        payload = pMemo
      }
      // alert(JSON.stringify(dataList[index3].D_MEMO_LIST))
      var newIdx = dataList[index3].D_MEMO_LIST.findIndex((item) => item.memoKey === payload.memoKey)
      if (state.addMemoList.length > 30) {
        state.addMemoList = state.addMemoList.splice(0, 30)
      }
      if (dataList[index3] === 'ALIM') {
        if (newIdx === -1) {
          state.chanList[chanIndex].ELEMENTS.alimList[index3].D_MEMO_LIST.push(payload)
          state.addMemoList.unshift(payload)
        } else {
          // alert('여기')
          state.chanList[chanIndex].ELEMENTS.alimList[index3].D_MEMO_LIST[newIdx] = payload
          state.addMemoList.unshift(payload)
        }
      } else {
        if (newIdx === -1) {
          state.chanList[chanIndex].ELEMENTS.boardList[index3].D_MEMO_LIST.push(payload)
          state.addMemoList.unshift(payload)
        } else {
          state.chanList[chanIndex].ELEMENTS.boardList[index3].D_MEMO_LIST[newIdx] = payload
          state.addMemoList.unshift(payload)
        }
      }
      /* } */
      return true
    },
    MU_MAIN_CHAN_LIST: (state, payload) => {
      for (var i = 0; i < payload.length; i++) {
        var team = payload[i]
        if (team.ELEMENTS) {
          if (!team.ELEMENTS.alimList) { team.ELEMENTS.alimList = [] }
          if (!team.ELEMENTS.commonList) { team.ELEMENTS.commonList = { type: 'ALIM', list: [] } }
          if ((!team.ELEMENTS.boardList)) { team.ELEMENTS.boardList = [] }
          if ((!team.ELEMENTS.cabinetList)) { team.ELEMENTS.cabinetList = [] }
          if ((!team.ELEMENTS.showProfileUserList)) { team.ELEMENTS.showProfileUserList = [] }
          if ((!team.ELEMENTS.managerList)) { team.ELEMENTS.managerList = [] }
        } else {
          team.ELEMENTS = { alimList: [], boardList: [], cabinetList: [], commonList: { type: 'ALIM', list: [] }, managerList: [], showProfileUserList: [] }
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
      debugger
      for (var i = 0; i < payload.length; i++) {
        var team = payload[i]
        index = state.chanList.findIndex((item) => item.teamKey === team.teamKey)
        if (index === -1) {
          if (team.ELEMENTS) {
            if (!team.ELEMENTS.alimList) { team.ELEMENTS.alimList = [] }
            if (!team.ELEMENTS.commonList) { team.ELEMENTS.commonList = { type: 'ALIM', list: [] } }
            if ((!team.ELEMENTS.boardList)) { team.ELEMENTS.boardList = [] }
            if ((!team.ELEMENTS.cabinetList)) { team.ELEMENTS.cabinetList = [] }
            if ((!team.ELEMENTS.showProfileUserList)) { team.ELEMENTS.showProfileUserList = [] }
            if ((!team.ELEMENTS.managerList)) { team.ELEMENTS.managerList = [] }
          } else {
            team.ELEMENTS = { alimList: [], boardList: [], cabinetList: [], commonList: { type: 'ALIM', list: [] }, managerList: [], showProfileUserList: [] }
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
      for (let i = 0; i < payload.length; i++) {
        idx2 = chanDetail.ELEMENTS.managerList.findIndex(item => item.managerKey === payload[i].managerKey)
        if (idx2 !== -1) {
          chanDetail.ELEMENTS.managerList[idx2] = payload[i]
        } else {
          chanDetail.ELEMENTS.managerList.push(payload[i])
          state.managerList.unshift(payload[i])
        }
      }
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
      for (var i = 0; i < payload.length; i++) {
        idx2 = chanDetail.ELEMENTS.showProfileUserList.findIndex(item => item.userKey === payload[i].userKey)
        if (idx2 !== -1) {
          chanDetail.ELEMENTS.showProfileUserList[idx2] = payload[i]
        } else {
          chanDetail.ELEMENTS.showProfileUserList.push(payload[i])
          // alert('yes' + payload[i].userKey)
          if (state.addShowProfileUserList.length > 50) {
            state.addShowProfileUserList = state.addShowProfileUserList.splice(0, 50)
          }
          state.addShowProfileUserList.unshift(payload[i])
        }
      }

      chanList[idx1] = chanDetail
      state.chanList = chanList
      state.recentChangeTeamKey = payload.creTeamKey
      // console.log('?????????????????????')
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
        var dataList = null
        if (payload[i].jobkindId === 'BOAR') {
          dataList = chanDetail.ELEMENTS.boardList[idx2]
        } else {
          dataList = chanDetail.ELEMENTS.alimList[idx2]
        }
        if (!dataList.D_MEMO_LIST) {
          dataList.D_MEMO_LIST = []
        }
        if (!payload[i].D_MEMO_LIST || payload[i].D_MEMO_LIST.length === 0) {
          payload[i].D_MEMO_LIST = payload[i].memoList
        }
        // alert('ok')
        if (dataList.D_MEMO_LIST.length !== payload[i].D_MEMO_LIST.length) {
          var newArr = []
          if (payload[i].D_MEMO_LIST.length > 0) {
            newArr = [...newArr, ...payload[i].D_MEMO_LIST]
          }
          if (dataList.D_MEMO_LIST.length > 0) {
            newArr = [...newArr, ...dataList.D_MEMO_LIST]
          }
          if (newArr && newArr.length > 0) {
            var uniqueArr = newArr.reduce(function (data, current) {
              // var addData = []
              if (data.findIndex((item) => item.memoKey === current.memoKey) === -1) {
                data.push(current)
              }
              return data
            }, [])
            payload[i].MEMO_LIST = uniqueArr
          }
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
      debugger
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
          // alert(idx2)
          if (idx2 === -1) {
            if (payload[i].jobkindId === 'BOAR') {
              chanList[idx1].ELEMENTS.boardList.push(payload[i])
            } else {
              chanList[idx1].ELEMENTS.alimList.push(payload[i])
            }
            if (state.addContsList.length > 30) {
              state.addContsList = state.addContsList.splice(0, 30)
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
          if (!payload.ELEMENTS.alimList) { payload.ELEMENTS.alimList = [] }
          if (!payload.ELEMENTS.commonList) { payload.ELEMENTS.commonList = { type: 'ALIM', list: [] } }
          if ((!payload.ELEMENTS.boardList)) { payload.ELEMENTS.boardList = [] }
          if ((!payload.ELEMENTS.cabinetList)) { payload.ELEMENTS.cabinetList = [] }
          if ((!payload.ELEMENTS.showProfileUserList)) { payload.ELEMENTS.showProfileUserList = [] }
          if ((!payload.ELEMENTS.managerList)) { payload.ELEMENTS.managerList = [] }
        } else {
          payload.ELEMENTS = { alimList: [], boardList: [], cabinetList: [], commonList: { type: 'ALIM', list: [] }, managerList: [], showProfileUserList: [] }
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
    },
    MU_REPLACE_CONTENTS_ONLY_USERDO: (state, payload) => {
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
            chanDetail.ELEMENTS.boardList[idx2].D_CONT_USER_DO = payload[i].D_CONT_USER_DO
          } else {
            chanDetail.ELEMENTS.alimList[idx2].D_CONT_USER_DO = payload[i].D_CONT_USER_DO
          }
        }
      }
      state.chanList[idx1] = chanDetail
      state.recentChangeTeamKey = chanDetail.teamKey
      return true
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
      debugger
      if (payload.length > 0) {
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
        commit('MU_REPLACE_CONTENTS', payload)
      }
    },
    AC_REPLACE_CONTENTS_ONLY_USERDO: ({ commit }, payload) => { // 컨텐츠 부분 치환 (ALIM/BOARD)
      if (payload.length > 0) {
        commit('MU_REPLACE_CONTENTS_ONLY_USERDO', payload)
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
        if (!payload.ELEMENTS.alimList) { payload.ELEMENTS.alimList = [] }
        if (!payload.ELEMENTS.commonList) { payload.ELEMENTS.commonList = { type: 'ALIM', list: [] } }
        if ((!payload.ELEMENTS.boardList)) { payload.ELEMENTS.boardList = [] }
        if ((!payload.ELEMENTS.cabinetList)) { payload.ELEMENTS.cabinetList = [] }
        if ((!payload.ELEMENTS.showProfileUserList)) { payload.ELEMENTS.showProfileUserList = [] }
        if ((!payload.ELEMENTS.managerList)) { payload.ELEMENTS.managerList = [] }
      } else {
        payload.ELEMENTS = { alimList: [], boardList: [], cabinetList: [], commonList: { type: 'ALIM', list: [] }, managerList: [], showProfileUserList: [] }
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