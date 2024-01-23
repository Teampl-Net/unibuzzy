<template>
    <div></div>
  </template>
<script>
import { saveUser } from '../../public/commonAssets/Tal_axiosFunction'
// eslint-disable no-unused-vars
import { defineComponent } from 'vue'
export default defineComponent({
  data () {
    return {
      redirectUrl: null,
      mLoadingYn: false,
      webviewYn: window.ReactNativeWebView
    }
  },
  created () {
    var urlString = location.search
    const splited = urlString.replace('?', '').split(/[=?&]/)
    const param = {}
    for (let i = 0; i < splited.length; i++) {
      param[splited[i]] = splited[++i]
    }
    console.log(param)
    this.redirectUrl = localStorage.getItem('redirectUrl')
    this.$axios.post('/sUniB/sso/tp.getUserInfoKakao', { code: param.code }).then((res) => {
      console.log(res.data)
      this.saveUser(res.data, res.data.accessToken)
    })
    // getUserInfoNaver
  },
  props: {
  },
  methods: {
    saveUser (userProfile, accessToken) {
      const user = {}
      user.soAccessToken = accessToken
      user.soEmail = userProfile.kakao_account.email
      user.soType = 'K'
      user.soName = userProfile.properties.profile_nickname
      user.soPicUrl = userProfile.properties.profile_image
      saveUser(user, true).then((res) => {
        console.log(res)
        if (res) {
          console.log(res)
          const refreshToken = res
          if (this.redirectUrl) {
            console.log('uri encodeURI() :: ' + encodeURI(this.redirectUrl + '?accessToken=' + this.GE_USER.userToken))
            window.location = encodeURI(this.redirectUrl + '?accessToken=' + this.GE_USER.userToken + '?refreshToken=' + refreshToken)
          } else {
            if (window.ReactNativeWebView) {
              window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'REQ', userInfo: this.GE_USER }), '*')
            }
            this.$router.replace({ path: '/' })
          }
        }
      })
    }
  //   async saveUser (userProfile, loginYn) {
  //     console.log(userProfile)
  //     var user = {}
  //     // var testYn = localStorage.getItem('testYn')
  //     // if (testYn !== undefined && testYn !== null && testYn !== '' && (testYn === true || testYn === 'true')) {
  //     //   methods.userLoginCheck()
  //     // }
  //     var setParam = {}
  //     user.soType = 'K'
  //     if (userProfile.email !== undefined && userProfile.email !== null && userProfile.email !== '') { user.soEmail = userProfile.email }
  //     if (userProfile.name !== undefined && userProfile.name !== null && userProfile.name !== '') {
  //       user.soName = userProfile.name
  //     }
  //     if (userProfile.userImg !== undefined && userProfile.userImg !== null && userProfile.userImg !== '') {
  //       user.soPicUrl = userProfile.userImg
  //       user.picMfilekey = userProfile.userImg
  //     }
  //     user.mobileYn = userProfile.mobileYn
  //     /* if (userProfile.mobile !== undefined && userProfile.mobile !== null && userProfile.mobile !== 'null' && userProfile.mobile !== '') {
  //   user.phoneLast = userProfile.mobile.slice(-4, userProfile.mobile.length)
  //   user.phoneEnc = userProfile.mobile
  //   user.soMobileEnc = userProfile.mobile
  // } else {
  //   user.phoneEnc = userProfile.phoneEnc
  //   user.phoneLast = ('' + userProfile.phoneEnc).slice(-4, userProfile.phoneEnc.length)
  // } */
  //     user.soAccessToken = userProfile.aToken
  //     var deviceInfo = userProfile.deviceInfo
  //     if (deviceInfo) {
  //       user.fcmKey = deviceInfo.fcmKey
  //       user.osName = deviceInfo.systemName
  //       user.osVersion = deviceInfo.systemVersion
  //       user.deviceId = deviceInfo.uniqueId + ''
  //       user.deviceModel = deviceInfo.model
  //       user.deviceBrand = deviceInfo.brand
  //       user.isTablet = deviceInfo.isTablet
  //       user.countryCode = deviceInfo.contry
  //       user.areaName = deviceInfo.timeZome
  //     } else {
  //       var isMobile = /Mobi/i.test(window.navigator.userAgent)
  //       if (!isMobile && localStorage.getItem('fcmKey') != null) {
  //         user.fcmKey = localStorage.getItem('fcmKey')
  //       }
  //     }
  //     setParam.user = user
  //     var result = await commonAxiosFunction({
  //       url: '/sUniB/tp.saveUser',
  //       param: setParam,
  //       firstYn: true
  //     })
  //     if (result.data.message === 'OK') {
  //       if (localStorage.getItem('user')) {
  //         var localUser = JSON.parse(localStorage.getItem('user'))
  //         result.data.userMap.uAccessToken = localUser.uAccessToken
  //         result.data.userMap.partnerToken = localUser.partnerToken
  //       }
  //       localStorage.setItem('user', JSON.stringify(result.data.userMap))
  //       await store.dispatch('D_USER/AC_USER', result.data.userMap)
  //       localStorage.setItem('sessionUser', JSON.stringify(result.data.userMap))
  //       var appInfo = store.getters['D_USER/AC_USER_APP']
  //       if (loginYn) {
  //         var userInfo = result.data.userMap
  //         if (!userInfo.certiDate && (!(/Mobi/i.test(window.navigator.userAgent)))) {
  //           // router.replace({ path: '/' })
  //           if (appInfo && appInfo.savePhone === true) router.replace({ path: '/savePhone' })
  //         }
  //       }
  //       router.replace({ path: '/' })
  //       location.href = '/'
  //     } else if (result.data.message === 'NG') {
  //       if (store !== undefined && store !== null) {
  //         store.commit('D_USER/MU_CLEAN_USER')
  //       }
  //       localStorage.setItem('user', '')
  //       alert('로그인에 실패하였으니, 다른방식으로 재로그인 해주세요.')
  //       router.replace({ name: 'unknown' })
  //       // router.replace({ name: 'policies' })
  //     }
  //   }
  },
  components: {
  },
  computed: {
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    }
  }
})
</script>
  <style scoped>
  .MKloginContentsWrap {
    /* #879dc9; */
    display: flex;
    flex-direction: column;
    text-align: center;
    padding-top: 10%;
  }
  .MKpagePaddingWrap {
    /* width: 40%; */
    height: 98vh;
    padding: 0 24px;
    padding-top: 0;
    /* box-sizing: border-box; */
  }
  /* .backImg {
    background-image: url('@/assets/images/aed281b6a2ca5fd2c4b5fdd775e8e880.jpg') ;
    background-position: center;
    background-size: cover;
          position: relative;
    background-repeat: no-repeat;
  } */
  .backImg::before{
          content: "";
          opacity: 0.5;
          position: absolute;
          top: 0px;
          left: 0px;
          right: 0px;
          bottom: 0px;
          background-color: #000;
      }
  .loginBtn {
    width: 100%;
    cursor: pointer;
    height: 50px;
    color: #fff;
    margin-bottom: 15px;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    vertical-align: center;
    position: relative;
  }
  </style>
