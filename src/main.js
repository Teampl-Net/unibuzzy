import { createApp } from 'vue'
import moTheAlim from './Tal_moTheAlim.vue'
import router from './router'
import Vuex from 'vuex'
import store from './store'
import axios from 'axios'
import BootstrapVue3 from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

import { longClickDirective } from 'vue-long-click'
import dayjs from 'dayjs'

// import { onMessage } from './assets/js/webviewInterface'
import webViewBridge from './assets/js/webViewBridge'

import gActiveBar from './components/unit/Tal_gActiveBar.vue'

import gWhiteSelect from './components/unit/selectBox/cAd_gWhiteSelect.vue'

import gButtonS from './components/button/Tal_gButtonS.vue'
import gButtonL from './components/button/Tal_gButtonL.vue'
import fullModal from './components/popup/common/Tal_gPopupWrap.vue'
import TalHeader from './components/layout/Tal_gMainHeader.vue'
import popHeader from './components/layout/Tal_gPopHeader.vue'
import TalFooter from './components/layout/Tal_gFooter.vue'
import commonList from './components/list/D_commonList.vue'
import gChannelList from './components/list/D_commonChanList.vue'
import gSearchBox from './components/unit/Tal_searchBox.vue'
import gColorPicker from './components/unit/Tal_colorPicker.vue'

import gConfirmPop from './components/popup/confirmPop/Tal_commonConfirmPop.vue'
import smallPop from './components/popup/confirmPop/Tal_smallCommonConfirmPop.vue'

import myObserver from './components/Tal_ScrollObserver.vue'
import gMemoPop from './components/popup/memo/Tal_commonMemoPop.vue'
import gMemoList from './components/popup/memo/Tal_commonMemoList.vue'
// import htmlParser from './assets/js/Tal_htmlParser'
import commonjs from './assets/js/Tal_common'

import getjs from './assets/js/D_vuexFunction'

import commonSharejs from './assets/js/Tal_commonShare'
// import commonSharejs from './assets/js/Tal_commonShare'
import axiosFunction, { commonAxiosFunction } from '../public/commonAssets/Tal_axiosFunction'
import uploadFile from './assets/js/Tal_uploadFile'
import Datepicker from 'vue-datepicker-next'
import 'vue-datepicker-next/index.css'

import VueEasyLightbox from 'vue-easy-lightbox'

/* import { onMessage } from './assets/js/webviewInterface' */
import gPreLoader from './components/unit/Tal_preloader.vue'
import gLoadingS from './components/Tal_smallLoading.vue'

import gToggle from './components/pageComponents/myPage/Tal_commonToggle.vue'

import gSvg from './components/Tal_svgCollection.vue'
import Iconwink from './components/Tal_winkAlimLogo.vue'

import gEmty from './components/unit/Tal_commonEmty.vue'
import gReport from './components/unit/Tal_commonReport.vue'

import gStepProgress from './components/unit/Tal_stepProgressBar.vue'
import imgLongClickPop from './components/popup/Tal_imgLongClickPop.vue'

import gAlertPop from './components/popup/Tal_commonAlertPop.vue'
import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'
import gSelectBoardPop from './components/popup/common/Tal_commonSelectBoardListPop.vue'
import imageCompression from 'browser-image-compression'
// import gSharePop from './components/popup/Tal_commonSharePop.vue'
// import { initializeApp } from 'firebase/app'

// import { getAnalytics } from 'firebase/analytics'

// import gToggle from 'vue-toggle-btn';
/* import Meta from 'vue-meta' */
const longClickInstance = longClickDirective({ delay: 400, interval: 50 })

const app = createApp(moTheAlim).use(router).use(store)
app.use(commonjs)
app.use(getjs)
app.use(Vuex)
app.use(commonSharejs)
// app.use(commonSharejs)
app.use(BootstrapVue3)
app.use(VueEasyLightbox)
app.component('gLoadingS', gLoadingS)
app.component('gAlertPop', gAlertPop)
// app.component('gSharePop', gSharePop)
app.component('Datepicker', Datepicker)
app.component('gColorPicker', gColorPicker)
app.component('gSearchBox', gSearchBox)
app.component('gBtnSmall', gButtonS)
app.component('gBtnLarge', gButtonL)
app.component('gActiveBar', gActiveBar)
app.component('fullModal', fullModal)
app.component('TalHeader', TalHeader)
app.component('TalFooter', TalFooter)
app.component('popHeader', popHeader)
app.component('commonList', commonList)
app.component('gChannelList', gChannelList)
app.directive('longclick', longClickInstance)
app.component('gConfirmPop', gConfirmPop)
app.component('smallPop', smallPop)
app.component('myObserver', myObserver)
app.component('gWhiteSelect', gWhiteSelect)
app.component('gMemoPop', gMemoPop)
app.component('gMemoList', gMemoList)
app.component('gPreLoader', gPreLoader)
app.component('gLoadingS', gLoadingS)
app.component('gToggle', gToggle)
app.component('gSvg', gSvg)
app.component('iconWink', Iconwink)
app.component('gEmty', gEmty)
app.component('gReport', gReport)
app.component('gStepProgress', gStepProgress)
app.component('imgLongClickPop', imgLongClickPop)
app.component(VueCropper)
app.component('gSelectBoardPop', gSelectBoardPop)
app.use(webViewBridge)
app.use(axiosFunction)
app.use(uploadFile)

