<template>
  <div class="w-100P h-100P listRefresh" style="background: #dcddeb; overflow:hidden "> <!-- v-if="notiDetailShowYn" -->
    <gConfirmPop :confirmText="netText" confirmType='one' @no='netBoxShowYn = false' v-if="netBoxShowYn"/>
    <!-- <loadingCompo v-if="loadingYn" /> -->
    <transition name="showModal">
      <fullModal @successWrite="successWriteBoard" @reloadPop ="reloadPop" transition="showModal" :style="getWindowSize"  id="gPop0" @closePop="closePop" v-if="this.popShowYn" parentPopN="0" :params="this.popParams" />
    </transition>
    <pushPop @closePushPop="closePushPop" @goChanDetail="goChanDetail" v-if="notiDetailShowYn" :detailVal="notiDetail"  />
    <div style="background-color:#00000050; width:100%; height:100vh; position:absolute; top:0; left:0; z-index:1000;" v-if="showMenuYn" @click="hideMenu"/>
    <transition name="show_view">
      <TalMenu transition="show_view" @hideMenu="hideMenu" @openPop="openPop" @goPage="goPage" class="TalmenuStyle " v-if="showMenuYn" />
    </transition>
    <TalHeader @showMenu="showMenu" class="header_footer headerShadow" :headerTitle="this.headerTitle" style="position: absolute; top: 0; left:-1px; z-index: 999"/>
    <div v-if="reloadYn === false" :class="{ myPageBgColor : this.headerTitle === '마이페이지' }" class="" style="height: calc(100vh - 60px); padding-top: 50px; overflow: hidden; width:100%;">
      <!-- <transition :name="transitionName" > -->
        <router-view :popYn="false" :ref="mainRouterView" :routerReloadKey="this.routerReloadKey" class="" style="margin-bottom: 60px" @openPop="openPop" @changePageHeader="changePageHeader" @openUserProfile="openPop" />
      <!-- </transition> -->
      <!-- <router-view v-slot="{ Component, route }">
        <transition
        :enter-active-class="route.meta.enterClass"
        :leave-active-class="route.meta.leaveClass"
        >
          <component :is="Component" :popYn="false" :ref="mainRouterView" :routerReloadKey="this.routerReloadKey" @openLoading="this.loadingYn = true" @closeLoading="this.loadingYn = false" class="" style="margin-bottom: 60px" @openPop="openPop" @changePageHeader="changePageHeader" @openUserProfile="openPop" />
        </transition>
      </router-view> -->
    </div>
    <TalFooter @changePath="changePath" class="header_footer footerShadow" style="position: absolute; bottom: 0; z-index: 999" />
  </div>
</template>

<script>
// import index from '../../router/index'
// import { onMessage } from '../assets/js/webviewInterface.js'
// import chanMenu from '../components/popup/chanMenu/Tal_channelMenu.vue'
import pushPop from '../components/popup/push/Tal_pushDetailPopup.vue'
import TalMenu from '../components/popup/common/Tal_menu.vue'
// import loadingCompo from '../components/layout/Tal_loading.vue'
// import PullToRefresh from 'pulltorefreshjs'

