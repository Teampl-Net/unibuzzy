import { app } from '@/main'

// === Date Library ===
import dayjs from 'dayjs'

// === Custom Components ===
import Datepicker from 'vue-datepicker-next'
import gActiveBar from './components/unit/Tal_gActiveBar.vue'
import gButtonS from './components/button/Tal_gButtonS.vue'
import gButtonL from './components/button/Tal_gButtonL.vue'
import fullModal from './components/popup/common/Tal_gPopupWrap.vue'
import TalHeader from './components/layout/Tal_gMainHeader.vue'
import TalImgHeader from './components/layout/D_ImageMainHeader.vue'
import popHeader from './components/layout/Tal_gPopHeader.vue'
import TalFooter from './components/layout/Tal_gFooter.vue'
import commonList from './components/list/D_commonList.vue'
import gChannelList from './components/list/D_commonChanList.vue'
import gSearchBox from './components/unit/Tal_searchBox.vue'
import gColorPicker from './components/unit/D_colorPicker.vue'
import gConfirmPop from './components/popup/confirmPop/Tal_commonConfirmPop.vue'
import gCertiPop from './components/popup/confirmPop/D_commonCertiPop.vue'
import smallPop from './components/popup/confirmPop/Tal_smallCommonConfirmPop.vue'
import myObserver from './components/Tal_ScrollObserver.vue'
import gMemoPop from './components/popup/memo/Tal_commonMemoPop.vue'
import gMemoList from './components/popup/memo/Tal_commonMemoList.vue'
import openView from './assets/js/D_openView'
import commonjs from './assets/js/Tal_common'
import getjs from './assets/js/D_vuexFunction'
import commonSharejs from './assets/js/Tal_commonShare'
import axiosFunction, { commonAxiosFunction } from '../public/commonAssets/Tal_axiosFunction'
import ssoAxiosFunction from '../public/commonAssets/D_ssoAxiosFunction'
import coreService from '../public/commonAssets/D_coreService'
import uploadFile from './assets/js/Tal_uploadFile'
import gChannelPop from './components/popup/common/D_commonChanPop.vue'
import gPreLoader from './components/unit/Tal_preloader.vue'
import gLoadingS from './components/Tal_smallLoading.vue'
import gToggle from './components/pageComponents/myPage/Tal_commonToggle.vue'
import gSvg from './components/Tal_svgCollection.vue'
import Iconwink from './components/Tal_winkAlimLogo.vue'
import gEmpty from './components/unit/Tal_commonEmpty.vue'
import gReport from './components/unit/Tal_commonReport.vue'
import gStepProgress from './components/unit/Tal_stepProgressBar.vue'
import imgLongClickPop from './components/popup/Tal_imgLongClickPop.vue'
import gAlertPop from './components/popup/Tal_commonAlertPop.vue'
import gProfileImg from './components/common/D_commonProfile.vue'
import gSelectBoardPop from './components/popup/common/Tal_commonSelectBoardListPop.vue'
import imageCompression from 'browser-image-compression'
import gListEmpty from './components/popup/receiver/receiverUnit/D_commonListEmpty.vue'
import gCheckBtn from './components/popup/writeContentUnit/D_commonCheckBtn.vue'
import gInputSmallPop from './components/popup/memberInfo/memberUnit/D_commonSmallInput.vue'
import gInput from '@/components/unit/CommonInput.vue'
import gContentsBox from './components/pageComponents/push/D_contentsBox.vue'
import gImgPop from './components/popup/common/D_commonGalleryPop.vue'
import gMainTab from './components/popup/memberInfo/memberUnit/D_commonMainTabCompo.vue'
import channelCard from './components/list/D_channelCard.vue'
import gToolBox from './components/popup/writeContentUnit/D_commonToolBox.vue'
import gFileBox from './components/unit/D_fileBox.vue'
import gSticker from './components/common/D_commonSticker.vue'
import gSelectStickerPop from './components/popup/sticker/D_myStickerListPop.vue'
import gStickerLine from './components/common/D_commonStickerLine.vue'

