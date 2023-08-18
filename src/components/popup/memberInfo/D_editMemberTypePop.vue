<template>
  <div class="pSide-15 ptop-50 wh100P" style="overflow-x: scroll; white-space:nowrap;" :style="leftShowYn === true ? 'padding: 50px 0 0 0; display: flex;' : ''">
    <leftTab :selectedKey="mSelectedMemberTypeObj? mSelectedMemberTypeObj.memberTypeKey : undefined" ref="editMemPopRef" :propMemberTypeList='mMemberTypeList' @changeTab='changeTab' @addMemberType='saveMemberType' @closePop='leftBack()' />

    <memberTypeDetail style="width: calc(100% - 130px);" @reloadPage="getMemberTypeList" ref="memberTypeDetail" @addQuestion="addQuestion" @editQue="editQue" :propMemberTypeDetail="mSelectedMemberTypeObj" :key="reloadKey" :propLeftYn='leftShowYn' @showLeftBar='showLeftBar' @deleteType='deleteMemberType' />
  </div>
</template>
<script>
import leftTab from './memberUnit/D_memTypeLeftTab.vue'
import memberTypeDetail from './D_memberTypeDetail.vue'
export default {
  components: {
    leftTab,
    memberTypeDetail
  },
  props: {
    propData: {}
  },
  created () {
    console.log(this.propData)
    this.readyFunc()
    /* this.$showToastPop('현재 테스트 화면이며, 작동되지 않습니다. 추후 업데이트를 기다려주세요!') */
  },
  data () {
    return {
      tempLeftImg: '>>',
      leftShowYn: true,
      dummyData: [{ mFormKey: 1, mFormTitle: '더알림 아파트 멤버', rNameAuthYn: true, creDate: '2022-08-04 15:00', InfoQueList: [{ InfoQueKey: 0, InfoQueTitle: '동', InfoQueType: 'su', essentialYn: true }, { InfoQueKey: 1, InfoQueTitle: '호수', InfoQueType: 'su', essentialYn: true }, { InfoQueKey: 2, InfoQueTitle: '거주유형', essentialYn: true, InfoQueType: 'si', answerList: [{ answerName: '임차인' }, { answerName: '임대인' }] }, { InfoQueKey: 3, InfoQueTitle: '거주유형', essentialYn: true, InfoQueType: 'siList', answerList: [{ answerName: '임차인' }, { answerName: '임대인' }] }] },
        { mFormKey: 2, mFormTitle: '더알림 임직원', rNameAuthYn: false, creDate: '2022-05-04 15:00', InfoQueList: [{ InfoQueKey: 0, InfoQueTitle: '직급', InfoQueType: 'su', essentialYn: true }, { InfoQueKey: 1, InfoQueTitle: '소속', InfoQueType: 'si', essentialYn: true, answerList: [{ answerName: '개발팀' }, { answerName: '디자인팀' }, { answerName: '지원팀' }] }, { InfoQueKey: 2, InfoQueTitle: '근무 층', essentialYn: true, InfoQueType: 'siList', answerList: [{ answerName: '1층' }, { answerName: '2층' }, { answerName: '3층' }] }, { InfoQueKey: 3, InfoQueTitle: '확인코드', essentialYn: true, InfoQueType: 'su' }] },
        { mFormKey: 3, mFormTitle: '멤버', rNameAuthYn: false, creDate: '2021-12-04 15:00', InfoQueList: [{ InfoQueKey: 0, InfoQueTitle: '이름', InfoQueType: 'su', essentialYn: true }, { InfoQueKey: 1, InfoQueTitle: '소속', InfoQueType: 'si', essentialYn: true, answerList: [{ answerName: '개발팀' }, { answerName: '디자인팀' }, { answerName: '지원팀' }] }] }],
      mMemberTypeList: [],
      mSelectedMemberTypeObj: {},
      reloadKey: 0,
      leftanimaYn: true
    }
  },
  methods: {
    showLeftBar () {
      this.leftShowYn = true
      this.reloadKey += 1
    },
    async deleteMemberType (deleteData) {
      console.log(deleteData)
      if (this.mMemberTypeList.length === 1) {
        this.$showToastPop('적어도 멤버 유형은 1개 이상 존재해야 합니다!')
        return
      }
      var deleteParam = {}
      deleteParam.memberTypeKey = deleteData.memberTypeKey
      var deleteResult = await this.$commonAxiosFunction({
        url: 'https://www.unibuzzy.com/sUniB/tp.deteteMemberType',
        param: deleteParam
      })
      console.log(deleteResult)

      await this.getMemberTypeList()
      this.$nextTick(() => {
        this.$refs.editMemPopRef.changeTab(this.mMemberTypeList[0], 0)
      })
      // this.reloadKey += 1
    },
    async saveMemberType (data) {
      // eslint-disable-next-line no-new-object
      var saveParam = new Object()
      saveParam.teamKey = this.propData.teamKey
      saveParam.nameMtext = 'KO$^$' + data
      saveParam.certiYn = false
      saveParam.sampleYn = false
      saveParam.creUserKey = this.GE_USER.userKey
      var saveMemberType = await this.$commonAxiosFunction({
        url: 'https://www.unibuzzy.com/sUniB/tp.saveMemberType',
        param: { member: saveParam }
      })
      console.log(saveMemberType)
      this.getMemberTypeList()
      // this.reloadKey += 1
    },
    async getMemberTypeList () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.teamKey = this.propData.teamKey
      var memberTypeList = await this.$commonAxiosFunction({
        url: 'https://www.unibuzzy.com/sUniB/tp.getMemberTypeList',
        param: param
      }, true)
      if (memberTypeList.data.result) {
        this.mMemberTypeList = memberTypeList.data.memberTypeList
      }
      // eslint-disable-next-line no-debugger
      debugger
    },
    refreshList () {
      this.getMemberTypeList()
      this.$refs.memberTypeDetail.refreshList()
    },
    closeXPop () {
      this.$emit('closeXPop')
    },
    leftBack () {
      this.leftanimaYn = false
      setTimeout(() => {
        this.leftShowYn = false
      }, 300)
    },
    async readyFunc () {
      if (this.propData.initData) {
        this.mMemberTypeList = this.propData.initData
        this.mSelectedMemberTypeObj = this.mMemberTypeList[0]
        console.log(this.mSelectedMemberTypeObj)
      } else {
        await this.getMemberTypeList() // 추후 제거
      }
      /* this.$nextTick(() => {
        this.$refs.editMemPopRef.changeTab(this.mMemberTypeList[0], 0)
      }) */
    },
    addQuestion () {
      if (!this.propData.teamKey) return
      var param = {}
      param.newYn = true
      param.targetType = 'memInfoCreEditPop'
      param.popHeaderText = '멤버정보 추가'
      param.teamKey = this.propData.teamKey
      param.selectedMemberType = this.mSelectedMemberTypeObj
      this.$emit('openPop', param)
    },
    editQue (params) {
      // eslint-disable-next-line no-debugger
      debugger
      if (!this.propData.teamKey) return
      var param = {}
      param.newYn = false
      param.targetType = 'memInfoCreEditPop'
      param.popHeaderText = '멤버정보 수정'
      param.teamKey = this.propData.teamKey
      param.selectedMemberType = params.data
      console.log(param)
      this.$emit('openPop', param)
    },
    changeTab (selectedObj) {
      console.log(selectedObj)
      this.mSelectedMemberTypeObj = selectedObj
      this.reloadKey += 1
    }
  },
  computed: {
    innerWidth () {
      var innerWidth = window.innerWidth + 'px'
      return {
        '--minwidth': 'calc(' + innerWidth + ' - 3rem)'
      }
    },
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    }
  }
}
</script>
<style>
.tempLeftTabBtn{
  width: 20px;
  height: 20px;
  border-radius: 5px;
  background: #cccccc;
  /* background: rgb(204 204 204 / 50%); */
  filter: drop-shadow(0px 1px 2px #cccccc);

  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
