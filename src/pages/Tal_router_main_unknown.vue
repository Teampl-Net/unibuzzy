<template>
  <div class="w-100P h-100P mainBackgroundColor listRefresh" style="overflow:hidden"  > <!-- v-if="notiDetailShowYn" -->
    <commonConfirmPop v-if="mAppUpdatePopShwoYn" @no="goAppStore" confirmType="one" confirmText="버전 업데이트가 필요합니다.<br>앱스토어로 이동합니다." />
    <gImgPop @closeXPop="closeXPop" v-if="mGImgPopShowYn" :propImgList="mPropImgList" :propFirstIndex="mPropFirstIndex" />
    <!-- <pushPop @closePushPop="closePushPop" @goDetail="goDetail" v-if="notiDetailShowYn" :detailVal="notiDetail"  /> -->
    <div style="background-color:#00000050; width:100%; height:100vh; position:absolute; top:0; left:0; z-index:999;" v-if="mMenuShowYn" @click="hideMenu"/>
    <transition name="show_view">
      <TalMenu transition="show_view" @hideMenu="hideMenu" @openPop="openPop" @goPage="changeRouterPath" class="TalmenuStyle " v-if="mMenuShowYn" />
    </transition>
    <gConfirmPop :confirmText="mErrorPopBodyStr" confirmType='one' @no='mErrorPopShowYn = false' v-if="mErrorPopShowYn" style="z-index: 9999999999999999999999;"/>
    <gConfirmPop :confirmText="mNetPopBodyStr" confirmType='no' @no='mNetPopShowYn = false' v-if="mNetPopShowYn" style="z-index: 9999999999999;"/>
    <gConfirmPop confirmText="네트워크의 연결이 끊어져<br>실행 할 수 없습니다" confirmType='no' @no='mNetReturnPopShowYn = false'  style="z-index: 999999999999999999999999;" v-if="mNetReturnPopShowYn"/>
    <div v-if="mShadowScreenShowYn" @click="changeNetStatePop" style="width:100%; height: 100%; position: fixed; top: 0; left: 0; z-index: 99999999999999;"></div>
    <fullModal @openPop="openPop" @openImgPop="openImgPop" @successWrite="successWriteBoard" ref="mainGPopWrap" @reloadPop ="reloadPop" transition="showModal" :style="GE_WINDOW_SIZE"  @closePop="closePop" v-if="mGPopShowYn" parentPopN="0" :propParams="mPopParams" @closeNewPop='closeNewPop' @parentClose='parentClose' />
    <TalHeader @click="test" @showMenu="showMenu" ref="mainHeaderWrap" class="header_footer " :mRouterHeaderText="this.mRouterHeaderText" :style="'height: ' + (this.$STATUS_HEIGHT + 50) + 'px; padding-top: ' + (this.$STATUS_HEIGHT + 10) + 'px;'" style="position: absolute; top: 0; left:-1px; z-index: 9"/>
    <div :class="{ myPageBgColor : this.mRouterHeaderText === '마이페이지' }"  class="" :style="'height: calc(100% - ' + (this.$STATUS_HEIGHT + 20)+ 'px)'" style="overflow: hidden; width:100%;">
        <router-view @openImgPop="openImgPop" ref="routerViewCompo"  :initData="sendInitData" @goSearchDirect="goSearchDirect" @scrollEvnt="this.scrollEvnt" :popYn="false" class="" style="margin-bottom: 100px" @openPop="openPop" @changePageHeader="changePageHeader" @goDetail="goDetail" @openUserProfile="openPop" />
    </div>
    <TalFooter v-if="$route.name!== 'contDetail'" @changeRouterPath="changeRouterPath" class="header_footer footerShadow" style="position: absolute; bottom: 0; z-index: 9" />
    <!-- <div v-if="!mBackBtnShowYn" @click="this.$gobackDev()" style="width: 60px; height: 60px; border-radius: 100%; background-color: #879dc9; position: fixed; bottom: 90px; left: 20px; z-index: 999999; display: flex; justify-content:center; align-items: center; border: 3px solid #FFF; box-shadow: rgb(0 0 0 / 22%) 0px 0px 9px 4px;"><p class="font16 fontBold" style="color: #FFF;">back</p></div> -->
  </div>
</template>

