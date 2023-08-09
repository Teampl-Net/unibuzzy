/* eslint-disable no-unused-vars */
import router from '../../router'
import { saveUser } from '../../../public/commonAssets/Tal_axiosFunction.js'
import store from '../../store'
import { onMessage } from '../../assets/js/webviewInterface'
import { functions } from '../../assets/js/D_vuexFunction'
import routerMain from '../../pages/Tal_router_main.vue'
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
          //  alert(message.type)
          if (message.loginYn === true) {
            if (message.userInfo) {
              const userProfile = JSON.parse(message.userInfo)
              localStorage.setItem('loginYn', true)
              await saveUser(userProfile, true) // 서버에 save요청
              router.replace({ path: '/' })
            }
          } else if (message.data) {
            // alert(message.data)
            const userProfile = message.data
            localStorage.setItem('loginYn', true)
            await saveUser(userProfile, true) // 서버에 save요청
            router.replace({ name: 'main' })
          } else {
            // router.replace({ path: 'policies' })
            router.replace({ name: 'unknown' })
          }
        } else if (message.type === 'CheckUserPermission') {
          router.replace({ name: 'permissions' })
        } else if (message.type === 'appType') {
          localStorage.setItem('mobileYn', 'true')
          localStorage.setItem('nativeYn', 'true')

          localStorage.setItem('appType', 'UB')
        } else if (message.type === 'returnImpData') {
          store.dispatch('D_USER/AC_SET_CERTI', message.certi)
        } else if (message.type === 'certiInfo') {
          store.dispatch('D_USER/AC_SET_CERTI', message.certiInfo)
        } else if (message.type === 'requestUserPermission') {
          router.replace({ path: '/' })
        } else if (message.type === 'deviceSystemName') {
          localStorage.setItem('nativeYn', true)
          if (message.systemNameData) {
            localStorage.setItem('systemName', message.systemNameData)
          } else if (message.data) {
            localStorage.setItem('systemName', message.data)
          }
        } else if (message.type === 'deepLinkUrl') {
          localStorage.setItem('nativeYn', true)
          store.commit('D_HISTORY/changeDeepLinkQueue', message.url)
          var urlString = message.url.toString()
          const params = new URLSearchParams(
            urlString.replace('https://mo.d-alim.com', '')
          )
          var queList = []
          for (const param of params) {
            console.log('targetKind: ' + param[0])
            console.log('targetKey: ' + param[1])
            queList.push({ targetKind: param[0], targetKey: param[1] })
          }

          store.commit('D_HISTORY/changeDeepLinkQueue', queList)
        } else if (message.type === 'goback') {
          if (
            store.getters['D_USER/GE_NET_STATE'] === false ||
            store.getters['D_USER/GE_NET_STATE'] === 'false'
          ) { return }
          var hStack = store.getters['D_HISTORY/hStack']
          var removePage = hStack[hStack.length - 1]
          if (removePage && removePage.includes('router$#$')) {
            hStack = hStack.filter((element, index) => index < hStack.length - 1)
            store.commit('D_HISTORY/setRemovePage', removePage)
            store.commit('D_HISTORY/updateStack', hStack)
            router.go(-1)
            return
          }
          if (
            history.length < 2 &&
            (history[0] === 0 || history[0] === undefined)
          ) {
            router.replace({ path: '/' })
          }
          var current = store.getters['D_HISTORY/hUpdate']
          store.commit('D_HISTORY/updatePage', current + 1)
        } else if (message.type === 'pushmsg') {
          console.log(message)
          // alert(JSON.stringify(message.data))
          var isMobile = /Mobi/i.test(window.navigator.userAgent)
          var notiDetailObj = null
          if (isJsonString(message.data)) {
            message.data = JSON.parse(message.data)
          }
          var appActiveYn = message.data.arrivedYn

          if (!isMobile) {
            notiDetailObj = message
          } else {
            if (message.data) {
              notiDetailObj = message.data.noti.data
              // alert(JSON.stringify(JSON.parse(message.data).noti.data))
              if (message.data.noti.data.item) {
                notiDetailObj = message.data.noti.data.item
              } else if (message.data.noti.data) {
                notiDetailObj = message.data.noti.data
              }
            } else {
              notiDetailObj = message.data.noti
            }
          }

          var addVueResult = await functions.recvNotiFromBridge(
            message,
            isMobile,
            notiDetailObj
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
        } else if (message.type === 'appInfo') {
          var appInfo = JSON.parse(message.appInfo)
          localStorage.setItem('appInfo', message.appInfo)
          /* if (appInfo.current !== appInfo.last) {
            // alert('최신버전으로 업데이트 해주세요')
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
        } else if (message.type === 'netStateYn') {
          store.dispatch('D_USER/AC_NET_STATE', message.netStateYn)
          // localStorage.setItem('netStateYn', message.netStateYn)
          // var appInfo = JSON.parse(message.appInfo)
          // alert(localStorage.getItem('netStateYn') + '!!!!')
          // localStorage.setItem('appInfo', message.appInfo)
          /* if (appInfo.current !== appInfo.last) {
              // alert('최신버전으로 업데이트 해주세요')
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
