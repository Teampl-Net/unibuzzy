<template>
  <!-- <div class="w100P " style="position: fixed; top: 0; left: 0; height: 60px; background: none; z-index: 9; display: flex; align-items: center; justify-content: center;"> -->
  <div class="mainHeaderWrap" v-if="pRouterHeaderInfo">
    <div v-if="pContentsYn" v-on:click="goBack" class="fl cursorP" style="min-width: 25px; height: 100%; position: absolute; display: flex; justify-content: flex-start; align-items: center; left: 1rem;">
      <img src="../../../assets/images/common/icon_back.png" class="fl commonPopBackBtn mleft-05" >
    </div>
    <div v-else v-on:click="showMenu" class="fl cursorP " style="min-width: 25px; height: 100%; position: absolute; display: flex; justify-content: flex-start; align-items: center; left: 1rem;">
      <img class="mainMenuIcon" height="20" @click="showMenu()" src="../../../assets/images/common/icon_menu.png"/>
    </div>
    <!-- <img v-if="pRouterHeaderInfo.logoImg" :src="pRouterHeaderInfo.logoImg" height="30" style="margin-right: 5px; border: 2px solid white; background: white; border-radius: 100%; -webkit-user-drag: none;" /> -->
    <p v-if="$route.path === '/'" class="headerFont fontBold fl" style="color: #062bb5;" v-html="`${pRouterHeaderInfo} Town`"></p>
    <p v-else class="headerFont fontBold fl" style="color: #062bb5;" v-html="pRouterHeaderInfo"></p>
    <div @click="goLogList" class="cursorP" style="width: 44px; height: 44px; right: 70px; position: absolute; display: flex; align-items: center; justify-content: center;">
      <img height=20 src="../../../assets/images/common/icon_bell.svg"/>
    </div>
    <div class="cursorP" @click="goFavList" style="width: 44px; height: 44px; position: absolute; right: 20px; display: flex; align-items: center; justify-content: center;">
      <img src="../../../assets/images/common/likeIcon.svg" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    pRouterHeaderInfo: String,
    pContentsYn: Boolean
  },
  components: {
  },
  data () {
    return {
      mInfoBoxShowYn: false
    }
  },
  methods: {
    hasHistory () {
      return window.history.length > 1
    },
    async goBack () {
      if (this.hasHistory()) {
        this.$router.go(-1)
      } else {
        this.$router.push('/')
      }
      // this.$router.go(-1)
      // this.$router.replace({ path: '/' })
    },
    closePop () {
      this.mInfoBoxShowYn = false
    },
    openPop (value) {
      this.mInfoBoxShowYn = false
    },
    goLogList () {
      const param = {}
      param.targetType = 'logList'
      param.popHeaderText = '알림이력'
      this.$emit('goLogList', param)
    },
    openPage (param) {
      this.$emit('openPage', param)
    },
    goFavList () {
      const param = {}
      param.targetType = 'favList'
      param.popHeaderText = '채널 즐겨찾기'
      this.$emit('goFavList', param)
    },
    showMenu () {
      this.$emit('showMenu')
    }
  }
}
</script>

<style>
.mainHeaderWrap {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0.7rem;
  padding-right: 1rem;
  text-align: left;
  width: calc(100% + 1px);
}
/* .mainMenuIcon{width: 1.8rem; margin-top: 5px; -webkit-user-drag: none;} */
.mainHeaderLogo{width: 1.7rem; margin: 0 0.4rem; -webkit-user-drag: none;}
.menuBtn { height: 20px; position: absolute; left: 20px; -webkit-user-drag: none; }
</style>
