/* eslint-disable no-unused-vars */
// === Main Vue App ===
import { createApp } from 'vue'
import firstLoading from './Tal_moTheAlim.vue'

import webViewBridge from './assets/js/webViewBridge'
// === Vue Router ===
import router from './router'

// === UI Library ===
import BootstrapVue3 from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import 'vue-datepicker-next/index.css'
import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'

// === Vuex ===
import Vuex from 'vuex'
import store from './store'

// === Vue I18n ===
import { createI18n } from 'vue-i18n'
import messages from '@/assets/i18n/index'

// === HTTP Library ===
import axios from 'axios'

export const app = createApp(firstLoading)
const i18n = createI18n({
  leagacy: false,
  locale: app.config.globalProperties.$DEFAULT_LANG || 'ko',
  fallbackLocale: app.config.globalProperties.$DEFAULT_LANG || 'en',
  messages: messages
})
app.use(router).use(i18n)
app.use(webViewBridge)
app.use(Vuex)
app.use(store)
app.use(BootstrapVue3)
app.component(VueCropper)

app.config.globalProperties.$DALIM_TEAM_KEY = 377
app.config.globalProperties.$DALIM_MUN_CAB_KEY = 11188
app.config.globalProperties.$DALIM_ORYU_CAB_KEY = 12006

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
})

app.config.globalProperties.$USER_TOKEN = null
if (localStorage.getItem('user') && localStorage.getItem('user') !== 'undefined' && localStorage.getItem('user') !== '') {
  if (JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).userToken) { app.config.globalProperties.$USER_TOKEN = JSON.parse(localStorage.getItem('user')).userToken }
}
// app.use(axios)
app.config.globalProperties.$axios = axios
app.config.globalProperties.$Vuex = Vuex
app.config.globalProperties.$store = store
app.config.globalProperties.$i18n = i18n
if (window.self !== window.top) {
  // 현재 문서가 iframe 안에 있음
  console.log('현재 문서는 iframe 안에 있습니다.')
  app.config.globalProperties.$APP_CONFIG = {}
  require('./proxyMain')
  app.mount('#app')
} else {
  if (!localStorage.getItem('nativeYn') || localStorage.getItem('nativeYn') === 'false' || localStorage.getItem('nativeYn') === false) {
    const appInfo = { packageName: 'com.hybric' }
    if (appInfo.packageName && !app.config.globalProperties.$INIT_YN) { // 앱 버전체크도 해야함
      const mzoinInitalizer = '/MZ_appInitailizer.json'
      const appConfig = '/H_service.json'
      app.config.globalProperties.$DEV_YN = true
      fetch(appConfig)
        .then(response => {
          console.log(response)
          response.json()
        })
        .then(myApp => {
          fetch(mzoinInitalizer).then(response => response.json())
            .then(initData => {
              // 현재 문서가 iframe 밖에 있음
              const data = findValueByKey(initData.app, appInfo.packageName)
              console.log('data', data)
              app.config.globalProperties.$APP_CONFIG = data
              // app.config.globalProperties.$APP_TYPE = data.appType
              // app.config.globalProperties.$APP_NAME = data.appName
              // app.config.globalProperties.$APP_DOMAIN = data.appDomain
              // app.config.globalProperties.$FIREBASE_CONFIG = data.firebaseConfig
              store.dispatch('D_USER/AC_USER_APP', data)
              store.dispatch('D_USER/AC_USER_CONFIG', data.firebaseConfig)
              localStorage.setItem('appConfig', data)
              app.config.globalProperties.$API_PATH = data.apiPath
              i18n.global.locale = data.defaultLang
              app.config.globalProperties.$DEFAULT_LANG = data.apiPath
              localStorage.setItem('currentScreen', data.mainUI)
              console.log('여기다잉') // JSON 데이터 출력 또는 원하는 처리 수행
              require('./proxyMain')
              require('./registerServiceWorker')
              app.mount('#app')
            })
        })
        .catch(error => console.error('Error fetching JSON:', error))
      app.use(router).use(store)/* .use(VueI18n) */
    }
  } else {
    if (localStorage.getItem('initYn')) {
      require('./proxyMain')
      require('./registerServiceWorker')
    } else {
      app.config.globalProperties.$INIT_YN = false
    }
    app.mount('#app')
  }
}

window.app = app
export function findValueByKey (jsonObj, keyToFind) {
  if (jsonObj && typeof jsonObj === 'object') {
    for (const key in jsonObj) {
      if (key === keyToFind) {
        return jsonObj[key]
      } else if (typeof jsonObj[key] === 'object') {
        const result = findValueByKey(jsonObj[key], keyToFind)
        if (result) {
          return result
        }
      }
    }
  }
  return null // 해당 key를 찾지 못한 경우
}
