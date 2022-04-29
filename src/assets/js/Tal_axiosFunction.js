import axios from 'axios'
import router from '../../router'

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET,POST,PATCH,PUT,DELETE,OPTIONS'
axios.defaults.headers.common['Access-Control-Allow-Credentials'] = 'true'
axios.defaults.headers.common['Content-Type'] = 'application/json; charset=UTF-8'
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Content-type, Authorization, Origin, X-Requested-With'

axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.timeout = 100000
axios.defaults.baseURL = 'http://localhost:9091'
/* axios.defaults.baseURL = 'http://14.51.96.245:9091' */
// axios.defaults.baseURL = 'http://dev.on-apt.kr:8081/'

// 캐싱 방지
axios.defaults.headers.get['Cache-Control'] = 'no-cache'
axios.defaults.headers.get.Pragma = 'no-cache'

const methods = {
  async userLoginCheck () {
    var paramMap = new Map()
    var testYn = localStorage.getItem('testYn')
    if (testYn !== undefined && testYn !== null && testYn !== '' && (testYn === true || testYn === 'true')) {
      paramMap.set('fcmKey', '123456789')
      paramMap.set('soAccessToken', 'AAAAORRo6bm4QBo7/gqrz/h6GagDmC4FkLB+DrhQ8xlErEBhIMe84G+cAS7uoe+wImtaa1M2Mkehwdx6YuVwqwjEV9k=')
    } else {
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
    await axios.post('/tp.loginCheck', Object.fromEntries(paramMap)
    ).then(response => {
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
      alert(error)
      localStorage.setItem('user', '')
      localStorage.setItem('loginYn', false)
      router.replace('/policies')
      console.warn('ERROR!!!!! : ', error)
    })
  },
  async getTeamList (paramMap) {
    var resultList = null
    await this.$axios.post('/tp.getUserTeamList', Object.fromEntries(paramMap)
    ).then(response => {
      resultList = response.data
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
    await this.$axios.post('/tp.getContentsList', param
    ).then(response => {
      result = response.data
    }).catch((error) => {
      result = error
    })
    return result
  },
  async saveUser (userProfile) {
    // eslint-disable-next-line no-new-object
    var user = new Object()
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
    // alert('휴대폰 번호는: ' + userProfile.mobile)
    if (userProfile.mobile !== undefined && userProfile.mobile !== null && userProfile.mobile !== 'null' && userProfile.mobile !== '') {
      user.phoneLast = userProfile.mobile.slice(-4, userProfile.mobile.length)
      user.phoneEnc = userProfile.mobile
      user.soMobileEnc = userProfile.mobile
    } else {
      user.phoneEnc = userProfile.phoneEnc
      user.phoneLast = ('' + userProfile.phoneEnc).slice(-4, userProfile.phoneEnc.length)
    }
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
    await axios.post('/tp.saveUser', param
    ).then(response => {
      if (response.data === 'OK') {
        localStorage.setItem('user', JSON.stringify(user))
      }
    }).catch((error) => {
      console.warn('ERROR!!!!! : ', error)
      alert('실패' + error)
    })
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
    // alert(result)
    return result
  }
}

export default {
  install (Vue) {
    Vue.config.globalProperties.$saveUserDo = methods.saveUserDo
    Vue.config.globalProperties.$saveUser = methods.saveUser
    Vue.config.globalProperties.$getContentsList = methods.getContentsList
    Vue.config.globalProperties.$getTeamList = methods.getTeamList
    Vue.config.globalProperties.$userLoginCheck = methods.userLoginCheck
  }
}
