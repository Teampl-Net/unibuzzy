/* eslint-disable no-unused-vars */

/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import { initializeApp } from 'firebase/app'
// eslint-disable-next-line camelcase
import { methods } from '../../../../public/commonAssets/Tal_axiosFunction'
import { findValueByKey } from '../../../main'
import store from '../../../store'
import { functions } from '../D_vuexFunction'
console.log('app')
try {
  // const config = store.getters['D_USER/GE_USER_CONFIG']
  // app.config.globalProperties.myGlobalVariable에 접근
  // const FIREBASE_CONFIG = Vue.config.globalProperties.$FIREBASE_CONFIG
  const appInfo = { packageName: 'com.tal_project' }
  let config = null
  const mzoinInitalizer = '/MZ_appInitailizer.json'
  const appConfig = '/D_service.json'
  fetch(appConfig)
    .then(response => {
      response.json()
    })
    .then(myApp => {
      fetch(mzoinInitalizer).then(response => response.json())
        .then(initData => {
          const data = findValueByKey(initData.app, appInfo.packageName)
          config = data.firebaseConfig
          console.log(data) // JSON 데이터 출력 또는 원하는 처리 수행
          const firebaseConfig = {
            apiKey: config.apiKey,
            authDomain: config.authDomain,
            projectId: config.projectId,
            storageBucket: config.storageBucket,
            messagingSenderId: config.messagingSenderId,
            appId: config.appId,
            measurementId: config.measurementId
          }
          if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
            !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()
            const firebaseApp = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()
            console.log('firebaseApp', firebaseApp)
            var isMobile = /Mobi/i.test(window.navigator.userAgent)
            var appYn = localStorage.getItem('nativeYn')
            // isMobile = /Mobi/i.test(window.navigator.userAgent)
            if (!isMobile && (appYn === 'false' || appYn === false)) {
              const messaging = firebase.messaging()
              /* 'BDr8D7pvx12j-FjPNKIzjsZoBEtRBiJ9D_NjfpBbH4vUOKGcD-QiseuxG6wRC6avRhy6zemDmqWFNirupFoANoE' */
              messaging.usePublicVapidKey('BKz1oF6HiJg6kscmJ2I0hil9fAsP68N0OrkQN7Vgo_DBQYPmnswNcIK7P71CFvKrdvwLRlemD')
              // token값 알아내기
              messaging.requestPermission()
                .then(function () {
                  console.log('Have permission')
                  return messaging.getToken()
                })
                .then(function (token) {
                  localStorage.setItem('fcmKey', token)
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
              })
            }
          }
        })
    })
    .catch(error => console.error('Error fetching JSON:', error))
  console.log(config)
  // eslint-disable-next-line camelcase
} catch (error) {
  console.log(error)
}
export default {
  install (Vue) {
    console.log(Vue.config.globalProperties)
  }
}
