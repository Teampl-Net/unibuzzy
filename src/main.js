import { createApp } from 'vue'

import moTheAlim from './Tal_moTheAlim.vue'
import router from './router'
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
import commonList from './components/list/Tal_commonList.vue'
import gChannelList from './components/list/Tal_gChannelList.vue'
import gSearchBox from './components/unit/Tal_searchBox.vue'
import gColorPicker from './components/unit/Tal_colorPicker.vue'

import gConfirmPop from './components/popup/confirmPop/Tal_commonConfirmPop.vue'
import smallPop from './components/popup/confirmPop/Tal_smallCommonConfirmPop.vue'

import myObserver from './components/Tal_ScrollObserver.vue'
import gMemoPop from './components/popup/memo/Tal_commonMemoPop.vue'
import gMemoList from './components/popup/memo/Tal_commonMemoList.vue'
// import htmlParser from './assets/js/Tal_htmlParser'
import commonjs from './assets/js/Tal_common'
import axiosFunction, { commonAxiosFunction } from '../public/commonAssets/Tal_axiosFunction'
import uploadFile from './assets/js/Tal_uploadFile'
import Datepicker from 'vue-datepicker-next'
import 'vue-datepicker-next/index.css'

import gPreLoader from './components/unit/Tal_preloader.vue'
import gLoadingS from './components/Tal_smallLoading.vue'

import gToggle from './components/pageComponents/myPage/Tal_commonToggle.vue'

import gSvg from './components/Tal_svgCollection.vue'
import Iconwink from './components/Tal_winkAlimLogo.vue'

import gEmty from './components/unit/Tal_commonEmty.vue'
import gReport from './components/unit/Tal_commonReport.vue'

// import { initializeApp } from 'firebase/app'
// import { getAnalytics } from 'firebase/analytics'

// import gToggle from 'vue-toggle-btn';
/* import Meta from 'vue-meta' */
const longClickInstance = longClickDirective({ delay: 400, interval: 50 })

const app = createApp(moTheAlim).use(router)
app.use(commonjs)
app.use(BootstrapVue3)
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

app.use(webViewBridge)
app.use(axiosFunction)
// app.use(htmlParser)

app.use(store)
app.use(uploadFile)
// app.use(massage)

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET,POST,PATCH,PUT,DELETE,OPTIONS'
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, Content-Type, X-Auth-Token'
axios.defaults.headers.common['Access-Control-Allow-Credentials'] = true
axios.defaults.headers.common['Content-Type'] = 'application/json;'
axios.defaults.timeout = 100000
axios.defaults.withCredentials = true

// axios.defaults.baseURL = 'api'
// axios.defaults.baseURL = 'http://192.168.0.2:19090'
// axios.defaults.baseURL = 'http://14.51.96.245:9091'
// axios.defaults.baseURL = 'http://192.168.0.27:19090'
// axios.defaults.baseURL = 'https://mo.d-alim.com:10443'
// axios.defaults.baseURL = 'http://61.97.186.14:19090'
// axios.defaults.baseURL = 'http://192.168.219.100:19090'
// axios.defaults.baseURL = 'http://dev.on-apt.kr:8081/'

// 캐싱 방지
// axios.defaults.headers.get['Cache-Control'] = 'no-cache'
// axios.defaults.headers.get.Pragma = 'no-cache'

// Vue.prototype.$http = axios

app.config.silent = true

app.config.globalProperties.$axios = axios

app.config.globalProperties.$commonAxiosFunction = commonAxiosFunction

app.config.globalProperties.$dayjs = dayjs
localStorage.setItem('loginYn', false)
localStorage.setItem('setItem', '')
app.mount('#app')
