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
export const isJsonString = (str) => {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}

export const openView = {
  async getViewData (param, nonLoadingYn) {
    var resultData = null
    resultData = await commonAxiosFunction(param, nonLoadingYn)
    return resultData
  },
  async getRouterViewData (page) {
    var resultData = null
    if (page === 'myPage') {
      return await openView.getMainBoard()
    } else if (page === 'search') {
      return await openView.getSearchMainBoard()
    } else if (page === 'chanList') {
      return await openView.getMainChanList()
    }
    return resultData
  },
  async getMainBoard () {
    var paramMap = new Map()
    paramMap.set('userKey', store.getters['D_USER/GE_USER'].userKey)
    var response = await commonAxiosFunction({ url: 'service/tp.getMainBoard', param: Object.fromEntries(paramMap) }, false)
    // eslint-disable-next-line no-debugger
    debugger
    console.log(response)
    if (response.status === 200 || response.status === '200') {
      // eslint-disable-next-line no-new-object
      var resultObject = new Object()
      resultObject.chanList = response.data.teamList.splice(0, 5)
      resultObject.mChanList = response.data.mTeamList
      resultObject.alimList = response.data.alimList
      /* this.mMainChanList = response.data.teamList.splice(0, 5)
      this.mMainMChanList = response.data.mTeamList
      this.setContsList(response.data.alimList) */
      await store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', [...resultObject.chanList, ...resultObject.mChanList])
      await store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', response.data.alimList.content)
      return resultObject
    }
  },
  async getSearchMainBoard () {
    var paramMap = new Map()
    paramMap.set('cateGroupKey', 2)
    var response = await commonAxiosFunction({ url: 'service/tp.getSearchMainBoard', param: Object.fromEntries(paramMap) }, false)
    // eslint-disable-next-line no-debugger
    debugger
    if (response.data.result === 'OK') {
      console.log(response.data)
      await store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', response.data.teamList.content)
      return response.data
    }
  },
  async getMainChanList () {
    var paramMap = new Map()
    paramMap.set('userKey', store.getters['D_USER/GE_USER'].userKey)
    var response = await methods.getTeamList(paramMap)
    // var response = await commonAxiosFunction({ url: 'service/tp.getSearchMainBoard', param: Object.fromEntries(paramMap) }, false)
    // eslint-disable-next-line no-debugger
    debugger
    console.log(response)
    if (response.data.content) {
      // console.log(response.data)
      await store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', response.data.content)
      return response.data
    }
  }
}

export default {
  install (Vue) {
    Vue.config.globalProperties.$getViewData = openView.getViewData
    Vue.config.globalProperties.$getRouterViewData = openView.getRouterViewData
    Vue.config.globalProperties.$getMainBoard = openView.getMainBoard
  }
}
