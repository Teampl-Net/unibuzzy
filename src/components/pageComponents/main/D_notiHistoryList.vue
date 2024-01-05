<i18n>
{
  "ko": {
    "RECE_TITLE_NOTI": "최근 받은 쪽지",
    "RECE_MSG_NOTIDESC": "최근 이력은 앱 설치 후 받은 쪽지 이력이며, 앱 삭제 혹은 데이터 삭제 시 사라지게 됩니다.",
    "RECE_BTN_DELETE": "전체 삭제",
    "RECE_MSG_DELETE": "받은 이력을 전부 삭제하시겠습니까?"
  },
  "en": {
    "RECE_TITLE_NOTI": "Recent Notifications",
    "RECE_MSG_NOTIDESC": "Recent Activities shows notifications you received after you install Hybric app, so if you delete an app or data, it disappears.",
    "RECE_BTN_DELETE": "Delete All",
    "RECE_MSG_DELETE": "Are you sure you want to delete all received history?"
  }
}
</i18n>
<template>
    <div style="width: 100%; height: 100%; padding: 60px 1.5rem; padding-bottom: 0;float: left; background: #fff; overflow: hidden scroll;">
        <p class="notiTitle font18 fontBold commonColor textLeft">{{ $t('RECE_TITLE_NOTI') }}</p>
        <p class="font10 lightGray textLeft fl">{{ $t('RECE_MSG_NOTIDESC') }}</p>
        <p class="font10 lightGray mbottom-05 textLeft fr" @click="mConfirmPopShowYn = true">{{ $t('RECE_BTN_DELETE') }}</p>
        <notiCompo @clickNoti="goNotiDetail" v-for="(noti, index) in GE_RECENT_NOTI_LIST" :mNotiEle="noti" :key="index" />
        <gConfirmPop :confirmText="$t('RECE_MSG_DELETE')" confirmType='two' @no='mConfirmPopShowYn = false' v-if="mConfirmPopShowYn" @ok="notiClear"/>
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
        this.$showToastPop(this.$t('COMMON_MSG_NOTFOUND'))
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
