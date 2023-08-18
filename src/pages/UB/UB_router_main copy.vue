<template>
  <div class="w100P h100P listRefresh" style="overflow:hidden;">
    <div v-if="GE_USER.unknownYn && mUnknownLoginPopYn" style="width:100%; height: 100%; position: absolute;top: 0; left: 0; z-index: 100; background: #00000050;"></div>
    <!-- <unknownLoginPop :pClosePop="closeUnknownLoginPop" style="position: absolute;" v-if="GE_USER.unknownYn && mUnknownLoginPopYn" /> -->
    <commonConfirmPop v-if="mAppUpdatePopShwoYn" @no="goAppStore" confirmType="one" confirmText="버전 업데이트가 필요합니다.<br>앱스토어로 이동합니다." />
    <gConfirmPop :confirmText="mErrorPopBodyStr" confirmType='one' @no='mErrorPopShowYn = false' v-if="mErrorPopShowYn" style="z-index: 9999999999999999999999;"/>
    <gConfirmPop :confirmText="mNetPopBodyStr" confirmType='no' @no='mNetPopShowYn = false' v-if="mNetPopShowYn" style="z-index: 9999999999999;"/>
    <gConfirmPop confirmText="네트워크의 연결이 끊어져<br>실행 할 수 없습니다" confirmType='no' @no='mNetReturnPopShowYn = false'  style="z-index: 999999999999999999999999;" v-if="mNetReturnPopShowYn"/>
    <gUBHeader :class="{ myPageBgColor : mMyPageBgColorYn }" @goLogList="openPop" v-if="mTargetType !== 'chanDetail' && mTargetType !== 'boardMain'" @showMenu="showMenu" ref="UBMainHeaderWrap" class="header_footer " :pRouterHeaderInfo="mRouterHeaderInfo" :style="'height: ' + (this.$STATUS_HEIGHT + 50) + 'px; padding-top: ' + (this.$STATUS_HEIGHT + 10) + 'px;'" style="position: absolute; top: 0; left:-1px; z-index: 9" />
    <chanHeader v-if="mTargetType === 'chanDetail' || mTargetType === 'boardMain'" @openMenu='openChanMenu' :chanAlimListTeamKey="mChanInfo.targetKey" @closeXPop="closeXPop" :headerTitle="mHeaderTitle" :thisPopN="mPopN" :targetType="mTargetType" @openPop="openPop" class="chanDetailPopHeader" />
    <!-- <gPopupWrap v-if="mGPopShowYn" @openPop="openPop" transition="showModal" :style="GE_WINDOW_SIZE"  @closePop="closePop" parentPopN="0" :propParams="mChanInfo" @parentClose='parentClose' /> -->
    <!-- <popHeader v-if="mGPopShowYn" @closeXPop="closeXPop" /> -->
    <gFavList v-if="mGPopShowYn && mTargetType === 'favList'" />
    <gLogList v-if="mGPopShowYn && mTargetType === 'logList'" />
    <div style="background-color:#00000050; width:100%; height:100vh; position:absolute; top:0; left:0; z-index:999;" v-if="mMenuShowYn" @click="hideMenu"></div>
    <transition name="show_left">
      <D_MENU transition="show_left" @hideMenu="hideMenu" @openPop="openPop" @goPage="changeRouterPath" class="D_menuStyle " v-if="mMenuShowYn" />
    </transition>
    <chanMenu :pPopId="mPopId" ref="chanMenuCompo" :propChanAlimListTeamKey="mChanInfo.targetKey" :propData="mChanInfo" @openPop="openPop" v-if='openChanMenuYn' @closePop='openChanMenuYn = false' @openItem='openPage' @openChanMsgPop="closeNopenChanMsg" />
    <div :class="{ myPageBgColor : mMyPageBgColorYn }"  class="" :style="'height: calc(100% - 60px);'" style="overflow: hidden; width:100%;">
      <!-- <gCloudLoading v-if="cloudTransShowYn" style="position: absolute; top: 0; left: 0" /> -->
      <router-view :pCampusTownInfo="mCampusTownInfo" :propParams="mChanInfo" :pPopId="mPopId" :parentPopN="mPopN" :initData="sendInitData" @bgcolor='setBgColor' @openPage="openPage" @goDetail="goDetail" @openUserProfile="openPop" @chanInfo="showCloudLoading" :popYn="false" @changePageHeader="changePageHeader" />
    </div>
    <gFooter @changeRouterPath="changeRouterPath" class="header_footer footerShadow" style="position: absolute; bottom: 0; z-index: 9" />
    <!-- <TalFooter :pChangePageHeader="changePageHeader" v-if="$route.name!== 'contDetail'" :pOpenUnknownLoginPop="openUnknownLoginPop" @changeRouterPath="changeRouterPath" class="header_footer footerShadow" style="position: absolute; bottom: 0; z-index: 9" /> -->
  </div>
