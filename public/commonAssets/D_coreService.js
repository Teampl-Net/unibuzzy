/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import axios from 'axios'
// eslint-disable-next-line no-unused-vars

// 캐싱 방지
/* axios.defaults.headers.get['Cache-Control'] = 'no-cache'
axios.defaults.headers.get.Pragma = 'no-cache' */
var g_axiosQueue = []

const methods = {
  async coreLoginCheck (paramMap) {
    var result = await axios.post('service/tp.coreLoginCheck', Object.fromEntries(paramMap))
    return result
  },
  async commonCoreAxios (setItem, nonLoadingYn, noAuthYn) {
    console.log('####-------------------------------coommonCoreAxios.' + setItem.url + '----------------------------------------####')
    console.log('####parameter is: ')
    console.log(setItem.param)
    await methods.coreLoginCheck()
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
  }
}

export default {
  install (Vue) {
    Vue.config.globalProperties.$commonCoreAxios = methods.commonCoreAxios
    Vue.config.globalProperties.$coreLoginCheck = methods.coreLoginCheck
  }
}
