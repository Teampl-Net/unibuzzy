/* eslint-disable no-unused-vars */
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

/* const firebaseConfig = {
  apiKey: 'AIzaSyCNLjqHR8F9kQKma056lThVIu5v2JsfSAg',
  authDomain: 'thealim-2602c.firebaseapp.com',
  projectId: 'thealim-2602c',
  storageBucket: 'thealim-2602c.appspot.com',
  messagingSenderId: '777053173385',
  appId: '1:777053173385:web:46b92863d81076f61d3858',
  measurementId: 'G-NHD2EKJML0'
}

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app() */
importScripts('https://www.gstatic.com/firebasejs/8.4.3/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.4.3/firebase-messaging.js')

var firebaseConfig = {
  apiKey: 'AIzaSyBXkAC70q-Y226eQICl5h9Txu55moSSAwQ',
  authDomain: 'unibuzzy.firebaseapp.com',
  projectId: 'unibuzzy',
  storageBucket: 'unibuzzy.appspot.com',
  messagingSenderId: '947851330767',
  appId: '1:947851330767:web:de8bc42cf920be3ae563ba'
}
firebase.initializeApp(firebaseConfig)
firebase.messaging()
const messaging = firebase.messaging()
var push_url

self.addEventListener('push', event => {
  /* methods.testAlertz() */
  push_url = ''
  var push_data = eval('(' + event.data.text() + ')')
  console.log('comeIn : ')
  console.log(push_data)

  var userDo = JSON.parse(push_data.data.userDo)
  var tag = userDo.targetKind + userDo.targetKey + userDo.doType
  console.log(userDo)
  if (userDo.targetKind === 'C') {
    targetKey = userDo.targetKey
    if (userDo.iSub) {
      targetKey = userDo.iSub
    }

    push_url = 'https://unibuzzy.com?source=pwa&targetType=contentsDetail&targetKey=' + targetKey + '&creTeamKey=' + Number(push_data.data.creTeamKey) + '&jobkindId=' + push_data.data.jobkindId
  } else if (userDo.targetKind === 'R') {
    targetKey = userDo.targetKey
    push_url = 'https://unibuzzy.com?source=pwa&targetType=contentsDetail&targetKey=' + targetKey + '&creTeamKey=' + Number(push_data.data.creTeamKey) + '&jobkindId=' + push_data.data.jobkindId
  } else if (userDo.targetKind === 'U') {
    targetKey = userDo.targetKey
    push_url = 'https://unibuzzy.com?source=pwa&targetType=followList'
  } /* else if (userDo.targetKind === 'B') {
    targetKey = userDo.targetKey
    push_url = 'https://mo.d-alim.com?targetType=contentsDetail&targetKey=' + userDo.ISub + '&creTeamKey=' + Number(push_data.data.creTeamKey) + '&jobkindId=' + push_data.data.jobkindId
  } */
  if (push_data.data.largeIcon) {
    icon = push_data.data.largeIcon
  }
  const title = push_data.data.title
  var options = null
  if (userDo.targetKind === 'C' || userDo.targetKind === 'R') {
    options = {
      body: push_data.data.body,
      icon: icon,
      // image: icon,
      actions: [{
        title: 'show',
        action: 'goTab'
      },
      {
        title: 'close',
        action: 'close'
      }],
      tag: tag
    }
  } else {
    options = {
      body: push_data.data.body,
      icon: icon
      // image: icon
    }
  }

  var promiseChain = clients.matchAll({ // matchAll() 은 탭만 반환하고, 웹 워커는 제외합니다.
    type: 'window',
    includeUncontrolled: true // 현재 서비스워커 이외의 다른 서비스워커가 제어하는 탭들도 포함합니다. 그냥 default로 항상 넣어주세요.
  })
    .then((windowClients) => {
      console.log(windowClients)
      // windowClients 는 현재 열린 탭들의 값입니다.
      var matchingClient = null
      var appYn = false
      for (var i = 0; i < windowClients.length; i++) {
        var windowClient = windowClients[i]
        console.log(windowClient.url.indexOf('?source=web') !== -1)
        if (windowClient.url.indexOf('?source=web') !== -1) {
          self.registration.showNotification(title, options)
          appYn = true
          break
        }
      }
      if (!appYn) {
        self.registration.showNotification(title, options)
      }
    })
  const channel = new BroadcastChannel('new-server-post')
  channel.postMessage({ noti: push_data })

  /* var vm = window.app
  vm.$root.$childeren[0].$refs.componentRef.sample() */
})
var CACHE_STATIC_NAME = 'Dalim-pwa-cache-v2'
var CACHE_DYNAMIC_NAME = 'Dalim-pwa-dynamic-cache-v1'

