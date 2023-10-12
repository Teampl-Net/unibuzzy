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
    <div class="fl">
        <div @click="closeXPop" class="writeSamplePopBg"></div>
        <transition name="showUp">
            <div class="writeSamplePopWrap">
                <div class="headerShadow writeSamplePopHeader">
                    <p class="font18 fontBold textLeft">{{makeType === 'modi'? $t('SAMP_NAME_EDIT_SAMPLE') : $t('SAMP_NAME_ADD_SAMPLE')}}</p>
                    <img @click="closeXPop" src="@/assets/images/common/popup_close.png" alt="">
                </div>
                <div class="writeSamplePopBody">
                    <div class="writeSamplePopBox">
                        <div class="writeBoxInputWrap">
                            <label  for="sampleTitleMtext" class="font15 fontBold grayBlack textLeft fl">{{ $t('SAMP_TITLE_NAME') }}</label>
                            <input id="sampleTitleMtext" type="text" class="font15 textLeft" :placeholder="$t('SAMP_MSG_NONAME')" name="" v-model="sampleTitleMtext" >
                        </div>
                        <p class="font15 fontBold grayBlack w100P mbottom-05 textLeft fl">
                          {{ $t('SAMP_TITLE_ICON') }}
                        </p>
                        <div class="writeSampleImgWrap">
                            <div class="writeSampleLeft" @click="goScroll('back')">
                                <img src="@/assets/images/common/arrowBackIcon.svg" alt="">
                            </div>
                            <div ref="scrollIconWrap" class="writeSampleScrollWrap">
                                <div class="h100P fl" :style="'width: +' + (60 * sampleIconList.length) + 'px;'">
                                    <div class="writeSampleImgItem" @click="makeSampleIconFilekey = value.imageFilekey" v-for="(value, index) in sampleIconList" :style="makeSampleIconFilekey === value.imageFilekey ? 'background: #F1F1FF;' : ''" :key="index">
                                        <img class="w100P fl" :src="value.domainPath + value.pathMtext" alt="">
                                    </div>
                                </div>
                            </div>
                            <div class="writeSampleRight" @click="goScroll('next')">
                                <img src="@/assets/images/common/arrowNextIcon.svg" alt="">
                            </div>
                        </div>
                        <p class="font15 fontBold grayBlack textLeft fl w-100P mbottom-05" >{{ $t('SAMP_TITLE_CONTENTS') }}</p>
                        <div class="writeSamplePreWrap">
                            <pre id="sampleInputArea" ref="sampleInputArea" class="fl editableContent"  contenteditable=true ></pre>
                        </div>
                    </div>
                </div>
                <div class="writeSampleBtnArea">
                    <gBtnSmall @click="closeXPop" btnTitle="취소" btnThema="light"/>
                    <gBtnSmall @click="createSample" :btnTitle="makeType === 'modi' ? $t('COMM_BTN_EDIT2') : $t('COMMON_BTN_ADD')" class="mright-05"/>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
