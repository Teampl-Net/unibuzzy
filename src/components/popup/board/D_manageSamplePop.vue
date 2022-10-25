<template>
    <div style="float: left">
        <div style="width: 100%; height: 100%; position: fixed; top: 0; left: 0; background: #00000026; z-index: 99999;"></div>
        <div style="width: 80%; min-height: 500px; max-height: 700px; border-radius: 0.8rem; height: 60%; position: fixed; background: #FFF; z-index: 999999; top: 18%; left: 10%;">
            <div style="width: 100%; padding: 8px 20px; height: 40px; float: left;" class="headerShadow">
                <p class="font18 fontBold textLeft">제시글 설정</p>
            </div>
            <div style="width: 100%; padding: 10px 20px; height: calc(100% - 80px); float: left">
                <div style="width: 100%; height: calc(100% - 40px); float: left;">
                    <div style="width: 100%; height: 35px; float: left; position: relative;">
                        <p class="font16 fontBold commonColor textLeft" style="margin-top: 7px;">작성하기</p>
                        <gBtnSmall @click="openSampleListPop" btnTitle="샘플 가져오기" style="position: absolute; right: 5px; top: 0px; "/>
                    </div>
                    <div style="width: 100%; height: calc(100% - 50px); padding: 5px 10px; float: left; border: 1px solid #ccc;">
                        <pre id="guideInputArea" ref="guideInputArea" class="fl editableContent" style="width: 100%; overflow: hidden scroll; height: 100%; text-align:left; float: left; resize: none;"  contenteditable=true ></pre>
                        <!-- <div ref="guideInputArea" id="guideInputArea" class="font15" style="width: 100%; overflow: hidden scroll; height: 100%; text-align: left;" :contenteditable="true"></div> -->
                    </div>
                </div>
            </div>
            <div v-if="titleMtextShowYn" style="height: 100%; width: 100%; background: #00000026; position: fixed;left: 0%; top: 0%;z-index: 999999;">
            </div>
            <div v-if="titleMtextShowYn" style="height: 200px; width: 80%; background: #FFF; box-shadow: 0 0 4px 4px #00000026; border-radius: 0.8rem; position: fixed; padding: 10px 20px; left: 10%; top: 30%;z-index: 9999999;">
                <p class="font16 fontBold textLeft commonColor mbottom-05">제시글 샘플</p>
                <!-- <img src="../../../assets/images/common/popup_close.png" style="width: 20px; position: absolute; right: 20px; top: 10px;" alt=""> -->
                <input type="text" class="font16 textLeft" style="width: 100%; margin-bottom: 1rem;height: 30px;" placeholder="샘플명을 입력하세요" name="" v-model="sampleTitleMtext" id="">
                <gBtnSmall @click="closeXPop" btnTitle="취소" btnThema="light"/>
                <gBtnSmall @click="createSample" btnTitle="생성" class="mright-05"/>
            </div>
            <div style="width: 100%; padding: 0 20px; height: 40px; float: left;">
                <gBtnSmall v-if="this.$store.getters['D_USER/GE_USER'].userKey === 1" @click="addSample" btnTitle="템플릿 생성" class="fl" style="float: left;" />
                <gBtnSmall @click="closeXPop" btnThema="light" btnTitle="취소" />
                <gBtnSmall @click="saveGuide" btnTitle="적용" class="mright-05" />
            </div>
        </div>
        <selectSamplePop @okSelectSample="okSelectSample" @closeXPop="closeSamplePop" v-if="samplePopShowYn"/>
    </div>
</template>
<script>
import selectSamplePop from './D_selectSampleContentsPop.vue'
export default {
  data () {
    return {
      samplePopShowYn: false,
      popId: null,
      sampleTitleMtext: '',
      addSampleMtextPopId: null,
      titleMtextShowYn: false
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
    closeTitleMtextPop () {
      this.titleMtextShowYn = false
    },
    addSample () {
      var bodyStr = document.getElementById('guideInputArea').innerHTML
      bodyStr = bodyStr.trim()
      if (!bodyStr || bodyStr === '') {
        alert('내용을 추가해주세요')
        return
      }
      var history = this.$store.getters['D_HISTORY/hStack']
      this.addSampleMtextPopId = 'addSampleMtextPop' + this.cabinetDetail.cabinetKey
      // this.selectPopId = this.$setParentsId(this.pPopId, this.selectPopId)
      history.push(this.addSampleMtextPopId)
      this.$store.commit('D_HISTORY/updateStack', history)
      this.titleMtextShowYn = true
    },
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
      } else if (this.addSampleMtextPopId === hStack[hStack.length - 1]) {
        hStack = hStack.filter((element, index) => index < hStack.length - 1)
        this.$store.commit('D_HISTORY/setRemovePage', removePage)
        this.$store.commit('D_HISTORY/updateStack', hStack)
        this.titleMtextShowYn = false
      }
    },
    async saveGuide () {
      var bodyStr = document.getElementById('guideInputArea').innerHTML
      // bodyStr = bodyStr.trim()
      this.$emit('setSampleGuide', bodyStr)
      // eslint-disable-next-line no-debugger
      debugger
      this.closeXPop()
    },
    async createSample () {
      // console.log(this.permissionWGroup.selectedList)
      // console.log(this.permissionVGroup.selectedList)
      // console.log(this.permissionRGroup.selectedList)

      // eslint-disable-next-line no-new-object
      var param = new Object()
      // eslint-disable-next-line no-new-object
      var sample = new Object()
      sample.titleMtext = this.cabinetDetail.teamMenuKey
      sample.targetType = 'GUIDE_'
      var bodyStr = document.getElementById('guideInputArea').innerHTML
      bodyStr = bodyStr.trim()
      sample.bodyMinStr = bodyStr
      sample.bodyFullStr = bodyStr
      sample.titleMtext = 'KO$^$' + this.sampleTitleMtext
      sample.creUserKey = this.$store.getters['D_USER/GE_USER'].userKey
      param.sample = sample
      // eslint-disable-next-line no-unused-vars
      var result = await this.$commonAxiosFunction({
        url: 'service/tp.saveSample',
        param: param
      })
    },
    async getGuidList (teamKey, userKey, showProfileYn, managerYn) {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.targetType = 'GUIDE_'
      // para'service//'followerType', 'M')
      // eslint-disable-next-line no-unused-vars
      var result = await this.$commonAxiosFunction({
        url: 'service/tp.getSampleList',
        sample: param
      })
      // eslint-disable-next-line no-debugger
      debugger
    }
  }
}
</script>

<style scoped>

</style>