<script>
/* import pushPop from '../components/popup/push/Tal_pushDetailPopup.vue' */
import TalMenu from '../components/popup/common/Tal_menu.vue'
import commonConfirmPop from '../components/popup/confirmPop/Tal_commonConfirmPop.vue'
export default {
  data () {
    return {
      mGPopShowYn: false,
      mMenuShowYn: false,
      mPopParams: null,
      mRouterHeaderText: '',
      mNetPopShowYn: false,
      mNetPopBodyStr: '',
      mShadowScreenShowYn: false,
      mNetReturnPopShowYn: false,
      mErrorPopBodyStr: '',
      mErrorPopShowYn: false,
      mBackBtnShowYn: JSON.parse(localStorage.getItem('backBtnShowYn')),
      devMode: false,
      sendInitData: null,
      mGImgPopShowYn: false,
      mPropImgList: [],
      mPropFirstIndex: 0,
      mAppUpdatePopShwoYn: false,
      systemName: null,
      popList: [],
      isMobile: /Mobi/i.test(window.navigator.userAgent)
    }
  },
  props: {},
  name: 'mainRouter',
  components: {
    TalMenu,
    commonConfirmPop
    /* pushPop */
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
        // const oldPost = this.posts.filter(p => p.id === response.oldId)[0]
        // id를 server로 부터 받은 id로 바꿈
        // this.$set(this.posts, this.posts.indexOf(oldPost), response.newData)
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
    if (appInfo) {
      if (this.systemName && (this.systemName === 'android' || this.systemName === 'Android' || this.systemName === 'ios' || this.systemName === 'iOS')) {
        if (appInfo.current !== appInfo.last) {
          this.mAppUpdatePopShwoYn = true
        }
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
        '--widndowWidth': window.innerWidth + 'px'
      }
    },
    GE_GPOP_STACK () {
      return this.$store.getters['D_HISTORY/GE_GPOP_STACK']
    },
    GE_DEEP_LINK_QUEUE () {
      return this.$store.getters['D_HISTORY/deepLinkQueue']
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
    },
    async GE_DEEP_LINK_QUEUE (value, old) {
      if (value.length > 0) {
        var target = value[value.length - 1]
        if (!target) return
        if (!target.targetKind || !(target.targetKind === 'chanDetail' || target.targetKind === 'contentsDetail')) return

        var param = {}
        param.targetType = target.targetKind
        param.targetKey = Number(target.targetKey)
        if (target.targetKind === 'chanDetail') {
          this.goChanDetail(param)
        } else {
          this.goDetail(param)
        }
        this.$store.commit('D_HISTORY/changeDeepLinkQueue', [])
      }
    }
  },
  methods: {
    goAppStore () {
      this.mAppUpdatePopShwoYn = false
      if (this.systemName === 'android' || this.systemName === 'Android') {
        window.open('https://play.google.com/store/apps/details?id=com.tal_project', '_blank')
      } else {
        window.open('https://itunes.apple.com/app/id1620854215', '_blank')
      }
    },
    closeXPop () {
      this.mGImgPopShowYn = false
    },
    openImgPop (param) {
      console.log(param)
      if (param) {
        this.mPropFirstIndex = param[1]
        this.mPropImgList = param[0]
        this.mGImgPopShowYn = true
      }
    },
    parentClose () {
      this.$refs.routerViewCompo.refreshAll()
    },
    scrollEvnt (top) {
      if (top > 0) {
        // .push('footerShadow')
      }
    },
    closeNewPop (params) {
      this.closePop()
      setTimeout(() => {
        this.openPop(params)
      }, 200)
    },
    changeNetStatePop () {
      if (this.mNetReturnPopShowYn === true) return
      this.mNetReturnPopShowYn = true
      var this_ = this
      setTimeout(() => {
        this_.mNetReturnPopShowYn = false
      }, 2000)
    },
    async goSearchDirect (data) {
      var pageData = await this.$getRouterViewData('search')
      pageData.pSearchList = data
      this.sendInitData = pageData
      console.log({ initData: pageData })
      // this.$router.push({ path: page, params: { initData: pageData } })
      await this.$router.replace({
        name: 'search'
        // params: { initData: pageData }
        /* query: { initData: pageData } */

      })
      /* var this_ = this
      this.$refs.routerViewCompo.$nextTick(() => {
        console.log(this_.$refs.routerViewCompo)

        // eslint-disable-next-line no-debugger
        debugger
        this_.$refs.routerViewCompo.$el.findData('test')
      }) */
    },
    async changeRouterPath (page) {
      this.mMenuShowYn = false
      // eslint-disable-next-line no-debugger
      debugger
      if (page.indexOf('unknown') === -1) {
        var pageData = await this.$getRouterViewData(page)
        console.log(page)
        this.sendInitData = pageData
      }
      if (this.$router.currentRoute._rawValue.path === '/' && page === 'main') {
        const unit = this.$refs.routerViewCompo
        if (unit.$el) {
          unit.$el.scrollTo({ top: 0, behavior: 'smooth' })
        }
      }

      console.log({ initData: pageData })
      // this.$router.push({ path: page, params: { initData: pageData } })
      this.$router.replace({
        name: page
        // params: { initData: pageData }
        /* query: { initData: pageData } */

      })

      // this.$refs.routerViewCompo.scrollTo({ top: 0 })

      /* if (pageData) {
      } else {
        await this.$router.push({ name: page })
      } */
    },
    /* closePushPop () {
      this.notiDetailShowYn = false
    }, */
    showMenu () {
      this.$addHistoryStack('mainPage')
      this.$addHistoryStack('mainMenu')
      this.mMenuShowYn = true
      this.$showHistoryStack()
    },
    hideMenu () {
      this.$removeHistoryStack()
      this.mMenuShowYn = false
    },
    async openPop (params) {
      console.log(params)
      if (params.targetType === 'chanDetail') {
        this.goChanDetail(params)
        return
      } else if (params.targetType === 'contentsDetail') {
        this.goDetail(params)
        return
      } else if (params.targetType === 'chanList') {
        this.goChannelListPop(params)
        return
      } else if (params.targetType === 'pushList') {
        this.goPushListPop(params)
        return
      }
      this.mPopParams = params
      this.mGPopShowYn = true
      // this.popList.push(params)
      this.hideMenu()
    },
    async goPushListPop (params) {
      console.log(params)

      var pushListParam = {}
      pushListParam.allYn = true
      pushListParam.ownUserKey = this.GE_USER.userKey
      pushListParam.DESCYn = true
      pushListParam.pageSize = 10
      pushListParam.offsetInt = 0

      var initData = await this.$getOpenPushListPopData(pushListParam)
      console.log(initData)
      var openPopParams = {}
      openPopParams = params
      openPopParams.initData = initData

      this.mPopParams = openPopParams
      this.mGPopShowYn = true
    },
    async goChannelListPop (params) {
      var channelListDataParam = {}
      channelListDataParam.channelTabType = params.channelTabType
      channelListDataParam.targetType = params.targetType
      var result = await this.$getOpenChannelListPopData(params.targetType)
      console.log(result)
      if (!result) return
      channelListDataParam.initData = result
      channelListDataParam.popHeaderText = params.popHeaderText

      this.mPopParams = channelListDataParam
      this.mGPopShowYn = true
    },
    async successWriteBoard (inParam) {
      this.$router.go(0)
      this.openPop(inParam)
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
    changePageHeader (title) {
      this.mRouterHeaderText = title
    },
    goPage (page) {
      this.mMenuShowYn = false
      this.$router.replace({ path: '/' + page })
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
        // axiosParam = detailParam
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

        this.mPopParams = detailParam
        // this.popList.push(detailParam)
        this.mGPopShowYn = true
        // // param.targetType = value.contentsKey
        // if (detailValue.jobkindId === 'BOAR') {
        //   detailParam.cabinetKey = detailValue.cabinetKey
        //   detailParam.cabinetNameMtext = detailValue.cabinetNameMtext
        //   detailParam.popHeaderText = detailValue.cabinetNameMtext
        // } else {
        //   detailParam.nameMtext = detailValue.nameMtext
        //   detailParam.teamName = detailValue.nameMtext
        //   detailParam.popHeaderText = detailValue.nameMtext
        // }
        // if (detailParam.popHeaderText === undefined) detailParam.popHeaderText = detailValue.popHeaderText
        // detailParam.contentsKey = detailValue.contentsKey
        // detailParam.jobkindId = detailValue.jobkindId
        // detailParam.teamKey = detailValue.creTeamKey
        // detailParam.notiYn = true
        // detailParam.value = detailValue

        // this.openPop(detailParam)
      }
    },
    async goChanDetail (detailValue) {
      var goChanDetailParam = {}
      goChanDetailParam.targetType = 'chanDetail'
      console.log(detailValue)
      var teamKey = detailValue.targetKey
      if (!teamKey && detailValue.creTeamKey) {
        teamKey = detailValue.creTeamKey
      }
      /* if (teamKey === 377) {
        if (this.$checkMobile() === 'IOS') {
          this.$showToastPop('죄송합니다! 현재 하이브릭 채널을 정비하고 있습니다!!')
          return
        }
      } */
      goChanDetailParam.teamKey = teamKey
      goChanDetailParam.targetKey = teamKey
      goChanDetailParam.nameMtext = detailValue.nameMtext
      goChanDetailParam.chanName = detailValue.nameMtext
      if (detailValue.contentsKey) {
        goChanDetailParam.jobkindId = detailValue.jobkindId
        goChanDetailParam.targetContentsKey = detailValue.contentsKey
      }
      // 세션에서 유저키 받아오기
      if (detailValue.creUserKey === this.GE_USER.userKey) {
        goChanDetailParam.ownerYn = true
      }

      console.log(detailValue)
      var paramMap = new Map()
      paramMap.set('teamKey', detailValue.targetKey)
      paramMap.set('fUserKey', this.GE_USER.userKey)
      paramMap.set('userKey', this.GE_USER.userKey)
      try {
        var result = await this.$getViewData({ url: '/sUniB/tp.getChanMainBoard', param: Object.fromEntries(paramMap) }, false)
        if (!result || !result.data || !result.data.result || !result.data.result === 'NG') {
          this.$showToastPop('채널을 찾을 수 없습니다!')
          return
        }
        var teamDetail = result.data.team.content[0]
        // var contentsList = result.data.contentsListPage.content
        await this.$addChanVuex([teamDetail])
        // eslint-disable-next-line no-new-object
        var initData = new Object()
        initData.team = teamDetail
        if (result.data.contentsListPage && result.data.contentsListPage.content && result.data.contentsListPage.content.length > 0) {
          this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', result.data.contentsListPage.content)
        }
        // result.data.contentsListPage.content = this.$settingUserDo(result.data.contentsListPage.content)
        initData.contentsList = result.data.contentsListPage
      } catch (error) {
        this.$showToastPop('죄송합니다! 관리자에게 문의해주세요!')
        console.error(error)
      }
      goChanDetailParam.initData = initData
      // this.openPop(goChanDetailParam)
      this.mPopParams = goChanDetailParam
      console.log(this.mPopParam)
      // this.popList.push(goChanDetailParam)
      this.mGPopShowYn = true
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
    goFollowList () {
      var param = {}
      param.targetType = 'followList'
      param.popHeaderText = this.$t('COMMON_NAME_MY_ADDERSS')
      this.$emit('openPop', param)
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
    }
  },
  created () {
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
      var this_ = this
      console.log(checkParam)
      // eslint-disable-next-line no-undef
      sso.loginCheck2(checkParam, this.callbackFunc).then(result => {
        // var store = require('../../src/store')
        if (result.result === true) {
          console.log(result.userMap)
          console.log('!!! USER LOGIN CHECK !!!')
          if (result.userMap) {
            try {
              if (localStorage.getItem('user')) {
                var localUser = JSON.parse(localStorage.getItem('user'))
                result.data.userMap.uAccessToken = localUser.uAccessToken
                result.data.userMap.partnerToken = localUser.partnerToken
              }
              localStorage.setItem('user', JSON.stringify(result.userMap))
              this_.$store.dispatch('D_USER/AC_USER', result.userMap)
              localStorage.setItem('sessionUser', JSON.stringify(result.userMap))
            } catch (error) {
              console.log(error)
            }
          }

          if (typeof (history.pushState) !== 'undefined') {
            history.pushState(null, null, '')
            this_.$router.replace('/')
          } else {
            // 브라우저가 지원하지 않는 경우 처리
          }
          history.pushState(null, null, '')
          this_.$router.replace({ name: 'main', params: { testYn: true } })
        } else {
          this_.$.showToastPop('회원정보가 일치하지 않아 로그아웃 됩니다.\n재 로그인해주세요')
          /* this_.$router.replace({ name: 'policies', params: { boardData: 'social' } }) */
          this_.$router.replace({ path: '/unknown' })
          if (this_.$store !== undefined && this_.$store !== null) {
            this_.$store.commmit('D_USER/MU_CLEAN_USER')
          }
          localStorage.setItem('sessionUser', '')
          localStorage.setItem('user', '')
          this_.$router.replace({ path: '/unknown' })
          // this_.$router.replace({ name: 'policies', params: { boardData: 'social' } })
          window.localStorage.removeItem('testYn')
          localStorage.setItem('loginYn', false)
        }
      })
    } else {
      this.$userLoginCheck(true)
    }
    if (!this.GE_USER) {
      this.$router.replace({ path: '/unknown' })
      // this.$router.push({ name: 'policies', params: { boardData: 'social' } })
      return null
    }
    /* this.getMainBoard().then(res => {
      this.mLoadingYn = false
    }) */
  }
}
</script>