const FILES_TO_CACHE = [
  '/'
  /* './index.html', // 캐쉬할 페이지 or 파일 들을 설정합니다.
  './js/app.js', // 캐쉬할 페이지 or 파일 들을 설정합니다.
  './js/chunk.js', // 캐쉬할 페이지 or 파일 들을 설정합니다.
  './js/chunk-vendors.js', // 캐쉬할 페이지 or 파일 들을 설정합니다.
  './commonAssets/Tal_axiosFunction.js' */
]

self.addEventListener('message', function (event) {
  console.log('message', event)
})
self.addEventListener('install', function (event) {
  console.log('[Service Worker] Installing service worker...', event)
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME)
      .then(function (cache) {
        console.log(cache)
        console.log('[Service Worker] Precaching App Shell')
        cache.addAll(FILES_TO_CACHE)
          .then((result) => {
            console.log(result)
          })
          .catch((error) => {
            console.log(error)
          })
      })
  )
})
self.addEventListener('fetch', (event) => {
  // console.log('fetch!!')
  if (event.request.method !== 'GET') { // GET 요청만 캐싱 지원 처리
    return
  }
  // console.log('Fetching somthing!!', event.request.url)

  event.respondWith(
    caches.match(event.request)
      .then(res => {
        if (res) {
          // cache에 있다면 cache된 데이터 제공
          return res
        } else {
          // cache에 없다면 서버로 요청
          return fetch(event.request)
        }
      })
  )
})
self.addEventListener('activate', function (event) {
  console.log('Activated', event)
  var cacheWhiteList = [CACHE_STATIC_NAME]
  console.log(cacheWhiteList)
  event.waitUntil(
    // 캐시 스토리지의 모든 스토리지명을 가져온다.
    caches.keys().then((cacheNames) => {
      console.log(cacheNames)
      // 캐시를 삭제하는 건 Promise를 반환하므로 Promise.all을 사용해 끝날 시점을 잡아야한다.
      return Promise.all(
        // 이 결과는 [Promise, Promise...] 형태가 되시겠다.
        cacheNames.map((cacheName) => {
          // 각각의 캐시 스토리지명이 화이트 리스트와 같지 않을 경우
          if (cacheWhiteList.indexOf(cacheName) === -1) {
            // 캐시를 삭제하는 Promise를 배열에 추가한다.
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  // activate 시에는 clients claim 메소드를 호출해서
  // 브라우저에 대한 제어권을 가져와야한다.
  return self.clients.claim()
})
// Push Notification Click

self.addEventListener('notificationclick', function (event) {
  console.log('Notification click Received.', event)
  if (event.action === 'goTab') {
    if (push_url != null) {
      var urlToOpen = new URL(push_url, self.location.origin).href

      var promiseChain = clients.matchAll({ // matchAll() 은 탭만 반환하고, 웹 워커는 제외합니다.
        type: 'window',
        includeUncontrolled: true // 현재 서비스워커 이외의 다른 서비스워커가 제어하는 탭들도 포함합니다. 그냥 default로 항상 넣어주세요.
      })
        .then((windowClients) => {
          console.log(windowClients)
          // windowClients 는 현재 열린 탭들의 값입니다.
          var matchingClient = null

          for (var i = 0; i < windowClients.length; i++) {
            var windowClient = windowClients[i]
            console.log(windowClient.url.indexOf('?source=web') !== -1)
            if (windowClient.url.indexOf('?source=web') !== -1) {
              matchingClient = windowClient
              break
            }
          }
          console.log(matchingClient)
          console.log(urlToOpen)
          if (matchingClient) {
            return matchingClient.focus()
          } else {
            return clients.openWindow(urlToOpen)
          }
        })

      // promiseChain은 위 matchingClient.focus()의 실행이 끝난 후 waitUntil()을 수행하기 위한 프로미스 체인입니다.
      event.waitUntil(promiseChain)

      /* event.waitUntil(
        clients.openWindow(push_url)
      ) */
    }
  } else {
    event.notification.close()
  }
})
