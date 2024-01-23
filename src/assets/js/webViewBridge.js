/* eslint-disable no-unused-vars */
import { saveUser1 } from '../../../public/commonAssets/Tal_axiosFunction.js'
import store from '../../store'
import { onMessage } from '../../assets/js/webviewInterface'
import { functions } from '../../assets/js/D_vuexFunction'
import routerMain from '../../pages/Tal_router_main.vue'
import router from '../../router'
import i18n from '@/assets/i18n'
import { app } from '@/main'
const isJsonString = (str) => {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
};
(function () {
  var promiseChain = Promise.resolve()
  var callbacks = {}
  var init = function () {
    // 유니크한 아이디를 생성한다.
    // native에서 callback 받을때 id의 callback을 호출한다.
    const guid = function () {
      function s4 () {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1)
      }
      return (
        s4() +
        s4() +
        '-' +
        s4() +
        '-' +
        s4() +
        '-' +
        s4() +
        '-' +
        s4() +
        s4() +
        s4()
      )
    }

    /**
     * javascript => react-native
     * javascript에서 react-native에 메세지를 보낸다.
     */
    window.webViewBridge = {
      send: function (targetFunc, data, success, error) {
        var msgObj = {
          targetFunc: targetFunc,
          data: data || {}
        }

        if (success || error) {
          msgObj.msgId = guid()
        }

        var msg = JSON.stringify(msgObj)

        promiseChain = promiseChain
          .then(function () {
            return new Promise(function (resolve, reject) {
              console.log('react native에 메세지를 보냄 ' + msgObj.targetFunc)

              if (msgObj.msgId) {
                callbacks[msgObj.msgId] = {
                  onsuccess: success,
                  onerror: error
                }
              }
              window.ReactNativeWebView.postMessage(msg)
              resolve()
            })
          })
          .catch(function (e) {
            console.error('메세지 실패 ' + e.message)
          })
      }
    }
    document.addEventListener('message', (e) => listenerFromNative(e))
    window.addEventListener('message', (e) => listenerFromNative(e))

    async function listenerFromNative (e) {
      var message

      try {
        if (isJsonString(e.data) === true) {
          message = JSON.parse(e.data)
        } else {
          message = e.data
        }
        if (message.type === 'userInfo' || message.type === 'successLogin') {
          if (message.loginYn === true) {
            if (message.userInfo) {
              const userProfile = JSON.parse(message.userInfo)
              localStorage.setItem('loginYn', true)
              await saveUser1(userProfile, true) // 서버에 save요청
              console.log(router)
              router.replace({ path: '/' })
            }
          } else if (message.data) {
            const userProfile = message.data
            localStorage.setItem('loginYn', true)
            await saveUser1(userProfile, true) // 서버에 save요청
            router.replace({ name: 'main' })
          } else {
            // router.replace({ path: 'policies' })
            router.replace({ name: 'login' })
          }
        } else if (message.type === 'CheckUserPermission') {
          router.replace({ name: 'permissions' })
        } else if (message.type === 'certiInfo') {
          store.dispatch('D_USER/AC_SET_CERTI', message.data)
        } else if (message.type === 'requestUserPermission') {
          router.replace({ path: '/' })
        } else if (message.type === 'deviceSystemName') {
          localStorage.setItem('nativeYn', true)
          localStorage.setItem('systemName', message.data)
        } else if (message.type === 'deepLinkUrl') {
          localStorage.setItem('nativeYn', true)
          store.commit('D_HISTORY/changeDeepLinkQueue', message.data)
          var urlString = message.url.toString()
          const params = new URLSearchParams(
            urlString.replace(app.config.globalProperties.$APP_CONFIG.appDomain, '')
          )
          var queList = []
          for (const param of params) {
            console.log('targetKind: ' + param[0])
            console.log('targetKey: ' + param[1])
            queList.push({ targetKind: param[0], targetKey: param[1] })
          }

          store.commit('D_HISTORY/changeDeepLinkQueue', queList)
        } else if (message.type === 'loginCallback') {
          const urlString = message.data.toString()
          window.replace(message.data)
        } else if (message.type === 'goback') {
          if (
            store.getters['D_USER/GE_NET_STATE'] === false ||
            store.getters['D_USER/GE_NET_STATE'] === 'false'
          ) { return }
          var history = store.getters['D_HISTORY/hStack']
          var removePage = history[history.length - 1]
          if (
            history.length < 2 &&
            (history[0] === 0 || history[0] === undefined)
          ) {
            router.replace({ path: '/' })
          }
          var current = store.getters['D_HISTORY/hUpdate']
          store.commit('D_HISTORY/updatePage', current + 1)
        } else if (message.type === 'pushmsg') {
          var isMobile = /Mobi/i.test(window.navigator.userAgent)
          var notiDetailObj = null
          var appActiveYn = JSON.parse(message.pushMessage).arrivedYn
          if (!isMobile) {
            notiDetailObj = message
          } else {
            if (
              JSON.parse(message.pushMessage).noti.data !== undefined &&
                JSON.parse(message.pushMessage).noti.data !== undefined &&
                JSON.parse(message.pushMessage).noti.data !== null &&
                JSON.parse(message.pushMessage).noti.data !== ''
            ) {
              notiDetailObj = JSON.parse(message.pushMessage).noti.data
              if (JSON.parse(message.pushMessage).noti.data.item) {
                notiDetailObj = JSON.parse(message.pushMessage).noti.data.item
              }
            } else {
              notiDetailObj = JSON.parse(message.pushMessage).noti
            }
          }
          var addVueResult = await functions.recvNotiFromBridge(
            notiDetailObj,
            isMobile
          )
          if (appActiveYn !== true && appActiveYn !== 'true') {
            if (
              JSON.parse(notiDetailObj.userDo).userKey ===
              store.getters['D_USER/GE_USER'].userKey
            ) {
              return
            }
            if (addVueResult === false) {
              alert(
                '해당 컨텐츠를 찾을 수 없습니다.\n나중에 다시 시도해주세요'
              )
              return
            }
            var popHistory = store.getters['D_HISTORY/GE_GPOP_STACK']
            var currentPage = 0
            if (popHistory && popHistory.length > 0) {
              currentPage = popHistory[popHistory.length - 1]
            }
            store.dispatch('D_NOTI/AC_ADD_NEW_NOTI', {
              notiDetailObj: notiDetailObj,
              currentPage: currentPage,
              addVueResult: addVueResult
            })
            /* routerMain.methods.recvNotiFormBridge(notiDetailObj, currentPage, addVueResult) */
          }
        } else if (message.type === 'deviceInfo') {
          var deviceInfo = JSON.parse(message)
          localStorage.setItem('deviceInfo', message.data)
        } else if (message.type === 'appInfo') {
          console.log(message.data)
          var appInfo = JSON.parse(message.data)
          localStorage.setItem('appInfo', message.data)
          if (appInfo.packageName && !app.config.globalProperties.$INIT_YN) { // 앱 버전체크도 해야함
            const mzoinInitalizer = '/MZ_appInitailizer.json'
            const appConfig = '/D_service.json'
            app.config.globalProperties.$DEV_YN = true
            fetch(appConfig)
              .then(response => {
                console.log(response)
                response.json()
              })
              .then(myApp => {
                fetch(mzoinInitalizer).then(response => response.json())
                  .then(initData => {
                    const data = findValueByKey(initData.app, appInfo.packageName)
                    console.log('data', data)
                    app.config.globalProperties.$APP_CONFIG = data
                    // app.config.globalProperties.$APP_TYPE = data.appType
                    // app.config.globalProperties.$APP_NAME = data.appName
                    // app.config.globalProperties.$APP_DOMAIN = data.appDomain
                    // app.config.globalProperties.$FIREBASE_CONFIG = data.firebaseConfig
                    store.dispatch('D_USER/AC_USER_APP', data)
                    store.dispatch('D_USER/AC_USER_CONFIG', data.firebaseConfig)
                    app.config.globalProperties.$API_PATH = data.apiPath
                    i18n.global.locale = data.defaultLang
                    app.config.globalProperties.$DEFAULT_LANG = data.apiPath
                    localStorage.setItem('currentScreen', data.mainUI)
                    require('@/proxyMain')
                    console.log(data) // JSON 데이터 출력 또는 원하는 처리 수행
                  })
              })
              .catch(error => console.error('Error fetching JSON:', error))

            app.use(router).use(store)/* .use(VueI18n) */
          }

          /* export const i18n = new VueI18n({
  locale: 'en', // set locale
  fallbackLocale: 'en'
  // messages // set locale messages
}) */

          // === find init JSON object value ===

          /* if (appInfo.current !== appInfo.last) {
            var aTag
            aTag = document.getElementById('updateAppPage')
            if (aTag == null) {
              aTag = document.createElement('a')
              aTag.id = 'hiddenDownloaderForAndroid'
              aTag.style.display = 'none'
              document.body.appendChild(aTag)
            }
            aTag.href = appInfo.playStoreUrl
            // aTag.target = '_blank'

            aTag.click()
            document.body.removeChild(aTag)
            // window.open(appInfo.playStoreUrl, '_blank')
          } */
        } else if (message.type === 'activeApp') {
          // store.dispatch('D_USER/AC_NET_STATE', message.activeYn)
        } else if (message.type === 'addConsole') {
          // this.$addConsole(message.log)
          // store.dispatch('D_USER/AC_NET_STATE', message.activeYn)
        }
      } catch (err) {
        console.error('메세지를 파싱할수 없음 ' + err)
        return
      }

      // callback을 트리거한다.
      if (callbacks[message.msgId]) {
        if (message.isSuccessfull) {
          callbacks[message.msgId].onsuccess.call(null, message)
        } else {
          callbacks[message.msgId].onerror.call(null, message)
        }
        delete callbacks[message.msgId]
      }
    }
  }
  init()
})()

function findValueByKey (jsonObj, keyToFind) {
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
