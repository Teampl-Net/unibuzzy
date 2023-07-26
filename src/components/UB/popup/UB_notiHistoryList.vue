<i18n>
{
  "ko": {
    "RECE_TITLE_NOTI": "최근 받은 알림",
    "RECE_MSG_NOTIDESC": "최근 이력은 앱 설치 후 받은 알림 이력이며, 앱 삭제 혹은 데이터 삭제 시 사라지게 됩니다.",
    "RECE_BTN_DELETE": "전체 삭제",
    "RECE_MSG_DELETE": "받은 이력을 전부 삭제하시겠습니까?"
  },
  "en": {
    "RECE_TITLE_NOTI": "Recent Notifications",
    "RECE_MSG_NOTIDESC": "Recent Activities shows notifications you received after you install uniBuzzy app, so if you delete an app or data, it disappears.",
    "RECE_BTN_DELETE": "Delete All",
    "RECE_MSG_DELETE": "Are you sure you want to delete all received history?"
  }
}
</i18n>
<template>
    <div class="transWhite" style="border-radius: 10px; width: 90%; height: 80%; position: absolute; top: 10%; left: 5%; z-index: 10000; padding: 10px 20px; padding-bottom: 0;float: left;">
        <div class="font25 fontBold w100P" style="height: 50px; display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; width: calc(100% - 25px);">
            <img style="width: 20px; margin-right: 5px;" src="@/assets/images/footer/icon_alim_fillin.svg" alt="">
            <p class="textOverdot textLeft mleft-05" style="width: calc(100% - 40px); padding: none!important;">{{ $t('RECE_TITLE_NOTI')  }}</p>
          </div>
          <div class="cursorP" @click="closeXPop" style="width: 25px;">
            <img style="width: 25px;" src="../../../assets/images/common/popup_close.png" alt="">
          </div>
        </div>
        <div class="w100P flexCenter" style="flex-direction: column; height: calc(100% - 80px); overflow: auto; padding: 10px;">
          <p class="font14 lightGray textLeft fl" style="margin-botom: 30px !important;">{{ $t('RECE_MSG_NOTIDESC') }}</p>
          <template v-if="GE_RECENT_NOTI_LIST.length">
            <notiCompo @click="goContentsDetail(noti)" v-for="(noti, index) in GE_RECENT_NOTI_LIST" :mNotiEle="noti" :key="index" />
          </template>
          <gEmpty v-else tabName="최신" contentName="전체"/>
        </div>
        <div style="height: 30px; display: flex; align-items: center; justify-content: flex-end;">
          <p class="font16 mbottom-05 textLeft fr fontBold" @click="mConfirmPopShowYn = true">{{ $t('RECE_BTN_DELETE') }}</p>
        </div>
        <gConfirmPop :confirmText="$t('RECE_MSG_DELETE')" confirmType='two' @no='mConfirmPopShowYn = false' v-if="mConfirmPopShowYn" @ok="notiClear"/>
    </div>
</template>

<script>
import notiCompo from '@/components/pageComponents/main/D_notiCompo.vue'
export default {
  props: {
    pClosePop: Function
  },
  data () {
    return {
      mNotiList: [],
      mConfirmPopShowYn: false
    }
  },
  computed: {
    GE_RECENT_NOTI_LIST () {
      return this.$store.getters['D_NOTI/GE_RECENT_NOTI_LIST']
    },
    pageUpdate () {
      return this.$store.getters['D_HISTORY/hUpdate']
    },
    history () {
      return this.$store.getters['D_HISTORY/hStack']
    }
  },
  watch: {
    pageUpdate () {
      if (this.history[this.history.length - 1] === 'notiHistoryPop') {
        this.closeXPop()
      }
    }
  },
  mounted () {
    this.$addHistoryStack('notiHistoryPop')
  },
  beforeUnmount () {
    this.$checkDeleteHistory('notiHistoryPop')
  },
  methods: {
    closeXPop (reloadYn) {
      // var history = this.$store.getters['D_HISTORY/hStack']
      // var removePage = history[history.length - 1]
      // history = history.filter((element, index) => index < history.length - 1)
      // this.$store.commit('D_HISTORY/setRemovePage', removePage)
      // this.$store.commit('D_HISTORY/updateStack', history)
      this.$emit('closeXPop')
    },
    goContentsDetail (noti) {
      if (noti['content-available'] === 'true') {
        const notiObj = JSON.parse(noti.userDo)
        this.$router.push(`/contents/${notiObj.targetKey}/${noti.jobkindId}`)
        this.closeXPop()
      }
    },
    notiClear () {
      this.$store.dispatch('D_NOTI/AC_CLEAR_NOTI_LIST')
      this.mConfirmPopShowYn = false
    },
    async goNotiDetail (message) {
      message.clickListYn = true
      // var isMobile = /Mobi/i.test(window.navigator.userAgent)
      var addVueResult = await this.$recvNotiFromBridge(message, false)
      if (addVueResult === false) {
        alert(this.$t('COMMON_MSG_NOTFOUND'))
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