<style scoped>
.page {
  position: absolute;
  top: 30px;
}
.myPageBgColor {background-color: #d1e1f2;}
.test {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.menuBtn{
  width: 100%;
  height: 100vh;
  background: rgb(0 0 0 / 8%);
  z-index: 999;
  top: 0;
  left: 0;
  position: absolute;
}
.TalmenuStyle {
  height: 100vh;
  top: 0;
  position: absolute;
  padding: 0 1rem;
  box-sizing: border-box;
  width: 65%;
  max-width: 400px;
  /* #879dc9; */
  background-color: white;
  color: rgb(74 102 158);
  z-index: 1000;
  right: 0;
}

.show_view-enter {
  position: absolute;
  animation: show_view-dialog-fade-in 0.5s ease;
}
.show_view-leave {
  position: absolute;
  animation: show_view-dialog-fade-out 0.5s ease forwards;
}
.show_view-enter-active {
  position: absolute;
  animation: show_view-dialog-fade-in 0.5s ease;
}
.show_view-leave-active {
  position: absolute;
  animation: show_view-dialog-fade-out 0.5s ease forwards;
}
@keyframes show_view-dialog-fade-in {
  0% {
    right: -100%;
    /* transform: translateX(500px); */
  }
  100% {
    right: 0;
    /* transform: translateX(0); */
  }
}
@keyframes show_view-dialog-fade-out {
  0% {
    right: 0;
    /* transform: translateX(0); */
  }
  100% {
    right: -100%;
    /* transform: translateX(500px); */
  }
}

@media screen and (max-width: 300px) {
  .pagePaddingWrap {
    padding-top: 50px !important;
  }
}
/*
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.5s;
}
.slide-left-enter-to {
  position: absolute;
  right: 0;
}
.slide-left-enter-from {
  position: absolute;
  right: -100vw;
}
.slide-left-leave-to {
  position: absolute;
  left: -100vw;
}
.slide-left-leave-from {
  position: absolute;
  left: 0;
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.5s;
}
.slide-right-enter-to {
  position: absolute;
  left: 0;
}
.slide-right-enter-from {
  position: absolute;
  left: -100vw;
}
.slide-right-leave-to {
  position: absolute;
  right: -100vw;
}
.slide-right-leave-from {
  position: absolute;
  right: 0;
} */
/* .slide-right{
  animation: animate__fadeInRight;
}
.slide-left{
  animation: animate__fadeInLeft;
} */
  @keyframes bg1_slide-left-In{
    from{
      left: -100%;
    }
    to{
      left: 0%;
    }
  }
  @keyframes bg1_slide-left-Out{
    from{
      left: 0%;
    }
    to{
      left: -100%;
    }
  }
  @keyframes bg1_slide-right-In{
    from{
      right: -100%;
    }
    to{
      right: 0%;
    }
  }
  @keyframes bg1_slide-right-Out{
    from{
      right: 0%;
    }
    to{
      right: -100%;
    }
  }

  .slide-left-in{
    animation-duration: 0.3s;
    animation-name: bg1_slide-left-In;
    animation-fill-mode: both;
  }
  .slide-left-Out{
    animation-duration: 0.3s;
    animation-name: bg1_slide-left-Out;
    animation-fill-mode: both;
  }
  .slide-right-in{
    animation-duration: 0.3s;
    animation-name: bg1_slide-right-In;
    animation-fill-mode: both;
  }
  .slide-right-Out{
    animation-duration: 0.3s;
    animation-name: bg1_slide-right-Out;
    animation-fill-mode: both;
  }

  .animate__fadeInRightBig{
    animation-duration: 0.5s
  }
  .animate__fadeOutLeftBig{
    animation-duration: 0.5s
  }
  .animate__fadeInLeftBig{
    animation-duration: 0.5s
  }
  .animate__fadeOutRightBig{
    animation-duration: 0.5s
  }
</style>
