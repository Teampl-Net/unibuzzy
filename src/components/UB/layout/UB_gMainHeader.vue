<template>
  <!-- <div class="w100P " style="position: fixed; top: 0; left: 0; height: 60px; background: none; z-index: 9; display: flex; align-items: center; justify-content: center;"> -->
  <div class="mainHeaderWrap headerBottom" v-if="pRouterHeaderInfo" :style="(ROUTER_PATH && (ROUTER_PATH === '/' || ROUTER_PATH === '/unibuzzy')? 'background: none !important; box-shadow: none !important;' : '') ">
    <div v-if="mContentsYn" v-on:click="goBack" class="fl cursorP mainHeaderBack">
      <img src="../../../assets/images/common/icon_back.png" class="fl commonPopBackBtn mleft-05" >
    </div>
    <div v-else v-on:click="showMenu" class="fl cursorP mainHeaderBack">
      <img class="mainMenuIcon" @click="showMenu()" src="../../../assets/images/common/icon_menu.png"/>
    </div>
    <!-- <img v-if="pRouterHeaderInfo.logoImg" :src="pRouterHeaderInfo.logoImg" height="30" style="margin-right: 5px; border: 2px solid white; background: white; border-radius: 100%; -webkit-user-drag: none;" /> -->
    <div class="headerTitleBox">
      <!-- <p v-if="$route.path === '/'" class="headerFont fontBold fl w100P" style="overflow:hidden; white-space:nowrap; text-overflow:ellipsis; color: #062bb5;">{{ pRouterHeaderInfo }}</p> -->
      <p class="headerFont fontBold fl w100P headerTitle">{{ pRouterHeaderInfo }}</p>
    </div>
    <div @click="goLogList" class="cursorP bellIconBox">
      <img src="../../../assets/images/common/icon_bell.svg"/>
    </div>
    <div class="cursorP heartIconBox" @click="goFavList">
      <img src="../../../assets/images/common/likeIcon.svg" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    pRouterHeaderInfo: String
  },
  components: {
  },
  data () {
    return {
      mInfoBoxShowYn: false,
      mContentsYn: false
    }
  },
  created () {
    if (this.ROUTER_PATH.includes('contents')) {
      this.mContentsYn = true
    } else {
      this.mContentsYn = false
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
  },
  computed: {
    ROUTER_PATH () {
      return this.$route.path
    }
  },
  watch: {
    ROUTER_PATH: {
      handler (val) {
        if (!val) return
        if (val.includes('contents')) {
          this.mContentsYn = true
        } else {
          this.mContentsYn = false
        }
      }
    }
  }
}
</script>

<style scoped>
.mainHeaderWrap {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0.7rem;
  padding-right: 1rem;
  text-align: left;
  width: calc(100% + 1px);
  background-color:#fff;
}
.mainHeaderBack {
  min-width: 25px;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  left: 1rem;
}
.headerTitleBox {
  width:60%;
  min-width:177px;
}
.headerTitle {
  overflow:hidden;
  white-space:nowrap;
  text-overflow:ellipsis;
  color: #062bb5;
}
.bellIconBox {
  height: 44px;
  right: 55px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
}
.heartIconBox {
  height: 44px;
  position: absolute;
  right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}
img {
  height: 20px;
}
/* .mainMenuIcon{width: 1.8rem; margin-top: 5px; -webkit-user-drag: none;} */
.mainHeaderLogo {
  width: 1.7rem;
  margin: 0 0.4rem;
  -webkit-user-drag: none;
}
.menuBtn {
  height: 20px;
  position: absolute;
  left: 20px;
  -webkit-user-drag: none;
}
</style>
