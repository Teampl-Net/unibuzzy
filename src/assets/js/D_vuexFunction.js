/* eslint-disable no-unused-vars */
/* eslint-disable no-debugger */
/* eslint-disable camelcase */

import store from '../../store'
import { mapGetters, mapActions } from 'vuex'
import { methods, commonAxiosFunction } from '../../../public/commonAssets/Tal_axiosFunction'
import { commonMethods } from './Tal_common'
var this_ = this
// var g_user = store.getters['D_USER/GE_USER']
var g_axiosQueue = []
var notiDetail
let userDo
export const isJsonString = (str) => {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}

export const functions = {
  /* ...mapActions('D_USER', [
    'AC_USER'
  ]),
  ...mapActions('D_CHANNEL', [
    'AC_MAIN_CHAN_LIST'
  ]),
  ...mapActions('D_CONTENTS', [
    'AC_MAIN_ALIM_LIST'
  ]),
  ...mapActions('D_CONTENTS', [
    'AC_MAIN_BOARD_LIST'
  ]), */
  async getContentsMemoList (targetKey, memoKey, parentMemoKey) {
    var memo = {}
    memo.targetKind = 'C'
    memo.allMemoYn = true
    memo.targetKey = targetKey
    memo.memoKey = memoKey
    var result = await commonAxiosFunction({
      url: 'https://www.hybric.net:9443/service/tp.getMemoList',
      param: memo
    }, true)
    var memos = result.data.memoList[0]
    return memos
  },
  async actionVuex (type, data, targetKey, allYn, replaceYn, creTeamKey, creCabinetKey) {
    var ActName
    if (type === 'T' || type === 'B' || type === 'C') {
      ActName = 'D_CHANNEL/AC_MAIN_CHAN_LIST'
    } else if (type === 'COMMONCONT') {
      ActName = 'D_CHANNEL/AC_SET_CHAN_CONT_LIST'
    }

    if (allYn) {
      store.dispatch(ActName, data)
    } else {
      if (replaceYn) {
        var dataList, team, childList, cabIndex, contIndex, cabiList, cabiDetail
        var index
        if (type === 'T') {
          dataList = store.getters['D_CHANNEL/GE_MAIN_CHAN_LIST']
          index = dataList.findIndex((item) => item.teamKey === targetKey)
          dataList[index] = data
          store.commit('D_CHANNEL/MU_RECENT_CHANGE_TEAM', targetKey)
          /* if (data.detailPageYn) {
            store.dispatch('D_CHANNEL/AC_RECENT_CHANGE_TEAM', targetKey)
          } */
        } else if (type === 'B') {
          dataList = store.getters['D_CHANNEL/GE_MAIN_CHAN_LIST']
          index = dataList.findIndex((item) => item.teamKey === creTeamKey)
          team = dataList[index]
          childList = team.ELEMENTS.cabinetList
          cabIndex = childList.findIndex((item) => item.cabinetKey === targetKey)
          childList[cabIndex] = data
          team.ELEMENTS.cabinetList = childList
          dataList = team
          store.commit('D_CHANNEL/MU_RECENT_CHANGE_TEAM', creTeamKey)
        } else if (type === 'COMMONCONT') {
          dataList = store.getters['D_CHANNEL/GE_MAIN_CHAN_LIST']
          index = dataList.findIndex((item) => item.teamKey === targetKey)
          dataList[index] = data
        } else if (type === 'C') {
          if (creCabinetKey) {
            dataList = store.getters['D_CHANNEL/GE_MAIN_CHAN_LIST']
            index = dataList.findIndex((item) => item.teamKey === creTeamKey)
            team = dataList[index]
            childList = team.ELEMENTS.boardList
            contIndex = childList.findIndex((item) => item.contentsKey === targetKey)
            childList[contIndex] = data
            team.ELEMENTS.boardList = childList
            dataList[index] = team
            store.commit('D_CHANNEL/MU_RECENT_CHANGE_TEAM', creTeamKey)
          } else {
            dataList = store.getters['D_CHANNEL/GE_MAIN_CHAN_LIST']
            index = dataList.findIndex((item) => item.teamKey === creTeamKey)
            team = dataList[index]
            childList = team.ELEMENTS.alimList
            contIndex = childList.findIndex((item) => item.contentsKey === targetKey)
            childList[contIndex] = data
            team.ELEMENTS.alimList = childList
            dataList[index] = team
            store.commit('D_CHANNEL/MU_RECENT_CHANGE_TEAM', creTeamKey)
          }
        }
        await store.dispatch(ActName, dataList).then(() => {
          return true
        })
      }
    }
  },
  getDetail (type, targetKey) {
    var dataList
    var result
    if (type === 'TEAM') {
      dataList = store.getters['D_CHANNEL/GE_MAIN_CHAN_LIST']
      result = dataList.filter(data => data.teamKey === targetKey)
      return result
    }
  },
  async getBoardCabinetDetail (teamKey, targetKey) {
    if (g_axiosQueue.findIndex((item) => item === 'getBoardCabinetDetail') !== -1) return
    g_axiosQueue.push('getBoardCabinetDetail')
    // eslint-disable-next-line no-new-object
    var param = new Object()
    var tt = this.propData

    param.currentTeamKey = teamKey
    param.cabinetKey = targetKey
    var resultList = await this.$getCabinetDetail(param)
    var queueIndex = g_axiosQueue.findIndex((item) => item === 'getBoardCabinetDetail')
    g_axiosQueue.splice(queueIndex, 1)
    // mShareItemList가 잘 들어오면 save잘 된것
    //     this.commonListData = resultList.content
    if (resultList && resultList.mCabinet) {
      return resultList.mCabinet
    } else {
      return null
    }
  },
  getContentsDetail (teamDetail, targetKey, teamKey, jobkindId) {
    // if (g_axiosQueue.findIndex((item) => item === 'getContentsDetail') !== -1) return
    // g_axiosQueue.push('getContentsDetail')
    if ((jobkindId === 'ALIM' && !teamKey)) {
      return null
    }
    var detailData
    var dataList
    if (!targetKey) return null
    if (!teamDetail) {
      if (teamKey !== undefined && teamKey !== null) {
        var teamList = store.getters['D_CHANNEL/GE_MAIN_CHAN_LIST']
        var result = teamList.filter(data => data.teamKey === teamKey)
        if (result && result.length > 0) {
          teamDetail = result[0]
        } else {
          return null
        }
      }
    }
    if (detailData && detailData.length !== 0) {
      return detailData
    } else {
      if (jobkindId === 'ALIM') {
        detailData = teamDetail.ELEMENTS.alimList.filter(cab => cab.contentsKey === Number(targetKey))
      } else if (jobkindId === 'BOAR') {
        detailData = teamDetail.ELEMENTS.boardList.filter(cab => cab.contentsKey === Number(targetKey))
      } else if (jobkindId === 'TODO') {
        detailData = teamDetail.ELEMENTS.todoList.filter(cab => cab.contentsKey === Number(targetKey))
      } else {
        detailData = teamDetail.ELEMENTS.memoList.filter(cab => cab.contentsKey === Number(targetKey))
      }
      // var queueIndex = g_axiosQueue.findIndex((item) => item === 'getContentsDetail')
      // g_axiosQueue.splice(queueIndex, 1)
      return detailData
    }
  },
  async addChanVuex (data) {
    await store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', data)
  },
  async addChanList (teamKey) {
    var result = null
    debugger
    console.log('과연????')
    console.log(g_axiosQueue.findIndex((item) => item === 'addChanList'))
    if (g_axiosQueue.findIndex((item) => item === 'addChanList') !== -1) return
    g_axiosQueue.push('addChanList')
    var paramMap = new Map()
    if (teamKey === undefined || teamKey === null) return 'teamKey정보가 누락되었습니다.'
    paramMap.set('teamKey', teamKey)
    paramMap.set('fUserKey', store.getters['D_USER/GE_USER'].userKey)
    console.log('############# addChanList ############')
    console.log(paramMap)
    try {
      var resultList = await methods.getTeamList(paramMap, true)
      console.log(resultList)
      // if (resultList.data === undefined || resultList.data === null || resultList.data === '') return
      var response = resultList.data.content[0]
      await store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', [response])
    } catch (error) {

    } finally {
      var queueIndex = g_axiosQueue.findIndex((item) => item === 'addChanList')
      g_axiosQueue.splice(queueIndex, 1)
    }
    return response
    // await functions.actionVuex('TEAM', response, response.teamKey, false, true)
  },
  async recvNotiFromBridge (inNotiDetail, mobileYn) {
    var addVueResult = false
    try {
      // 협의필요
      if (inNotiDetail) {
        notiDetail = inNotiDetail
      }
      if (!notiDetail) return false
      userDo = JSON.parse(notiDetail.userDo)
      store.dispatch('D_NOTI/AC_ADD_NOTI_LIST', notiDetail)
      if (userDo.targetKind === 'C') {
        if (Number(userDo.ISub) && Number(userDo.ISub) > 0) {
          addVueResult = await functions.addContents(userDo.targetKey, 'BOAR')
        } else {
          addVueResult = await functions.addContents(userDo.targetKey, notiDetail.jobkindId)
        }
      } else if (userDo.targetKind === 'R') {
        var memo = await functions.getContentsMemoList(Number(userDo.targetKey), Number(userDo.ISub))
        memo.jobkindId = notiDetail.jobkindId
        memo.creTeamKey = notiDetail.creTeamKey
        if (notiDetail.jobkindId === 'TODO') {
          memo.creTeamKey = 0
        }
        await store.commit('D_CHANNEL/MU_ADD_MEMO', memo)
        addVueResult = await functions.addContents(Number(userDo.targetKey), notiDetail.jobkindId)
      } else if (userDo.targetKind === 'T') {
        addVueResult = await functions.addChanList(Number(notiDetail.creTeamKey))
      } else if (!notiDetail.userDo) {
        console.log('여기?')
      }
    } catch (err) {
      console.error('메세지를 파싱할수 없음 ' + err)
    }
    return addVueResult
  },
  async settingCabiNoti (message) {
    await this.addContents(userDo.ISub, 'BOAR')
    /* if (Number(userDo.userKey) === Number(g_user.userKey)) {
      return
    } */
    if (notiDetail.actYn === true || notiDetail.actYn === 'true') {
      if (JSON.parse(message.pushMessage).arrivedYn === true || JSON.parse(message.pushMessage).arrivedYn === 'true') {
        ;
      }
    }
  },
  async addContents (targetKey, jobkindId) {
    // eslint-disable-next-line no-new-object
    var param = new Object()
    param.contentsKey = targetKey
    param.jobkindId = jobkindId
    param.userKey = store.getters['D_USER/GE_USER'].userKey
    if (param.jobkindId === 'TODO' || param.creTeamKey === 0 || param.teamKey === 0) {
      delete param.creTeamkey
      delete param.teamKey
    }
    var resultList = await methods.getContentsList(param, true)
    if (!resultList || !resultList.content || resultList.content.length === 0) return false
    var detailData = resultList.content[0]
    if (detailData.jobkindId === 'TODO') {
      detailData.creTeamKey = 0
    }
    store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [detailData])
    return detailData
  },
  async settingAlimNoti (message) {
    await functions.addContents(userDo.targetKey, notiDetail.jobkindId)
    /* if (Number(userDo.userKey) === Number(g_user.userKey)) {
      return
    } */
    /* var noti = await functions.getContentsDetail(null, userDo.targetKey, userDo)
    store.dispatch('D_UPDATE/AC_ADD_NEW_NOTI', noti) */
    if (notiDetail.actYn === true || notiDetail.actYn === 'true') {
      if (JSON.parse(message.pushMessage).arrivedYn === true || JSON.parse(message.pushMessage).arrivedYn === 'true') {
        ;
      } else {
      }
    } else {
      if (JSON.parse(message.pushMessage).arrivedYn === true || JSON.parse(message.pushMessage).arrivedYn === 'true') {
        if (notiDetail.jobkindId !== 'BOAR') {
        }
      } else {
      }
    }
  },
  async getFollowerList (teamKey, userKey, showProfileYn, managerYn) {
    var paramMap = new Map()
    paramMap.set('teamKey', teamKey)
    paramMap.set('userKey', userKey)
    if (showProfileYn) {
      paramMap.set('showProfileYn', showProfileYn)
    } else {
      if (managerYn) {
        paramMap.set('managerYn', managerYn)
      }
    }
    // paramMap.set('followerType', 'M')
    var result = await commonAxiosFunction({
      url: 'https://www.hybric.net:9443/service/tp.getFollowerList',
      param: Object.fromEntries(paramMap)
    }, true)
    var user = result.data.content
    return user
  },
  /* async settingChanNoti (message) {
    if (notiDetail.actType === 'FM' || notiDetail.actType === 'FL' || this.notiDetail.actType === 'RQ' || this.notiDetail.actType === 'AP' || notiDetail.actType === 'RM' || notiDetail.actType === 'MA' || notiDetail.actType === 'CR') {
      await functions.addChanList(Number(userDo))
    }

    if (((notiDetail.actType === 'ME' || notiDetail.actType === 'FM') || notiDetail.actType === 'RM' || (notiDetail.actType === 'MA'))) {
      var channelL = functions.getDetail('TEAM', Number(userDo.targetKey))
      if (channelL) {
        var user = null
        if (notiDetail.actType === 'ME' || notiDetail.actType === 'FM') {
          user = await functions.getFollowerList(channelL[0].teamKey, Number(userDo.userKey))
          if (user.length === 1) this.$store.commit('D_CHANNEL/MU_REPLACE_SHOW_PROFILE_USER', [user[0]])
        } else if (notiDetail.actType === 'MA') {
          user = await functions.getFollowerList(channelL[0].teamKey, Number(userDo.userKey))
          if (Number(userDo.userKey) === store.getters['D_USER/GE_USER'].userKey) {
            if (user.memberYn === 1 || user.memberYn === true) {
            } else {
              store.dispatch('D_CHANNEL/AC_CHANNEL_NOTI_QUEUE', notiDetail)
            }
          }
          // channelL[0].ELEMENTS.showProfileUserList.push(user)
          if (user.length === 1) store.commit('D_CHANNEL/MU_REPLACE_MANAGER', [user[0]])
        }
      }
    }
    if (JSON.parse(message.pushMessage).arrivedYn === true || JSON.parse(message.pushMessage).arrivedYn === 'true') {
    } else {
      // this.$router.replace({ path: '/' })
      if (notiDetail.actType === 'FL') {
        // this.openPop({ targetKey: userDo.targetKey, targetType: 'chanDetail', value: notiDetail, pushOpenYn: true })
      } else if (notiDetail.actType === 'ME' || notiDetail.actType === 'FM') {
        // this.openPop({ targetKey: userDo.targetKey, targetType: 'chanDetail', value: notiDetail, pushOpenYn: true })
      } else if (notiDetail.actType === 'MA') {
        // this.openPop({ targetKey: userDo.targetKey, targetType: 'chanDetail', value: notiDetail, pushOpenYn: true })
      }
    }
  }, */
  async settingMemoNoti (message) {
    var memo_ = await functions.getContentsMemoList(null, Number(userDo.ISub), Number(userDo.targetKey))
    memo_.jobkindId = notiDetail.jobkindId
    memo_.creTeamKey = Number(userDo)
    await this.addContents(memo_.targetKey, notiDetail.jobkindId)
    if (notiDetail.actYn === true || notiDetail.actYn === 'true') {
      if (JSON.parse(message.pushMessage).arrivedYn === true || JSON.parse(message.pushMessage).arrivedYn === 'true') {

      } else {
        if (notiDetail.jobkindId === 'ALIM') {
          // this.openPop({ targetKey: userDo, targetContentsKey: userDo.targetKey, targetType: 'chanDetail', value: notiDetail })
        } else if (notiDetail.jobkindId === 'BOAR') {
        }
      }
    }
  }
}

export default {
  install (Vue) {
    Vue.config.globalProperties.$getMainBoard = functions.getMainBoard
    Vue.config.globalProperties.$actionVuex = functions.actionVuex
    Vue.config.globalProperties.$getDetail = functions.getDetail
    Vue.config.globalProperties.$getBoardCabinetDetail = functions.getBoardCabinetDetail
    Vue.config.globalProperties.$getContentsDetail = functions.getContentsDetail
    Vue.config.globalProperties.$addChanList = functions.addChanList
    Vue.config.globalProperties.$addContents = functions.addContents
    Vue.config.globalProperties.$getContentsMemoList = functions.getContentsMemoList
    Vue.config.globalProperties.$recvNotiFromBridge = functions.recvNotiFromBridge
    Vue.config.globalProperties.$addChanVuex = functions.addChanVuex
  }
}
