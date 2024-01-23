<template>
  <div style="width: 100%; float: left;">
    <div style="width: 100%; height: 100vh; position: fixed; z-index: 99999; top:0; left: 0; background: #00000026; display: flex; justify-content: center; align-items: center; " @click="goNo"></div>
    <div :style="popLeft" class="zoomInOutPop confirmPopWrap">
    <!-- <div class="zoomInOutPop confirmPopWrap" style="left: 5%;"> -->
      <div class="confirmPopHeader" >
        <img src="../../../assets/images/common/thealim_header_logo.png" class="fl" >
        <p class="font24 headerFont commonColor fl" style="line-height: 2.2rem;" >하이브릭</p>
        <p class="font15 headerFont commonColor fl" style="line-height: 2.6rem; margin-left: 0.3rem" >가장 편리한 구독-알림</p>
      </div>

      <div class="confirmPopBody" >
        <p class="confirmText" v-html="confirmText"></p>
      </div>
      <div style="width: 100%; height: 50px; float:left;">
        <div class="confirmBtnArea" v-if="confirmType==='timeout'">
          <gBtnSmall class="btnBig" v-on:click="goNo" btnTitle="닫기"/>
        </div>

        <div class="confirmBtnArea" v-if="confirmType==='one'">
          <gBtnSmall class=" btnBig" v-on:click="goNo" btnTitle="확인"/>
        </div>

        <div class="confirmBtnArea" v-if="confirmType==='two'||confirmType== null">

          <gBtnSmall btnThema='deep' class="mright-05 btnBig" v-on:click="goOk" btnTitle="확인"/>
          <gBtnSmall  :btnThema="'light'" v-on:click="goNo" btnTitle="취소" class="mleft-05 btnBig"/>
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
    nonHeaderYn: { type: Boolean, default: false }
  },
  methods: {
    goOk () {
      this.$emit('ok')
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
.confirmPopWrap{width: 80%; left: 10%; position: fixed; z-index: 99999999999999; top: 30%; min-height: 220px;box-shadow: 0 0 9px 2px #b8b8b8; max-height: 500px; max-height: 250px; border-radius: 10px; background: #FFFFFF;}

/* .confirmPopWrap{width: 90%; max-width: 400px; position: absolute; z-index: 999999; top: 30%; min-height: 220px;box-shadow: 0 0 9px 2px #b8b8b8; max-height: 500px; max-height: 250px; border-radius: 10px; background: #FFFFFF;} */
.confirmPopHeader{height: 55px; width: 100%; border-bottom: 1px solid rgb(74 102 158); padding: 0.8rem 0.5rem;}
.confirmPopHeader img{width: 1.7rem; margin: 0 0.4rem}
.confirmText{color: rgb(74 102 158); font-size: 18px; font-weight: bold;}
.confirmPopBody{width: 100%; min-height: calc(130px); padding: 0 20px; height: calc(100% - 110px); display: flex; align-items: center; justify-content: center; float: left;}
.confirmBtnArea{display: flex; justify-content:center;}

</style>
