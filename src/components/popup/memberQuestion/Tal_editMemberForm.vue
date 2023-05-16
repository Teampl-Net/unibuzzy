<template>
<div class="pagePaddingWrap editMemberFormWrap" >
  <div class="w-100P fl" style="background:white; border-radius:10px; padding:1rem; box-shadow:0 4px 9px 0 #00000040;">
    <div class="w-100P fl">
      <label for="mFormTitle" class="fl font18 commonBlack" >제목</label><input class="fr " style="width:calc(100% - 50px);" type="text" id="mFormTitle" v-model="inputmFormTitle">
    </div>
    <div class="w-100P fl mtop-05">
      <label for="mFormMemo" class="fl font18 commonBlack" >설명</label>
      <!-- <input class="fr" style="width:calc(100% - 50px)" type="text" id="mFormMemo" v-model="inputmFormMemo"> -->
      <textarea name="" id="mFormMemo" v-model="inputmFormMemo" class="fr font14" style="width:calc(100% - 50px); resize:none; border:1px solid #ccc; border-radius:5px " rows="2" ></textarea>
    </div>
    <div class="w-100P fl mtop-05" >
      <gToggle class="fr" toggleId="memberFormActiveYn" @changeToggle="changeActiveForm" :isChecked="activeToggle" /><label for="memberFormActiveYn" class="commonColor fr font14 mright-05">멤버 신청서 활성화</label>
    </div>
    <!-- <p>{{memberFormData.mFormTitle}}</p>
    <h2>dkssu</h2> -->
  </div>
  <!-- <div class="w-100P fl" style=""> -->
  <commonQuestionList :list="questionList" @mQCopy="mQcopy" @mQDelete="mQDelete" @addAnswerClick="addAnswerClick" />
  <!-- </div> -->
  <commonMQusetBtns style="width:80%;" @addQuestion="addQuestion" @saveQuestion="saveQuestion" />
<mQuestionSucc v-if="mQuestionSuccYn" @closePop="closePop" @editClick="mQuestionSuccYn = false" @preview="preview" />
</div>
</template>

<script>
// import { VueDraggableNext } from 'vue-draggable-next'
import commonQuestionList from './Tal_commonQuestionList.vue'
import commonMQusetBtns from './Tal_commonMQuestionBottomBtn.vue'
import mQuestionSucc from './Tal_commonMQuestion_Succ.vue'
export default {
  components: { commonQuestionList, commonMQusetBtns, mQuestionSucc },
  // components: { draggable: VueDraggableNext },
  props: {
    propData: {}
  },
  data () {
    return {
      memberFormData: {},
      inputmFormTitle: '',
      inputmFormMemo: '',
      activeToggle: false,
      questionList: [],
      tempId: 9,
      mQuestionSuccYn: false
    }
  },
  created () {
    // console.log('this.propData')
    // console.log(this.propData)
    if (this.propData) {
      this.memberFormData = this.propData.formData
      this.setting()
    }
  },
  methods: {
    setting () {
      this.inputmFormTitle = this.memberFormData.mFormTitle
      this.inputmFormMemo = this.memberFormData.mFormMemo
      this.activeToggle = this.memberFormData.activeYn
      this.questionList = this.memberFormData.questionList
    },
    editCardSet (data, index) {
      this.inputQuestionTitle = data.questionTitle
      this.editIndex = index
    },
    addQuestion () {
      var data = {}
      data = { questionKey: this.tempId++, questionTitle: '질문제목', questionType: 'su', essentialYn: true }
      this.questionList.push(data)
    },
    closePop () {
      this.$emit('closeXPop')
    },
    preview () {
      var param = {}
      param.targetType = 'mQPreview'
      param.popHeaderText = '공개신청서 미리보기'
      param.teamKey = this.propData.targetKey
      param.formKey = this.propData.formKey
      this.$emit('openPop', param)
    },
    async saveQuestion () {
      this.mQuestionSuccYn = true
      // var param = {}
      // param.formKey = this.memberFormData.questionKey
      // var result = await this.$commonAxiosFunction({
      //   url: '/service/tp.saveMemberForm',
      //   param: param
      // })
      // // console.log(result)
      // this.$emit('saveQuestion')
    },
    mQcopy (params) {
      this.questionList.splice(params.index, 0, params.data)
    },
    mQDelete (params) {
      this.questionList.splice(params.index, 1)
    },
    changeActiveForm () {
      // 활성화 토글 시
      // var param = {}
      // param.key = key
      // param.activeYn = true
      // var result = await this.$commonAxiosFunction({
      //   url : '/service/tp.changeMQuestion',
      //   param: param
      // })
    },
    addAnswerClick (params) {
      var temp = {}
      temp.answerName = '답안'
      if (this.questionList[params.index].answerList) {
        this.questionList[params.index].answerList.push(temp)
      } else {
        this.questionList[params.index].answerList = []
        this.questionList[params.index].answerList.push(temp)
      }
    }
  }
}
</script>

<style >
.editMemberFormWrap { box-sizing: border-box; width: 100%; position: relative;

padding: 60px 0.5rem 0px 0.5rem;
/* background: ghostwhite; */
background: #f0ebf8;
overflow: auto;
}
.questionListCard {
  /* padding-top: 1rem; */
  line-height: 50px;
  border-bottom : 1px solid #ccc;
  padding: 0 1rem;
  background: white;
  position: relative;
}

</style>
