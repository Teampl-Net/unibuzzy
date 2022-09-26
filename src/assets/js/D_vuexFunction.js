/* eslint-disable no-unused-vars */
/* eslint-disable no-debugger */
/* eslint-disable camelcase */

import store from '../../store'
import { mapGetters, mapActions } from 'vuex'
import { methods } from '../../../public/commonAssets/Tal_axiosFunction'
import { commonMethods } from './Tal_common'
var this_ = this
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
      debugger
      ActName = 'D_CHANNEL/AC_MAIN_CHAN_LIST'
    } else if (type === 'COMMONCONT') {
      ActName = 'D_CHANNEL/AC_SET_CHAN_CONT_LIST'
    } else if (type === 'ALIM') {
      ActName = 'D_CONTENTS/AC_MAIN_ALIM_LIST'
    } else if (type === 'BOAR') {
      ActName = 'D_CONTENTS/AC_MAIN_BOARD_LIST'
    } else if (type === 'MAINTEAM') {
      ActName = 'D_CONTENTS/AC_MAIN_TEAM_LIST'
    } else if (type === 'USER') {
      ActName = 'D_USER/AC_USER'
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
          debugger
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
          debugger
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
            debugger
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
            debugger
            store.commit('D_CHANNEL/MU_RECENT_CHANGE_TEAM', creTeamKey)
          }
        } else if (type === 'ALIM') {
          dataList = store.getters['D_CONTENTS/GE_MAIN_ALIM_LIST']
          index = dataList.findIndex((item) => item.contentsKey === targetKey)
          dataList[index] = data
        } else if (type === 'BOAR') {
          dataList = store.getters['D_CONTENTS/GE_MAIN_BOARD_LIST']
          index = dataList.findIndex((item) => item.contentsKey === targetKey)
          dataList[index] = data
        } else if (type === 'MAINTEAM') {
          dataList = store.getters['D_CONTENTS/GE_MAIN_TEAM_LIST']
          index = dataList.findIndex((item) => item.teamKey === targetKey)
          dataList[index] = data
        }/* else if (type === 'USER') {
        dataList = store.getters['D_USER/GE_USER']
        for (i = 0; i < dataList.length; i++) {
          if (dataList[i].userKey === targetKey) {
            dataList[i] = data
            break
          }
        }
      } */
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
      if (result === undefined || result === '' || result.length === 0) {
        var paramMap = new Map()
        paramMap.set('teamKey', targetKey)
        methods.getTeamList(paramMap).then(resultList => {
          store.commit('D_CHANNEL/MU_ADD_MAIN_CHAN_LIST', resultList.data.content[0])
          result = dataList.filter(data => data.teamKey === targetKey)
          return result
        })
      } else {
        return result
      }
    } else if (type === 'ALIM') {
      dataList = store.getters['D_CONTENTS/GE_MAIN_ALIM_LIST']
      result = dataList.filter(data => data.contentsKey === targetKey)
      return result
    } else if (type === 'BOAR') {
      dataList = store.getters['D_CONTENTS/GE_MAIN_BOARD_LIST']
      result = dataList.filter(data => data.contentsKey === targetKey)
      return result
    }
  },
  getBoardCabinetDetail (teamDetail, targetKey) {
    var cabinetList
    var cabinetDetail
    if (!teamDetail) return null
    cabinetList = teamDetail.ELEMENTS.cabinetList
    cabinetDetail = cabinetList.filter(cab => cab.cabinetKey === Number(targetKey))
    /* if (cabinetDetail.length === 0) {
      // eslint-disable-next-line no-new-object
      var param = new Object()

      param.currentTeamKey = teamDetail.teamKey
      param.cabinetKey = targetKey
      var response = methods.getCabinetDetail(param)

      if (response) {
        cabinetDetail = response.mCabinet
        teamDetail.ELEMENTS.cabinetList.push(cabinetDetail)
        await functions.actionVuex('TEAM', teamDetail, teamDetail.teamKey, false, true, null, null)
      }
    } */
    console.log('return:  cabinetDetail')
    console.log(cabinetDetail)
    return cabinetDetail
  },
  getContentsDetail (teamDetail, targetKey, teamKey) {
    var detailData
    var dataList
    if (!targetKey) return null
    if (!teamDetail) {
      debugger
      if (teamKey) {
        var teamList = store.getters['D_CHANNEL/GE_MAIN_CHAN_LIST']
        var result = teamList.filter(data => data.teamKey === teamKey)
        if (result) {
          teamDetail = result[0]
        } else {
          return null
        }
      }
    }
    detailData = teamDetail.ELEMENTS.boardList.filter(cab => cab.contentsKey === Number(targetKey))
    if (detailData && detailData.length !== 0) {
      return detailData
    } else {
      detailData = teamDetail.ELEMENTS.alimList.filter(cab => cab.contentsKey === Number(targetKey))
      return detailData
    }
  },
  async addChanList (teamKey) {
    var paramMap = new Map()
    if (teamKey === undefined || teamKey === null) return 'teamKey정보가 누락되었습니다.'
    paramMap.set('teamKey', teamKey)
    paramMap.set('fUserKey', store.getters['D_USER/GE_USER'].userKey)
    var resultList = await methods.getTeamList(paramMap)
    /* if (response)  */
    var response = resultList.data.content[0]
    var team = null
    var teamList = functions.getDetail('TEAM', teamKey)
    if (teamList) {
      team = teamList[0]
      response.ELEMENTS = team.ELEMENTS
    }
    response.teamTypeText = commonMethods.teamTypeString(response.teamType)
    var title = '[더알림]' + commonMethods.changeText(response.nameMtext)
    var message = commonMethods.changeText(response.memoMtext)
    response.copyTextStr = await commonMethods.makeShareLink(response.teamKey, 'chanDetail', message, title)

    response.detailPageYn = true
    await functions.actionVuex('TEAM', response, response.teamKey, false, true)
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
