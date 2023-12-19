<template>
<!-- 내가 쓴 / 내가 댓글 단 / 내가 좋아한 / 내가 스크랩한 게시물 -->
  <div style="width: 100%; height: 100%; float: left;">
    <div @click="myActBoardContentDetail(value)" class="myActContentsBox" v-for="(value, index) in mActList" :key="index">
        <div class="myActContentTitle commonBlack font16 textOverdot">{{value.title}}</div>
        <div class="font14" style="width: 40px; height: 30px; line-height: 30px; color: #aaa; float: left;">{{this.$changeDateFormat(value.creDate)}}</div>
        <div style="width: 100%; min-height: 25px; float: left; text-align: left; ">
        <span class="myActSmallInfo font14  textOverdot" ># {{this.$changeText(value.nameMtext)}}&nbsp;</span>
        <span class="myActSmallInfo font14 textOverdot">> {{this.$changeText(value.cabinetNameMtext)}}</span>
        </div>
    </div>
    <myObserver @triggerIntersected="loadMore" class="fl w-100P" style=""></myObserver>
    <div v-if="!this.endListYn" class="w-100P fl mbottom-1 mtop-05" style="position: relative; width:100%; height: 40px;">
        <gLoadingS ref="myActsLoadingPush" class="fl"/>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    myActTabType: {},
    myActContentsList: {},
    endListYn: {}
  },
  data () {
    return {
      mActList: []
    }
  },
  created () {
    if (this.myActContentsList) {
      this.mActList = this.myActContentsList
    }
  },
  updated () {
    if (this.myActContentsList) {
      this.mActList = this.myActContentsList
    }
  },
  watch: {
    myActContentsList () {
      this.mActList = this.myActContentsList
    }
  },
  methods: {
    async loadMore () {
      this.$emit('myActMoreList')
    },
    myActBoardContentDetail (data) {
      console.log('# myActBoardContentDetail')
      console.log(data)
      var params = {}
      params.jobkindId = data.jobkindId
      params.targetType = 'contentsDetail'
      params.creTeamKey = data.creTeamKey
      params.contentsKey = data.contentsKey
      params.targetKey = data.contentsKey
      if (data.jobkindId === 'ALIM') {
        params.popHeaderText = data.nameMtext
      } else {
        params.popHeaderText = data.cabinetNameMtext
      }
      this.$emit('openContentsDetailPop', params)
    }
  }
}
</script>
<style>
  .myActSmallInfo  {line-height: 25px; height: 25px; float: left; color: #505050}
  .myActSmall {color: #303030 !important;}
  .myActContentsBox {overflow: hidden; width: 100%;  min-height: 60px; margin-bottom: 10px; border-bottom: 1px solid #ccc; padding: 0px 10px 10px 10px;;}
  .myActContentTitle {float: left; text-align: left; width: calc(100% - 40px); height: 30px; line-height: 30px; word-break: break-all; font-weight: bold;}
</style>
