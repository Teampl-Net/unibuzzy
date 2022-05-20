<template>
    <div class="py-3 px-4 TalFooterWrap" >
        <div @click="routePage('/')" class="footerRouter col-3"> <div class="commonColor fontBold text-center" ><img src="../../assets/images/common/icon_home.png"/><p :class="{activeFooterMenu : activeFooter === '/'}">홈</p></div></div>
        <div @click="routePage('/pushList')" class="footerRouter col-3"><div class="commonColor fontBold text-center"><img src="../../assets/images/common/icon_notice.png"/> <p :class="{activeFooterMenu : activeFooter === '/pushList'}">알림</p></div></div>
        <div @click="routePage('/chanList')" class="footerRouter col-3"><div class="commonColor fontBold text-center"><img src="../../assets/images/common/icon_subscribe.png"/><p :class="{activeFooterMenu : activeFooter === '/chanList'}">채널</p></div></div>
        <div @click="routePage('/setMypage')" class="footerRouter col-3"><div class="commonColor fontBold text-center"><img src="../../assets/images/common/icon_setting.png"/> <p :class="{activeFooterMenu : activeFooter === '/setMypage'}">설정</p></div></div>
    </div>
</template>
<script>

export default {
  name: 'TalFooter',
  methods: {
    routePage (page) {
      this.activeFooter = page
      if (page === this.$router.currentRoute._rawValue.path) {
        return
      }
      this.$emit('openLoading')
      var history = 'page' + localStorage.getItem('popHistoryStack').split('$#$').length
      this.$addHistoryStack(history)
      this.$router.push(page)
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
.TalFooterWrap{display: flex; box-sizing: border-box; justify-content: flex-start; text-align: left; width: 100%; height: 60px;}
.footerRouter {text-decoration-line: none; }
.footerRouter img{width: 1.2rem}
p{font-size: 12px; margin-bottom: 0; color: #6768A7;}
/* .activeFooterMenu{ color: #4a4b93; font-size: 14px;} */
</style>
