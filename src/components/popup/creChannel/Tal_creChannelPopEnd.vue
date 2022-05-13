<template>
    <popHeader :headerTitle="this.headerTitle" @closeXPop="closeXPop" :thisPopN="this.thisPopN" class="commonPopHeader"/>
    <div style="width: 100%; height: calc(100vh - 60px); margin-top: 60px;">
      <div style="width: 60%; height: 100%; margin: 0 auto; margin-top: 40%;">
          <img class="mbottom-2" src="../../../assets/images/main/message_logo.png" alt="">
          <p class="mbottom-1 font15" >채널이 성공적으로 생성되었습니다!</p>
          <div class="creChanBigBtn">내 채널 둘러보기</div>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      headerTitle: '내 채널',
      businessTypeList: [
        { teamNameMtext: '기업', teamType: 'C' },
        { teamNameMtext: '정부', teamType: 'G' },
        { teamNameMtext: '학교', teamType: 'S' },
        { teamNameMtext: '종교 단체', teamType: 'H' },
        { teamNameMtext: '동호회', teamType: 'D' }
      ]
    }
  },
  components: {
  },
  computed: {
    getChanBoxSize () {
      return {
        '--chanBoxSize': window.innerWidth / 4 - 20 + 'px'
      }
    }
  }
}
</script>
<style scoped>
.commonPopHeader{box-shadow: 0px 7px 9px -9px #00000036;}

.creChanIntroTextWrap{padding: 10px 0; float: left; border-bottom: 1px solid #ccc;}
.creChanIntroTextWrap p{font-size: 18px; }

.creChanBigBtn{width: 100%; height: 50px; line-height: 50px; font-size: 18px; background: #6768a7; color: #fff; border-radius: 8px;}
</style>
