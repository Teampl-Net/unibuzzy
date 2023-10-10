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
    <div class="fl">
        <div @closeXPop="closeXPop" class="samplePopBg"></div>
        <div class="samplePopWrap">
            <div class="headerShadow samplePopHeader">
                <p class="font18 fontBold textLeft">{{ $t('SAMP_NAME_SET') }}</p>
            </div>
            <div class="samplePopBody">
                <div class="sampleListWrap">
                    <div class="samplePopTop">
                        <p class="font16 fontBold commonColor textLeft">{{ $t('SAMP_TITLE_WRITE') }}</p>
                        <gBtnSmall @click="openSampleListPop" :btnTitle="$t('SAMP_BTN_IMPORT')" class="smallBtn"/>
                    </div>
                    <div class="samplePopContents">
                        <pre id="guideInputArea" ref="guideInputArea" class="fl editableContent" contenteditable=true ></pre>
                    </div>
                </div>
            </div>
            <div class="samplePopBottom">
                <gBtnSmall @click="closeXPop" btnThema="light" :btnTitle="$t('COMM_BTN_CANCEL')" />
                <gBtnSmall @click="saveGuide" :btnTitle="$t('COMMON_BTN_OK')" class="mright-05" />
            </div>
        </div>
        <selectSamplePop :cabinetDetail="cabinetDetail" @okSelectSample="okSelectSample" @closeXPop="closeSamplePop" v-if="samplePopShowYn"/>
    </div>
</template>
<script>
import selectSamplePop from './SelectSampleContentsPop.vue'
export default {
  data () {
    return {
      samplePopShowYn: false,
      popId: null
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
  mounted () {
    if (this.propsInnerHtml) {
      this.$refs.guideInputArea.innerHTML = this.propsInnerHtml
    }
  },
  created () {
    var history = this.$store.getters['UB_HISTORY/hStack']
    this.popId = 'manageSamplePop' + this.cabinetDetail.cabinetKey
    history.push(this.popId)
    this.$store.commit('UB_HISTORY/updateStack', history)
  },
  methods: {
    okSelectSample (selectedObj) {
      var guideInput = this.$refs.guideInputArea
      guideInput.innerHTML = selectedObj.bodyFullStr
    },
    openSampleListPop () {
      this.samplePopShowYn = true
    },
    closeSamplePop () {
      this.samplePopShowYn = false
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
    async saveGuide () {
      var bodyStr = document.getElementById('guideInputArea').innerHTML
      if (this.$checkEmptyInnerHtml(document.getElementById('guideInputArea'))) {
        this.$emit('setSampleGuide', bodyStr)
      } else {
        this.$emit('setSampleGuide', '')
      }
      this.closeXPop()
    }
  }
}
</script>

<style scoped>
.samplePopBg {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #00000026;
  z-index: 999999;
}
.samplePopWrap {
  width: 80%;
  min-height: 500px;
  max-height: 700px;
  border-radius: 0.8rem;
  height: 60%;
  position: fixed;
  background: #FFF;
  z-index: 999999;
  top: 18%;
  left: 10%;
}
.samplePopHeader {
  width: 100%;
  padding: 8px 20px;
  height: 40px;
  float: left;
}
.samplePopBody {
  width: 100%;
  padding: 10px 20px;
  height: calc(100% - 80px);
  float: left;
}
.sampleListWrap {
  width: 100%;
  height: calc(100% - 40px);
  float: left;
}
.samplePopTop {
  width: 100%;
  height: 35px;
  float: left;
  position: relative;
}
.samplePopTop > p {
  margin-top: 7px;
}
.samplePopTop > .smallBtn {
  position: absolute !important;
  right: 5px !important;
  top: 0px !important;
}
.samplePopContents {
  width: 100%;
  height: calc(100% - 50px);
  padding: 5px 10px;
  float: left;
  border: 1px solid #ccc;
}
.samplePopContents > pre {
  width: 100%;
  overflow: hidden scroll;
  height: 100%;
  text-align: left;
  float: left;
  resize: none;
}
.samplePopBottom {
  width: 100%;
  padding: 0 20px;
  height: 40px;
  float: left;
}
</style>
