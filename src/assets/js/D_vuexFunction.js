/* eslint-disable no-unused-vars */
/* eslint-disable no-debugger */
/* eslint-disable camelcase */

import store from '../../store'
import { mapGetters, mapActions } from 'vuex'
import { methods, commonAxiosFunction } from '../../../public/commonAssets/Tal_axiosFunction'
import { commonMethods } from './Tal_common'
var this_ = this
var g_user = store.getters['D_USER/GE_USER']
var g_axiosQueue = []
document.addEventListener('message', e => functions.recvNoti(e))
window.addEventListener('message', e => functions.recvNoti(e))
var notiDetail
const isJsonString = (str) => {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}

const functions = {
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
  getContentsDetail (teamDetail, targetKey, teamKey) {
    // if (g_axiosQueue.findIndex((item) => item === 'getContentsDetail') !== -1) return
    // g_axiosQueue.push('getContentsDetail')
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
      // var queueIndex = g_axiosQueue.findIndex((item) => item === 'getContentsDetail')
      // g_axiosQueue.splice(queueIndex, 1)
      return detailData
    }
  },
  async addChanList (teamKey) {
    var result = null
    // if (g_axiosQueue.findIndex((item) => item === 'addChanList') !== -1) return
    // g_axiosQueue.push('addChanList')
    var paramMap = new Map()
    if (teamKey === undefined || teamKey === null) return 'teamKey정보가 누락되었습니다.'
    paramMap.set('teamKey', teamKey)
    paramMap.set('fUserKey', store.getters['D_USER/GE_USER'].userKey)
    console.log('############# addChanList ############')
    console.log(paramMap)
    var resultList = await methods.getTeamList(paramMap)

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
      response.ELEMENTS = team.ELEMENTS

      // queueIndex = g_axiosQueue.findIndex((item) => item === 'addChanList')
      // g_axiosQueue.splice(queueIndex, 1)
      await store.dispatch('D_CHANNEL/AC_REPLACE_CHANNEL', response)
      result = true
    } else {
      console.log('없던 채널이라 추가했음----------------------------------------------------------')
      await store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', [response])

      // queueIndex = g_axiosQueue.findIndex((item) => item === 'addChanList')
      // g_axiosQueue.splice(queueIndex, 1)
      result = false
    }
    // alert('result:' + result)
    return result
    // await functions.actionVuex('TEAM', response, response.teamKey, false, true)
  },
  recvNoti (e) {
    var message
    try {
      if (isJsonString(e.data) === true) {
        message = JSON.parse(e.data)
      } else {
        message = e.data
      }
      if (message.type === 'pushmsg') {
        if (JSON.parse(message.pushMessage).backgroundYn) {
          notiDetail = JSON.parse(message.pushMessage)
        } else {
          if (JSON.parse(message.pushMessage).noti.data.item !== undefined && JSON.parse(message.pushMessage).noti.data.item.data !== undefined && JSON.parse(message.pushMessage).noti.data.item.data !== null && JSON.parse(message.pushMessage).noti.data.item.data !== '') {
            notiDetail = JSON.parse(message.pushMessage).noti.data.item.data
          } else {
            notiDetail = JSON.parse(message.pushMessage).noti.data
          }
        }

        //  alert(JSON.stringify(notiDetail))
        if (JSON.parse(notiDetail.userDo).targetKind === 'CONT') {
          functions.settingAlimNoti(message)
        } else if (JSON.parse(notiDetail.userDo).targetKind === 'CABI') {
          functions.settingCabiNoti(message)
        } else if (JSON.parse(notiDetail.userDo).targetKind === 'TEAM') {
          functions.settingChanNoti(message)
        } else if (JSON.parse(notiDetail.userDo).targetKind === 'MEMO') {
          functions.settingMemoNoti(message)
        }
      }
    } catch (err) {
      console.error('메세지를 파싱할수 없음 ' + err)
    }
  },
  async settingCabiNoti (message) {
    await functions.addContents(JSON.parse(notiDetail.userDo).ISub, 'BOAR')
    /* if (Number(JSON.parse(notiDetail.userDo).userKey) === Number(g_user.userKey)) {
      return
    } */
    if (notiDetail.actYn === true || notiDetail.actYn === 'true') {
      if (JSON.parse(message.pushMessage).arrivedYn === true || JSON.parse(message.pushMessage).arrivedYn === 'true') {
        ;
      } else {
        // this.openPop({ targetKey: JSON.parse(notiDetail.userDo).ISub, targetType: 'boardDetail', cabinetNameMtext: JSON.parse(notiDetail.userDo).targetName, value: notiDetail, pushOpenYn: true })
      }
    }
  },
  async addContents (targetKey, jobkindId) {
    // eslint-disable-next-line no-new-object
    var param = new Object()
    param.contentsKey = targetKey
    param.jobkindId = jobkindId
    var resultList = await methods.getContentsList(param)
    if (!resultList || !resultList.content || resultList.content.length === 0) return false
    var detailData = resultList.content[0]
    store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [detailData])
  },
  async settingAlimNoti (message) {
    // alert('come')
    await functions.addContents(JSON.parse(notiDetail.userDo).targetKey, notiDetail.jobkindId)
    /* if (Number(JSON.parse(notiDetail.userDo).userKey) === Number(g_user.userKey)) {
      return
    } */
    /* var noti = await functions.getContentsDetail(null, JSON.parse(notiDetail.userDo).targetKey, notiDetail.creTeamKey)
    alert(JSON.stringify(noti))
    store.dispatch('D_UPDATE/AC_ADD_NEW_NOTI', noti) */
    if (notiDetail.actYn === true || notiDetail.actYn === 'true') {
      if (JSON.parse(message.pushMessage).arrivedYn === true || JSON.parse(message.pushMessage).arrivedYn === 'true') {
        ;
      } else {
        /*  if (notiDetail.jobkindId === 'ALIM') {
          this.openPop({ targetKey: notiDetail.creTeamKey, nameMtext: notiDetail.creTeamName, targetContentsKey: JSON.parse(notiDetail.userDo).targetKey, targetType: 'chanDetail', value: notiDetail })
        } else if (notiDetail.jobkindId === 'BOAR') {
          this.openPop({ targetKey: JSON.parse(notiDetail.userDo).targetKey, targetType: 'boardDetail', cabinetNameMtext: JSON.parse(notiDetail.userDo).targetName, value: notiDetail, pushOpenYn: true })
        } */
      }
    } else {
      if (JSON.parse(message.pushMessage).arrivedYn === true || JSON.parse(message.pushMessage).arrivedYn === 'true') {
        if (notiDetail.jobkindId !== 'BOAR') {
          // if (this.$route.path === '/') {
          //   this.$refs.mainRouterView.getMainBoard()
          // }
        }
      } else {
        // this.openPop({ targetKey: notiDetail.creTeamKey, nameMtext: notiDetail.creTeamName, targetContentsKey: JSON.parse(notiDetail.userDo).targetKey, targetType: 'chanDetail', value: notiDetail })
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
      url: 'service/tp.getFollowerList',
      param: Object.fromEntries(paramMap)
    })
    var user = result.data.content
    return user
  },
  async settingChanNoti (message) {
    if (notiDetail.actType === 'FM' || notiDetail.actType === 'FL' || notiDetail.actType === 'RM' || notiDetail.actType === 'MA' || notiDetail.actType === 'CR') {
      await functions.addChanList(Number(notiDetail.creTeamKey))
    }

    if (((notiDetail.actType === 'ME' || notiDetail.actType === 'FM') || notiDetail.actType === 'RM' || (notiDetail.actType === 'MA'))) {
      var channelL = functions.getDetail('TEAM', Number(JSON.parse(notiDetail.userDo).targetKey))
      if (channelL) {
        var user = null
        if (notiDetail.actType === 'ME' || notiDetail.actType === 'FM') {
          user = await functions.getFollowerList(channelL[0].teamKey, Number(JSON.parse(notiDetail.userDo).userKey))
          if (user.length === 1) this.$store.commit('D_CHANNEL/MU_REPLACE_SHOW_PROFILE_USER', [user[0]])
        } else if (notiDetail.actType === 'MA') {
          user = await functions.getFollowerList(channelL[0].teamKey, Number(JSON.parse(notiDetail.userDo).userKey))
          if (Number(JSON.parse(notiDetail.userDo).userKey) === g_user.userKey) {
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
        // this.openPop({ targetKey: JSON.parse(notiDetail.userDo).targetKey, targetType: 'chanDetail', value: notiDetail, pushOpenYn: true })
      } else if (notiDetail.actType === 'ME' || notiDetail.actType === 'FM') {
        // this.openPop({ targetKey: JSON.parse(notiDetail.userDo).targetKey, targetType: 'chanDetail', value: notiDetail, pushOpenYn: true })
      } else if (notiDetail.actType === 'MA') {
        // this.openPop({ targetKey: JSON.parse(notiDetail.userDo).targetKey, targetType: 'chanDetail', value: notiDetail, pushOpenYn: true })
      }
    }
  },
  settingMemoNoti (message) {
    if (notiDetail.actYn === true || notiDetail.actYn === 'true') {
      if (JSON.parse(message.pushMessage).arrivedYn === true || JSON.parse(message.pushMessage).arrivedYn === 'true') {

      } else {
        if (notiDetail.jobkindId === 'ALIM') {
          // this.openPop({ targetKey: notiDetail.creTeamKey, targetContentsKey: JSON.parse(notiDetail.userDo).targetKey, targetType: 'chanDetail', value: notiDetail })
        } else if (notiDetail.jobkindId === 'BOAR') {
          // this.openPop({ targetKey: JSON.parse(notiDetail.userDo).targetKey, targetType: 'boardDetail', cabinetNameMtext: JSON.parse(notiDetail.userDo).targetName, value: notiDetail, pushOpenYn: true })
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
  }
}
