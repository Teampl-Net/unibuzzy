/* eslint-disable no-unused-vars */
/* eslint-disable no-debugger */
/* eslint-disable camelcase */

import store from '../../store'
import { mapGetters, mapActions } from 'vuex'
import { methods, commonAxiosFunction } from '../../../public/commonAssets/Tal_axiosFunction'
import { commonMethods } from './Tal_common'
var this_ = this
// var g_user = store.getters['D_USER/GE_USER']
var gAxiosQueue = []
var gNotiDetail
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
    memo.parentMemoKey = parentMemoKey
    memo.targetKey = targetKey
    memo.memoKey = memoKey

    var result = await this.$commonAxiosFunction({
      url: 'service/tp.getMemoList',
      param: memo
    }, true)
    var memos = result.data.memoList[0]
    return memos
  },
  async actionVuex (type, data, targetKey, allYn, replaceYn, creTeamKey, creCabinetKey) {
    var ActName
    if (type === 'TEAM' || type === 'CABI' || type === 'CONT') {
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
        if (type === 'TEAM') {
          dataList = store.getters['D_CHANNEL/GE_MAIN_CHAN_LIST']
          index = dataList.findIndex((item) => item.teamKey === targetKey)
          dataList[index] = data
          store.commit('D_CHANNEL/MU_RECENT_CHANGE_TEAM', targetKey)
          /* if (data.detailPageYn) {
            store.dispatch('D_CHANNEL/AC_RECENT_CHANGE_TEAM', targetKey)
          } */
        } else if (type === 'CABI') {
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
        } else if (type === 'CONT') {
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
    if (gAxiosQueue.findIndex((item) => item === 'getBoardCabinetDetail') !== -1) return
    gAxiosQueue.push('getBoardCabinetDetail')
    // eslint-disable-next-line no-new-object
    var param = new Object()
    var tt = this.propData

    param.currentTeamKey = teamKey
    param.cabinetKey = targetKey
    var resultList = await this.$getCabinetDetail(param)
    var queueIndex = gAxiosQueue.findIndex((item) => item === 'getBoardCabinetDetail')
    gAxiosQueue.splice(queueIndex, 1)
    // mShareItemList가 잘 들어오면 save잘 된것
    //     this.commonListData = resultList.content
    if (resultList && resultList.mCabinet) {
      return resultList.mCabinet
    } else {
      return null
    }
  },
  getVuexMemo (targetKey) {
    var vuexMemoList = store.getters['D_CHANNEL/GE_ALL_MEMO_LIST']
    if (vuexMemoList) {
      var result = vuexMemoList.get(targetKey)
      // var result = vuexMemoList.filter(data => data.targetKey === targetKey)
      if (result && result.length > 0) {
        return result
      } else {
        return []
      }
    } else {
      return []
    }
  },
  getContentsDetail (teamDetail, targetKey, teamKey) {
    // if (gAxiosQueue.findIndex((item) => item === 'getContentsDetail') !== -1) return
    // gAxiosQueue.push('getContentsDetail')
    var detailData
    var dataList
    debugger
    if (!targetKey) return null
    if (!teamDetail) {
      if (teamKey) {
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
      detailData = teamDetail.ELEMENTS.alimList.filter(cab => cab.contentsKey === Number(targetKey))
      if (!detailData || detailData.length === 0) {
        detailData = teamDetail.ELEMENTS.boardList.filter(cab => cab.contentsKey === Number(targetKey))
      }
      // var queueIndex = gAxiosQueue.findIndex((item) => item === 'getContentsDetail')
      // gAxiosQueue.splice(queueIndex, 1)
      return detailData
    }
  },
  async addChanList (teamKey) {
    var result = null
    // if (gAxiosQueue.findIndex((item) => item === 'addChanList') !== -1) return
    // gAxiosQueue.push('addChanList')
    var paramMap = new Map()
    if (teamKey === undefined || teamKey === null) return 'teamKey정보가 누락되었습니다.'
    paramMap.set('teamKey', teamKey)
    paramMap.set('fUserKey', store.getters['D_USER/GE_USER'].userKey)
    console.log('############# addChanList ############')
    console.log(paramMap)
    var resultList = await methods.getTeamList(paramMap, true)

    console.log(resultList)
    // if (resultList.data === undefined || resultList.data === null || resultList.data === '') return
    var response = resultList.data.content[0]

    var team = null
    response.detailPageYn = true
    var teamList = await functions.getDetail('TEAM', teamKey)
    // var queueIndex = null
    if (teamList && teamList.length > 0) {
      console.log('이미있던 채널맞음')
      team = teamList[0]
      if (team.copyTextStr) {
        response.copyTextStr = team.copyTextStr
      }
      response.ELEMENTS = team.ELEMENTS

      // queueIndex = gAxiosQueue.findIndex((item) => item === 'addChanList')
      // gAxiosQueue.splice(queueIndex, 1)
      await store.dispatch('D_CHANNEL/AC_REPLACE_CHANNEL', response)
      result = true
    } else {
      console.log('없던 채널이라 추가했음----------------------------------------------------------')
      await store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', [response])

      // queueIndex = gAxiosQueue.findIndex((item) => item === 'addChanList')
      // gAxiosQueue.splice(queueIndex, 1)
      result = false
    }
    // alert('result:' + result)
    return result
    // await functions.actionVuex('TEAM', response, response.teamKey, false, true)
  },
  async saveVuexRecvMsg (recvMsg) {
    // var message
    var result = false
    try {
      if (JSON.parse(recvMsg.pushMessage).backgroundYn) {
        gNotiDetail = JSON.parse(recvMsg.pushMessage)
      } else {
        if (JSON.parse(recvMsg.pushMessage).noti.data.item !== undefined && JSON.parse(recvMsg.pushMessage).noti.data.item.data !== undefined && JSON.parse(recvMsg.pushMessage).noti.data.item.data !== null && JSON.parse(recvMsg.pushMessage).noti.data.item.data !== '') {
          gNotiDetail = JSON.parse(recvMsg.pushMessage).noti.data.item.data
        } else {
          gNotiDetail = JSON.parse(recvMsg.pushMessage).noti.data
        }
      }
      //  alert(JSON.stringify(notiDetail))
      if (JSON.parse(gNotiDetail.userDo).targetKind === 'CONT') {
        result = await this.addContents(JSON.parse(gNotiDetail.userDo).targetKey, gNotiDetail.jobkindId)
        // result = await functions.setAlimNoti(recvMsg)
      } else if (JSON.parse(gNotiDetail.userDo).targetKind === 'CABI') {
        result = await this.addContents(JSON.parse(gNotiDetail.userDo).ISub, 'BOAR')
        // result = functions.setCabiNoti(recvMsg)
      } else if (JSON.parse(gNotiDetail.userDo).targetKind === 'TEAM') {
        // result = functions.setChanNoti(recvMsg)
        result = await this.addChanList(Number(gNotiDetail.creTeamKey))
      } /* else if (JSON.parse(gNotiDetail.userDo).targetKind === 'MEMO') {
          functions.setMemoNoti(message)
        } */
    } catch (err) {
      console.error('메세지를 파싱할수 없음 ' + err)
    }
    return result
  },
  async addContents (targetKey, jobkindId) {
    // eslint-disable-next-line no-new-object
    var param = new Object()
    param.contentsKey = targetKey
    param.jobkindId = jobkindId
    var resultList = await methods.getContentsList(param, true)
    if (!resultList || !resultList.content || resultList.content.length === 0) return false
    var detailData = resultList.content[0]
    debugger
    store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [detailData])
    store.dispatch('D_CHANNEL/AC_ALL_MEMO_LIST', { memo: detailData.memoList, contentsKey: detailData.contentsKey })
    return detailData
  },
  async setAlimNoti () {
    var findContentsYn = await this.addContents(JSON.parse(gNotiDetail.userDo).targetKey, gNotiDetail.jobkindId)
    return findContentsYn
  },
  async setCabiNoti (message) {
    var findContentsYn = await this.addContents(JSON.parse(gNotiDetail.userDo).ISub, 'BOAR')
    return findContentsYn
    /* if (Number(JSON.parse(gNotiDetail.userDo).userKey) === Number(g_user.userKey)) {
      return
    } */
  },
  async setChanNoti (message) {
    /* if (gNotiDetail.actType === 'FM' || gNotiDetail.actType === 'FL' || this.gNotiDetail.actType === 'RQ' || this.gNotiDetail.actType === 'AP' || gNotiDetail.actType === 'RM' || gNotiDetail.actType === 'MA' || gNotiDetail.actType === 'CR') {
      await functions.addChanList(Number(gNotiDetail.creTeamKey))
    } */
  }
  /*  async setMemoNoti (message) {
    var memo_ = await functions.getContentsMemoList(null, Number(JSON.parse(gNotiDetail.userDo).ISub), Number(JSON.parse(gNotiDetail.userDo).targetKey))
    memo_.jobkindId = gNotiDetail.jobkindId
    memo_.creTeamKey = Number(gNotiDetail.creTeamKey)
    await this.addContents(memo_.targetKey, gNotiDetail.jobkindId)
    if (gNotiDetail.actYn === true || gNotiDetail.actYn === 'true') {
      if (JSON.parse(recvMsg.pushMessage).arrivedYn === true || JSON.parse(recvMsg.pushMessage).arrivedYn === 'true') {

      } else {
        if (gNotiDetail.jobkindId === 'ALIM') {
          // this.openPop({ targetKey: gNotiDetail.creTeamKey, clickContentsKey: JSON.parse(gNotiDetail.userDo).targetKey, targetType: 'chanDetail', value: notiDetail })
        } else if (gNotiDetail.jobkindId === 'BOAR') {
          // this.openPop({ targetKey: JSON.parse(gNotiDetail.userDo).targetKey, targetType: 'boardDetail', cabinetNameMtext: JSON.parse(gNotiDetail.userDo).targetName, value: notiDetail, pushOpenYn: true })
        }
      }
    }
  } */
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
    Vue.config.globalProperties.$getVuexMemo = functions.getVuexMemo
  }
}
