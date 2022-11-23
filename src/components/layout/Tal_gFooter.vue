<template>
    <div class="py-3 px-4 TalFooterWrap">
        <div @click="routePage('/')" class="footerRouter" style="flex: 1 !important">
          <div class="commonColor fontBold text-center font12" >
            <img v-if="this.$route.path === '/'" :src="footerIcon[0].fullIcon"/> <img v-else :src="footerIcon[0].icon"/>
            <p :class="this.$route.path === '/'? 'activeFooterMenu' : 'font12'">홈</p>
          </div>
        </div>
        <!-- <div @click="routePage('/pushList')" class="footerRouter col-3">
          <div class="commonColor fontBold text-center font12">
            <img v-if="this.$route.path === '/pushList'" :src="footerIcon[1].fullIcon"/> <img v-else :src="footerIcon[1].icon"/>
            <p :class="this.$route.path === '/pushList'? 'activeFooterMenu' : 'font12'">알림</p>
          </div>
        </div> -->
        <div @click="routePage('/chanList')" class="footerRouter" style="flex: 1 !important">
          <div class="commonColor fontBold text-center font12">
            <img v-if="this.$route.path === '/chanList'" :src="footerIcon[2].fullIcon" /> <img v-else :src="footerIcon[2].icon"/>
            <p :class="this.$route.path === '/chanList'? 'activeFooterMenu' : 'font12'">채널</p>
          </div>
        </div>
        <!-- <div @click="routePage('/search')" class="footerRouter" style="flex: 1 !important">
          <div class="commonColor fontBold text-center font12">
            <img v-if="this.$route.path === '/search'" :src="footerIcon[1].fullIcon" /> <img v-else :src="footerIcon[1].icon"/>
            <p :class="this.$route.path === '/search'? 'activeFooterMenu' : 'font12'">검색</p>
          </div>
        </div> -->
        <div @click="routePage('/myPage')" class="footerRouter" style="flex: 1 !important">
          <div class="commonColor fontBold text-center font12">
            <img v-if="this.$route.path === '/myPage'" :src="footerIcon[3].fullIcon"/> <img v-else :src="footerIcon[3].icon"/>
            <p :class="this.$route.path === '/myPage'? 'activeFooterMenu' : 'font12'">내정보</p>
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
        { fullIcon: '/resource/footer/icon_people_fillin.svg', icon: '/resource/footer/icon_people.svg' }
      ],
      activeFooter: '/'
    }
  },
  methods: {
    async routePage (page) {
      if (page === this.$router.currentRoute._rawValue.path) {
        return
      }
      this.activeFooter = page
      // await this.$router.push(page)
      this.$emit('changeRouterPath', page)

      /*  var history = 'page' + localStorage.getItem('popHistoryStack').split('$#$').length
      this.$addHistoryStack(history) */
      /* this.$emit('openLoading') */
    }

  }
}

</script>

<style>
.TalFooterWrap{display: flex; box-sizing: border-box; justify-content: flex-start; text-align: left; width: 100%; height: 60px; z-index: 99;}
.footerRouter {text-decoration-line: none; }
.footerRouter img{width: 1.4rem}
p{margin-bottom: 0; color: #7E7E7E;}
.activeFooterMenu{ font-weight: bolder; font-size: 13px; color: #6768A7 !important;}
</style>
