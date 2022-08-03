<template>
  <div class="pagePaddingWrap loginContentsWrap">
    <commonConfirmPop v-if="appCloseYn" @ok="closeApp" @no="this.appCloseYn=false" confirmType="two" confirmText="더알림을 종료하시겠습니까?" />
    <div class="py-3 px-4" style="box-sizing: border-box; width: 100%; height: 60px; margin-top: 125px; margin-bottom: 80px;">
      <img src="../../assets/images/intro/login/login_logo1.png" style="width: 200px;" class="" >
    </div>
      <div @click="this.$router.push('/nonMemInquiryBoard')" class="inquiryBtn font20" >비회원 문의하기</div>
      <!-- <div class="loginBtn font20" style="margin-bottom: 2rem;" v-on:click="openTestLoginPage">
        더알림계정으로 로그인
      </div> -->
      <!-- <div class="loginBtn font20" v-on:click="KakaoLoginBtn">
        <img src="../../assets/images/intro/login/login_kakao.png">
        카카오 로그인
      </div> -->
      <naver :callbackFunction='naverCallbackFunction' v-if="!mobileYn" buttonColor="#3E3F6A" :isPopup='false' />
      <div v-else class="loginBtn font20" v-on:click="NaverLoginBtn">
        <img src="../../assets/images/intro/login/login_naver.png">
        네이버 로그인
      </div>
      <div class="loginBtn font20" @click="GoogleLoginBtn">
        <img src="../../assets/images/intro/login/login_google.png">
        Google 로그인
      </div>
      <div v-if="this.systemName === 'iOS' || this.systemName === 'ios'" class="loginBtn font20" v-on:click="AppleLoginBtn">
        <img src="../../assets/images/intro/login/login_apple.png">
        Apple 로그인
      </div>
  </div>
</template>

<script>
import naver from '../Tal_naverCompo.vue'
import commonConfirmPop from '../../components/popup/confirmPop/Tal_commonConfirmPop.vue'
import AuthService from '../../assets/js/login/Tal.authService'
import { firebaseApp } from '../../assets/js/login/Tal.firebase'
import { onMessage } from '../../assets/js/webviewInterface'

import { saveUser } from '../../../public/commonAssets/Tal_axiosFunction.js'
import { setUserInfo } from '../../assets/js/login/Tal_userSetting'
const authService = new AuthService(firebaseApp)
export default {
  name: '',
  data () {
    return {
      systemName: 'iOS',
      appCloseYn: false,
      mobileYn: this.$getMobileYn()
    }
  },
  components: {
    commonConfirmPop,
    naver
  },
  created () {
    if (localStorage.getItem('systemName') !== undefined && localStorage.getItem('systemName') !== 'undefined' && localStorage.getItem('systemName') !== null) { this.systemName = localStorage.getItem('systemName') }
  },
  methods: {
    closeApp () {
      onMessage('closeApp', 'requestUserPermission')
      this.appCloseYn = false
    },
    openTestLoginPage () {
      this.$router.replace('/testLoginPage')
    },
    GoogleLoginBtn () {
      if (this.mobileYn) {
        window.ReactNativeWebView.postMessage(
          JSON.stringify({
            type: 'REQ',
            callFunc: 'loginGoogle'
          })
        )
      } else {
        this.onLogin()
      }
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
    onLogin () {
      var thisthis = this
      localStorage.setItem('loginType', 'google')
      authService.login('Google').then(async function (result) {
        console.log(result)
        if (result.user) {
          // eslint-disable-next-line no-new-object
          var user = new Object()
          user.email = result.user.email
          user.mobile = result.user.phoneNumber
          user.name = result.user.displayName
          user.aToken = result.user.accessToken
          user.rToken = ''
        }
        var userProfile = await setUserInfo(user)

        /* if (userProfile.mobile === undefined || userProfile.mobile === null || userProfile.mobile === 'null' || userProfile.mobile === '') {
                // localStorage.setItem('tempUserInfo', JSON.stringify(userProfile))
                router.push({ name: 'savePhone', params: { user: JSON.stringify(userProfile) } })
              } else */

        await saveUser(userProfile) // 서버에 save요청
        localStorage.setItem('loginYn', true)
        thisthis.$router.replace({ path: '/' })
      })
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
.loginBtn{width: 100%; height: 50px; color: #fff; margin-bottom: 15px; background-color: #3E3F6A; padding: 10px; box-sizing: border-box; border-radius: 10px; }
.loginBtn img {width: 1.5rem; margin-bottom: 5px; margin-right: 20px}
.loginContentsWrap{height: 100vh;background-color: #6768A7; display: flex; flex-direction: column; padding-top: 10%; }

.inquiryBtn{width: 100%; height: 50px; color: #fff; margin-bottom: 15px; background-color: #acade0; margin-top: 20px; padding: 10px; box-sizing: border-box; border-radius: 10px; }
@media screen and (max-width: 300px) {
  .loginBtn, .inquiryBtn {
    height: 40px;
    padding: 5px;
  }
  .loginBtn img {width: 1rem; margin-bottom: 5px; margin-right: 10px}
}
</style>
