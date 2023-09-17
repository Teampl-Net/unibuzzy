import { initializeApp } from 'firebase/app'
import { getMessaging } from 'firebase/messaging'

// eslint-disable-next-line camelcase
import { methods } from '../../../../public/commonAssets/Tal_axiosFunction'
import store from '../../../store'
// eslint-disable-next-line camelcase
const firebaseConfig = {
  apiKey: 'AIzaSyBXkAC70q-Y226eQICl5h9Txu55moSSAwQ',
  authDomain: 'unibuzzy.firebaseapp.com',
  projectId: 'unibuzzy',
  storageBucket: 'unibuzzy.appspot.com',
  messagingSenderId: '947851330767',
  appId: '1:947851330767:web:de8bc42cf920be3ae563ba'
}

export const firebaseInitialize = initializeApp(firebaseConfig)
const messaging = getMessaging(firebaseInitialize)

var isMobile = /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent)
var appYn = localStorage.getItem('nativeYn')
// isMobile = /Mobi/i.test(window.navigator.userAgent)
if (!isMobile && (appYn === 'false' || appYn === false)) {
  // messaging.usePublicVapidKey('BD3_tmx3J9zVyU3-Bfbxe5sJ0HZVgECvcs1i4A9gnCbv_ZHRn_nX41BCT4uGY9EVwewwzG6XblQrTLa49dRYNYg')
  // token값 알아내기
  Notification.requestPermission()
    .then(function () {
      console.log('Have permission')
      return messaging.getToken()
    })
    .then(function (token) {
      localStorage.setItem('fcmKey', token)
      // eslint-disable-next-line no-debugger
      debugger
      var user = store.getters['D_USER/GE_USER']
      if (user && user.fcmKey) {
        if (user.fcmKey) {
          if (token === user.fcmKey) {
            return
          }
        }
        user.fcmKey = token
        store.dispatch('D_USER/AC_USER', user)
        methods.saveFcmToken()
      }
      console.log('token: ' + token)
    })
    .catch(function (arr) {
      console.log('Error Occured')
    })
    // essaging.onMessage(function (payload) {
    /* console.log('onMessage: ', payload)
    var message = payload.data
    functions.recvNotiFromBridge(message, false)
    var userDo = JSON.parse(payload.data.userDo)
    var title = payload.data.title
    var options = null
    var icon = './resource/common/thealim_header_logo_back.png'
    if (payload.data.largeIcon) {
      icon = payload.data.largeIcon
    }
    if (userDo.targetKind === 'C' || userDo.targetKind === 'B') {
      options = {
        body: payload.data.body,
        icon: icon,
        // image: icon,
        actions: [{
          title: '화면보기',
          action: 'goTab'
        },
        {
          title: '닫기',
          action: 'close'
        }]
      }
    } else {
      options = {
        body: payload.data.body,
        icon: icon
      // image: icon
      }
    } */
  /* var title = payload.data.title
    var options = {
      body: payload.data.body,
      data: payload.data,
      icon: './resource/common/thealim_header_logo_back.png',
      actions: [{
        title: '11',
        action: 'goTab'
      },
      {
        title: '닫기',
        action: 'close'
      }]
    }
    // eslint-disable-next-line no-unused-vars
    navigator.serviceWorker.ready.then(function (registration) {
      // eslint-disable-next-line no-unused-vars
      var notiAlarm = registration.showNotification(title, options)
      console.log(registration)
    }) */

  //  })
}
