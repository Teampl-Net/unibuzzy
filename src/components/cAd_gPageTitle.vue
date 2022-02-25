<template>
    <div class="gTitleWrap" :class="this.pageType === 'manageChan' ? 'mbottomNoneIm': ''">
      <img src="../resource/images/icon_channer.png" style="float: left; margin-top: 0.3rem;width: 1rem; margin-right: 0.5rem" alt="">
      <span style="line-height: 30px;">{{titleText}}</span><span style="background: #6768A7; width: 2px; margin-top: 0.45rem; height: 15px; margin-right: 0.3rem"></span><span style="line-height: 30px;"> {{this.selectedChan}}</span>
      <div v-if="this.pageType === 'writePush'" style="width: 100%; height: 4rem; float: none;">
          <gWhiteButton btnName="발송하기" v-on:click="clickE('sendPushMsg')" class="mright-05"/>
          <gWhiteButton btnName="임시저장" v-on:click="clickE('requestTS')" />
      </div>
      <div v-if="this.pageType === 'manageChan'" style="width: 100%; height: 2rem; float: none;">
          <gButton btnName="생성하기" v-on:click="clickE('createChan')" class=""/>
          <gSearchBox class="fr mbottom-05" />
          <gWhiteSelect defaltText="전체" style="width: 120px; float: right; margin-right: 1rem; text-align: left;" :roundYn="true" class="fr mbottom-05" />
      </div>
      <div v-if="this.pageType === 'chanMain'" style="width: 100%; height: 2rem; float: none;">
      </div>
      <!-- <gWhiteButton v-if="this.btnYn === true" v-on:click="clickE(this.clickEvnt)" :btnName="this.btnTitle" class="mainBigTitleBtn" /> -->
    </div>
</template>
<script>
export default {
  data () {
    return {
      selectedChan: '더알림대학교'
    }
  },
  mounted () {
  },
  props: {
    titleText: {},
    pageType: {},
    btnTitle: {},
    clickEvnt: {}
  },
  methods: {
    clickE (evnt) {
      this.$emit('clickEvnt', evnt)
    }
  }
}
</script>
<style scoped>
.gTitleWrap{width: 100%; height: 2.7rem; float: left; border-bottom: 1px solid #E1E1E1; margin-bottom: 1rem;}
.gTitleWrap >span{color: #6768A7; font-size: 16px; font-weight: bold; float: left; margin-right: 1rem;}
.mainBigTitleBtn{margin-top: -0.3rem;}
.mbottomNoneIm{margin-bottom: 0!important;}
</style>
