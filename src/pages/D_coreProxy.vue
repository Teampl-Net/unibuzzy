<template>
        <transition name="showModal">
            <loginCompo @closeXPop="closeXPop" :pPartnerLoginYn="true" :pPartnerLoginText="mPropParams.loginText" :pSetUserItem="saveUserAndAccess" :pCorePartnerYn="true" v-if="mShowTarget === 'login'" @openPop="openPop"/>
            <boardMain @openImgPop="openImgPop" :pOnlyMineYn="true"  ref="boardMainPop" :propData="mPropParams" :chanAlimListTeamKey="mPropParams.targetKey" v-else-if=" mShowTarget === 'boardMain'" @openPop='openPop' @closeXPop="closeXPop"/>
        </transition>
    <div></div>
</template>
<script>
import boardMain from '@/components/board/D_boardMain.vue'
import loginCompo from '../pages/intro/Tal_login.vue'
/* eslint-disable camelcase */
// eslint-disable-next-line no-unused-vars
let g_pOpener = null
export default {
  components: {
    loginCompo,
    boardMain
  },
  created () {
    if (document.referrer.indexOf('officeon') === -1 && document.referrer.indexOf('localhost') === -1) {
      this.$router.push({ name: 'errorPage' })
    }
    // alert('test')
    window.addEventListener('message', (e) => this.receiveMessage(e, this.setPostMessageToParent), false)
  },
  data () {
    return {
      paramString: '',
      gPOpener: null,
      mShowTarget: null,
      mPropParams: null,
      mRecvParams: {},
      mRecvRequest: null
    }
  },
  methods: {
    okRequest () {
      if (this.mRecvRequest === 'openBoardMain') {
        this.openDirectBoard()
      }
    },
    async openDirectBoard () {
      const paramMap = new Map(Object.entries(this.mRecvParams))
      const result = await this.$axios.post('service/tp.getDirectBoardInfo', Object.fromEntries(paramMap))
      /* var result = await commonAxiosFunction({
          url: 'service/tp.goDirectBoard',
          param: Object.fromEntries(paramMap)
        }) */
      const resultMainData = result.data.cabinet
      console.log(result)
      if (resultMainData.contentsListPage) {
        var contentList = resultMainData.contentsListPage.content
        for (let i = 0; i < contentList.length; i++) {
          contentList[i].shareItem = resultMainData.cabinet.mShareItemList
        }
        this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', contentList)
      }
      await this.$addChanList(result.data.cabinet.cabinet.creTeamKey)
      var goBoardMainParam = {}
      goBoardMainParam.initData = resultMainData
      goBoardMainParam.targetType = 'boardMain'
      goBoardMainParam.teamKey = result.data.cabinet.cabinet.creTeamKey
      goBoardMainParam.targetKey = result.data.cabinet.cabinet.cabinetKey
      goBoardMainParam.cabinetNameMtext = result.data.cabinet.cabinet.cabinetNameMtext
      /* localStorage.setItem('BOAR_DIRECT_DATA', JSON.stringify('')) */
      if (result.data.result) {
        this.mPropParams = goBoardMainParam
        this.mShowTarget = 'boardMain'
      }
    },
    async saveUserAccess () {
      var setParam = {}
      var user = this.$store.getters['D_USER/GE_USER']
      this.mRecvParams.userKey = user.userKey
      this.mRecvParams.deviceKey = user.deviceKey
      setParam.partner = this.mRecvParams
      setParam.partner.memberParamListStr = JSON.stringify(setParam.partner.memberParamListStr)
      setParam.partner.keepInfo = JSON.stringify(setParam.partner.keepInfo)
      console.log(this.mRecvParams)
      var result = await this.$axios.post('service/tp.saveUserAccess', setParam)
      if (result.data.result) {
        return 'OK'
      }
    },
    async saveUserAndAccess (userProfile) {
      var param = {}
      param.soType = userProfile.soType
      if (userProfile.email !== undefined && userProfile.email !== null && userProfile.email !== '') { param.soEmail = userProfile.email }
      if (userProfile.name !== undefined && userProfile.name !== null && userProfile.name !== '') {
        param.soName = userProfile.name
      }
      if (userProfile.userImg !== undefined && userProfile.userImg !== null && userProfile.userImg !== '') {
        param.soPicUrl = userProfile.userImg
        param.picMfilekey = userProfile.userImg
      }
      param.mobileYn = userProfile.mobileYn
      param.soAccessToken = userProfile.aToken
      var deviceInfo = userProfile.deviceInfo
      if (deviceInfo) {
        param.fcmKey = deviceInfo.fcmKey
        param.osName = deviceInfo.systemName
        param.osVersion = deviceInfo.systemVersion
        param.deviceId = deviceInfo.uniqueId + ''
        param.deviceModel = deviceInfo.model
        param.deviceBrand = deviceInfo.brand
        param.isTablet = deviceInfo.isTablet
        param.countryCode = deviceInfo.contry
        param.areaName = deviceInfo.timeZome
      } else {
        var isMobile = /Mobi/i.test(window.navigator.userAgent)
        if (!isMobile && localStorage.getItem('fcmKey') != null) {
          param.fcmKey = localStorage.getItem('fcmKey')
        }
      }
      var setParam = {}
      setParam.user = param
      setParam.partner = this.mRecvParams
      setParam.partner.memberParamListStr = JSON.stringify(setParam.partner.memberParamListStr)
      setParam.partner.keepInfo = JSON.stringify(setParam.partner.keepInfo)
      var result = await this.$axios.post('service/tp.saveUserAndAccess', setParam)
      console.log(result)
      if (result.data.result) {
        var returnData = {}
        // debugger
        returnData.partnerToken = result.data.accessUser.partnerToken
        returnData.uAccessToken = result.data.accessUser.uaccessToken
        console.log(document.referrer)
        g_pOpener.postMessage(JSON.stringify({ resultMsg: 'saveUserInfo', result: true, userInfo: returnData }), document.referrer)
        var loginYn = await this.coreLoginCheck(returnData.uAccessToken, returnData.partnerToken)
        if (loginYn) this.okRequest()
      }
    },
    async receiveMessage (event, callback) {
      console.log(event)
      let resultData = null
      // Do we trust the sender of this message?
      if (event.origin.indexOf('officeon') !== -1) {
        if (event.data) {
          resultData = event.data
          if (this.isJsonString(event.data)) {
            resultData = JSON.parse(event.data)
          }
          this.mRecvParams = resultData.param
          this.mRecvRequest = resultData.request
          console.log(resultData)
          if (this.mRecvParams.uAccessToken && this.mRecvParams.partnerToken) {
            var loginYn = await this.coreLoginCheck(this.mRecvParams.uAccessToken, this.mRecvParams.partnerToken)
            if (loginYn) {
              this.saveUserAccess()
              this.okRequest()
            } else this.mShowTarget = 'login'
          } else {
            // this.popParams.targetType = 'login'
            this.mShowTarget = 'login'
          }
        }
        // event.source.postMessage('test', event.origin)
        // event.source.parent.postMessage('test', event.origin)
        callback(event.source, JSON.stringify({ resultMsg: 'setOk', result: true }))
      } else {

      }
    },
    async coreLoginCheck (uAccessToken, partnerToken) {
      var paramMap = new Map()
      paramMap.set('uAccessToken', uAccessToken)
      paramMap.set('partnerToken', partnerToken)
      var loginResult = await this.$coreLoginCheck(paramMap)
      // eslint-disable-next-line no-debugger
      debugger
      console.log(loginResult)
      if (loginResult.data.resultMsg === 'OK') {
        if (loginResult.data.userMap) {
          try {
            localStorage.setItem('user', JSON.stringify(loginResult.data.userMap))
            await this.$store.dispatch('D_USER/AC_USER', loginResult.data.userMap)
            localStorage.setItem('sessionUser', JSON.stringify(loginResult.data.userMap))
          } catch (error) {
            console.log(error)
          }
        }
      } else {
        if (this.$store !== undefined && this.$store !== null) {
          this.$store.commit('D_USER/MU_CLEAN_USER')
        }
        localStorage.setItem('sessionUser', '')
        localStorage.setItem('user', '')
      }
      return loginResult.data.resultMsg
    },
    setPostMessageToParent (pOpener, data) {
      if (pOpener) {
        // this.gPOpener = pOpener
        g_pOpener = pOpener
        pOpener.postMessage(data, document.referrer)
      }
    },
    isJsonString (str) {
      try {
        JSON.parse(str)
      } catch (e) {
        return false
      }
      return true
    }
  },
  watch: {
    paramString (val) {
      console.log(val)
    }
  }
}
</script>
<style scoped>

</style>
