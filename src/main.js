import { createApp } from 'vue'
import uniBuzzy from './uniBuzzy.vue'
import router from './router'
import Vuex from 'vuex'
import store from './store'
import axios from 'axios'
import BootstrapVue3 from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import dayjs from 'dayjs'
import 'cropperjs/dist/cropper.css'
import axiosFunction, { commonAxiosFunction } from '../public/commonAssets/Tal_axiosFunction'
import openView from './assets/js/D_openView'
import './registerServiceWorker'
import gActiveBar from './components/unit/CommonActiveBar.vue'
import gButtonS from './components/button/CommonButtonS.vue'
import gButtonL from './components/button/CommonButtonL.vue'
import Datepicker from 'vue-datepicker-next'
import 'vue-datepicker-next/index.css'
import imageCompression from 'browser-image-compression'
import commonjs from './assets/js/common'
import getjs from './assets/js/D_vuexFunction'
import commonSharejs from './assets/js/commonShare'
import gMainTab from './components/popup/CommonMainTabCompo.vue'
import './assets/js/webViewBridge'
import gFileBox from './components/unit/contents/CommonFileBox.vue'
import gInput from './components/unit/CommonInput.vue'
import gSearchBox from './components/unit/search/CommonSearchBox.vue'
import gAxiosLoading from './components/layout/AxiosLoadingSpinner.vue'
import coreService from '../public/commonAssets/D_coreService'
import uploadFile from './assets/js/uploadFile'
import gUBContentsBox from './components/unit/contents/ContentsBox.vue'
import VueCropper from 'vue-cropperjs'
import gColorPicker from './components/unit/CommonColorPicker.vue'
import gImgPop from './components/popup/contents/CommonGalleryPop.vue'
import gToggle from './components/button/CommonToggle.vue'
import gEmpty from './components/unit/CommonEmpty.vue'
import gReport from './components/unit/contents/CommonReport.vue'
import gCheckBtn from './components/button/CommonCheckBtn.vue'
import gConfirmPop from './components/popup/confirmPop/CommonConfirmPop.vue'
import myObserver from './components/unit/ScrollObserver.vue'
import gMemoPop from './components/popup/contents/CommonMemoPop.vue'
import gListEmpty from './components/unit/receiverUnit/CommonListEmpty.vue'
import gToolBox from './components/unit/formEditor/CommonToolBox.vue'
import gLoadingS from './components/layout/SmallLoading.vue'
import gChannelCard from './components/unit/channel/ChannelCard.vue'
import gProfileImg from './components/unit/CommonProfile.vue'
import gBoardCard from './components/pageComponents/channel/unit/editBoard/CommonBoardCard.vue'
import gBookList from './components/unit/receiverUnit/CommonBookList.vue'
import gBookMemberList from './components/unit/receiverUnit/CommonBookMemberList.vue'
import gReceiveCard from './components/unit/receiverUnit/CommonReceiveCard.vue'
import gChanMainHeader from '@/components/pageComponents/main/container/CommonChanMainHeader.vue'
import gMainMenu from './components/popup/CommonMenu.vue'
import gTopViewItem from './components/pageComponents/board/unit/CommonTopViewItem.vue'
import gUserItem from './components/unit/CommonUserItem.vue'
import UBConst from '@/assets/js/Const'
import i18n from './assets/i18n'
// eslint-disable-next-line camelcase

let app = {}
const importsUB = Promise.all([
  import('./components/layout/CommonMainHeader.vue'),
  import('./components/layout/CommonPopHeader.vue'),
  import('./components/unit/search/CommonSelectFilter.vue'),
  import('./components/popup/confirmPop/SmallCommonConfirmPop.vue'),
  import('./components/layout/CommonFooter.vue'),
  import('./components/popup/CommonSelectBoardListPop.vue'),
  import('./components/layout/CommonCloudLoading.vue')
])
app = createApp(uniBuzzy).use(router).use(store)
importsUB.then(([gUBHeader, gPopHeader, gSelectFilter, smallPop, gFooter, gSelectBoardPop, gCloudLoading]) => {
  app.component('gUBHeader', gUBHeader.default)
  app.component('gPopHeader', gPopHeader.default)
  app.component('gSelectFilter', gSelectFilter.default)
  app.component('smallPop', smallPop.default)
  app.component('gFooter', gFooter.default)
  app.component('gSelectBoardPop', gSelectBoardPop.default)
  app.component('gCloudLoading', gCloudLoading.default)
})
// const gNProfileImg = require('./components/common/N_commonProfile.vue')
// const gNCloudLoading = require('./components/layout/N_cloudLoading.vue')
// app.component('gNCloudLoading', gNCloudLoading)

