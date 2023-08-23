<template>
        <transition name="showModal">
            <div v-if="mRecvParams && mRecvParams.loginText && mShowTarget === 'loading'" style="width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #FFFFFF;">
                <img src="../assets/images/common/message_logo.png" class="mbottom-1" style="width: 80px;" alt="">
                <div id="wave" class="mbottom-05 ">
                    <span class="dot">L</span>
                    <span class="dot">O</span>
                    <span class="dot">A</span>
                    <span class="dot">D</span>
                    <span class="dot">I</span>
                    <span class="dot">N</span>
                    <span class="dot">G</span>
                </div>
                <p v-html="mRecvParams.loginText" class="font18 mbottom-5 commonColor fontBold fontBold"></p>
            </div>
            <polCompo @closeXPop="closeXPop" :pGoLoginPage="goLoginPage" :pPartnerLoginYn="true" v-else-if="mRecvParams && mRecvParams.loginText && mShowTarget === 'policies'" />
            <loginCompo @closeXPop="closeXPop" :pPartnerLoginYn="true" :pPartnerLoginText="mRecvParams.loginText" :pSetUserItem="saveUserAndAccess"  v-else-if="mRecvParams && mRecvParams.loginText && mShowTarget === 'login'" @openPop="openPop"/>
            <boardMain @openImgPop="openImgPop" :pOnlyMineYn="true"  ref="boardMainPop" :propData="mPropParams" :chanAlimListTeamKey="mPropParams.targetKey" v-else-if="mPropParams &&  mShowTarget === 'boardMain'" @openPop='openPop' @closeXPop="closeXPop"/>
        </transition>
    <div></div>
