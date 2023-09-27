<i18n>
  {
    "ko": {
      "LOG_BTN_GOOGLE": "구글 로그인",
      "LOG_BTN_APPLE": "애플 로그인",
      "LOG_BTN_NO_LOGIN": "그냥 둘러보기",
      "LOG_BTN_UNIB": "uniBuzzy 로그인"
    },
    "en": {
      "LOG_BTN_GOOGLE": "Google Sign In",
      "LOG_BTN_APPLE": "Apple Sign In",
      "LOG_BTN_NO_LOGIN": "Just Look Around",
      "LOG_BTN_UNIB": "uniBuzzy Sign In"
    }
  }
  </i18n>
<template>
  <div class="loginContentsWrap">
    <div v-if="GE_USER.unknownYn" class="videoArea">
      <div v-show="showStartBtnYn" class="fade-in fontBold textLeft loginTitle">
        <p class="w100P fl textCenter font18">Everything for campus life, </p>
        <p class="w100P fl fontBold textCenter font50">uniBuzzy</p>
      </div>
    </div>
    <gConfirmPop v-if="appCloseYn" @ok="closeApp" @no="this.appCloseYn=false" confirmType="two" confirmText="Are you sure to quit uniBuzzy?" />
    <transition name="showUp" class="duration">
      <div class="py-3 px-4 uniBLogo" v-show="showStartBtnYn">
        <img src="../../../assets/images/intro/login/uniB_logo.png" class="" >
      </div>
    </transition>
    <transition name="showUp" class="duration">
      <div class="loginArea" v-show="showStartBtnYn">
        <div class="loginBtn font20" @click="GoogleLoginBtn">
          <img src="../../../assets/images/intro/login/login_google.png">
          {{ $t('LOG_BTN_GOOGLE') }}
        </div>
        <div v-if="(this.systemName !== 'Android' && this.systemName !== 'android') && mobileYn" class="loginBtn font20" v-on:click="AppleLoginBtn">
          <img src="../../../assets/images/intro/login/login_apple.png">
          {{ $t('LOG_BTN_APPLE') }}
        </div>
        <div v-else-if="!mobileYn" class="loginBtn appleWebLoginBtn">
          <div id="appleid-signin"  class="signin-button appleWebLoginBtn" data-color="black" data-border="true" data-type="sign-in">
          </div>
          <div @click="clickAppleLoginInWeb" class="font20 loginAppleWeb">
            <img src="../../../assets/images/intro/login/login_apple.png">
            {{ $t('LOG_BTN_APPLE') }}
          </div>
        </div>
        <div class="loginBtn font20 mbottom-2" v-on:click="openTestLoginPage">
          {{ $t('LOG_BTN_UNIB') }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import AuthService from '../../../assets/js/login/UB.authService'
import { firebaseInitialize } from '../../../assets/js/login/UB.firebase'
import { onMessage } from '../../../assets/js/webviewInterface'
import { saveUser } from '../../../../public/commonAssets/Tal_axiosFunction.js'
import { setUserInfo } from '../../../assets/js/login/UB_userSetting'

const authService = new AuthService(firebaseInitialize)
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: '',
  data () {
    return {
      systemName: 'iOS',
      appCloseYn: false,
      appYn: false,
      mobileYn: this.$getMobileYn(),
      showStartBtnYn: false
    }
  },
  mounted () {
    setTimeout(() => {
      this.showStartBtnYn = true
    }, 500)
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
  computed: {
    GE_USER () {
      return this.$store.getters['UB_USER/GE_USER']
    }
  },
  created () {
    localStorage.setItem('sessionUser', '')
    localStorage.setItem('user', '')
    if (localStorage.getItem('systemName') !== undefined && localStorage.getItem('systemName') !== 'undefined' && localStorage.getItem('systemName') !== null) {
      this.systemName = localStorage.getItem('systemName')
      localStorage.setItem('appYn', true)
      this.mobileYn = true
    } else {
      this.mobileYn = false
    }
    if (this.mobileYn === false && (localStorage.getItem('systemName') !== undefined && localStorage.getItem('systemName') !== 'undefined' && localStorage.getItem('systemName') !== null)) {
      this.systemName = localStorage.getItem('systemName')
      localStorage.setItem('appYn', true)
    }
    // 애플로 로그인 성공 시.
    document.addEventListener('AppleIDSignInOnSuccess', (data) => {
      // handle successful response
      this.successAppleLogin(data)
      // todo success logic
    })
    // 애플로 로그인 실패 시.
    // eslint-disable-next-line handle-callback-err
    document.addEventListener('AppleIDSignInOnFailure', (error) => {
    })
  },
  methods: {
    clickAppleLoginInWeb () {
      if (this.mobileYn || window.ReactNativeWebView) {
        this.AppleLoginBtn()
      } else {
        // eslint-disable-next-line no-undef
        AppleID.auth.init({
          clientId: 'com.uniBuzzy.login',
          scope: 'name email',
          redirectURI: 'https://unibuzzy.com',
          // eslint-disable-next-line no-tabs
          state: 'signin',	// csrf, php의 openssl_random_pseudo_bytes
          // eslint-disable-next-line no-tabs
          usePopup: true	// or false defaults to false
        })
        document.querySelector('#appleid-signin').click()
      }
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

      if (this.pPartnerLoginYn) {
        if (this.pSetUserItem) {
          await this.pSetUserItem(userProfile)
        }
      } else {
        await saveUser(userProfile, true)
      }
      localStorage.setItem('loginYn', true)
    },
    closeApp () {
      onMessage('closeApp', 'requestUserPermission')
      this.appCloseYn = false
    },
    openTestLoginPage () {
      this.$router.replace('/testLoginPage')
    },
    GoogleLoginBtn () {
      if (this.mobileYn || window.ReactNativeWebView) {
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
        if (result.user) {
          var user = {}
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
}
</script>

<style scoped>
.videoArea {
  position: fixed;
  width: 100%;
  height: 100%;
  overflow:hidden;
  background: #D6D6E7;
}
.loginTitle {
  width: 90%;
  position: absolute;
  text-shadow: 2px 2px 3px white;
  top: 20%;
  left: 5%;
}
.duration {
  animation-duration: 2s;
}
p {
  margin-bottom: 0;
}
.loginBtn {
  width: 100%;
  font-weight: bold;
  position: relative;
  cursor: pointer;
  height: 50px;
  margin-bottom: 15px;
  background-color: #f1f1f1;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 10px;
}
.loginBtn img {
  width: 1.5rem;
  margin-bottom: 5px;
  margin-right: 10px;
  filter: brightness(0%);
}
.loginContentsWrap {
  height: 100vh;
  background: #f1f1f1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.uniBLogo {
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  position: absolute;
  top: calc(35%);
  margin-bottom: 80px;
}
.uniBLogo > img {
  width: 40%;
}
.loginArea {
  width: 80%;
  position: absolute;
  left: 10%;
  bottom: 20%;
  display: flex;
  flex-direction: column;
  height: fit-content;
}
.partnerWrap {
  width: 100%;
  height: 80px;
  display: flex;
  margin-top: 50px;
  align-items: center;
  justify-content: center;
}
.partnerWrap > img {
  width: 70px;
  border-radius: 3px;
  float: left;
}
.partnerWrap > p {
  color: #D6D6E7;
}
@media screen and (max-width: 300px) {
  .loginBtn, .inquiryBtn {
    height: 40px;
    padding: 5px;
  }
  .loginBtn img {
    width: 1rem;
    margin-bottom: 5px;
    margin-right: 10px
  }
}

</style>
