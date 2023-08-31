import { createApp } from 'vue'
import moTheAlim from './Tal_moTheAlim.vue'
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
import gActiveBar from './components/unit/Tal_gActiveBar.vue'
import gWhiteSelect from './components/unit/selectBox/cAd_gWhiteSelect.vue'
import gButtonS from './components/button/Tal_gButtonS.vue'
import gButtonL from './components/button/Tal_gButtonL.vue'
import Datepicker from 'vue-datepicker-next'
import 'vue-datepicker-next/index.css'
import imageCompression from 'browser-image-compression'
import commonjs from './assets/js/Tal_common'
import getjs from './assets/js/D_vuexFunction'
import commonSharejs from './assets/js/Tal_commonShare'
import gMainTab from './components/popup/memberInfo/memberUnit/D_commonMainTabCompo.vue'
import webViewBridge from './assets/js/webViewBridge'
import gFileBox from './components/unit/D_fileBox.vue'
import commonList from './components/list/D_commonList.vue'
import gChannelList from './components/list/D_commonChanList.vue'
import gInput from './components/common/UB_commonInput.vue'
import gSearchBox from './components/unit/Tal_searchBox.vue'
import gAxiosLoading from './components/D_axiosLoadingSpinner.vue'
import coreService from '../public/commonAssets/D_coreService'
import uploadFile from './assets/js/Tal_uploadFile'
import gContentsBox from './components/pageComponents/push/D_contentsBox.vue'
import VueCropper from 'vue-cropperjs'
import gColorPicker from './components/unit/D_colorPicker.vue'
import gImgPop from './components/popup/common/D_commonGalleryPop.vue'
import gToggle from './components/pageComponents/myPage/Tal_commonToggle.vue'
import gEmpty from './components/unit/Tal_commonEmpty.vue'
import gReport from './components/unit/Tal_commonReport.vue'
import gCheckBtn from './components/popup/writeContentUnit/D_commonCheckBtn.vue'
import gConfirmPop from './components/popup/confirmPop/Tal_commonConfirmPop.vue'
import myObserver from './components/Tal_ScrollObserver.vue'
import gMemoPop from './components/popup/memo/Tal_commonMemoPop.vue'
import gMemoList from './components/popup/memo/Tal_commonMemoList.vue'
import imgLongClickPop from './components/popup/Tal_imgLongClickPop.vue'
import gPreLoader from './components/unit/Tal_preloader.vue'
import gListEmpty from './components/popup/receiver/receiverUnit/D_commonListEmpty.vue'
import gChannelPop from './components/popup/common/D_commonChanPop.vue'
import gSvg from './components/Tal_svgCollection.vue'
import Iconwink from './components/Tal_winkAlimLogo.vue'
import gToolBox from './components/popup/writeContentUnit/D_commonToolBox.vue'
import gLoadingS from './components/Tal_smallLoading.vue'
import gAlertPop from './components/popup/Tal_commonAlertPop.vue'
import channelCard from './components/list/D_channelCard.vue'
import gProfileImg from './components/common/D_commonProfile.vue'
import UBConst from '@/assets/js/UB_Const'
import i18n from './assets/i18n'
// eslint-disable-next-line camelcase

import { firebaseInitialize } from '@/assets/js/login/UB.firebase'

console.log(firebaseInitialize)