</template>
<script>
import boardMain from '@/components/board/D_boardMain.vue'
import loginCompo from '../pages/intro/Tal_login.vue'
import polCompo from '../pages/intro/Tal_policies.vue'
import { coreMethods } from '../../public/commonAssets/D_coreService'
/* eslint-disable camelcase */
// eslint-disable-next-line no-unused-vars
let g_pOpener = null
export default {
  components: {
    loginCompo,
    polCompo,
    boardMain
  },
  created () {
    var callbackPageYn = localStorage.getItem('callbackPageYn')
    if (callbackPageYn && callbackPageYn === 'true') {
      if (localStorage.getItem('coreParam')) this.mRecvParams = JSON.parse(localStorage.getItem('coreParam'))
      this.openDirectBoard()
    } else {
      if (document.referrer.indexOf('officeon') === -1 && document.referrer.indexOf('localhost') === -1 && document.referrer.indexOf('josa1') === -1 && document.referrer.indexOf('alim') === -1) {
        this.$router.push({ name: 'errorPage' })
      }
      window.addEventListener('message', (e) => this.receiveMessage(e, this.setPostMessageToParent), false)
    }
  },
  data () {
    return {
      paramString: '',
      gPOpener: null,
      mShowTarget: 'loading',
      mPropParams: null,
      mRecvParams: {},
      mRecvRequest: null,
      mAxiosYn: false
    }
  },
  methods: {
    goLoginPage () {
      this.mShowTarget = 'login'
    },
    okRequest () {
      if (this.mRecvRequest === 'openBoardMain') {
        this.openDirectBoard()
      }
    },
    async openDirectBoard () {
      if (this.mAxiosYn) return
      this.mAxiosYn = true
      console.log(this.mRecvParams)
      const result = await this.$axios.post('/sUniB/tp.getDirectBoardInfo', this.mRecvParams)
      console.log(result)
      this.mAxiosYn = false
      /* var result = await commonAxiosFunction({
          url: '/sUniB/tp.goDirectBoard',
          param: Object.fromEntries(paramMap)
        }) */
      const resultMainData = result.data.cabinet
      console.log(result)
      if (result.data.team && result.data.team.content && result.data.team.content.length > 0) {
        await this.$store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', result.data.team.content)
      }
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
      if (result && result.data && result.data.result) {
        this.mPropParams = goBoardMainParam
        this.mShowTarget = 'boardMain'
      }
    },
    async successSaveUserAccess (data) {
      console.log(data)
      this.mAxiosYn = false
      if (data.data.result) {
        var returnData = {}
        // debugger
        returnData.partnerToken = data.data.accessUser.partnerToken
        returnData.uAccessToken = data.data.accessUser.uaccessToken
        this.$store.commit('D_USER/MU_USER_ACCESS', returnData)
        console.log(document.referrer)
        if (g_pOpener) {
          g_pOpener.postMessage(JSON.stringify({ resultMsg: 'saveUserInfo', result: true, userInfo: returnData }), document.referrer)
        }

        var loginYn = await this.coreLoginCheck(returnData.uAccessToken, returnData.partnerToken)
        if (loginYn) this.okRequest()
      }
    },
    async saveUserAccess () {
      var setParam = {}
      if (this.mAxiosYn) return
      this.mAxiosYn = true
      var user = this.$store.getters['D_USER/GE_USER']
      this.mRecvParams.userKey = user.userKey
      this.mRecvParams.deviceKey = user.deviceKey
      // this.mRecvParams.memberParamListStr = this.mRecvParams.memberParamListStr
      this.mRecvParams.keepInfo = JSON.stringify(this.mRecvParams.keepInfo)
      setParam.partner = this.mRecvParams
      console.log(this.mRecvParams)
      var result = await this.$axios.post('/sUniB/tp.saveUserAccess', setParam)
      this.mAxiosYn = false
      if (result && result.data && result.data.result) {
        return 'OK'
      }
    },
    /* async saveUserAccess2() {
      var setParam = {}
      if (this.mAxiosYn) return
      this.mAxiosYn = true
      var user = this.$store.getters['D_USER/GE_USER']
      this.mRecvParams.userKey = user.userKey
      this.mRecvParams.deviceKey = user.deviceKey
      // this.mRecvParams.memberParamListStr = this.mRecvParams.memberParamListStr
      this.mRecvParams.keepInfo = JSON.stringify(this.mRecvParams.keepInfo)
      setParam.partner = this.mRecvParams
      console.log(this.mRecvParams)

      dService.saveUserAndAccess(setParam, this.mRecvParams, this.successSaveUserAccess)

      // var result = await this.$axios.post('/sUniB/tp.saveUserAccess', setParam)
    }, */
    async saveUserAndAccess (userProfile) {
      if (this.mAxiosYn) return
      this.mAxiosYn = true
      /* var param = {}
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
      } */
      coreMethods.saveUserAndAccess(userProfile, this.mRecvParams, this.successSaveUserAccess)

      // var result = await this.$axios.post('/sUniB/tp.saveUserAndAccess', setParam)
      // this.mAxiosYn = false
    },
    async receiveMessage (event, callback) {
      console.log(event)
      let resultData = null
      // Do we trust the sender of this message?
      if (event.origin.indexOf('officeon') !== -1 || event.origin.indexOf('localhost') !== -1 || event.origin.indexOf('josa1') !== -1) {
        var returnData = {}
        if (event.data) {
          if (event.data.type === 'webpackWarnings') return
          resultData = event.data
          if (this.isJsonString(event.data)) {
            resultData = JSON.parse(event.data)
          }
          g_pOpener = event.source
          this.mRecvParams = resultData.param
          this.mRecvRequest = resultData.request
          if (this.mRecvParams.uAccessToken && this.mRecvParams.partnerToken) {
            // debugger
            returnData.partnerToken = this.mRecvParams.partnerToken
            returnData.uAccessToken = this.mRecvParams.uAccessToken
            await this.$store.commit('D_USER/MU_USER_ACCESS', returnData)
            callback(event.source, JSON.stringify({ resultMsg: 'saveUserInfo', result: true, userInfo: returnData }))
            console.log(this.$store.getters['D_USER/GE_USER'])
            var loginYn = await this.coreLoginCheck(this.mRecvParams.uAccessToken, this.mRecvParams.partnerToken)
            if (loginYn) {
              await this.saveUserAccess()
              this.okRequest()
            } else {
              if (this.mRecvParams.userName && this.mRecvParams.encPhone && (event.origin.indexOf('localhost') !== -1 || event.origin.indexOf('josa1') !== -1)) {
                await this.saveUserAndUserAccess()
                this.okRequest()
              } else {
                await localStorage.setItem('coreProxyYn', 'true')
                await localStorage.setItem('coreParam', JSON.stringify(this.mRecvParams))
                this.mShowTarget = 'policies'
              }
            }
          } else {
            if (this.mRecvParams.userName && this.mRecvParams.encPhone && (event.origin.indexOf('localhost') !== -1 || event.origin.indexOf('josa1') !== -1)) {
              await this.saveUserAndUserAccess()
              this.okRequest()
            } else {
              await localStorage.setItem('coreProxyYn', 'true')
              await localStorage.setItem('coreParam', JSON.stringify(this.mRecvParams))
              this.mShowTarget = 'policies'
            }
            // this.popParams.targetType = 'login'
          }
        }
        // event.source.postMessage('test', event.origin)
        // event.source.parent.postMessage('test', event.origin)
        callback(event.source, JSON.stringify({ resultMsg: 'setOk', result: true }))
      } else {

      }
    },
    async saveUserAndUserAccess () {
      var setParam = {}
      if (this.mAxiosYn) return
      this.mAxiosYn = true
      if (this.mRecvParams.userName === null || this.mRecvParams.encPhone === null) return
      setParam.partner = this.mRecvParams
      console.log(this.mRecvParams)
      var result = await this.$axios.post('/sUniB/tp.saveUserAccess', setParam)
      this.mAxiosYn = false
      if (result && result.data && result.data.result) {
        console.log(result.data)
        if (result.data.resultMsg === 'OK') {
          if (result.data.accessUser) {
            var returnData = {}
            // debugger
            returnData.partnerToken = result.data.accessUser.partnerToken
            returnData.uAccessToken = result.data.accessUser.uaccessToken
            this.$store.commit('D_USER/MU_USER_ACCESS', returnData)
            console.log(document.referrer)
            if (g_pOpener) {
              g_pOpener.postMessage(JSON.stringify({ resultMsg: 'saveUserInfo', result: true, userInfo: returnData }), document.referrer)
            }
          }

          if (result.data.userMap) {
            try {
              if (localStorage.getItem('user')) {
                var localUser = JSON.parse(localStorage.getItem('user'))
                result.data.userMap.uAccessToken = localUser.uAccessToken
                result.data.userMap.partnerToken = localUser.partnerToken
              }
              localStorage.setItem('user', JSON.stringify(result.data.userMap))
              await this.$store.dispatch('D_USER/AC_USER', result.data.userMap)
              localStorage.setItem('sessionUser', JSON.stringify(result.data.userMap))
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
        /* var loginYn = await this.coreLoginCheck(returnData.uAccessToken, returnData.partnerToken)
        if (loginYn) this.okRequest() */
        return 'OK'
      }
    },
    async coreLoginCheck (uAccessToken, partnerToken) {
      if (this.mAxiosYn) return
      this.mAxiosYn = true
      var paramMap = new Map()
      paramMap.set('uAccessToken', uAccessToken)
      paramMap.set('partnerToken', partnerToken)
      var loginResult = await this.$coreLoginCheck(paramMap)
      this.mAxiosYn = false
      // eslint-disable-next-line no-debugger
      debugger
      console.log(loginResult)
      if (loginResult.data.resultMsg === 'OK') {
        if (loginResult.data.userMap) {
          try {
            if (localStorage.getItem('user')) {
              var localUser = JSON.parse(localStorage.getItem('user'))
              loginResult.data.userMap.uAccessToken = localUser.uAccessToken
              loginResult.data.userMap.partnerToken = localUser.partnerToken
            }
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

<style lang="scss" scoped>
div#wave {
    position:relative;
    text-align:center;
    width:200px;
    height:50px;
    margin-left: auto;
    margin-right: auto;
.dot {
    display:inline-block;
    width:12px;
    height:12px;
    font-weight: bold;
    border-radius:50%;
    margin-right:10px;
    color:#5F61BD;
    animation: wave 2.1s linear infinite;

        &:nth-child(2) {
            animation-delay: -1.9s;
        }

        &:nth-child(3) {
            animation-delay: -1.7s;
        }
        &:nth-child(4) {
            animation-delay: -1.5s;
        }
        &:nth-child(5) {
            animation-delay: -1.3s;
        }
        &:nth-child(6) {
            animation-delay: -1.1s;
        }
        &:nth-child(7) {
            animation-delay: -0.9s;
        }
    }
}

@keyframes wave {
0%, 60%, 100% {
transform: initial;
}

30% {
transform: translateY(-15px);
}
}
</style>
