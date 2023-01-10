<template>
<!-- box-shadow: rgb(0 0 0 / 20%) 0px 0px 4px 4px; -->
    <div  style="width: calc(100% - 40px); position: absolute; left: 20px; top: 15%; z-index: 9; height: 70%;  min-height: 400px; border-radius: 0.8rem; border: 1px solid #ccc; background: #FFF; ">
        <div class="newHeaderLine" style="width: 100%; padding: 10px 20px; display: flex; align-items: center; position: relative; height: 50px;">
            <p class="fl font20 commonColor fontBold">라벨설정</p>
            <img @click="backClick" class="cursorP" src="../../../assets/images/common/popup_close.png" style="width: 25px; position: absolute; right: 15px; top: 15px;" alt="">
        </div>
        <div class="okScrollBar thinScrollBar" style="width: 100%; overflow: hidden auto;  height: calc(100% - 110px); padding: 10px 0;">
            <!-- <p class="font16 fontBold textLeft commonColor " style="padding: 0 20px;" >대상</p> -->
            <div style="width: 100%; min-height: 50px; float: left; padding: 0 20px;">
                <gContentsBox @selectSticker="selectStickerFromBox" :propJustShowYn="true" class="cursorP mbottom-1" style="" :contentsEle="pContentsEle" :propPreStickerList="mContStickerList"/>
            </div>
            <!-- <div style="width: 100%; min-height: 50px; float: left">
                <p class="font16 fontBold commonColor textLeft mbottom-05" style="padding-left: 20px;">선택된 라벨</p>
                <div style="width: 100%; height: 80px; overflow: auto hidden; padding: 10px 20px; background:#F8F8F8;">
                    <p v-if="mContStickerList.length === 0"  class="font12 fontBold textLeft">분류가 선택되지 않았습니다.</p>
                    <div style="min-width: 100%; display: flex; align-items: center; height: 100%;">
                        <div v-for="(value) in mContStickerList" @click="selectSticker(value, true)" :key="value.stickerKey" style="width: 50px; position: relative; height: 50px; margin-right: 10px;" >
                            <gSticker class="cursorP" style="" :pSticker="value"  />
                            <img src="../../../assets/images/common/close_black.svg" style="background: #FFFFFF50; border-radius: 100%; position: absolute; width: 20px; height: 20px; top: 0px; right: -5px;" alt="">
                        </div>
                    </div>
                </div>
            </div> -->
            <div style="width: 100%; min-height: 50px; float: left; position: relative;">
                <div style="width: 100%; min-height: 20px;" class="mtop-1">
                    <p class="font16 fontBold commonColor textLeft  fl " style="padding-left: 20px;">라벨 추가하기</p>
                <!-- <p class="font14 textLeft commonGray mbottom-05 fl" style="line-height: 24px; padding-left: 20px;">어디로 분류할까요?</p> -->
                    <div @click="openAddStickerPop" class="cursorP font14" style="color: #FFF; line-height: 24px; float: right; background: #AEB0FB; border-radius: 6px; min-width: 50px; height: 24px; padding: 0 5px; margin-right: 20px;">+ 신규</div>
                </div>
                <div style="width: 100%; height: 48px; overflow: auto hidden; padding: 10px 20px; ">
                    <div :style="stickerBoxScrollWidth" class="thinScrollBar" style="min-width: 100%; width: var(--width); display: flex; align-items: center; height: 100%; padding: 0 0px;">
                        <!-- <div class="cursorP" @click="openAddStickerPop" style="width: 50px; margin-right: 10px;display: flex; align-items: center; justify-content: center; font-size: 20px; height: 50px; border-radius: 100%; float: left; border:1px solid #ccc;"> + </div> -->
                        <p v-if="GE_NON_SELECTED_STICKER_LIST.length === 0" class="font12 textLeft fontBold">선택가능한 분류가 없습니다. <br>분류를 추가해주세요!</p>
                        <gStickerLine :pSmallYn="true" class="cursorP cursorHover"  @click="selectSticker(value)" style="margin-right: 5px;" v-for="(value) in GE_NON_SELECTED_STICKER_LIST" :pSticker="value" :key="value.stickerKey" />
                    </div>
                </div>
            </div>
            <div v-if="mAddStickerPopShowYn" @click="backClick" style="width: 100%; height: 100%; left: 0; top: 0; position: absolute; z-index: 100; background: #00000026;"></div>
            <transition name="showModal">
                <div v-if="mAddStickerPopShowYn" transition="showModal" style="width: calc(100% - 60px); height: 350px; border-radius: 0.8rem; z-index: 101; border: 1px solid #ccc; background: #FFF; position: absolute; top: 10%; left: 30px;">
                    <div  class="newHeaderLine" style="width: 100%; padding: 10px 20px; display: flex; align-items: center; position: relative; height: 50px;">
                        <p class="fl font20 commonColor fontBold">라벨 추가</p>
                        <img class="cursorP" @click="backClick" src="../../../assets/images/common/popup_close.png" style="width: 25px; position: absolute;  right: 15px; top: 15px;" alt="">
                    </div>
                    <div class="okScrollBar thinScrollBar" style="width: 100%; overflow: hidden scroll ;padding: 10px; height: calc(100% - 100px); float: left; display: flex; flex-direction: column; align-items: center;">
                        <p class="textLeft font16 fontBold w-100P commonColor mleft-1 ">라벨이름</p>
                        <div style="width: 100%; float: left; min-hegiht: 30px; display: flex; align-items: center; padding: 0 10px;">
                            <input v-model="mAddStickerObj.nameMtext" type="text" name="" placeholder="라벨 이름을 입력해주세요" style="float: left; width: calc(100% - 40px);  margin-top: 0.5rem;height: 30px;" id="">
                            <div style="width: 30px; height: 30px; border-radius: 100%; float: right; margin-left: 10px; margin-top: 8px;" :style="'background: ' + mAddStickerObj.picBgPath + ';'" ></div>
                        </div>
                        <div v-if="mColorPickerShowYn" class="fr" style="width: calc(100% - 20px); margin-top: 10px;">
                            <gColorPicker :deepYn="true" :inLineYn="isMobile? true : false" :colorPick="mAddStickerObj.picBgPath" @closePop="closeColorPickerPop" v-if="mColorPickerShowYn" @choiceColor='choiceColor' ref="colorPicker" />
                        </div>
                        <p class="textLeft mtop-1 font16 fontBold w-100P commonColor mleft-1">미리보기</p>
                        <div style="width: 100%; min-height: 50px; float: left; padding-left: 10px;">
                            <gStickerLine  style="width: calc(100% - 40px);" v-if="mAddStickerObj.nameMtext && mAddStickerObj.nameMtext !== ''" :pSticker="mAddStickerObj" />
                        </div>
                    </div>
                    <div style="width: 100%; float: left; background:#FFF; height: 30px; display: flex; justify-content: center; align-items: center;">
                        <gBtnSmall btnTitle="추가" @click="checkInput" class="mright-05" />
                        <gBtnSmall btnTitle="취소" btnThema="light"/>
                    </div>
                </div>
            </transition>
            <gConfirmPop ref="confirmPop"  :confirmText='mConfirmText' :confirmType='mConfirmType' @ok="saveSticker" v-if="mConfirmPopShowYn" @no='mConfirmPopShowYn = false' />
        </div>
        <div style="display: flex; align-items: center; justify-content: center;width: 100%; height: 60px; float: left">
            <gBtnSmall @click="saveUserDoStickerList" btnTitle="저장" class="mright-05"/>
            <gBtnSmall btnThema="light" btnTitle="취소"/>
        </div>
    </div>
