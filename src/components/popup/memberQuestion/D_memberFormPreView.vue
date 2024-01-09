<template>
<div class="pagePaddingWrap  " style="position: relative; overflow:auto">
  <div class="fl w-100P">
    <p class="fl w-100P commonBlack font18 fontBold textLeft">{{mQuestList.mFormTitle}}</p>
    <p class="fl w-100P lightGray font16 textLeft">{{mQuestList.mFormMemo}}</p>
  </div>
  <div v-for="(data, index) in mQuestList.questionList" :key="index" class="fl w-100P textLeft mtop-1" style="padding-top:1rem">
    <div class="w-100P fl" style="">
      <p class="commonBlack font16 fl">{{(index+1)+'. ' + data.questionTitle}}</p>
    </div>

    <template v-if="data.questionType === 'si' || data.questionType === 'mu'">
      <div v-for="(answer, andex) in data.answerList" :key="andex" class="mleft-12 fl w-100P" style="height:25px;">
        <input :type="data.questionType === 'mu' ? 'checkbox' : 'radio'" :id="'ques'+index+'input'+andex" :name="'ques'+index" class="fl" style="vertical-align: middle; height: 100%;">
        <label class="fl commonBlack font16 h-100P mleft-05" :for="'ques'+index+'input'+andex" >{{answer.answerName}}</label>
      </div>
    </template>

    <template v-if="data.questionType === 'su'">
      <textarea type="text" v-model="mAnswerRequestMsg" class="fl commmonBlack" style="width: 100%; min-height: 30px; background-color:white !important; resize: none; border: 1px solid #ccc; border-radius: 5px; outline: none;"/>

    </template>
    <template v-if="data.questionType === 'at'">
      <div style="float: left; width: 100%; padding: 10px 0; padding-top: 0; min-height: 50px;">
        <div style="width: 100%; min-height: 30px;" class="fl w-100P">
          <!-- <p class="boardWriteTitleText fontBold font15 fl commonColor" style="margin-top: 4px;">첨부파일</p> -->
          <attachFileList  @delAttachFile="delAttachFile" @setSelectedAttachFileList="setSelectedAttachFileList"/>
        </div>
      </div>
    </template>
  </div>

  <div class="w-100P fl mtop-2 mbottom-1" style="display: flex; flex-direction: row; justify-content: center; gap:1rem">
    <gBtnSmall class="fl" @click="returnEditPop(this.propData.formKey)" btnTitle="다시수정하기"/>
    <gBtnSmall class="fl" @click="emit('closeXPop')" btnTitle="닫기"/>
  </div>

</div>
</template>

<script>
import attachFileList from '../../unit/formEditor/Tal_attachFile.vue'
export default {
  components: { attachFileList },
  props: {
    propData: {}
  },
  created () {
    this.getMemberForm()
  },
  data () {
    return {
      mQuestList: [],
      dummyData: [{ mFormKey: 1, mFormTitle: '하이브릭 멤버신청', mFormMemo: '하이브릭 멤버활동에 필요한 필수 정보입니다!', activeYn: true, creDate: '2022-08-04 15:00', questionList: [{ questionKey: 0, questionTitle: '성별이 어떻게 되나요?', questionType: 'si', essentialYn: true, answerList: [{ answerName: '여성', answerKey: 0 }, { answerName: '남성', answerKey: 1 }] }, { questionKey: 1, questionTitle: '나이대가 어떻게 되나요?', questionType: 'si', essentialYn: true, answerList: [{ answerName: '10대 ~ 20대', answerKey: '1' }, { answerName: '20대 ~ 30대', answerKey: '2' }, { answerName: '30대 ~ 40대', answerKey: '3' }] }, { questionKey: 2, questionTitle: '취미가 어떻게 되나요?', essentialYn: true, questionType: 'mu', answerList: [{ answerName: '농구', answerKey: '0' }, { answerName: '축구', answerKey: '2' }, { answerName: '배드민턴', answerKey: '3' }] }, { questionKey: 3, questionTitle: '멤버로 가입 후 악의적인 행동 시 별 다른 경고없이 퇴출합니다. 동의하십니까?', essentialYn: true, questionType: 'su' }, { questionKey: 4, questionTitle: '마지막으로 본인을 증명 할 문서를 pdf로 올려주세요.', essentialYn: true, questionType: 'at' }] },
        { mFormKey: 2, mFormTitle: '하이브릭 멤버신청(임시)', mFormMemo: '하이브릭 멤버활동에 필요한 필수 정보입니다!', activeYn: false, creDate: '2022-05-04 15:00', questionList: [{ questionKey: 0, questionTitle: '질문제목', questionType: 'su', essentialYn: true }, { questionKey: 1, questionTitle: '질문제목', questionType: 'si', essentialYn: true, answerList: [{ answerName: '답안' }] }, { questionKey: 2, questionTitle: '질문제목', essentialYn: true, questionType: 'mu', answerList: [{ answerName: '답안' }] }, { questionKey: 3, questionTitle: '질문제목', essentialYn: true, questionType: 'at' }] },
        { mFormKey: 3, mFormTitle: '멤버신청(임시)', mFormMemo: '하이브릭 멤버 신청서입니다!', activeYn: false, creDate: '2021-12-04 15:00', questionList: [{ questionKey: 0, questionTitle: '질문제목', essentialYn: true, questionType: 'su' }, { questionKey: 1, questionTitle: '질문제목', questionType: 'si', essentialYn: true, answerList: [{ answerName: '답안' }] }, { questionKey: 2, questionTitle: '질문제목', questionType: 'mu', essentialYn: true, answerList: [{ answerName: '답안' }] }, { questionKey: 3, questionTitle: '질문제목', essentialYn: true, questionType: 'at' }] }],
      mUploadFileList: []
    }
  },
  methods: {
    returnEditPop () {
      var openPopData = {}
      openPopData.formKey = this.propData.formKey
      openPopData.teamKey = this.propData.teamKey
      openPopData.formData = this.mQuestList
      openPopData.popHeaderText = '공개신청서 만들기'
      openPopData.targetType = 'memberForm'
      this.emit('openPop', openPopData)
    },
    emit (type, data) {
      this.$emit(type, data)
    },
    getMemberForm () {
      // var param = {}
      // param.formKey = this.propData.formKey
      // param.teamKey = this.propData.teamKey
      // var result = await this.$commonAxiosFunction({
      //   url : 'https://www.hybric.net:9443/service/tp.getMQuestion',
      //   param: param
      // })
      // this.mQuestList = result
      var indexOf = this.dummyData.findIndex(i => i.mFormKey === this.propData.formKey)
      this.mQuestList = this.dummyData[indexOf]
      console.log(this.mQuestList)
    },

    delAttachFile (dFile) {
      if (dFile.addYn) {
        for (var d = 0; d < this.mUploadFileList.length; d++) {
          if (this.mUploadFileList[d].attachYn === true && this.mUploadFileList[d].attachKey === dFile[0].attachKey) {
            this.mUploadFileList.splice(d, 1)
          }
        }
      } else {
        this.delAddFalseFileList.push(dFile)
      }
    },
    setSelectedAttachFileList (sFile) {
      if (sFile[0].addYn === true) {
        this.mUploadFileList.push(sFile)
      }
    }
  }
}
</script>

<style >

</style>