let app = {}
let type = ''
type = 'UB'
// type = 'D'
if (type === 'D') {
  const importsD = Promise.all([
    import('./components/popup/common/Tal_gPopupWrap.vue'),
    import('./components/layout/Tal_gMainHeader.vue'),
    import('./components/layout/Tal_gPopHeader.vue'),
    import('./components/layout/Tal_gFooter.vue'),
    import('./components/unit/Tal_stepProgressBar.vue'),
    import('./components/common/D_commonSticker.vue'),
    import('./components/popup/sticker/D_myStickerListPop.vue'),
    import('./components/common/D_commonStickerLine.vue'),
    import('./components/popup/confirmPop/Tal_smallCommonConfirmPop.vue'),
    import('./components/popup/common/Tal_commonSelectBoardListPop.vue'),
    import('./components/popup/memberInfo/memberUnit/D_commonSmallInput.vue'),
    import('./components/popup/confirmPop/D_commonCertiPop.vue')
  ])

  app = createApp(moTheAlim).use(router).use(router).use(store)
  importsD.then(([fullModal, TalHeader, popHeader, TalFooter, gStepProgress, gSticker, gSelectStickerPop, gStickerLine, smallPop, gSelectBoardPop, gInputSmallPop, gCertiPop]) => {
    app.component('fullModal', fullModal.default)
    app.component('TalHeader', TalHeader.default)
    app.component('popHeader', popHeader.default)
    app.component('TalFooter', TalFooter.default)
    app.component('gStepProgress', gStepProgress.default)
    app.component('gSticker', gSticker.default)
    app.component('gSelectStickerPop', gSelectStickerPop.default)
    app.component('gStickerLine', gStickerLine.default)
    app.component('smallPop', smallPop.default)
    app.component('gSelectBoardPop', gSelectBoardPop.default)
    app.component('gInputPop', gInputSmallPop.default)
    app.component('gCertiPop', gCertiPop.default)
  })
} else if (type === 'UB') {
  const importsUB = Promise.all([
    import('./components/UB/layout/UB_gMainHeader.vue'),
    import('./components/UB/popup/UB_favListPop.vue'),
    import('./components/UB/layout/UB_gPopHeader.vue'),
    import('./components/UB/popup/common/UB_gPopupWrap.vue'),
    import('./components/UB/unit/UB_commonSelectFilter.vue'),
    import('./components/pageComponents/main/D_notiHistoryList.vue'),
    import('./components/popup/confirmPop/Tal_smallCommonConfirmPop.vue'),
    import('./components/UB/layout/UB_gFooter.vue'),
    import('./components/popup/common/Tal_commonSelectBoardListPop.vue'),
    import('./components/UB/layout/UB_gCloudLoading.vue')
  ])
  app = createApp(uniBuzzy).use(router).use(router).use(store)
  importsUB.then(([gUBHeader, gFavList, popHeader, gPopupWrap, gSelectFilter, gLogList, smallPop, gFooter, gSelectBoardPop, gCloudLoading]) => {
    app.component('gUBHeader', gUBHeader.default)
    app.component('gFavList', gFavList.default)
    app.component('popHeader', popHeader.default)
    app.component('gPopupWrap', gPopupWrap.default)
    app.component('gSelectFilter', gSelectFilter.default)
    app.component('gSelectBoardPop', gSelectBoardPop.default)
    app.component('smallPop', smallPop.default)
    app.component('gLogList', gLogList.default)
    app.component('gFooter', gFooter.default)
    app.component('gCloudLoading', gCloudLoading.default)
  })
  // const gNProfileImg = require('./components/common/N_commonProfile.vue')
  // const gNCloudLoading = require('./components/layout/N_cloudLoading.vue')
  // app.component('gNProfileImg', gNProfileImg)
  // app.component('gNCloudLoading', gNCloudLoading)
}

// app.use(VueEasyLightbox)
app.component('gContentsBox', gContentsBox)
app.component('gSearchBox', gSearchBox)
app.component('gBtnSmall', gButtonS)
app.component('gInput', gInput)
app.component('gBtnLarge', gButtonL)
app.component('gActiveBar', gActiveBar)
app.component('Datepicker', Datepicker)
app.component(VueCropper)
app.component('gMainTab', gMainTab)
app.component('gChannelList', gChannelList)
app.component('gImgPop', gImgPop)
app.component('commonList', commonList)
app.component('gFileBox', gFileBox)
app.component('gWhiteSelect', gWhiteSelect)
app.component('gAxiosLoading', gAxiosLoading)
app.component('gColorPicker', gColorPicker)
app.component('gCheckBtn', gCheckBtn)
app.component('gConfirmPop', gConfirmPop)
app.component('gSvg', gSvg)
app.component('gPreLoader', gPreLoader)
app.component('gMemoList', gMemoList)
app.component('myObserver', myObserver)
app.component('gLoadingS', gLoadingS)
app.component('gMemoPop', gMemoPop)
app.component('gToggle', gToggle)
app.component('iconWink', Iconwink)
app.component('channelCard', channelCard)
app.component('imgLongClickPop', imgLongClickPop)
app.component('gAlertPop', gAlertPop)
app.component('gEmpty', gEmpty)
app.component('gReport', gReport)
app.component('gListEmpty', gListEmpty)
app.component('gChannelPop', gChannelPop)
app.component('gToolBox', gToolBox)
app.component('gProfileImg', gProfileImg)

app.use(webViewBridge)
app.use(commonjs)
app.use(i18n)
app.use(UBConst)
app.use(openView)
app.use(getjs)
app.use(Vuex)
app.use(commonSharejs)
app.use(BootstrapVue3)
// app.use(Vue3SimpleHtml2pdf)
// app.component('attachFileListPop', attachFileListPop)
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
// 스와이프 막기
// document.addEventListener(
//   'touchmove',
//   function (event) {
//     event.preventDefault()
//   },
//   { passive: false }
// )
// 뒤로가기 기능 막기
window.addEventListener('popstate', function (event) {
  history.pushState(null, null, document.URL)
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
if (localStorage.getItem('appType')) {
  app.config.globalProperties.$appType = localStorage.getItem('appType')
  app.config.globalProperties.$mobileYn = true
} else {
  app.config.globalProperties.$appType = 'UB'
  app.config.globalProperties.$mobileYn = null
}
const user = store.getters['D_USER/GE_USER']
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
/* if (navigator.serviceWorker) {
  navigator.serviceWorker.register('./firebase-messaging-sw.js')
    .then(function (reg) {
      console.log('서비스워커 등록성공 :', reg)
      reg.addEventListener('message', evnt => {
        console.log(evnt)
      })
      reg.addEventListener('push', evnt => {
        console.log(evnt)
      })
    })
    .catch(function (error) { console.log('서비스워커 등록실패 :', error) })
  navigator.serviceWorker.addEventListener('message', (event) => {
    // event is a MessageEvent object
    console.log(event)
  })
  navigator.serviceWorker.addEventListener('swMessageCome', (event) => {
    // event is a MessageEvent object
    console.log(event)
  })
} */
