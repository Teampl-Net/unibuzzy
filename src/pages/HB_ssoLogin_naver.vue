<template>
    <div></div>
  </template>
<script>
// eslint-disable no-unused-vars
import { defineComponent } from 'vue'
import { saveUser } from '../../public/commonAssets/Tal_axiosFunction'
export default defineComponent({
  data () {
    return {
      redirectUrl: null,
      mLoadingYn: false,
      aToken: null,
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
    this.aToken = param.code
    this.redirectUrl = localStorage.getItem('redirectUrl')
    this.$axios.post('/sUniB/tp.getUserInfoNaver', { code: param.code }).then((res) => {
      console.log(res)
      console.log(res.name)
      console.log(res.nickname)
      console.log(res.profile_image)
      console.log(res.email)
      console.log(res.id)
      console.log(res.mobile_e164)
      console.log(res.mobile)
      this.saveUser(res.data.response, res.data.accessToken)
    })
    // getUserInfoNaver
  },
  props: {
  },
  methods: {
    saveUser (userProfile, accessToken) {
      const user = {}
      user.soAccessToken = accessToken
      user.soType = 'N'
      user.soEmail = userProfile.email
      user.soName = userProfile.nickname
      user.soPicUrl = userProfile.profile_image
      saveUser(user, true).then((res) => {
        console.log(res)
        if (res) {
          // eslint-disable-next-line no-debugger
          debugger
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
