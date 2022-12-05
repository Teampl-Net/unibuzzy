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
  }
}

export default {
  install (Vue) {
    Vue.config.globalProperties.$getViewData = openView.getViewData
  }
}
