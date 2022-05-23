<template ref="ttttt">
  <div>
    <pushPop @closePushPop="closePushPop" @openDetailPop="openDetailPop" v-if="notiDetailShowYn" :detailVal="notiDetail" />
    <loadingCompo v-show="loadingYn" />
    <transition name="showModal">
      <fullModal transition="showModal" :style="getWindowSize" @openLoading="this.loadingYn = true" @closeLoading="this.loadingYn = false"  id="gPop0" @closePop="closePop" v-if="this.popShowYn" parentPopN="0" :params="this.popParams" />
    </transition>
    <pushModal
      @openLoading="this.loadingYn = true"
      @closeLoading="this.loadingYn = false"
      id="pushPopWrap"
      ref="pushPopWrap"
      @closeXPushPop="closeXPushPop"
      :params="this.pushPopShowYn"
      v-if="this.pushPopShowYn"
    />
    <div
      @click="showMenuYn = false"
      v-show="showMenuYn"
      style="
        width: 100vw;
        height: 100vh;
        background: rgb(0 0 0 / 8%);
        z-index: 999;
        top: 0;
        left: 0;
        position: fixed;
      "
    ></div>
    <transition name="show_view">
      <TalMenu
        @openLoading="this.loadingYn = true"
        transition="show_view"
        @hideMenu="hideMenu"
        @openPop="openPop"
        @goPage="goPage"
        class="TalmenuStyle"
        v-if="showMenuYn"
      />
    </transition>
    <TalHeader
      @openLoading="this.loadingYn = true"
      @showMenu="showMenu"
      class="header_footer headerShadow"
      :headerTitle="this.headerTitle"
      style="position: fixed; top: 0; z-index: 99"
    />
    <div class="pagePaddingWrap">
      <router-view
        :reloadKey="this.routerReloadKey"
        @openLoading="this.loadingYn = true"
        @closeLoading="this.loadingYn = false"
        class=""
        style="margin-bottom: 60px"
        @openPop="openPop"
        @changePageHeader="changePageHeader"
      />
    </div>
    <TalFooter
      @openLoading="this.loadingYn = true"
      class="header_footer footerShadow"
      style="position: fixed; bottom: 0; z-index: 99"
    />
  </div>
</template>

<script>
// import index from '../../router/index'
// import { onMessage } from '../assets/js/webviewInterface.js'
import pushPop from '../components/popup/Tal_pushDetailPopup.vue'
import TalMenu from '../components/popup/Tal_menu.vue'
import loadingCompo from '../components/Tal_loading.vue'
export default {
  data () {
    return {
      popShowYn: false,
      parentPopN: 0,
      showMenuYn: false,
      pushPopShowYn: false,
      pushPopParams: '',
      popParams: '',
      headerTitle: '',
      loadingYn: true,
      routerReloadKey: 0,
      notiDetail: '',
      notiDetailShowYn: false
    }
  },
  props: {},
  name: 'mainRouter',
  components: {
    TalMenu,
    loadingCompo,
    pushPop
  },
  mounted () {
    // onMessage('REQ', 'getUserInfo')
  },
  computed: {
    getWindowSize () {
      return {
        '--widndowWidth': window.innerWidth + 'px'
      }
    }
  },
  methods: {
    openDetailPop (params) {
      this.closePushPop()
      this.openPop(params)
    },
    closePushPop () {
      this.notiDetailShowYn = false
    },
    recvNoti (e) {
      // alert(JSON.parse(e.data).type)
      if (JSON.parse(e.data).type === 'pushmsg') {
        // alert(JSON.stringify(JSON.parse(e.data).pushMessage))
        this.notiDetail = JSON.parse(e.data).pushMessage
        this.notiDetailShowYn = true
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
    openPushPop (params) {
      this.pushPopParams = params
      this.pushPopShowYn = true
    },
    closePop (reloadYn) {
      // this.$refs.routerViewRef.reload()
      //  alert(true)
      this.routerReloadKey += 1
      if (reloadYn === true) {
        this.$router.go(0)
      }
      this.popShowYn = false
    },
    closeXPushPop () {
      this.pushPopShowYn = false
    },
    changePageHeader (title) {
      this.headerTitle = title
    },
    goPage (page) {
      // alert(page)
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
