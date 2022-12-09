<template>
    <div style="width: 100%; height: 100%; padding: 60px 1.5rem; padding-bottom: 0;float: left; background: #fff; overflow: hidden scroll;">
        <p class="notiTitle font18 fontBold commonColor textLeft">최근 받은 알림</p>
        <p class="font10 lightGray textLeft fl">최근 이력은 앱 설치 후 받은 알림 이력이며, 앱 삭제 혹은 데이터 삭제 시 사라지게 됩니다.</p>
        <p class="font10 lightGray mbottom-05 textLeft fr" @click="mConfirmPopShowYn = true">전체 삭제 </p>
        <notiCompo @clickNoti="goNotiDetail" v-for="(noti, index) in GE_RECENT_NOTI_LIST" :mNotiEle="noti" :key="index" />
        <gConfirmPop confirmText='받은 이력을 전부 삭제하시겠습니까?' confirmType='two' @no='mConfirmPopShowYn = false' v-if="mConfirmPopShowYn" @ok="notiClear"/>
    </div>
</template>

<script>
import notiCompo from './D_notiCompo.vue'
export default {
  data () {
    return {
      mNotiList: [],
      mConfirmPopShowYn: false
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
    notiClear () {
      this.$store.dispatch('D_NOTI/AC_CLEAR_NOTI_LIST')
      this.mConfirmPopShowYn = false
    },
    async goNotiDetail (message) {
      message.clickListYn = true
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
