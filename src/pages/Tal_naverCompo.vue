<template>
  <div class="admLoginBtn loginBtn" style="padding: 0;" id="naverIdLogin">
  </div>
</template>
<script>
const defaultErrorMessage = '현재 네이버 로그인 서비스를 이용할 수 없습니다. 잠시 후 다시 시도해주세요.'
export default {
  name: 'NaverLogin',
  props: {
    clientId: {
      type: String,
      required: true,
      default: 'BbUrvFqJkUbcMb6ISALy'// 더알림 공식
      // default: 'jR5bRjvCeurlPVOkCKEg'

    },
    callbackUrl: {
      required: true,
      default: 'https://mo.d-alim.com/#/naverCallback'
    },
    callbackFunction: {
      required: true
    },
    isPopup: {
      type: Boolean,
      default: false
    },
    buttonColor: {
      type: String,
      default: 'green'
    },
    buttonType: {
      type: Number,
      default: 2
    },
    buttonHeight: {
      type: Number,
      default: 60
    },
    scriptUrl: {
      type: String,
      default: 'https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js'
    },
    errorMessage: {
      default: defaultErrorMessage
    }

  },
  computed: {

  },
  mounted () {
    this.naverLogin.init()
    if (document.querySelectorAll('#naverIdLogin_loginButton img').length > 0) {
      document.querySelectorAll('#naverIdLogin_loginButton img')[0].src = '/resource/common/pcNaverLoginIcon.png'
    }
  },
  methods: {
    logOut () {
      this.naverLogin.logout()
      location.reload()
    },
    handleError: (err) => {
      console.warn(`This component threw an error (in '${err.target.outerHTML}'):`, this)
    }
  },
  data () {
    return {
      isLoggedIn: false,
      // eslint-disable-next-line no-undef
      naverLogin: new naver.LoginWithNaverId({
        clientId: this.clientId,
        callbackUrl: this.callbackUrl,
        isPopup: this.isPopup,
        loginButton: { color: this.buttonColor, type: this.buttonType, height: this.buttonHeight },
        callbackHandle: true
      })
    }
  },
  unmounted () {
    // window.removeEventListener('load')
  }
}
</script>
<style scoped>
.naverIdLogin_loginButton {
    width: 100%;
    height: 50px;
    color: #fff;
    margin-bottom: 15px;
    background-color: #3E3F6A !;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 10px;
}

.loginBtn{width: 100%; height: 50px; color: #fff; margin-bottom: 15px; background-color: #3E3F6A; padding: 10px; box-sizing: border-box; border-radius: 10px; }

</style>
