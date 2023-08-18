<template>
<div class="pagePaddingWrap  " style="position: relative; overflow:auto">
  <div class="fl w100P">
    <p class="fl w100P commonBlack font18 fontBold textLeft">{{mQuestList.mFormTitle}}</p>
    <p class="fl w100P lightGray font16 textLeft">{{mQuestList.mFormMemo}}</p>
  </div>
  <div v-for="(data, index) in mQuestList.questionList" :key="index" class="fl w100P textLeft mtop-1" style="padding-top:1rem">
    <div class="w100P fl" style="">
      <p class="commonBlack font16 fl">{{(index+1)+'. ' + data.questionTitle}}</p>
      <p class="commonBlack font16 fl">{{data.questionType}}</p>
    </div>

    <div v-for="(answer, andex) in data.answerList" :key="andex" class="mleft-12">
      <input type="checkbox" class="fl">
      <p class="commonBlack font16">{{answer.answerName}}</p>
    </div>
  </div>

  <div class="w100P fl mtop-2 mbottom-1" style="display: flex; flex-direction: row; justify-content: center; ">
    <gBtnSmall class="fl mleft-1" @click="emit('editClick')" btnTitle="수정"/>
    <gBtnSmall class="fl mleft-1" @click="emit('closePop')" btnTitle="닫기"/>
  </div>

</div>
</template>

<script>

export default {
  props: {
    propData: {}
  },
  created () {
    // console.log(this.propData)
    this.getMemberForm()
  },
  data () {
    return {
      mQuestList: [],
      dummyData: [{ mFormKey: 1, mFormTitle: '더알림 멤버신청', mFormMemo: '더알림 멤버활동에 필요한 필수 정보입니다!', activeYn: true, creDate: '2022-08-04 15:00', questionList: [{ questionKey: 0, questionTitle: '성별이 어떻게 되나요?', questionType: 'si', essentialYn: true, answerList: [{ answerName: '여성', answerKey: 0 }, { answerName: '남성', answerKey: 1 }] }, { questionKey: 1, questionTitle: '나이대가 어떻게 되나요?', questionType: 'si', essentialYn: true, answerList: [{ answerName: '10대 ~ 20대', answerKey: '1' }, { answerName: '20대 ~ 30대', answerKey: '2' }, { answerName: '30대 ~ 40대', answerKey: '3' }] }, { questionKey: 2, questionTitle: '취미가 어떻게 되나요?', essentialYn: true, questionType: 'mu', answerList: [{ answerName: '농구', answerKey: '0' }, { answerName: '축구', answerKey: '2' }, { answerName: '배드민턴', answerKey: '3' }] }, { questionKey: 3, questionTitle: '멤버로 가입 후 악의적인 행동 시 별 다른 경고없이 퇴출합니다. 동의하십니까?', essentialYn: true, questionType: 'su' }, { questionKey: 4, questionTitle: '마지막으로 본인을 증명 할 문서를 pdf로 올려주세요.', essentialYn: true, questionType: 'at' }] },
        { mFormKey: 2, mFormTitle: '더알림 멤버신청(임시)', mFormMemo: '더알림 멤버활동에 필요한 필수 정보입니다!', activeYn: false, creDate: '2022-05-04 15:00', questionList: [{ questionKey: 0, questionTitle: '질문제목', questionType: 'su', essentialYn: true }, { questionKey: 1, questionTitle: '질문제목', questionType: 'si', essentialYn: true, answerList: [{ answerName: '답안' }] }, { questionKey: 2, questionTitle: '질문제목', essentialYn: true, questionType: 'mu', answerList: [{ answerName: '답안' }] }, { questionKey: 3, questionTitle: '질문제목', essentialYn: true, questionType: 'at' }] },
        { mFormKey: 3, mFormTitle: '멤버신청(임시)', mFormMemo: '더알림 멤버 신청서입니다!', activeYn: false, creDate: '2021-12-04 15:00', questionList: [{ questionKey: 0, questionTitle: '질문제목', essentialYn: true, questionType: 'su' }, { questionKey: 1, questionTitle: '질문제목', questionType: 'si', essentialYn: true, answerList: [{ answerName: '답안' }] }, { questionKey: 2, questionTitle: '질문제목', questionType: 'mu', essentialYn: true, answerList: [{ answerName: '답안' }] }, { questionKey: 3, questionTitle: '질문제목', essentialYn: true, questionType: 'at' }] }]
    }
  },
  methods: {
    getMemberForm () {
      // var param = {}
      // param.formKey = this.propData.formKey
      // param.teamKey = this.propData.teamKey
      // var result = await this.$commonAxiosFunction({
      //   url : 'https://www.unibuzzy.com/sUniB/tp.getMQuestion',
      //   param: param
      // })
      // this.mQuestList = result
      var indexOf = this.dummyData.findIndex(i => i.mFormKey === this.propData.formKey)
      this.mQuestList = this.dummyData[indexOf]
      // console.log(this.mQuestList)
    }
  }
}
</script>

<style >

</style>
