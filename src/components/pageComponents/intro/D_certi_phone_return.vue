<template>
  <div>
    <span>
      인증 성공!
    </span>
  </div>
</template>

<script>

export default {
  name: 'ChildWinPop',
  computed: {
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    }
  },
  mounted () {
    if (opener) {
      alert('opener is valid!!!')
      // opener에 g_winPopup 변수로 this를 넣어줌에 따라 WinPop.vue에서 이 소스의 객체를 직접 접근할 수 있게 된다
      // WinPop.vue에서 g_winPopup 변수 활용을 확인할것
      opener.g_winPopup = this
    }

    const query = window.location.search
    if (query == null || query === '') {
      let nativeUrl = window.location.href
      nativeUrl = nativeUrl.replace('/#', '')

      const url = new URL(nativeUrl)
      const urlParams = url.searchParams
      /*  alert(urlParams.get('imp_uid'))
      alert(urlParams.get('success'))
      alert(urlParams.get('request_id')) */
      this.imp_uid = urlParams.get('imp_uid')
      this.success = urlParams.get('success')
      this.request_id = urlParams.get('request_id')
    } else {
      const param = new URLSearchParams(query)
      if (param != null) {
        this.imp_uid = param.get('imp_uid')
        this.success = param.get('success')
        this.request_id = param.get('request_id')
      } else {
        alert('cannot get query!!')
      }
    }

    this.getCertiInfo()
  },
  methods: {
    async getCertiInfo () {
      try {
      // 인증 토큰 발급 받기
        var paramMap = new Map()
        paramMap.set('imp_key', '6177573148818220')
        paramMap.set('imp_uid', this.imp_uid)
        paramMap.set('imp_secret', 'wTNFKJQlzH6slVXAQbbUQ92zEtEojkbbeJ9yqznuSDfcz3jzSJZE2ImNO6tZeS1AqclulDxikkYNaAq9')
        const getToken = await this.$commonAxiosFunction({
          url: 'https://mo.d-alim.com:9443/service/tp.getUserCertiInfo',
          param: Object.fromEntries(paramMap)
        })
        console.log(getToken)
        // eslint-disable-next-line camelcase

        // console.log(JSON.parse(access_token))
        // alert(certificationsInfo.name)
        if (getToken.data.result) {
          this.certiInfo = JSON.parse(getToken.data.certiInfo) // 인증 토큰
          this.savePhone()
        }
      } catch (e) {
        console.error(e)
      }
    },
    async savePhone () {
      if (this.certiInfo.inName !== this.certiInfo.name) {
        this.$showToastPop('휴대폰명의자가 일치하지 않습니다.')
      }
      // KO$^$수망고$#$EN$^$sumango
      var param = {}
      var user = {}
      user.userKey = this.GE_USER.userKey
      user.phoneEnc = this.certiInfo.inPhone
      user.userNameMtext = this.certiInfo.inName
      user.certiYn = true
      param.user = user
      param.updateYn = true
      var testYn = true
      console.log(param)
      if (testYn) return
      var result = await this.$changeDispName(param)
      // console.log(result)
      if (result.data) {
        this.$store.commit('D_USER/MU_USER', result.data.userInfo)
        localStorage.setItem('sessionUser', JSON.stringify(result.data))
        localStorage.setItem('sessionUser', JSON.stringify(result.data))
        /* this.$router.replace({ path: '/' })
        this.$emit('closeXPop') */
        this.$showToastPop('인증에 성공하였습니다!')
        this.closeXPop()
        // this.userInfo.userDispMtext =  this.$changeText(param.user.userDispMtext)
        // this.userInfo.userDispMtext = await this.$changeText(param.user.userDispMtext)
      } else {

      }
    }

  },
  data () {
    return {
      // 부모로 부터 수신되는 메세지
      message: '',

      // URI를 통해 get 방식으로 받은 파라미터1과 파라미터2
      request_id: null,
      success: null,
      imp_uid: null,
      certiInfo: {}
    }
  }

}
</script>

<style scoped>

</style>
