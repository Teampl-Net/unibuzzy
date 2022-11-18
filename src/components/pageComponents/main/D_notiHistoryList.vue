<template>
    <div style="width: 100%; height: 100%; padding: 60px 1.5rem; padding-bottom: 0;float: left; background: #fff; overflow: hidden scroll;">
        <p class="notiTitle font18 fontBold commonColor mbottom-05 textLeft">최근 받은 알림</p>
        <notiCompo @clickNoti="goNotiDetail" v-for="(noti, index) in GE_RECENT_NOTI_LIST" :mNotiEle="noti" :key="index" />
    </div>
</template>

<script>
import notiCompo from './D_notiCompo.vue'
export default {
  data () {
    return {
      mNotiList: []
    }
  },
  created () {

  },
  computed: {
    GE_RECENT_NOTI_LIST () {
      return this.$store.getters['D_NOTI/GE_RECENT_NOTI_LIST']
    }
  },
  methods: {
    async goNotiDetail (message) {
      // var isMobile = /Mobi/i.test(window.navigator.userAgent)
      var addVueResult = await this.$recvNotiFromBridge(message, false)
      if (addVueResult === false) {
        alert('해당 컨텐츠를 찾을 수 없습니다.\n나중에 다시 시도해주세요')
        return
      }
      var popHistory = this.$store.getters['D_HISTORY/GE_GPOP_STACK']
      var currentPage = 0
      if (popHistory && popHistory.length > 0) {
        currentPage = popHistory[popHistory.length - 1]
      }
      this.$store.dispatch('D_NOTI/AC_ADD_NEW_NOTI', { notiDetailObj: message, currentPage: currentPage, addVueResult: addVueResult })
    }
  },
  components: {
    notiCompo
  }
}
</script>

<style scoped>

</style>
