<template>
    <div :ref="'stateCodeFor' + this.contentsKey" v-if="DISP_CODE_VALUE" style=" padding: 0 10px; border-radius: 8px; background: #bfbfda;  color: #fff; text-align: left;">
        <div @click="openSelectPop" class="font14">{{this.$changeText(DISP_CODE_VALUE.codeNameMtext)}}</div>
        <div @click="closeSelectPop" v-show="selectPopShowYn" style="width: 100vw; height: 100vh; position: fixed; top: 0; left: 0; background: #00000025; z-index: 999"></div>
        <div v-if="selectPopShowYn" style="display: flex; padding: 10px 0; flex-direction: column; width: 80%; min-height: 300px; position: fixed; box-shadow: rgb(0 0 0 / 12%) 4px 4px 12px 1px; top: 25%; left: 10%; border-radius:0.8rem; background: #FFF; z-index: 9999">
            <div style="width: 100%; float: left; padding: 0 20px; box-shadow: 0 4px 4px -4px #ccc; height: 35px; " class="font18 commonColor fontBold">상태설정</div>
            <div style="width: 100%; float: left; padding: 0 20px; margin-top: 10px;">
                <div style="width: 100%; float: left;">
                    <div @click="selectCode(value)" :style="Number(index) === Number(this.codeList.length - 1)? 'border-bottom: none !important;':'border-bottom: 1px solid #ccc;'" :class="value.codeKey === selectedCodeObj.codeKey? 'selectedCode' : ''" v-for="(value, index) in this.codeList" :key="index" style="width: calc(50% - 10px); text-align: center; float: left; position: relative; border: 1px solid #ccc; margin: 5px; border-radius: 8px; border min-height: 30px; padding: 5px 0;">
                        <p class="commonBlack mleft-05 font16 fontBold">{{this.$changeText(value.codeNameMtext)}}</p>
                        <img v-if="value.codeKey === selectedCodeObj.codeKey" src="../../assets/images/common/Tal_checkImage.svg" style="width: 15px;position: absolute; left: 8px; top: 10px;" alt="">
                    </div>
                </div>
                <p class="font15 textLeft fl fontBold w-100P mtop-05">댓글 추가</p>
                <!-- <p class="font14 commonBlack textLeft">빈칸으로 작성시{{'"상태를 "' + this.$changeText(this.selectedCodeObj.codeNameMtext) + '"(으)로 변경합니다." 댓글이 추가됩니다.'}}</p> -->
                <div @click="changeInputText" ref="memoBodyStr" v-if="selectedCodeObj.codeKey !== 0" style="width: 100%; height: 100px; border-radius: 8px; margin-top: 5px;  cursor: text; border: 1px solid #ccc; float: left; padding: 10px 15px; overflow: hidden scroll;" class="commonBlack font15 textLeft" :contenteditable="true"></div>
                <div ref="memoBodyStr" v-else style="width: 100%; height: 100px; border-radius: 8px; margin-top: 5px; border: 1px solid #ccc; float: left; padding: 10px 15px; overflow: hidden scroll;" class="commonBlack font15 textLeft activeInput" >
                    상태값을 먼저 선택해주세요
                </div>
                <!-- <span class="font15 commonBlack" v-show="selectedCodeObj.codeKey === 0">상태를 선택하고 댓글을 입력해주세요</span> -->
                <!-- <div @click="selectCode(value)" :style="Number(index) === Number(this.codeList.length - 1)? 'border-bottom: none !important;':'border-bottom: 1px solid #ccc;'" :class="value.codeKey === selectedCodeObj.codeKey? 'selectedCode' : ''" v-for="(value, index) in this.codeList" :key="index" style="width: 100%; position: relative; border min-height: 30px; padding: 5px 0;">
                    <p class="commonBlack mleft-05 font16 fontBold">{{this.$changeText(value.codeNameMtext)}}</p>
                    <img v-if="value.codeKey === selectedCodeObj.codeKey" src="../../assets/images/common/Tal_checkImage.svg" style="width: 20px;position: absolute; right: 10px; top: 10px;" alt="">
                </div> -->
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
      nullObj: { codeKey: 0, codeNameMtext: '상태없음' },
      selectedCodeObj: { codeKey: null, codeNameMtext: null },
      defaltMemoYn: true,
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
  updated () {
    /* this.changeDefaltText() */
    /* if (this.$refs.memoBodyStr && this.currentCodeKey && this.selectedCodeObj.codeKey !== 0) {
      this.$refs.memoBodyStr.innerHTML = '"상태를 "' + this.$changeText(this.selectedCodeObj.codeNameMtext) + '"(으)로 변경합니다."'
    } */
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
    changeInputText () {
      /* this.$refs.memoBodyStr.addEventListener('change', () => {
        alert(true)
      }) */
      this.defaltMemoYn = false
    },
    /* changeDefaltText () {
      if (this.selectedCodeObj.codeKey !== 0 && this.$refs.memoBodyStr && this.defaltMemoYn) {
        this.$refs.memoBodyStr.innerHTML = '상태를 "' + this.$changeText(this.selectedCodeObj.codeNameMtext) + '"(으)로 변경합니다.'
      }
    }, */
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
          this.selectedCodeObj = this.nullObj
        }
      }
    },
    selectCode (value) {
      this.selectedCodeObj = value
      /* this.changeDefaltText() */
    },
    async changeContentsStat () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      try {
        this.$showAxiosLoading(true)
        if (this.currentCodeKey === this.selectedCodeObj.codeKey) {
        } else {
          param.workStatCodeKey = this.selectedCodeObj.codeKey
          param.contentsKey = this.contentsKey
          param.workStatCreUserKey = this.GE_USER.userKey
          param.workStatCreUserName = this.GE_USER.userDispMtext
          param.memoBodyStr = this.$refs.memoBodyStr.innerHTML
          if (!param.memoBodyStr || param.memoBodyStr === '') {
            param.nonMemoYn = true
            param.memoBodyStr = ''
            param.memoHeaderStr = '<p class="commonMemoWorkStatHeaderColor" style="font-weight: bold; text-align: left; font-size: 14px; width: 100%;">[' + this.$changeText(this.selectedCodeObj.codeNameMtext) + '](으)로 변경<br></p>'
          } else {
            param.memoHeaderStr = '<p class="commonMemoWorkStatHeaderColor" style="font-weight: bold; text-align: left; font-size: 14px; width: 100%;">[' + this.$changeText(this.selectedCodeObj.codeNameMtext) + '](으)로 변경<br></p>'
          }
          param.creTeamKey = this.teamKey
          var result = await this.$commonAxiosFunction({
            url: 'service//tp.updateWorkStat',
            param: param
          })
          // eslint-disable-next-line no-debugger
          debugger
          if (result.data.result === true) {
            var newParam = {}
            newParam.contentsKey = result.data.contents.contentsKey
            newParam.jobkindId = 'BOAR'
            await this.$getContentsList(newParam).then(newReslute => {
              this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', newReslute.content)
            })
            this.$showToastPop('업무 상태가 변경되었습니다.')

            this.$showAxiosLoading(false)
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
        return this.nullObj
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
    },
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
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
.activeInput {background: #cccccc1c;}
</style>
