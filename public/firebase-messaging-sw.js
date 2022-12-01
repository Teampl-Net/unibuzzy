/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-eval */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
/* import { publicFunction } from './commonAssets/D_publicFunction' */
importScripts('https://www.gstatic.com/firebasejs/7.20.0/firebase.js')
importScripts('https://www.gstatic.com/firebasejs/7.20.0/firebase-messaging.js')
// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.

/* !firebase.apps.length ? firebase.initializeApp({
  apiKey: 'AIzaSyCNLjqHR8F9kQKma056lThVIu5v2JsfSAg',
  authDomain: 'thealim-2602c.firebaseapp.com',
  projectId: 'thealim-2602c',
  storageBucket: 'thealim-2602c.appspot.com',
  messagingSenderId: '777053173385',
  appId: '1:777053173385:web:46b92863d81076f61d3858',
  measurementId: 'G-NHD2EKJML0'
}) : firebase.app() */
// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
/* const messaging = firebase.messaging()
messaging.usePublicVapidKey('BKz1oF6HiJg6kscmJ2I0hil9fAsP68N0OrkQN7Vgo_DBQYPmnswNcIK7P71CFvKrdvwLRlemD-DfAppHIZfQ46g')
document.addEventListener('DOMContentLoaded', function() {
    //...생략

    if(navigator.serviceWorker){
        navigator.serviceWorker.register('/firebase-messaging-sw.js')
            .then(function(reg){console.log('서비스워커 등록성공 :', reg)})
            .catch(function(error){console.log('서비스워커 등록실패 :', error)});
    }
}); */

const firebaseConfig = {
  apiKey: 'AIzaSyCNLjqHR8F9kQKma056lThVIu5v2JsfSAg',
  authDomain: 'thealim-2602c.firebaseapp.com',
  projectId: 'thealim-2602c',
  storageBucket: 'thealim-2602c.appspot.com',
  messagingSenderId: '777053173385',
  appId: '1:777053173385:web:46b92863d81076f61d3858',
  measurementId: 'G-NHD2EKJML0'
}
// firebase.initializeApp(firebaseConfig);

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

var messaging = firebase.messaging()
messaging.usePublicVapidKey('BKz1oF6HiJg6kscmJ2I0hil9fAsP68N0OrkQN7Vgo_DBQYPmnswNcIK7P71CFvKrdvwLRlemD-DfAppHIZfQ46g')
var push_url
self.addEventListener('push', event => {
  var push_data = eval('(' + event.data.text() + ')')
  console.log('comeIn : ')
  console.log(push_data)
  var userDo = JSON.parse(push_data.data.userDo)
  console.log(userDo)
  if (userDo.targetKind === 'CONT') {
    targetKey = userDo.targetKey
    push_url = 'https://mo.d-alim.com?targetType=contentsDetail&targetKey=' + targetKey + '&creTeamKey=' + Number(push_data.data.creTeamKey) + '&jobkindId=' + push_data.data.jobkindId
  } else if (userDo.targetKind === 'CABI') {
    targetKey = userDo.targetKey
    push_url = 'https://mo.d-alim.com?targetType=contentsDetail&targetKey=' + userDo.ISub + '&creTeamKey=' + Number(push_data.data.creTeamKey) + '&jobkindId=' + push_data.data.jobkindId
  } else if (userDo.targetKind === 'CONT') {
    targetKey = userDo.targetKey
    push_url = 'https://mo.d-alim.com?targetType=chanDetail&targetKey=' + targetKey
  } else {
    push_url = push_data
  }
  const title = push_data.notification.title
  const options = {
    body: push_data.notification.body,
    icon: './resource/common/thealim_header_logo_back.png',
    image: './resource/common/thealim_header_logo_back.png',
    actions: [{
      title: '화면보기',
      action: 'goTab'
    },
    {
      title: '닫기',
      action: 'close'
    }]
  }

  event.waitUntil(self.registration.showNotification(title, options))
})
self.addEventListener('install', function (event) {
  self.skipWaiting()
  console.log('Installed', event)
})
self.addEventListener('activate', function (event) {
  console.log('Activated', event)
})
// Push Notification Click

self.addEventListener('notificationclick', function (event) {
  console.log('Notification click Received.', event)
  if (event.action === 'goTab') {
    if (push_url != null) {
      event.waitUntil(
        clients.openWindow(push_url)

      )
    }
  } else {
    event.notification.close()
  }
})
