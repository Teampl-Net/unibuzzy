<template>
  <div class="w-100P h-100P listRefresh" >
    <pushPop @closePushPop="closePushPop" @openDetailPop="openDetailPop" v-if="notiDetailShowYn" :detailVal="notiDetail" />
    <loadingCompo v-show="loadingYn" />
    <transition name="showModal">
      <fullModal @reloadPop ="reloadPop" transition="showModal" :style="getWindowSize" @openLoading="this.loadingYn = true" @closeLoading="this.loadingYn = false"  id="gPop0" @closePop="closePop" v-if="this.popShowYn" parentPopN="0" :params="this.popParams" />
    </transition>
    <div @click="showMenuYn = false" v-show="showMenuYn" class="menuBtn"></div>
    <transition name="show_view">
      <TalMenu @openLoading="this.loadingYn = true" transition="show_view" @hideMenu="hideMenu" @openPop="openPop" @goPage="goPage" class="TalmenuStyle" v-if="showMenuYn" />
    </transition>
    <TalHeader @openLoading="this.loadingYn = true" @showMenu="showMenu" class="header_footer headerShadow" :headerTitle="this.headerTitle" style="position: fixed; top: 0; z-index: 99"/>
    <div v-if="reloadYn === false" class="pagePaddingWrap" style="height: calc(100vh);">
      <router-view :routerReloadKey="this.routerReloadKey" @openLoading="this.loadingYn = true" @closeLoading="this.loadingYn = false" class="" style="margin-bottom: 60px" @openPop="openPop" @changePageHeader="changePageHeader" />
    </div>
    <TalFooter @openLoading="this.loadingYn = true" class="header_footer footerShadow" style="position: fixed; bottom: 0; z-index: 99"/>
  </div>
</template>

<script>
// import index from '../../router/index'
// import { onMessage } from '../assets/js/webviewInterface.js'
import pushPop from '../components/popup/Tal_pushDetailPopup.vue'
import TalMenu from '../components/popup/Tal_menu.vue'
import loadingCompo from '../components/Tal_loading.vue'
// import PullToRefresh from 'pulltorefreshjs'

export default {
  data () {
    return {
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
      reloadYn: false
    }
  },
  props: {},
  name: 'mainRouter',
  components: {
    TalMenu,
    loadingCompo,
    pushPop
  },
  beforeUnmount () {
    // PullToRefresh.destroyAll()
  },
  mounted () {
    // console.log('pulltorefreshjs')
    // PullToRefresh.init({
    //   mainElement: '.listRefresh',
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
    }
  },
  methods: {
    reloadPop () {
      this.routerReloadKey += 1
    },
    openDetailPop (params) {
      this.closePushPop()
      this.openPop(params)
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
          this.notiDetail = message.pushMessage
          if (JSON.parse(this.notiDetail).data.targetKind === 'CONT') {
            if (Number(JSON.parse(this.notiDetail).data.creUserKey) === Number(JSON.parse(localStorage.getItem('sessionUser')).userKey)) {
              return
            }
            this.notiDetailShowYn = true
          }
        }
      } catch (err) {
        console.error('메세지를 파싱할수 없음 ' + err)
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
    closePop (reloadYn) {
      // this.$refs.routerViewRef.reload()
      if (reloadYn === true) {
        this.$router.go(0)
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
    document.addEventListener('message', e => this.recvNoti(e))
    window.addEventListener('message', e => this.recvNoti(e))
  }
  // onMessage (data) {
  //   window.nsWebViewBridge.emit('onMessage', data)
  // }
}
</script>

<style scoped>
.test {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.menuBtn{
  width: 100vw;
  height: 100vh;
  background: rgb(0 0 0 / 8%);
  z-index: 999;
  top: 0;
  left: 0;
  position: fixed;
}
.TalmenuStyle {
  height: 100vh;
  top: 0;
  position: fixed;
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
</style>
