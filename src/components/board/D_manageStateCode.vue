<template>
    <div :ref="'stateCodeFor' + this.contentsKey" v-if="DISP_CODE_VALUE" style=" padding: 0 10px; border-radius: 8px; background: #bfbfda;  color: #fff; text-align: left;">
        <div @click="openSelectPop" class="font14">{{this.$changeText(DISP_CODE_VALUE.codeNameMtext)}}</div>
        <div @click="closeSelectPop" v-show="selectPopShowYn" style="width: 100vw; height: 100vh; position: fixed; top: 0; left: 0; background: #00000025; z-index: 999"></div>
        <div v-if="selectPopShowYn" style="display: flex; padding: 10px 0; flex-direction: column; width: 80%; min-height: 300px; position: fixed; box-shadow: rgb(0 0 0 / 12%) 4px 4px 12px 1px; top: 25%; left: 10%; border-radius:0.8rem; background: #FFF; z-index: 9999">
            <div style="width: 100%; float: left; padding: 0 20px; box-shadow: 0 4px 4px -4px #ccc; height: 35px; " class="font18 commonColor fontBold">상태설정</div>
            <div style="width: 100%; float: left; padding: 0 20px; margin-top: 10px;">
                <div @click="selectCode(value)" :style="Number(index) === Number(this.codeList.length - 1)? 'border-bottom: none !important;':'border-bottom: 1px solid #ccc;'" :class="value.codeKey === selectedCodeObj.codeKey? 'selectedCode' : ''" v-for="(value, index) in this.codeList" :key="index" style="width: 100%; position: relative; border min-height: 30px; padding: 5px 0;">
                    <p class="commonBlack mleft-05 font16 fontBold">{{this.$changeText(value.codeNameMtext)}}</p>
                    <img v-if="value.codeKey === selectedCodeObj.codeKey" src="../../assets/images/common/Tal_checkImage.svg" style="width: 20px;position: absolute; right: 10px; top: 10px;" alt="">
                </div>
            </div>
            <div style="width: 100%; height: 40px; padding: 5px 20px; margin-top: 15px;">
                <gBtnSmall @click="closeSelectPop" btnThema="light" btnTitle="취소"/>
                <gBtnSmall @click="changeContentsStat" btnTitle="적용" class="mright-05"/>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      selectPopShowYn: false,
      selectPopId: null,
      selectedCodeObj: { codeKey: null, codeNameMtext: null },
      colorList: [
        '#FFCDD2',
        '#F8BBD0',
        '#E1BEE7',
        '#D1C4E9',
        '#C5CAE9',
        '#BBDEFB',
        '#B3E5FC',
        '#B2EBF2',
        '#FFCCBC',
        '#FFE0B2',
        '#FFECB3',
        '#FFF9C4',
        '#F0F4C3',
        '#DCEDC8',
        '#C8E6C9',
        '#B2DFDB'
      ]
    }
  },
  created () {
    // eslint-disable-next-line no-debugger
    debugger
    console.log(this.codeList)
    console.log(this.currentCodeKey)
  },
  props: {
    codeList: {},
    currentCodeKey: {},
    contentsKey: {},
    teamKey: {}
  },
  methods: {
    openSelectPop () {
      var history = this.$store.getters['D_HISTORY/hStack']
      this.selectPopId = 'selectStateCodePop' + this.contentsKey
      // this.selectPopId = this.$setParentsId(this.pPopId, this.selectPopId)
      history.push(this.selectPopId)
      this.$store.commit('D_HISTORY/updateStack', history)
      this.selectPopShowYn = true
    },
    closeSelectPop () {
      var hStack = this.$store.getters['D_HISTORY/hStack']
      var removePage = hStack[hStack.length - 1]
      if (this.selectPopId === hStack[hStack.length - 1]) {
        hStack = hStack.filter((element, index) => index < hStack.length - 1)
        this.$store.commit('D_HISTORY/setRemovePage', removePage)
        this.$store.commit('D_HISTORY/updateStack', hStack)
        var idx = this.codeList.findIndex((item) => item.codeKey === this.currentCodeKey)
        this.selectPopShowYn = false
        if (idx !== -1) {
          this.selectedCodeObj = this.codeList[idx]
        } else {
          this.selectedCodeObj = this.codeList[0]
        }
      }
    },
    selectCode (value) {
      this.selectedCodeObj = value
    },
    async changeContentsStat () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      try {
        if (this.currentCodeKey === this.selectedCodeObj.codeKey) {
        } else {
          param.workStatCodeKey = this.selectedCodeObj.codeKey
          param.contentsKey = this.contentsKey
          param.creTeamKey = this.teamKey
          var result = await this.$saveContents(param)
          if (result.result === true) {
            var newParam = {}
            newParam.contentsKey = result.contents.contentsKey
            newParam.jobkindId = 'BOAR'
            await this.$getContentsList(newParam).then(newReslute => {
              this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', newReslute.content)
            })
            this.$showToastPop('업무 상태가 변경되었습니다.')
            this.closeSelectPop()

            // eslint-disable-next-line no-new-object
          /* var params = new Object()
          params.contentsKey = result.contents.contentsKey
          params.jobkindId = result.contents.jobkindId
          var resultList = await this.$getContentsList(param)
          var detailData = resultList.content[0]
          this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [detailData]) */
          }
        }
      } catch (error) {
        console.error(error)
        // this.$showToastPop('일시적인 오류로 발송하지 못했습니다. 잠시 후 다시 시도해주세요.')
      } finally {
        this.$emit('closeXPop', true)
        this.sendLoadingYn = false
      }
    }
  },
  computed: {
    DISP_CODE_VALUE () {
      if (!this.codeList) return null
      if (!this.currentCodeKey) {
        return { codeNameMtext: this.codeList[0].codeNameMtext, codeKey: this.codeList[0].codeKey }
      }
      var idx = this.codeList.findIndex((item) => item.codeKey === this.currentCodeKey)
      if (idx === -1) return null
      return this.codeList[idx]
    },
    historyStack () {
      return this.$store.getters['D_HISTORY/hRPage']
    },
    pageUpdate () {
      return this.$store.getters['D_HISTORY/hUpdate']
    }
  },
  watch: {
    DISP_CODE_VALUE: {
      immediate: true,
      handler (value, old) {
        if (value) {
          this.selectedCodeObj = value
          // alert(value)
        }
      },
      deep: true
    },
    pageUpdate (value, old) {
      this.closeSelectPop()
    },
    historyStack (value, old) {
    }
  }
}
</script>
<style scoped>
.selectedCode {background: rgba(186, 187, 215, 0.5);}
</style>
