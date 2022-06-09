import axios from 'axios'
// eslint-disable-next-line no-unused-vars
import router from '../../src/router'
axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET,POST,PATCH,PUT,DELETE,OPTIONS'
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, Content-Type, X-Auth-Token'
axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.defaults.timeout = 100000
axios.defaults.withCredentials = true
// axios.defaults.baseURL = 'http://localhost:19090'
axios.defaults.baseURL = 'http://192.168.0.22:19090'
// axios.defaults.baseURL = 'http://61.97.186.14:19090'

// axios.defaults.baseURL = 'http://localhost:19090'
// axios.defaults.baseURL = 'http://14.51.96.245:19090'
// axios.defaults.baseURL = 'http://dev.on-apt.kr:8081/'

// 캐싱 방지
axios.defaults.headers.get['Cache-Control'] = 'no-cache'
axios.defaults.headers.get.Pragma = 'no-cache'

export async function saveUser (userProfile) {
  // eslint-disable-next-line no-new-object
  var user = new Object()//
  // eslint-disable-next-line no-new-object
  var param = new Object()
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
  param.user = user
  // alert(JSON.stringify(param))
  await axios.post('/tp.saveUser', param
  ).then(response => {
    if (response.data === 'OK') {
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('testYn', false)
    }
  }).catch((error) => {
    console.warn('ERROR!!!!! : ', error)
  })
}
const methods = {
  async userLoginCheck () {
    var paramMap = new Map()
    var testYn = localStorage.getItem('testYn')
    // testYn = false
    if (testYn !== undefined && testYn !== null && testYn !== '' && (testYn === true || testYn === 'true')) {
      paramMap.set('fcmKey', '123456789')
      paramMap.set('soAccessToken', 'AAAAORRo6bm4QBo7/gqrz/h6GagDmC4FkLB+DrhQ8xlErEBhIMe84G+cAS7uoe+wImtaa1M2Mkehwdx6YuVwqwjEV9k=')
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
    // paramMap.set('fcmKey', '123456789')
    // paramMap.set('soAccessToken', 'AAAAORRo6bm4QBo7/gqrz/h6GagDmC4FkLB+DrhQ8xlErEBhIMe84G+cAS7uoe+wImtaa1M2Mkehwdx6YuVwqwjEV9k=')

    /* const response = await fetch('http://192.168.0.22:19090/tp.loginCheck', {
      method: 'POST', // *GET, POST, PUT, DELETE 등
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: true, // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(paramMap) // body의 데이터 유형은 반드시 "Content-Type" 헤더와 일치해야 함
    })
    return response.json() // JSON 응답을 네이티브 JavaScript 객체로 파싱 */

    await this.$axios.post('/tp.loginCheck', Object.fromEntries(paramMap), { Authorization: 'YmMwMzFiMTItOTBjOS00MDAzLWI3MWItMjY2NWQxYjZhMzcy', withCredentials: true }
    ).then(response => {
      console.log('cookie', response.headers)
      if (response.data.resultCode === 'OK') {
        localStorage.setItem('sessionUser', JSON.stringify(response.data.userMap))
        localStorage.setItem('loginYn', true)
        router.replace({ name: 'main', params: { testYn: true } })
      } else {
        router.replace('/policies')
        localStorage.setItem('sessionUser', '')
        localStorage.setItem('user', '')
        localStorage.setItem('loginYn', false)
      }
    }).catch((error) => {
      // alert(error)
      localStorage.setItem('user', '')
      localStorage.setItem('loginYn', false)
      router.replace('/policies')
      console.warn('ERROR!!!!! : ', error)
    })
  },
  async getTeamList (paramMap) {
    var resultList = null
    await this.$axios.post('/tp.getUserTeamList', Object.fromEntries(paramMap), { withCredentials: true }
    ).then(response => {
      resultList = response
    }).catch((error) => {
      console.warn('ERROR!!!!! : ', error)
    })
    return resultList
  },
  async getContentsList (inputParam) {
    // eslint-disable-next-line no-new-object
    var param = new Object()
    if (inputParam) {
      param = inputParam
    }
    param.ownUserKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
    var result = null
    await this.$axios.post('/tp.getContentsList', param, { withCredentials: true }
    ).then(response => {
      result = response.data
    }).catch((error) => {
      result = error
    })
    return result
  },
  async saveUserDo (inputParam, type) {
    // eslint-disable-next-line no-new-object
    var param = new Object()
    if (inputParam) {
      param = inputParam
    }
    var url = null
    if (type === 'delete') { url = 'tp.deleteUserDo' } else if (type === 'save') { url = 'tp.saveUserDo' }
    param.userKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
    var result = null
    await this.$axios.post(url, param
    ).then(response => {
      result = response.data
    }).catch((error) => {
      result = error
    })
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
    await this.$axios.post('/tp.saveSticker', param
    ).then(response => {
      result = response.data
    }).catch((error) => {
      result = error
    })
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
    await this.$axios.post('/tp.getStickerList', param
    ).then(response => {
      result = response.data
    }).catch((error) => {
      result = error
    })
    return result
  },
  async changeFollower (inputParam, type) {
    // eslint-disable-next-line no-new-object
    var param = new Object()
    if (inputParam) {
      param = inputParam
    }
    var url = '/tp.saveFollower'
    if (type === 'del') { url = '/tp.deleteFollower' } else if (type === 'save') {
      param.followerType = 'F'
    }
    param.userKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
    var result = null
    await this.$axios.post(url, param
    ).then(response => {
      result = response.data
    }).catch((error) => {
      result = error
    })
    return result
  },
  async requestCreChan (paramVal) {
    var teamRequest = paramVal
    var result = false
    await this.$axios.post('/tp.saveTeamRequest', { teamRequest: teamRequest }
    // this.$axios.post('/onapt/onapt/onapt.getBoardInfo', { param: this.param }
    ).then(response => {
      console.log(response)
      result = response.data
    }).catch((ex) => {
      console.warn('ERROR!!!!! : ', ex)
    })
    return result
  },
  async createTeamForReq (inputParam) {
    // eslint-disable-next-line no-new-object
    var param = new Object()
    if (inputParam) {
      param = inputParam
    }
    // param.creUserKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
    var result = null
    await this.$axios.post('/tp.createTeamForReq', param
    ).then(response => {
      result = response.data
    }).catch((error) => {
      result = error
    })
    return result
  },
  async getTeamReqList (inputParam) {
    // eslint-disable-next-line no-new-object
    var param = new Object()
    if (inputParam) {
      param = inputParam
    }
    var result = null
    await this.$axios.post('/tp.getTeamReqList', param
    ).then(response => {
      result = response.data
    }).catch((error) => {
      result = error
    })
    return result
  },
  async saveContents (inputParam) {
    // eslint-disable-next-line no-new-object
    var param = new Object()
    if (inputParam) {
      param = inputParam
    }
    param.jobkindId = 'ALIM'
    param.allRecvYn = true
    /* alert(JSON.stringify(param))
    var tt = true
    if (tt === true) {
      return
    } */
    // param.creUserKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
    var result = null
    await this.$axios.post('/tp.saveContents', param
    ).then(response => {
      result = response.data
    }).catch((error) => {
      result = error
    })
    return result
  },
  async getCodeList (inputParam) {
    // eslint-disable-next-line no-new-object
    var param = new Object()
    if (inputParam) {
      param = inputParam
    }
    var result = null
    await this.$axios.post('/tp.getCodeList', param, { withCredentials: true }
    ).then(response => {
      result = response.data
    }).catch((error) => {
      result = error
    })
    return result
  },
  async updateStickerList (inputParam) {
    // eslint-disable-next-line no-new-object
    var param = new Object()
    if (inputParam) {
      param = inputParam
    }
    var result = null
    await this.$axios.post('/tp.updateUserDoList', param, { withCredentials: true }
    ).then(response => {
      result = response.data
    }).catch((error) => {
      result = error
    })
    return result
  },

  async changeRecvAlimYn (inputParam) {
    // eslint-disable-next-line no-new-object
    var param = new Object()
    if (inputParam) {
      param = inputParam
    }
    var result = null
    await this.$axios.post('/tp.updateFollower', param, { withCredentials: true }
    ).then(response => {
      result = response.data
    }).catch((error) => {
      result = error
    })
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
  }
}