export default {
  data () {
    return {
      sampleTitleMtext: '',
      sampleIconList: [],
      makeSampleIconFilekey: null
    }
  },
  props: {
    cabinetDetail: {},
    propsInnerHtml: {},
    makeType: {},
    selectedSample: {}
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
    }
  },
  mounted () {
    if (this.makeType === 'modi' && this.propsInnerHtml) {
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
    var history = this.$store.getters['UB_HISTORY/hStack']
    this.popId = 'writeSamplePop' + this.cabinetDetail.cabinetKey
    history.push(this.popId)
    this.$store.commit('UB_HISTORY/updateStack', history)
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
      var param = {}
      param.groupCode = 'S_ICON'
      resultList = await this.$getCodeList(param)
      this.sampleIconList = resultList
    },
    closeXPop (reloadYn) {
      var hStack = this.$store.getters['UB_HISTORY/hStack']
      var removePage = hStack[hStack.length - 1]
      if (this.popId === hStack[hStack.length - 1]) {
        hStack = hStack.filter((element, index) => index < hStack.length - 1)
        this.$store.commit('UB_HISTORY/setRemovePage', removePage)
        this.$store.commit('UB_HISTORY/updateStack', hStack)
        this.$emit('closeXPop', reloadYn)
      }
    },
    async createSample () {
      var param = {}
      var sample = {}
      sample.titleMtext = this.cabinetDetail.teamMenuKey
      sample.targetType = 'GUIDE_'
      var bodyStr = document.getElementById('sampleInputArea').innerHTML
      bodyStr = bodyStr.trim()
      sample.bodyMinStr = bodyStr
      sample.bodyFullStr = bodyStr
      if (this.makeType === 'modi') {
        sample.sampleKey = this.selectedSample.sampleKey
      }
      sample.creTeamKey = this.cabinetDetail.creTeamKey
      if (this.sampleTitleMtext.trim() === '') {
        alert(this.$t('SAMP_MSG_NONAME'))
        return
      }
      if (!this.makeSampleIconFilekey) {
        alert(this.$t('SAMP_MSG_NOICON'))
        return
      }
      sample.imageFilekey = this.makeSampleIconFilekey
      sample.titleMtext = 'EN$^$' + this.sampleTitleMtext
      sample.creUserKey = this.$store.getters['UB_USER/GE_USER'].userKey
      param.sample = sample
      await this.$commonAxiosFunction({
        url: '/sUniB/tp.saveSample',
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
.writeSamplePopBg {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #00000026;
  z-index: 9999999;
}
.writeSamplePopWrap {
  width: 80%;
  min-height: 500px;
  max-height: 700px;
  border-radius: 0.8rem 0.8rem 0.8rem 0.8rem;
  height: 80%;
  position: fixed;
  background: #FFF;
  z-index: 99999999;
  top: 10%;
  left: 10%;
}
.writeSamplePopHeader {
  width: 100%;
  padding: 12px 20px;
  height: 50px;
  float: left;
  position: relative;
}
.writeSamplePopHeader > img {
  position: absolute;
  right: 20px;
  top: 12px;
  width: 25px;
}
.writeSamplePopBody {
  width: 100%;
  padding: 10px 20px;
  height: calc(100% - 120px);
  float: left;
}
.writeSamplePopBox {
  float: left;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction:column;
  align-items: center;
}
.writeBoxInputWrap {
  width: 100%;
  float: left;
}
.writeBoxInputWrap > label {
  width: 70px;
  line-height: 30px;
}
.writeBoxInputWrap > input {
  width: 100%;
  margin-bottom: 1rem;
  height: 30px;
}
.writeSampleImgWrap {
  width: 100%;
  float: left;
  display: flex;
  align-items: center;
}
.writeSampleLeft {
  float: left;
  margin-right: 5px;
  width: 15px;
  cursor: pointer;
  height: 70px;
  display: flex;
  align-items: center;
}
.writeSampleRight {
  float: left;
  margin-left: 5px;
  width: 15px;
  cursor: pointer;
  height: 100px;
  display: flex;
  align-items: center;
}
.writeSampleScrollWrap {
  height: 70px;
  width: calc(100% - 40px);
  float: left;
  padding: 10px 0;
  overflow: scroll hidden;
}
.writeSampleImgItem {
  padding: 5px;
  border-radius: 8px;
  margin-right: 5px;
  border: 1px solid #ccc;
  cursor: pointer;
  float: left;
  width: 50px;
  height: 50px;
}
.writeSamplePreWrap {
  width: 100%;
  height: calc(100% - 170px);
  padding: 5px 10px;
  border-radius: 8px;
  float: left;
  border: 1px solid #ccc;
}
.writeSamplePreWrap > pre {
  width: 100%;
  overflow: hidden scroll;
  height: 100%;
  text-align: left;
  float: left;
  resize: none;
}
.writeSampleBtnArea {
  width: 100%;
  height: 40px;
  float: left;
  padding: 0 20px;
}
</style>
