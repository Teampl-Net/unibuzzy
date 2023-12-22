<template>
  <div style="width: 100%; float: left;">
    <div style="width: 100%; height: 100vh; position: fixed; z-index: 99; top:0; left: 0; background: #00000026; display: flex; justify-content: center; align-items: center; " @click="goNo"></div>
    <div :style="popLeft" class="zoomInOutPop certiPopWrap">
    <!-- <div class="zoomInOutPop certiPopWrap" style="left: 5%;"> -->
        <!-- <div class="confirmPopHeader" >
            <img src="../../../assets/images/common/thealim_header_logo.png" class="fl" >
            <p class="font24 headerFont commonColor fl" style="line-height: 2.2rem;" >더알림</p>
            <p class="font15 headerFont commonColor fl" style="line-height: 2.6rem; margin-left: 0.3rem" >가장 편리한 구독-알림</p>
        </div> -->
        <div style="width: 100%; float: left; margin-bottom: 12px;">
            <img src="../../../assets/images/common/certiUserIcon.svg" alt="">
        </div>

        <div class="w-100P fl" style="display: flex; justify-content: center;">
            <p class="font18 fl commonColor fontBold" >{{this.$changeText(this.GE_USER.userDispMtext)}}</p>
            <p class="font18 fl grayBlack fontBold" style="margin-right: 7px;" >님의 </p>
            <p class="font18 fl commonColor fontBold" >이름</p>
            <p class="font18 fl grayBlack fontBold" >을 알려주세요</p>

        </div>
        <p class="font14 lightGray fontBold">{{pPopText}}</p>
        <div style="width: 100%; float: left; display: flex; justify-content: center; margin-top: 24px;">
            <gBtnSmall style="width: calc(50% - 2.5rem)" @click="goSavePhonePop" btnTitle="인증하기"/>
            <gBtnSmall class="mleft-05" btnThema="light" @click="goNo" style="width: calc(50% - 2.5rem)" btnTitle="취소"/>
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
    pPopText: {},
    confirmType: {}
  },
  methods: {
    goSavePhonePop () {
      this.$emit('goSavePhonePop')
    },
    goNo () {
      this.$emit('no')
    }
  },
  computed: {
    pageUpdate () {
      return this.$store.getters['D_HISTORY/hUpdate']
    },
    history () {
      return this.$store.getters['D_HISTORY/hStack']
    },
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    }
  },
  beforeUnmount () {
    this.$checkDeleteHistory('gConfirmPop')
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
    if (this.confirmType === 'timeout') {
      this.$delayAfterFunc(2000, this.goNo)

      // this.tiemOut()
    }
  }
}
</script>
<style scoped>
.certiPopWrap{width: 80%; left: 10%; position: fixed; z-index: 999; top: 30%; min-height: 220px;box-shadow: 0 0 9px 2px #b8b8b8; max-height: 500px; max-height: 250px; padding: 20px; border-radius: 10px; background: #FFFFFF;}

</style>
