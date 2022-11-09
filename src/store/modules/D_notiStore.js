/* eslint-disable camelcase */
// import { nextTick } from '@vue/runtime-core'
import { commonMethods } from '../../assets/js/Tal_common.js'

import store from '../index'

const D_NOTI = {
  namespaced: true,
  state: {
    NOTI_OBJ: {},
    notiList: []
  },
  getters: {
    GE_NEW_NOTI_OBJECT (state) {
      return state.NOTI_OBJ
    },
    GE_NEW_NOTI_LIST (state) {
      return state.notiList
    }
  },
  mutations: {
    MU_NEW_NOTI: (state, message) => {
      commonMethods.dAlertLog(' STEP - 1 ')
      // !JSON.parse(message.pushMessage).appActiveYn
      /* if (!JSON.parse(message.pushMessage).arrivedYn) {
        var notiDetail = JSON.parse(message.pushMessage)
      } */
      // if (userKey === 123 || userKey === 255 || userKey === 104) { commonMethods.dAlertLog(JSON.stringify(message)) }

      // var notiDetail = JSON.parse(message.pushMessage)
      var notiDetail
      // var oNoti
      var oUserDo
      // var oMessage

      try {
        commonMethods.dAlertLog(' STEP - 2')
        if (JSON.parse(message.pushMessage).backgroundYn) {
          commonMethods.dAlertLog(' STEP - 2-1')
          notiDetail = JSON.parse(message.pushMessage)
        } else {
          if (JSON.parse(message.pushMessage).noti.data.item !== undefined && JSON.parse(message.pushMessage).noti.data.item.data !== undefined && JSON.parse(message.pushMessage).noti.data.item.data !== null && JSON.parse(message.pushMessage).noti.data.item.data !== '') {
            commonMethods.dAlertLog(' STEP - 2-2')
            notiDetail = JSON.parse(message.pushMessage).noti.data.item.data
          } else {
            commonMethods.dAlertLog(' STEP - 2-3')
            notiDetail = JSON.parse(message.pushMessage).noti.data
          }
        }
        commonMethods.dAlertLog(' 3 NOTI .. ')
        oUserDo = JSON.parse(notiDetail.userDo)
        commonMethods.dAlertLog(' 4 NOTI')
      } catch (e) {
        commonMethods.dAlertLog(' 2-NOTI exception')
        commonMethods.dAlertLog(e)
      }

      /*  else {
            if (JSON.parse(message.pushMessage).noti.data.item !== undefined && JSON.parse(message.pushMessage).noti.data.item.data !== undefined && JSON.parse(message.pushMessage).noti.data.item.data !== null && JSON.parse(message.pushMessage).noti.data.item.data !== '') {
              notiDetail = JSON.parse(message.pushMessage).noti.data.item.data
            } else {
              notiDetail = JSON.parse(message.pushMessage).noti.data
            }
          } */
      // var notiUserDo = JSON.parse(notiDetail.userDo)
      // if (userKey === 123 || userKey === 255 || userKey === 104) {
      //   commonMethods.dAlertLog(' STEP - 3 ')
      // }
      // 1. 내가 발생시킨 노티인지
      /* if (Number(notiUserDo.userKey) === this.GE_USER.userKey) {
        return
      } */
      commonMethods.dAlertLog(' STEP - 1-1 vuex 등록 시작')
      // eslint-disable-next-line no-new-object
      var notiOpenPopParam = new Object()
      if (oUserDo.targetKind === 'CONT') {
        // 알림 작성/ 댓글 작성/...
        notiOpenPopParam.targetType = 'pushDetail'
        notiOpenPopParam.targetKey = Number(oUserDo.targetKey)
        notiOpenPopParam.contentsKey = Number(oUserDo.targetKey)
        notiOpenPopParam.jobkindId = notiDetail.jobkindId
        notiOpenPopParam.creTeamKey = Number(notiDetail.creTeamKey)

        notiOpenPopParam.nameMtext = notiDetail.nameMtext
        commonMethods.dAlertLog(' STEP - 1-2 CONT 셋팅')
      } else if (oUserDo.targetKind === 'CABI') {
        // 게시글 작성
        notiOpenPopParam.targetType = 'pushDetail'
        notiOpenPopParam.cabinetKey = Number(oUserDo.targetKey)
        notiOpenPopParam.targetKey = Number(oUserDo.ISub)
        notiOpenPopParam.contentsKey = Number(oUserDo.ISub)
        notiOpenPopParam.jobkindId = notiDetail.jobkindId
        notiOpenPopParam.creTeamKey = Number(notiDetail.creTeamKey)
        // cabinetNameMtext
        notiOpenPopParam.cabinetNameMtext = notiDetail.cabinetNameMtext
        commonMethods.dAlertLog(' STEP - 1-2 CABI 셋팅')
      } else if (oUserDo.targetKind === 'TEAM') {
        // 채널생성및 수정/구독자/매니저/..추가
        notiOpenPopParam.targetType = 'chanDetail'
        notiOpenPopParam.targetKey = Number(oUserDo.targetKey)
        notiOpenPopParam.creTeamKey = Number(notiDetail.creTeamKey)
        commonMethods.dAlertLog(' STEP - 1-2 TEAM 셋팅')
      }
      commonMethods.dAlertLog(' STEP - 1-3 셋팅')
      var popHistory = store.getters['D_HISTORY/GE_GPOP_STACK']
      var currentPop = popHistory[popHistory.length - 1]
      notiOpenPopParam.notiOpenTargetPage = currentPop
      notiOpenPopParam.notiYn = true
      state.NOTI_OBJ = notiOpenPopParam
      // state.NOTI_OBJ.value = notiOpenPopParam
      // 임시로 달아둠
      commonMethods.dAlertLog(' STEP - 1-4 POPUP 히스토리를 NOTIDATA에 추가')

      if (state.notiList.length > 10) {
        state.notiList.splice(9, state.notiList.length - 9)
      }
      state.notiList.unshift(notiOpenPopParam)
      commonMethods.dAlertLog(' STEP - 1 vuex 끝')
    }
  },
  actions: {
    AC_NEW_NOTI: ({ commit, state }, message) => {
      commit('MU_NEW_NOTI', message)
      // if (payload.jobkindId === 'ALIM') { commit('MU_ADD_NEW_NOTI', payload) }
    }
  }
}

export default D_NOTI
