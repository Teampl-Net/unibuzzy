<template>
<div class="pagePaddingWrap" >
  <div class="alimInfoPage-1">
    <div class="goHomePageWrap">
      <p class="p-1">더알림 홈페이지 바로가기</p>
      <p class="p-2" >www.pushmsg.net</p>
    </div>
    <gBtnSmall v-on:click="openTeamplHome" class="goBtn" :btnTitle="this.btnTitle" />
  </div>
  <img class="infoPageImg" src="../../../assets/images/common/infoTheAlim.png" alt="">
  <div class="infoLogoWrap">
    <p class="serviceName">더알림</p>
    <p class="serviceDist">나한테 꼭 필요한 알림만 선택해서 구독!<br>보기 좋게 잘 정리된 알림목록</p>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      btnTitle: '바로가기',
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
.alimInfoPage-1{float: left; width: 100%; margin-bottom: 2rem; height: 70px; border-radius: 5px;background-color: #F5F5F9; padding: 0.7rem 1rem;}
.alimInfoPage-1 .goHomePageWrap{text-align: left; width: 70%; float: left;}
.goHomePageWrap .p-1{color: #303030; font-weight: bold; font-size: 15px;}
.goHomePageWrap .p-2{text-decoration: none; color: #303030; font-size: 14px;}
.alimInfoPage-1 .goBtn{float: right; margin-top: 0.6rem}
.infoPageImg{width: calc(100% - 30px)}
.infoLogoWrap{margin-top: 2.5rem;}
.serviceName{color: #6768A7; font-size: 25px; font-weight: bold; text-align: left;}
.serviceDist{color: #303030; font-size: 15px; text-align: left; margin-top: 0.5rem;}
</style>
