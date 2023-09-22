<i18n>
{
  "ko": {
    "SAMP_NAME_SAMPLE": "샘플 선택",
    "SAMP_TITLE_LIST": "샘플 목록",
    "SAMP_MSG_NOSMAPLE": "선택가능한 샘플이 없습니다.",
    "SAMP_TITLE_PREVIEW": "미리보기",
    "SAMP_BTN_DELETE": "삭제",
    "SAMP_BTN_EDIT": "수정",
    "SAMP_MSG_BEFORE_DELETE": "샘플을 삭제하시겠습니까?",
    "SAMP_MSG_AFTER_DELETE": "샘플이 삭제되었습니다."
  },
  "en": {
    "SAMP_NAME_SAMPLE": "Select sample",
    "SAMP_TITLE_LIST": "Sample List",
    "SAMP_MSG_NOSMAPLE": "There is no selectable sample.",
    "SAMP_TITLE_PREVIEW": "Preview",
    "SAMP_BTN_DELETE": "Delete",
    "SAMP_BTN_EDIT": "Edit",
    "SAMP_MSG_BEFORE_DELETE": "Are you sure you want to delete the sample?",
    "SAMP_MSG_AFTER_DELETE": "The sample has been deleted.The sample has been deleted."
  }
}
</i18n>
<template>
    <div class="fl">
        <div class="sampleDetailPopBg" @click="closeXPop"></div>
        <div class="sampleDetailPopWrap">
            <div class="headerShadow sampleDetailPopHeader">
                <p class="font18 fontBold textLeft">{{ $t('SAMP_NAME_SAMPLE') }}</p>
            </div>
            <div class="sampleDetailPopBody">
                <!-- <gActiveBar ref="activeBar" :tabList="this.activeTabList" class="fl" @changeTab= "changeTab"  style=" width:calc(100%); padding-top: 0!important"/> -->
                <!-- <select style="width: 100%; height: 30px;margin-bottom: 10px;float: left;">
                    <option hidden value="">선택안함</option>
                    <option value=""></option>
                    <option value="">선택안함</option>
                    <option value="">선택안함</option>
                </select> -->
                <div class="sampleDetailPopTop">
                    <div class="sampleDetailPopAdd">
                        <p class="font16 fontBold commonColor textLeft ">[{{this.$changeText(this.cabinetDetail.teamNameMtext)}}] {{ $t('SAMP_TITLE_LIST') }}</p>
                        <gBtnSmall class="sampleDetailPopAddBtn" @click="openMakeSamplePop('new')" :btnTitle="$t('COMMON_BTN_ADD')"/>
                    </div>
                    <div class="sampleDetailPopLeft" @click="goScroll('back')">
                        <img src="../../../assets/images/common/arrowBackIcon.svg" alt="">
                    </div><!-- okScrollBar -->
                    <div ref="sampleScrollWrap" class="sampleScrollWrap">
                    <!-- <div ref="sampleScrollWrap" style="width: calc(100% - 40px); overflow: scroll hidden; height: 100px; float: left;"> -->
                        <div class="sampleDetailContentsBox" :style="'width: ' + this.sampleList.length * 100 + 'px;'">
                            <p class="font15 mleft-05 grayBlack textLeft" v-if="sampleList.length === 0">{{ $t('SAMP_MSG_NOSMAPLE') }}</p>
                            <div class="sampleDetailContentsItem" v-for="(value, index) in sampleList" @click="selectSample(value)" :key="index">
                                <div :class="value.sampleKey === this.selectedSampleObj.sampleKey? 'selectedSample': ''">
                                    <img src="../../../assets/images/common/errorIcon.svg" v-if="value.sampleKey === 9" alt="">
                                    <img src="../../../assets/images/common/timeIcon.svg" v-if="value.sampleKey === 7" alt="">
                                    <img src="../../../assets/images/common/marketIcon.svg" v-if="value.sampleKey === 8" alt="">
                                    <img :src="value.domainPath + value.pathMtext" alt="">
                                    <p class="font14 commonBlack mtop-05 textOverdot" :class="value.sampleKey === this.selectedSampleObj.sampleKey? 'fontBold' : ''">{{this.$changeText(value.titleMtext)}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="sampleDetailPopRight" @click="goScroll('next')">
                        <img src="../../../assets/images/common/arrowNextIcon.svg" alt="">
                    </div>
                    <div class="sampleDetailPopPre">
                        <p class="font16 fontBold commonColor mbottom-05 textLeft">{{ $t('SAMP_TITLE_PREVIEW') }}</p>
                        <div class="font14 sampleDetailPopText" v-html="this.selectedSampleObj.bodyFullStr"></div>
                        <div v-if="this.selectedSampleObj.sampleKey > 0" class="font14 mtop-05 sampleDetailPopDelete" @click="askDelSample">
                          {{ $t('SAMP_BTN_DELETE') }}
                        </div>
                        <div v-if="this.selectedSampleObj.sampleKey > 0" class="font14 mtop-05 sampleDetailPopEdit" @click="this.openMakeSamplePop('modi')">
                          {{ $t('SAMP_BTN_EDIT') }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="sampleDetailPopBottom">
                <gBtnSmall @click="closeXPop" btnThema="light" :btnTitle="$t('COMM_BTN_CLOSE')" />
                <gBtnSmall @click="okSelectSample" :btnTitle="$t('COMMON_BTN_SELECT')" class="mright-05" />
            </div>
            <gConfirmPop :confirmText='confirmText' :confirmType='confirmType' v-if="confirmPopShowYn" @ok="confirmOk" @no='confirmPopShowYn=false'  />
        </div>
        <makeSamplePop :makeType="makeSampleType" :selectedSample="selectedSampleObj" :propsInnerHtml="this.selectedSampleObj.bodyFullStr" v-if="makeSamplePopShowYn" @closeXPop="closeMakeSamplePop" :cabinetDetail="this.cabinetDetail"/>
    </div>
</template>
<script>
import makeSamplePop from './UB_wirteSamplePop.vue'
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
    var history = this.$store.getters['UB_HISTORY/hStack']
    this.popId = 'selectSamplePop' + history.length
    // this.selectPopId = this.$setParentsId(this.pPopId, this.selectPopId)
    history.push(this.popId)
    this.$store.commit('UB_HISTORY/updateStack', history)
    this.getGuideList()
  },
  props: {
    cabinetDetail: {}
  },
  computed: {
    historyStack () {
      return this.$store.getters['UB_HISTORY/hRPage']
    },
    pageUpdate () {
      return this.$store.getters['UB_HISTORY/hUpdate']
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
      this.confirmText = this.$t('SAMP_MSG_BEFORE_DELETE')
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
        url: '/sUniB/tp.saveSample',
        param: param
      })
      this.$showToastPop(this.$t('SAMP_MSG_AFTER_DELETE'))
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
      var hStack = this.$store.getters['UB_HISTORY/hStack']
      var removePage = hStack[hStack.length - 1]
      if (this.popId === hStack[hStack.length - 1]) {
        hStack = hStack.filter((element, index) => index < hStack.length - 1)
        this.$store.commit('UB_HISTORY/setRemovePage', removePage)
        this.$store.commit('UB_HISTORY/updateStack', hStack)
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
        url: '/sUniB/tp.getSampleList',
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
.selectedSample {
  background: ghostwhite
}
.sampleDetailPopBg {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #00000040;
  z-index: 9999999;
}
.sampleDetailPopWrap {
  width: 80%;
  min-height: 500px;
  max-height: 700px;
  border-radius: 0.8rem;
  height: 40%;
  position: fixed;
  background: #FFF;
  z-index: 99999999;
  top: 20%;
  left: 10%;
}
.sampleDetailPopHeader {
  width: 100%;
  padding: 8px 20px;
  height: 40px;
  float: left;
}
.sampleDetailPopBody {
  width: 100%;
  padding: 10px 20px;
  height: calc(100% - 80px);
  float: left;
}
.sampleDetailPopTop {
  width: 100%;
  height: calc(100% - 40px);
  float: left;
}
.sampleDetailPopAdd {
  width: 100%;
  height: 35px;
  position: relative;
  margin-bottom: 0.2rem;
  float: left;
  position: relative;
}
.sampleDetailPopAdd > p {
  margin-top: 3px;
}
.sampleDetailPopAddBtn {
  position: absolute;
  right: 5px;
  top: 0px;
}
.sampleDetailPopLeft {
  float: left;
  margin-right: 5px;
  cursor: pointer;
  width: 15px;
  height: 100px;
  display: flex;
  align-items: center;
}
.sampleScrollWrap {
  width: calc(100% - 40px);
  box-shadow: rgb(140 140 140 / 10%) 0px 0px 10px 4px inset;
  border-radius: 10px;
  padding: 5px;
  overflow: scroll hidden;
  height: 100px;
  float: left;
}
.sampleDetailContentsBox {
  min-width: 100%;
  height: 100%;
  padding: 5px 0;
  float: left;
}
.sampleDetailContentsItem {
  float: left;
  width: 90px;
  height: 100px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.sampleDetailContentsItem > div {
  width: 80px;
  padding: 10px;
  height: 80px;
  box-shadow: rgb(140 140 140 / 26%) 0px 0px 3px 1px;
  float: left;
  border-radius: 5px;
}
.sampleDetailContentsItem > div > img {
  width: 35px;
}
.sampleDetailPopRight {
  float: left;
  margin-left: 5px;
  cursor: pointer;
  width: 15px;
  height: 100px;
  display: flex;
  align-items: center;
}
.sampleDetailPopPre {
  width: 100%;
  height: calc(100% - 200px);
  margin-top:10px;
  float: left;
}
.sampleDetailPopPre > p {
  margin-top: 7px;
}
.sampleDetailPopText {
  width: 100%;
  overflow: hidden scroll;
  text-align: left;
  height: 100%;
  float: left;
  border-radius: 0.8rem;
  box-shadow: rgb(140 140 140 / 10%) 0px 0px 10px 4px inset;
  padding: 10px 20px;
}
.sampleDetailPopDelete {
  cursor: pointer;
  background: #D9D9D9;
  color: #FFF;
  line-height: 30px;
  border-radius: 5px;
  min-width: 3rem;
  float: right;
  height: 30px;
  padding: 0 20px;
  text-align: center;
}
.sampleDetailPopEdit {
  cursor: pointer;
  margin-right: 5px;
  background: #D9D9D9;
  color: #FFF;
  line-height: 30px;
  border-radius: 5px;
  min-width: 3rem;
  float: right;
  height: 30px;
  padding: 0 20px;
  text-align: center;
}
.sampleDetailPopBottom {
  width: 100%;
  padding: 0 20px;
  height: 40px;
  float: left;
}
</style>
