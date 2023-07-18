<i18n>
  {
    "ko": {
      "LOG_BTN_GOOGLE": "구글 로그인",
      "LOG_BTN_APPLE": "애플 로그인"
    },
    "en": {
      "LOG_BTN_GOOGLE": "Google Login",
      "LOG_BTN_APPLE": "Apple Login"
    }
  }
  </i18n>
<template>
  <div class="pagePaddingWrap loginContentsWrap">
    <commonConfirmPop v-if="appCloseYn" @ok="closeApp" @no="this.appCloseYn=false" confirmType="two" confirmText="더알림을 종료하시겠습니까?" />
    <div v-if="!pPartnerLoginYn" class="py-3 px-4" style="box-sizing: border-box; width: 100%; height: 60px; margin-top: 125px; margin-bottom: 80px;">
      <img src="../../../assets/images/intro/login/login_logo1.png" style="width: 200px;" class="" >
    </div>
    <div v-else class="py-3 px-4" style="box-sizing: border-box; width: 100%; min-height: 50px; margin-top: 125px; ">
      <!-- <img  src="../../../assets/images/main/login_Wlogo.png" style="width: 50px;" class="fl" > -->
      <img src="../../../assets/images/intro/login/login_logo1.png" style="width: 200px;" class="" >
      <p class="textCenter fl fontBold font16 " v-html="pPartnerLoginText" style="width: calc(100%); margin-top: 10px; margin-bottom: 10px; color: #D6D6E7;"></p>
    </div>
      <!-- <div class="loginBtn font20" v-on:click="KakaoLoginBtn">
        <img src="../../../assets/images/intro/login/login_kakao.png">
        카카오 로그인
      </div> -->
      <div class="w100P" style="display: flex; flex-direction: column; height: 500px;">
        <!-- <naver :callbackFunction='naverCallbackFunction' v-if="!mobileYn" buttonColor="#3E3F6A" :isPopup='false' />
        <div v-else class="loginBtn font20" v-on:click="NaverLoginBtn">
          <img src="../../../assets/images/intro/login/login_naver.png">
          네이버 로그인
        </div> -->
        <div class="loginBtn font20" @click="GoogleLoginBtn">
          <img src="../../../assets/images/intro/login/login_google.png">
          {{ $t('LOG_BTN_GOOGLE') }}
        </div>
        <div v-if="(this.systemName !== 'Android' && this.systemName !== 'android') && mobileYn" class="loginBtn font20" v-on:click="AppleLoginBtn">
          <img src="../../../assets/images/intro/login/login_apple.png">
          {{ $t('LOG_BTN_APPLE') }}
        </div>
        <div v-else-if="!mobileYn" class="loginBtn appleWebLoginBtn">
          <div id="appleid-signin"  class="signin-button appleWebLoginBtn" data-color="black" data-border="true" data-type="sign in">
          </div>
          <div @click="clickAppleLoginInWeb" class="font20 loginAppleWeb">
            <img src="../../../assets/images/intro/login/login_apple.png">
            {{ $t('LOG_BTN_APPLE') }}
          </div>
        </div>
      </div>
      <div v-if="pPartnerLoginYn" class="fl" style="width: 100%; height: 80px; display: flex; margin-top: 50px;align-items: center; justify-content: center;">
        <img style="width: 70px; border-radius: 3px; float: left;" src="../../../assets/images/common//DAlimMainQrCode.jpg">
        <p class="font16 fontBold textLeft mleft-1 fl" style="color: #D6D6E7;">더알림 앱을 휴대폰에 설치하면<br>편하게 실시간으로 알림을 받을 수 있습니다!</p>
      </div>
      <!-- <div @click="this.$router.push('/nonMemInquiryBoard')" class="inquiryBtn cursorP font20" >비회원 문의하기</div>
      <div class="loginBtn font20" style="margin-bottom: 2rem;" v-on:click="openTestLoginPage">
        더알림계정으로 로그인
      </div> -->
  </div>
</template>

<script>
// import naver from '../Tal_naverCompo.vue'
import commonConfirmPop from '../../../components/popup/confirmPop/Tal_commonConfirmPop.vue'
import AuthService from '../../../assets/js/login/Tal.authService'
import { firebaseInitialize } from '../../../assets/js/login/UB.firebase'
import { onMessage } from '../../../assets/js/webviewInterface'

import { saveUser } from '../../../../public/commonAssets/Tal_axiosFunction.js'
import { setUserInfo } from '../../../assets/js/login/Tal_userSetting'

