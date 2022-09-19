<template>
    <div class="py-3 px-4 TalFooterWrap" >
        <div @click="routePage('/')" class="footerRouter col-3">
          <div v-if="this.$route.path === '/'" class="commonColor fontBold text-center font12" >
            <img src="../../assets/images/footer/icon_home_fillin.svg"/><p class="font12 fontBold activeFooterMenu" >홈</p>
          </div>
          <div v-else class="commonColor fontBold text-center font12" >
            <img src="../../assets/images/footer/icon_home.svg"/><p class="font12">홈</p>
          </div>
        </div>
        <div @click="routePage('/pushList')" class="footerRouter col-3">
          <div v-if="this.$route.path === '/pushList'" class="commonColor fontBold text-center font12"><img src="../../assets/images/footer/icon_alim_fillin.svg"/> <p class="font12 activeFooterMenu">알림</p></div>
          <div v-else class="commonColor fontBold text-center font12"><img src="../../assets/images/footer/icon_alim.svg"/> <p class="font12" >알림</p></div>
        </div>
        <div @click="routePage('/chanList')" class="footerRouter col-3">
          <div v-if="this.$route.path === '/chanList'" class="commonColor fontBold text-center font12"><img src="../../assets/images/footer/icon_channel_fillin.svg"/> <p class="font12 activeFooterMenu">채널</p></div>
          <div v-else class="commonColor fontBold text-center font12"><img src="../../assets/images/footer/icon_channel.svg"/> <p class="font12" >채널</p></div>
        </div>
        <div @click="routePage('/myPage')" class="footerRouter col-3">
          <div v-if="this.$route.path === '/myPage'" class="commonColor fontBold text-center font12"><img src="../../assets/images/footer/icon_people_fillin.svg"/> <p class="font12 activeFooterMenu">내정보</p></div>
          <div v-else class="commonColor fontBold text-center font12"><img src="../../assets/images/footer/icon_people.svg"/> <p class="font12" >내정보</p></div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'TalFooter',
  methods: {
    async routePage (page) {
      if (page === this.$router.currentRoute._rawValue.path) {
        return
      }
      // await this.$router.push(page)
      this.$router.replace(page)

      /*  var history = 'page' + localStorage.getItem('popHistoryStack').split('$#$').length
      this.$addHistoryStack(history) */
      this.activeFooter = page
      /* this.$emit('openLoading') */
    }

  },
  data () {
    return {
      activeFooter: '/'
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