// === Main App Instance Creation ===
/* .use(VueI18n) */
/* export const i18n = new VueI18n({
  locale: 'en', // set locale
  fallbackLocale: 'en'
  // messages // set locale messages
}) */

app.use(commonjs)
app.use(openView)
app.use(getjs)
app.use(commonSharejs)
// app.use(VueEasyLightbox)
// app.use(Vue3SimpleHtml2pdf)

app.component('gProfileImg', gProfileImg)
app.component('gSticker', gSticker)
app.component('gStickerLine', gStickerLine)
app.component('gCertiPop', gCertiPop)
app.component('gLoadingS', gLoadingS)
app.component('gContentsBox', gContentsBox)
app.component('gAlertPop', gAlertPop)
app.component('Datepicker', Datepicker)
app.component('gColorPicker', gColorPicker)
app.component('gSearchBox', gSearchBox)
app.component('gBtnSmall', gButtonS)
app.component('gBtnLarge', gButtonL)
app.component('gActiveBar', gActiveBar)
app.component('fullModal', fullModal)
app.component('TalHeader', TalHeader)
app.component('TalImgHeader', TalImgHeader)
app.component('TalFooter', TalFooter)
app.component('popHeader', popHeader)
app.component('commonList', commonList)
app.component('gChannelList', gChannelList)
app.component('gConfirmPop', gConfirmPop)
app.component('smallPop', smallPop)
app.component('myObserver', myObserver)
app.component('gMemoPop', gMemoPop)
app.component('gMemoList', gMemoList)
app.component('gPreLoader', gPreLoader)
app.component('gLoadingS', gLoadingS)
app.component('gToggle', gToggle)
app.component('gSvg', gSvg)
app.component('iconWink', Iconwink)
app.component('gEmpty', gEmpty)
app.component('gReport', gReport)
app.component('gStepProgress', gStepProgress)
app.component('imgLongClickPop', imgLongClickPop)
app.component('gSelectBoardPop', gSelectBoardPop)
app.component('gListEmpty', gListEmpty)
app.component('gCheckBtn', gCheckBtn)
app.component('gInputPop', gInputSmallPop)
app.component('gInput', gInput)
app.component('gChannelPop', gChannelPop)
app.component('gMainTab', gMainTab)
app.component('channelCard', channelCard)
app.component('gToolBox', gToolBox)
app.component('gImgPop', gImgPop)
app.component('gFileBox', gFileBox)
app.component('gSelectStickerPop', gSelectStickerPop)

app.use(axiosFunction)
app.use(ssoAxiosFunction)
app.use(coreService)
app.use(uploadFile)

localStorage.setItem('nativeYn', false)
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
app.config.silent = true
app.config.globalProperties.$imageCompression = imageCompression
app.config.globalProperties.$commonAxiosFunction = commonAxiosFunction

app.config.globalProperties.$dayjs = dayjs

// === Local Storage Initialization ===
localStorage.setItem('loginYn', false)
localStorage.setItem('testYn', false)
localStorage.setItem('setItem', '')

// === App Configuration and Mounting ===

// var originalRequest = error.config
// if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1 && !originalRequest._retry) {
//   originalRequest._retry = true
//   console.log(error.code)
//   console.log(error.message.indexOf('timeout'))

//   var app = document.getElementById('app')
//   var innerHTML = ''
//   var toastDiv = document.createElement('div')
//   innerHTML += '<div id="toastPop" class="font16" style="width: 80%;left: 10%;border-radius: 5px;padding: 15px 10px;text-align: left;min-height: 40px;border: 1px solid #CCC;background: #f4f4f9fa;color: #000;position: absolute;bottom: 70px;box-shadow: 0 0 16px 0px #cccccc9c;z-index: 999999999999;">'
//   innerHTML += ' 네트워크 상태가 불안정 합니다. 잠시후 다시 시도해주세요.'
//   innerHTML += '</div>'
//   toastDiv.innerHTML = innerHTML
//   app.appendChild(toastDiv)
//   setTimeout(() => {
//     document.getElementById('toastPop').remove()
//   }, 2000)
//   router.replace('/')
//   return axios.request(originalRequest)
// }
localStorage.setItem('initYn', 'true')
app.config.globalProperties.$INIT_YN = true
