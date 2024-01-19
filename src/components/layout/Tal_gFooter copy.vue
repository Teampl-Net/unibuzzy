<template>
    <div class="py-3 px-4 TalFooterWrap">
        <div @click="routePage('main')" class="footerRouter" style="flex: 1 !important">
          <div class="commonColor fontBold text-center font12" >
            <img v-if="this.$route.path === '/'" :src="footerIcon[0].fullIcon"/> <img v-else :src="footerIcon[0].icon"/>
            <p :class="this.$route.path === '/'? 'activeFooterMenu' : 'font12'">{{ $t('COMMON_NAME_HOME') }}</p>
          </div>
        </div>
        <div @click="routePage('todo')" class="footerRouter" style="flex: 1 !important">
          <div class="commonColor fontBold text-center font12" >
            <img v-if="this.$route.path === '/todo'" :src="footerIcon[4].fullIcon"/> <img v-else :src="footerIcon[4].icon"/>
            <p :class="this.$route.path === '/todo'? 'activeFooterMenu' : 'font12'">{{$t('COMMON_NAME_TODOLIST')}}</p>
          </div>
        </div>
        <!-- <div @click="routePage('/pushList')" class="footerRouter col-3">
          <div class="commonColor fontBold text-center font12">
            <img v-if="this.$route.path === '/pushList'" :src="footerIcon[1].fullIcon"/> <img v-else :src="footerIcon[1].icon"/>
            <p :class="this.$route.path === '/pushList'? 'activeFooterMenu' : 'font12'">알림</p>
          </div>
        </div> -->
        <div @click="routePage('chanList')" class="footerRouter" style="flex: 1 !important">
          <div class="commonColor fontBold text-center font12">
            <img v-if="this.$route.path === '/chanList'" :src="footerIcon[2].fullIcon" /> <img v-else :src="footerIcon[2].icon"/>
            <p :class="this.$route.path === '/chanList'? 'activeFooterMenu' : 'font12'">{{ $t('COMMON_NAME_CHANNEL') }}</p>
          </div>
        </div>
        <!-- <div @click="routePage('search')" class="footerRouter" style="flex: 1 !important">
          <div class="commonColor fontBold text-center font12">
            <img v-if="this.$route.path === '/search'" :src="footerIcon[1].fullIcon" /> <img v-else :src="footerIcon[1].icon"/>
            <p :class="this.$route.path === '/search'? 'activeFooterMenu' : 'font12'">{{ $t('COMMON_NAME_SEARCH') }}</p>
          </div>
        </div> -->
        <div @click="routePage('myPage')" class="footerRouter" style="flex: 1 !important">
          <div class="commonColor fontBold text-center font12">
            <img v-if="this.$route.path === '/myPage'" :src="footerIcon[3].fullIcon"/> <img v-else :src="footerIcon[3].icon"/>
            <p :class="this.$route.path === '/myPage'? 'activeFooterMenu' : 'font12'">{{ $t('COMMON_NAME_MY_INFO') }}</p>
          </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'TalFooter',
  data () {
    return {
      footerIcon: [
        { fullIcon: '/resource/footer/icon_home_fillin.svg', icon: '/resource/footer/icon_home.svg' },
        // { fullIcon: '/resource/footer/icon_alim_fillin.svg', icon: '/resource/footer/icon_alim.svg' },
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
      return this.$store.getters['D_USER/GE_USER']
    }
  },
  methods: {
    async routePage (page) {
      /* if ('/' + page === this.$router.currentRoute._rawValue.path) {
        return
      } */
      if ((page === 'myPage' || page === 'todo') && this.GE_USER.unknownYn) {
        // this.$showToastPop('로그인 후 이용해주세요')
        this.pOpenUnknownLoginPop()
        return/*
        this.activeFooter = 'unknownMypage'
        // await this.$router.push(page)
        this.$emit('changeRouterPath', 'unknownMypage')
        return */
      }
      this.activeFooter = page
      if (this.pChangePageHeader) {
        let page = null
        if (page === 'chanList') {
          page = '채널'
        } else if (page === 'search') {
          page = '검색'
        } else if (page === 'myPage') {
          page = '마이페이지'
        } else if (page === 'todo') {
          page = '오늘의일'
        }
        if (page) this.pChangePageHeader(page)
      }
      // await this.$router.push(page)
      console.log('page, page', page)
      this.$emit('changeRouterPath', page)

      /*  var history = 'page' + localStorage.getItem('popHistoryStack').split('$#$').length
      this.$addHistoryStack(history) */
      /* this.$emit('openLoading') */
    }

  }
}

</script>

<style>
.TalFooterWrap{display: flex; box-sizing: border-box; background: #d1e1f2!important; justify-content: flex-start; text-align: left; width: 100%; height: 60px; z-index: 99;}
.footerRouter {text-decoration-line: none; }
.footerRouter img{width: 1.4rem}
p{margin-bottom: 0; color: #7E7E7E;}
.activeFooterMenu{ font-weight: bolder; font-size: 13px; color: rgb(74 102 158) !important;}
</style>
