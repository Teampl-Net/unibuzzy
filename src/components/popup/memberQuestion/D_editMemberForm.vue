<template>
  <div class="pagePaddingWrap editMemberFormWrap" >

    <div class="w-100P fl" style="background:white; border-radius:10px; padding:1rem; box-shadow:0 4px 9px 0 #00000040;">
      <div class="w-100P fl">
        <label for="mFormTitle" class="fl font16 commonBlack" >제목</label>
        <input class="fr " style="width:calc(100% - 50px);" type="text" id="mFormTitle" v-model="mInputFormTitle">
      </div>

      <div class="w-100P fl mtop-05">
        <label for="mFormMemo" class="fl font16 commonBlack" >설명</label>
        <textarea name="" id="mFormMemo" v-model="mInputmFormMemo" class="fr font14" style="width:calc(100% - 50px); resize:none; border:1px solid #ccc; border-radius:5px " rows="2" ></textarea>
      </div>

      <div class="w-100P fl mtop-05" >
        <gToggle class="fr" toggleId="memberFormActiveYn" @changeToggle="updateForm" :isChecked="mActiveYn" /><label for="memberFormActiveYn" class="commonColor fr font14 mright-05">멤버 신청서 활성화</label>
      </div>
    </div>

    <commonQuestionList :propQuestionList="mQuestionList" @mQCopy="questionCopy" @mQDelete="questionDelete" @addAnswerBtnClick="addAnswerBtnClick" :key="mQuestionReloadKey" />

    <commonMQusetBtns style="width:80%;" @addQuestion="addQuestion" @saveQuestion="saveQuestion" />
  </div>
  <mQuestionSucc v-if="mQuestionSuccYn" @closePop="closePop" @editClick="mQuestionSuccYn = false" @preview="preview" />
</template>

<script>
import commonQuestionList from './unit/D_commonQuestionList.vue'
import commonMQusetBtns from './unit/D_commonMQuestionBottomBtn.vue'
import mQuestionSucc from './unit/D_commonMQuestion_Succ.vue'
export default {
  components: { commonQuestionList, commonMQusetBtns, mQuestionSucc },
  props: {
    propData: {}
  },
  data () {
    return {
      mFormData: {},
      mInputFormTitle: '',
      mInputmFormMemo: '',
      mActiveYn: false,
      mQuestionList: [],
      mQuestionSuccYn: false,
      mQuestionReloadKey: 0
    }
  },
  created () {
    console.log(this.propData)
    if (this.propData && this.propData.formData) {
      this.mFormData = JSON.parse(JSON.stringify(this.propData.formData))
      this.setting()
    }
  },
  methods: {
    setting () {
      this.mInputFormTitle = this.mFormData.mFormTitle
      this.mInputmFormMemo = this.mFormData.mFormMemo
      this.mActiveYn = this.mFormData.activeYn
      this.mQuestionList = this.mFormData.questionList
    },
    addQuestion () {
      var data = {}
      data = { questionKey: this.mQuestionList.length + 1, questionTitle: '질문제목', questionType: 'su', essentialYn: true }
      this.mQuestionList.push(data)
      // this.mQuestionReloadKey += 1
    },

    closePop () {
      this.$emit('closeXPop')
    },
    preview () {
      this.mQuestionSuccYn = false
      var param = {}
      param.targetType = 'mQPreview'
      param.popHeaderText = '공개신청서 미리보기'
      param.teamKey = this.propData.targetKey
      param.formKey = this.propData.formKey
      this.$emit('openPop', param)
      // this.$emit('closeNewPop', param)
    },
    async saveQuestion () {
      // var param = {}
      // param.formKey = this.mFormData.questionKey
      // var result = await this.$commonAxiosFunction({
      //   url: 'https://www.hybric.net:9443/service/tp.saveMemberForm',
      //   param: param
      // })
      // // console.log(result)
      // this.$emit('saveQuestion')
      this.mQuestionSuccYn = true
    },
    updateForm (formData) {
      console.log(formData)
      // 활성화 토글 시
      // var param = {}
      // param.key = formData.key
      // param.activeYn = true
      // var result = await this.$commonAxiosFunction({
      //   url : 'https://www.hybric.net:9443/service/tp.changeMQuestion',
      //   param: param
      // })
      formData.activeYn = !formData.activeYn
    },
    questionCopy (params) {
      console.log(this.mQuestionList[params.index])
      var tempData = JSON.parse(JSON.stringify(params.data))
      tempData.questionKey = this.mQuestionList.length + 1
      // this.mQuestionList.push(tempData)
      this.mQuestionList.splice(params.index, 0, tempData)
      // this.mQuestionReloadKey += 1
    },
    questionDelete (params) {
      this.mQuestionList.splice(params.index, 1)
      // this.mQuestionReloadKey += 1
    },
    addAnswerBtnClick (params) {
      console.log(params)
      var temp = {}
      temp.answerName = '답안'
      if (!this.mQuestionList[params.index].answerList) {
        this.mQuestionList[params.index].answerList = []
      }
      console.log(this.mQuestionList[params.index])
      this.mQuestionList[params.index].answerList.push(temp)

      // this.mQuestionReloadKey += 1
    }
  }
}
</script>

<style >
.editMemberFormWrap { box-sizing: border-box; width: 100%; position: relative;

padding: 60px 0.5rem 0px 0.5rem;
background: #f0ebf8;
overflow: auto;
}

</style>
