<i18n>
    {
      "ko":{
        "COMM_MAN_STICKER_POP_TITLE" : "태그 관리",
        "COMMON_MY_TAG_TILTE": "내 태그",
        "COMM_MSG_DELETE_TAG" : "태그를 삭제하시겠습니까?",
        "COMM_MSG_REQ_SELECT_TAG" : "태그를 선택해주세요",
        "COMM_CHOSE_COLOR":"색상 선택",
        "COMM_PREVIEW":"미리 보기",
      },
      "en": {
        "COMM_MAN_STICKER_POP_TITLE" : "Tag Management",
        "COMMON_MY_TAG_TILTE": "My Tag",
        "COMM_MSG_DELETE_TAG" : "Are you sure you want to delete a tag?",
        "COMM_MSG_REQ_SELECT_TAG" : "Please select a tag",
        "COMM_CHOSE_COLOR":"Color",
        "COMM_PREVIEW":"Preview",

      }
    }
  </i18n>
<template>
    <div style="height: 500px; width: 98%; position: fixed; top: 30%; left: 1%; background: #FFF; border-radius: 10px; box-shadow: 0 0 4px 4px #00000030; z-index: 99">
        <div style="padding:12px 20px; display: flex; justify-content: space-between; border-bottom: 1.5px solid #ccc; align-items: flex-start;">
            <p class="commonColor font18 fontBold textLeft">{{$t('COMM_MAN_STICKER_POP_TITLE')}}</p>
            <img src="../../assets/images/common/popup_close.png" @click="backClick" class="mtop-02 cursorP" alt="" style="width:20px;">
        </div>
        <div style="width: 100%; height: calc(100% - 75px); padding: 10px 30px; overflow: hidden;">
              <div style="width:calc(100%); display:flex; align-items:center; margin-bottom: 0; padding-top: 10px; justify-content:space-between;">
                <input type="text" class="tagInput w100P" v-model="stickerNameVal">
                <div style="display:flex; align-items:center;">
                  <gBtnSmall class="mleft-05" @click="saveSticker()" style="height: 25px; background: #5F61BD; line-height: 25px; padding: 0 5px;" :btnTitle="selectedSticker.stickerKey? $t('COMM_BTN_EDIT2'): $t('COMMON_BTN_SAVE')"/>
                  <div class="mleft-05" @click="reqDelSticker()"  style="width:25px; height: 25px;" >
                    <img :src="require(`@/assets/images/button/Remove_duotone.png`)" class="w100P"/>
                  </div>
                </div>
              </div>

              <div class="w100P mtop-2" style="display:flex; align-items:center; justify-content:center;">
                <div style="width:30%; display:flex; align-items:center; justify-content:center;">
                  <p class="mright-05 textLeft font16  fontBold" style="color:#5F61BD;">{{ $t('COMM_CHOSE_COLOR') }}</p>
                  <div @click="toggleAddTagShowYn" style="width: 25px; height: 25px; border-radius: 100%; " :style="`background-color: ${selectedSticker.picBgPath}`"></div>
                </div>
                <div style="width:70%; display:flex; align-items:center; justify-content:center;">
                  <p class="mright-05 textLeft font16  fontBold" style="color:#5F61BD;">{{ $t('COMM_PREVIEW') }}</p>
                  <div class="previewTag" :style="{'background-color': this.selectedSticker ? this.selectedSticker.picBgPath : 'gray' }">
                  {{ stickerNameVal }}
                  </div>
                </div>
              </div>

                <div v-if="addTagShowYn" class="fr mtop-03" style="width: calc(100%); height: 40px; border-radius: 5px; position:absolute; z-index:3; left:1%;">
                    <img :src="require(`@/assets/images/button/Polygon.png`)" style="width:16px; position:absolute; top:-10px; left:14%;"/>
                    <gColorPicker :colorPick="selectedSticker.picBgPath" @closePop="toggleAddTagShowYn" @choiceColor='changeTagColor' ref="colorPicker" :isTag="true" style="z-index:3;"/>
                </div>
                <div class="mbottom-05 mtop-1 fl" style="display: flex; align-items: end;">
                    <p class="mright-05 textLeft font16  fontBold" style="color:#5F61BD; white-space:nowrap;">{{ $t('COMMON_MY_TAG_TILTE') }}</p>
                    <span style="font-size:13px; color:#A9A7F6;">{{ $t('COMM_MSG_SELECT_TAG') }}</span>
                    <!-- <gBtnSmall class="mleft-05 fl"  @click="toggleSelectTag({ nameMtext: '', stickerKey: null, picBgPath: '#CCC' }); stickerNameVal = ''" style="height: 25px; min-width: 30px; background: #5F61BD; line-height: 25px; padding: 0 5px;" btnTitle="+"/> -->
                </div>
                <div style="width:100%; overflow: hidden auto; height: calc(100% - 90px); " class="thinScrollBar">
                    <!-- <button
                    type="button"
                    @click="toggleSelectTag({ nameMtext: '', stickerKey: null, picBgPath: '#CCC' })"
                    :style=" (selectedSticker && selectedSticker.stickerKey)? `border: 2px solid #CCC;`: (selectedSticker && !selectedSticker.stickerKey)? `background: #CCC; color: #FFF;` : ''"
                    :class="{ activeBtn: (selectedSticker && !selectedSticker.stickerKey) }"
                    style="font-size: 13px;"
                    class="tagButton"
                    >
                    +추가
                    </button> -->
                    <button
                    type="button"
                    @click="toggleSelectTag(sticker)"
                    v-for="(sticker) in GE_STICKER_LIST"
                    :key="sticker.stickerKey"
                    :style="{ 'font-weight' :sticker.picBgPath && !(sticker.stickerKey === selectedSticker.stickerKey)? 'normal' : 'bold', 'background-color' : sticker.picBgPath}"
                    :class="{ activeBtn: (sticker.stickerKey === selectedSticker.stickerKey) }"
                    style="font-size: 13px; color:#fff;"
                    class="tagButton"
                    >
                    <!-- <img v-if="sticker.isSelected" src="../../assets/images/common/icon_check_commonColor.svg" alt="check image" class="checkImg" /> -->
                    {{ $changeText(sticker.nameMtext) }}
                    </button>
                </div>
        </div>
        <!-- <div style="width: 100%; height: 35px; float: left; display: flex; justify-content: center; align-items: center;">
            <gBtnSmall class="mleft-05" @click="backClick" btnThema="light" style="height: 25px; line-height: 25px;" :btnTitle="$t('COMM_BTN_CLOSE')"/>
        </div> -->
        <gConfirmPop
        :confirmText="mConfirmText"
        :confirmType="mConfirmType"
        v-if="mConfirmPopShowYn"
        @ok="confirmOk"
        @no="mConfirmPopShowYn = false"
        />
    </div>

