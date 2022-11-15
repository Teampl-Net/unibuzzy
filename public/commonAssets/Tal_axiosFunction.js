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
    ;
  } else {
    await methods.userLoginCheck()
  }
  var result = false
  if (nonLoadingYn === true) {
  } else {
    commonMethods.showAxiosLoading(true)
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
  await axios.post('service/tp.checkSession', { withCredentials: true }
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

export async function saveUser (userProfile) {
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
    user.deviceId = deviceInfo.uniqueId
    user.deviceModel = deviceInfo.model
    user.deviceBrand = deviceInfo.brand
    user.isTablet = deviceInfo.isTablet
    user.countryCode = deviceInfo.contry
    user.areaName = deviceInfo.timeZome
  }
  setParam.user = user
  var result = await commonAxiosFunction({
    url: 'service/tp.saveUser',
    param: setParam,
    firstYn: true
  })
  if (result.data.message === 'OK') {
    localStorage.setItem('user', JSON.stringify(result.data.userMap))
    store.dispatch('D_USER/AC_USER', result.data.userMap)
    localStorage.setItem('sessionUser', JSON.stringify(result.data.userMap))
    router.replace({ path: '/' })
  } else if (result.message === 'NG') {
    store.commmit('D_USER/MU_CLEAN_USER')
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
      // // 최유민테스트
      // paramMap.set('fcmKey', '11111111')
      // paramMap.set('soAccessToken', 'ABAAORRo6bm4QBo7/gqrz/h6GagDmC4FkLB+DrhQ8xlErEBhIMe84G+cAS7uoe+wImtaa1M2Mkehwdx6YuVwqwjEV9k=')
      // paramMap.set('fcmKey', '33333333')
      // paramMap.set('soAccessToken', 'CCAAORRo6bm4QBo7/gqrz/h6GagDmC4FkLB+DrhQ8xlErEBhIMe84G+cAS7uoe+wImtaa1M2Mkehwdx6YuVwqwjEV9k=')
    } else {
      localStorage.setItem('testYn', false)
      var user = store.getters['D_USER/GE_USER']
      if (user === undefined || user === null || user === '') {
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
    var result = await axios.post('service/tp.loginCheck', Object.fromEntries(paramMap), { withCredentials: true })
    console.log(result.data.resultCode)
    console.log('result~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
    if (result.data.resultCode === 'OK') {
      console.log(result.data)
      console.log('!!! USER LOGIN CHECK !!!')
      if (result.data.userMap) {
        try {
          localStorage.setItem('user', JSON.stringify(result.data.userMap))
          store.dispatch('D_USER/AC_USER', result.data.userMap)
          localStorage.setItem('sessionUser', JSON.stringify(result.data.userMap))
        } catch (error) {
          console.log(error)
        }
      }

      if (maingoYn) {
        router.replace({ name: 'main', params: { testYn: true } })
      }
    } else {
      if (user === undefined || user === null || user === '') {
        localStorage.setItem('sessionUser', '')
        localStorage.setItem('user', '')
        router.replace('/policies')
      }
      window.localStorage.removeItem('testYn')
      localStorage.setItem('loginYn', false)
    }
  },
  async getTeamList (paramMap, noneLoadingYn) {
    var resultList = null
    paramMap.set('fUserKey', store.getters['D_USER/GE_USER'].userKey)
    var result = await commonAxiosFunction({
      url: 'service/tp.getUserTeamList',
      param: Object.fromEntries(paramMap)
    }, noneLoadingYn)
    resultList = result
    return resultList
  },
  async getContentsList (inputParam, nonLoadingYn) {
    // eslint-disable-next-line no-new-object
    var paramSet = new Object()
    if (inputParam) {
      paramSet = inputParam
      paramSet.subsUserKey = store.getters['D_USER/GE_USER'].userKey
    }
    var resultList = null
    var result = await commonAxiosFunction({
      url: 'service/tp.getContentsList',
      param: paramSet
    }, nonLoadingYn)
    resultList = result.data
    return resultList
  },
  async getContentsOnly (inputParam) {
    // eslint-disable-next-line no-new-object
    var paramSet = new Object()
    if (inputParam) {
      paramSet = inputParam
    }
    var resultList = null
    var result = await commonAxiosFunction({
      url: 'service/tp.getContents',
      param: paramSet
    })
    resultList = result.data
    return resultList
  },
  async saveUserDo (inputParam, type) {
    // eslint-disable-next-line no-new-object
    var param = new Object()
    if (inputParam) {
      param = inputParam
    }
    var urlSet = null
    if (type === 'delete') { urlSet = 'service/tp.deleteUserDo' } else if (type === 'save') { urlSet = 'service/tp.saveUserDo' }
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
      url: 'service/tp.saveSticker',
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
      url: 'service/tp.getStickerList',
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
    var urlSet = 'service/tp.saveFollower'
    if (type === 'del') { urlSet = 'service/tp.deleteFollower' } else if (type === 'save') {
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
      url: 'service/tp.saveTeamRequest',
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
      url: 'service/tp.createTeamForReq',
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
      url: 'service/tp.getTeamReqList',
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
      url: 'service/tp.saveContents',
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
      url: 'service/tp.getCodeList',
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
      url: 'service/tp.saveFollower',
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
      url: 'service/tp.saveCabinet',
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
      url: 'service/tp.deleteCabinet',
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
      url: 'service/tp.getTeamMenuList',
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
      url: 'service/tp.getCabinetDetail',
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
      url: 'service/tp.saveMCabContents',
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
      url: 'service/tp.getMemoCount',
      param: param
    })
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
      url: 'https://mo.d-alim.com/service/tp.saveUser',
      param: param
    })
    result = response
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
  }
}