// app.use(massage)

// app.use(youtubeAuth)
// app.use(Gapi)
// clientId: '777053173385-hp7otdoios6a7c0eb924bftbhoeuaat7.apps.googleusercontent.com',
// scope: 'https://www.googleapis.com/auth/youtube'

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET,POST,PATCH,PUT,DELETE,OPTIONS'
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, Content-Type, X-Auth-Token'
axios.defaults.headers.common['Access-Control-Allow-Credentials'] = true
axios.defaults.headers.common['Content-Type'] = 'application/json;'
axios.defaults.timeout = 20000
// axios.defaults.timeout = 300
axios.defaults.withCredentials = true
// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config
}, function (error) {
  // Do something with request error
  // console.log(error)
  // return Promise.reject(ErrorEvent)
  var originalRequest = error.config
  if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1 && !originalRequest._retry) {
    originalRequest._retry = true
    console.log(error.code)
    console.log(error.message.indexOf('timeout'))
    return axios.request(originalRequest)
  }
})
// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response
}, function (error) {
  var originalRequest = error.config
  if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1 && !originalRequest._retry) {
    originalRequest._retry = true
    console.log(error.code)
    console.log(error.message.indexOf('timeout'))

    var app = document.getElementById('app')
    var innerHTML = ''
    var toastDiv = document.createElement('div')
    innerHTML += '<div id="toastPop" class="font16" style="width: 80%;left: 10%;border-radius: 5px;padding: 15px 10px;text-align: left;min-height: 40px;border: 1px solid #CCC;background: #f4f4f9fa;color: #000;position: absolute;bottom: 70px;box-shadow: 0 0 16px 0px #cccccc9c;z-index: 999999999999;">'
    innerHTML += ' 네트워크 상태가 불안정 합니다. 잠시후 다시 시도해주세요.'
    innerHTML += '</div>'
    toastDiv.innerHTML = innerHTML

    app.appendChild(toastDiv)
    // var thisthis = this
    setTimeout(() => {
      document.getElementById('toastPop').remove()
    }, 2000)
    router.replace('/')
    // var content = store.getters('D_HISTORY/GE_CONTENT_ALL_CREAR')
    // store.dispatch('D_HISTORY/CONTENT_CREAR_ALL', content + 1)
    return axios.request(originalRequest)
  }
})
// axios.defaults.baseURL = 'api'
// axios.defaults.baseURL = 'http://192.168.0.2:19090'
// axios.defaults.baseURL = 'http://14.51.96.245:9091'
// axios.defaults.baseURL = 'http://192.168.0.27:19090'
// axios.defaults.baseURL = ''
// axios.defaults.baseURL = 'http://61.97.186.14:19090'
// axios.defaults.baseURL = 'http://192.168.219.100:19090'
// axios.defaults.baseURL = 'http://dev.on-apt.kr:8081/'

// 캐싱 방지
// axios.defaults.headers.get['Cache-Control'] = 'no-cache'
// axios.defaults.headers.get.Pragma = 'no-cache'

// Vue.prototype.$http = axios

app.config.silent = true
app.config.globalProperties.$axios = axios
app.config.globalProperties.$Vuex = Vuex
app.config.globalProperties.$imageCompression = imageCompression
app.config.globalProperties.$commonAxiosFunction = commonAxiosFunction
app.config.globalProperties.$store = store

app.config.globalProperties.$dayjs = dayjs
localStorage.setItem('loginYn', false)
localStorage.setItem('setItem', '')

app.mount('#app')
// console.log(document.getElementById('testConsole'))
// var consoleDiv = document.getElementById('testConsole')
// if (!consoleDiv) {
//   consoleDiv = document.createElement('div')
//   consoleDiv.style.backgroundColor = '#ccc'
//   consoleDiv.style.position = 'fixed'
//   consoleDiv.id = 'testConsole'
//   document.body.appendChild(consoleDiv)
// }
// var toastDiv = document.createElement('div')
// var innerHTML = ''
// innerHTML += '<p style="font-size:16px; text-align: left;">'
// innerHTML += new Date() + ': 앱 기동완료'
// innerHTML += '</p>'
// toastDiv.innerHTML = innerHTML

// consoleDiv.appendChild(toastDiv)
// consoleDiv.appendChild

document.title = '더알림'

localStorage.setItem('loginYn', false)

/* this.$userLoginCheck(true).then(response => {
  this.$getMainboard()
}) */

// onMessage('REQ', 'removeAllNoti') // 앱이 시작되면 모든 알림 삭제
