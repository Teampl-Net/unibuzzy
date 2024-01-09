<template>
  <div class="pagePaddingWrap memberFormListWrap " >
    <creFormPop v-if="mCreBtnClickYn" @closePop="mCreBtnClickYn = false" :propData="propData" @openPop="openPop" @closeXPop="this.mCreBtnClickYn= false" />
    <gConfirmPop :confirmText='mErrorBoxText' :confirmType='mErrorBoxType' @no='confirmNo'  v-if="mErrorBoxYn" @ok='confirmOk' />

    <gSearchBox @changeSearchList="changeSearchList" @openFindPop="mFindPopShowYn = true " :resultSearchKeyList="this.mResultSearchKeyList" style="margin-bottom:0"/>
    <transition name="showModal">
      <findContentsList transition="showModal" @searchList="requestSearchList" v-if="mFindPopShowYn" @closePop="mFindPopShowYn = false"/>
    </transition>

    <memberFormList :propFormList="mFormList" @goFormDetail="goFormDetail" @formCopyClick="formCopyClick" @deleteClick="deleteClick" @updateForm="updateForm" />

    <div class="btnPlus"  @click="plusBtnClick" ><p style="font-size:40px;">+</p></div>
  </div>
</template>

<script>
import creFormPop from './unit/D_questionBtnSmallPop.vue'
import memberFormList from './unit/D_commonFormList.vue'
export default {
  components: { creFormPop, memberFormList },
  props: {
    propData: {}
  },
  data () {
    return {
      mFormList: [],
      mCreBtnClickYn: false,

      mFindPopShowYn: false,
      dummyData: [{ mFormKey: 1, mFormTitle: '하이브릭 멤버신청', mFormMemo: '하이브릭 멤버활동에 필요한 필수 정보입니다!', activeYn: true, creDate: '2022-08-04 15:00', questionList: [{ questionKey: 0, questionTitle: '성별이 어떻게 되나요?', questionType: 'si', essentialYn: true, answerList: [{ answerName: '여성', answerKey: 0 }, { answerName: '남성', answerKey: 1 }] }, { questionKey: 1, questionTitle: '나이대가 어떻게 되나요?', questionType: 'si', essentialYn: true, answerList: [{ answerName: '10대 ~ 20대', answerKey: '1' }, { answerName: '20대 ~ 30대', answerKey: '2' }, { answerName: '30대 ~ 40대', answerKey: '3' }] }, { questionKey: 2, questionTitle: '취미가 어떻게 되나요?', essentialYn: true, questionType: 'mu', answerList: [{ answerName: '농구', answerKey: '0' }, { answerName: '축구', answerKey: '2' }, { answerName: '배드민턴', answerKey: '3' }] }, { questionKey: 3, questionTitle: '멤버로 가입 후 악의적인 행동 시 별 다른 경고없이 퇴출합니다. 동의하십니까?', essentialYn: true, questionType: 'su' }, { questionKey: 4, questionTitle: '마지막으로 본인을 증명 할 문서를 pdf로 올려주세요.', essentialYn: true, questionType: 'at' }] },
        { mFormKey: 2, mFormTitle: '하이브릭 멤버신청(임시)', mFormMemo: '하이브릭 멤버활동에 필요한 필수 정보입니다!', activeYn: false, creDate: '2022-05-04 15:00', questionList: [{ questionKey: 0, questionTitle: '질문제목', questionType: 'su', essentialYn: true }, { questionKey: 1, questionTitle: '질문제목', questionType: 'si', essentialYn: true, answerList: [{ answerName: '답안' }] }, { questionKey: 2, questionTitle: '질문제목', essentialYn: true, questionType: 'mu', answerList: [{ answerName: '답안' }] }, { questionKey: 3, questionTitle: '질문제목', essentialYn: true, questionType: 'at' }] },
        { mFormKey: 3, mFormTitle: '멤버신청(임시)', mFormMemo: '하이브릭 멤버 신청서입니다!', activeYn: false, creDate: '2021-12-04 15:00', questionList: [{ questionKey: 0, questionTitle: '질문제목', essentialYn: true, questionType: 'su' }, { questionKey: 1, questionTitle: '질문제목', questionType: 'si', essentialYn: true, answerList: [{ answerName: '답안' }] }, { questionKey: 2, questionTitle: '질문제목', questionType: 'mu', essentialYn: true, answerList: [{ answerName: '답안' }] }, { questionKey: 3, questionTitle: '질문제목', essentialYn: true, questionType: 'at' }] }],
      mErrorBoxText: '',
      mErrorBoxType: 'two',
      mErrorBoxYn: false,
      mTempDelIndex: null,
      mResultSearchKeyList: []
    }
  },
  created () {
    this.getChanFormList()
  },
  methods: {
    getChanFormList () {
      var param = {}
      param.teamKey = this.propData.teamKey
      // console.log(param)
      // 서비스가 나오면 여기서 axios로 데이터 받아 set해주기!!!!
      // var result = await this.$commonAxiosFunction({
      //   url : 'https://www.hybric.net:9443/service/tp.getChanFormList',
      //   param: param
      // })
      // if (result) {
      //   this.mFormList = result.data
      // }
      this.mFormList = this.dummyData
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
    plusBtnClick () {
      this.mCreBtnClickYn = true
    },
    goFormDetail (oriDataParam) {
      var openPopParam = {}
      openPopParam.targetType = 'memberForm'
      openPopParam.popHeaderText = '공개신청서 만들기'
      openPopParam.targetKey = this.propData.teamKey
      openPopParam.formKey = oriDataParam.mFormKey
      openPopParam.formData = oriDataParam
      this.openPop(openPopParam)
    },
    async formCopyClick (oriDataParam) {
      var copyForm = JSON.parse(JSON.stringify(oriDataParam.data))

      copyForm.mFormTitle += '(복사)'
      copyForm.mFormKey = this.mFormList.length + 1

      this.mFormList.push(copyForm)
    },
    deleteClick (oriDataParam) {
      var tempData = oriDataParam.data
      this.mTempDelIndex = oriDataParam.index
      this.mErrorBoxText = '[' + tempData.mFormTitle + '] 를 삭제하시겠습니까?'
      this.mErrorBoxType = 'two'
      this.mErrorBoxYn = true
    },
    confirmOk () {
      this.mFormList.splice(this.mTempDelIndex, 1)
      this.mErrorBoxYn = false
      this.mTempDelIndex = null
    },
    confirmNo () {
      this.mErrorBoxYn = false
      this.mTempDelIndex = null
    },
    openPop (openPopParam) {
      this.$emit('openPop', openPopParam)
    }
  }
}
</script>

<style >
.memberFormListWrap { box-sizing: border-box; width: 100%; position: relative; overflow: auto;}
.memberFormListCard {
  /* padding-top: 1rem; */
  line-height: 50px;
  border-bottom : 1px solid #ccc;
  padding: 0 1rem;
  background: white;
  position: relative;
}
</style>
