<template>
<div class="pagePaddingWrap leavePageWrap" style="">
  <leaveResultPop v-if="this.resultPopShowYn" @closeXPop="closeXPop"/>
  <div class="leaveContentsWrap">
    <p class="pointTitle">더알림을 탈퇴하시겠습니까?</p>
    <p class="title">아래 내용을 읽고 동의해주세요.</p>
    <div class="guideBox">
      <p class= "mtop-1" style="">더알림 회원 탈퇴 안내</p>
      <div class="guideTextWrap guideText ptop-1"></div>
    </div>
    <div class="guideBox">
      <p class= "mtop-1" style="">더알림 개인정보 삭제 방침 안내</p>
      <div class="guideTextWrap guideText ptop-1"></div>
    </div>
    <div style="text-align: center; margin-top: 1rem;"><input type="checkbox" name="agreeOut" id="agreeOut"><label style="" for="agreeOut">동의합니다</label></div>
  </div>
  <gBtnLarge v-on:click="requestLeave()" :btnTitle="this.completeBtnTitle" style=""/>
</div>
</template>

<script>

import leaveResultPop from '../components/Tal_leaveTheAlimResultPop.vue'
export default {
  data () {
    return {
      completeBtnTitle: '완료',
      resultPopShowYn: false
    }
  },
  mounted () {
  },
  props: {
  },
  methods: {
    requestLeave () {
      this.resultPopShowYn = true
    },
    closeXPop () {
      this.resultPopShowYn = false
      this.$emit('closeXPop')
    }
  },
  components: {
    leaveResultPop
  }
}
</script>
<style scoped>
.leaveContentsWrap .pointTitle{color: #6768A7; font-size: 16px; font-weight: bold; text-align: center;}
.leaveContentsWrap .title{color: #B8B8B8; font-size: 14px; font-weight: bold; text-align: center;}
.leaveContentsWrap{width: 100%; height: 80%; margin-bottom: 3rem;}
.leavePageWrap{display: flex; flex-direction: column; text-align: left; height: 100vh;}
.guideText{color: #303030; font-size: 15px;}
.guideTextWrap{width: 100%; min-height: 180px; margin-top: 0.5rem; border: 1px solid #CFCFCF; padding: 0 0.5rem}
.guideBox{width: 100%; min-height: 80px; margin-top: 2rem;}
.guideBox p{color: #6768A7; font-size: 15px; font-weight: bold;}
input{margin-right: 0.5rem;}
label{color: #6768A7; font-weight: 15px;}

</style>
