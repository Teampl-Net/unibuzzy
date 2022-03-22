<template>
<div class="pagePaddingWrap" style="">
  <div style="width: 100%; margin-bottom: 2rem; min-height: 70px; border-radius: 5px;background-color: #F5F5F9; padding: 0.7rem 1rem;">
    <div style="text-align: left; width: 70%; float: left;">
      <p style="color: #303030; font-weight: bold; font-size: 15px;">도움이 필요하신가요?</p>
      <p style="text-decoration: none; color: #303030; font-size: 14px;" >필요한 정보에 대해 문의해보세요</p>
    </div>
    <gBtnSmall v-on:click="openAskPop" style="float: right; margin-top: 0.6rem" :btnTitle="this.btnTitle" />
  </div>
  <div class="qnaSet" v-for="(value,index) in questionList" :key="index">
    <div style="">
      <span class="Icon">Q</span>
      <span class="text fontBold" v-html="value.question"></span>
    </div>
    <div style="width: 100%; min-height: 40px; text-align: left;">
      <span class="Icon">A</span>
      <span class="text" v-html="value.answer"></span>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      btnTitle: '바로가기',
      questionList: [
        { question: '채널 신청은 어떻게 하나요?', answer: '더알림 홈페이지 메뉴에 채널가입 신청으로 들어가서 자신에게 맞는 형태로 가입하시면 됩니다.' },
        { question: '채널 신청은 어떻게 하나요?', answer: '더알림 홈페이지 메뉴에 채널가입 신청으로 들어가서 자신에게 맞는 형태로 가입하시면 됩니다.' },
        { question: '채널 신청은 어떻게 하나요?', answer: '더알림 홈페이지 메뉴에 채널가입 신청으로 들어가서 자신에게 맞는 형태로 가입하시면 됩니다.' },
        { question: '채널 신청은 어떻게 하나요?', answer: '더알림 홈페이지 메뉴에 채널가입 신청으로 들어가서 자신에게 맞는 형태로 가입하시면 됩니다.' }
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
    openAskPop () {
      // eslint-disable-next-line no-new-object
      var params = new Object()
      params.targetType = 'askTal'
      this.$emit('openPop', params)
    }
  }
}
</script>
<style scoped>
.qnaSet{width: 100%; min-height: 140px; padding: 1rem 0; border-bottom: 1px solid #E4E4E4;}
.qnaSet > div {width: 100%; min-height: 35px; text-align: left;}
.qnaSet .Icon {color: #6768A7; font-size: 17px; font-weight: bold; float: left; width: 25px; height: 100%;}
.qnaSet .text{color: #303030; font-size: 15px; float: left; width: calc(100% - 25px)}
</style>
