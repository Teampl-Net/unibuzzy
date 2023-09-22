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
    <div class="transWhite notiPopWrap">
        <div class="font25 fontBold w100P notiPopHeader">
          <div class="notiPopTitle">
            <img src="@/assets/images/footer/icon_alim_fillin.svg" alt="">
            <p class="textOverdot textLeft mleft-05">{{ $t('RECE_TITLE_NOTI')  }}</p>
          </div>
          <div class="cursorP closeBox" @click="closeXPop">
            <img class="w100P" src="../../../assets/images/common/popup_close.png" alt="">
          </div>
        </div>
        <div class="w100P flexCenter notiContentsWrap">
          <!-- <p class="font14 lightGray textLeft fl" style="margin-botom: 30px !important;">{{ $t('RECE_MSG_NOTIDESC') }}</p> -->
          <!-- <div style="width: 100%; height: 2px; background: #aaa; float: left; margin: 10px 0; margin-bottom: 5px;"></div> -->
          <template v-if="mNotiList.length">
            <notiCompo @click="goPage(noti)" v-for="(noti, index) in mNotiList" :mNotiEle="noti" :key="index" />
          </template>
          <gEmpty v-else tabName="최신" contentName="전체"/>
        </div>
        <div class="notiPopBottom">
          <p class="font16 mbottom-05 textLeft fr fontBold" @click="mConfirmPopShowYn = true">{{ $t('RECE_BTN_DELETE') }}</p>
        </div>
        <gConfirmPop :confirmText="$t('RECE_MSG_DELETE')" confirmType='two' @no='mConfirmPopShowYn = false' v-if="mConfirmPopShowYn" @ok="notiClear"/>
    </div>
</template>

<script>
import notiCompo from '@/components/UB/unit/UB_notiCompo.vue'
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
  created () {
    this.getNotiHistoryList()
  },
  computed: {
    GE_USER () {
      return this.$store.getters['UB_USER/GE_USER']
    },
    pageUpdate () {
      return this.$store.getters['UB_HISTORY/hUpdate']
    },
    history () {
      return this.$store.getters['UB_HISTORY/hStack']
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
      // var history = this.$store.getters['UB_HISTORY/hStack']
      // var removePage = history[history.length - 1]
      // history = history.filter((element, index) => index < history.length - 1)
      // this.$store.commit('UB_HISTORY/setRemovePage', removePage)
      // this.$store.commit('UB_HISTORY/updateStack', history)
      this.$emit('closeXPop')
    },
    async getNotiHistoryList (noti) {
      var param = {}
      param.userKey = this.GE_USER.userKey
      const result = await this.$commonAxiosFunction({
        url: '/sUniB/tp.getLogList',
        param: param
      })
      this.mNotiList = result.data.log.content
    },
    async goPage (notiData) {
      if (notiData.targetKind === 'C') {
        const vuexResultData = await this.$addContents(notiData.targetKey, 'BOAR')
        // eslint-disable-next-line no-new-object
        var goDetailParam = new Object()
        goDetailParam.creTeamKey = Number(vuexResultData.creTeamKey)
        if (goDetailParam.jobkindId === 'ALIM') {
          goDetailParam.chanName = vuexResultData.nameMtext
          goDetailParam.nameMtext = vuexResultData.nameMtext
        } else if (goDetailParam.jobkindId === 'BOAR') {
          goDetailParam.cabinetNameMtext = vuexResultData.cabinetNameMtext
          goDetailParam.cabinetKey = vuexResultData.cabinetKey
        }
        this.$router.push(`/contents/${vuexResultData.contentsKey}/${vuexResultData.creTeamKey}/${vuexResultData.cabinetKey}`)
      } else if (notiData.targetKind === 'B') {

      } else if (notiData.targetKind === 'T') {
        this.$router.push(`/chan/${notiData.targetKey}`)
      } else if (notiData.targetKind === 'U') {

      }
    },
    goContentsDetail (noti) {
      if (noti['content-available'] === 'true') {
        const notiObj = JSON.parse(noti.userDo)
        this.$router.push(`/contents/${notiObj.targetKey}/${noti.jobkindId}`)
        this.closeXPop()
      }
    },
    notiClear () {
      this.$store.dispatch('UB_NOTI/AC_CLEAR_NOTI_LIST')
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
      var popHistory = this.$store.getters['UB_HISTORY/GE_GPOP_STACK']
      var currentPage = 0
      if (popHistory && popHistory.length > 0) {
        currentPage = popHistory[popHistory.length - 1]
      }
      this.$store.dispatch('UB_NOTI/AC_ADD_NEW_NOTI', { notiDetailObj: message, currentPage: currentPage, addVueResult: addVueResult })
    }
  },
  components: {
    notiCompo
  }
}
</script>

<style scoped>
.notiPopWrap {
  border-radius: 10px;
  width: 90%;
  height: 80%;
  position: absolute;
  top: 10%;
  left: 5%;
  z-index: 10000;
  padding: 10px 10px;
  padding-bottom: 0;float: left;
}
.notiPopHeader {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  margin-bottom: 15px;
}
.notiPopTitle {
  display: flex;
  align-items: center;
  width: calc(100% - 25px);
}
.notiPopTitle > img {
  width: 20px;
  margin-right: 5px;
}
.notiPopTitle > p {
  width: calc(100% - 40px);
  padding: none!important;
}
.closeBox {
  width: 25px;
}
.notiContentsWrap {
  flex-direction: column;
  justify-content: flex-start;
  height: calc(100% - 95px);
  overflow: auto;
  padding: 0px;
}
.notiPopBottom {
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
