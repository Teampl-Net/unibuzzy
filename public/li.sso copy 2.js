/* eslint-disable no-unused-vars */
var windowRef = null
var LOGIN_CHECK_URL = new Map()
console.log(window.location.protocol + '//' + window.location.host)
LOGIN_CHECK_URL.set('url', window.location.protocol + '//' + window.location.host)
LOGIN_CHECK_URL.set('url', 'http://localhost:8082/')
var LOGIN_PROXY_URL = new Map()
LOGIN_PROXY_URL.set('url', window.location.protocol + '//' + window.location.host + 'tpp.loginProxy')
LOGIN_PROXY_URL.set('url', 'http://localhost:8083/tpp.loginProxy')

// eslint-disable-next-line no-unused-vars
var sso = {
  login (callbackF, addLogF) {
    // alert('come')
    if (addLogF) {
      var logText = '<span class="font16 fontBold commonBlack textLeft">li.sso.js: 로그인 팝업 호출</span>'
      logText += '<br> 호출 url: ' + LOGIN_CHECK_URL.get('url')
      addLogF(logText, window.location.href)
    }
    // this.createLiForm('LiLoginForm', 'LiLoginFrame', LOGIN_CHECK_URL)
    this.openPop(LOGIN_CHECK_URL.get('url'), null, callbackF, addLogF)
    // eslint-disable-next-line no-debugger
    debugger
    // document.LiLoginForm.action = LOGIN_CHECK_URL
    // document.LiLoginForm.target = 'popupChk'
    // document.LiLoginForm.submit()
  },
  openPop (uri, id, callbackF, addLogF) {
    try {
      if (!id) id = 'popupChk'
      // uri += '?returnUrl=' + callbackF
      var aTag = document.getElementById(id)
      // if (devForm) devForm.remove()
      //  var aTag = document.getElementById('TppProxyAtag')
      if (aTag == null) {
        aTag = document.createElement('a')
        aTag.id = id
        aTag.style.display = 'none'
        document.body.appendChild(aTag)
      }
      aTag.href = uri
      // aTag.href = appInfo.playStoreUrl
      aTag.target = id

      var windowRef = aTag.click()
      document.body.removeChild(aTag)
      // var windowRef = window.open(uri, id, 'width=500, height=550, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no')
    } catch (error) {
      alert(error)
    }
    // alert(windowRef)

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
          // window.open(LOGIN_CHECK_URL, 'loginPop', 'width=500, height=700, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no')
        }
        if (callbackF) {
          alert(resultData.result)
          callbackF()
          // location.replace(callbackF + '?loginResult=' + resultData.result)
        }
        return resultData
      }
      // origin 체크

      // if (event.origin == targetDomain && event.data == 'type') {
    }
  },
  openPop1 (uri, id, callbackF, addLogF) {
    try {
      if (!id) id = 'popupChk'
      uri += '?returnUrl=' + callbackF
      var devForm = document.getElementById(id)
      if (devForm) devForm.remove()
      var windowRef = location.replace(uri, id, 'width=500, height=550, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no')
    } catch (error) {
      alert(error)
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
          // window.open(LOGIN_CHECK_URL, 'loginPop', 'width=500, height=700, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no')
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
    console.log(param)
    if (addLogF) {
      var logText = '<span class="font16 fontBold commonBlack textLeft">li.sso.js: loginCheck함수 호출 </span>'
      logText += '<br>param: '
      logText += '<br>' + JSON.stringify(param)
      addLogF(logText, window.location.href)
    }
    this.createLiForm('LiLoginForm', 'LiLoginFrame', LOGIN_PROXY_URL.get('url'), param)
    var devForm = document.getElementById('LiLoginFrame')
    if (devForm) devForm.remove()
    var innerHtml = '<iframe id="LiLoginFrame" name="LiLoginFrame" frameborder="0" scrolling="no" src="' + LOGIN_PROXY_URL.get('url') + '" style="display:none;"></iframe>'
    document.body.insertAdjacentHTML('beforeend', innerHtml)
    document.LiLoginForm.action = LOGIN_PROXY_URL.get('url')
    document.LiLoginForm.target = 'LiLoginFrame'
    document.LiLoginForm.submit()
    // this.openPop('', null, callbackF, addLogF)/* .then((res) => {
    // return res

    /*  // eslint-disable-next-line no-debugger
    debugger
    document.LiLoginForm.action = LOGIN_PROXY_URL.get('url')
    document.LiLoginForm.target = 'popupChk'
    document.LiLoginForm.submit() */
    if (addLogF) {
      logText = '<span class="font16 fontBold commonBlack textLeft">li.sso.js: 로그인 체크를 위한 팝업 호출</span>'
      logText += '<br>호출 url:' + LOGIN_PROXY_URL.get('url')
      addLogF(logText, window.location.href)
    }
  },
  async loginCheck2 (param, callbackF, addLogF) {
    console.log(param)
    // eslint-disable-next-line no-undef
    var res = await $.ajax({
      url: 'http://localhost:8083/loginPl.loginCheck', // 목적지
      type: 'POST', // HTTP Method
      data: JSON.stringify(param), // 전송 데이터
      dataType: 'json', // 전송 데이터 형식
      contentType: 'application/json',
      success: function (res) { // 성공 시 실행
        console.log(res)
        return res
        // opener.window.parent.postMessage(JSON.stringify(res), '*')
        // self.close();
        // window.setTimeout(self.close(), 1000)

        // window.parent.postMessage({ childData : 'test data' }, 'http://abc.com');

        // window.opener.successLogin(res);
      },
      error: function (er) { // 실패 시 실행
        console.log(er)
        alert('실패 원인 : ' + er)
      }
      //                 })
    })
    console.log(res)
    return res
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
