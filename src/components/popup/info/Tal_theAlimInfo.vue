<i18n>
  {
    "ko": {
      "": "팀플 (주)",
      "": "대표 : 최병진 | 사업자 등록번호 : 850-86-02601",
      "": "경기도 안양시 만안구 안양천서로 93, 새움빌딩 3층",
      "": "고객센터 : 031-429-4216"
    },
    "en": {
      "": "",
      "": "",
      "": "Seaum Building, 93, Anyangcheonseo-ro, Manan-gu, Anyang-si, Gyeonggi-do, Republic of Korea",
      "": "Customer Service Center: 031-429-4216"
    }
  }
</i18n>
<template>
<div class="pagePaddingWrap" style="overflow: hidden scroll !important;">
  <div class="alimInfoPage-1 mtop-1">
    <div class="goHomePageWrap fl w100P h100P ">
      <p class="font14 fontBold commonBlack fl " style="width: 100%; height: 30px; line-height: 30px;" >{{ $t('COMMON_NAME_APP') }} {{ $t('COMM_NAME_HOME_PAGE') }}</p>
      <p class="font14 commonBlack fl" style="width: 100%; height: 20px; line-height: 20px;">www.pushmsg.net</p>
    </div>
  </div>
    <gBtnSmall v-on:click="openTeamplHome" class="goBtn" :btnTitle="this.btnTitle" />
  <img class="infoPageImg fl w100P mtop-1" src="../../../assets/images/common/infoTheAlim.png" style="">
  <div class="infoLogoWrap fl">
    <!-- <p class="serviceName font25 commonColor fl w100P">더알림</p>
    <p class="serviceDist font15 commonColor fl w100P">나에게 꼭 필요한 알림만 선택해서 구독!<br>보기 좋게 잘 정리된 알림목록</p> -->

    <div style="width: 100%; height: 1px; background: #ccc; float: left;" class="mtop-05 mbottom-1"></div>
    <div style="width:100%; float: left; min-height: 100px; background: #F5F5F9; margin-bottom: 1rem; padding: 10px; border-radius: 5px;">
        <p class="font25 fontBold commonColor fl w100P textLeft"></p>
        <p class="font20 commonColor fl w100P fontBold textLeft mbottom-05">팀플 (주)</p>
        <p class="font15 commonColor fl w100P textLeft">대표 : 최병진 | 사업자 등록번호 : 850-86-02601</p>
        <p class="font15 commonColor fl w100P textLeft">경기도 안양시 만안구 안양천서로 93, 새움빌딩 3층</p>
        <p class="font15 commonColor fl w100P textLeft">고객센터 : 031-429-4216 / teampl.net@gmail.com</p>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      btnTitle: this.$t('COMM_BTN_VIEW_WEBSITE'),
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
      // window.open('http://www.pushmsg.net', '네이버팝업', 'scrollbars=yes')
      window.open('http://www.pushmsg.net', '_blank')
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
