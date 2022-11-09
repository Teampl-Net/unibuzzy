/* eslint-disable camelcase */
// import { nextTick } from '@vue/runtime-core'
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
      var userKey = store.getters['D_USER/GE_USER'].userKey
      if (userKey === '123' || userKey === '255' || userKey === '104') { alert(' STEP - 1 ') }
      // !JSON.parse(message.pushMessage).appActiveYn
      /* if (!JSON.parse(message.pushMessage).arrivedYn) {
        var notiDetail = JSON.parse(message.pushMessage)
      } */
      var notiDetail = JSON.parse(message.pushMessage)
      /*  else {
            if (JSON.parse(message.pushMessage).noti.data.item !== undefined && JSON.parse(message.pushMessage).noti.data.item.data !== undefined && JSON.parse(message.pushMessage).noti.data.item.data !== null && JSON.parse(message.pushMessage).noti.data.item.data !== '') {
              notiDetail = JSON.parse(message.pushMessage).noti.data.item.data
            } else {
              notiDetail = JSON.parse(message.pushMessage).noti.data
            }
          } */
      var notiUserDo = JSON.parse(notiDetail.userDo)
      // 1. 내가 발생시킨 노티인지
      /* if (Number(notiUserDo.userKey) === this.GE_USER.userKey) {
        return
      } */
      // eslint-disable-next-line no-new-object
      var notiOpenPopParam = new Object()
      if (notiUserDo.targetKind === 'CONT') {
        // 알림 작성/ 댓글 작성/...
        notiOpenPopParam.targetType = 'pushDetail'
        notiOpenPopParam.targetKey = Number(notiUserDo.targetKey)
        notiOpenPopParam.contentsKey = Number(notiUserDo.targetKey)
        notiOpenPopParam.jobkindId = notiDetail.jobkindId
        notiOpenPopParam.creTeamKey = Number(notiDetail.creTeamKey)
      } else if (notiUserDo.targetKind === 'CABI') {
        // 게시글 작성
        notiOpenPopParam.targetType = 'pushDetail'
        notiOpenPopParam.cabinetKey = Number(notiUserDo.targetKey)
        notiOpenPopParam.targetKey = Number(notiUserDo.ISub)
        notiOpenPopParam.contentsKey = Number(notiUserDo.ISub)
        notiOpenPopParam.jobkindId = notiDetail.jobkindId
        notiOpenPopParam.creTeamKey = Number(notiDetail.creTeamKey)
        // cabinetNameMtext
      } else if (notiUserDo.targetKind === 'TEAM') {
        // 채널생성및 수정/구독자/매니저/..추가
        notiOpenPopParam.targetType = 'chanDetail'
        notiOpenPopParam.targetKey = Number(notiUserDo.targetKey)
        notiOpenPopParam.creTeamKey = Number(notiDetail.creTeamKey)
      }

      var popHistory = store.getters['D_HISTORY/GE_GPOP_STACK']
      var currentPop = popHistory[popHistory.length - 1]
      notiOpenPopParam.notiOpenTargetPage = currentPop
      notiOpenPopParam.notiYn = true
      state.NOTI_OBJ = notiOpenPopParam
      // state.NOTI_OBJ.value = notiOpenPopParam
      // 임시로 달아둠
      if (state.notiList.length > 10) {
        state.notiList.splice(9, state.notiList.length - 9)
      }
      state.notiList.unshift(notiOpenPopParam)
      if (userKey === '123' || userKey === '255' || userKey === '104') { alert(' STEP - 1-1 vuex 끝') }
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
