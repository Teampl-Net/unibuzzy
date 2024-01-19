<i18n>
  {
  "ko": {
    "COMM_QUESTION_ONE" : "구독을 안하면 알림을 받지 못하나요?",
    "COMM_QUESTION_TWO" : "멤버와 구독자의 차이점은 무엇인가요?",
    "COMM_QUESTION_THREE" : "개인정보를 수정하고 싶어요.",
    "COMM_QUESTION_FOUR" : "개인정보는 안전하게 보호되나요?",
    "COMM_ANSWER_ONE": "네 맞아요. 구독한 채널의 알림만 받으실 수 있어요!",
    "COMM_ANSWER_TWO" : "우선 구독자가 되면 채널에서 다양한 형태의 소통을 할 수 있게되는데요.<br>채널의 일원으로서 더 많은 권한을 얻고 활동을 하기 원하면 멤버신청을 통해 멤버가 될 수 있답니다.",
    "COMM_ANSWER_THREE": "하이브릭 하단 메뉴 우측 내정보 > 프로필 카드를 클릭하면 나오는 설정페이지에서 자유롭게 정보를 수정해봐요!",
    "COMM_ANSWER_FOUR" : "하이브릭은 소셜로그인을 통해 들어오게 되기 때문에 개인 정보는 하이브릭이 아닌 해당 소셜의 정책에 따라 보호받게 됩니다.",
    "COMM_BTN_MOVE": "바로가기",
  },
  "en": {
    "COMM_QUESTION_ONE" : "If I don't subscribe, will I not receive notifications?",
    "COMM_QUESTION_TWO" : "What is the difference between a member and a subscriber?",
    "COMM_QUESTION_THREE" : "I want to edit my personal information.",
    "COMM_QUESTION_FOUR" : "Is my personal information safely protected?",
    "COMM_ANSWER_ONE": "yes that's right. You will only receive notifications from channels you have subscribed to!",
    "COMM_ANSWER_TWO" : "First of all, if you become a subscriber, you will be able to communicate in various forms on the channel.<br>If you want to gain more rights and participate in activities as a member of the channel, you can become a member by applying for membership.",
    "COMM_ANSWER_THREE": "Feel free to edit your information on the settings page that appears when you click My Information > Profile Card on the right side of the menu at the bottom of More Notifications!",
    "COMM_ANSWER_FOUR" : "Because The Notification is accessed through social login, personal information is protected according to the social policy, not The Notification's policy.",
    "COMM_BTN_MOVE": "Move",
  }
}
</i18n>
<template>
<div class="pagePaddingWrap" style="overflow: hidden scroll !important;" >
  <div class="qPageWrap">
    <div class="qPageHeaderTextWrap ">
      <p class="font18 fontBold commonColor fl w-100P" style="height: 30px; line-height: 30px;">도움이 필요하신가요?</p>
      <p class="font16 fontBold grayBlack fl w-100P commonBlack" style="height: 30px; line-height: 30px;">하이브릭 채널으로 이동하여 편하게 질문하고 소통해보세요!</p>
    </div>
    <gBtnSmall v-on:click="openAskPop" class="askBtn" :btnTitle="this.btnTitle" />
  </div>
  <div class="qnaSet" v-for="(value,index) in questionList" :key="index">
    <div >
      <span class="Icon">Q</span>
      <span class="text fontBold" v-html="value.question"></span>
    </div>
    <div class="qWrap">
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
      btnTitle: this.$t('COMM_BTN_MOVE'),
      questionList: [
        { question: this.$t('COMM_QUESTION_ONE'), answer: this.$t('COMM_ANSWER_ONE') },
        { question: this.$t('COMM_QUESTION_TWO'), answer: this.$t('COMM_ANSWER_TWO') },
        { question: this.$t('COMM_QUESTION_THREE'), answer: this.$t('COMM_ANSWER_THREE') },
        { question: this.$t('COMM_QUESTION_FOUR'), answer: this.$t('COMM_ANSWER_FOUR') }
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
      params.targetType = 'chanDetail'
      params.targetKey = this.$DALIM_TEAM_KEY
      params.teamKey = this.$DALIM_TEAM_KEY
      // params.nameMtext = 'KO$^$하이브릭'
      this.$emit('openPop', params)
    }
  }
}
</script>
<style scoped>
.qPageWrap{width: 100%; float: left; margin-bottom: 1rem; margin-top: 10px; min-height: 120px; border-radius: 5px;background-color: #F5F5F9; padding: 15px;}
.qPageHeaderTextWrap{text-align: left; width: 100%; float: left;}
.qPageHeaderTextWrap p-1{color: #303030; font-weight: bold; font-size: 15px;}
.qPageHeaderTextWrap p-2{text-decoration: none; color: #303030; font-size: 14px;}
.askBtn{float: right; margin-top: 0.6rem}
.aWrap{width: 100%; min-height: 40px; text-align: left;}
.qnaSet{width: 100%; float: left; min-height: 120px; padding: 1rem 0; border-bottom: 1px solid #E4E4E4;}
.qnaSet > div {width: 100%; min-height: 35px; text-align: left;}
.qnaSet .Icon {color: rgb(74 102 158); font-size: 17px; font-weight: bold; float: left; width: 25px; height: 100%;}
.qnaSet .text{color: #303030; font-size: 15px; float: left; width: calc(100% - 25px)}
</style>
