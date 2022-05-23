<template>
  <div class="pagePaddingWrap loginContentsWrap">
    <commonConfirmPop v-if="appCloseYn" @ok="closeApp" @no="this.appCloseYn=false" confirmType="two" confirmText="더알림을 종료하시겠습니까?" />
    <div class="py-3 px-4" style="box-sizing: border-box; width: 100%; height: 60px; margin-top: 125px; margin-bottom: 80px;">
      <img src="../../assets/images/intro/login/login_logo1.png" style="width: 200px;" class="" >
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
      <div v-if="this.systemName === 'iOS' || this.systemName === 'ios'" class="loginBtn" v-on:click="AppleLoginBtn">
        <img src="../../assets/images/intro/login/login_apple.png">
        Apple 로그인
      </div>

  </div>
</template>

<script>

import commonConfirmPop from '../../components/popup/confirmPop/Tal_commonConfirmPop.vue'

import { onMessage } from '../../assets/js/webviewInterface'
export default {
  name: '',
  data () {
    return {
      systemName: 'iOS',
      appCloseYn: false
    }
  },
  components: {
    commonConfirmPop
  },
  created () {
    document.addEventListener('message', e => this.BackPopClose(e))
    window.addEventListener('message', e => this.BackPopClose(e))
    if (localStorage.getItem('systemName') !== undefined && localStorage.getItem('systemName') !== 'undefined' && localStorage.getItem('systemName') !== null) { this.systemName = localStorage.getItem('systemName') }
  },
  methods: {
    closeApp () {
      onMessage('closeApp', 'requestUserPermission')
      this.appCloseYn = false
    },
    BackPopClose (e) {
      if (JSON.parse(e.data).type === 'goback') {
        this.appCloseYn = true
      }
    },
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
.loginContentsWrap{height: 100vh;background-color: #6768A7; display: flex; flex-direction: column; padding-top: 10%; }
</style>
