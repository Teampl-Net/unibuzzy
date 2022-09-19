<template>
  <div class="w-100P h-100P listRefresh" style="background: #dcddeb; overflow:hidden "> <!-- v-if="notiDetailShowYn" -->
    <!-- <loadingCompo v-show="loadingYn" /> -->
    <transition name="showModal">
      <fullModal @successWrite="successWriteBoard" @reloadPop ="reloadPop" transition="showModal" :style="getWindowSize"  id="gPop0" @closePop="closePop" v-if="this.popShowYn" parentPopN="0" :params="this.popParams" />
    </transition>
    <pushPop @closePushPop="closePushPop" @openDetailPop="openDetailPop" v-if="notiDetailShowYn" :detailVal="notiDetail" />
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
    <TalFooter class="header_footer footerShadow" style="position: absolute; bottom: 0; z-index: 999" />
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
      systemName: 'iOS'
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
    // PullToRefresh.destroyAll()
  },
  mounted () {

    /* this.checkDeepLinkQueue() */
    // console.log('pulltorefreshjs')
    // PullToRefresh.init({
    //   mainElement: 'body',
    //   distThreshold: '80', // 최소 새로고침 길이( 이 길이가 되면 새로고침 시작)
    //   distMax: '100', // 최대 거리 (영역이 길어질 수 있는 최대 거리)
    //   distReload: '80', // 새로고침 후 갖고있는 영역의 크기
    //   instructionsReleaseToRefresh: ' ', // 최소 새로고침에 도달 했을 때 문구
    //   instructionsPullToRefresh: ' ', // 끌고 있을 때 문구
    //   instructionsRefreshing: ' ', // 새로고침 중 문구
    //   onRefresh () {
    //     window.location.reload()
    //   }
    // })
  },
  computed: {
    getWindowSize () {
      return {
        '--widndowWidth': window.innerWidth + 'px'
      }
    },
    deepLinkQueue () {
      return this.$store.getters.deepLinkQueue
    }
  },
  // beforeUpdate () {
  //   console.log(true)
  // },
  watch: {
    async deepLinkQueue (value, old) {
      var history = this.$store.getters.hStack
      if (history.length < 2 && (history[0] === 0 || history[0] === undefined)) {
        if (value.length > 0) {
          var target = value[value.length - 1]
          // eslint-disable-next-line no-new-object
          var param = new Object()
          param.targetType = target.targetKind
          param.targetKey = target.targetKey
          this.$store.commit('changeDeepLinkQueue', [])
          this.openPop(param)
          /* if (target.targetKind === 'pushDetail') {
            var t = target.targetKey
            var paramList = []
            paramList = t.split('?')
            param.targetType = 'chanDetail'
            param.targetKey = paramList[1]
            var followYn = await this.getFollowerYn(paramList[1])
            if (followYn) {
              param.targetContentsKey = paramList[0]
            } else {
            }
            this.$store.commit('changeDeepLinkQueue', [])
            this.openPop(param)
          } else {
            param.targetType = target.targetKind
            param.targetKey = target.targetKey
            this.$store.commit('changeDeepLinkQueue', [])
            this.openPop(param)
          } */
        }
      }
    },
    $route (to, from) {
      // console.log(from.meta.page + ' ' + to.meta.page)
      // console.log()
      // if (to.meta.page > from.meta.page) {
      //   to.meta.enterClass = 'animate__animated animate__fadeInRightBig'
      //   from.meta.leaveClass = 'animate__animated animate__fadeOutLeftBig'
      // } else if (to.meta.page < from.meta.page) {
      //   to.meta.enterClass = 'animate__animated animate__fadeInLeftBig'
      //   from.meta.leaveClass = 'animate__animated animate__fadeOutRightBig'
      // }
    }
  },
  methods: {
    /* footerAni (transitionName) {
      this.transitionName = transitionName
    }, */
    async getFollowerYn (teamKey) {
      var paramMap = new Map()
      paramMap.set('teamKey', teamKey)
      paramMap.set('userKey', JSON.parse(localStorage.getItem('sessionUser')).userKey)
      var result = await this.$commonAxiosFunction({
        url: 'https://mo.d-alim.com/service/tp.getFollowerList',
        param: Object.fromEntries(paramMap)
      })
      console.log(result)
      if (result.data.content.length > 0) {
        return true
      } else {
        return false
      }
    },
    /* checkDeepLinkQueue () {
      // const searchParams = new URLSearchParams(location.search)

      var queue = this.$store.getters.deepLinkQueue
      if (queue.length > 0) {
        var target = queue[queue.length - 1]
        // eslint-disable-next-line no-new-object
        var param = new Object()
        param.targetType = target.targetKind
        param.targetKey = target.targetKey
        this.$store.commit('changeDeepLinkQueue', [])
        this.openPop(param)
      }
    }, */
    reloadPop () {
      this.routerReloadKey += 1
    },
    openDetailPop (params) {
      this.popParams = params
      this.popShowYn = true
      this.showMenuYn = false
      setTimeout(() => {
        this.notiDetailShowYn = false
      }, 200)
    },
    closePushPop () {
      this.notiDetailShowYn = false
    },
    recvNoti (e) {
      var message
      try {
        if (this.$isJsonString(e.data) === true) {
          message = JSON.parse(e.data)
        } else {
          message = e.data
        }
        if (message.type === 'pushmsg') {
          if (localStorage.getItem('systemName') !== undefined && localStorage.getItem('systemName') !== 'undefined' && localStorage.getItem('systemName') !== null) {
            this.systemName = localStorage.getItem('systemName')
          }
          if (JSON.parse(message.pushMessage).noti.data.item !== undefined && JSON.parse(message.pushMessage).noti.data.item.data !== undefined && JSON.parse(message.pushMessage).noti.data.item.data !== null && JSON.parse(message.pushMessage).noti.data.item.data !== '') {
            this.notiDetail = JSON.parse(message.pushMessage).noti.data.item.data
          } else {
            this.notiDetail = JSON.parse(message.pushMessage).noti.data
          }
          var currentPage = this.$store.getters.hCPage
          if ((currentPage === 0 || currentPage === undefined)) {
            if (JSON.parse(this.notiDetail.userDo).targetKind === 'CONT') {
              if (Number(JSON.parse(this.notiDetail.userDo).userKey) === Number(JSON.parse(localStorage.getItem('sessionUser')).userKey)) {
                return
              }
              if (this.notiDetail.actYn === true || this.notiDetail.actYn === 'true') {
                if (JSON.parse(message.pushMessage).arrivedYn === true || JSON.parse(message.pushMessage).arrivedYn === 'true') {
                  ;
                } else {
                  if (this.notiDetail.jobkindId === 'ALIM') {
                    this.openPop({ targetKey: this.notiDetail.creTeamKey, nameMtext: this.notiDetail.creTeamName, targetContentsKey: JSON.parse(this.notiDetail.userDo).targetKey, targetType: 'chanDetail', value: this.notiDetail })
                  } else if (this.notiDetail.jobkindId === 'BOAR') {
                    this.openPop({ targetKey: JSON.parse(this.notiDetail.userDo).targetKey, targetType: 'boardDetail', cabinetNameMtext: JSON.parse(this.notiDetail.userDo).targetName, value: this.notiDetail, pushOpenYn: true })
                  }
                }
              } else {
                if (JSON.parse(message.pushMessage).arrivedYn === true || JSON.parse(message.pushMessage).arrivedYn === 'true') {
                  if (this.notiDetail.jobkindId !== 'BOAR') {
                    this.notiDetailShowYn = true // wowns
                    // if (this.$route.path === '/') {
                    //   this.$refs.mainRouterView.getMainBoard()
                    // }
                  }
                } else {
                  this.openPop({ targetKey: this.notiDetail.creTeamKey, nameMtext: this.notiDetail.creTeamName, targetContentsKey: JSON.parse(this.notiDetail.userDo).targetKey, targetType: 'chanDetail', value: this.notiDetail })
                }
              }
            } else if (JSON.parse(this.notiDetail.userDo).targetKind === 'CABI') {
              if (Number(JSON.parse(this.notiDetail.userDo).userKey) === Number(JSON.parse(localStorage.getItem('sessionUser')).userKey)) {
                return
              }
              if (this.notiDetail.actYn === true || this.notiDetail.actYn === 'true') {
                if (JSON.parse(message.pushMessage).arrivedYn === true || JSON.parse(message.pushMessage).arrivedYn === 'true') {
                  ;
                } else {
                  this.openPop({ targetKey: JSON.parse(this.notiDetail.userDo).ISub, targetType: 'boardDetail', cabinetNameMtext: JSON.parse(this.notiDetail.userDo).targetName, value: this.notiDetail, pushOpenYn: true })
                }
              }
            } else if (JSON.parse(this.notiDetail.userDo).targetKind === 'TEAM') {
              if (Number(JSON.parse(this.notiDetail.userDo).userKey) === Number(JSON.parse(localStorage.getItem('sessionUser')).userKey)) {
                return
              }
              if (JSON.parse(message.pushMessage).arrivedYn === true || JSON.parse(message.pushMessage).arrivedYn === 'true') {
              } else {
                this.$router.replace({ path: '/' })
                if (this.notiDetail.actType === 'FL') {
                  this.openPop({ targetKey: JSON.parse(this.notiDetail.userDo).targetKey, targetType: 'chanDetail', value: this.notiDetail, pushOpenYn: true })
                } else if (this.notiDetail.actType === 'ME' || this.notiDetail.actType === 'FM') {
                  this.openPop({ targetKey: JSON.parse(this.notiDetail.userDo).targetKey, targetType: 'chanDetail', value: this.notiDetail, pushOpenYn: true })
                } else if (this.notiDetail.actType === 'MA') {
                  this.openPop({ targetKey: JSON.parse(this.notiDetail.userDo).targetKey, targetType: 'chanDetail', value: this.notiDetail, pushOpenYn: true })
                }
              }
            } else if (JSON.parse(this.notiDetail.userDo).targetKind === 'MEMO') {
              if (this.notiDetail.actYn === true || this.notiDetail.actYn === 'true') {
                if (JSON.parse(message.pushMessage).arrivedYn === true || JSON.parse(message.pushMessage).arrivedYn === 'true') {

                } else {
                  if (this.notiDetail.jobkindId === 'ALIM') {
                    this.openPop({ targetKey: this.notiDetail.creTeamKey, targetContentsKey: JSON.parse(this.notiDetail.userDo).targetKey, targetType: 'chanDetail', value: this.notiDetail })
                  } else if (this.notiDetail.jobkindId === 'BOAR') {
                    this.openPop({ targetKey: JSON.parse(this.notiDetail.userDo).targetKey, targetType: 'boardDetail', cabinetNameMtext: JSON.parse(this.notiDetail.userDo).targetName, value: this.notiDetail, pushOpenYn: true })
                  }
                }
              }
            }
          }
        }
      } catch (err) {
        console.error('메세지를 파싱할수 없음 ' + err)
      }
    },
    test () {
      var currentPage = this.$store.getters.hCPage
      if ((currentPage === 0 || currentPage === undefined)) {
        this.openPop({ targetKey: this.notiDetail.creTeamKey, nameMtext: this.notiDetail.creTeamName, targetContentsKey: JSON.parse(this.notiDetail.userDo).targetKey, targetType: 'chanDetail', value: this.notiDetail })
      } else {
        this.openPop({ targetKey: this.notiDetail.creTeamKey, nameMtext: this.notiDetail.creTeamName, targetContentsKey: JSON.parse(this.notiDetail.userDo).targetKey, targetType: 'chanDetail', value: this.notiDetail })
      }
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
      var history = this.$store.getters.hStack
      var removePage = history[history.length - 1]
      history = history.filter((element, index) => index < history.length - 1)
      this.$store.commit('setRemovePage', removePage)
      this.$store.commit('updateStack', history)
      // 라우트로 현재 path를 구하고 this.route... 이게 chanList인지를 따지고 refresh

      if (reloadYn) {
        this.routerReloadKey += 1
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
      this.$router.push({ path: '/' + page })
    }
  },
  created () {
    const searchParams = new URLSearchParams(location.search)
    // alert(searchParams)
    // eslint-disable-next-line no-unused-vars
    for (const param of searchParams) {
      // alert('targetKind: ' + param[0])
      if (param[0] === 'chanDetail') {
        this.openPop({ targetType: 'chanDetail', targetKey: param[1], teamKey: param[1] })
      } else if (param[0] === 'boardDetail') {
        this.openPop({ targetKey: param[1], targetType: 'boardDetail', contentsKey: param[1], pushOpenYn: true })
      } else if (param[0] === 'pushDetail') {
        this.openPop({ targetKey: param[1], targetType: 'pushDetail', contentsKey: param[1], pushOpenYn: true })
      }
      console.log('targetKey: ' + param[1])
    }
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