</template>

<script>

export default {
  components: {
  },
  props: {
    pContentsEle: {}
  },
  computed: {
    GE_NON_SELECTED_STICKER_LIST () {
      if (this.mContStickerList.length === 0) {
        return this.mStickerList
      }
      var newArr = []
      for (var i = 0; i < this.mStickerList.length; i++) {
        if (this.mContStickerList.findIndex((item) => Number(item.stickerKey) === Number(this.mStickerList[i].stickerKey)) === -1) {
          newArr.push(this.mStickerList[i])
        }
      }
      return newArr
    },
    stickerBoxScrollWidth () {
      var stickerListLength = this.mStickerList.length
      return {
        '--width': (stickerListLength * 80 + 10) + 'px'
      }
    },
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    },
    historyStack () {
      return this.$store.getters['D_HISTORY/hRPage']
    },
    pageUpdate () {
      return this.$store.getters['D_HISTORY/hUpdate']
    }
  },
  watch: {
    pageUpdate (value, old) {
      this.backClick()
      /* if (this.popId === hStack[hStack.length - 1]) {
                this.closeSubPop()
            } */
    }
  },
  data () {
    return {
      mStickerList: [],
      mContStickerList: [],
      mAddStickerPopShowYn: false,
      mSelectedColor: '#FFCDD2',
      mColorPickerShowYn: true,
      mAddStickerObj: { picBgPath: '#FFCDD2', nameMtext: '' },
      mConfirmText: '추가하시겠습니까?',
      mConfirmType: 'timeout',
      mConfirmPopShowYn: false,
      popId: null,
      addStickerPopId: null,
      isMobile: /Mobi/i.test(window.navigator.userAgent)
    }
  },
  created () {
    if (this.pContentsEle) {
      if (this.pContentsEle.D_CONT_USER_STICKER_LIST) {
        var stickerList = []
        for (var s = 0; s < this.pContentsEle.D_CONT_USER_STICKER_LIST.length; s++) {
          if (!this.pContentsEle.D_CONT_USER_STICKER_LIST[s].sticker) continue
          stickerList.push(this.pContentsEle.D_CONT_USER_STICKER_LIST[s].sticker)
        }
        this.mContStickerList = this.replaceArr(stickerList)
      }
    }
    this.getMyStickerList()
    var history = this.$store.getters['D_HISTORY/hStack']
    this.popId = 'selectStickerPop' + history.length
    // console.log(history)
    history.push(this.popId)
    this.$store.commit('D_HISTORY/updateStack', history)
  },
  methods: {
    openAddStickerPop () {
      var history = this.$store.getters['D_HISTORY/hStack']
      this.addStickerPopId = 'addStickerPop' + history.length
      history.push(this.addStickerPopId)
      console.log(history)
      this.$store.commit('D_HISTORY/updateStack', history)
      this.mAddStickerPopShowYn = true
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
      } else if (this.addStickerPopId === hStack[hStack.length - 1]) {
        hStack = hStack.filter((element, index) => index < hStack.length - 1)
        this.$store.commit('D_HISTORY/setRemovePage', removePage)
        this.$store.commit('D_HISTORY/updateStack', hStack)
        this.mAddStickerPopShowYn = false
      }
    },
    replaceArr (arr) {
      // var this_ = this
      if (!arr && arr.length === 0) return []
      var uniqueArr = arr.reduce(function (data, current) {
        if (data.findIndex((item) => Number(item.stickerKey) === Number(current.stickerKey)) === -1) {
        /* if (data.findIndex(({ mccKey }) => mccKey === current.mccKey) === -1 && ((this_.viewMainTab === 'P' && current.jobkindId === 'ALIM') || (this_.viewMainTab === 'B' && current.jobkindId === 'BOAR'))) { */
          data.push(current)
        }
        data = data.sort(function (a, b) { // num으로 오름차순 정렬
          return b.stickerKey - a.stickerKey
          // [{num:1, name:'one'},{num:2, name:'two'},{num:3, name:'three'}]
        })
        return data
      }, [])
      return uniqueArr
    },
    selectStickerFromBox (val) {
      console.log(val)
      this.selectSticker(val, true)
    },
    selectSticker (value, delYn) {
      // eslint-disable-next-line no-debugger
      debugger
      console.log(value)
      if (delYn) {
        var index = this.mContStickerList.findIndex((item) => Number(item.stickerKey) === Number(value.stickerKey))
        this.mContStickerList.splice(index, 1)
      } else {
        /* if (this.mContStickerList.length > 1) {
          this.mConfirmText = '분류는 최대 2개까지 설정할 수 있습니다.'
          this.mConfirmType = 'timeout'
          this.mConfirmPopShowYn = true
          return
        } */
        this.mContStickerList.push(value)
      }
    },
    closeXPop () {
      this.$emit('closeXPop')
    },
    checkInput () {
      // eslint-disable-next-line no-debugger
      debugger
      if (this.mAddStickerObj.nameMtext.trim() === '') {
        this.mConfirmType = 'timeout'
        this.mConfirmText = '분류명을 입력해주세요!'
        this.mConfirmPopShowYn = true
        return
      }
      this.mConfirmType = 'two'
      this.mConfirmText = '[' + this.mAddStickerObj.nameMtext + '] 분류를 추가하시겠습니까?'
      this.mConfirmPopShowYn = true
    },
    choiceColor (color) {
      this.mAddStickerObj.picBgPath = color
      this.$refs.colorPicker.setColor(color)
      // console.log(color)
    },
    async getMyStickerList () {
      var param = {}
      param.creUserKey = this.GE_USER.userKey
      var result = await this.$commonAxiosFunction({
        url: 'service/tp.getStickerList',
        param: param
      })
      this.mStickerList = result.data
      console.log(result)
    },
    async saveSticker (paramData) {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.nameMtext = 'KO$^$' + this.mAddStickerObj.nameMtext
      param.picBgPath = this.mAddStickerObj.picBgPath
      param.creUserKey = this.GE_USER.userKey
      var result = await this.$commonAxiosFunction({
        url: 'service/tp.saveSticker',
        param: param
      })
      if (result.data.result) {
        if (result.data.stickerKey) {
          param.stickerKey = result.data.stickerKey

          /* var newArr = [
            param,
            ...this.mStickerList
          ] */
          this.mStickerList.unshift(param)
          this.mConfirmPopShowYn = false
          var hStack = this.$store.getters['D_HISTORY/hStack']
          var removePage = hStack[hStack.length - 1]
          console.log(hStack)
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
      console.log(result)
    },
    async saveUserDoStickerList (paramData) {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      var keyList = []
      console.log(this.mContStickerList.length)
      for (var i = 0; i < this.mContStickerList.length; i++) {
        if (!this.mContStickerList[i]) continue
        var stickerKey = this.mContStickerList[i].stickerKey
        console.log(stickerKey)
        keyList.push(stickerKey)
      }
      param.stickerKeyList = keyList
      param.userKey = this.GE_USER_KEY
      param.doType = 'SK'
      param.targetKind = 'C'
      param.targetKey = this.pContentsEle.contentsKey
      param.creUserKey = this.GE_USER.userKey
      var result = await this.$commonAxiosFunction({
        url: 'service/tp.saveUserDoList',
        param: param
      })
      /* this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [this.cDetail]) */
      /* this.mConfirmPopShowYn = false */
      console.log(result)
      if (result.data.result) {
        // eslint-disable-next-line no-debugger
        debugger
        var userDoList = result.data.userDoList
        var contents = this.pContentsEle
        if (contents.D_CONT_USER_DO) {
          var cUserDoList = contents.D_CONT_USER_DO
          for (var c = cUserDoList.length - 1; c >= 0; c--) {
            if (cUserDoList[c].doType === 'SK') {
              cUserDoList.splice(i, 1)
            }
          }
          if (userDoList.length > 0) {
            cUserDoList = [
              ...cUserDoList,
              ...userDoList
            ]
          }
          contents.userDoList = cUserDoList
          contents.D_CONT_USER_DO = cUserDoList
          contents.D_CONT_USER_STICKER_LIST = userDoList
          console.log(contents)
          console.log('변경합니다!!!')
          await this.$store.commit('D_CHANNEL/MU_REPLACE_CONTENTS_ONLY_USERDO', [contents])
          this.$emit('closeXPop')
        }
      }
    }
  }
}
</script>

<style scoped>
/* .cursorHover :hover {
    border: 2px solid #ccc;
    box-shadow: 0 0 4px 4px #00000020!important;
} */
</style>
