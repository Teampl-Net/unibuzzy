<template>
  <div class="w-100P h-100P listRefresh"> <!-- v-if="notiDetailShowYn" -->
    <pushPop @closePushPop="closePushPop" @openDetailPop="openDetailPop" v-if="notiDetailShowYn" :detailVal="notiDetail" />
    <loadingCompo v-show="loadingYn" />
    <transition name="showModal">
      <fullModal @successWrite="successWriteBoard" @reloadPop ="reloadPop" transition="showModal" :style="getWindowSize" @openLoading="this.loadingYn = true" @closeLoading="this.loadingYn = false"  id="gPop0" @closePop="closePop" v-if="this.popShowYn" parentPopN="0" :params="this.popParams" />
    </transition>
    <div style="background-color:#00000050; width:100%; height:100vh; position:absolute; top:0; left:0; z-index:1000;" v-if="showMenuYn" @click="hideMenu"/>
    <transition name="show_view">
      <TalMenu @openLoading="this.loadingYn = true" transition="show_view" @hideMenu="hideMenu" @openPop="openPop" @goPage="goPage" class="TalmenuStyle" v-if="showMenuYn" />
    </transition>
    <TalHeader @openLoading="this.loadingYn = true" @showMenu="showMenu" class="header_footer headerShadow" :headerTitle="this.headerTitle" style="position: absolute; top: 0; z-index: 999"/>
    <div v-if="reloadYn === false" :class="{ myPageBgColor : this.headerTitle === '마이페이지' }" class="pagePaddingWrap" style="height: calc(100vh - 60px); overflow: hidden;">
      <router-view :routerReloadKey="this.routerReloadKey" @openLoading="this.loadingYn = true" @closeLoading="this.loadingYn = false" class="" style="margin-bottom: 60px" @openPop="openPop" @changePageHeader="changePageHeader" />
    </div>
    <TalFooter @openLoading="this.loadingYn = true" class="header_footer footerShadow" style="position: absolute; bottom: 0; z-index: 999"/>
  </div>
</template>

