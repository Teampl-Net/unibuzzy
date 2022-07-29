<template>
  <div class="pagePaddingWrap admLoginContentsWrap">
    <!-- <commonConfirmPop v-if="appCloseYn" @ok="closeApp" @no="this.appCloseYn=false" confirmType="two" confirmText="더알림을 종료하시겠습니까?" /> -->

    <h2 class="fontBold fl" style="color:white; margin-top:60px">더알림 관리자 로그인</h2>

    <div class="py-3 px-4" style="box-sizing: border-box; width: 100%; height: 60px; margin-top: 65px; margin-bottom: 80px;">
      <img src="../../assets/images/intro/login/login_logo1.png" style="width: 200px;" class="" >
    </div>

      <!-- <div @click="this.$router.push('/nonMemInquiryBoard')" class="inquiryBtn font20" >비회원 문의하기</div> -->
      <div class="admLoginBtn font20" style="margin-bottom: 2rem;" v-on:click="openTestLoginPage">
        더알림계정으로 로그인
      </div>

      <!-- <div class="loginBtn font20" v-on:click="KakaoLoginBtn">
        <img src="../../assets/images/intro/login/login_kakao.png">
        카카오 로그인
      </div> -->

      <!-- <div class="admLoginBtn font20" v-on:click="NaverLoginBtn">
        <img src="../../assets/images/intro/login/login_naver.png">
        네이버 로그인
      </div> -->
      <naver  :callbackFunction='naverCallbackFunction' :isPopup='false' />
      <div class="admLoginBtn font20" v-on:click="GoogleLoginBtn">
        <img src="../../assets/images/intro/login/login_google.png">
        Google 로그인
      </div>

      <div id="g_id_onload"
        data-client_id="777053173385-hp7otdoios6a7c0eb924bftbhoeuaat7.apps.googleusercontent.com"
        data-login_uri="http://localhost:8080/"
        data-onsuccess="onSignIn"
        data-callback="onSignIn"
        data-auto_prompt="false">
      </div>
      <div class="g_id_signin"
        data-type="standard"
        data-size="large"
        data-theme="outline"
        data-text="sign_in_with"
        data-shape="rectangular"
        data-logo_alignment="left">
      </div>

      <div v-if="this.systemName === 'iOS' || this.systemName === 'ios'" class="admLoginBtn font20" v-on:click="AppleLoginBtn">
        <img src="../../assets/images/intro/login/login_apple.png">
        Apple 로그인
      </div>
  </div>
</template>

<script>
import naver from '../Tal_naverCompo.vue'
import commonConfirmPop from '../../components/popup/confirmPop/Tal_commonConfirmPop.vue'

import firebase from 'firebase/app'
import 'firebase/auth'

// import { onMessage } from '../../assets/js/webviewInterface'

const firebaseConfig = {
  apiKey: 'AIzaSyCNLjqHR8F9kQKma056lThVIu5v2JsfSAg',
  authDomain: 'thealim-2602c.firebaseapp.com',
  projectId: 'thealim-2602c',
  storageBucket: 'thealim-2602c.appspot.com',
  messagingSenderId: '777053173385',
  appId: '1:777053173385:web:46b92863d81076f61d3858',
  measurementId: 'G-NHD2EKJML0'
}
export default {
  name: '',
  data () {
    return {
      systemName: 'iOS',
      appCloseYn: false
    }
  },
  mounted () {
    firebase.initializeApp(firebaseConfig)
    // window.onload = function () {
    //   google.accounts.id.initialize({
    //     client_id: "345518181069-9s615p3gh64pn97jhssidej4urh8n1p6.apps.googleusercontent.com",
    //     callback: this.handleCredentialResponse
    //   });
    //   google.accounts.id.renderButton(
    //     document.getElementById("googleDvi"),
    //     { theme: "outline", size: "large" }  // customization attributes
    //   );
    //   google.accounts.id.prompt(); // also display the One Tap dialog
    // }
  },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    commonConfirmPop, naver
  },
  created () {
    if (localStorage.getItem('systemName') !== undefined && localStorage.getItem('systemName') !== 'undefined' && localStorage.getItem('systemName') !== null) { this.systemName = localStorage.getItem('systemName') }
  },
  methods: {
    onSignIn (googleUser) {
      console.log(googleUser)
      // Useful data for your client-side scripts:
      var profile = googleUser.getBasicProfile()
      console.log('ID: ' + profile.getId()) // Don't send this directly to your server!
      console.log('Full Name: ' + profile.getName())
      console.log('Given Name: ' + profile.getGivenName())
      console.log('Family Name: ' + profile.getFamilyName())
      console.log('Image URL: ' + profile.getImageUrl())
      console.log('Email: ' + profile.getEmail())

      // The ID token you need to pass to your backend:
      // eslint-disable-next-line camelcase
      var id_token = googleUser.getAuthResponse().id_token
      // eslint-disable-next-line camelcase
      console.log('ID Token: ' + id_token)
    },
    NaverLoginBtn () {
    },
    AppleLoginBtn () {
      // alert('apple')
    },
    async GoogleLoginBtn () {
      console.log('login')
      const provider = new firebase.auth.GoogleAuthProvider()
      provider.setCustomParameters({
        prompt: 'select_account'
      })
      const profile = await firebase.auth().signInWithPopup(provider)
      console.log(profile)
    },

    naverCallbackFunction (log) {
      // alert(true)
      console.log(log)
    },

    handleCredentialResponse (response) {
      console.log('Encoded JWT ID token: ' + response.credential)
    }

  }
}
</script>

<style scoped>
p{margin-bottom: 0;}
.admLoginBtn{width: 100%; height: 50px; color: #fff; margin-bottom: 15px; background-color: #3E3F6A; padding: 10px; box-sizing: border-box; border-radius: 10px; }
.admLoginBtn img {width: 1.5rem; margin-bottom: 5px; margin-right: 20px}
.admLoginContentsWrap{height: 100vh;background-color: #6768A7; display: flex; flex-direction: column; padding-top: 10%; }

.admInquiryBtn{width: 100%; height: 50px; color: #fff; margin-bottom: 15px; background-color: #acade0; margin-top: 20px; padding: 10px; box-sizing: border-box; border-radius: 10px; }
@media screen and (max-width: 300px) {
  .admLoginBtn, .admInquiryBtn {
    height: 40px;
    padding: 5px;
  }
  .admLoginBtn img {width: 1rem; margin-bottom: 5px; margin-right: 10px}
}
</style>
