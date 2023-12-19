<i18n>
{
  "ko": {
    "SAMP_NAME_SET": "예시글 설정",
    "SAMP_BTN_IMPORT": "샘플 가져오기",
    "SAMP_TITLE_WRITE": "작성하기"
  },
  "en": {
    "SAMP_NAME_SET": "Set a Sample",
    "SAMP_BTN_IMPORT": "Import a Sample",
    "SAMP_TITLE_WRITE": "Write a Sample"
  }
}
</i18n>
<template>
    <div style="float: left">
        <div @closeXPop="closeXPop" style="width: 100%; height: 100%; position: fixed; top: 0; left: 0; background: #00000026; z-index: 99999;"></div>
        <div style="width: 80%; min-height: 500px; max-height: 700px; border-radius: 0.8rem; height: 60%; position: fixed; background: #FFF; z-index: 999999; top: 18%; left: 10%;">
            <div style="width: 100%; padding: 8px 20px; height: 40px; float: left;" class="headerShadow">
                <p class="font18 fontBold textLeft">{{ $t('SAMP_NAME_SET') }}</p>
            </div>
            <div style="width: 100%; padding: 10px 20px; height: calc(100% - 80px); float: left">
                <div style="width: 100%; height: calc(100% - 40px); float: left;">
                    <div style="width: 100%; height: 35px; float: left; position: relative;">
                        <p class="font16 fontBold commonColor textLeft" style="margin-top: 7px;">{{ $t('SAMP_TITLE_WRITE') }}</p>
                        <gBtnSmall @click="openSampleListPop" :btnTitle="$t('SAMP_BTN_IMPORT')" style="position: absolute; right: 5px; top: 0px; "/>
                    </div>
                    <div style="width: 100%; height: calc(100% - 50px); padding: 5px 10px; float: left; border: 1px solid #ccc;">
                        <pre id="guideInputArea" ref="guideInputArea" class="fl editableContent" style="width: 100%; overflow: hidden scroll; height: 100%; text-align:left; float: left; resize: none;"  contenteditable=true ></pre>
                        <!-- <div ref="guideInputArea" id="guideInputArea" class="font15" style="width: 100%; overflow: hidden scroll; height: 100%; text-align: left;" :contenteditable="true"></div> -->
                    </div>
                </div>
            </div>
            <div style="width: 100%; padding: 0 20px; height: 40px; float: left;">
                <!-- <gBtnSmall v-if="this.$store.getters['D_USER/GE_USER'].userKey === 1" @click="addSample" btnTitle="샘플로 저장" class="fl" style="float: left;" /> -->
                <gBtnSmall @click="closeXPop" btnThema="light" :btnTitle="$t('COMMON_BTN_CANCEL')" />
                <gBtnSmall @click="saveGuide" :btnTitle="$t('COMMON_BTN_OK')" class="mright-05" />
            </div>
        </div>
        <selectSamplePop :cabinetDetail="cabinetDetail" @okSelectSample="okSelectSample" @closeXPop="closeSamplePop" v-if="samplePopShowYn"/>
    </div>
</template>
<script>
import selectSamplePop from './D_selectSampleContentsPop.vue'
export default {
  data () {
    return {
      samplePopShowYn: false,
      popId: null,
      smapleIconList: [],
      makeSampleIconFilekey: null
    }
  },
  props: {
    cabinetDetail: {},
    propsInnerHtml: {}
  },
  components: {
    selectSamplePop
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
    if (this.propsInnerHtml) {
      this.$refs.guideInputArea.innerHTML = this.propsInnerHtml
    }
  },
  created () {
    var history = this.$store.getters['D_HISTORY/hStack']
    this.popId = 'manageSamplePop' + this.cabinetDetail.cabinetKey
    // this.selectPopId = this.$setParentsId(this.pPopId, this.selectPopId)
    history.push(this.popId)
    this.$store.commit('D_HISTORY/updateStack', history)
    // this.getGuidList()
  },
  methods: {
    okSelectSample (selectedObj) {
      var guideInput = this.$refs.guideInputArea
      guideInput.innerHTML = selectedObj.bodyFullStr
      // this.closeSamplePop()
    },
    openSampleListPop () {
      this.samplePopShowYn = true
    },
    closeSamplePop () {
      this.samplePopShowYn = false
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
    async saveGuide () {
      var bodyStr = document.getElementById('guideInputArea').innerHTML
      // bodyStr = bodyStr.trim()
      if (this.$checkEmptyInnerHtml(document.getElementById('guideInputArea'))) {
        this.$emit('setSampleGuide', bodyStr)
      } else {
        this.$emit('setSampleGuide', '')
      }
      // eslint-disable-next-line no-debugger
      debugger
      this.closeXPop()
    }
  }
}
</script>

<style scoped>

</style>