export default {
  data () {
    return {
      showText: false,
      popShowYn: false,
      parentPopN: 0,
      showMenuYn: false,
      /* pushPopShowYn: false, */
      pushPopParams: '',
      popParams: '',
      headerTitle: '',
      loadingYn: true,
      routerReloadKey: 0,
      notiDetail: '',
      notiDetailShowYn: false,
      reloadYn: false,
      testData: { contentsKey: 1001172, creUserKey: 1 },
      systemName: 'iOS',
      netBoxShowYn: false,
      netText: ''
    }
  },
  props: {},
  name: 'mainRouter',
  components: {
    TalMenu,
    // loadingCompo,
    pushPop
    // chanMenu
  },
  beforeUnmount () {
  },
  mounted () {
  },
  computed: {
    netState () {
      return this.$store.getters['D_USER/GE_NET_STATE']
    },
    getWindowSize () {
      return {
        '--widndowWidth': window.innerWidth + 'px'
      }
    },
    deepLinkQueue () {
      return this.$store.getters['D_HISTORY/deepLinkQueue']
    },
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    }
  },
  // beforeUpdate () {
  //   // console.log(true)
  // },
  watch: {
    netState: {
      handler (value, old) {
        if (old === false && value) {
          this.netText = '네트워크가 연결되었습니다!<br>'
        } else if (old && value === false) {
          this.netText = '네트워크 연결이 해제되었습니다.<br>'
        }
        this.netBoxShowYn = true
      },
      deep: true
    },
    async deepLinkQueue (value, old) {
      var history = this.$store.getters['D_HISTORY/hStack']
      if (history.length < 2 && (history[0] === 0 || history[0] === undefined)) {
        if (value.length > 0) {
          var target = value[value.length - 1]
          // eslint-disable-next-line no-new-object
          var param = new Object()
          param.targetType = target.targetKind
          param.targetKey = target.targetKey
          this.$store.commit('D_HISTORY/changeDeepLinkQueue', [])
          this.openPop(param)
        }
      }
    }
  },
  methods: {
    async changePath (page) {
      await this.$router.replace(page)
    },
    /* footerAni (transitionName) {
      this.transitionName = transitionName
    }, */
    async getFollowerYn (teamKey) {
      var paramMap = new Map()
      paramMap.set('teamKey', teamKey)
      paramMap.set('userKey', this.GE_USER.userKey)
      var result = await this.$commonAxiosFunction({
        url: 'service/tp.getFollowerList',
        param: Object.fromEntries(paramMap)
      })
      // console.log(result)
      if (result.data.content.length > 0) {
        return true
      } else {
        return false
      }
    },
    reloadPop () {
      this.routerReloadKey += 1
    },
    // openDetailPop (params) {
    // this.popParams = params
    // this.popShowYn = true
    // this.showMenuYn = false
    // setTimeout(() => {
    //   this.notiDetailShowYn = false
    // }, 200)
    // },
    closePushPop () {
      this.notiDetailShowYn = false
    },
    showMenu () {
      this.showMenuYn = true
    },
    hideMenu () {
      this.showMenuYn = false
    },
    openPop (params) {
      this.popParams = params
      this.popShowYn = true
      this.showMenuYn = false
    },
    /* openPushPop (params) {
      this.pushPopParams = params
      this.pushPopShowYn = true
    }, */
    async successWriteBoard (inParam) {
      this.$router.go(0)
      this.openPop(inParam)
    },
    closePop (reloadYn) {
      // this.$refs.routerViewRef.reload()
      var history = this.$store.getters['D_HISTORY/hStack']
      var removePage = history[history.length - 1]
      history = history.filter((element, index) => index < history.length - 1)
      this.$store.commit('D_HISTORY/setRemovePage', removePage)
      this.$store.commit('D_HISTORY/updateStack', history)
      // 라우트로 현재 path를 구하고 this.route... 이게 chanList인지를 따지고 refresh

      if (reloadYn) {
        this.routerReloadKey += 1
        // console.log(this.$route.path)
        // if (this.$route.path === '/') {
        //   this.$refs.mainRouterView.reloadPage()
        // }
      }
      this.popShowYn = false
    },
    /* closeXPushPop () {
      this.pushPopShowYn = false
    }, */
    changePageHeader (title) {
      this.headerTitle = title
    },
    goPage (page) {
      this.showMenuYn = false
      this.$router.replace({ path: '/' + page })
    },
    async getContentsMemoList (targetKey, memoKey, parentMemoKey) {
      var memo = {}
      memo.targetKind = 'C'
      memo.parentMemoKey = parentMemoKey
      memo.targetKey = targetKey
      memo.memoKey = memoKey
      var result = await this.$commonAxiosFunction({
        url: 'service/tp.getMemoList',
        param: memo
      })
      var memos = result.data.memoList[0]
      // alert(JSON.stringify(memos))
      return memos
    },
    async getContentsYn (contentsKey, jobkindId) {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.contentsKey = contentsKey
      param.jobkindId = jobkindId
      // // console.log(param)
      // // console.log('param')
      var resultList = await this.$getContentsList(param)
      return resultList.content
      // alert(JSON.stringify(detailData))
    },
    async settingUserDo (userDo) {
      var D_CONT_USER_DO = [{ doType: 'ST', doKey: 0 }, { doType: 'LI', doKey: 0 }, { doType: 'RE', doKey: false }]

      if (userDo !== undefined && userDo !== null && userDo !== '') {
        // eslint-disable-next-line no-array-constructor
        /* this.userDoStickerList = new Array() */
        for (var i = 0; i < userDo.length; i++) {
          if (userDo[i].doType === 'LI') {
            D_CONT_USER_DO[1].doKey = userDo[i].doKey
          }
          if (userDo[i].doType === 'ST') {
            D_CONT_USER_DO[0].doKey = userDo[i].doKey
          }
          if (userDo[i].doType === 'RE') {
            D_CONT_USER_DO[2].doKey = true
          }
          /* if (userDo[i].doType === 'SK') {
            this.userDoStickerList.push(userDo[i].sticker)
          } */
        }
      }
      return D_CONT_USER_DO
    },
    goChanDetail (data) {
      // console.log(data)
      if (data.popCloseYn === true) this.closePushPop()
      // eslint-disable-next-line no-new-object
      var param = new Object()
      // alert(true)
      if (data.targetType === 'chanDetail') {
        param.targetType = 'chanDetail'
        param.teamKey = data.creTeamKey
        param.targetKey = data.creTeamKey
        param.nameMtext = data.nameMtext
        param.chanName = data.nameMtext
        if (data.contentsKey) {
          param.jobkindId = data.jobkindId
          param.targetContentsKey = data.contentsKey
        }
        // 세션에서 유저키 받아오기
        if (data.creUserKey === this.GE_USER.userKey) {
          param.ownerYn = true
        }
      } else {
        param.targetType = 'boardDetail'
        param.cabinetNameMtext = data.cabinetNameMtext
        param.teamKey = data.creTeamKey
        param.targetKey = data.contentsKey
        param.contentsKey = data.contentsKey
        param.cabinetKey = data.cabinetKey
        param.jobkindId = 'BOAR'
        param.value = data
      }
      this.openPop(param)
    },
    async recvNoti (e) {
      var message
      try {
        if (this.$isJsonString(e.data) === true) {
          message = JSON.parse(e.data)
        } else {
          message = e.data
        }
        if (message.type === 'pushmsg') {
          if (JSON.parse(message.pushMessage).noti.data.item !== undefined && JSON.parse(message.pushMessage).noti.data.item.data !== undefined && JSON.parse(message.pushMessage).noti.data.item.data !== null && JSON.parse(message.pushMessage).noti.data.item.data !== '') {
            this.notiDetail = JSON.parse(message.pushMessage).noti.data.item.data
          } else {
            this.notiDetail = JSON.parse(message.pushMessage).noti.data
          }
          var currentPage = this.$store.getters['D_HISTORY/hCPage']

          if ((currentPage === 0 || currentPage === undefined)) {
            if (JSON.parse(this.notiDetail.userDo).targetKind === 'CONT') {
              if (Number(JSON.parse(this.notiDetail.userDo).userKey) === this.GE_USER.userKey) {
                return
              }
              if (this.notiDetail.actYn === true || this.notiDetail.actYn === 'true') {
                if (JSON.parse(message.pushMessage).arrivedYn === true || JSON.parse(message.pushMessage).arrivedYn === 'true') {
                  var memo = await this.getContentsMemoList(Number(JSON.parse(this.notiDetail.userDo).targetKey), Number(JSON.parse(this.notiDetail.userDo).ISub))
                  memo.jobkindId = this.notiDetail.jobkindId
                  memo.creTeamKey = Number(this.notiDetail.creTeamKey)
                  await this.$store.commit('D_CHANNEL/MU_REPLACE_NEW_MEMO', memo)
                } else {
                  if (this.notiDetail.jobkindId === 'ALIM') {
                    this.goChanDetail({ contentsKey: Number(JSON.parse(this.notiDetail.userDo).targetKey), jobkindId: this.notiDetail.jobkindId, creTeamKey: Number(this.notiDetail.creTeamKey), targetType: 'chanDetail' })
                    return
                  } else if (this.notiDetail.jobkindId === 'BOAR') {
                    this.goChanDetail({ contentsKey: Number(JSON.parse(this.notiDetail.userDo).targetKey), creTeamKey: Number(this.notiDetail.creTeamKey), jobkindId: this.notiDetail.jobkindId, targetType: 'chanDetail' })
                    // this.goChanDetail({ contentsKey: Number(JSON.parse(this.notiDetail.userDo).targetKey), cabinetNameMtext: JSON.parse(this.notiDetail.userDo).targetName, jobkindId: this.notiDetail.jobkindId, targetType: 'boardDetail' })
                    return
                  }
                }
              } else {
                if (JSON.parse(message.pushMessage).arrivedYn === true || JSON.parse(message.pushMessage).arrivedYn === 'true') {
                  if (this.notiDetail.jobkindId !== 'BOAR') {
                    this.notiDetailShowYn = true
                    // if (this.$route.path === '/') {
                    //   this.$refs.mainRouterView.getMainBoard()
                    // }
                  }
                } else {
                  this.goChanDetail({ contentsKey: Number(JSON.parse(this.notiDetail.userDo).targetKey), jobkindId: this.notiDetail.jobkindId, creTeamKey: Number(this.notiDetail.creTeamKey), targetType: 'chanDetail' })
                }
              }
            } else if (JSON.parse(this.notiDetail.userDo).targetKind === 'CABI') {
              if (Number(JSON.parse(this.notiDetail.userDo).userKey) === Number(this.GE_USER.userKey)) {
                return
              }
              if (this.notiDetail.actYn === true || this.notiDetail.actYn === 'true') {
                if (JSON.parse(message.pushMessage).arrivedYn === true || JSON.parse(message.pushMessage).arrivedYn === 'true') {
                  ;
                } else {
                  this.goChanDetail({ contentsKey: Number(JSON.parse(this.notiDetail.userDo).ISub), creTeamKey: Number(this.notiDetail.creTeamKey), jobkindId: this.notiDetail.jobkindId, targetType: 'chanDetail' })
                  // this.goChanDetail({ contentsKey: Number(JSON.parse(this.notiDetail.userDo).ISub), cabinetNameMtext: JSON.parse(this.notiDetail.userDo).targetName, jobkindId: this.notiDetail.jobkindId, targetType: 'boardDetail' })
                }
              }
            } else if (JSON.parse(this.notiDetail.userDo).targetKind === 'TEAM') {
              alert(this.notiDetail.actType)
              if ((Number(JSON.parse(this.notiDetail.userDo).userKey) === this.GE_USER.userKey) && (this.notiDetail.actType !== 'MA')) {
                return
              }
              alert(JSON.stringify(this.notiDetail))
              if (JSON.parse(message.pushMessage).arrivedYn === true || JSON.parse(message.pushMessage).arrivedYn === 'true') {
              } else {
                this.$router.replace({ path: '/' })
                alert(JSON.stringify(this.notiDetail))
                if (this.notiDetail.actType === 'FL' || this.notiDetail.actType === 'RQ' || this.notiDetail.actType === 'AP') {
                  this.goChanDetail({ targetKey: Number(JSON.parse(this.notiDetail.userDo).targetKey), creTeamKey: Number(this.notiDetail.creTeamKey), targetType: 'chanDetail' })
                } else if (this.notiDetail.actType === 'ME' || this.notiDetail.actType === 'FM') {
                  this.goChanDetail({ targetKey: Number(JSON.parse(this.notiDetail.userDo).targetKey), creTeamKey: Number(this.notiDetail.creTeamKey), targetType: 'chanDetail' })
                } else if (this.notiDetail.actType === 'MA') {
                  this.goChanDetail({ targetKey: Number(JSON.parse(this.notiDetail.userDo).targetKey), creTeamKey: Number(this.notiDetail.creTeamKey), targetType: 'chanDetail' })
                }
              }
            } else if (JSON.parse(this.notiDetail.userDo).targetKind === 'MEMO') {
              if (this.notiDetail.actYn === true || this.notiDetail.actYn === 'true') {
                // alert('왔슴다')
                var memo_ = await this.getContentsMemoList(null, Number(JSON.parse(this.notiDetail.userDo).ISub), Number(JSON.parse(this.notiDetail.userDo).targetKey))
                if (JSON.parse(message.pushMessage).arrivedYn === true || JSON.parse(message.pushMessage).arrivedYn === 'true') {
                  // alert(JSON.stringify(memo_))
                  memo_.jobkindId = this.notiDetail.jobkindId
                  // alert(true)
                  memo_.creTeamKey = Number(this.notiDetail.creTeamKey)
                  await this.$store.commit('D_CHANNEL/MU_REPLACE_NEW_MEMO', memo_)
                } else {
                  if (this.notiDetail.jobkindId === 'ALIM') {
                    this.goChanDetail({ contentsKey: memo_.targetKey, creTeamKey: Number(this.notiDetail.creTeamKey), jobkindId: this.notiDetail.jobkindId, targetType: 'chanDetail' })
                    return
                  } else if (this.notiDetail.jobkindId === 'BOAR') {
                    this.goChanDetail({ contentsKey: memo_.targetKey, creTeamKey: Number(this.notiDetail.creTeamKey), jobkindId: this.notiDetail.jobkindId, targetType: 'chanDetail' })
                    // this.goChanDetail({ contentsKey: Number(JSON.parse(this.notiDetail.userDo).targetKey), cabinetNameMtext: JSON.parse(this.notiDetail.userDo).targetName, jobkindId: this.notiDetail.jobkindId, targetType: 'boardDetail' })
                    return
                  }
                }
              }
            }
          }
        }
      } catch (err) {
        console.error('메세지를 파싱할수 없음 ' + err)
      }
    }
  },
  created () {
    this.$store.commit('D_CHANNEL/MU_CLEAN_CHAN_LIST') // 앱 시작 vuex 초기화
    this.$userLoginCheck(true)
    /* const searchParams = new URLSearchParams(location.search)
    // eslint-disable-next-line no-unused-vars
    for (const param of searchParams) {
      if (param[0] === 'chanDetail') {
        this.openPop({ targetType: 'chanDetail', targetKey: param[1], teamKey: param[1] })
      } else if (param[0] === 'boardDetail') {
        this.openPop({ targetKey: param[1], targetType: 'boardDetail', contentsKey: param[1], pushOpenYn: true })
      } else if (param[0] === 'pushDetail') {
        this.openPop({ targetKey: param[1], targetType: 'pushDetail', contentsKey: param[1], pushOpenYn: true })
      }
      // console.log('targetKey: ' + param[1])
    } */
    document.addEventListener('message', e => this.recvNoti(e))
    window.addEventListener('message', e => this.recvNoti(e))
  }
  // onMessage (data) {
  //   window.nsWebViewBridge.emit('onMessage', data)
  // }
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
  width: 80%;
  max-width: 500px;
  background-color: #6768a7;
  color: #ffffff;
  z-index: 999999;
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
