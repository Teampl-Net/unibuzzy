<template>
  <div class="mainHeaderWrap headerBottom" :style="(ROUTER_PATH && (ROUTER_PATH === '/' || ROUTER_PATH === '/unibuzzy')? 'background: none !important; box-shadow: none !important;' : '') ">
    <div v-if="$route.path !== '/'" v-on:click="goBack" class="fl cursorP mainHeaderBack">
      <img src="@/assets/images/common/icon_back.png" class="fl commonPopBackBtn mleft-05" >
    </div>
    <div v-else v-on:click="showMenu" class="fl cursorP mainHeaderBack">
      <img class="mainMenuIcon" @click="showMenu()" :src="mIconObj.menuIcon"/>
    </div>
    <div class="headerTitleBox">
      <!-- <p class="headerFont fontBold fl w100P headerTitle" :style="pNightYn? 'color: white;':''">{{ pRouterHeaderInfo }}</p> -->
      <p class="textCenter headerFont fontBold fl w100P headerTitle" :style="pNightYn? 'color: white;':''" v-html="mDispTitle? mDispTitle : $t('COMMON_NAME_APP')"></p>
    </div>
    <!-- <div @click="setPortal" class=" cursorP" style="margin-top:5px; height:100%; width:25px;">
        <img :class="{grayscale : !mImagePortal}" :src="require(`@/assets/images/common/fileType_img.svg`)" class="w100P"/>
    </div> -->
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
    pNightYn: Boolean,
    mRouterHeaderText: {}
  },
  data () {
    return {
      mInfoBoxShowYn: false,
      mContentsYn: false,
      mIconObj: {
        menuIcon: require('@/assets/images/common/icon_menu.png'),
        bellIcon: require('@/assets/images/common/icon_bell.svg'),
        likeIcon: require('@/assets/images/common/likeIcon.svg')
      },
      mDispTitle: this.$t('COMMON_NAME_APP')
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
    setPortal () {
      this.mImagePortal = !this.mImagePortal
      const currentScreen = localStorage.getItem('currentScreen') || 'Smain'
      const newScreen = currentScreen === 'Smain' ? 'Imain' : 'Smain'
      localStorage.setItem('currentScreen', newScreen)
      this.$emit('screenToggled', newScreen)
    },
    showMenu () {
      this.$emit('showMenu')
    },
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
      console.log('hh')
      this.$emit('goLogList')
    },
    goFavList () {
      const param = {}
      param.targetType = 'favList'
      param.popHeaderText = this.$t('COMMON_NAME_FAVCHANNEL')
      this.$emit('goFavList', param)
    }
  },
  computed: {
    ROUTER_PATH () {
      return this.$route.path
    }
  },
  watch: {
    mRouterHeaderText: {
      immediate: true,
      handler (val) {
        if (!val) return
        if (val === '더알림' || val === 'The Alim') {
          this.mDispTitle = this.$t('COMMON_NAME_APP')
        } else if (val === '채널' || val === 'Channel') {
          this.mDispTitle = this.$t('COMMON_NAME_CHANNEL')
        } else if (val === '마이페이지' || val === 'My Page') {
          this.mDispTitle = this.$t('COMMON_NAME_MY_PAGE')
        } else if (val === '검색' || val === 'Search') {
          this.mDispTitle = this.$t('COMMON_NAME_SEARCH')
        } else if (val === '오늘의 일' || val === 'To Do') {
          this.mDispTitle = this.$t('COMMON_NAME_TODOLIST')
        } else if (val === '커뮤니티' || val === 'Community') {
          this.mDispTitle = this.$t('COMMON_NAME_COMMUNITY')
        } else {
          this.mDispTitle = val
        }
      }
    },
    GE_LOCALE: {
      immediate: true,
      handler (val) {
        if (this.mRouterHeaderText === '더알림' || this.mRouterHeaderText === 'The Alim') {
          this.mDispTitle = this.$t('COMMON_NAME_APP')
        } else if (this.mRouterHeaderText === '채널' || this.mRouterHeaderText === 'Channel') {
          this.mDispTitle = this.$t('COMMON_NAME_CHANNEL')
        } else if (this.mRouterHeaderText === '마이페이지' || this.mRouterHeaderText === 'My Page') {
          this.mDispTitle = this.$t('COMMON_NAME_MY_PAGE')
        } else if (this.mRouterHeaderText === '검색' || this.mRouterHeaderText === 'Search') {
          this.mDispTitle = this.$t('COMMON_NAME_SEARCH')
        } else if (this.mRouterHeaderText === '오늘의 일' || this.mRouterHeaderText === 'To Do') {
          this.mDispTitle = this.$t('COMMON_NAME_TODOLIST')
        } else if (this.mRouterHeaderText === '커뮤니티' || this.mRouterHeaderText === 'Community') {
          this.mDispTitle = this.$t('COMMON_NAME_COMMUNITY')
        }
      }
    },
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
  background-color:transparent;
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
  /* width:60%;
  min-width:177px; */
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
