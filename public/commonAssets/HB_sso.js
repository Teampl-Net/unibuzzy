/* eslint-disable no-undef */
/* eslint-disable camelcase */
/* eslint-disable no-debugger */
/* eslint-disable array-callback-return */
var g_appInfo = null
// const basedUrl = window.location.host
// eslint-disable-next-line no-undef, no-use-before-define

const HB_SSO = {
  registerFb: function (user, config) {
    const basedUrl = 'http://192.168.0.78:9443'
    const firebaseConfig = {
      apiKey: config.apiKey,
      authDomain: config.authDomain,
      projectId: config.projectId,
      storageBucket: config.storageBucket,
      messagingSenderId: config.messagingSenderId,
      appId: config.appId,
      measurementId: config.measurementId
    }
    if (firebase.messaging.isSupported()) {
      !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()
      var isMobile = /Mobi/i.test(window.navigator.userAgent)
      if (!isMobile) {
        Notification.requestPermission(function (result) {
          // 권한 거절
          if (result === 'denied') {
            Notification.requestPermission()
            console.log('알림을 차단하셨습니다.\n브라우저의 사이트 설정에서 변경하실 수 있습니다.')
            return false
          } else if (result === 'granted') {
            console.log('알림을 허용하셨습니다.')
          }
        })
        // token값 알아내기
        // if (!config.fcmKey) {
        const messaging = firebase.messaging()

        messaging.requestPermission()
          .then(function () {
            console.log('Have permission')
            return messaging
              .getToken(messaging, {
                vapidKey: config.messageKey
              })
              .then((token) => {
                if (token) {
                  console.log(token)
                  console.log('토큰: ' + token)
                  localStorage.setItem('fcmKey', token)
                  console.log(token)
                  user.user.fcmKey = token
                  sendAjax(`${basedUrl}/sso/tp.saveUser`, user)
                  console.log('token: ' + token)
                  return token
                // 토큰을 서버에 전달...
                } else {
                // Show permission request UI
                  console.log(
                    'No registration token available. Request permission to generate one.'
                  )
                }
              })
              .catch((err) => {
                console.log('An error occurred while retrieving token. ', err)
              // ...
              })
          })
        messaging.onMessage(function (payload) {
          console.log(payload)
        })
        // }
      }
    }
  },
  loginCheck: async function (appInfo, userInfo, config) {
    const param = {}
    const basedUrl = 'http://192.168.0.78:9443'
    param.app = appInfo
    param.user = userInfo
    let callback = null
    let redirectUrl = null
    if (config.popYn) {
      callback = config.callback
    } else {
      redirectUrl = config.redirectUrl
    }

    sendAjax(`${basedUrl}/tpCore/tc.appUserLoginCheck`, param, callback, redirectUrl)
  },
  sendPush: async function (push, config) {
    const param = {}
    const basedUrl = 'http://192.168.0.78:9443'
    param.app = appInfo
    param.user = userInfo
    let callback = null
    let redirectUrl = null
    if (config.popYn) {
      callback = config.callback
    } else {
      redirectUrl = config.redirectUrl
    }

    sendAjax(`${basedUrl}/tp.sendPushBar`, param, callback, redirectUrl)
  },

  reqLoginPage: function (data, config) {
    g_appInfo = data.appInfo
    if (config) {
      if (config.calllback) {
        HB_SSO.createTargetIframe('HbSsoLogin', 'http://192.168.0.14:8080/ssoLogin', null, data, config.callback)
      } else if (config.redirectUrl) {
        window.location = encodeURI('http://192.168.0.14:8080/ssoLogin?redirect=' + config.redirectUrl + '?appInfo=' + JSON.stringify(data.appInfo))
      }
    }
  },
  async createTargetIframe (id, url, targetId, data, callback) {
    function receiveMessage (event, callback) {
      console.log(event)
      debugger
      const basedUrl = 'http://192.168.0.78:9443'
      if (event.origin.includes('mankik') || event.origin.includes('localhost') || event.origin.includes('192.168') || event.origin.includes('hybric') || event.origin.includes(basedUrl)) {
        try {
          if (event.data) {
            const result = JSON.parse(event.data)
            if (callback) {
              callback(result)
            }
          }
          console.log(event)
        } catch (error) {
          console.log(error)
        }
      }
    }
    window.addEventListener('message', (e) => receiveMessage(e, callback), false)
    // appUserLoginCheck
    if (!id) {
      return '필수정보 누락(id)'
    } else if (!url) {
      return '필수정보 누락(url)'
    }
    // let innerHtml = ''
    let tcIframe = document.getElementById(id)
    let size = null
    let position = null
    if (tcIframe) {
      tcIframe.remove()
    }
    if (!window.opener && !(window.location.href).includes('hybric')) {
      tcIframe = document.createElement('iframe')
      tcIframe.id = id
      tcIframe.src = url
      let target = document.body
      if (targetId) {
        target = document.getElementById(targetId)
      }

      target.appendChild(tcIframe)
      const popList = document.getElementsByClassName('hybricCommonPop')
      let popLength = 0
      if (popList && popList.length > 0) {
        popLength = popList.length - 1
      }
      tcIframe.classList.add('hybricCommonPop')
      tcIframe.setAttribute('HbPopIndex', popLength)
      tcIframe.setAttribute('HbCanCloseYn', 1)
      if (data.data) {
        tcIframe.onload = function () {
          setTimeout(() => {
            tcIframe.contentWindow.postMessage(JSON.stringify({ sender: 'Hb', type: 'initData', data: data.data }), '*')
          }, 0)

          // 이제 iframe 내부의 요소에 접근 가능합니다.
        }
      }
      if (tcIframe) {
        tcIframe.style = ''
        if (data.size) {
          size = data.size
          if (size.w) {
            tcIframe.style.width = size.w
          }
          if (size.h) {
            tcIframe.style.height = size.h
          }
          if (size.fullYn) {
            tcIframe.classList.add = 'mobileFullTrue'
          }
        } else {
          tcIframe.style.width = '100%'
          tcIframe.style.height = '100%'
        }
        if (data.position) {
          position = data.position
          tcIframe.style.position = 'fixed'
          if (position.left) {
            tcIframe.style.left = position.left
          }
          if (position.right) {
            tcIframe.style.right = position.right
          }
          if (position.top) {
            tcIframe.style.top = position.top
          }
          if (position.bottom) {
            tcIframe.style.bottom = position.bottom
          }
          if (position.zIndex) {
            tcIframe.style.zIndex = position.zIndex
          }
        } else {
          tcIframe.style.float = 'left'
        }
      }
      tcIframe.style.display = 'block'
    }
  },
  hideIframe () {
    // let innerHtml = ''
    const tcIframe = document.getElementById('TcIframe')
    if (tcIframe) {
      tcIframe.src = ''
      tcIframe.style.clear()
      tcIframe.style.display = 'none'
    }
  },
  hideTargetIframe (id) {
    // let innerHtml = ''
    const targetIframe = document.getElementById(id)
    targetIframe.remove()
  },
  backTargetIframe () {
    if (window.parent && window.parent.document) {
      const parentDocument = window.parent.document
      const popList = parentDocument.getElementsByClassName('hybricCommonPop')
      if (popList && popList.length > 0) {
        const closeTargetPop = popList[popList.length - 1]
        if (closeTargetPop.getAttribute('HbCanCloseYn') === 1 || closeTargetPop.getAttribute('HbCanCloseYn') === '1') {
          closeTargetPop.remove()
          return true
        }
      } else {
        return false
      }
    }
  },
  sendMsgToTargetIframe (id, msg) {
    const targetIframe = document.getElementById(id)
    debugger
    targetIframe.contentWindow.postMessage({ data: msg, sender: window.origin.href }, '*')
  }
}
function sendAjax (url, param, callback) {
  // eslint-disable-next-line no-undef
  $.ajax({
    url: url,
    type: 'POST',
    dataType: 'JSON', // 응답받을 데이터 타입 (XML,JSON,TEXT,HTML,JSONP)
    contentType: 'application/json; charset=utf-8', // 헤더의 Content-Type을 설정
    data: JSON.stringify(param),
    success: function (result) {
      if (result) {
        if (callback) {
          callback(result)
        }
      } else {
        alert('불러오기 실패')
      }
    }
  })
}
