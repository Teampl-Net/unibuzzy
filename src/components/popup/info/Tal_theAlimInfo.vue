<template>
<div class="pagePaddingWrap" style="overflow: hidden scroll !important;">
  <div class="alimInfoPage-1">
    <div class="goHomePageWrap fl w-100P h-100P">
      <p class="font14 fontBold commonBlack fl" style="width: 100%; height: 30px; line-height: 30px;" >더알림 홈페이지</p>
      <p class="font14 commonBlack fl" style="width: 100%; height: 20px; line-height: 20px;">www.pushmsg.net</p>
    </div>
  </div>
    <gBtnSmall v-on:click="openTeamplHome" class="goBtn" :btnTitle="this.btnTitle" />
  <img class="infoPageImg fl w-100P mtop-1" src="../../../assets/images/common/infoTheAlim.png" style="">
  <div class="infoLogoWrap fl">
    <p class="serviceName font25 fl w-100P">더알림</p>
    <p class="serviceDist font15 fl w-100P">나에게 꼭 필요한 알림만 선택해서 구독!<br>보기 좋게 잘 정리된 알림목록</p>
  </div>
</div>
</template>

<script>
export default {
  created () {
    this.openTeamplHome()
  },
  data () {
    return {
      btnTitle: '홈페이지 바로가기',
      boxList: [
        { boxName: '책', tagColor: 'D1ECFF', boxKey: '0' },
        { boxName: '영화&드라마', tagColor: 'E5FFD1', boxKey: '0' },
        { boxName: '택배', tagColor: 'FFD1D1', boxKey: '0' },
        { boxName: '커피', tagColor: 'FFECD1', boxKey: '0' }
      ]
    }
  },
  computed: {
    tagColor () {
      return {
        // display: this.answerShowYn
      }
    }
  },
  mounted () {
  },
  props: {
    kind: {}
  },
  methods: {
    openTeamplHome () {
      // window.location.replace('http://www.pushmsg.net')
      // window.open('http://www.pushmsg.net', '_blank')
      // window.open('http://www.pushmsg.net','_parent')
      window.open('http://www.pushmsg.net', '네이버팝업', 'scrollbars=yes')
    }
  }
}
</script>
<style scoped>
.alimInfoPage-1{float: left; width: 100%; margin-bottom: 1rem; height: 70px; border-radius: 5px;background-color: #F5F5F9; padding: 0.7rem 1rem;}
.alimInfoPage-1 .goHomePageWrap{text-align: left; width: 70%; float: left;}
.goHomePageWrap .p-1{color: #303030; font-weight: bold; font-size: 15px;}
.goHomePageWrap .p-2{text-decoration: none; color: #303030; font-size: 14px;}
.alimInfoPage-1 .goBtn{float: right; margin-top: 1.5rem}
/* .infoPageImg{width: calc(100% - 30px)} */
.infoLogoWrap{margin-top: 2rem;}
.serviceName{color: #6768A7; font-size: 25px; font-weight: bold; text-align: left;}
.serviceDist{color: #303030; font-size: 15px; text-align: left; margin-top: 0.5rem;}
</style>
