<i18n>
{
  "ko": {
    "STICK_NAME_INFO": "라벨 정보",
    "STICK_NAME_ADD": "라벨 추가",
    "STICK_TITLE_NAME": "라벨이름",
    "STICK_TITLE_PREVIEW": "미리보기",
    "STICK_MSG_NONAME": "라벨 이름을 입력해주세요",
    "STICK_MSG_DELETE_FAIL": "라벨 삭제에 실패했습니다."
  },
  "en": {
    "STICK_NAME_INFO": "Label Info",
    "STICK_NAME_ADD": "Add Label",
    "STICK_TITLE_NAME": "Label Name",
    "STICK_TITLE_PREVIEW": "Preview",
    "STICK_MSG_NONAME": "Please enter a label name",
    "STICK_MSG_DELETE_FAIL": "Failed to delete label."
  }
}
</i18n>
<template>
    <div style="width: calc(100% - 60px); height: 350px; border-radius: 0.8rem; z-index: 12; border: 1px solid #ccc; background: #FFF; position: fixed; top: 30%; left: 30px;">
        <div  class="newHeaderLine" style="width: 100%; padding: 10px 20px; display: flex; align-items: center; position: relative; height: 50px;">
            <p class="fl font20 commonColor fontBold">{{mStickerObj.modiYn? $t('STICK_NAME_INFO') : $t('STICK_NAME_ADD') }}</p>
            <img class="cursorP" @click="backClick" src="../../../assets/images/common/popup_close.png" style="width: 25px; position: absolute;  right: 15px; top: 15px;" alt="">
        </div>
        <div class="okScrollBar thinScrollBar" style="width: 100%; overflow: hidden scroll ;padding: 10px; height: calc(100% - 100px); float: left; display: flex; flex-direction: column; align-items: center;">
            <p class="textLeft font16 fontBold w-100P commonColor mleft-1 ">{{$t('STICK_TITLE_NAME')}}</p>
            <div style="width: 100%; float: left; min-height: 30px; display: flex; align-items: center; padding: 0 10px;">
                <input v-model="mStickerObj.nameMtext" type="text" name="" :placeholder="$t('STICK_MSG_NONAME')" style="float: left; width: calc(100% - 40px);  margin-top: 0.5rem;height: 30px;" id="">
                <div style="width: 30px; height: 30px; border-radius: 100%; float: right; margin-left: 10px; margin-top: 8px;" :style="'background: ' + mStickerObj.picBgPath + ';'" ></div>
            </div>
            <div class="fr" style="width: calc(100% - 20px); margin-top: 10px;">
                <gColorPicker :deepYn="true" :inLineYn="isMobile? true : false" :colorPick="mStickerObj.picBgPath" @closePop="closeColorPickerPop" @choiceColor='choiceColor' ref="colorPicker" />
            </div>
            <div class="textLeft mtop-1 fontBold w-100P fl" style="padding: 0 1rem;">
              <p class="font16 commonColor fl textLeft" style="width: calc(50% - 0.5rem);">{{ $t('STICK_TITLE_PREVIEW') }}</p>
              <!-- <p class="fr font14 cursorP textCenter contrastBtn" @click="contrastColor">반전</p> -->
            </div>
            <div style="width: 100%; min-height: 50px; float: left; padding-left: 10px;">
                <gStickerLine :pContrastColorYn="this.contrastColorYn" style="width: calc(100% - 40px);" v-if="mStickerObj.nameMtext && mStickerObj.nameMtext !== ''" :pSticker="mStickerObj" />
            </div>
        </div>
        <div style="width: 100%; float: left; background:#FFF; height: 30px; display: flex; justify-content: center; align-items: center;">
            <gBtnSmall :btnTitle="mStickerObj.modiYn? $t('COMM_BTN_EDIT2') : $t('COMMON_BTN_ADD')" @click="checkInput" class="mright-05" />
            <gBtnSmall v-if="mStickerObj.modiYn" :btnTitle="$t('COMMON_BTN_DELETE')" @click="askDelete"  btnThema="light" class="mright-05"/>
            <gBtnSmall v-else :btnTitle="$t('COMMON_BTN_CANCEL')" @click="backClick"  btnThema="light"/>
        </div>
        <gConfirmPop ref="confirmPop"  :confirmText='mConfirmText' :confirmType='mConfirmType' @ok="saveSticker" v-if="mConfirmPopShowYn" @no='mConfirmPopShowYn = false' />
        <gConfirmPop ref="confirmPop"  :confirmText='mConfirmText' :confirmType='mConfirmType' @ok="deleteSticker" v-if="mConfirmDeletePopShowYn" @no='mConfirmDeletePopShowYn = false' />
    </div>
</template>

