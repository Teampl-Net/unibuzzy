<template>
<!-- 내가 쓴 / 내가 댓글 단 / 내가 좋아한 / 내가 스크랩한 게시물 -->
  <div class="myActContentsBox" v-for="(value, index) in myActContentsList" :key="index">
    <div class="myActChanLogoImg fl" style="margin-right: 10px; width: 30px; height: 30px; background-color: #ccc; border-radius: 100%;"></div>
    <div class="myActChanBoardInfo font16"> {{this.$changeText(value.nameMtext)}} > {{this.$changeText(value.cabinetNameMtext)}}</div>
    <div class="myActTitle font14">"{{value.title}}"</div>
  </div>
</template>
<script>
export default {
  props: {
    myActTabType: {},
    myActContentsList: {}
  }
}
</script>
<style>
.myActContentsBox {overflow: hidden scroll; width: 100%;  min-height: 60px; margin-bottom: 10px; border-bottom: 1px solid #ccc; padding: 5px 10px;}
.myActChanBoardInfo {width: calc(100% - 40px); height: 50%; float: left; text-align: left; font-weight: bold;}
.myActTitle {float: left; text-align: left; width: 100%; height: 50%; margin-left: 40px;}
</style>
