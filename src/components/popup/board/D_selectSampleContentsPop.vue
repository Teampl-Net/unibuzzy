<template>
    <div style="float: left">
        <div @click="closeXPop" style="width: 100%; height: 100%; position: fixed; top: 0; left: 0; background: #00000040; z-index: 9999999;"></div>
        <div style="width: 80%; min-height: 500px; max-height: 700px; border-radius: 0.8rem; height: 40%; position: fixed; background: #FFF; z-index: 99999999; top: 20%; left: 10%;">
            <div style="width: 100%; padding: 8px 20px; height: 40px; float: left;" class="headerShadow">
                <p class="font18 fontBold textLeft">샘플 선택</p>
            </div>
            <div style="width: 100%; padding: 10px 20px; height: calc(100% - 80px); float: left">
                <!-- <gActiveBar ref="activeBar" :tabList="this.activeTabList" class="fl" @changeTab= "changeTab"  style=" width:calc(100%); padding-top: 0!important"/> -->
                <!-- <select style="width: 100%; height: 30px;margin-bottom: 10px;float: left;">
                    <option hidden value="">선택안함</option>
                    <option value=""></option>
                    <option value="">선택안함</option>
                    <option value="">선택안함</option>
                </select> -->
                <div style="width: 100%; height: calc(100% - 40px); float: left;">
                    <div style="width: 100%; height: 35px; position: relative; margin-bottom: 0.2rem; float: left; position: relative;">
                        <p class="font16 fontBold commonColor textLeft " style="margin-top: 3px;">[{{this.$changeText(this.cabinetDetail.teamNameMtext)}}] 샘플 목록</p>
                        <gBtnSmall @click="openMakeSamplePop('new')" btnTitle="추가" style="position: absolute; right: 5px; top: 0px; "/>
                    </div>
                    <div @click="goScroll('back')" style="float: left; margin-right: 5px;cursor: pointer ; width: 15px; height: 100px; display: flex; align-items: center;">
                        <img src="../../../assets/images/common/arrowBackIcon.svg" alt="">
                    </div><!-- okScrollBar -->
                    <div ref="sampleScrollWrap" class=" sampleScrollWrap" style="width: calc(100% - 40px); box-shadow: rgb(140 140 140 / 10%) 0px 0px 10px 4px inset; border-radius: 10px; padding: 5px;overflow: scroll hidden; height: 100px; float: left;">
                    <!-- <div ref="sampleScrollWrap" style="width: calc(100% - 40px); overflow: scroll hidden; height: 100px; float: left;"> -->
                        <div style="min-width: 100%; height: 100%; padding: 5px 0; float: left;" :style="'width: ' + this.sampleList.length * 100 + 'px;'">
                            <p class="font15 mleft-05 grayBlack textLeft" v-if="sampleList.length === 0">선택가능한 샘플이 없습니다.</p>
                            <div v-for="(value, index) in sampleList" @click="selectSample(value)" :key="index" style="float: left; width: 90px; height: 100px; cursor: pointer; display: flex; flex-direction: column; align-items: center;" >
                                <div :class="value.sampleKey === this.selectedSampleObj.sampleKey? 'selectedSample': ''" style="width: 80px; padding: 10px;height: 80px; box-shadow: rgb(140 140 140 / 26%) 0px 0px 3px 1px; float: left; border-radius: 5px;">
                                    <img src="../../../assets/images/common/errorIcon.svg" v-if="value.sampleKey === 9" style="width: 35px;" alt="">
                                    <img src="../../../assets/images/common/timeIcon.svg" v-if="value.sampleKey === 7" style="width: 35px;" alt="">
                                    <img src="../../../assets/images/common/marketIcon.svg" v-if="value.sampleKey === 8" style="width: 35px;" alt="">
                                    <img :src="value.domainPath + value.pathMtext"  style="width: 35px;" alt="">
                                    <p class="font14 commonBlack fontBold mtop-05 textOverdot" :style="value.sampleKey === this.selectedSampleObj.sampleKey? 'font-weight: bold;' : ''">{{this.$changeText(value.titleMtext)}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div @click="goScroll('next')" style="float: left; margin-left: 5px;cursor: pointer ; width: 15px; height: 100px; display: flex; align-items: center;">
                        <img src="../../../assets/images/common/arrowNextIcon.svg" alt="">
                    </div>
                    <div style="width: 100%; height: calc(100% - 200px); margin-top:10px; float: left ">
                        <p class="font16 fontBold commonColor mbottom-05 textLeft" style="margin-top: 7px;">미리보기</p>
                        <div class="font14" v-html="this.selectedSampleObj.bodyFullStr" style="width: 100%; overflow: hidden scroll; text-align: left; height: 100%; float: left; border-radius: 0.8rem; box-shadow: rgb(140 140 140 / 10%) 0px 0px 10px 4px inset; padding: 10px 20px; ">
                        </div>
                        <div v-if="this.selectedSampleObj.sampleKey > 0" class="font14 mtop-05" @click="askDelSample" style=" cursor: pointer; background: #D9D9D9; color: #FFF; line-height: 30px; border-radius: 5px; min-width: 3rem; float: right; height: 30px; padding: 0 20px; text-align: center;">
                            삭제
                        </div>
                        <div v-if="this.selectedSampleObj.sampleKey > 0" class="font14 mtop-05" @click="this.openMakeSamplePop('modi')" style=" cursor: pointer; margin-right: 5px; background: #D9D9D9; color: #FFF; line-height: 30px; border-radius: 5px; min-width: 3rem; float: right; height: 30px; padding: 0 20px; text-align: center;">
                            수정
                        </div>
                    </div>
                </div>
            </div>
            <div style="width: 100%; padding: 0 20px; height: 40px; float: left;">
                <gBtnSmall @click="closeXPop" btnThema="light" btnTitle="닫기" />
                <gBtnSmall @click="okSelectSample" btnTitle="선택" class="mright-05" />
            </div>
            <gConfirmPop :confirmText='confirmText' :confirmType='confirmType' v-if="confirmPopShowYn" @ok="confirmOk" @no='confirmPopShowYn=false'  />
        </div>
        <makeSamplePop :makeType="makeSampleType" :selectedSample="selectedSampleObj" :propsInnerHtml="this.selectedSampleObj.bodyFullStr" v-if="makeSamplePopShowYn" @closeXPop="closeMakeSamplePop" :cabinetDetail="this.cabinetDetail"/>
    </div>
</template>
<script>
import makeSamplePop from './D_wirteSamplePop.vue'
export default {
  components: {
    makeSamplePop
  },
  data () {
    return {
      sampleList: [],
      selectedSampleObj: { sampleKey: 0, bodyMinStr: '', bodyFullStr: '' },
      activeTabList: [{ display: '오류용', name: 'E' }, { display: '문의용', name: 'Q' }],
      previewShowYn: false,
      popId: null,
      confirmText: '',
      confirmType: 'two',
      confirmPopShowYn: false,
      makeSamplePopShowYn: false,
      makeSampleType: 'new'
    }
  },
  created () {
    var history = this.$store.getters['D_HISTORY/hStack']
    this.popId = 'selectSamplePop' + history.length
    // this.selectPopId = this.$setParentsId(this.pPopId, this.selectPopId)
    history.push(this.popId)
    this.$store.commit('D_HISTORY/updateStack', history)
    this.getGuideList()
  },
  props: {
    cabinetDetail: {}
  },
  computed: {
    historyStack () {
      return this.$store.getters['D_HISTORY/hRPage']
    },
    pageUpdate () {
      return this.$store.getters['D_HISTORY/hUpdate']
    }
  },
  watch: {
    pageUpdate (value, old) {
      this.closeXPop()
    },
    historyStack (value, old) {
    }
  },
  methods: {
    goScroll (to) {
      var scrollTarget = this.$refs.sampleScrollWrap
      var scrollW = scrollTarget.scrollLeft
      if (to === 'back') {
        var toLeft = scrollW - 160
        if (toLeft < 0) {
          toLeft = 0
        }
        scrollTarget.scrollTo({ left: toLeft, behavior: 'smooth' })
      } else {
        scrollTarget.scrollTo({ left: scrollW + 160, behavior: 'smooth' })
      }
    },
    openMakeSamplePop (type) {
      this.makeSamplePopShowYn = true
      this.makeSampleType = type
    },
    async closeMakeSamplePop (reloadYn) {
      this.makeSamplePopShowYn = false
      if (reloadYn === true) {
        await this.getGuideList()
        this.selectSample(this.sampleList[0])
      }
    },
    askDelSample () {
      this.confirmText = '샘플을 삭제하시겠습니까?'
      this.confirmPopShowYn = true
    },
    async confirmOk () {
      await this.delSample()
      this.confirmPopShowYn = false
      this.selectedSampleObj = { sampleKey: 0, bodyMinStr: '', bodyFullStr: '' }
    },
    async delSample () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      // eslint-disable-next-line no-new-object
      var sample = new Object()
      sample.sampleKey = this.selectedSampleObj.sampleKey
      sample.deleteYn = true
      param.sample = sample
      // eslint-disable-next-line no-unused-vars
      var result = await this.$commonAxiosFunction({
        url: '/service/tp.saveSample',
        param: param
      })
      this.$showToastPop('샘플이 삭제되었습니다.')
      this.getGuideList()
    },
    async okSelectSample () {
      // eslint-disable-next-line no-debugger
      debugger
      await this.$emit('okSelectSample', this.selectedSampleObj)
      await this.closeXPop()
    },
    openPreviewArea () {
      this.previewShowYn = true
    },
    selectSample (obj) {
      this.selectedSampleObj = obj
    },
    closeXPop () {
      var hStack = this.$store.getters['D_HISTORY/hStack']
      var removePage = hStack[hStack.length - 1]
      if (this.popId === hStack[hStack.length - 1]) {
        hStack = hStack.filter((element, index) => index < hStack.length - 1)
        this.$store.commit('D_HISTORY/setRemovePage', removePage)
        this.$store.commit('D_HISTORY/updateStack', hStack)
        this.$emit('closeXPop')
      }
    },
    async getGuideList (teamKey, userKey, showProfileYn, managerYn) {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.targetType = 'GUIDE_'
      param.creTeamKey = this.cabinetDetail.creTeamKey
      // paramMap.set('followerType', 'M')
      // eslint-disable-next-line no-unused-vars
      var result = await this.$commonAxiosFunction({
        url: '/service/tp.getSampleList',
        param: { sample: param }
      })
      // eslint-disable-next-line no-debugger
      debugger
      console.log(result)
      if (result.data.result === true) {
        this.sampleList = result.data.sampleList
      }
    }
  }
}
</script>

<style scoped>
.selectedSample {background: ghostwhite}
</style>
