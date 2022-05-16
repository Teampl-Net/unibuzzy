/* eslint-disable no-unused-vars */
import router from '../../router'
import { saveUser } from '../../../public/commonAssets/Tal_axiosFunction.js'

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
      // alert(e.data)
      var message

      // alert('type is ' + e.dat)
      try {
        if (isJsonString(e.data) === true) {
          message = JSON.parse(e.data)
        } else {
          message = e.data
        }
        // alert(true)
        if (message.type === 'userInfo' || message.type === 'successLogin') {
          if (message.loginYn === true) {
            // alert(message.userInfo)
            var userProfile = JSON.parse(message.userInfo)
            localStorage.setItem('loginYn', true)
            // alert(userProfile.mobile)
            if (userProfile.mobile === undefined || userProfile.mobile === null || userProfile.mobile === 'null' || userProfile.mobile === '') {
              // localStorage.setItem('tempUserInfo', JSON.stringify(userProfile))
              router.replace({ name: 'savePhone', params: { user: JSON.stringify(userProfile) } })
            } else if (userProfile.name === undefined || userProfile.name === null || userProfile.name === '' || userProfile.name === '0' || userProfile.name === 0) {
              // localStorage.setItem('tempUserInfo', JSON.stringify(userProfile))
              router.replace({ name: 'saveName', params: { user: JSON.stringify(userProfile) } })
            } else {
              await saveUser(userProfile) // 서버에 save요청
              router.replace({ path: '/' })
            }
            /* localStorage.setItem('userMobile', userProfile.mobile)
            localStorage.setItem('fcmKey', userProfile.deviceInfo.fcmKey)
            localStorage.setItem('userName', userProfile.name)
            localStorage.setItem('userImg', userProfile.userImg)
            localStorage.setItem('userEmail', userProfile.email)
            localStorage.setItem('userAtoken', userProfile.aToken) */
            // alert(this.userProfile)
          } else {
            router.replace({ path: 'policies' })
          }
        } else if (message.type === 'CheckUserPermission') {
          router.replace({ name: 'permissions' })
        } else if (message.type === 'requestUserPermission') {
          router.replace({ path: '/' })
        } else if (message.type === 'pushmsg') {
          alert(JSON.stringify(message.pushMessage))
          alert('제목:' + message.pushMessage.title + '\n내용:' + message.pushMessage.body)
          // router.replace({ name: 'policy' })
        } else if (message.type === 'deviceSystemName') {
          // alert(message.systemNameData)
          localStorage.setItem('systemName', message.systemNameData)
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
