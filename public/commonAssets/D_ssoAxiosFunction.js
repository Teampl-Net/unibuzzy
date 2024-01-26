/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import axios from 'axios'
// eslint-disable-next-line no-unused-vars
import { params } from 'vue-router'
import { coreMethods } from './D_coreService'
import { commonMethods } from '../../src/assets/js/Tal_common'
import store from '@/store'
import router from '@/router'
import { commonAxiosFunction } from './Tal_axiosFunction'
import { mapGetters, mapActions } from 'vuex'
import { app } from '@/main'
var g_axiosQueue = []
const BASE_URL = 'http://192.168.0.78:9443'
// const BASE_URL = 'https://hybric.net:9443'
export const ssoMethods = {
  async getUserProfile (userToken, refreshToken) {
    try {
      // eslint-disable-next-line no-debugger
      debugger
      const response = await commonAxiosFunction({ url: `${BASE_URL}/sso/tp.getUserProfile`, param: { userToken: userToken, refreshToken: refreshToken, appToken: this.$APP_CONFIG.appToken } })
      const result = response.data
      console.log(result)
      // eslint-disable-next-line no-debugger
      debugger
      localStorage.setItem('user', JSON.stringify(result.user))
      await store.dispatch('D_USER/AC_USER', result.user)
      app.config.globalProperties.$USER_TOKEN = result.user.userToken
      app.config.globalProperties.$APP_CONFIG.appToken = result.app.appToken
      localStorage.setItem('sessionUser', JSON.stringify(result.user))
      // eslint-disable-next-line no-debugger
      debugger
    } catch (error) {

    }
  },
  async getUserAllInfo (userToken) {
    try {
      console.log(`${BASE_URL}/tp.getUserAllInfo`)
      // eslint-disable-next-line no-debugger
      debugger
      const result = await commonAxiosFunction({ url: `${BASE_URL}/tp.getUserAllInfo`, param: { userToken: userToken, appToken: this.$APP_CONFIG.appToken } })
      console.log(result)
      return result.data
    } catch (error) {
    }
  }
}

export default {
  install (Vue) {
    Vue.config.globalProperties.$gGetUserProfile = ssoMethods.getUserProfile
    Vue.config.globalProperties.$gGetUserAllInfo = ssoMethods.getUserAllInfo
  }
}
