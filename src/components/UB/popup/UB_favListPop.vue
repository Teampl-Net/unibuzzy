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
          <gEmpty tabName="전체" contentName="채널" v-if="pFTeamList && pFTeamList.length === 0" style="margin-top:50px;" />
          <template v-else>
            <div class="textLeft fontBold" style="width: 100%; padding: 5px 10px; border-radius: 10px; background: rgba(186, 187, 215, 0.5);">Georgia Tech</div>
            <channelCard v-for="(chanEle, index) in pFTeamList" :key="index" class="moveBox chanRow" style="margin-top: 10px;" :chanElement="chanEle" @openPop="goChannelMain" @scrollMove="scrollMove" />
          </template>
        </div>
      </div>
  </template>
<script>
export default {
  created () {
    console.log('------------------------')
    console.log(this.pFTeamList)
  },
  components: {
  },
  props: {
    pClosePop: Function,
    pFTeamList: Array
  },
  data () {
    return {
    }
  },
  methods: {
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
      this.$emit('closeXPop')
    }
  }
}
</script>
<style scoped>

</style>