// app.use(VueEasyLightbox)
app.component('gUBContentsBox', gUBContentsBox)
app.component('gSearchBox', gSearchBox)
app.component('gBtnSmall', gButtonS)
app.component('gInput', gInput)
app.component('gBtnLarge', gButtonL)
app.component('gActiveBar', gActiveBar)
app.component('Datepicker', Datepicker)
app.component(VueCropper)
app.component('gMainTab', gMainTab)
app.component('gImgPop', gImgPop)
app.component('gFileBox', gFileBox)
app.component('gAxiosLoading', gAxiosLoading)
app.component('gColorPicker', gColorPicker)
app.component('gCheckBtn', gCheckBtn)
app.component('gConfirmPop', gConfirmPop)
app.component('myObserver', myObserver)
app.component('gLoadingS', gLoadingS)
app.component('gMemoPop', gMemoPop)
app.component('gToggle', gToggle)
app.component('gChannelCard', gChannelCard)
app.component('gEmpty', gEmpty)
app.component('gReport', gReport)
app.component('gListEmpty', gListEmpty)
app.component('gToolBox', gToolBox)
app.component('gProfileImg', gProfileImg)
app.component('gBoardCard', gBoardCard)
app.component('gBookList', gBookList)
app.component('gBookMemberList', gBookMemberList)
app.component('gReceiveCard', gReceiveCard)
app.component('gChanMainHeader', gChanMainHeader)
app.component('gMainMenu', gMainMenu)
app.component('gTopViewItem', gTopViewItem)
app.component('gUserItem', gUserItem)

app.use(commonjs)
app.use(i18n)
app.use(UBConst)
app.use(openView)
app.use(getjs)
app.use(commonSharejs)
app.use(BootstrapVue3)
app.use(axiosFunction)
app.use(coreService)
app.use(uploadFile)

/* axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET,POST,PATCH,PUT,DELETE,OPTIONS'
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, Content-Type, X-Auth-Token'
axios.defaults.headers.common['Access-Control-Allow-Credentials'] = true
axios.defaults.headers.common['Content-Type'] = 'application/json;' */
axios.defaults.timeout = 20000
axios.defaults.withCredentials = true
axios.interceptors.request.use(function (config) {
  return config
}, function (error) {
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
  console.log(error)
  // var originalRequest = error.config
  const res = error.response
  if (res.status !== 200) {
    var app = document.getElementById('app')
    var innerHTML = ''
    var toastDiv = document.createElement('div')
    innerHTML += '<div id="toastPop" class="font16" style="width: 80%;left: 10%;border-radius: 5px;padding: 15px 10px;text-align: left;min-height: 40px;border: 1px solid #CCC;background: #f4f4f9fa;color: #000;position: absolute;bottom: 70px;box-shadow: 0 0 16px 0px #cccccc9c;z-index: 999999999999999;">'
    innerHTML += ' The network status is unstable. Please try again in a momentarily.'
    innerHTML += '</div>'
    toastDiv.innerHTML = innerHTML
    app.appendChild(toastDiv)
    setTimeout(() => {
      document.getElementById('toastPop').remove()
    }, 2000)
    return {
      resultMsg: res.data,
      result: false,
      status: res.status
    }
  }
})
localStorage.setItem('nativeYn', 'false')
var varUA = localStorage.getItem('systemName')
if (varUA !== undefined && varUA !== null && varUA !== '') {
  if (varUA === 'android' || varUA === '"Android"' || varUA === 'ios' || varUA === '"iOS"') {
    app.config.globalProperties.$STATUS_HEIGHT = 35 // 35
  } else {
    app.config.globalProperties.$STATUS_HEIGHT = 35
  }
} else {
  app.config.globalProperties.$STATUS_HEIGHT = 0
}
app.config.globalProperties.$DALIM_TEAM_KEY = 377
app.config.globalProperties.$DALIM_MUN_CAB_KEY = 11188
app.config.globalProperties.$DALIM_ORYU_CAB_KEY = 12006
app.config.silent = true
app.config.globalProperties.$axios = axios
app.config.globalProperties.$Vuex = Vuex
app.config.globalProperties.$imageCompression = imageCompression
app.config.globalProperties.$commonAxiosFunction = commonAxiosFunction
app.config.globalProperties.$store = store
const user = store.getters['UB_USER/GE_USER']
if (user.countryCode) {
  app.config.globalProperties.$locale = user.countryCode
} else {
  app.config.globalProperties.$locale = 'US'
}

app.config.globalProperties.$dayjs = dayjs
localStorage.setItem('loginYn', 'false')
localStorage.setItem('testYn', 'false')
localStorage.setItem('setItem', '')

app.mount('#app')
window.app = app
document.title = 'uniBuzzy'
localStorage.setItem('loginYn', 'false')
