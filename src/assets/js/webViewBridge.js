/* eslint-disable no-unused-vars */
import router from '../../router'
import { saveUser } from '../../../public/commonAssets/Tal_axiosFunction.js'
import store from '../../store'
import { functions } from '../js/D_vuexFunction'
import { onMessage } from '../../assets/js/webviewInterface'
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
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
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

        promiseChain = promiseChain.then(function () {
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
        }).catch(function (e) {
          console.error('메세지 실패 ' + e.message)
        })
      }
    }

    /**
         * react-native => javascript
         * react native에서 화면에 결과를 넘겨준다.
         */

    document.addEventListener('message', e => listenerFromNative(e))
    window.addEventListener('message', e => listenerFromNative(e))

    async function listenerFromNative (e) {
      var recvMsg

      try {
        if (isJsonString(e.data) === true) {
          recvMsg = JSON.parse(e.data)
        } else {
          recvMsg = e.data
        }
        if (recvMsg.type === 'userInfo' || recvMsg.type === 'successLogin') {
          if (recvMsg.loginYn === true) {
            var userProfile = JSON.parse(recvMsg.userInfo)
            localStorage.setItem('loginYn', true)
            /* if (userProfile.mobile === undefined || userProfile.mobile === null || userProfile.mobile === 'null' || userProfile.mobile === '') {
              // localStorage.setItem('tempUserInfo', JSON.stringify(userProfile))
              router.push({ name: 'savePhone', params: { user: JSON.stringify(userProfile) } })
            } else */
            /* if (userProfile.name === undefined || userProfile.name === null || userProfile.name === '' || userProfile.name === '0' || userProfile.name === 0) {
              // localStorage.setItem('tempUserInfo', JSON.stringify(userProfile))
              router.push({ name: 'saveName', params: { user: JSON.stringify(userProfile) } })
            } else {
              await saveUser(userProfile) // 서버에 save요청
              router.replace({ path: '/' })
            } */
            var user = {}
            user.soAccessToken = userProfile.aToken
            var deviceInfo = userProfile.deviceInfo
            if (deviceInfo) {
              user.fcmKey = deviceInfo.fcmKey
              user.osName = deviceInfo.systemName
              user.osVersion = deviceInfo.systemVersion
              user.deviceId = deviceInfo.uniqueId
              user.deviceModel = deviceInfo.model
              user.deviceBrand = deviceInfo.brand
              user.isTablet = deviceInfo.isTablet
              user.countryCode = deviceInfo.contry
              user.areaName = deviceInfo.timeZome
            }
            store.dispatch('D_USER/AC_USER', user)
            await saveUser(userProfile) // 서버에 save요청
            router.replace({ path: '/' })
          } else {
            router.replace({ path: 'policies' })
          }
        } else if (recvMsg.type === 'CheckUserPermission') {
          router.replace({ name: 'permissions' })
        } else if (recvMsg.type === 'requestUserPermission') {
          router.replace({ path: '/' })
        } else if (recvMsg.type === 'deviceSystemName') {
          localStorage.setItem('systemName', recvMsg.systemNameData)
        } else if (recvMsg.type === 'deepLinkUrl') {
          // alert(recvMsg.url)
          store.commit('D_HISTORY/changeDeepLinkQueue', recvMsg.url)
          var urlString = recvMsg.url.toString()
          // alert(urlString)
          const params = new URLSearchParams(urlString.replace('https://mo.d-alim.com', ''))
          var queList = []
          for (const param of params) {
            console.log('targetKind: ' + param[0])
            console.log('targetKey: ' + param[1])
            queList.push({ targetKind: param[0], targetKey: param[1] })
          }

          store.commit('D_HISTORY/changeDeepLinkQueue', queList)
        } else if (recvMsg.type === 'goback') {
          if (store.getters['D_USER/GE_NET_STATE'] === false || store.getters['D_USER/GE_NET_STATE'] === 'false') return
          var history = store.getters['D_HISTORY/hStack']
          if (history.length < 2 && (history[0] === 0 || history[0] === undefined)) {
            router.replace({ path: '/' })
          }
          var updatePage = store.getters['D_HISTORY/hUpdate']
          store.commit('D_HISTORY/updatePage', updatePage + 1)
        } else if (recvMsg.type === 'pushmsg') {
          var userKey = store.getters['D_USER/GE_USER'].userKey
          if (userKey === 123 || userKey === 255 || userKey === 104) { alert(' STEP - 0  + push msg Noti를 수신') }
          // 20221107수정필요

          // 1. update notiData to vuex
          var setOk = await functions.saveVuexRecvMsg(recvMsg)
          if (!setOk) return false
          // 2. noti -> add vuex -> views
          // 클릭이벤트로 실행된 함수일 때만
          if (JSON.parse(recvMsg.pushMessage).arrivedYn === true || JSON.parse(recvMsg.pushMessage).arrivedYn === 'true' ||
                JSON.parse(recvMsg.pushMessage).appActiveYn === true || JSON.parse(recvMsg.pushMessage).appActiveYn === 'true') {
          } else {
            if (userKey === 123 || userKey === 255 || userKey === 104) { alert(' STEP - 0  + 수신 후 AC_NEW_NOTI 실행 !! ') }
            store.dispatch('D_NOTI/AC_NEW_NOTI', recvMsg)
          }
        } else if (recvMsg.type === 'appInfo') {
          var appInfo = JSON.parse(recvMsg.appInfo)
          localStorage.setItem('appInfo', recvMsg.appInfo)
          if (localStorage.getItem('systemName') !== undefined && localStorage.getItem('systemName') !== 'undefined' && localStorage.getItem('systemName') !== null) {
            var systemName = localStorage.getItem('systemName')
          }

          if (systemName === 'android' || systemName === 'Android') {
            if (appInfo.current !== appInfo.last) {
              // alert('최신버전으로 업데이트 해주세요')
              /* alert('앱을 최신 버전으로 업데이트 해주세요.')
              // this.checkVersionText = '앱 버전 업데이트가 필요합니다. <br>플레이스토어로 이동할까요?'
              // this.checkVersionPopShowYn = true
              // window.open(appInfo.playStoreUrl, '_blank')
              var aTag = document.getElementById('updateAppPage')
              if (aTag == null) {
                aTag = document.createElement('a')
                aTag.id = 'updateAppPage'
                aTag.style.display = 'none'
                document.body.appendChild(aTag)
              }
              aTag.href = this.appInfo.playStoreUrl
              // aTag.target = '_blank'

              // aTag.click()
              aTag.click()
              onMessage('closeApp', 'requestUserPermission').then(res => {
                aTag.click()
              }) */
            }
          }
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
        } else if (recvMsg.type === 'netStateYn') {
          store.dispatch('D_USER/AC_NET_STATE', recvMsg.netStateYn)
          // localStorage.setItem('netStateYn', recvMsg.netStateYn)
          // var appInfo = JSON.parse(recvMsg.appInfo)
          // alert(localStorage.getItem('netStateYn') + '!!!!')
          // localStorage.setItem('appInfo', recvMsg.appInfo)
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
        } else if (recvMsg.type === 'activeApp') {
          // alert(recvMsg.activeYn)
          // store.dispatch('D_USER/AC_NET_STATE', recvMsg.activeYn)
        } else if (recvMsg.type === 'addConsole') {
          // alert(JSON.stringify(recvMsg.log))
          // this.$addConsole(recvMsg.log)
          // alert(recvMsg.activeYn)
          // store.dispatch('D_USER/AC_NET_STATE', recvMsg.activeYn)
        }
      } catch (err) {
        console.error('메세지를 파싱할수 없음 ' + err)
      }

      // callback을 트리거한다.
      /* if (callbacks[recvMsg.msgId]) {
        if (recvMsg.isSuccessfull) {
          callbacks[recvMsg.msgId].onsuccess.call(null, recvMsg)
        } else {
          callbacks[recvMsg.msgId].onerror.call(null, recvMsg)
        }
        delete callbacks[recvMsg.msgId]
      } */
    }
  }
  init()
}())