console.log(firebaseInitialize)
const authService = new AuthService(firebaseInitialize)
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: '',
  data () {
    return {
      systemName: 'iOS',
      appCloseYn: false,
      appYn: false,
      mobileYn: this.$getMobileYn()
    }
  },
  props: {
    pPartnerLoginYn: {
      default: false
    },
    pPartnerLoginText: {
      default: ''
    },
    pSetUserItem: Function
  },
  components: {
    commonConfirmPop
    // naver
  },
  created () {
    localStorage.setItem('sessionUser', '')
    localStorage.setItem('user', '')
    if (this.mobileYn === false && (localStorage.getItem('systemName') !== undefined && localStorage.getItem('systemName') !== 'undefined' && localStorage.getItem('systemName') !== null)) {
      this.systemName = localStorage.getItem('systemName')
      localStorage.setItem('appYn', true)
      this.mobileYn = true
    }
    // 애플로 로그인 성공 시.
    document.addEventListener('AppleIDSignInOnSuccess', (data) => {
      // handle successful response
      // console.log('AppleIDSignInOnSuccess')
      this.successAppleLogin(data)
      // todo success logic
    })
    // 애플로 로그인 실패 시.
    // eslint-disable-next-line handle-callback-err
    document.addEventListener('AppleIDSignInOnFailure', (error) => {
      // console.log('AppleIDSignInOnFailure')
    })
  },
  methods: {
    clickAppleLoginInWeb () {
      document.querySelector('#appleid-signin').click()
    },
    async successAppleLogin (data) {
      localStorage.setItem('loginType', 'apple')
      // eslint-disable-next-line no-new-object
      var user = new Object()
      user.email = ''
      user.mobile = ''
      user.name = ''
      user.aToken = data.detail.authorization.id_token
      user.rToken = ''
      var userProfile = await setUserInfo(user)

      /* if (userProfile.mobile === undefined || userProfile.mobile === null || userProfile.mobile === 'null' || userProfile.mobile === '') {
                // localStorage.setItem('tempUserInfo', JSON.stringify(userProfile))
                router.push({ name: 'savePhone', params: { user: JSON.stringify(userProfile) } })
              } else */
      // await saveUser(userProfile, true) // 서버에 save요청
      if (this.pPartnerLoginYn) {
        if (this.pSetUserItem) {
          await this.pSetUserItem(userProfile)
        }
      } else {
        await saveUser(userProfile, true)
      }
      localStorage.setItem('loginYn', true)
      // this.$router.replace({ path: '/' })

      /* if (this.$route.params.boardData && this.$route.params.boardData !== 'social') {
        this.$router.replace({ name: 'boardDetail', query: { boardData: this.$route.params.boardData } })
      } else {
        this.$router.replace({ path: '/' })
      } */
    },
    closeApp () {
      onMessage('closeApp', 'requestUserPermission')
      this.appCloseYn = false
    },
    openTestLoginPage () {
      this.$router.replace('/testLoginPage')
    },
    GoogleLoginBtn () {
      if (this.mobileYn) {
        // onMessage('REQ', 'loginGoogle', {})
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
      alert(true)
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
        // console.log(result)
        if (result.user) {
          // eslint-disable-next-line no-new-object
          var user = new Object()
          user.email = result.user.email
          user.mobile = result.user.phoneNumber
          user.name = result.user.displayName
          user.aToken = result.credential.accessToken
          user.rToken = ''
        }
        var userProfile = await setUserInfo(user)
        if (thisthis.pPartnerLoginYn) {
          if (thisthis.pSetUserItem) {
            await thisthis.pSetUserItem(userProfile)
          }
        } else {
          await saveUser(userProfile, true)
        }
        //

        /* if (this_.$route.params.boardData && this_.$route.params.boardData !== 'social') {
          this_.$router.replace({ name: 'boardDetail', query: { boardData: this.$route.params.boardData } })
        } else {
          this_.$router.replace({ path: '/' })
        } */
        /* localStorage.setItem('loginYn', true)
        thisthis.$router.replace({ path: '/' }) */
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
.loginBtn{width: 100%; cursor: pointer; height: 50px; color: #fff; margin-bottom: 15px; background-color: #3E3F6A; padding: 10px; box-sizing: border-box; border-radius: 10px;}
.loginBtn img {width: 1.5rem; margin-bottom: 5px; margin-right: 20px}
.loginContentsWrap{height: 100vh;background-color: #030170; display: flex; flex-direction: column; padding-top: 10%; }

.inquiryBtn{width: 100%; height: 50px; color: #fff; margin-bottom: 15px; background-color: #acade0; margin-top: 20px; padding: 10px; box-sizing: border-box; border-radius: 10px; }
@media screen and (max-width: 300px) {
  .loginBtn, .inquiryBtn {
    height: 40px;
    padding: 5px;
  }
  .loginBtn img {width: 1rem; margin-bottom: 5px; margin-right: 10px}
}

</style>
