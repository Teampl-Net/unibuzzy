<i18n>
  {
    "ko": {
      "LOG_BTN_GOOGLE": "Google 로그인",
      "LOG_BTN_NAVER": "Naver 로그인",
      "LOG_BTN_APPLE": "Apple 로그인",
      "LOG_BTN_NO_LOGIN": "그냥 둘러보기",
    },
    "en": {
      "LOG_BTN_GOOGLE": "Google Sign In",
      "LOG_BTN_NAVER": "Naver Sign In",
      "LOG_BTN_APPLE": "Apple Sign In",
      "LOG_BTN_NO_LOGIN": "Just Look Around",
      "LOG_BTN_UNIB": "Hybric Sign In"
    }
  }
  </i18n>
<template>
  <div class="pagePaddingWrap loginContentsWrap">
    <commonConfirmPop v-if="appCloseYn" @ok="closeApp" @no="this.appCloseYn=false" confirmType="two" confirmText="하이브릭을 종료하시겠습니까?" />
    <div v-if="!pPartnerLoginYn" class="py-3 px-4" style="box-sizing: border-box; display:flex; justify-content: center; align-items: center; width: 100%; height: 60px; margin-top: 125px; margin-bottom: 80px;">
      <p class=" headerFont  fontBold  fl " style="font-size: 70px; color: #879dc9" v-html="mDispTitle? mDispTitle : $t('COMMON_NAME_APP')"></p>
    </div>
    <div v-else class="py-3 px-4" style="box-sizing: border-box; width: 100%; min-height: 50px; margin-top: 125px; ">
      <!-- <img  src="@/assets/images/main/login_Wlogo.png" style="width: 50px;" class="fl" > -->
      <img src="@/assets/images/intro/login/login_logo1.png" style="width: 200px;" class="" >
      <p class="textCenter fl fontBold font16 " v-html="pPartnerLoginText" style="width: calc(100%); margin-top: 10px; margin-bottom: 10px; color: #D6D6E7;"></p>
    </div>
      <div class="loginBtn font20" v-on:click="loginWithKakao">
        <img src="@/assets/images/intro/login/login_kakao.png">
        카카오 로그인
      </div>
      <div id="naver_id_login" class="loginBtn naverIdLogin_loginButton font20" >
        <a :href="naverLoginURL"><img src="@/assets/images/intro/login/login_naver.png">
        네이버 로그인</a>
      </div>
      <!-- <div v-else class="loginBtn font20" v-on:click="NaverLoginBtn">
        <img src="@/assets/images/intro/login/login_naver.png">
        {{$t('LOG_BTN_NAVER')}}
      </div> -->
      <div class="loginBtn font20" @click="GoogleLoginBtn">
        <img src="@/assets/images/intro/login/login_google.png">
        {{$t('LOG_BTN_GOOGLE')}}
      </div>
      <div v-if="(this.systemName !== 'Android' && this.systemName !== 'android') && mobileYn" class="loginBtn font20" v-on:click="AppleLoginBtn">
        <img src="@/assets/images/intro/login/login_apple.png">
        {{$t('LOG_BTN_APPLE')}}
      </div>
      <div v-else-if="!mobileYn" style="position: relative;" class="loginBtn appleWebLoginBtn">
        <div id="appleid-signin"  class="signin-button appleWebLoginBtn" data-color="black" data-border="true" data-type="sign in">
        </div>
        <div @click="clickAppleLoginInWeb" class="font20 loginAppleWeb">
          <img src="@/assets/images/intro/login/login_apple.png">
          {{ $t('LOG_BTN_APPLE') }}
        </div>
      </div>
      <div v-if="pPartnerLoginYn" class="fl" style="width: 100%; height: 80px; display: flex; margin-top: 50px;align-items: center; justify-content: center;">
        <img style="width: 70px; border-radius: 3px; float: left;" src="@/assets/images/common//DAlimMainQrCode.jpg">
        <p class="font16 fontBold textLeft mleft-1 fl" style="color: #D6D6E7;">하이브릭 앱을 휴대폰에 설치하면<br>편하게 실시간으로 알림을 받을 수 있습니다!</p>
      </div>
      <div @click="this.$router.push('/nonMemInquiryBoard')" class="inquiryBtn cursorP font20" >비회원 문의하기</div>
      <div class="loginBtn font20" style="margin-bottom: 2rem;" v-on:click="openTestLoginPage">
        하이브릭계정으로 로그인
      </div>
  </div>
