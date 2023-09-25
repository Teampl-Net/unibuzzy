<template>
  <div class="confirmPopArea">
    <div class="confirmBg" @click="goNo"></div>
    <div :style="popLeft" class="zoomInOutPop confirmPopWrap">
    <!-- <div class="zoomInOutPop confirmPopWrap" style="left: 5%;"> -->
      <div class="confirmPopHeader" >
        <img src="/resource/logo/UB_uniBLogo.png" class="fl" >
        <p class="font24 headerFont commonColor fl appNameP">{{ $t('COMMON_NAME_APP') }}</p>
        <p class="font15 headerFont commonColor fl appIntroP">{{ $t('COMM_INTRO_COMMT') }}</p>
      </div>

      <div class="confirmPopBody" >
        <p class="confirmText" v-html="confirmText"></p>
      </div>
      <div class="btnWrap">
        <div class="confirmBtnArea" v-if="confirmType==='timeout'">
          <gBtnSmall class="btnBig" v-on:click="goNo" :btnTitle="$t('COMM_BTN_CLOSE')"/>
        </div>

        <div class="confirmBtnArea" v-if="confirmType==='one'">
          <gBtnSmall class=" btnBig" v-on:click="goNo" :btnTitle="$t('COMMON_BTN_OK')"/>
        </div>

        <div class="confirmBtnArea" v-if="confirmType==='two'||confirmType== null">

          <gBtnSmall btnThema='deep' class="mright-05 btnBig" v-on:click="goOk" :btnTitle="$t('COMMON_BTN_OK')"/>
          <gBtnSmall  :btnThema="'light'" v-on:click="goNo" :btnTitle="$t('COMM_BTN_CANCEL')" class="textCenter btnBig"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  props: {
    confirmText: {},
    confirmType: {},
    nonHeaderYn: { type: Boolean, default: false },
    pCloseCreateConfirmPop: Function,
    pNewChanTeam: Array,
    pGoChannelMain: Function,
    pDelete: Boolean,
    pNewBoard: Array,
    pCreBoardCheckPopYn: Boolean,
    pCloseCreatedSuccessPopYn: Function
  },
  methods: {
    goOk () {
      this.$emit('ok')
      if (this.pDelete === true) {
        setTimeout(() => {
          this.$showToastPop('Channel has been deleted.')
        }, 1000)
      }
    },
    goNo () {
      var hStack = this.$store.getters['UB_HISTORY/hStack']
      var removePage = hStack[hStack.length - 1]
      // eslint-disable-next-line
      if ('gConfirmPop' === (hStack[hStack.length- 1])) {
        hStack = hStack.filter((element, index) => index < hStack.length - 1)
        this.$store.commit('UB_HISTORY/setRemovePage', removePage)
        this.$store.commit('UB_HISTORY/updateStack', hStack)
        this.$emit('no')
        if (this.pCloseCreatedSuccessPopYn) {
          this.pCloseCreatedSuccessPopYn()
          this.goBoardMain()
        }
      }
    },
    goBoardMain () {
      var openPopParam = {}
      openPopParam.teamKey = this.pNewBoard.creTeamKey
      openPopParam.targetKey = this.pNewBoard.cabinetKey
      openPopParam.cabinetNameMtext = this.pNewBoard.cabinetNameMtext
      openPopParam.targetType = 'boardMain'
      this.$emit('openPop', openPopParam)
    }
  },
  computed: {
    pageUpdate () {
      return this.$store.getters['UB_HISTORY/hUpdate']
    },
    history () {
      return this.$store.getters['UB_HISTORY/hStack']
    }
  },
  watch: {
    pageUpdate () {
      if (this.history[this.history.length - 1] === 'gConfirmPop') {
        if (this.$route.path === '/') {
          this.$emit('appClose')
        }
        this.goNo()
      }
    }
  },
  created () {
    this.$addHistoryStack('gConfirmPop')
  },
  mounted () {
    // if (this.confirmType === 'timeout') {
    //   this.$delayAfterFunc(2000, this.goNo)

    //   // this.tiemOut()
    // }
  }
}
</script>
<style scoped>
.confirmPopArea  {
  width: 100%;
  float: left;
  position: absolute;
}
.confirmPopWrap {
  width: 80%;
  left: 10%;
  position: fixed;
  z-index: 99999999999999;
  top: 30%;
  min-height: 280px;
  box-shadow: 0 0 9px 2px #b8b8b8;
  max-height: 500px;
  max-height: 250px;
  border-radius: 10px;
  background: #FFFFFF;
}
.confirmPopHeader {
  height: 55px;
  width: 100%;
  border-bottom: 1px solid #6768A7;
  padding: 0.8rem 0.5rem;
}
.confirmPopHeader img {
  width: 1.7rem;
  margin: 0 0.4rem
}
.confirmText {
  color: #3E3F6A;
  font-size: 18px;
  font-weight: bold;
}
.confirmPopBody {
  width: 100%;
  min-height: 110px;
  padding: 0 20px;
  height: calc(100% - 110px);
  display: flex;
  align-items: center;
  justify-content: center;
  float: left;
}
.confirmBtnArea {
  display: flex;
  justify-content:center;
}
.confirmBg {
  width: 100%;
  height: 100vh;
  position: fixed;
  z-index: 99999;
  top:0;
  left: 0;
  background: #00000026;
  display: flex;
  justify-content: center;
  align-items: center;
}
.appNameP {
  line-height: 2.2rem;
}
.appIntroP {
  line-height: 2.6rem;
  margin-left: 0.3rem
}
.btnWrap {
  width: 100%;
  height: 50px;
  float:left;
}
</style>