</template>
<script>
export default {
  props: {
    pCloseStickerPop: {}
  },
  created () {
    var history = this.$store.getters['D_HISTORY/hStack']
    history.push(this.popId)
    this.$store.commit('D_HISTORY/updateStack', history)
  },
  data () {
    return {
      popId: 'manageStickerPop',
      selectedColor: '#CCC',
      mConfirmText: '',
      confirmOk: null,
      mConfirmPopShowYn: false,
      mConfirmType: 'two',
      stickerNameVal: '',
      selectedSticker: { nameMtext: '', stickerKey: null, picBgPath: '#CCC' },
      addTagShowYn: false
    }
  },
  methods: {
    backClick () {
      var hStack = this.$store.getters['D_HISTORY/hStack']
      var removePage = hStack[hStack.length - 1]
      if (this.popId === hStack[hStack.length - 1]) {
        hStack = hStack.filter((element, index) => index < hStack.length - 1)
        this.$store.commit('D_HISTORY/setRemovePage', removePage)
        this.$store.commit('D_HISTORY/updateStack', hStack)
        if (this.pCloseStickerPop) {
          this.pCloseStickerPop()
        }
      } else {

      }
    },
    toggleSelectTag (sticker) {
      this.selectedSticker = sticker
      this.stickerNameVal = sticker.nameMtext
    },
    changeTagColor (color) {
      this.selectedSticker.picBgPath = color
      console.log('color', color)
      this.toggleAddTagShowYn()
    },
    toggleAddTagShowYn () {
      this.addTagShowYn = !this.addTagShowYn
    },
    reqDelSticker () {
      if (!this.selectedSticker.stickerKey) {
        this.mConfirmText = this.$t('COMM_MSG_REQ_SELECT_TAG')
        this.confirmOk = () => {
          this.mConfirmPopShowYn = false
        }
        this.mConfirmType = 'timeout'
      } else {
        this.mConfirmText = this.$t('COMM_MSG_DELETE_TAG')
        this.confirmOk = this.deleteSticker
        this.mConfirmType = 'two'
      }

      this.mConfirmPopShowYn = true
    },
    async deleteSticker () {
      const param = {}
      this.mConfirmPopShowYn = false
      if (!this.selectedSticker.stickerKey) {
        this.$showToastPop(this.$t('STICK_MSG_DELETE_FAIL'))
        return
      }
      param.stickerKey = this.selectedSticker.stickerKey
      param.deleteYn = true
      var result = await this.$commonAxiosFunction({
        url: '/sUniB/tp.saveSticker',
        param: param
      })
      if (result.data.result) {
        this.stickerNameVal = ''
        var idx = this.GE_STICKER_LIST.findIndex((item) => Number(item.stickerKey) === Number(this.selectedSticker.stickerKey))
        if (idx !== -1) {
          this.GE_STICKER_LIST.splice(idx, 1)
          this.$store.dispatch('D_CHANNEL/AC_STICKER_LIST', this.GE_STICKER_LIST)
        }
      }
    },
    async saveSticker () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      let modiYn = false
      if (this.selectedSticker.stickerKey) {
        param.stickerKey = this.selectedSticker.stickerKey
        modiYn = true
      }
      param.nameMtext = 'KO$^$' + this.stickerNameVal
      param.picBgPath = this.selectedSticker.picBgPath
      param.creUserKey = this.GE_USER.userKey
      var result = await this.$commonAxiosFunction({
        url: '/sUniB/tp.saveSticker',
        param: param
      })
      if (result.data.result) {
        this.stickerNameVal = ''
        if (result.data.stickerKey) {
          param.stickerKey = result.data.stickerKey
          this.selectedSticker = param
          if (!modiYn) {
            this.GE_STICKER_LIST.unshift(param)
            await this.$store.dispatch('D_CHANNEL/AC_STICKER_LIST', this.GE_STICKER_LIST)
          } else {
            var idx = this.GE_STICKER_LIST.findIndex((item) => item.stickerKey === this.selectedSticker.stickerKey)
            this.GE_STICKER_LIST[idx] = param
            await this.$store.dispatch('D_CHANNEL/AC_STICKER_LIST', this.GE_STICKER_LIST)
          }
        }
      }
    }
  },
  computed: {
    historyStack () {
      return this.$store.getters['D_HISTORY/hRPage']
    },
    pageUpdate () {
      return this.$store.getters['D_HISTORY/hUpdate']
    },
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    },
    GE_STICKER_LIST () {
      const stickerList = this.$store.getters['D_CHANNEL/GE_STICKER_LIST']
      stickerList.forEach(sticker => {
        sticker.nameMtext = this.$changeText(sticker.nameMtext)
      })
      return stickerList
    }
  },
  watch: {
    pageUpdate (value, old) {
      this.backClick()
    }
  }
}
</script>

<style scoped>

.tagInput{
  border:none !important;
  border-bottom:2px solid rgba(192, 191, 249, 0.6) !important;
  border-radius:0px !important;
}
.previewTag{
  width:auto;
  min-width:60px;
  height: 25px;
  border-radius:25px;
  text-align:center;
  padding:0 8px;
  color:#fff;
  font-weight:bold;
  line-height:25px;
  font-size:13px;
}
button {
  min-width: 40px;
  height: 25px;
  padding: 0px 10px;
  float: left;
  color: #7a7a7a;
  word-wrap: normal;
  border: none;
  /* background-color: #f1f1ff; */
  background-color:#fff;
  border-radius: 5px;
  line-height: 22px;
  &.activeBtn {
    font-weight:bold !important;
    height:25px;
    line-height:20px;
  }
  &.closeBtn {
    border: none;
    background-color: none;
  }
}
.tagButton {
    margin-left: 5px;
    margin-top: 5px;
    height:25px;
    border-radius:25px;
}
.tagButton:first-child{
  margin-left:0;
}
</style>
