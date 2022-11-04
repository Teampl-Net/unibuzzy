<template>
  <div class="pSide-15 ptop-50 wh-100P" style="overflow-x: scroll; white-space:nowrap;" :style="leftShowYn === true ? 'padding: 50px 0 0 0; display: flex;' : ''">
    <leftTab v-show="leftShowYn" :class="{'ani-leftIn': leftanimaYn === true, 'ani-leftOut': leftanimaYn === false}" :memberTypeList='memberTypeList' @changeTab='changeTab' @addMemberType='addMemberType' @closePop='leftBack()' />

    <div class="fl wh-100P" :style="innerWidth" style="white-space:nowrap; display: inline; padding-top:1.5rem; min-width: var(--minwidth); position: relative; ">
      <div class="fl textLeft font12 commonDarkGray tempLeftTabBtn fontBold" style="margin-top: 3px;" @click="leftShowYn = true, leftanimaYn = true" v-show="leftShowYn === false">{{tempLeftImg}}</div>
      <p class="fl font18 fontBold textLeft commonDarkGray mleft-05 ">{{memberTypeList[currentListIDX].mFormTitle}}</p>

      <templine class="fl" style="border-bottom:1px solid #ccc; width:100%; height:1px;" />

      <div class="fl mtop-1" :key="reloadKey" style="padding: 0 10px">
        <label class='fl font16 commonColor fontBold' :for="memberTypeList[currentListIDX].mFormKey" >실명인증</label>
        <gToggle class="fl mleft-1" style="scale: 1.2;" id="rNameAuth" :toggleId='memberTypeList[currentListIDX].mFormKey' @changeToggle='memberTypeList[currentListIDX].rNameAuthYn = !memberTypeList[currentListIDX].rNameAuthYn' :isChecked="memberTypeList[currentListIDX].rNameAuthYn" />
        <p class="fl w-100P font14 commonColor textLeft">(성명, 전화번호)</p>
        <!-- memberTypeList[currentListIDX] -->
        <mTypeQueList :questionList="memberTypeList[currentListIDX].InfoQueList" @addQuestion="addQuestion" @editQue="editQue" class="mtop-1" />
      </div>

      <div class="w-100P" style="position: absolute; left:0; bottom:0; min-height:50px; display: flex; align-items: center; justify-content: center; border-top: 1px solid #ccc;">
        <gBtnSmall :btnTitle="'저장'" @click="save" class="mright-05" style=""/>
        <gBtnSmall :btnTitle="'닫기'" @click="closeXPop" class="mleft-05" style=""/>
      </div>
    </div>
  </div>
</template>
<script>
import leftTab from './memberUnit/D_memTypeLeftTab.vue'
import mTypeQueList from './memberUnit/D_mTypeQueList.vue'
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
    this.$showToastPop('현재 테스트 화면이며, 작동되지 않습니다. 추후 업데이트를 기다려주세요!')
  },
  data () {
    return {
      tempLeftImg: '>>',
      leftShowYn: false,
      dummyData: [{ mFormKey: 1, mFormTitle: '더알림 아파트 멤버', rNameAuthYn: true, creDate: '2022-08-04 15:00', InfoQueList: [{ InfoQueKey: 0, InfoQueTitle: '동', InfoQueType: 'su', essentialYn: true }, { InfoQueKey: 1, InfoQueTitle: '호수', InfoQueType: 'su', essentialYn: true }, { InfoQueKey: 2, InfoQueTitle: '거주유형', essentialYn: true, InfoQueType: 'si', answerList: [{ answerName: '임차인' }, { answerName: '임대인' }] }, { InfoQueKey: 3, InfoQueTitle: '거주유형', essentialYn: true, InfoQueType: 'siList', answerList: [{ answerName: '임차인' }, { answerName: '임대인' }] }] },
        { mFormKey: 2, mFormTitle: '더알림 임직원', rNameAuthYn: false, creDate: '2022-05-04 15:00', InfoQueList: [{ InfoQueKey: 0, InfoQueTitle: '직급', InfoQueType: 'su', essentialYn: true }, { InfoQueKey: 1, InfoQueTitle: '소속', InfoQueType: 'si', essentialYn: true, answerList: [{ answerName: '개발팀' }, { answerName: '디자인팀' }, { answerName: '지원팀' }] }, { InfoQueKey: 2, InfoQueTitle: '근무 층', essentialYn: true, InfoQueType: 'siList', answerList: [{ answerName: '1층' }, { answerName: '2층' }, { answerName: '3층' }] }, { InfoQueKey: 3, InfoQueTitle: '확인코드', essentialYn: true, InfoQueType: 'su' }] },
        { mFormKey: 3, mFormTitle: '멤버', rNameAuthYn: false, creDate: '2021-12-04 15:00', InfoQueList: [{ InfoQueKey: 0, InfoQueTitle: '이름', InfoQueType: 'su', essentialYn: true }, { InfoQueKey: 1, InfoQueTitle: '소속', InfoQueType: 'si', essentialYn: true, answerList: [{ answerName: '개발팀' }, { answerName: '디자인팀' }, { answerName: '지원팀' }] }] }],
      memberTypeList: [],
      currentListIDX: 0,
      reloadKey: 0,
      leftanimaYn: true
    }
  },
  methods: {
    closeXPop () {
      this.$emit('closeXPop')
    },
    leftBack () {
      this.leftanimaYn = false
      setTimeout(() => {
        this.leftShowYn = false
      }, 300)
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
  },
  computed: {
    innerWidth () {
      var innerWidth = window.innerWidth + 'px'
      return {
        '--minwidth': 'calc(' + innerWidth + ' - 3rem)'
      }
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
