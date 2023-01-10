/* eslint-disable no-unused-vars */

/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import { initializeApp } from 'firebase/app'
// eslint-disable-next-line camelcase
import { methods } from '../../../../public/commonAssets/Tal_axiosFunction'
import store from '../../../store'
import { functions } from '../D_vuexFunction'
// eslint-disable-next-line camelcase
const firebaseConfig = {
  apiKey: 'AIzaSyCNLjqHR8F9kQKma056lThVIu5v2JsfSAg',
  authDomain: 'thealim-2602c.firebaseapp.com',
  projectId: 'thealim-2602c',
  storageBucket: 'thealim-2602c.appspot.com',
  messagingSenderId: '777053173385',
  appId: '1:777053173385:web:0de7347501346c761d3858',
  measurementId: 'G-0BYBFKL8TS'
}

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

export const firebaseApp = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()
console.log(firebaseApp)
var isMobile = /Mobi/i.test(window.navigator.userAgent)
if (!isMobile) {
  const messaging = firebase.messaging()
  messaging.usePublicVapidKey('BKz1oF6HiJg6kscmJ2I0hil9fAsP68N0OrkQN7Vgo_DBQYPmnswNcIK7P71CFvKrdvwLRlemD-DfAppHIZfQ46g')
  // token값 알아내기
  messaging.requestPermission()
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
  messaging.onMessage(function (payload) {
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

    // alert(payload.data.title + '\n' + payload.data.body)
  })
}
