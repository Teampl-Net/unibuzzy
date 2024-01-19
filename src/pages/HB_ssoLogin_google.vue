<template>
    <div></div>
  </template>
<script>
// eslint-disable no-unused-vars
import { saveUser } from '../../public/commonAssets/Tal_axiosFunction'
import { defineComponent } from 'vue'
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
    this.redirectUrl = localStorage.getItem('redirectUrl')
    console.log(param)
    this.aToken = param.code
    this.$axios.post('/sUniB/sso/tp.getUserInfoGoogle', { code: param.code }).then((res) => {
      console.log(res)
      this.saveUser(res.data, res.data.accessToken)
    })
    // getUserInfoNaver
  },
  props: {
  },
  methods: {
    saveUser (userProfile, accessToken) {
      const user = {}
      user.soAccessToken = accessToken
      user.soType = 'G'
      user.soEmail = userProfile.email
      user.soName = userProfile.name
      user.soPicUrl = userProfile.picture
      saveUser(user, true).then((res) => {
        console.log(res)
        if (res) {
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
