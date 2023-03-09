/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
var callYn = false
const dService = {
  openBoardMain (paramObj, saveAccessCallbackFunction) {
    callYn = false
    const windowRef = window.open('https://mo.d-alim.com/#/PARTNER', '_blank', 'width=500, height=800, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no')
    windowRef.postMessage(paramObj, 'https://mo.d-alim.com')

    if (!callYn) {
      const callPost = setInterval(() => {
        if (!callYn) {
          windowRef.postMessage({ param: paramObj, request: 'openBoardMain' }, 'https://mo.d-alim.com')
        } else {
          clearInterval(callPost)
        }
      }, 2000)
    }

    function receiveMessage (event, callback) {
      // Do we trust the sender of this message?  (might be
      // different from what we originally opened, for example).
      if (event.origin === 'https://mo.d-alim.com') {
        try {
          if (event.data) {
            var result = JSON.parse(event.data)
            if (result.result) {
              if (result.resultMsg === 'setOk') {
                callYn = true
              } else if (result.resultMsg === 'saveUserInfo') {
                callback(result.userInfo)
              }
            }
          }
          console.log(event)
        } catch (error) {
          console.log(error)
        }
      }
    }
    window.addEventListener('message', (e) => receiveMessage(e, saveAccessCallbackFunction), false)

    // return windowRef
  }
}
