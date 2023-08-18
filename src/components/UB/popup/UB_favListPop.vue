<i18n>
  {
    "ko": {
      "FAV_TITLE_CHANN": "즐겨찾기 채널"
    },
    "en": {
      "FAV_TITLE_CHANN": "Favorite Channels"
    }
  }
  </i18n>
  <template>
      <div class="transWhite" style="border-radius: 10px; width: 80%; height: 80%; position: absolute; top: 10%; left:10%; z-index: 10000; padding: 10px 20px; padding-bottom: 0;float: left;">
        <div class="font25 fontBold w100P" style="height: 50px; display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; width: calc(100% - 25px);">
            <img style="width: 20px; margin-right: 5px;" src="@/assets/images/common/likeIcon.svg" alt="">
            <p class="textOverdot textLeft" style="width: calc(100% - 40px);">{{ $t('FAV_TITLE_CHANN')  }}</p>
          </div>
          <div class="cursorP" @click="closeXPop" style="width: 25px;">
            <img style="width: 25px;" src="../../../assets/images/common/popup_close.png" alt="">
          </div>
        </div>
        <div class="w100P" style="padding-bottom: 30px; overflow: auto; height: calc(100% - 50px);">
          <div v-if="!mFTeamList || (mFTeamList && mFTeamList.length === 0)" class="w100P h100P" style="display: flex; align-items: center; justify-content: center;">
            <gEmpty tabName="즐겨찾기" contentName="채널" style="margin-top:50px;" />
          </div>
          <template v-else>
            <channelCard v-for="(chanEle, index) in mFTeamList" :key="index" class="moveBox chanRow" style="margin-top: 10px;" :chanElement="chanEle" @openPop="goChannelMain" @scrollMove="scrollMove" />
          </template>
        </div>
      </div>
  </template>
<script>
export default {
  created () {
    console.log('여기확인이요')
    console.log(this.pFTeamList)
    if (!this.pFTeamList || this.pFTeamList.length < 1) {
      this.loginCheck()
    } else {
      this.mFTeamList = this.pFTeamList
    }
  },
  computed: {
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
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
      if (this.history[this.history.length - 1] === 'favListPop') {
        this.closeXPop()
      }
    }
  },
  mounted () {
    this.$addHistoryStack('favListPop')
  },
  components: {
  },
  props: {
    pClosePop: Function,
    pFTeamList: Array
  },
  data () {
    return {
      mFTeamList: []
    }
  },
  methods: {
    async loginCheck () {
      var paramMap = new Map()
      if (this.GE_USER.userKey) {
        paramMap.set('userKey', this.GE_USER.userKey)
      } else {
        // paramMap.set('userKey', JSON.parse(localStorage.getItem('sessionUser')).userKey)
        if ((localStorage.getItem('sessionUser'))) paramMap.set('userKey', JSON.parse(localStorage.getItem('sessionUser')).userKey)
      }
      if (this.GE_USER.soAccessToken && this.GE_USER.soAccessToken !== '') { paramMap.set('soAccessToken', this.GE_USER.soAccessToken) }
      if (this.GE_USER.fcmKey !== undefined && this.GE_USER.fcmKey !== null && this.GE_USER.fcmKey !== '') { paramMap.set('fcmKey', this.GE_USER.fcmKey) }
      paramMap.set('userEmail', this.GE_USER.userEmail)
      paramMap.set('soEmail', this.GE_USER.soEmail)
      // paramMap.set('myTeamKey', this.GE_USER.myTeamKey)
      // paramMap.set('myTeamKey', 836)
      var isMobile = /Mobi/i.test(window.navigator.userAgent)
      paramMap.set('mobileYn', isMobile)
      var response = await this.$axios.post('/sUniB/tp.UB_firstLoginCheck', Object.fromEntries(paramMap))
      if (response && (response.status === 200 || response.status === '200')) {
        this.mFTeamList = response.data.fTeamList
      }
    },
    goChannelMain (param) {
      const pageParam = {}
      if (param.teamKey) {
        pageParam.targetKey = param.teamKey
      } else {
        pageParam.targetKey = param.targetKey
      }
      pageParam.areaInfo = this.pAreaInfo
      pageParam.targetType = 'chanDetail'
      pageParam.nameMtext = param.nameMtext
      this.$emit('openPage', pageParam)
    },
    closeXPop (reloadYn) {
      var history = this.$store.getters['D_HISTORY/hStack']
      var removePage = history[history.length - 1]
      history = history.filter((element, index) => index < history.length - 1)
      this.$store.commit('D_HISTORY/setRemovePage', removePage)
      this.$store.commit('D_HISTORY/updateStack', history)
      this.$checkDeleteHistory('favListPop')
      this.$emit('closeXPop')
    }
  }
}
</script>
<style scoped>

</style>
