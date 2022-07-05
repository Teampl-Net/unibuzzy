import axios from 'axios'
// eslint-disable-next-line no-unused-vars
import router from '../../src/router'
axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET,POST,PATCH,PUT,DELETE,OPTIONS'
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, Content-Type, X-Auth-Token'
axios.defaults.headers.post['Content-Type'] = 'application/json;'
axios.defaults.headers.common['Content-Type'] = 'application/json;'

axios.defaults.timeout = 100000
axios.defaults.withCredentials = true
// axios.defaults.baseURL = 'http://localhost:19090'
axios.defaults.baseURL = 'http://192.168.0.27:19090'
// axios.defaults.baseURL = 'http://61.97.186.14:19090'

// axios.defaults.baseURL = 'http://192.168.0.29:19090'
// axios.defaults.baseURL = 'http://14.51.96.245:19090'
// axios.defaults.baseURL = 'http://dev.on-apt.kr:8081/'

// 캐싱 방지
axios.defaults.headers.get['Cache-Control'] = 'no-cache'
axios.defaults.headers.get.Pragma = 'no-cache'

export async function commonAxiosFunction (setItem) {
  var result = false
  await axios.post(setItem.url, setItem.param, { withCredentials: true }
  ).then(response => {
    result = response
  }).catch((error) => {
    result = error
    console.log(error)
  })
  return result
}

