<template>
<div class="pagePaddingWrap" style="">
  <div style="float: left; width: 100%; margin-bottom: 2rem; height: 70px; border-radius: 5px;background-color: #F5F5F9; padding: 0.7rem 1rem;">
    <div style="text-align: left; width: 70%; float: left;">
      <p style="color: #303030; font-weight: bold; font-size: 15px;">더알림 홈페이지 바로가기</p>
      <p style="text-decoration: none; color: #303030; font-size: 14px;" >www.pushmsg.net</p>
    </div>
    <gBtnSmall v-on:click="openTeamplHome" style="float: right; margin-top: 0.6rem" :btnTitle="this.btnTitle" />
  </div>
  <img style="width: calc(100% - 30px)" src="../../../assets/images/common/infoTheAlim.png" alt="">
  <div style="margin-top: 2.5rem;">
    <p style="color: #6768A7; font-size: 25px; font-weight: bold; text-align: left; ">더알림</p>
    <p style="color: #303030; font-size: 15px; text-align: left; margin-top: 0.5rem;">나한테 꼭 필요한 알림만 선택해서 구독!<br>보기 좋게 잘 정리된 알림목록</p>
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
      window.open('http://www.pushmsg.net', '_blank')
    }
  }
}
</script>
<style scoped>
.pushBoxWrap{width: 100%; min-height: 50px; border-bottom: 1px solid #E4E4E4; padding: 0.5rem;}
.pushBoxArea{width: 100%; min-height: 50px; padding: 0.5rem}
.pushBoxArea .titleWrap{width: 100%; min-height: 40px; margin-top: 1rem}
.pushBoxTitleImg{width: 1.2rem; margin-top: 0.2rem; margin-right: 1rem}
.boxElement{width: 100%; min-height: 40px;}
.colorBox{width:18px; height: 18px; border-radius: 18px; background-color: #ccc; margin-right: 1rem; margin-top: 0.12rem}

.colorD1ECFF{background-color: #D1ECFF;}
.colorE5FFD1{background-color: #E5FFD1;}
.colorFFD1D1{background-color: #FFD1D1;}
.colorFFECD1{background-color: #FFECD1;}
</style>
