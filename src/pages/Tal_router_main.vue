<template>
  <div class="w-100P h-100P mainBackgroundColor listRefresh" style="overflow:hidden " > <!-- v-if="notiDetailShowYn" -->
    <!-- <pushPop @closePushPop="closePushPop" @goDetail="goDetail" v-if="notiDetailShowYn" :detailVal="notiDetail"  /> -->
    <div style="background-color:#00000050; width:100%; height:100vh; position:absolute; top:0; left:0; z-index:999;" v-if="mMenuShowYn" @click="hideMenu"/>
    <transition name="show_view">
      <TalMenu transition="show_view" @hideMenu="hideMenu" @openPop="openPop" @goPage="goPage" class="TalmenuStyle " v-if="mMenuShowYn" />
    </transition>
    <gConfirmPop :confirmText="mErrorPopBodyStr" confirmType='one' @no='mErrorPopShowYn = false' v-if="mErrorPopShowYn" style="z-index: 9999999999999999999999;"/>
    <gConfirmPop :confirmText="mNetPopBodyStr" confirmType='no' @no='mNetPopShowYn = false' v-if="mNetPopShowYn" style="z-index: 9999999999999;"/>
    <gConfirmPop confirmText="네트워크의 연결이 끊어져<br>실행 할 수 없습니다" confirmType='no' @no='mNetReturnPopShowYn = false'  style="z-index: 999999999999999999999999;" v-if="mNetReturnPopShowYn"/>
    <div v-if="mShadowScreenShowYn" @click="changeNetStatePop" style="width:100%; height: 100%; position: fixed; top: 0; left: 0; z-index: 99999999999999;"></div>
    <transition name="showModal">
      <fullModal @successWrite="successWriteBoard" ref="mainGPopWrap" @reloadPop ="reloadPop" transition="showModal" :style="GE_WINDOW_SIZE"  @closePop="closePop" v-if="this.mGPopShowYn === true && this.mPopParams" parentPopN="0" :propParams="this.mPopParams" @closeNewPop='closeNewPop' @parentClose='parentClose' />
    </transition>
    <TalHeader @showMenu="showMenu" ref="mainHeaderWrap" class="header_footer " :mRouterHeaderText="this.mRouterHeaderText" style="position: absolute; top: 0; left:-1px; z-index: 9"/>
    <div :class="{ myPageBgColor : this.mRouterHeaderText === '마이페이지' }" class="" style="height: calc(100vh - 60px); padding-top: 50px; overflow: hidden; width:100%;">
        <router-view @scrollEvnt="this.scrollEvnt" :popYn="false" class="" style="margin-bottom: 60px" @openPop="openPop" @changePageHeader="changePageHeader" @goDetail="goDetail" @openUserProfile="openPop" ref="routerViewCompo" />
    </div>
    <TalFooter @changeRouterPath="changeRouterPath" class="header_footer footerShadow" style="position: absolute; bottom: 0; z-index: 9" />
    <div v-if="!mBackBtnShowYn" @click="this.$gobackDev()" style="width: 60px; height: 60px; border-radius: 100%; background: #5F61BD; position: fixed; bottom: 90px; left: 20px; z-index: 999999; display: flex; justify-content:center; align-items: center; border: 3px solid #FFF; box-shadow: rgb(0 0 0 / 22%) 0px 0px 9px 4px;"><p class="font16 fontBold" style="color: #FFF;">back</p></div>
  </div>
</template>

