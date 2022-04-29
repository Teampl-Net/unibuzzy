<template>
  <div class="pagePaddingWrap" style="height: 100vh; background-color: #6768A7; display: flex; flex-direction: column; padding-top: 10%">
    <div class="py-3 px-4" style="box-sizing: border-box; width: 100%; height: 60px; margin-top: 200px; margin-bottom: 50px;">
      <img src="../../assets/images/intro/tal_permission_header_logo.png" class="fl" >
      <div class=" fl ms-2 text-start " style=" margin-top: 14px; line-height: 27px">
        <p class="font30 headerFont whiteColor">더알림</p>
        <p class="font15 whiteColor headerFont" style="line-height: 32px">가장 편리한 구독-알림</p>
      </div>
    </div>
      <div class="loginBtn" style="margin-bottom: 2rem;" v-on:click="openTestLoginPage">
        더알림계정으로 로그인
      </div>
      <div class="loginBtn" v-on:click="KakaoLoginBtn">
        <img src="../../assets/images/intro/login/login_kakao.png">
        카카오 로그인
      </div>
      <div class="loginBtn" v-on:click="NaverLoginBtn">
        <img src="../../assets/images/intro/login/login_naver.png">
        네이버 로그인
      </div>
      <div class="loginBtn" v-on:click="GoogleLoginBtn">
        <img src="../../assets/images/intro/login/login_google.png">
        Google 로그인
      </div>
      <div v-if="this.systemName === 'ios'" class="loginBtn" v-on:click="AppleLoginBtn">
        <img src="../../assets/images/intro/login/login_apple.png">
        Apple 로그인
      </div>

  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      systemName: 'ios'
    }
  },
  created () {
    if (localStorage.getItem('systemName') !== undefined && localStorage.getItem('systemName') !== 'undefined' && localStorage.getItem('systemName') !== null) { this.systemName = localStorage.getItem('systemName') }
    // alert('기종은요: ' + localStorage.getItem('systemName'))
  },
  methods: {
    openTestLoginPage () {
      this.$router.replace('/testLoginPage')
    },
    GoogleLoginBtn () {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          type: 'REQ',
          callFunc: 'loginGoogle'
        })
      )
    },
    KakaoLoginBtn () {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          type: 'REQ',
          callFunc: 'loginKakao'
        })
      )
    },
    NaverLoginBtn () {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          type: 'REQ',
          callFunc: 'loginNaver'
        })
      )
    },
    AppleLoginBtn () {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          type: 'REQ',
          callFunc: 'loginApple'
        })
      )
    },
    pictureResponse (data) {
    },
    requestPermission: () => {
      // 모바일이라면 모바일의 카메라 권한을 물어보는 액션을 전달합니다.
      window.ReactNativeWebView.postMessage(
        JSON.stringify({ type: 'REQ_CAMERA_PERMISSION' })
      )
    }
  }
  // onMessage (data) {
  //   window.nsWebViewBridge.emit('onMessage', data)
  // }

}
</script>

<style scoped>
p{margin-bottom: 0;}
.loginBtn{width: 100%; height: 50px; color: #fff; margin-bottom: 15px; font-size: 20px; background-color: #3E3F6A; padding: 10px; box-sizing: border-box; border-radius: 10px; }
.loginBtn img {width: 1.5rem; margin-bottom: 5px; margin-right: 20px}
</style>
