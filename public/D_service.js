/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
// import axios from 'axios'
var callYn = false
var mAxiosYn = false
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
  },
  async saveBoardContents (iParam, contentsParam, callBack) {
    // alert(false)
    var param = {}
    if (iParam) {
      param = iParam
    }
    try {
      contentsParam.bodyHtmlYn = true
      contentsParam.showCreNameYn = true
      contentsParam.jobkindId = 'BOAR'
      contentsParam.actorList = []
      param.contents = contentsParam
      // eslint-disable-next-line no-undef
      fetch('service/tp.savePartnerContents', {
        method: 'POST',
        body: JSON.stringify(param),
        headers: { 'Content-type': 'application/json' }
      })
        .then((res) => res.json())
        .then((json) => {
          console.log(json)
          if (json.result === true) {
            console.log(json)
            if (callBack) {
              callBack(json)
            }
          }
        })
      /* const result = await axios.post('https://mo.d-alim.com:7443/service/tp.savePartnerContents', this.mRecvParams)
      console.log(result)
      if (result.result === true) {
        console.log(result)
        if (callBack) {
          callBack(result)
        }
      } */
    } catch (error) {
      // this.$showToastPop('게시되지 못했습니다.')
      // console.error(error)
    } finally {
      // this.closeXPop(true)
      // this.sendLoadingYn = false
    }
  },
  async saveUserAndAccess (userProfile, coreParam, callBackF) {
    if (mAxiosYn) return
    var param = {}
    param.soType = userProfile.soType
    if (userProfile.email !== undefined && userProfile.email !== null && userProfile.email !== '') { param.soEmail = userProfile.email }
    if (userProfile.name !== undefined && userProfile.name !== null && userProfile.name !== '') {
      param.soName = userProfile.name
    }
    if (userProfile.userImg !== undefined && userProfile.userImg !== null && userProfile.userImg !== '') {
      param.soPicUrl = userProfile.userImg
      param.picMfilekey = userProfile.userImg
    }
    param.mobileYn = userProfile.mobileYn
    param.soAccessToken = userProfile.aToken
    var deviceInfo = userProfile.deviceInfo
    if (deviceInfo) {
      param.fcmKey = deviceInfo.fcmKey
      param.osName = deviceInfo.systemName
      param.osVersion = deviceInfo.systemVersion
      param.deviceId = deviceInfo.uniqueId + ''
      param.deviceModel = deviceInfo.model
      param.deviceBrand = deviceInfo.brand
      param.isTablet = deviceInfo.isTablet
      param.countryCode = deviceInfo.contry
      param.areaName = deviceInfo.timeZome
    } else {
      var isMobile = /Mobi/i.test(window.navigator.userAgent)
      if (!isMobile && localStorage.getItem('fcmKey') != null) {
        param.fcmKey = localStorage.getItem('fcmKey')
      }
    }
    var setParam = {}
    setParam.user = param
    setParam.partner = coreParam
    var result = await fetch('service/tp.saveUserAndAccess', {
      method: 'POST',
      body: JSON.stringify(setParam),
      headers: { 'Content-type': 'application/json' }
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
        if (json.result === true) {
          console.log(json)
          if (json.data.result) {
            var returnData = {}
            // debugger
            if (callBackF) {
              callBackF(json)
              return
            }
            /* returnData.partnerToken = json.data.accessUser.partnerToken
            returnData.uAccessToken = json.data.accessUser.uaccessToken
            this.$store.commit('D_USER/MU_USER_ACCESS', returnData) */
            console.log(document.referrer)
            /* if (g_pOpener) {
              g_pOpener.postMessage(JSON.stringify({ resultMsg: 'saveUserInfo', result: true, userInfo: returnData }), document.referrer)
            } */

            /*  var loginYn = await this.coreLoginCheck(returnData.uAccessToken, returnData.partnerToken)
            if (loginYn) this.okRequest() */
          }
        }
      })
  }
}
