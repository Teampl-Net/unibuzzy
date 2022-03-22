<template>
<div class="chanDetailWrap" style="">
  <!-- <div>{{pushKey}}</div> -->
  <div :style="seCchanLogoPosition" ref="chanImg"  class="mt-header chanWhiteBox">
    <img src="../../../assets/images/channel/main_channer4.png" style="width: 100%; margin-bottom: 1rem" alt="채널사진">
    <span class="font20 fontBold">{{chanItem.chanName}}</span>
    <gBtnSmall :btnTitle="this.subsYnText" />
  </div>
  <div class="channelItemBox">
    <table style="">
      <colgroup><col width="10%"><col width="90%"></colgroup>
      <tr>
        <td><img  src="../../../assets/images/channel/channer_1.png" alt="발행자 아이콘"></td>
        <td><div class="w-20P fl textLeft commonColor fontBold" > 발행자 </div><div class="w-80P fl textLeft"> {{chanItem.chanName}}</div></td>
      </tr>
      <tr>
        <td><img  src="../../../assets/images/channel/channer_2.png" alt="구독자 아이콘"></td>
        <td><div class="w-20P fl textLeft commonColor fontBold" > 구독자 </div><div class="w-80P fl textLeft"> <span class="fl mr-04">{{chanItem.subsCnt}}</span><gBtnSmall class="plusMarginBtn" style="float: left;" :btnTitle="this.shareBtn" /></div></td>
      </tr>
      <tr>
        <td><img  src="../../../assets/images/channel/channer_3.png" alt="채널 메세지 아이콘"></td>
        <td v-html="chanItem.chanMsg"></td>
      </tr>
      <tr>
        <td><img  src="../../../assets/images/channel/channer_4.png" alt="채널 링크 아이콘"></td>
        <td><span class="fl mr-04">{{chanItem.chanUrl}}</span><gBtnSmall class="plusMarginBtn" style="float: left;" :btnTitle="this.openLinkBtn" /></td>
      </tr>
    </table>
  </div>
</div>

</template>

<script>
export default {
  mounted () {
    // this.$refs.chanImg.style.setProperty('--halfWidth', (window.innerWidth - 185) / 2 + 'px')
  },
  data () {
    return {
      subsYnText: '구독중',
      shareBtn: '공유하기',
      openLinkBtn: '링크열기',
      openDetailBtn: '상세보기',
      chanItem: { chanName: '아이디어스', chanImg: 'http://placehold.it/30', chanMsg: '일상에 특별함을 잇다!<br>핸드메이드 라이프 스타일 플랫폼, 아이디어스', subsCnt: '35600', chanUrl: 'https://www.idus.com' }

    }
  },
  computed: {
    seCchanLogoPosition () {
      return {
        '--halfWidth': (window.innerWidth - 185) / 2 + 'px',
        '--top': (window.innerHeight * 0.35 - 185) + 'px'
      }
    }
  },
  props: {
  }
}
</script>

<style scoped>
.gBtnSmall{
  float: left!important; margin-top: 0.7rem
}
.gBtnSmall{
  float: left!important; margin-top: 0.7rem
}

.chanDetailWrap{
  background-image: url('../../../assets/images/push/push_bg.png');
  height: 100vh;
  background-size: cover;
}

.chanDetailWrap tr, .chanDetailWrap td, .chanDetailWrap td{
  padding-top: 1rem;
  min-height: 3rem;
  text-align: left;
}
.chanWhiteBox{left: var(--halfWidth); top: var(--top);position: absolute;width: 185px;height: 185px;background: rgb(137 137 137);border-radius: 11.5rem;z-index: 9999;}
.channelItemBox{background-color: #fff; width: 100%; height: 65vh; position: absolute; bottom: 0; box-sizing: border-box;}
.chanDetailWrap table{width: 85vw; margin: 35vw auto}
.chanDetailWrap table img{width: 1.3rem}
/* .plusMarginBtn{margin-top: 0.6rem; line-height: 1.5;} */
</style>
