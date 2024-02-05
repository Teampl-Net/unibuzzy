/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import axios from 'axios'
// eslint-disable-next-line no-unused-vars
import router from '../../src/router'
import { commonMethods } from '../../src/assets/js/Tal_common'
import store from '../../src/store'
import { mapGetters, mapActions } from 'vuex'
/* axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET,POST,PATCH,PUT,DELETE,OPTIONS'
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, Content-Type, X-Auth-Token'
axios.defaults.headers.post['Content-Type'] = 'application/json;'
axios.defaults.headers.common['Content-Type'] = 'application/json;'

axios.defaults.timeout = 100000
axios.defaults.withCredentials = true */
// axios.defaults.baseURL = 'api'
// axios.defaults.baseURL = 'http://192.168.0.27:19090'
// axios.defaults.baseURL = 'http://61.97.186.14:19090'
// axios.defaults.baseURL = 'http://192.168.0.29:19090'
// axios.defaults.baseURL = 'http://14.51.96.245:19090'
// axios.defaults.baseURL = 'http://dev.on-apt.kr:8081/'

// 캐싱 방지
/* axios.defaults.headers.get['Cache-Control'] = 'no-cache'
axios.defaults.headers.get.Pragma = 'no-cache' */
var g_axiosQueue = []

export async function commonAxiosFunction (setItem, nonLoadingYn) {
  console.log('####-------------------------------commonAxiosFunction.' + setItem.url + '----------------------------------------####')
  console.log('####parameter is: ')
  console.log(setItem.param)
  if (setItem.firstYn) {
  } else {
    await methods.userLoginCheck()
  }
  var result = false
  if (nonLoadingYn === true) {
  } else {
    console.log('여기다')
    commonMethods.showAxiosLoading(true)
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
  commonMethods.showAxiosLoading(false)
  console.log('####-----------------------------------------------------------END----------------------------------------------------------------####')
  return result
}

export async function checkSession () {
  var result = false
  await axios.post('https://www.hybric.net:9443/service/tp.checkSession', { withCredentials: true }
  ).then(response => {
    result = response
  }).catch((error) => {
    // alert('세션이 만료되어 메인 페이지로 이동합니다.')
    router.replace('/')
    result = error
    console.log(error)
  })
  return result
}

export function isMobile () {
  var user = navigator.userAgent
  var mobileYn = false

  if (user.indexOf('iPhone') > -1 || user.indexOf('Android') > -1) {
    mobileYn = true
  }

  return mobileYn
}

export async function saveUser (userProfile, loginYn) {
  console.log(userProfile)
  var user = {}
  // var testYn = localStorage.getItem('testYn')
  // if (testYn !== undefined && testYn !== null && testYn !== '' && (testYn === true || testYn === 'true')) {
  //   methods.userLoginCheck()
  // }
  var setParam = {}
  user.soType = userProfile.soType
  if (userProfile.email !== undefined && userProfile.email !== null && userProfile.email !== '') { user.soEmail = userProfile.email }
  if (userProfile.name !== undefined && userProfile.name !== null && userProfile.name !== '') {
    user.soName = userProfile.name
  }
  if (userProfile.userImg !== undefined && userProfile.userImg !== null && userProfile.userImg !== '') {
    user.soPicUrl = userProfile.userImg
    user.picMfilekey = userProfile.userImg
  }
  user.mobileYn = userProfile.mobileYn
  /* if (userProfile.mobile !== undefined && userProfile.mobile !== null && userProfile.mobile !== 'null' && userProfile.mobile !== '') {
    user.phoneLast = userProfile.mobile.slice(-4, userProfile.mobile.length)
    user.phoneEnc = userProfile.mobile
    user.soMobileEnc = userProfile.mobile
  } else {
    user.phoneEnc = userProfile.phoneEnc
    user.phoneLast = ('' + userProfile.phoneEnc).slice(-4, userProfile.phoneEnc.length)
  } */
  user.soAccessToken = userProfile.aToken
  var deviceInfo = userProfile.deviceInfo
  if (deviceInfo) {
    user.fcmKey = deviceInfo.fcmKey
    user.osName = deviceInfo.systemName
    user.osVersion = deviceInfo.systemVersion
    user.deviceId = deviceInfo.uniqueId + ''
    user.deviceModel = deviceInfo.model
    user.deviceBrand = deviceInfo.brand
    user.isTablet = deviceInfo.isTablet
    user.countryCode = deviceInfo.contry
    user.areaName = deviceInfo.timeZome
  } else {
    var isMobile = /Mobi/i.test(window.navigator.userAgent)
    if (!isMobile && localStorage.getItem('fcmKey') != null) {
      user.fcmKey = localStorage.getItem('fcmKey')
    }
  }
  setParam.user = user
  var result = await commonAxiosFunction({
    url: 'https://www.hybric.net:9443/service/tp.saveUser',
    param: setParam,
    firstYn: true
  })
  // eslint-disable-next-line no-debugger
  debugger
  if (result.data.message === 'OK') {
    localStorage.setItem('user', JSON.stringify(result.data.userMap))
    await store.dispatch('D_USER/AC_USER', result.data.userMap)
    localStorage.setItem('sessionUser', JSON.stringify(result.data.userMap))
    if (loginYn) {
      var userInfo = result.data.userMap
      if (!userInfo.certiDate && (userInfo.userKey === 228 || !(/Mobi/i.test(window.navigator.userAgent)))) {
        // router.replace({ path: '/' })
        router.replace({ path: '/savePhone' })
        return
      }
    }
    router.replace({ path: '/' })
  } else if (result.data.message === 'NG') {
    if (store !== undefined && store !== null) {
      store.commmit('D_USER/MU_CLEAN_USER')
    }
    localStorage.setItem('user', '')
    alert('로그인에 실패하였으니, 다른방식으로 재로그인 해주세요.')
    router.replace({ path: '/policies' })
  }
}
export const methods = {
  getMobileYn () {
    var user = navigator.userAgent
    var mobileYn = false
    if (user.indexOf('iPhone') > -1 || user.indexOf('Android') > -1) {
      mobileYn = true
    }
    return mobileYn
  },
  async userLoginCheck (maingoYn) {
    // eslint-disable-next-line no-debugger
    debugger
    var paramMap = new Map()
    var testYn = localStorage.getItem('testYn')
    if (testYn !== undefined && testYn !== null && testYn !== '' && (testYn === true || testYn === 'true')) {
    // 수망고
    //   paramMap.set('fcmKey', '123456789')
    //   paramMap.set('soAccessToken', 'AAAAORRo6bm4QBo7/gqrz/h6GagDmC4FkLB+DrhQ8xlErEBhIMe84G+cAS7uoe+wImtaa1M2Mkehwdx6YuVwqwjEV9k=')
      // 정재준테스트
      paramMap.set('fcmKey', '22222222')
      paramMap.set('soAccessToken', 'djWQ33dQRz-mzUVjQmggEz:APA91bHLvbLuEmuvBnh9o8TAC2SgI6zSP836eC8g3zq5HqkfhZenv6zC_hcWK14MI5ZE5PoYAeV5U7FYCH-EGYMTaoXTWC-UleipjRydqG7z0r-wu0gT4TT9b6e89P4FR5l353DFK0C-')
      paramMap.set('userKey', 255)

      // paramMap.set('fcmKey', 'fp75GU331khRuUTTka5UYW:APA91bG1ZFejkmPfjMtjUuxvsUxE4zW8Ei2Vi9IgjkM7i9Bl_atL6A7P4lNafjQ6uLvF9IcbPLnOSiAuWI3muSR9UuPKkbCFdHAUd9Q0w5vA4bTmn64h0bjSEYGiMxsO83RSnC2uAuce')
      // paramMap.set('soAccessToken', 'AAAAOLhYTcTPrzQ8DVqU31n04kh-VWmdXvnqXXGATAevs4Re1eAUnJ81mhrvLexek-FWOPf90Dp3yWCdKsRiRunztm0')
      // paramMap.set('userKey', 123)

      // // 최유민테스트
      // paramMap.set('fcmKey', '11111111')
      // paramMap.set('soAccessToken', 'ABAAORRo6bm4QBo7/gqrz/h6GagDmC4FkLB+DrhQ8xlErEBhIMe84G+cAS7uoe+wImtaa1M2Mkehwdx6YuVwqwjEV9k=')
      // paramMap.set('fcmKey', '33333333')
      // paramMap.set('soAccessToken', 'CCAAORRo6bm4QBo7/gqrz/h6GagDmC4FkLB+DrhQ8xlErEBhIMe84G+cAS7uoe+wImtaa1M2Mkehwdx6YuVwqwjEV9k=')
    } else {
      // eslint-disable-next-line no-debugger
      debugger
      localStorage.setItem('testYn', false)
      var user = store.getters['D_USER/GE_USER']
      if (!user) {
        if (JSON.parse(localStorage.getItem('vuex'))) {
          user = JSON.parse(localStorage.getItem('vuex')).D_USER.userInfo
        }
      }
      if (user === undefined || user === null || user === '' || !user.fcmKey) {
        localStorage.setItem('sessionUser', '')
        localStorage.setItem('user', '')
        router.replace('/policies')
        return
      }
      paramMap.set('userKey', user.userKey)
      if (user.soAccessToken !== undefined && user.soAccessToken !== null && user.soAccessToken !== '') { paramMap.set('soAccessToken', user.soAccessToken) }
      if (user.fcmKey !== undefined && user.fcmKey !== null && user.fcmKey !== '') { paramMap.set('fcmKey', user.fcmKey) }
      paramMap.set('userEmail', user.userEmail)
      paramMap.set('soEmail', user.soEmail)
    }

    paramMap.set('mobileYn', isMobile())
    var checkParam = {}
    checkParam.userKey = Number(user.userKey)
    checkParam.fcmKey = user.fcmKey
    // eslint-disable-next-line no-undef
    /* await sso.loginCheck2(checkParam, this.callbackFunc).then(result => {
      // if (result.result !== true) return
      // eslint-disable-next-line no-debugger
      debugger
      var store = require('../../src/store')
      if (result.result === true) {
        console.log(result.userMap)
        console.log('!!! USER LOGIN CHECK !!!')
        if (result.userMap) {
          try {
            localStorage.setItem('user', JSON.stringify(result.userMap))
            store.dispatch('D_USER/AC_USER', result.userMap)
            localStorage.setItem('sessionUser', JSON.stringify(result.userMap))
          } catch (error) {
            console.log(error)
          }
        }

        if (maingoYn) {
          if (typeof (history.pushState) !== 'undefined') {
            history.pushState(null, null, '')
          } else {
            // 브라우저가 지원하지 않는 경우 처리
          }
          router.replace({ name: 'main', params: { testYn: true } })
        }
      } else {
        commonMethods.showToastPop('회원정보가 일치하지 않아 로그아웃 됩니다.\n재 로그인해주세요')
        router.replace('/policies')
        if (store !== undefined && store !== null) {
          store.commmit('D_USER/MU_CLEAN_USER')
        }
        localStorage.setItem('sessionUser', '')
        localStorage.setItem('user', '')
        if (user === undefined || user === null || user === '') {
          if (store !== undefined && store !== null) {
            store.commmit('D_USER/MU_CLEAN_USER')
          }
          localStorage.setItem('sessionUser', '')
          localStorage.setItem('user', '')
          router.replace('/policies')
        }
        window.localStorage.removeItem('testYn')
        localStorage.setItem('loginYn', false)
      }
    }) */
    // var result = await axios.post('https://www.hybric.net:9443/service/tp.loginCheck', Object.fromEntries(paramMap), { withCredentials: true })
  },
  async d_AlimLogout () {
    var result = await commonAxiosFunction({
      url: 'https://www.hybric.net:9443/service/tp.logout',
      firstYn: true
    })
    console.log(result)
    if (result) {
      await router.replace('/login')
      store.commit('D_CHANNEL/MU_CLEAN_CHAN_LIST')
      if (store !== undefined && store !== null) {
        store.commmit('D_USER/MU_CLEAN_USER')
      }

      window.localStorage.setItem('loginYn', false)
      window.localStorage.removeItem('vuex')
      window.localStorage.removeItem('loginType')
      window.localStorage.removeItem('testYn')
    }
  },
  async getTeamList (paramMap, noneLoadingYn) {
    var resultList = null
    paramMap.set('fUserKey', store.getters['D_USER/GE_USER'].userKey)
    var result = await commonAxiosFunction({
      url: 'https://www.hybric.net:9443/service/tp.getUserTeamList',
      param: Object.fromEntries(paramMap)
    }, noneLoadingYn)
    resultList = result
    return resultList
  },
  async getContentsList (inputParam, nonLoadingYn) {
    var paramSet = {}
    if (inputParam) {
      paramSet = inputParam
      paramSet.subsUserKey = store.getters['D_USER/GE_USER'].userKey
    }
    var resultList = null
    var result = await commonAxiosFunction({
      url: 'https://www.hybric.net:9443/service/tp.getMyContentsList',
      param: paramSet
    }, nonLoadingYn)
    resultList = result.data
    return resultList
  },
  async getContentsOnly (inputParam) {
    var paramSet = {}
    if (inputParam) {
      paramSet = inputParam
    }
    var resultList = null
    var result = await commonAxiosFunction({
      url: 'https://www.hybric.net:9443/service/tp.getContents',
      param: paramSet
    })
    resultList = result.data
    return resultList
  },
  async getFollowerList (paramMap) {
    var result = await this.$commonAxiosFunction({
      url: 'https://www.hybric.net:9443/service/tp.getFollowerList',
      param: Object.fromEntries(paramMap)
    })
    return result.data.content
    // // console.log(this.managingList)
    // paramMap.set('followerType', 'M')
  },
  async saveUserDo (inputParam, type) {
    var param = {}
    if (inputParam) {
      param = inputParam
    }
    var urlSet = null
    if (type === 'delete') { urlSet = 'https://www.hybric.net:9443/service/tp.deleteUserDo' } else if (type === 'save') { urlSet = 'https://www.hybric.net:9443/service/tp.saveUserDo' }
    param.userKey = store.getters['D_USER/GE_USER'].userKey
    var result = null

    var response = await commonAxiosFunction({
      url: urlSet,
      param: param
    })
    result = response.data
    return result
  },
  async saveSticker (inputParam) {
    // eslint-disable-next-line no-new-object
    var param = new Object()
    if (inputParam) {
      param = inputParam
    }
    param.creUserKey = store.getters['D_USER/GE_USER'].userKey
    var result = null
    var response = await commonAxiosFunction({
      url: 'https://www.hybric.net:9443/service/tp.saveSticker',
      param: param
    })
    result = response.data

    return result
  },
  async getStickerList (inputParam) {
    // eslint-disable-next-line no-new-object
    var param = new Object()
    if (inputParam) {
      param = inputParam
    }
    param.creUserKey = store.getters['D_USER/GE_USER'].userKey
    var result = null
    var response = await commonAxiosFunction({
      url: 'https://www.hybric.net:9443/service/tp.getStickerList',
      param: param
    })
    result = response.data
    return result
  },
  async changeFollower (inputParam, type) {
    // eslint-disable-next-line no-new-object
    var paramSet = new Object()
    if (inputParam) {
      paramSet = inputParam
    }
    var urlSet = 'https://www.hybric.net:9443/service/tp.saveFollower'
    if (type === 'del') { urlSet = 'https://www.hybric.net:9443/service/tp.deleteFollower' } else if (type === 'save') {
      paramSet.followerType = 'F'
    }
    paramSet.userKey = store.getters['D_USER/GE_USER'].userKey
    var result = null
    var response = await commonAxiosFunction({
      url: urlSet,
      param: paramSet
    })
    result = response.data
    return result
  },
  async requestCreChan (paramVal) {
    var teamRequest = paramVal
    var result = false
    var response = await commonAxiosFunction({
      url: 'https://www.hybric.net:9443/service/tp.saveTeamRequest',
      param: { teamRequest: teamRequest }
    })
    result = response.data
    return result
  },
  async createTeamForReq (inputParam) {
    // eslint-disable-next-line no-new-object
    var paramSet = new Object()
    if (inputParam) {
      paramSet = inputParam
    }
    // param.creUserKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
    var result = null
    var response = await commonAxiosFunction({
      url: 'https://www.hybric.net:9443/service/tp.createTeamForReq',
      param: paramSet
    })
    result = response.data
    return result
  },
  async getTeamReqList (inputParam) {
    // eslint-disable-next-line no-new-object
    var paramSet = new Object()
    if (inputParam) {
      paramSet = inputParam
    }
    var result = null
    var response = await commonAxiosFunction({
      url: 'https://www.hybric.net:9443/service/tp.getTeamReqList',
      param: paramSet
    })
    result = response.data

    return result
  },
  async saveContents (inputParam) {
    // eslint-disable-next-line no-new-object
    var paramSet = new Object()
    if (inputParam) {
      paramSet = inputParam
      paramSet.devNotiYn = false
    }
    /*
    var tt = true
    if (tt === true) {
      return
    } */
    // param.creUserKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
    var result = null
    var response = await commonAxiosFunction({
      url: 'https://www.hybric.net:9443/service/tp.saveContents',
      param: paramSet
    })
    result = response.data
    return result
  },
  async getCodeList (inputParam) {
    // eslint-disable-next-line no-new-object
    var paramSet = new Object()
    if (inputParam) {
      paramSet = inputParam
    }
    var result = null
    var response = await commonAxiosFunction({
      url: 'https://www.hybric.net:9443/service/tp.getCodeList',
      param: paramSet
    })
    result = response.data
    return result
  },
  async updateStickerList (inputParam) {
    // eslint-disable-next-line no-new-object
    var paramSet = new Object()
    if (inputParam) {
      paramSet = inputParam
    }
    var result = null
    var response = await commonAxiosFunction({
      url: '/.updateUserDoList',
      param: paramSet
    })
    result = response.data
    return result
  },

  async changeRecvAlimYn (inputParam) {
    // eslint-disable-next-line no-new-object
    var paramSet = new Object()
    if (inputParam) {
      paramSet = inputParam
    }
    var result = null
    var response = await commonAxiosFunction({
      url: 'https://www.hybric.net:9443/service/tp.saveFollower',
      param: paramSet
    })
    result = response.data
    return result
  },
  async saveCabinet (inputParamMap) {
    // eslint-disable-next-line no-new-object
    var paramSet = new Object()
    if (inputParamMap) {
      paramSet = inputParamMap
    }
    var result = null
    var response = await commonAxiosFunction({
      url: 'https://www.hybric.net:9443/service/tp.saveCabinet',
      param: paramSet
    })
    result = response.data
    return result
  },
  async deleteCabinet (inputParamMap) {
    // eslint-disable-next-line no-new-object
    var paramSet = new Object()
    if (inputParamMap) {
      paramSet = inputParamMap
    }
    var result = null
    var response = await commonAxiosFunction({
      url: 'https://www.hybric.net:9443/service/tp.deleteCabinet',
      param: paramSet
    })
    result = response.data
    return result
  },
  async getTeamMenuList (inputParamMap, noneLoadingYn) {
    // eslint-disable-next-line no-new-object
    var paramMap = new Map()
    if (inputParamMap) {
      paramMap = inputParamMap
    }
    var result = null
    var response = await commonAxiosFunction({
      url: 'https://www.hybric.net:9443/service/tp.getTeamMenuList',
      param: Object.fromEntries(paramMap)
    }, noneLoadingYn)
    result = response.data
    return result
  },
  async getCabinetDetail (inputParam) {
    // eslint-disable-next-line no-new-object
    var paramSet = new Object()
    if (inputParam) {
      paramSet = inputParam
    }
    var result = null
    var response = await commonAxiosFunction({
      url: 'https://www.hybric.net:9443/service/tp.getCabinetDetail',
      param: paramSet
    })
    result = response.data
    // eslint-disable-next-line no-debugger
    debugger
    return result
  },
  async saveMCabContents (paramSet) {
    // var result = null
    var response = await commonAxiosFunction({
      url: 'https://www.hybric.net:9443/service/tp.saveMCabContents',
      param: paramSet
    })
    // result = response
    return response
  },
  async getMemoCount (param) {
    // var result = null
    if (g_axiosQueue.findIndex((item) => item === 'getMemoCount') !== -1) return
    g_axiosQueue.push('getMemoCount')
    if (param.targetKey === null) return false
    var response = await commonAxiosFunction({
      url: 'https://www.hybric.net:9443/service/tp.getMemoCount',
      param: param
    }, true)
    var queueIndex = g_axiosQueue.findIndex((item) => item === 'getMemoCount')
    g_axiosQueue.splice(queueIndex, 1)
    // result = response
    return response.data
  },
  async changeDispName (inputParam) {
    // eslint-disable-next-line no-new-object
    var param = new Object()
    if (inputParam) {
      param = inputParam
    }
    var result = null
    var response = await commonAxiosFunction({
      url: 'https://www.hybric.net:9443/service/tp.saveUser',
      param: param
    })
    result = response
    return result
  },
  async saveFcmToken () {
    // eslint-disable-next-line no-new-object
    var param = new Object()
    // eslint-disable-next-line no-new-object
    var user = new Object()
    // param.user = this.userInfo
    var localUser = store.getters['D_USER/GE_USER']
    if (localUser.userEmail !== undefined && localUser.userEmail !== null && localUser.userEmail !== '') { user.soEmail = localUser.userEmail }
    if (localUser.userKey !== undefined && localUser.userKey !== null && localUser.userKey !== '') { user.userKey = localUser.userKey }
    if (localUser.soAccessToken !== undefined && localUser.soAccessToken !== null && localUser.soAccessToken !== '') { user.soAccessToken = localUser.soAccessToken }
    var localFcm = localStorage.getItem('fcmKey')
    if (localFcm) {
      user.fcmKey = localFcm
    }
    user.mobileYn = false
    param.user = user

    // param.updateYn = true
    var result = null
    var response = await commonAxiosFunction({
      url: 'https://www.hybric.net:9443/service/tp.saveUser',
      param: param
    })
    result = response
    store.commit('D_USER/MU_USER', result.data.userMap)
    return result
  }
}

export default {
  install (Vue) {
    Vue.config.globalProperties.$saveUserDo = methods.saveUserDo
    Vue.config.globalProperties.$getContentsList = methods.getContentsList
    Vue.config.globalProperties.$getTeamList = methods.getTeamList
    Vue.config.globalProperties.$userLoginCheck = methods.userLoginCheck
    Vue.config.globalProperties.$saveSticker = methods.saveSticker
    Vue.config.globalProperties.$getStickerList = methods.getStickerList
    Vue.config.globalProperties.$changeFollower = methods.changeFollower
    Vue.config.globalProperties.$requestCreChan = methods.requestCreChan
    Vue.config.globalProperties.$getTeamReqList = methods.getTeamReqList
    Vue.config.globalProperties.$createTeamForReq = methods.createTeamForReq
    Vue.config.globalProperties.$saveContents = methods.saveContents
    Vue.config.globalProperties.$getCodeList = methods.getCodeList
    Vue.config.globalProperties.$updateStickerList = methods.updateStickerList
    Vue.config.globalProperties.$changeRecvAlimYn = methods.changeRecvAlimYn
    Vue.config.globalProperties.$saveCabinet = methods.saveCabinet
    Vue.config.globalProperties.$getTeamMenuList = methods.getTeamMenuList
    Vue.config.globalProperties.$deleteCabinet = methods.deleteCabinet
    Vue.config.globalProperties.$getCabinetDetail = methods.getCabinetDetail
    Vue.config.globalProperties.$saveMCabContents = methods.saveMCabContents
    Vue.config.globalProperties.$changeDispName = methods.changeDispName
    Vue.config.globalProperties.$getMobileYn = methods.getMobileYn
    Vue.config.globalProperties.$getContentsOnly = methods.getContentsOnly
    Vue.config.globalProperties.$getMemoCount = methods.getMemoCount
    Vue.config.globalProperties.$saveFcmToken = methods.saveFcmToken
    Vue.config.globalProperties.$d_AlimLogout = methods.d_AlimLogout
    Vue.config.globalProperties.$getFollowerList = methods.getFollowerList
  }
}
