<template>
  <div class="py-3 px-4 TalFooterWrap" :style="$route.path === '/' || $route.path === '/unibuzzy'? 'background: #E9F1F6B3':'background: #fff;'">
    <div @click="routePage('main')" class="footerRouter flex1">
      <div class="commonColor fontBold text-center font12">
        <img v-if="this.$route.path === '/'" :src="footerIcon[0].fullIcon" /> <img v-else :src="footerIcon[0].icon" />
        <p :class="this.$route.path === '/' ? 'activeFooterMenu' : 'font12'">{{ $t('COMMON_NAME_HOME') }}</p>
      </div>
    </div>
    <div @click="routePage('todo')" class="footerRouter" style="flex: 1 !important">
          <div class="commonColor fontBold text-center font12" >
            <img v-if="this.$route.path === '/todo'" :src="footerIcon[4].fullIcon"/> <img v-else :src="footerIcon[4].icon"/>
            <p :class="this.$route.path === '/todo'? 'activeFooterMenu' : 'font12'">To Do</p>
          </div>
        </div>
    <div @click="routePage('chanList')" class="footerRouter flex1">
      <div class="commonColor fontBold text-center font12">
        <img v-if="this.$route.path === '/chanList'" :src="footerIcon[2].fullIcon" /> <img v-else :src="footerIcon[2].icon" />
        <p :class="this.$route.path === '/chanList' ? 'activeFooterMenu' : 'font12'">{{ $t('COMMON_NAME_CHANNELS') }}</p>
      </div>
    </div>
    <!-- <div class="footerRouter" style="flex: 1 !important">
      <div class="commonColor fontBold text-center font12">
        <img v-if="this.$route.path === undefined" :src="footerIcon[2].fullIcon" /> <img v-else :src="footerIcon[2].icon" />
        <p :class="this.$route.path === undefined ? 'activeFooterMenu' : 'font12'">HOT</p>
      </div>
    </div> -->
    <div @click="routePage('search')" class="footerRouter flex1">
      <div class="commonColor fontBold text-center font12">
        <img v-if="this.$route.path === '/search'" :src="footerIcon[1].fullIcon" /> <img v-else :src="footerIcon[1].icon" />
        <p :class="this.$route.path === '/search' ? 'activeFooterMenu' : 'font12'">{{ $t('COMMON_NAME_SEARCH') }}</p>
      </div>
    </div>
    <div @click="routePage('myPage')" class="footerRouter flex1">
      <div class="commonColor fontBold text-center font12">
        <img v-if="this.$route.path === '/myPage'" :src="footerIcon[3].fullIcon" /> <img v-else :src="footerIcon[3].icon" />
        <p :class="this.$route.path === '/myPage' ? 'activeFooterMenu' : 'font12'">{{ $t('COMMON_NAME_MY_INFO') }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'UBFooter',
  data () {
    return {
      footerIcon: [
        { fullIcon: '/resource/footer/icon_home_fillin.svg', icon: '/resource/footer/icon_home.svg' },
        { fullIcon: '/resource/footer/icon_search_fillin.svg', icon: '/resource/footer/icon_search.svg' },
        { fullIcon: '/resource/footer/icon_channel_fillin.svg', icon: '/resource/footer/icon_channel.svg' },
        { fullIcon: '/resource/footer/icon_people_fillin.svg', icon: '/resource/footer/icon_people.svg' },
        { fullIcon: '/resource/footer/icon_todo_fillin.svg', icon: '/resource/footer/icon_todo.svg' }
      ],
      activeFooter: 'main'
    }
  },
  props: {
    pOpenUnknownLoginPop: Function,
    pChangePageHeader: Function
  },
  computed: {
    GE_USER () {
      return this.$store.getters['UB_USER/GE_USER']
    }
  },
  methods: {
    async routePage (page) {
      if ((this.$route.path === '/' || this.$route.path === '/unibuzzy') && page === 'main') {
        return false
      }
      if ((page === 'myPage' || page === 'todo') && this.GE_USER.unknownYn) {
        this.pOpenUnknownLoginPop()
        return
      }
      this.activeFooter = page
      if (this.pChangePageHeader) {
        let page = '메인'
        if (page === 'chanList') {
          page = '채널'
        } else if (page === 'search') {
          page = '검색'
        } else if (page === 'myPage') {
          page = '마이페이지'
        } else if (page === 'todo') {
          page = '오늘의일'
        }
        this.pChangePageHeader(page)
      }
      this.$emit('changeRouterPath', page)
    }

  }
}

</script>

<style scoped>
.TalFooterWrap {
  display: flex;
  box-sizing: border-box;
  justify-content: flex-start;
  text-align: left;
  width: 100%;
  height: 60px;
  z-index: 999 !important;
}

.footerRouter {
  text-decoration-line: none;
}

.footerRouter img {
  width: 1.4rem
}

/* p {
  margin-bottom: 0;
  color: #7E7E7E;
} */

.activeFooterMenu {
  font-weight: bold;
  font-size: 13px;
  color: #2234A8 !important;
}
.flex1 {
  flex: 1 !important;
}
img {
  width: 25px;
  height: 25px;
}
</style>
