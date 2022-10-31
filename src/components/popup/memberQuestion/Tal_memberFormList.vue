<template>
  <div class="pagePaddingWrap memberFormListWrap " >
    <creFormPop v-if="creFormYn" @closePop="creFormYn = false" :propData="propData" @openPop="openPop" @closeXPop="this.creFormYn= false" />
    <gConfirmPop :confirmText='errorBoxText' :confirmType='errorBoxType' @no='confirmNo'  v-if="errorBoxYn" @ok='confirmOk' />
  <!-- <gSearchBox @changeSearchList="changeSearchList" @openFindPop="this.findPopShowYn = true " :resultSearchKeyList="this.resultSearchKeyList" /> -->
    <gSearchBox @changeSearchList="changeSearchList" @openFindPop="findPopShowYn = true " :resultSearchKeyList="this.resultSearchKeyList" />
    <transition name="showModal">
      <findContentsList transition="showModal" @searchList="requestSearchList" v-if="findPopShowYn" @closePop="findPopShowYn = false"/>
    </transition>

    <memberFormList :list="memberFormList" @goDetail="goDetail" @copyClick="copyClick" @deleteClick="deleteClick" @toggle="toggle" />

    <div class="btnPlus formBtnWich"  @click="plusBtnClick" ><p style="font-size:40px;">+</p></div>
  </div>
</template>

<script>
import creFormPop from './Tal_creMemberFormListPop.vue'
import memberFormList from './Tal_commonMemberFormList.vue'
export default {
  components: { creFormPop, memberFormList },
  props: {
    propData: {}
  },
  data () {
    return {
      memberFormList: [],
      creFormYn: false,
      findPopShowYn: false,
      // dummyData: [{ mFormKey: 1, mFormTitle: '더알림 멤버신청', mFormMemo: '더알림 멤버활동에 필요한 필수 정보입니다!', activeYn: true, creDate: '2022-08-04 15:00' },
      //   { mFormKey: 2, mFormTitle: '더알림 멤버신청(임시)', mFormMemo: '더알림 멤버활동에 필요한 필수 정보입니다!', activeYn: false, creDate: '2022-05-04 15:00' },
      //   { mFormKey: 3, mFormTitle: '멤버신청(임시)', mFormMemo: '더알림 멤버활동에 필요한 ', activeYn: false, creDate: '2021-12-04 15:00' }],
      // dummyData: [{ mFormKey: 1, mFormTitle: '더알림 멤버신청', mFormMemo: '더알림 멤버활동에 필요한 필수 정보입니다!', activeYn: true, creDate: '2022-08-04 15:00', questionList: [{ questionTitle: '질문제목', questionType: 'su' }, { questionTitle: '질문제목', questionType: 'si', answerList: [{ answerName: '답안' }] }, { questionTitle: '질문제목', questionType: 'mu', answerList: [{ answerName: '답안' }] }, { questionTitle: '질문제목', questionType: 'at' }] }],
      dummyData: [{ mFormKey: 1, mFormTitle: '더알림 멤버신청', mFormMemo: '더알림 멤버활동에 필요한 필수 정보입니다!', activeYn: true, creDate: '2022-08-04 15:00', questionList: [{ questionKey: 0, questionTitle: '질문제목', questionType: 'su', essentialYn: true }, { questionKey: 1, questionTitle: '질문제목', questionType: 'si', essentialYn: true, answerList: [{ answerName: '답안' }] }, { questionKey: 2, questionTitle: '질문제목', essentialYn: true, questionType: 'mu', answerList: [{ answerName: '답안' }] }, { questionKey: 3, questionTitle: '질문제목', essentialYn: true, questionType: 'at' }] },
        { mFormKey: 2, mFormTitle: '더알림 멤버신청(임시)', mFormMemo: '더알림 멤버활동에 필요한 필수 정보입니다!', activeYn: false, creDate: '2022-05-04 15:00', questionList: [{ questionKey: 0, questionTitle: '질문제목', questionType: 'su', essentialYn: true }, { questionKey: 1, questionTitle: '질문제목', questionType: 'si', essentialYn: true, answerList: [{ answerName: '답안' }] }, { questionKey: 2, questionTitle: '질문제목', essentialYn: true, questionType: 'mu', answerList: [{ answerName: '답안' }] }, { questionKey: 3, questionTitle: '질문제목', essentialYn: true, questionType: 'at' }] },
        { mFormKey: 3, mFormTitle: '멤버신청(임시)', mFormMemo: '더알림 멤버 신청서입니다!', activeYn: false, creDate: '2021-12-04 15:00', questionList: [{ questionKey: 0, questionTitle: '질문제목', essentialYn: true, questionType: 'su' }, { questionKey: 1, questionTitle: '질문제목', questionType: 'si', essentialYn: true, answerList: [{ answerName: '답안' }] }, { questionKey: 2, questionTitle: '질문제목', questionType: 'mu', essentialYn: true, answerList: [{ answerName: '답안' }] }, { questionKey: 3, questionTitle: '질문제목', essentialYn: true, questionType: 'at' }] }],
      errorBoxText: '',
      errorBoxType: 'two',
      errorBoxYn: false,
      delIndex: null
    }
  },
  created () {
    this.getChanMemberForm()
  },
  methods: {
    getChanMemberForm () {
      // console.log(this.propData)
      var param = {}
      param.teamKey = this.propData.teamKey
      // console.log(param)
      // 서비스가 나오면 여기서 axios로 데이터 받아 set해주기!!!!
      // var result = await this.$commonAxiosFunction({
      //   url : 'service/tp.getChanMemberForm',
      //   param: param
      // })
      this.memberFormList = this.dummyData
    },
    toggle (data) {
      // 활성화 토글 시
      // var param = {}
      // param.key = key
      // param.activeYn = true
      // var result = await this.$commonAxiosFunction({
      //   url : 'service/tp.changeMQuestion',
      //   param: param
      // })
      data.activeYn = !data.activeYn
    },
    plusBtnClick () {
      this.creFormYn = true
    },
    goDetail (data) {
      var param = {}
      param.targetType = 'memberForm'
      param.targetKey = this.propData.teamKey
      param.formKey = data.mFormKey
      param.formData = data
      this.openPop(param)
    },
    async copyClick (params) {
      var data = params.data
      var tempList = []
      tempList = this.memberFormList
      var temp = data
      temp.mFormTitle += '(복사)'
      temp.mFormKey += 1
      await tempList.push(temp)

      this.memberFormList = tempList
      // console.log(this.memberFormList)
    },
    deleteClick (params) {
      var data = params.data
      this.delIndex = params.index
      this.errorBoxText = '[' + data.mFormTitle + '] 를 삭제하시겠습니까?'
      this.errorBoxType = 'two'
      this.errorBoxYn = true
    },
    confirmOk () {
      this.memberFormList.splice(this.delIndex, 1)
      this.errorBoxYn = false
      this.delIndex = null
    },
    confirmNo () {
      this.errorBoxYn = false
      this.delIndex = null
    },
    openPop (param) {
      this.$emit('openPop', param)
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