<script>
export default {
  data () {
    return {
      contrastColorYn: false,
      mStickerObj: JSON.parse(JSON.stringify(this.pStickerObj)),
      popId: null,
      isMobile: /Mobi/i.test(window.navigator.userAgent),
      mConfirmType: 'timeout',
      mConfirmText: '',
      mConfirmPopShowYn: null,
      mConfirmDeletePopShowYn: null,
      mStickerList: JSON.parse(JSON.stringify(this.pStickerList))
    }
  },
  created () {
    var history = this.$store.getters['D_HISTORY/hStack']
    this.popId = 'stickerDetail' + history.length
    history.push(this.popId)
    this.$store.commit('D_HISTORY/updateStack', history)
  },
  updated () {
    console.log(this.mStickerObj)
  },
  methods: {
    contrastColor () {
      if (this.contrastColorYn) {
        this.contrastColorYn = false
      } else {
        this.contrastColorYn = true
      }
    },
    checkInput () {
      // eslint-disable-next-line no-debugger
      debugger
      if (this.mStickerObj.nameMtext.trim() === '') {
        this.mConfirmType = 'timeout'
        this.mConfirmText = this.$t('STICK_MSG_NONAME')
        this.mConfirmPopShowYn = true
        return
      }
      this.mConfirmType = 'two'
      if (!this.mStickerObj.modiYn) {
        if (this.GE_LOCALE === 'ko') {
          this.mConfirmText = '[' + this.mStickerObj.nameMtext + '] 분류를 추가하시겠습니까?'
        } else {
          this.mConfirmText = `Are you sure you want to add a [${this.mStickerObj.nameMtext}] label?`
        }
      } else {
        // this.mConfirmText = '[' + this.pStickerObj.nameMtext + '] 분류를 '
        if (this.GE_LOCALE === 'ko') {
          this.mConfirmText = '[' + this.mStickerObj.nameMtext + '] 분류로 수정하시겠습니까?'
        } else {
          this.mConfirmText = `Are you sure you want to Edit a [${this.mStickerObj.nameMtext}] label?`
        }
      }
      this.mConfirmPopShowYn = true
    },
    askDelete () {
      if (this.GE_LOCALE === 'ko') {
        this.mConfirmText = '[' + this.mStickerObj.nameMtext + '] 라벨은 관련 컨텐츠에서 자동으로 삭제됩니다.'
      } else {
        this.mConfirmText = `The [${this.mStickerObj.nameMtext}] label is automatically deleted from the relevant content.`
      }
      this.mConfirmType = 'two'
      this.mConfirmDeletePopShowYn = true
    },
    choiceColor (color) {
      this.mStickerObj.picBgPath = color
      this.$refs.colorPicker.setColor(color)
      // console.log(color)
    },
    async saveSticker (paramData) {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      if (this.mStickerObj.stickerKey && this.mStickerObj.modiYn) {
        param.stickerKey = this.mStickerObj.stickerKey
      }
      param.nameMtext = 'KO$^$' + this.mStickerObj.nameMtext
      param.picBgPath = this.mStickerObj.picBgPath
      param.creUserKey = this.GE_USER.userKey
      var result = await this.$commonAxiosFunction({
        url: '/sUniB/tp.saveSticker',
        param: param
      })
      if (result.data.result) {
        if (result.data.stickerKey) {
          param.stickerKey = result.data.stickerKey

          /* var newArr = [
            param,
            ...this.mStickerList
          ] */
          if (!this.mStickerObj.modiYn) {
            this.mStickerList.unshift(param)
            await this.$store.dispatch('D_CHANNEL/AC_STICKER_LIST', this.mStickerList)
          } else {
            var idx = this.mStickerList.findIndex(item => {
              return item.stickerKey === this.mStickerObj.stickerKey
            })
            this.mStickerList[idx] = this.mStickerObj
            await this.$store.dispatch('D_CHANNEL/AC_STICKER_LIST', this.mStickerList)
          }
          this.mConfirmPopShowYn = false
          var hStack = this.$store.getters['D_HISTORY/hStack']
          var removePage = hStack[hStack.length - 1]
          if (hStack[hStack.length - 1] === 'gConfirmPop') {
            hStack = hStack.filter((element, index) => index < hStack.length - 1)
            this.$store.commit('D_HISTORY/setRemovePage', removePage)
            this.$store.commit('D_HISTORY/updateStack', hStack)
            // this.$emit('closeXPop')
          }
          /* this.mStickerList = newArr */
          this.backClick()
          // this.$emit('successAddSticker', param)
        }
      }
    },
    async deleteSticker () {
      var param = {}
      if (!this.mStickerObj.stickerKey) {
        this.$showToastPop(this.$t('STICK_MSG_DELETE_FAIL'))
        return
      }
      param.stickerKey = this.mStickerObj.stickerKey
      param.deleteYn = true
      var result = await this.$commonAxiosFunction({
        url: '/sUniB/tp.saveSticker',
        param: param
      })
      if (result.data.result) {
        this.mConfirmDeletePopShowYn = false
        var hStack = this.$store.getters['D_HISTORY/hStack']
        var removePage = hStack[hStack.length - 1]
        console.log(hStack)
        if (hStack[hStack.length - 1] === 'gConfirmPop') {
          hStack = hStack.filter((element, index) => index < hStack.length - 1)
          this.$store.commit('D_HISTORY/setRemovePage', removePage)
          this.$store.commit('D_HISTORY/updateStack', hStack)
          // this.$emit('closeXPop')
        }
        this.$emit('deleteSticker', this.mStickerObj)
        this.backClick()
        // this.$emit('successAddSticker', param)
      }
    },
    backClick () {
      var hStack = this.$store.getters['D_HISTORY/hStack']
      var removePage = hStack[hStack.length - 1]
      console.log(hStack)
      if (this.popId === hStack[hStack.length - 1]) {
        hStack = hStack.filter((element, index) => index < hStack.length - 1)
        this.$store.commit('D_HISTORY/setRemovePage', removePage)
        this.$store.commit('D_HISTORY/updateStack', hStack)
        this.$emit('closeXPop')
      }
    }
  },
  computed: {
    GE_LOCALE () {
      return this.$i18n.locale
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
    GE_STICKER_LIST () {
      return this.$store.getters['D_CHANNEL/GE_STICKER_LIST']
    },
    pageUpdate (value, old) {
      this.backClick()
      /* if (this.popId === hStack[hStack.length - 1]) {
                this.closeSubPop()
            } */
    }
  },
  props: {
    pStickerObj: {},
    pStickerList: {}
  }
}
</script>
<style scoped>
.contrastBtn {
  color: #fff;
  line-height: 24px;
  background-color: #879dc9;
  border-radius: 6px;
  width: 35px;
  height: 24px;
  padding: 0px 5px;
  margin-right: 5px;
}
</style>
