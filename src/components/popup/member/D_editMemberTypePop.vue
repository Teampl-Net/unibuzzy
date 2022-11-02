<template>
  <div class="pSide-15 ptop-50 wh-100P " style="" :style="leftShowYn === true ? 'padding-left:0' : ''">
    <leftTab v-show="leftShowYn" :class="{'ani-leftIn': leftShowYn === true, 'ani-leftOut': leftShowYn === false}" :memberTypeList='memberTypeList' @changeTab='changeTab' @addMemberType='addMemberType' @closePop='leftBack()' />
    <div class="fl w-100P" style="white-space:nowrap; display: inline; padding-top:1.5rem">
      <div class="fl textLeft font12 commonDarkGray tempLeftTabBtn fontBold" style="margin-top: 3px;" @click="leftShowYn = true" v-show="leftShowYn === false">{{tempLeftImg}}</div>

      <p class="fl font18 fontBold textLeft commonDarkGray mleft-05 ">{{memberTypeList[currentListIDX].mFormTitle}}</p>

      <templine class="fl" style="border-bottom:1px solid #ccc; width:100%; height:1px;" />

      <div class="fl mtop-1" :key="reloadKey" style="padding: 0 10px">
        <label class='fl font16 commonColor fontBold' :for="memberTypeList[currentListIDX].mFormKey" >실명인증</label>
        <gToggle class="fl mleft-1" style="scale: 1.2;" id="rNameAuth" :toggleId='memberTypeList[currentListIDX].mFormKey' @changeToggle='rNameAuthYn = !rNameAuthYn' :isChecked="rNameAuthYn === true" />
        <p class="fl w-100P font14 commonColor textLeft">(성명, 전화번호)</p>
        <!-- memberTypeList[currentListIDX] -->
        <mTypeQueList :questionList="memberTypeList[currentListIDX].InfoQueList" @addQuestion="addQuestion" @editQue="editQue" class="mtop-1" />
      </div>

    </div>

  </div>
</template>
<script>
import leftTab from './memberUnit/memTypeUnit/D_memTypeLeftTab.vue'
import mTypeQueList from './memberUnit/memTypeUnit/D_mTypeQueList.vue'
export default {
  components: {
    leftTab,
    mTypeQueList
  },
  props: {
    propData: {}
  },
  created () {
    console.log(this.propData)
    this.readyFunc()
  },
  data () {
    return {
      tempLeftImg: '>>',
      leftShowYn: false,
      dummyData: [{ mFormKey: 1, mFormTitle: '더알림 멤버신청', rNameAuthYn: true, creDate: '2022-08-04 15:00', InfoQueList: [{ InfoQueKey: 0, InfoQueTitle: '동', InfoQueType: 'su', essentialYn: true }, { InfoQueKey: 1, InfoQueTitle: '호수', InfoQueType: 'su', essentialYn: true }, { InfoQueKey: 2, InfoQueTitle: '거주유형', essentialYn: true, InfoQueType: 'si', answerList: [{ answerName: '임차인' }, { answerName: '임대인' }] }] },
        { mFormKey: 2, mFormTitle: '더알림 멤버신청(임시)', rNameAuthYn: false, creDate: '2022-05-04 15:00', InfoQueList: [{ InfoQueKey: 0, InfoQueTitle: '질문제목', InfoQueType: 'su', essentialYn: true }, { InfoQueKey: 1, InfoQueTitle: '질문제목', InfoQueType: 'si', essentialYn: true, answerList: [{ answerName: '답안' }] }, { InfoQueKey: 2, InfoQueTitle: '질문제목', essentialYn: true, InfoQueType: 'mu', answerList: [{ answerName: '답안' }] }, { InfoQueKey: 3, InfoQueTitle: '질문제목', essentialYn: true, InfoQueType: 'at' }] },
        { mFormKey: 3, mFormTitle: '멤버신청(임시)', rNameAuthYn: false, creDate: '2021-12-04 15:00', InfoQueList: [{ InfoQueKey: 0, InfoQueTitle: '질문제목', essentialYn: true, InfoQueType: 'su' }, { InfoQueKey: 1, InfoQueTitle: '질문제목', InfoQueType: 'si', essentialYn: true, answerList: [{ answerName: '답안' }] }, { InfoQueKey: 2, InfoQueTitle: '질문제목', InfoQueType: 'mu', essentialYn: true, answerList: [{ answerName: '답안' }] }, { InfoQueKey: 3, InfoQueTitle: '질문제목', essentialYn: true, InfoQueType: 'at' }] }],
      memberTypeList: [],
      currentListIDX: 0,
      reloadKey: 0
    }
  },
  methods: {
    leftBack () {
      setTimeout(() => {
        this.leftShowYn = false
      }, 200)
    },
    readyFunc () {
      this.getMemType()
    },
    getMemType () {
      if (!this.propData.teamKey) return
      // var param = {}
      // param.teamKey = this.propData.teamKey
      // await this.$commonAxiosFunction({
      //   url: 'service/tp.getMemberTypeList',
      //   param: param
      // }).then((result)=>{
      //   console.log(result)
      // this.memberTypeList = result
      // })

      this.memberTypeList = this.dummyData
    },
    addQuestion () {
      if (!this.propData.teamKey) return
      var param = {}
      param.newYn = true
      param.targetType = 'memInfoCreEditPop'
      param.teamKey = this.propData.teamKey
      this.$emit('openPop', param)
    },
    editQue (params) {
      if (!this.propData.teamKey) return
      var param = {}
      param.newYn = false
      param.targetType = 'memInfoCreEditPop'
      param.teamKey = this.propData.teamKey
      param.data = params.data
      console.log(param)
      this.$emit('openPop', param)
    },
    changeTab (listIDX) {
      console.log(listIDX)
      this.currentListIDX = listIDX
      this.reloadKey += 1
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
