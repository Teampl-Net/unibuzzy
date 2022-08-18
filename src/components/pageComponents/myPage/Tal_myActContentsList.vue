<template>
<!-- 내가 쓴 / 내가 댓글 단 / 내가 좋아한 / 내가 스크랩한 게시물 -->
  <div @click="myActBoardContentDetail(value)" class="myActContentsBox" v-for="(value, index) in myActContentsList" :key="index">
    <!-- <div class="myActChanLogoImg fl" style="margin-right: 10px; width: 30px; height: 100%;"></div> -->
    <div class="myActContentTitle commonBlack font16 textOverdot">{{value.title}}</div>
    <div class="font14" style="width: 40px; height: 30px; line-height: 30px; color: #aaa; float: left;">{{this.$changeDateFormat(value.creDate)}}</div>
    <!-- <img src="../../../assets/images/channel/channer_board.png" style="padding: 1px; width: 25px; height: 25px; margin-right: 5px; float: left;"> -->
    <div style="width: 100%; min-height: 25px; float: left; text-align: left; ">
      <span class="myActSmallInfo font14  textOverdot" ># {{this.$changeText(value.nameMtext)}}&nbsp;</span>
      <span class="myActSmallInfo font14 textOverdot">> {{this.$changeText(value.cabinetNameMtext)}}</span>
    </div>
  </div>
  <myObserver @triggerIntersected="loadMore" class="fl w-100P" style=""></myObserver>
  <div v-if="!this.endListYn" class="w-100P fl mbottom-1 mtop-05" style="position: relative; width:100%; height: 40px;">
    <gLoadingS ref="myActsLoadingPush" class="fl"/>
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
      shareAuth: { R: true, W: true, V: true }
    }
  },
  created () {

  },
  watch: {
    myActContentsList () {
      this.myPageLoadingRefHide()
    }
  },
  methods: {
    async loadMore () {
      this.myPageLoadingRefShow()
      this.$emit('myActMoreList', 10)
    },
    myPageLoadingRefShow () {
      // console.log('show');
      /* if (this.$refs && this.$refs.myActsLoadingPush) {
        this.$refs.myActsLoadingPush.show()
      } */
    },
    myPageLoadingRefHide () {
      // console.log('hide');
      /* if (this.$refs && this.$refs.myActsLoadingPush) {
        this.$refs.myActsLoadingPush.hide()
      } */
    },
    myActBoardContentDetail (data) {
      console.log('게시글')
      console.log(data.cabinetNameMtext)
      // eslint-disable-next-line no-new-object
      var params = new Object()
      params.targetType = 'boardDetail'
      params.contentsKey = data.contentsKey
      params.targetKey = data.contentsKey
      params.cabinetNameMtext = data.cabinetNameMtext
      this.$emit('goDetail', params)
    }
    // myActBoardDetail (data) {
    //   // eslint-disable-next-line no-new-object
    //   var param = new Object()
    //   param.targetType = 'boardMain'
    //   param.cabinetKey = data.creTeamKey
    //   param.currentTeamKey = data.creTeamKey

    //   if (data.ownerYn === 1) {
    //     this.shareAuth.R = true
    //     this.shareAuth.W = true
    //     this.shareAuth.V = true
    //   } else {
    //     this.shareAuth = this.$checkUserAuth(this.mCabinetContentsDetail.mShareItemList)
    //   }
    //   // param.adminYn = data.ownerYn
    //   this.$emit('goDetail', param)
    // },
    // myActChanDetail (data) {
    //   // eslint-disable-next-line no-new-object
    //   var param = new Object()
    //   param.targetType = 'chanDetail'
    //   param.teamKey = data.creTeamKey
    //   param.targetKey = data.creTeamKey
    //   param.nameMtext = data.nameMtext
    //   param.chanName = data.nameMtext
    //   this.$emit('goDetail', param)
    // }
  }
}
</script>
<style>
.myActSmallInfo  {line-height: 25px; height: 25px; float: left; color: #505050}
.myActSmall {color: #303030 !important;}
.myActContentsBox {overflow: hidden; width: 100%;  min-height: 60px; margin-bottom: 10px; border-bottom: 1px solid #ccc; padding: 0px 10px 10px 10px;;}
.myActContentTitle {float: left; text-align: left; width: calc(100% - 40px); height: 30px; line-height: 30px; word-break: break-all; font-weight: bold;}
</style>