</template>
<script>
// import { AES } from 'crypto-js'
import gUBHeader from '../../components/UB/layout/UB_gMainHeader'
import commonConfirmPop from '../../components/popup/confirmPop/Tal_commonConfirmPop.vue'
import D_MENU from '../../components/UB/popup/common/UB_common_menu.vue'
import chanHeader from '../../components/UB/layout/UB_gChanMainHeader.vue'
import chanMenu from '../../components/popup/chanMenu/D_channelMenu.vue'
// import unknownLoginPop from '../../components/pageComponents/channel/D_unknownLoginPop.vue'
export default {
  data () {
    return {
      // mUnknownLoginPopYn: false,
      mMyPageBgColorYn: false,
      mGPopShowYn: false,
      mPopN: {},
      mPopId: null,
      bgblackYn: false,
      mTargetType: '',
      openChanMenuYn: false,
      mFavListShowYn: false,
      sendInitData: null,
      cloudTransShowYn: false,
      mRouterHeaderInfo: '',
      mPopParams: null,
      mChanInfo: null,
      mMenuShowYn: false,
      mNetPopBodyStr: '',
      mErrorPopBodyStr: '',
      mErrorPopShowYn: false,
      mNetReturnPopShowYn: false,
      mCampusTownInfo: {}
    }
  },
  created () {
    if (this.GE_USER.unknownYn) {
      this.goUniBTown()
      return
    }
    if (localStorage.getItem('backBtnShowYn') !== undefined && localStorage.getItem('backBtnShowYn') !== 'undefined') {
      localStorage.setItem('backBtnShowYn', 'false')
    }
    if (localStorage.getItem('backBtnShowYn') !== undefined && localStorage.getItem('backBtnShowYn') !== 'undefined') {
      this.mBackBtnShowYn = JSON.parse(localStorage.getItem('backBtnShowYn'))
    }
    this.$store.commit('D_CHANNEL/MU_CLEAN_CHAN_LIST') // 앱 시작 vuex 초기화
    var urlString = location.search
    var param = this.getParamMap(urlString)
    if (param.fcmKey && param.dcmKey) {
      var checkParam = {}
      checkParam.userKey = Number(param.dcmKey)
      checkParam.fcmKey = param.fcmKey
      console.log('checkParam', checkParam)
    }
    this.getCTeamList()
  },
  methods: {
    async goUniBTown () {
      this.$router.push('/unibuzzy')
    },
    async getCTeamList () {
      const param = {}
      param.teamKey = 824
      param.fUserKey = this.GE_USER.userKey
      param.userKey = this.GE_USER.userKey
      const result = await this.$getViewData({ url: 'https://www.unibuzzy.com/sUniB/tp.getChanMainBoard', param: param }, false)
      if (!result || !result.data || !result.data.result || !result.data.result === 'NG') {
        this.$showToastPop('Cannot find your campus!')
      } else {
        const cTeamList = result.data.cTeamList
        this.mCampusTownInfo.campus = result.data.team.content[0]
        this.mCampusTownInfo.cTeamList = cTeamList
      }
    },
    openChanMenu () {
      this.openChanMenuYn = true
    },
    async settingPop () {
      var target = this.mChanInfo
      this.mTargetType = target.targetType
      if (this.mTargetType === 'askTal') {
        if (target.jobKind === 'QUES') this.mHeaderTitle = '문의하기'
        if (target.jobKind === 'ERRO') this.mHeaderTitle = '오류접수'
      } else if (this.mTargetType === 'changeEmail') {
        this.changInfoType = this.mTargetType
        this.mTargetType = 'changeInfo'
      } else if (this.mTargetType === 'changePhone') {
        this.mHeaderTitle = '실명인증'
      } else if (this.mTargetType === 'editBookList' || this.mTargetType === 'memberManagement') {
        this.helpYn = true
      } else if (this.mTargetType === 'selectBookList') {
        this.selectPlist = target.pSelectedList
      } else if (this.mTargetType === 'writeContents') {
        if (target.attachFileList) {
          this.mAttachFileList = target.attachFileList
        }
        var paramMap = new Map()
        console.log(this.GE_USER.userKey)
        paramMap.set('contentsKey', target.targetKey)
        paramMap.set('jobkindId', target.contentsJobkindId)
        paramMap.set('ownUserKey', this.GE_USER.userKey)
        paramMap.set('subsUserKey', this.GE_USER.userKey)
        paramMap.set('userKey', this.GE_USER.userKey)
        const response = await this.$axios.post('https://www.unibuzzy.com/sUniB/tp.getMyContentsList', Object.fromEntries(paramMap))
        if (response.data && response.data.content) this.mAttachFileList = response.data.content[0].attachFileList
      }
      if (this.parentPopN !== undefined && this.parentPopN !== null && this.parentPopN !== '') {
        this.mPopN = Number(this.parentPopN) + 1
      } else {
        this.mPopN = 100
      }
      if (!this.mPopId) {
        this.mPopId = 'gPopup' + this.mPopN
      }
      try {
        this.$store.dispatch('D_HISTORY/AC_ADD_POP_HISTORY_STACK', this.mPopId)
      } catch (error) {
        console.log(error)
      }
      try {
        this.$store.dispatch('D_HISTORY/AC_ADD_ALL_HISTORY_STACK', this.mPopId)
      } catch (error) {
        console.log(error)
      }
    },
    closeXPop (page) {
      console.log('page', page)
      if (page === 'main') {
        this.mTargetType = 'main'
        this.$router.push('/')
      }
    },
    setBgColor (param) {
      let test = false
      if (param === 1 || param === true) { test = true }
      this.bgblackYn = test
    },
    async goSearchDirect (data) {
      var pageData = await this.$getRouterViewData('search')
      pageData.pSearchList = data
      this.sendInitData = pageData
      console.log({ initData: pageData })
      await this.$router.replace({
        name: 'search'
      })
    },
    async recvNotiFormBridge (notiDetail, currentPage, vuexResultData) {
      try {
        var notiUserDo = JSON.parse(notiDetail.userDo)
        if ((currentPage === 0 || currentPage === undefined)) {
          // eslint-disable-next-line no-new-object
          var goDetailParam = new Object()
          goDetailParam.notiYn = true
          goDetailParam.creTeamKey = Number(notiDetail.creTeamKey)
          if (notiUserDo.targetKind === 'C') {
            goDetailParam.contentsKey = notiUserDo.targetKey
            goDetailParam.targetKey = notiUserDo.targetKey
            goDetailParam.jobkindId = notiDetail.jobkindId
            if (notiUserDo.iSub) {
              goDetailParam.cabinetKey = notiUserDo.iSub
            }

            if (goDetailParam.jobkindId === 'ALIM') {
              goDetailParam.chanName = vuexResultData.nameMtext
              goDetailParam.nameMtext = vuexResultData.nameMtext
            } else if (goDetailParam.jobkindId === 'BOAR') {
              goDetailParam.cabinetNameMtext = vuexResultData.cabinetNameMtext
              goDetailParam.cabinetKey = vuexResultData.cabinetKey
            }
            this.goDetail(goDetailParam)
          } if (notiUserDo.targetKind === 'R') {
            goDetailParam.contentsKey = notiUserDo.targetKey
            goDetailParam.targetKey = notiUserDo.targetKey
            goDetailParam.jobkindId = notiDetail.jobkindId
            if (goDetailParam.jobkindId === 'ALIM') {
              goDetailParam.chanName = vuexResultData.nameMtext
              goDetailParam.nameMtext = vuexResultData.nameMtext
            } else if (goDetailParam.jobkindId === 'BOAR') {
              goDetailParam.cabinetNameMtext = vuexResultData.cabinetNameMtext
              goDetailParam.cabinetKey = vuexResultData.cabinetKey
            }
            this.goDetail(goDetailParam)
          } else if (notiUserDo.targetKind === 'T' || notiUserDo.targetKind === 'M' || notiUserDo.targetKind === 'N') {
            this.$router.replace({ path: '/' })
            goDetailParam.chanYn = true
            goDetailParam.targetKey = notiUserDo.targetKey
            this.goChanDetail(goDetailParam)
          }
          // goDetailParam.value = vuexResultData
        } else {
          this.$refs.mainGPopWrap.recvNotiFromMain(notiDetail, currentPage, vuexResultData)
        }
      } catch (err) {
        console.error('메세지를 파싱할수 없음 ' + err)
      }
    },
    async goDetail (detailValue) {
      if (detailValue.chanYn) {
        this.goChanDetail(detailValue)
      } else {
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
        console.log(detailValue)
        var detailParam = {}
        detailParam.targetType = 'contentsDetail'
        detailParam.targetKey = detailValue.targetKey
        if (!detailParam.targetKey) detailParam.targetKey = detailValue.contentsKey
        detailParam.memoScrollYn = detailValue.memoScrollYn

        var axiosParam = {}
        axiosParam.targetKey = detailValue.targetKey
        axiosParam.contentsKey = detailValue.targetKey
        axiosParam.teamKey = detailValue.teamKey || detailValue.creTeamKey
        axiosParam.jobkindId = detailParam.jobkindId
        if (axiosParam.jobkindId) {
          axiosParam.userKey = this.GE_USER.userKey
          axiosParam.ownUserKey = this.GE_USER.userKey
          axiosParam.creTeamKey = detailParam.teamKey
          axiosParam.cabinetKey = detailParam.cabinetKey
        }

        var result = await this.$getContentDetailData(axiosParam, false)
        console.log(result)
        if (!result) return
        if (!detailParam.jobkindId) {
          detailParam.jobkindId = result.content.jobkindId
          detailParam.teamKey = result.content.creTeamKey
          detailParam.popHeaderText = result.content.nameMtext
          if (detailParam.jobkindId === 'BOAR') {
            detailParam.cabinetKey = result.content.cabinetKey
            detailParam.cabinetNameMtext = this.$changeText(result.content.cabinetNameMtext)
            if (result.content.cabinetNameMtext) detailParam.popHeaderText = result.content.cabinetNameMtext
          } else {
            detailParam.nameMtext = this.$changeText(detailValue.nameMtext)
            detailParam.teamName = this.$changeText(detailValue.nameMtext)
            if (result.content.nameMtext) detailParam.popHeaderText = result.content.nameMtext
          }
        }
        detailParam.initData = result
        detailParam.notiYn = true

        // this.mPopParams = detailParam
      }
    },
    getParamMap (urlString) {
      // eslint-disable-next-line no-debugger
      debugger
      const splited = urlString.replace('?', '').split(/[=?&]/)
      const param = {}
      console.log(splited)
      for (let i = 0; i < splited.length; i++) {
        param[splited[i]] = splited[++i]
      }
      return param
    },
    async showCloudLoading (clickedInfo) {
      this.cloudTransShowYn = true
      await new Promise((resolve) => setTimeout(resolve, 2000))
      if (clickedInfo) {
        this.mChanInfo = clickedInfo
        // await this.moveChan()
      }
      this.cloudTransShowYn = false
    },
    async goChanDetail (detailValue) {
      // eslint-disable-next-line no-debugger
      debugger
      const chanMainParam = {}
      chanMainParam.targetType = 'chanDetail'
      let teamKey = detailValue.targetKey
      if (!teamKey && detailValue.creTeamKey) {
        teamKey = detailValue.creTeamKey
      }
      chanMainParam.teamKey = teamKey
      chanMainParam.targetKey = teamKey
      if (detailValue && detailValue.nameMtext) chanMainParam.nameMtext = detailValue.nameMtext
      chanMainParam.chanName = detailValue.nameMtext
      if (detailValue.contentsKey) {
        chanMainParam.jobkindId = detailValue.jobkindId
        chanMainParam.targetContentsKey = detailValue.contentsKey
      }
      // 세션에서 유저키 받아오기
      if (detailValue.creUserKey === this.GE_USER.userKey) {
        chanMainParam.ownerYn = true
      }
      const paramMap = new Map()
      paramMap.set('teamKey', detailValue.targetKey)
      paramMap.set('fUserKey', this.GE_USER.userKey)
      paramMap.set('userKey', this.GE_USER.userKey)
      // eslint-disable-next-line no-debugger
      debugger
      try {
        const result = await this.$getViewData({ url: 'https://www.unibuzzy.com/sUniB/tp.getChanMainBoard', param: Object.fromEntries(paramMap) }, false)
        if (!result || !result.data || !result.data.result || !result.data.result === 'NG') {
          this.$showToastPop('채널을 찾을 수 없습니다!')
          return
        }
        const teamDetail = result.data.team.content[0]
        await this.$addChanVuex([teamDetail])
        var initData = {}
        initData.team = teamDetail
        if (result.data.contentsListPage && result.data.contentsListPage.content && result.data.contentsListPage.content.length > 0) {
          this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', result.data.contentsListPage.content)
        }
        initData.contentsList = result.data.contentsListPage
      } catch (error) {
        this.$showToastPop('죄송합니다! 관리자에게 문의해주세요!')
        console.error(error)
      }
      chanMainParam.initData = initData
      this.mChanInfo = chanMainParam
      this.mChanMainTeamKey = detailValue.teamKey
      this.mTargetType = 'chanDetail'
      // this.$router.push({ name: 'chanMain', params: { pTeamKey: this.mChanMainTeamKey } })
      // const encryptedTeamKey = AES.encrypt(teamKey, 'encryptionSecret').toString()
      // const encodedTeamKey = encodeURIComponent(encryptedTeamKey)
      const encodedTeamKey = teamKey
      this.$router.push(`/chan/${encodedTeamKey}`)
    },
    async openPop (params) {
      console.log('paramsparamsparamsparamsparamsparams', params)
      this.mTargetType = params.targetType
      this.mPopParams = params
      this.mGPopShowYn = true
      this.hideMenu()
    },
    // goFavList () {
    //   this.$router.push({ name: 'favList' })
    // },
    goLogList () {
    //   // this.openPage(param)
    //   this.mRouterHeaderInfo = param.popHeaderText
      this.$router.push({ name: 'logList' })
    },
    changePageHeader (title) {
      this.mRouterHeaderInfo = title
    },
    hideMenu () {
      this.$removeHistoryStack()
      this.openChanMenuYn = false
      this.mMenuShowYn = false
    },
    showMenu () {
      this.$addHistoryStack('mainPage')
      this.$addHistoryStack('mainMenu')
      this.mMenuShowYn = true
      this.$showHistoryStack()
    },
    closePop (reloadYn) {
      var history = this.$store.getters['D_HISTORY/hStack']
      var removePage = history[history.length - 1]
      history = history.filter((element, index) => index < history.length - 1)
      this.$store.commit('D_HISTORY/setRemovePage', removePage)
      this.$store.commit('D_HISTORY/updateStack', history)
      this.$store.dispatch('D_HISTORY/AC_REMOVE_POP_HISTORY_STACK')
      this.mGPopShowYn = false
    },
    async openPage (params) {
      if (params.targetType === 'chanDetail') {
        this.goChanDetail(params)
        return
      } else if (params.targetType === 'favList') {
        this.goFavList(params)
        return
      } else if (params.targetType === 'logList') {
        this.goLogList(params)
      } else if (params.targetType === 'myPage') {
        this.goMyPage(params)
      } else if (params.targetType === 'boardMain') {
        this.mChanInfo = params
        this.mTargetType = 'boardMain'
        this.$router.push(`/board/${params.teamKey}/${params.targetKey}`)
      } else if (params.targetType === 'writeContents') {
        this.openPop(params)
      }
      this.hideMenu()
    },
    async changeRouterPath (page) {
      this.mMenuShowYn = false
      if (page === 'myPage') {
        this.mMyPageBgColorYn = true
      } else {
        this.mMyPageBgColorYn = false
      }
      if (page !== 'chanList') {
        var pageData = await this.$getRouterViewData(page)
      }
      this.sendInitData = pageData
      if (this.$router.currentRoute._rawValue.path === '/' && page === 'main') {
        const unit = this.$refs.routerViewCompo
        if (unit.$el) {
          unit.$el.scrollTo({ top: 0, behavior: 'smooth' })
        }
      }
      // this.$router.push({ path: page, params: { initData: pageData } })
      this.$router.replace({
        name: page
      })
    },
    changeNetStatePop () {
      if (this.mNetReturnPopShowYn === true) return
      this.mNetReturnPopShowYn = true
      var this_ = this
      setTimeout(() => {
        this_.mNetReturnPopShowYn = false
      }, 2000)
    },
    parentClose () {
      this.$refs.routerViewCompo.refreshAll()
    },
    goAppStore () {
      this.mAppUpdatePopShwoYn = false
      if (this.systemName === 'android' || this.systemName === 'Android') {
        window.open('https://play.google.com/store/apps/details?id=com.tal_project', '_blank')
      } else {
        window.open('https://itunes.apple.com/app/id1620854215', '_blank')
      }
    }
  },
  beforeCreate () {
    if (!this.isMobile) {
      if ('serviceWorker' in navigator && 'SyncManager' in window) {
        const channel = new BroadcastChannel('new-server-post')
        // service worker가 보낸 message 수신
        channel.addEventListener('message', event => {
          const response = event.data
          var message = response.noti.data
          console.log('onMessage: ', message)
          this.$recvNotiFromBridge(null, null, message)
        })
      }
    }
  },
  mounted () {
    this.$showChanCommonPop(false)
    if (
      localStorage.getItem('systemName') !== undefined &&
    localStorage.getItem('systemName') !== 'undefined' &&
    localStorage.getItem('systemName') !== null
    ) {
      this.systemName = localStorage.getItem('systemName')
    }
    var appInfo = localStorage.getItem('appInfo')
    if (appInfo) {
      appInfo = JSON.parse(appInfo)
    }

    if (this.systemName && (this.systemName === 'android' || this.systemName === 'Android' || this.systemName === 'ios' || this.systemName === 'iOS')) {
      if (appInfo.current !== appInfo.last) {
        this.mAppUpdatePopShwoYn = true
      }
    }
  },
  computed: {
    BACK_BTN_SHOWYN () {
      if (localStorage.getItem('backBtnShowYn') === 'undefined' || localStorage.getItem('backBtnShowYn') === undefined) return false
      return JSON.parse(localStorage.getItem('backBtnShowYn'))
    },
    GE_NET_STATE () {
      return this.$store.getters['D_USER/GE_NET_STATE']
    },
    GE_WINDOW_SIZE () {
      return {
        '--windowWidth': window.innerWidth + 'px'
      }
    },
    GE_GPOP_STACK () {
      return this.$store.getters['D_HISTORY/GE_GPOP_STACK']
    },
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    },
    GE_NEW_NOTI () {
      return this.$store.getters['D_NOTI/GE_NEW_NOTI']
    },
    historyStack () {
      return this.$store.getters['D_HISTORY/hStack']
    },
    pageUpdate () {
      return this.$store.getters['D_HISTORY/hUpdate']
    }
  },
  watch: {
    pageUpdate (value, old) {
      var history = this.historyStack
      history = history[history.length - 1]
      if (history === 'mainMenu') {
        this.hideMenu()
      }
    },
    GE_NEW_NOTI: {
      handler (value, old) {
        if (value) {
          var notiDetailObj = value.notiDetailObj
          var currentPage = value.currentPage
          var addVueResult = value.addVueResult
          this.recvNotiFormBridge(notiDetailObj, currentPage, addVueResult)
        }
      },
      deep: true
    },
    GE_NET_STATE: {
      handler (value, old) {
        var this_ = this
        if (old === false && value) {
          this.mNetPopBodyStr = '네트워크가 연결되었습니다!<br>'
          this.mShadowScreenShowYn = false
          this.mNetPopShowYn = true
          setTimeout(() => {
            this_.mNetPopShowYn = false
          }, 2000)
        } else if (old && value === false) {
          this.mShadowScreenShowYn = true
          this.mNetPopBodyStr = '네트워크 연결이 끊어졌습니다.<br> 잠시후 다시시도 해주세요'
          this.mNetPopShowYn = true
          setTimeout(() => {
            this_.mNetPopShowYn = false
          }, 2000)
        }
      },
      deep: true
    }
  },
  beforeUnmount () {
    this.$checkDeleteHistory(this.mPopId)
  },
  components: {
    // unknownLoginPop,
    gUBHeader,
    commonConfirmPop,
    D_MENU,
    chanHeader,
    chanMenu
  }
}
</script>
<style scoped>
.page {
  position: absolute;
  top: 30px;
}
.D_menuStyle {
  height: 100vh;
  top: 0;
  position: absolute;
  padding: 0 1rem;
  box-sizing: border-box;
  width: 65%;
  max-width: 400px;
  /* background-color: #6768a7; */
  background-color: white;
  color: #5F61BD;
  z-index: 1000;
  left: 0;
}
.myPageBgColor {background-color: #9FDDEE;}

</style>
