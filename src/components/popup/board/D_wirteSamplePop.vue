<i18n>
{
  "ko": {
    "SAMP_NAME_ADD_SAMPLE": "샘플 추가",
    "SAMP_NAME_EDIT_SAMPLE": "샘플 수정",
    "SAMP_TITLE_NAME": "샘플명",
    "SAMP_TITLE_ICON": "아이콘",
    "SAMP_TITLE_CONTENTS": "샘플내용",
    "SAMP_MSG_NONAME": "샘플명을 입력해주세요.",
    "SAMP_MSG_NOICON": "샘플 아이콘을 선택해주세요.",
    "SAMP_MSG_EDITED": "샘플이 수정되었습니다.",
    "SAMP_MSG_ADDED": "샘플이 추가되었습니다."
  },
  "en": {
    "SAMP_NAME_ADD_SAMPLE": "Add a Sample",
    "SAMP_NAME_EDIT_SAMPLE": "Edit a Sample",
    "SAMP_TITLE_ICON": "Icon",
    "SAMP_TITLE_CONTENTS": "Sample Contents",
    "SAMP_MSG_NONAME": "Please enter a sample name.",
    "SAMP_MSG_NOICON": "Please select a sample icon.",
    "SAMP_MSG_EDITED": "The sample has been edited.",
    "SAMP_MSG_ADDED": "The sample have been added.",
    "SAMP_TITLE_NAME": "Sample Name"
  }
}
</i18n>
<template>
    <div style="float: left">
        <div  @click="closeXPop" style="width: 100%; height: 100%; position: fixed; top: 0; left: 0; background: #00000026; z-index: 9999999;"></div>
        <transition name="showUp">
            <div style="width: 80%; min-height: 500px; max-height: 700px; border-radius: 0.8rem 0.8rem 0.8rem 0.8rem; height: 80%; position: fixed; background: #FFF; z-index: 99999999; top: 10%; left: 10%;">
                <div style="width: 100%; padding: 12px 20px; height: 50px; float: left; position: relative;" class="headerShadow">
                    <p class="font18 fontBold textLeft">{{makeType === 'modi'? $t('SAMP_NAME_EDIT_SAMPLE') : $t('SAMP_NAME_ADD_SAMPLE')}}</p>
                    <img @click="closeXPop" src="../../../assets/images/common/popup_close.png" style="position: absolute; right: 20px; top: 12px; width: 25px;" alt="">
                </div>
                <div style="width: 100%; padding: 10px 20px; height: calc(100% - 120px); float: left">
                    <!-- <div style="width: 100%; height: 35px; float: left; position: relative;">
                        <p class="font16 fontBold commonColor textLeft" style="margin-top: 7px;">{{propsInnerHtml? '수정' : '작성'}}하기</p>
                        <gBtnSmall @click="addSample" btnTitle="저장" style="position: absolute; right: 5px; top: 0px; "/>
                    </div> -->
                    <div style="float: left; width: 100%; height: calc(100%); display: flex; flex-direction: column; align-items: center;">
                        <div style="width: 100%; float: left; ">
                            <label  for="sampleTitleMtext" class="font15 fontBold grayBlack textLeft fl" style="width: 70px; line-height: 30px;">{{ $t('SAMP_TITLE_NAME') }}</label>
                        <input id="sampleTitleMtext" type="text" class="font15 textLeft" style="width: calc(100%);  margin-bottom: 1rem;height: 30px;" :placeholder="$t('SAMP_MSG_NONAME')" name="" v-model="sampleTitleMtext" >
                        </div>
                        <p class="font15 fontBold grayBlack w-100P mbottom-05 textLeft fl">
                          {{ $t('SAMP_TITLE_ICON') }}
                        </p>
                        <div style="width: 100%; float: left; display: flex; align-items: center;">
                            <div @click="goScroll('back')" style="float: left; margin-right: 5px; cursor: pointer ;width: 15px; height: 70px; display: flex; align-items: center;">
                                <img src="../../../assets/images/common/arrowBackIcon.svg" alt="">
                            </div>
                            <div ref="scrollIconWrap" style="height: 70px; width: calc(100% - 40px); float: left; padding: 10px 0; overflow: scroll hidden;">
                                <div :style="'width: +' + (60 * smapleIconList.length) + 'px;'" style="height: 100%; float: left;">
                                    <div @click="this.makeSampleIconFilekey = value.imageFilekey" v-for="(value, index) in smapleIconList" :style="this.makeSampleIconFilekey === value.imageFilekey ? 'background: #F1F1FF;' : ''" :key="index" style="padding: 5px; border-radius: 8px; margin-right: 5px; border: 1px solid #ccc; cursor: pointer; float: left; width: 50px; height: 50px; ">
                                        <img :src="value.domainPath + value.pathMtext" style="width: 100%; float: left;" alt="">
                                    </div>
                                </div>
                            </div>
                            <div @click="goScroll('next')" style="float: left; margin-left: 5px; width: 15px; cursor: pointer ; height: 100px; display: flex; align-items: center;">
                                <img src="../../../assets/images/common/arrowNextIcon.svg" alt="">
                            </div>
                        </div>
                        <!-- <div style="width: 80px; height: 80px; border-radius: 8px; border: 1px solid #ccc;">
                            아이콘을 선택하세요!
                        </div> -->
                        <p class="font15 fontBold grayBlack textLeft fl w-100P mbottom-05" >{{ $t('SAMP_TITLE_CONTENTS') }}</p>
                        <div style="width: 100%; height: calc(100% - 170px); padding: 5px 10px; border-radius: 8px; float: left; border: 1px solid #ccc;">
                            <pre id="sampleInputArea" ref="sampleInputArea" class="fl editableContent" style="width: 100%; overflow: hidden scroll; height: 100%; text-align:left; float: left; resize: none;"  contenteditable=true ></pre>
                            <!-- <div ref="sampleInputArea" id="sampleInputArea" class="font15" style="width: 100%; overflow: hidden scroll; height: 100%; text-align: left;" :contenteditable="true"></div> -->
                        </div>
                    </div>
                </div>
                <div style="width: 100%; height: 40px; float: left; padding: 0 20px;">
                    <gBtnSmall @click="closeXPop" btnTitle="취소" btnThema="light"/>
                    <gBtnSmall @click="createSample" :btnTitle="makeType === 'modi' ? $t('COMM_BTN_EDIT2') : $t('COMMON_BTN_ADD')" class="mright-05"/>
                </div>
                <!-- <div v-if="titleMtextShowYn" style="height: 100%; width: 100%; background: #00000026; position: fixed;left: 0%; top: 0%;z-index: 999999;">
                </div>
                <div v-if="titleMtextShowYn" style="height: 300px; width: 80%; background: #FFF; box-shadow: 0 0 4px 4px #00000026; border-radius: 0.8rem; position: fixed; padding: 10px 0; left: 10%; top: 30%;z-index: 9999999;">
                    <div class="headerShadow" style="width: 100%; height: 30px; float: left; padding: 0 20px;">
                        <p class="font16 fontBold textLeft commonColor mbottom-05">샘플 {{propsInnerHtml? '수정' : '작성'}}</p>
                    </div>
                </div> -->
            </div>
        </transition>
      <gConfirmPop @no="this.errorShowYn = false" :confirmText="errorBoxText" confirmType='timeout' v-if="errorShowYn" />
    </div>