export async function saveUser (userProfile) {
  // eslint-disable-next-line no-new-object
  var user = new Object()//
  // eslint-disable-next-line no-new-object
  var setParam = new Object()
  user.soType = userProfile.soType
  if (userProfile.email !== undefined && userProfile.email !== null && userProfile.email !== '') { user.soEmail = userProfile.email }
  if (userProfile.name !== undefined && userProfile.name !== null && userProfile.name !== '') {
    user.soName = userProfile.name
  }
  if (userProfile.userImg !== undefined && userProfile.userImg !== null && userProfile.userImg !== '') {
    user.soPicUrl = userProfile.userImg
    user.picMfilekey = userProfile.userImg
  }
  /* if (userProfile.mobile !== undefined && userProfile.mobile !== null && userProfile.mobile !== 'null' && userProfile.mobile !== '') {
    user.phoneLast = userProfile.mobile.slice(-4, userProfile.mobile.length)
    user.phoneEnc = userProfile.mobile
    user.soMobileEnc = userProfile.mobile
  } else {
    user.phoneEnc = userProfile.phoneEnc
    user.phoneLast = ('' + userProfile.phoneEnc).slice(-4, userProfile.phoneEnc.length)
  } */
  var deviceInfo = userProfile.deviceInfo
  user.fcmKey = deviceInfo.fcmKey
  user.osName = deviceInfo.systemName
  user.osVersion = deviceInfo.systemVersion
  user.soAccessToken = userProfile.aToken
  user.deviceId = deviceInfo.uniqueId
  user.deviceModel = deviceInfo.model
  user.deviceBrand = deviceInfo.brand
  user.isTablet = deviceInfo.isTablet
  user.countryCode = deviceInfo.contry
  user.areaName = deviceInfo.timeZome
  setParam.user = user
  var result = await commonAxiosFunction({
    url: '/tp.saveUser',
    param: setParam
  })
  if (result.data === 'OK') {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('testYn', false)
  }
}
const methods = {
  async userLoginCheck () {
    var paramMap = new Map()
    var testYn = localStorage.getItem('testYn')
    // testYn = false
    if (testYn !== undefined && testYn !== null && testYn !== '' && (testYn === true || testYn === 'true')) {
      // 수망고
      // paramMap.set('fcmKey', '123456789')
      // paramMap.set('soAccessToken', 'AAAAORRo6bm4QBo7/gqrz/h6GagDmC4FkLB+DrhQ8xlErEBhIMe84G+cAS7uoe+wImtaa1M2Mkehwdx6YuVwqwjEV9k=')
      // 정재준테스트
      paramMap.set('fcmKey', '22222222')
      paramMap.set('soAccessToken', 'BBAAORRo6bm4QBo7/gqrz/h6GagDmC4FkLB+DrhQ8xlErEBhIMe84G+cAS7uoe+wImtaa1M2Mkehwdx6YuVwqwjEV9k=')
      // // 최유민테스트
      // paramMap.set('fcmKey', '11111111')
      // paramMap.set('soAccessToken', 'ABAAORRo6bm4QBo7/gqrz/h6GagDmC4FkLB+DrhQ8xlErEBhIMe84G+cAS7uoe+wImtaa1M2Mkehwdx6YuVwqwjEV9k=')

      // paramMap.set('fcmKey', '33333333')
      // paramMap.set('soAccessToken', 'CCAAORRo6bm4QBo7/gqrz/h6GagDmC4FkLB+DrhQ8xlErEBhIMe84G+cAS7uoe+wImtaa1M2Mkehwdx6YuVwqwjEV9k=')
    } else {
      localStorage.setItem('testYn', false)
      if (localStorage.getItem('user') === undefined || localStorage.getItem('user') === null || localStorage.getItem('user') === '') {
        this.$router.replace('/policies')
        return
      }
      var user = JSON.parse(localStorage.getItem('user'))
      if (user.soAccessToken !== undefined && user.soAccessToken !== null && user.soAccessToken !== '') { paramMap.set('soAccessToken', user.soAccessToken) }
      if (user.fcmKey !== undefined && user.fcmKey !== null && user.fcmKey !== '') { paramMap.set('fcmKey', user.fcmKey) }
    }
    var result = await commonAxiosFunction({
      url: '/tp.loginCheck',
      param: Object.fromEntries(paramMap)
    })
    if (result.data.resultCode === 'OK') {
      localStorage.setItem('sessionUser', JSON.stringify(result.data.userMap))
      localStorage.setItem('loginYn', true)
      router.replace({ name: 'main', params: { testYn: true } })
    } else {
      router.replace('/policies')
      localStorage.setItem('sessionUser', '')
      localStorage.setItem('user', '')
      localStorage.setItem('loginYn', false)
    }
  },
  async getTeamList (paramMap) {
    var resultList = null
    var result = await commonAxiosFunction({
      url: '/tp.getUserTeamList',
      param: Object.fromEntries(paramMap)
    })
    resultList = result
    return resultList
  },
  // async getContentsList(inputParam) {
  //   // eslint-disable-next-line no-new-object
  //   var paramSet = new Object()
  //   if (inputParam) {
  //     paramSet = inputParam
  //   }
  //   paramSet.ownUserKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
  //   var resultList = null
  //   let config = {
  //     onUploadProgress(progressEvent) {
  //       var percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
  //       // execute the callback
  //       onProgress(percentCompleted)
  //       return percentage;
  //     },
  //   };
  //   var response = await axios.post('/tp.getContentsList', paramSet, config)

  //   resultList = response.data
  //   return resultList
  // },
  async getContentsList (inputParam) {
    // eslint-disable-next-line no-new-object
    var paramSet = new Object()
    if (inputParam) {
      paramSet = inputParam
    }
    paramSet.ownUserKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
    var resultList = null

    var result = await commonAxiosFunction({
      url: '/tp.getContentsList',
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
    if (type === 'delete') { urlSet = 'tp.deleteUserDo' } else if (type === 'save') { urlSet = 'tp.saveUserDo' }
    param.userKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
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
    param.creUserKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
    var result = null
    var response = await commonAxiosFunction({
      url: '/tp.saveSticker',
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
    param.creUserKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
    var result = null
    var response = await commonAxiosFunction({
      url: '/tp.getStickerList',
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
    var urlSet = '/tp.saveFollower'
    if (type === 'del') { urlSet = '/tp.deleteFollower' } else if (type === 'save') {
      paramSet.followerType = 'F'
    }
    paramSet.userKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
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
      url: '/tp.saveTeamRequest',
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
      url: '/tp.createTeamForReq',
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
      url: '/tp.getTeamReqList',
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
    }
    /*
    var tt = true
    if (tt === true) {
      return
    } */
    // param.creUserKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
    var result = null
    var response = await commonAxiosFunction({
      url: '/tp.saveContents',
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
      url: '/tp.getCodeList',
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
      url: '/tp.updateUserDoList',
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
      url: '/tp.updateFollower',
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
    console.log('&&&&&&&&&&&&&&&&&&&&')
    console.log(paramSet)
    var result = null
    var response = await commonAxiosFunction({
      url: '/tp.saveCabinet',
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
      url: '/tp.deleteCabinet',
      param: paramSet
    })
    result = response.data
    return result
  },
  async getTeamMenuList (inputParamMap) {
    // eslint-disable-next-line no-new-object
    var paramMap = new Map()
    if (inputParamMap) {
      paramMap = inputParamMap
    }
    var result = null
    var response = await commonAxiosFunction({
      url: '/tp.getTeamMenuList',
      param: Object.fromEntries(paramMap)
    })
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
      url: '/tp.getCabinetDetail',
      param: paramSet
    })
    result = response.data
    return result
  },
  async saveMCabContents (paramSet) {
    // var result = null
    var response = await commonAxiosFunction({
      url: '/tp.saveMCabContents',
      param: paramSet
    })
    // console.log("## axios saveMCabContents")
    // console.log(response)
    // console.log("##")
    // result = response
    return response
  },
  async changeDispName (inputParam) {
    // eslint-disable-next-line no-new-object
    var param = new Object()
    if (inputParam) {
      param = inputParam
    }
    var result = null
    var response = await commonAxiosFunction({
      url: '/tp.saveUser',
      param: param
    })
    debugger
    result = response
    return result
  },
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
  }
}