</template>

<script>
import commonConfirmPop from '@/components/popup/confirmPop/Tal_commonConfirmPop.vue'
import AuthService from '@/assets/js/login/Tal.authService'
import { firebaseInitialize } from '@/assets/js/login/Tal.firebase'
import { onMessage } from '@/assets/js/webviewInterface'

import { saveUser } from '../../public/commonAssets/Tal_axiosFunction.js'
import { setUserInfo } from '@/assets/js/login/Tal_userSetting'

import { googleSdkLoaded } from 'vue3-google-login'
// eslint-disable-next-line no-unused-vars
const authService = new AuthService(firebaseInitialize)
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: '',
  data () {
    return {
      redirectUrl: null,
      systemName: 'iOS',
      appCloseYn: false,
      appYn: false,
      mobileYn: this.$getMobileYn(),
      naverLoginURL: 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=IUSyLNfGmOkZCGg55awj&redirect_uri=http://192.168.0.78:8080/loginCallBack/naver&state=123'
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
  },
  created () {
    const splited = (location.search).replace('?', '').split(/[=?&]/)
    const param = {}
    for (let i = 0; i < splited.length; i++) {
      param[splited[i]] = splited[++i]
    }
    if (param.redirect) {
      this.redirectUrl = param.redirect
      localStorage.setItem('redirectUrl', this.redirectUrl)
      localStorage.setItem('appInfo', decodeURI(param.appInfo))
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
      if (window.ReactNativeWebView) {
        this.onLogin()
        // window.ReactNativeWebView.postMessage(
        //   JSON.stringify({
        //     type: 'REQ',
        //     callFunc: 'loginGoogle'
        //   })
        // )
      } else {
        this.onLogin()
      }
    },
    kakaoLogin () {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          type: 'REQ',
          callFunc: 'loginKakao'
        })
      )
    },
    loginWithKakao () {
      window.Kakao.init('1a8058b4a7c97f32bbc70a3508fd9f48')
      window.Kakao.Auth.login({
        scope: 'profile_image, account_email',
        redirectUri: 'http://192.168.0.78:8080/loginCallBack/kakao',
        success: this.getKakaoAccount
      })
    },
    async getKakaoAccount () {
      window.Kakao.API.request({
        url: '/v2/user/me',
        success: async (res) => {
          const kakaoAccount = res.kakao_account
          const ninkname = kakaoAccount.profile.ninkname
          const email = kakaoAccount.email
          console.log(kakaoAccount)
          console.log('ninkname', ninkname)
          console.log('email', email)
          // const user = await setGoogleUser(res)
          // const saveUser :any = await saveCoreUser(user)
          // if (window.ReactNativeWebView) {
          //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //   // @ts-ignore
          //   // eslint-disable-next-line no-undef
          //   webviewBridge.onMessage('loginResult', null, { result: true, data: saveUser.data })
          // } else if (g_pOpener) {
          //   g_pOpener.postMessage(JSON.stringify({ resultMsg: 'loginResult', result: true, data: saveUser.data }), '*')
          // }
          // 로그인처리구현

          alert('로그인 성공!')
        },
        fail: (error) => {
          console.log(error)
        }
      })
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
    loginWithKakao2 () {
      const params = {
        redirectUri: 'http://192.168.0.78:8080/loginCallBack/kakao'
        /* redirectUri: 'http://192.168.0.6:8080/login/auth/kakao' */
      }
      window.Kakao.Auth.authorize(params)
    },
    async sendCodeToBackend (code) {
      try {
        const response = await this.$axios.post(
          '/fb.token',
          {
            code: code,
            client_id:
              '308909007086-4m3q8p5i4up071cq23rup9apfqhmffi5.apps.googleusercontent.com',
            client_secret: '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',
            redirect_uri: 'http://localhost:8080/loginCallBack/google',
            grant_type: 'authorization_code'
          }
        )

        const accessToken = response.data.access_token
        console.log(accessToken)

        // Fetch user details using the access token
        const userResponse = await this.$axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        )

        if (userResponse && userResponse.data) {
          // Set the userDetails data property to the userResponse object
          this.userDetails = userResponse.data
        } else {
          // Handle the case where userResponse or userResponse.data is undefined
          console.error('Failed to fetch user details.')
        }
      } catch (error) {
        console.error('Token exchange failed:', error.response.data)
      }
    },
    onLogin () {
      googleSdkLoaded(google => {
        google.accounts.oauth2
          .initCodeClient({
            client_id:
              '308909007086-4m3q8p5i4up071cq23rup9apfqhmffi5.apps.googleusercontent.com',
            client_secret: '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',
            scope: 'email profile openid',
            redirect_uri: 'http://localhost:8080/loginCallBack/google',
            isPopup: false,
            ux_mode: 'redirect',
            callback: response => {
              console.log(response)
              if (response.code) {
              }
            }
          })
          .requestCode()
      })

      // var thisthis = this
      // localStorage.setItem('loginType', 'google')
      // authService.login('Google').then(async function (result) {
      //   // console.log(result)
      //   if (result.user) {
      //     // eslint-disable-next-line no-new-object
      //     var user = new Object()
      //     user.email = result.user.email
      //     user.mobile = result.user.phoneNumber
      //     user.name = result.user.displayName
      //     user.aToken = result.credential.accessToken
      //     user.rToken = ''
      //   }
      //   var userProfile = await setUserInfo(user)
      //   if (thisthis.pPartnerLoginYn) {
      //     if (thisthis.pSetUserItem) {
      //       await thisthis.pSetUserItem(userProfile)
      //     }
      //   } else {
      //     await saveUser(userProfile, true)
      //   }
      //   //

      //   /* if (this_.$route.params.boardData && this_.$route.params.boardData !== 'social') {
      //     this_.$router.replace({ name: 'boardDetail', query: { boardData: this.$route.params.boardData } })
      //   } else {
      //     this_.$router.replace({ path: '/' })
      //   } */
      //   /* localStorage.setItem('loginYn', true)
      //   thisthis.$router.replace({ path: '/' }) */
      // })
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
.loginBtn{width: 100%; font-weight: bold; cursor: pointer; height: 50px; color: #fff; margin-bottom: 15px; background-color:  #879dc9; padding: 10px; box-sizing: border-box; border-radius: 10px; }
.loginBtn img {width: 1.5rem; margin-bottom: 5px; margin-right: 20px}
.loginContentsWrap{height: 100vh; /* background-image: linear-gradient(#ecf8ff 70%, rgb(74 102 158) ); */ background-color: #ecf8ff; display: flex; flex-direction: column; padding-top: 10%; }

.inquiryBtn{width: 100%; height: 50px; color: #fff; margin-bottom: 15px; background-color: rgb(209 225 242); margin-top: 20px; padding: 10px; box-sizing: border-box; border-radius: 10px; }
@media screen and (max-width: 300px) {
  .loginBtn, .inquiryBtn {
    height: 40px;
    padding: 5px;
  }
  .loginBtn img {width: 1rem; margin-bottom: 5px; margin-right: 10px}
}
.naverIdLogin_loginButton > a {
    width: 100%;
    height: 50px;
    color: #fff;
    margin-bottom: 15px;
    text-decoration-line: none;
    background-color: #011551 !;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 10px;
}

</style>
