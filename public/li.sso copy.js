var windowRef = null
var LOGIN_CEHCK_URL = new Map()
console.log(window.location.protocol + '//' + window.location.host)
LOGIN_CEHCK_URL.set('url', window.location.protocol + '//' + window.location.host)
LOGIN_CEHCK_URL.set('url', 'http://192.168.0.100:18080/')
var LOGIN_PROXY_URL = new Map()
LOGIN_PROXY_URL.set('url', window.location.protocol + '//' + window.location.host + 'service/li.loginProxy')
LOGIN_PROXY_URL.set('url', 'http://192.168.0.100:18080/service/li.loginProxy')

// eslint-disable-next-line no-unused-vars
var sso = {
  login (callbackF, addLogF) {
    if (addLogF) {
      var logText = '<span class="font16 fontBold commonBlack textLeft">li.sso.js: 로그인 팝업 호출</span>'
      logText += '<br> 호출 url: ' + LOGIN_CEHCK_URL.get('url')
      addLogF(logText, window.location.href)
    }
    // this.createLiForm('LiLoginForm', 'LiLoginFrame', LOGIN_CEHCK_URL)
    this.openPop(LOGIN_CEHCK_URL.get('url'), null, callbackF, addLogF)
    // eslint-disable-next-line no-debugger
    debugger
    // document.LiLoginForm.action = LOGIN_CEHCK_URL
    // document.LiLoginForm.target = 'popupChk'
    // document.LiLoginForm.submit()
  },
  openPop (uri, id, callbackF, addLogF) {
    try {
      if (!id) id = 'popupChk'
      var devForm = document.getElementById(id)
      if (devForm) devForm.remove()
      windowRef = location.replace(uri, id, 'width=500, height=550, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no')
      if (windowRef != null) {
      } else {
      }
    } catch (error) {
    }

    // 2.  새로 띄운 윈도우 팝업창으로 부터 수신 메세지 이벤트 처리
    if (window.addEventListener) {
      window.addEventListener('message', (e) => handlerFunction(e, callbackF, addLogF), false)
    } else if (window.attachEvent) {
      window.attachEvent('onmessage', (e) => handlerFunction(e, callbackF, addLogF))
    }
    function handlerFunction (event, callbackF) {
      // var this_ = this
      console.log(event) // -> iframe에서 보내온 값이 들어온다. close 출력
      var resultData = null
      if (event.data) {
        if (addLogF) {
          var logText = '<span class="font16 fontBold commonBlack textLeft">li.sso.js: ' + event.origin + '으로부터 온 응답</span>'
          logText += '<br>return: ' + event.data
          addLogF(logText, event.origin)
        }

        resultData = JSON.parse(event.data)
        if (resultData.result === true) {
          console.log('인증 성공!')
          console.log(resultData)
        } else {
          console.log(resultData)
          // window.open(LOGIN_CEHCK_URL, 'loginPop', 'width=500, height=700, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no')
        }
        if (callbackF) {
          location.replace(callbackF + '?loginResult=' + resultData.result)
        }
        return resultData
      }
      // origin 체크

      // if (event.origin == targetDomain && event.data == 'type') {
    }
  },

  async loginCheck (param, callbackF, addLogF) {
    if (addLogF) {
      var logText = '<span class="font16 fontBold commonBlack textLeft">li.sso.js: loginCheck함수 호출 </span>'
      logText += '<br>param: '
      logText += '<br>' + JSON.stringify(param)
      addLogF(logText, window.location.href)
    }
    this.createLiForm('LiLoginForm', 'LiLoginFrame', LOGIN_PROXY_URL.get('url'), param)
    /* var devForm = document.getElementById('LiLoginFrame')
    if (devForm) devForm.remove()
    var innerHtml = '<iframe id="LiLoginFrame" name="LiLoginFrame" frameborder="0" scrolling="no" src="' + 'http://localhost:9090/loginPl.loginCheck' + '" style="display:none;"></iframe>'
    document.body.insertAdjacentHTML('beforeend', innerHtml)
    document.LiLoginForm.action = 'http://localhost:9090/li.loginProxy'
    document.LiLoginForm.target = 'LiLoginFrame'
    document.LiLoginForm.submit() */
    this.openPop('', null, callbackF, addLogF)/* .then((res) => {
      return res
    }) */
    // eslint-disable-next-line no-debugger
    debugger
    document.LiLoginForm.action = LOGIN_PROXY_URL.get('url')
    document.LiLoginForm.target = 'popupChk'
    document.LiLoginForm.submit()
    if (addLogF) {
      logText = '<span class="font16 fontBold commonBlack textLeft">li.sso.js: 로그인 체크를 위한 팝업 호출</span>'
      logText += '<br>호출 url:' + LOGIN_PROXY_URL.get('url')
      addLogF(logText, window.location.href)
    }
  },
  createLiForm: function (formName, targetFrame, goUrl, paramObj) {
    var devForm = document.getElementById(formName)
    if (devForm) {
      devForm.remove()
    }
    var innerHtml = "<form hidden name='" + formName + "' id='" + formName + "' method='POST' >"
    innerHtml += "<input type='hidden' name='baseUrl' value='" + window.location.href + "'>"
    if (paramObj) {
      Object.keys(paramObj).map(function (objectKey, index) {
        innerHtml += "<input type='hidden' name='" + objectKey + "' value='" + paramObj[objectKey] + "'>"
      })
    }

    innerHtml += '</form>'
    // document.body.append(innerHtml)
    document.body.insertAdjacentHTML('beforeend', innerHtml)
  }
}
