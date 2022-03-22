<template>
    <fullModal id="commonWrap1" @closePop="closePop" v-if="this.popShowYn" :parentPopN="this.parentPopN" :params="this.popParams" />
    <pushModal id="pushPopWrap" ref="pushPopWrap"  @closeXPushPop="closeXPushPop" :params="this.pushPopShowYn" v-if="this.pushPopShowYn"/>
    <TalMenu @hideMenu= "hideMenu" @openPop="openPop" @goPage="goPage" class="TalmenuStyle" v-if="showMenuYn" style=""/>
    <TalHeader  @showMenu= "showMenu" class="header_footer headerShadow" :headerTitle="this.headerTitle" style="position: fixed; top:0; z-index: 9999" />
    <router-view class="" style=" margin-bottom: 60px" @openPop = "openPop" @changePageHeader="changePageHeader"/>
    <TalFooter class="header_footer footerShadow" style="position: fixed; bottom:0; z-index: 9999"/>
</template>

<script>

// import index from '../../router/index'
import { onMessage } from '../assets/js/webviewInterface.js'
import TalMenu from '../components/popup/Tal_menu.vue'
export default {
  data () {
    return {
      popShowYn: false,
      parentPopN: 0,
      showMenuYn: false,
      pushPopShowYn: false,
      pushPopParams: '',
      popParams: '',
      headerTitle: ''
    }
  },
  props: {
  },
  name: 'mainRouter',
  components: {
    TalMenu
  },
  mounted () {
    onMessage('REQ', 'getUserInfo')
  },
  methods: {
    showMenu () {
      this.showMenuYn = true
    },
    hideMenu () {
      this.showMenuYn = false
    },
    openPop (params) {
      this.showMenuYn = false
      this.popParams = params
      this.popShowYn = true
    },
    openPushPop (params) {
      alert(true)
      this.pushPopParams = params
      this.pushPopShowYn = true
    },
    closePop () {
      this.popShowYn = false
    },
    closeXPushPop () {
      this.pushPopShowYn = false
    },
    changePageHeader (title) {
      this.headerTitle = title
    },
    goPage (page) {
      alert(page)
      this.showMenuYn = false
      this.$router.push({ path: '/' + page })
    }
  }
  // onMessage (data) {
  //   window.nsWebViewBridge.emit('onMessage', data)
  // }

}
</script>

<style scoped>
  .test{ display:flex; justify-content: center; align-items: center; height:100vh; }
  .TalmenuStyle{height: 100vh; top:0; position: fixed; padding: 0 2rem; box-sizing: border-box; width: 80%; background-color: #6768A7; color: #FFFFFF; z-index: 999999; right: 0;}
</style>
