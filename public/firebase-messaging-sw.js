/* eslint-disable import/first */
/* eslint-disable no-unused-vars */
/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-eval */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
// eslint-disable-next-line import/no-absolute-path
// import { testAlert } from './commonAssets/D_publicFunction'
var push_url

self.addEventListener('push', event => {
  /* methods.testAlertz() */
  push_url = ''
  var push_data = eval('(' + event.data.text() + ')')
  console.log('comeIn : ')
  console.log(push_data)
  var userDo = JSON.parse(push_data.data.userDo)
  console.log(userDo)
  if (userDo.targetKind === 'C') {
    targetKey = userDo.targetKey
    push_url = 'https://mo.d-alim.com?targetType=contentsDetail&targetKey=' + targetKey + '&creTeamKey=' + Number(push_data.data.creTeamKey) + '&jobkindId=' + push_data.data.jobkindId
  } else if (userDo.targetKind === 'B') {
    targetKey = userDo.targetKey
    push_url = 'https://mo.d-alim.com?targetType=contentsDetail&targetKey=' + userDo.ISub + '&creTeamKey=' + Number(push_data.data.creTeamKey) + '&jobkindId=' + push_data.data.jobkindId
  }
  if (push_data.data.largeIcon) {
    icon = push_data.data.largeIcon
  }
  const title = push_data.notification.title
  var options = null
  if (userDo.targetKind === 'C' || userDo.targetKind === 'B') {
    options = {
      body: push_data.notification.body,
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
      body: push_data.notification.body,
      icon: icon
      // image: icon
    }
  }
  self.registration.showNotification(title,
    options)
})
/* messaging.onBackgroundMessage((push_data) => {
  console.log('[firebase-messaging-sw.js] Received background message ', push_data)
  // Customize notification here
  var userDo = JSON.parse(push_data.data.userDo)
  var icon = './resource/common/thealim_header_logo_back.png'
  if (push_data.data.largeIcon) {
    icon = push_data.data.largeIcon
  }
  const title = push_data.notification.title
  var options = null
  if (userDo.targetKind === 'C' || userDo.targetKind === 'B') {
    options = {
      body: push_data.notification.body,
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
      body: push_data.notification.body,
      icon: icon
      // image: icon
    }
  }
  self.registration.showNotification(title,
    options)
}) */

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
