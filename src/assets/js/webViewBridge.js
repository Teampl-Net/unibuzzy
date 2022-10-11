/* eslint-disable no-unused-vars */
import router from '../../router'
import { saveUser } from '../../../public/commonAssets/Tal_axiosFunction.js'
import store from '../../store'
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

    document.addEventListener('message', e => listener(e))
    window.addEventListener('message', e => listener(e))

    async function listener (e) {
      var message

      try {
        if (isJsonString(e.data) === true) {
          message = JSON.parse(e.data)
        } else {
          message = e.data
        }
        if (message.type === 'userInfo' || message.type === 'successLogin') {
          if (message.loginYn === true) {
            var userProfile = JSON.parse(message.userInfo)
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
            await saveUser(userProfile) // 서버에 save요청
            router.replace({ path: '/' })
          } else {
            router.replace({ path: 'policies' })
          }
        } else if (message.type === 'CheckUserPermission') {
          router.replace({ name: 'permissions' })
        } else if (message.type === 'requestUserPermission') {
          router.replace({ path: '/' })
        } else if (message.type === 'deviceSystemName') {
          localStorage.setItem('systemName', message.systemNameData)
        } else if (message.type === 'deepLinkUrl') {
          store.commit('D_HISTORY/changeDeepLinkQueue', message.url)
          var urlString = message.url.toString()
          // alert(message.url)
          const params = new URLSearchParams(urlString.replace('https://mo.d-alim.com', ''))
          var queList = []
          for (const param of params) {
            console.log('targetKind: ' + param[0])
            console.log('targetKey: ' + param[1])
            queList.push({ targetKind: param[0], targetKey: param[1] })
          }

          store.commit('D_HISTORY/changeDeepLinkQueue', queList)
        } else if (message.type === 'goback') {
          var history = store.getters['D_HISTORY/hStack']
          var removePage = history[history.length - 1]
          if (history.length < 2 && (history[0] === 0 || history[0] === undefined)) {
            router.replace({ path: '/' })
          }
          var current = store.getters['D_HISTORY/hUpdate']
          store.commit('D_HISTORY/updatePage', current + 1)
        } else if (message.type === 'pushmsg') {
        } else if (message.type === 'appInfo') {
          console.log(message.appInfo)
          var appInfo = JSON.parse(message.appInfo)
          localStorage.setItem('appInfo', message.appInfo)
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
          // alert(message.activeYn)
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
}())