<script>
/* import pushPop from '../components/popup/push/Tal_pushDetailPopup.vue' */
import TalMenu from '../components/popup/common/Tal_menu.vue'
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
      devMode: false
    }
  },
  props: {},
  name: 'mainRouter',
  components: {
    TalMenu
    /* pushPop */
  },
  beforeUnmount () {
  },
  mounted () {
    this.$showChanCommonPop(false)
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
      console.log('###########')
      console.log(history)
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
      var history = this.$store.getters['D_HISTORY/hStack']
      if (history.length < 2 && (history[0] === 0 || history[0] === undefined)) {
        if (value.length > 0) {
          var target = value[value.length - 1]
          if (!target) return
          // eslint-disable-next-line no-new-object
          var param = new Object()
          if (!target.targetKind || !(target.targetKind === 'chanDetail' || target.targetKind === 'contentsDetail')) return
          param.targetType = target.targetKind
          param.creTeamKey = Number(target.targetKey)
          if (target.targetKind === 'chanDetail') {
            this.goChanDetail(param)
          } else {
            this.goDetail(param)
          }
          this.$store.commit('D_HISTORY/changeDeepLinkQueue', [])
        }
      }
    }
  },
  methods: {
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
    async changeRouterPath (page) {
      await this.$router.replace(page)
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
      this.mPopParams = params
      this.mGPopShowYn = true
      this.hideMenu()
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
        var detailParam = {}
        detailParam.targetType = 'contentsDetail'
        detailParam.targetKey = detailValue.contentsKey
        // param.targetType = value.contentsKey
        if (detailValue.jobkindId === 'BOAR') {
          detailParam.cabinetKey = detailValue.cabinetKey
          detailParam.cabinetNameMtext = detailValue.cabinetNameMtext
          detailParam.popHeaderText = detailValue.cabinetNameMtext
        } else {
          detailParam.nameMtext = detailValue.nameMtext
          detailParam.teamName = detailValue.nameMtext
          detailParam.popHeaderText = detailValue.nameMtext
        }
        if (detailParam.popHeaderText === undefined) detailParam.popHeaderText = detailValue.popHeaderText
        detailParam.contentsKey = detailValue.contentsKey
        detailParam.jobkindId = detailValue.jobkindId
        detailParam.teamKey = detailValue.creTeamKey
        detailParam.notiYn = true
        detailParam.value = detailValue
        this.openPop(detailParam)
      }
    },
    goChanDetail (detailValue) {
      var goChanDetailParam = {}
      goChanDetailParam.targetType = 'chanDetail'
      console.log(detailValue)
      goChanDetailParam.teamKey = detailValue.creTeamKey
      goChanDetailParam.targetKey = detailValue.creTeamKey
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
      this.openPop(goChanDetailParam)
    },
    async recvNotiFormBridge (notiDetail, currentPage, vuexResultData) {
      try {
        var notiUserDo = JSON.parse(notiDetail.userDo)
        if ((currentPage === 0 || currentPage === undefined)) {
          // eslint-disable-next-line no-new-object
          var goDetailParam = new Object()
          goDetailParam.creTeamKey = Number(notiDetail.creTeamKey)
          if (notiUserDo.targetKind === 'CONT') {
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
          } else if (notiUserDo.targetKind === 'CABI') {
            goDetailParam.contentsKey = notiUserDo.ISub
            goDetailParam.jobkindId = notiDetail.jobkindId
            if (goDetailParam.jobkindId === 'ALIM') {
              goDetailParam.nameMtext = vuexResultData.nameMtext
            } else if (goDetailParam.jobkindId === 'BOAR') {
              goDetailParam.cabinetNameMtext = vuexResultData.cabinetNameMtext
              goDetailParam.cabinetKey = vuexResultData.cabinetKey
            }
          } else if (notiUserDo.targetKind === 'TEAM') {
            this.$router.replace({ path: '/' })
            goDetailParam.chanYn = true
            goDetailParam.targetKey = notiUserDo.targetKey
          }
          goDetailParam.notiYn = true
          // goDetailParam.value = vuexResultData
          if (notiUserDo.targetKind === 'TEAM') {
            this.goChanDetail(goDetailParam)
          } else if (notiUserDo.targetKind === 'CONT' || notiUserDo.targetKind === 'CABI') {
            this.goDetail(goDetailParam)
          }
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
    this.$userLoginCheck(true)
  }
}
</script>

<style scoped>
.page {
  position: absolute;
  top: 30px;
}
.myPageBgColor {background-color: #dcddeb;}
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
  /* background-color: #6768a7; */
  background-color: white;
  color: #5F61BD;
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
