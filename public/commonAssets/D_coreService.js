/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import axios from 'axios'
// eslint-disable-next-line no-unused-vars

// 캐싱 방지
/* axios.defaults.headers.get['Cache-Control'] = 'no-cache'
axios.defaults.headers.get.Pragma = 'no-cache' */
var g_axiosQueue = []

export const coreMethods = {
  async coreLoginCheck (paramMap) {
    var result = await axios.post('service/tp.coreLoginCheck', Object.fromEntries(paramMap))
    return result
  },
  async commonCoreAxios (setItem, nonLoadingYn, noAuthYn) {
    console.log('####-------------------------------coommonCoreAxios.' + setItem.url + '----------------------------------------####')
    console.log('####parameter is: ')
    console.log(setItem.param)
    await coreMethods.coreLoginCheck()
    var result = false
    if (nonLoadingYn === true) {
    } else {
      console.log('여기다')
    }
    // 패치해라!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    var devModeYn = true
    var url = setItem.url
    if (!devModeYn) {
      url = 'https://mo.d-alim.com/' + url
    }
    await axios.post(setItem.url, setItem.param, { withCredentials: true }
    ).then(response => {
      result = response
      console.log('####resultData is: ')
      console.log(result)
    }).catch((error) => {
      // alert('세션이 만료되어 메인 페이지로 이동합니다.')
      this.$router.replace('/')
      result = error
      console.log('####error is: ')
      console.log(error)
    })

    console.log('####-----------------------------------------------------------END----------------------------------------------------------------####')
    return result
  },
  async saveUserAndAccess (userProfile, coreParam, callbackF) {
    var param = {}
    param.soType = userProfile.soType
    if (userProfile.email !== undefined && userProfile.email !== null && userProfile.email !== '') { param.soEmail = userProfile.email }
    if (userProfile.name !== undefined && userProfile.name !== null && userProfile.name !== '') {
      param.soName = userProfile.name
    }
    if (userProfile.userImg !== undefined && userProfile.userImg !== null && userProfile.userImg !== '') {
      param.soPicUrl = userProfile.userImg
      param.picMfilekey = userProfile.userImg
    }
    param.mobileYn = userProfile.mobileYn
    param.soAccessToken = userProfile.aToken
    var deviceInfo = userProfile.deviceInfo
    if (deviceInfo) {
      param.fcmKey = deviceInfo.fcmKey
      param.osName = deviceInfo.systemName
      param.osVersion = deviceInfo.systemVersion
      param.deviceId = deviceInfo.uniqueId + ''
      param.deviceModel = deviceInfo.model
      param.deviceBrand = deviceInfo.brand
      param.isTablet = deviceInfo.isTablet
      param.countryCode = deviceInfo.contry
      param.areaName = deviceInfo.timeZome
    } else {
      var isMobile = /Mobi/i.test(window.navigator.userAgent)
      if (!isMobile && localStorage.getItem('fcmKey') != null) {
        param.fcmKey = localStorage.getItem('fcmKey')
      }
    }
    var setParam = {}
    setParam.user = param
    setParam.partner = coreParam
    var result = await axios.post('service/tp.saveUserAndAccess', setParam)
    console.log(result)
    if (result.data.result) {
      if (callbackF) {
        callbackF(result)
      }
    }
  }
}

export default {
  install (Vue) {
    Vue.config.globalProperties.$commonCoreAxios = coreMethods.commonCoreAxios
    Vue.config.globalProperties.$coreLoginCheck = coreMethods.coreLoginCheck
  }
}
