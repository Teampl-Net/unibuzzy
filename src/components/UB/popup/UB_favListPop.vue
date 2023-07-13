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
      <div class="transWhite" style="border-radius: 10px; width: 90%; height: 80%; position: absolute; top: 10%; left: 5%; z-index: 9999; padding: 10px 20px; padding-bottom: 0;float: left;">
        <div class="font25 fontBold w100P" style="height: 50px; display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; width: calc(100% - 25px);">
            <img style="width: 20px; margin-right: 5px;" src="@/assets/images/footer/icon_alim_fillin.svg" alt="">
            <p class="textOverdot textLeft" style="width: calc(100% - 40px);">{{ $t('FAV_TITLE_CHANN')  }}</p>
          </div>
          <div class="cursorP" @click="closeXPop" style="width: 25px;">
            <img style="width: 25px;" src="../../../assets/images/common/popup_close.png" alt="">
          </div>
        </div>
        <div class="w100P fl flexJustiCenter flexCenter" style="min-height: 200px; gap: 20px">
          <div v-for="(favListEach, index) in mFavList" :key="index">
            <UBfavListEach :pIndex="index" :pFavListEach="favListEach" />
          </div>
        </div>
      </div>
  </template>
<script>
import UBfavListEach from '../../../components/UB/infoBox/UB_favListEach.vue'
export default {
  components: {
    UBfavListEach
  },
  props: {
    pClosePop: Function
  },
  data () {
    return {
      // mFavList: [
      //   { imgChannBg: require(''), favChannName: 'ddkjfk', favChannFollower: '' },
      //   { imgChannBg: require(''), favChannName: 'dkofjudkljf', favChannFollower: '' },
      //   { imgChannBg: require(''), favChannName: 'dkdfj', favChannFollower: '' }
      // ]
    }
  },
  methods: {
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