<script>
// import index from '../../router/index'
// import { onMessage } from '../assets/js/webviewInterface.js'
// import chanMenu from '../components/popup/chanMenu/Tal_channelMenu.vue'
import pushPop from '../components/popup/push/Tal_pushDetailPopup.vue'
import TalMenu from '../components/popup/common/Tal_menu.vue'
import loadingCompo from '../components/layout/Tal_loading.vue'
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
    loadingCompo,
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
  watch: {
    async deepLinkQueue (value, old) {
      var history = this.$store.getters.hStack
      if (history.length < 2 && (history[0] === 0 || history[0] === undefined)) {
        if (value.length > 0) {
          var target = value[value.length - 1]
          // eslint-disable-next-line no-new-object
          var param = new Object()
          if (target.targetKind === 'pushDetail') {
            var t = target.targetKey
            var paramList = []
            paramList = t.split('?')
            param.targetType = 'chanDetail'
            param.targetKey = paramList[1]
            var followYn = await this.getFollowerYn(paramList[1])
            if (followYn) {
              param.targetContentsKey = paramList[0]
            } else {
              /* // eslint-disable-next-line no-new-object
              param = new Object()
              param.targetType = 'errorPage'
              this.$store.commit('changeDeepLinkQueue', [])
              this.openPop(param) */
            }
            this.$store.commit('changeDeepLinkQueue', [])
            this.openPop(param)
          } else {
            param.targetType = target.targetKind
            param.targetKey = target.targetKey
            this.$store.commit('changeDeepLinkQueue', [])
            this.openPop(param)
          }
        }
      }
    }
  },
  methods: {
    async getFollowerYn (teamKey) {
      var paramMap = new Map()
      paramMap.set('teamKey', teamKey)
      paramMap.set('userKey', JSON.parse(localStorage.getItem('sessionUser')).userKey)
      var result = await this.$commonAxiosFunction({
        url: '/tp.getFollowerList',
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
      this.closePushPop()
      if (params.targetType === 'pushDetail') {
        this.$router.replace({ path: '/pushList' })
      } else {
      }
      this.popParams = params
      this.popShowYn = true
      this.showMenuYn = false
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
          if (this.notiDetail.targetKind === 'CONT') {
            if (Number(this.notiDetail.creUserKey) === Number(JSON.parse(localStorage.getItem('sessionUser')).userKey)) {
              return
            }
            var currentPage = this.$store.getters.hCPage
            if (this.notiDetail.actYn === true) {
              if ((currentPage === 0 || currentPage === undefined)) {
                // alert(JSON.stringify(this.notiDetail.targetKey))
                if (this.notiDetail.actType === 'WR') {
                  this.openPop({ targetKey: this.notiDetail.targetKey, targetType: 'boardDetail', value: this.notiDetail, pushOpenYn: true })
                } else {
                  if (this.notiDetail.actType === 'LI') {
                    this.openPop({ targetKey: this.notiDetail.targetKey, targetType: 'boardDetail', value: this.notiDetail, pushOpenYn: true })
                  }
                }
              } else {
              }
            } else {
              if (JSON.parse(message.pushMessage).arrivedYn === true || JSON.parse(message.pushMessage).arrivedYn === 'true') {
                if ((currentPage === 0 || currentPage === undefined)) {
                  this.notiDetailShowYn = true
                }
              } else {
                if ((currentPage === 0 || currentPage === undefined)) {
                  /* this.$router.replace({ path: '/pushList' }) */
                  this.openPop({ targetKey: this.notiDetail.creTeamKey, nameMtext: this.notiDetail.creTeamName, targetContentsKey: this.notiDetail.targetKey, targetType: 'chanDetail', value: this.notiDetail })
                } else {
                  this.openPop({ targetKey: this.notiDetail.creTeamKey, nameMtext: this.notiDetail.creTeamName, targetContentsKey: this.notiDetail.targetKey, targetType: 'chanDetail', value: this.notiDetail })
                }
              }
            }
          } else if (this.notiDetail.targetKind === 'TEAM') {
            if (Number(this.notiDetail.creUserKey) === Number(JSON.parse(localStorage.getItem('sessionUser')).userKey)) {
              return
            }
            currentPage = this.$store.getters.hCPage
            if ((currentPage === 0 || currentPage === undefined)) {
              this.$router.replace({ path: '/' })
              if (this.notiDetail.actType === 'FL') {
                this.openPop({ targetKey: this.notiDetail.targetKey, targetType: 'chanDetail', value: this.notiDetail, pushOpenYn: true })
              } else if (this.notiDetail.actType === 'ME' || this.notiDetail.actType === 'FM') {
                this.openPop({ targetKey: this.notiDetail.targetKey, targetType: 'chanDetail', value: this.notiDetail, pushOpenYn: true })
              } else if (this.notiDetail.actType === 'MA') {
                this.openPop({ targetKey: this.notiDetail.targetKey, targetType: 'chanDetail', value: this.notiDetail, pushOpenYn: true })
              }
            } else {
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
        this.openPop({ targetKey: this.notiDetail.creTeamKey, nameMtext: this.notiDetail.creTeamName, targetContentsKey: this.notiDetail.targetKey, targetType: 'chanDetail', value: this.notiDetail })
      } else {
        this.openPop({ targetKey: this.notiDetail.creTeamKey, nameMtext: this.notiDetail.creTeamName, targetContentsKey: this.notiDetail.targetKey, targetType: 'chanDetail', value: this.notiDetail })
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
    // eslint-disable-next-line no-unused-vars
    for (const param of searchParams) {
      console.log('targetKind: ' + param[0])
      if (param[0] === 'chanDetail') {
        this.openPop({ targetType: 'chanDetail', targetKey: param[1], teamKey: param[1] })
      } else if (param[0] === 'boardDetail') {
        this.openPop({ targetKey: param[1], targetType: 'boardDetail', contentsKey: param[1], pushOpenYn: true })
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
  animation: show_view-dialog-fade-in 0.5s ease;
}
.show_view-leave {
  animation: show_view-dialog-fade-out 0.5s ease forwards;
}
.show_view-enter-active {
  animation: show_view-dialog-fade-in 0.5s ease;
}
.show_view-leave-active {
  animation: show_view-dialog-fade-out 0.5s ease forwards;
}
@keyframes show_view-dialog-fade-in {
  0% {
    transform: translateX(500px);
  }
  100% {
    transform: translateX(0);
  }
}
@keyframes show_view-dialog-fade-out {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(500px);
  }
}

@media screen and (max-width: 300px) {
  .pagePaddingWrap {
    padding-top: 50px !important;
  }
}

</style>
