<template>
<div class="chanDetailWrap" >
  <!-- <div>{{pushKey}}</div> -->
  <div class="channelItemBox">
    <div style="width: 100%; height: 100%; position: relative;">
      <div ref="chanImg"  class="mt-header chanWhiteBox">
        <img src="../../../assets/images/channel/chanImg.png" style="width: 185px; height: 185px; border-radius: 185px; margin-bottom: 1rem" alt="채널사진">
        <span class="font22 fontBold">{{changeText(chanItem.nameMtext)}}</span>
        <div class="mtop-05"><gBtnSmall class="fl" btnTitle="알림취소" /><gBtnSmall class="fl mright-03" btnTitle="구독하기" /></div>
        <table class="mtop-3" >
          <colgroup><col width="10%"><col width="90%"></colgroup>
          <tr>
            <td class="iconTd"><img  src="../../../assets/images/channel/channer_1.png" alt="발행자 아이콘"></td>
            <td><div class="w-20P fl textLeft commonColor fontBold" > 발행자 </div><div class="w-80P fl textLeft"> {{changeText(chanItem.nameMtext)}}</div></td>
          </tr>
          <tr>
            <td class="iconTd"><img  src="../../../assets/images/channel/channer_2.png" alt="구독자 아이콘"></td>
            <td><div class="w-20P fl textLeft commonColor fontBold" > 구독자 </div><div class="w-80P fl textLeft"> <span class="fl mr-04">{{2000}}</span><gBtnSmall class="plusMarginBtn" style="float: left;" btnTitle="공유하기" /></div></td>
          </tr>
          <tr>
            <td class="iconTd"><img  src="../../../assets/images/channel/channer_3.png" alt="채널 메세지 아이콘"></td>
            <td v-html="changeText(chanItem.memoMtext)"></td>
          </tr>
          <tr>
            <td class="iconTd"><img  src="../../../assets/images/channel/channer_4.png" alt="채널 링크 아이콘"></td>
            <td><span class="fl mr-04">pushmsg.net</span><gBtnSmall class="plusMarginBtn" style="float: left;" btnTitle="링크열기" /></td>
          </tr>
        </table>
      </div>
    </div>
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
      chanItem: { chanName: '아이디어스', chanImg: 'http://placehold.it/30', chanMsg: '일상에 특별함을 잇다!<br>핸드메이드 라이프 스타일 플랫폼, 아이디어스', subsCnt: '35600', chanUrl: 'https://www.idus.com' }

    }
  },
  props: {
    chanDetail: {}
  },
  computed: {
  },
  async created () {
    // alert(JSON.stringify(this.chanDetail))
    await this.getChanDetail()
  },
  methods: {
    async getChanDetail () {
      var paramMap = new Map()
      var teamKey = this.chanDetail.targetKey
      paramMap.set('teamKey', teamKey)
      var resultList = await this.$getTeamList(paramMap)
      this.chanItem = resultList[0]
      this.$emit('closeLoading')
    },
    changeText (text) {
      var changeTxt = ''
      // changeTxt = new Promise(this.$makeMtextMap(text, 'KO'))
      changeTxt = this.$makeMtextMap(text, 'KO')
      if (changeTxt) { return changeTxt }
      // if (changeTxt !== undefined) { return changeTxt }
    }
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

.chanDetailWrap tr, .chanDetailWrap td{
  padding-top: 1rem;
  min-height: 3rem;
  text-align: left;
}
.chanWhiteBox{position: absolute; top: -170px; bottom: 50vh; height: 100%; display: flex; flex-direction: column;align-items: center;width: 100%;z-index: 9999;}
.channelItemBox{background-color: #fff; width: 100%; height: 65vh; position: absolute; bottom: 0; box-sizing: border-box;}
.chanDetailWrap table{width: 85vw; max-width: 400px; }
.chanDetailWrap table img{width: 1.3rem}
.iconTd{display: flex; align-items: flex-start; padding-top: 1.2rem!important;}
/* .plusMarginBtn{margin-top: 0.6rem; line-height: 1.5;} */
</style>
