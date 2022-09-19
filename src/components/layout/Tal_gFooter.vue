<template>
    <div class="py-3 px-4 TalFooterWrap">
        <div @click="routePage('/')" class="footerRouter col-3">
          <div v-if="this.$route.path === '/'" class="commonColor fontBold text-center font12" >
            <img :src="footerIcon[0].fullIcon"/><p class="font12 fontBold activeFooterMenu" >홈</p>
          </div>
          <div v-else class="commonColor fontBold text-center font12" >
            <img :src="footerIcon[0].icon"/><p class="font12">홈</p>
          </div>
        </div>
        <div @click="routePage('/pushList')" class="footerRouter col-3">
          <div v-if="this.$route.path === '/pushList'" class="commonColor fontBold text-center font12"><img :src="footerIcon[1].fullIcon"/> <p class="font12 activeFooterMenu">알림</p></div>
          <div v-else class="commonColor fontBold text-center font12"><img :src="footerIcon[1].icon"/> <p class="font12" >알림</p></div>
        </div>
        <div @click="routePage('/chanList')" class="footerRouter col-3">
          <div v-if="this.$route.path === '/chanList'" class="commonColor fontBold text-center font12"><img :src="footerIcon[2].fullIcon" /> <p class="font12 activeFooterMenu">채널</p></div>
          <div v-else class="commonColor fontBold text-center font12"><img :src="footerIcon[2].icon"/> <p class="font12" >채널</p></div>
        </div>
        <div @click="routePage('/myPage')" class="footerRouter col-3">
          <div v-if="this.$route.path === '/myPage'" class="commonColor fontBold text-center font12"><img :src="footerIcon[3].fullIcon"/> <p class="font12 activeFooterMenu">내정보</p></div>
          <div v-else class="commonColor fontBold text-center font12"><img :src="footerIcon[3].icon"/> <p class="font12" >내정보</p></div>
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
        { fullIcon: '/resource/footer/icon_alim_fillin.svg', icon: '/resource/footer/icon_alim.svg' },
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
      // alert(page)
      this.activeFooter = page
      // await this.$router.push(page)
      // alert(JSON.stringify(this.$router.currentRoute._rawValue.path))
      await this.$router.push(page)

      /*  var history = 'page' + localStorage.getItem('popHistoryStack').split('$#$').length
      this.$addHistoryStack(history) */
      /* this.$emit('openLoading') */
    }

  }
}

</script>

<style>
.TalFooterWrap{display: flex; box-sizing: border-box; justify-content: flex-start; text-align: left; width: 100%; height: 60px; z-index: 99999999;}
.footerRouter {text-decoration-line: none; }
.footerRouter img{width: 1.2rem}
p{margin-bottom: 0; color: #6768A7;}
.activeFooterMenu{ font-weight: bolder; font-size: 13px;}
</style>