</template>
<script>
export default {
  data () {
    return {
      samplePopShowYn: false,
      popId: null,
      sampleTitleMtext: '',
      addSampleMtextPopId: null,
      smapleIconList: [],
      makeSampleIconFilekey: null,
      errorBoxYn: false,
      errorShowYn: false,
      errorBoxText: ''
    }
  },
  props: {
    cabinetDetail: {},
    propsInnerHtml: {},
    makeType: {},
    selectedSample: {}
  },
  components: {
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
  mounted () {
    if (this.makeType === 'modi' && this.propsInnerHtml) {
      // eslint-disable-next-line no-debugger
      debugger
      this.$refs.sampleInputArea.innerHTML = this.propsInnerHtml
      if (this.selectedSample) {
        this.sampleTitleMtext = this.$changeText(this.selectedSample.titleMtext)
        if (this.selectedSample.imageFilekey) {
          this.makeSampleIconFilekey = this.selectedSample.imageFilekey
        }
      }
    }
  },
  created () {
    this.getCodeList()
    var history = this.$store.getters['D_HISTORY/hStack']
    this.popId = 'writeSamplePop' + this.cabinetDetail.cabinetKey
    // this.selectPopId = this.$setParentsId(this.pPopId, this.selectPopId)
    history.push(this.popId)
    this.$store.commit('D_HISTORY/updateStack', history)
    // this.getGuidList()
  },
  methods: {
    goScroll (to) {
      var scrollTarget = this.$refs.scrollIconWrap
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
    async getCodeList () {
      var resultList = null
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.groupCode = 'S_ICON'
      resultList = await this.$getCodeList(param)
      this.smapleIconList = resultList
      // eslint-disable-next-line no-debugger
      debugger
      // this.contentsHeight = document.getElementById('chanIconBox').scrollHeight
      // var a = this.teamImgList
    },
    addSample () {
      /* var bodyStr = document.getElementById('sampleInputArea').innerHTML
      bodyStr = bodyStr.trim()
      if (!bodyStr || bodyStr === '') {
        return
      }
      var history = this.$store.getters['D_HISTORY/hStack']
      this.addSampleMtextPopId = 'addSampleMtextPop' + this.cabinetDetail.cabinetKey
      // this.selectPopId = this.$setParentsId(this.pPopId, this.selectPopId)
      history.push(this.addSampleMtextPopId)
      this.$store.commit('D_HISTORY/updateStack', history) */
      this.getCodeList()
      /* this.titleMtextShowYn = true */
    },
    okSelectSample (selectedObj) {
      /* var guideInput = this.$refs.sampleInputArea
      guideInput.innerHTML = selectedObj.bodyFullStr */
      // this.closeSamplePop()
    },
    async makeSample () {
      /* this.$showAxiosLoading(true)
      var hStack = this.$store.getters['D_HISTORY/hStack']
      var removePage = hStack[hStack.length - 1]
      hStack = hStack.filter((element, index) => index < hStack.length - 1)
      this.$store.commit('D_HISTORY/setRemovePage', removePage)
      this.$store.commit('D_HISTORY/updateStack', hStack)
      this.titleMtextShowYn = false
      await this.createSample() */
    },
    closeXPop (reloadYn) {
      // eslint-disable-next-line no-debugger
      debugger
      var hStack = this.$store.getters['D_HISTORY/hStack']
      var removePage = hStack[hStack.length - 1]
      if (this.popId === hStack[hStack.length - 1]) {
        hStack = hStack.filter((element, index) => index < hStack.length - 1)
        this.$store.commit('D_HISTORY/setRemovePage', removePage)
        this.$store.commit('D_HISTORY/updateStack', hStack)
        this.$emit('closeXPop', reloadYn)
      }
    },
    async saveGuide () {
      var bodyStr = document.getElementById('sampleInputArea').innerHTML
      // bodyStr = bodyStr.trim()
      this.$emit('setSampleGuide', bodyStr)
      // eslint-disable-next-line no-debugger
      debugger
      this.closeXPop()
    },
    async createSample () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      // eslint-disable-next-line no-new-object
      var sample = new Object()
      sample.titleMtext = this.cabinetDetail.teamMenuKey
      sample.targetType = 'GUIDE_'
      var bodyStr = document.getElementById('sampleInputArea').innerHTML
      bodyStr = bodyStr.trim()
      sample.bodyMinStr = bodyStr
      sample.bodyFullStr = bodyStr
      // eslint-disable-next-line no-debugger
      debugger
      if (this.makeType === 'modi') {
        sample.sampleKey = this.selectedSample.sampleKey
      }
      sample.creTeamKey = this.cabinetDetail.targetKey
      if (this.sampleTitleMtext.trim() === '') {
        this.errorBoxText = this.$t('SAMP_MSG_NONAME')
        this.errorShowYn = true
        return
      }
      if (!this.makeSampleIconFilekey) {
        this.errorBoxText = this.$t('SAMP_MSG_NOICON')
        this.errorShowYn = true
        return
      }
      sample.imageFilekey = this.makeSampleIconFilekey
      sample.titleMtext = 'KO$^$' + this.sampleTitleMtext
      sample.creUserKey = this.$store.getters['D_USER/GE_USER'].userKey
      param.sample = sample
      // eslint-disable-next-line no-unused-vars
      var result = await this.$commonAxiosFunction({
        url: 'https://mo.d-alim.com:9443/service/tp.saveSample',
        param: param
      })
      this.sampleTitleMtext = ''
      this.makeSampleIconFilekey = null
      if (this.makeType === 'modi') {
        this.$showToastPop(this.$t('SAMP_MSG_EDITED'))
      } else {
        this.$showToastPop(this.$t('SAMP_MSG_ADDED'))
      }
      this.closeXPop(true)
    }
  }
}
</script>

<style scoped>

</style>
