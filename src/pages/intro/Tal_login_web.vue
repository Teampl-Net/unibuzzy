
<template>
  <div class="pagePaddingWrap loginContentsWrap">
    <commonConfirmPop v-if="appCloseYn" @ok="closeApp" @no="this.appCloseYn=false" confirmType="two" confirmText="하이브릭을 종료하시겠습니까?" />
    <div class="py-3 px-4" style="box-sizing: border-box; width: 100%; height: 60px; margin-top: 125px; margin-bottom: 80px;">
      <img src="../../assets/images/intro/login/login_logo1.png" style="width: 200px;" class="" >
    </div>
      <div class="loginBtn" style="margin-bottom: 2rem;" v-on:click="openTestLoginPage">
        하이브릭계정으로 로그인
      </div>
      <!-- <div class="loginBtn" v-on:click="KakaoLoginBtn">
        <img src="../../assets/images/intro/login/login_kakao.png">
        카카오 로그인
      </div> -->
      <div id="naver_id_login" class="loginBtn" >
        <a :href="naverLoginURL"><img src="../../assets/images/intro/login/login_naver.png">
        네이버 로그인</a>
      </div>
      <!-- <GoogleLogin class="big-button" -->
      <div class="loginBtn" v-on:click="signWithGoogle">
        <img src="../../assets/images/intro/login/login_google.png">
        Google 로그인
      </div>
      <div v-if="this.systemName !== 'Android' && this.systemName !== 'android'" class="loginBtn" v-on:click="AppleLoginBtn">
        <img src="../../assets/images/intro/login/login_apple.png">
        Apple 로그인
      </div>

  </div>
</template>

<script>
/* eslint-disable no-undef */
import commonConfirmPop from '../../components/popup/confirmPop/Tal_commonConfirmPop.vue'

/* const firebaseConfig = {
  apiKey: 'AIzaSyCNLjqHR8F9kQKma056lThVIu5v2JsfSAg',
  authDomain: 'thealim-2602c.firebaseapp.com',
  projectId: 'thealim-2602c',
  storageBucket: 'thealim-2602c.appspot.com',
  messagingSenderId: '777053173385',
  appId: '1:777053173385:web:0de7347501346c761d3858',
  measurementId: 'G-0BYBFKL8TS'
} */
export default {
  name: '',
  data () {
    return {
      systemName: 'iOS',
      appCloseYn: false,
      CLIENTIDforNAVER: 'BbUrvFqJkUbcMb6ISALy',
      redirectURIforNAVER: 'http://192.168.0.22:19090/login',
      //  FIXME state 값 random string 으로 변경
      stateforNAVER: 123,
      naverLoginURL: 'https://nid.naver.com/oauth2.0/authorize?response_type=code'

    }
  },
  components: {
    commonConfirmPop
  },
  created () {
    if (localStorage.getItem('systemName') !== undefined && localStorage.getItem('systemName') !== 'undefined' && localStorage.getItem('systemName') !== null) { this.systemName = localStorage.getItem('systemName') }
    /* firebase.initializeApp(firebaseConfig) */
    this.naverLoginURL += '&client_id=' + this.CLIENTIDforNAVER
    this.naverLoginURL += '&redirect_uri=' + this.redirectURIforNAVER
    this.naverLoginURL += '&state=' + this.stateforNAVER
  },
  methods: {
    naverLoginBtn () {
      // eslint-disable-next-line camelcase
      var client_id = 'BbUrvFqJkUbcMb6ISALy'
      var callbackUrl = 'http://192.168.0.22:19090/login'// 서버 주소
      // eslint-disable-next-line camelcase
      var url = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' + client_id + '&redirect_uri=' + callbackUrl + '&state=1234'
      window.location.replace(url)
    },
    async signWithGoogle () {
      // console.log('login')
      firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
    },
    async loginWithGoogle () {
      var auth = firebase.auth()
      const provider = new firebase.auth.GoogleAuthProvider()
      // firebase.auth().languageCode = "korean";
      try {
        // eslint-disable-next-line no-unused-vars
        await auth.signInWithPopup(provider)
      } finally {
      }
    },
    signInSucceed (result) {
      if (result.credential) {
        /* googleAccountToken = result.credential.accessToken;
        user = result.user */
      }
    },
    signOut () {
      this.$firebase.auth().signOut()
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
