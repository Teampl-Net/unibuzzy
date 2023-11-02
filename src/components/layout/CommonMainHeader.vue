<template>
  <div class="mainHeaderWrap headerBottom" v-if="pRouterHeaderInfo" :style="(ROUTER_PATH && (ROUTER_PATH === '/' || ROUTER_PATH === '/unibuzzy')? 'background: none !important; box-shadow: none !important;' : '') ">
    <div v-if="mContentsYn" v-on:click="goBack" class="fl cursorP mainHeaderBack">
      <img src="@/assets/images/common/icon_back.png" class="fl commonPopBackBtn mleft-05" >
    </div>
    <div v-else v-on:click="showMenu" class="fl cursorP mainHeaderBack">
      <img class="mainMenuIcon" @click="showMenu()" :src="mIconObj.menuIcon"/>
    </div>
    <div class="headerTitleBox">
      <p class="headerFont fontBold fl w100P headerTitle" :style="pNightYn? 'color: white;':''">{{ pRouterHeaderInfo }}</p>
    </div>
    <div @click="goLogList" class="cursorP bellIconBox">
      <img :src="mIconObj.bellIcon"/>
    </div>
    <div class="cursorP heartIconBox" @click="goFavList">
      <img :src="mIconObj.likeIcon" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    pRouterHeaderInfo: String,
    pNightYn: Boolean
  },
  data () {
    return {
      mInfoBoxShowYn: false,
      mContentsYn: false,
      mIconObj: {
        menuIcon: require('@/assets/images/common/icon_menu.png'),
        bellIcon: require('@/assets/images/common/icon_bell.svg'),
        likeIcon: require('@/assets/images/common/likeIcon.svg')
      }
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
    },
    pNightYn: {
      handler (val) {
        if (val) {
          this.mIconObj = {
            menuIcon: require('@/assets/images/common/icon_menu_white.png'),
            bellIcon: require('@/assets/images/common/icon_bell_white.svg'),
            likeIcon: require('@/assets/images/common/likeIcon_white.svg')
          }
        } else {
          this.mIconObj = {
            menuIcon: require('@/assets/images/common/icon_menu.png'),
            bellIcon: require('@/assets/images/common/icon_bell.svg'),
            likeIcon: require('@/assets/images/common/likeIcon.svg')
          }
        }
      },
      immediate: true
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
