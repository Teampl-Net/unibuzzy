<i18n>
{
  "ko": {
    "FORM_TITLE_FONT": "폰트",
    "FORM_BTN_BIG": "큰사이즈",
    "FORM_BTN_MID": "중간사이즈",
    "FORM_BTN_SMALL": "작은사이즈"
  },
  "en": {
    "FORM_TITLE_FONT": "Font",
    "FORM_BTN_BIG": "Big Size",
    "FORM_BTN_MID": "Middle Size",
    "FORM_BTN_SMALL": "Small Size"
  }
}
</i18n>
<template>
  <div v-if="propTools" class="toolBoxWrap">
    <div class="fl h100P fontSizeBox">
      <p class="fontSizeTitle" @mousedown="clickSelectBox()">{{ $t('FORM_TITLE_FONT') }} {{propTools.ftSize}}</p>
      <div v-if="mFontSelectBoxShowYn" class="fontSizeWrap">
        <div @mousedown="changeFontSize(20)" class="fontOption font20" value="20">{{ $t('FORM_BTN_BIG') }}</div>
        <div @mousedown="changeFontSize(16)" class="fontOption font16" value="16">{{ $t('FORM_BTN_MID') }}</div>
        <div @mousedown="changeFontSize(12)"  class="fontOption font12" value="12">{{ $t('FORM_BTN_SMALL') }}</div>
      </div>
    </div>
    <div class="fl fontStyleWrap">
      <div @click="changeTextStyle({ type: 'bold' })" :class="propTools.boldYn === true ? 'selectedStyle': ''" class="fl fontStyleItem">
        <img class="w100P" src="../../../assets/images/formEditor/boldIcon.svg" alt="">
      </div>
      <div @click="changeTextStyle({ type: 'italic' })" :class="propTools.italicYn === true ? 'selectedStyle': ''" class="fl fontStyleItem">
        <img class="w100P" src="../../../assets/images/formEditor/italicIcon.svg" alt="">
      </div>
      <div @click="changeTextStyle({ type: 'underLine' })" :class="propTools.underLineYn === true ? 'selectedStyle': ''" class="fl fontStyleItem">
        <img class="w100P" src="../../../assets/images/formEditor/underlineIcon.svg" alt="">
      </div>
      <img @click="delFormCard()" src="../../../assets/images/formEditor/trashIcon.svg" class="fl deleteFormCard" alt="">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    propTools: {}
  },
  data () {
    return {
      mFontSelectBoxShowYn: false
    }
  },
  methods: {
    changeFontSize (fontSize) {
      this.changeTextStyle({ type: 'font', size: fontSize })
      this.mFontSelectBoxShowYn = false
    },
    changeTextStyle (obj) {
      this.$emit('changeTextStyle', obj)
    },
    clickSelectBox () {
      this.mFontSelectBoxShowYn = !this.mFontSelectBoxShowYn
      const selection = document.getSelection && document.getSelection()
      var range1 = selection.getRangeAt(selection.rangeCount - 1)
      this.lastFocus = range1
      var thisWindow = this

      setTimeout(() => {
        window.getSelection().removeAllRanges()
        window.getSelection().addRange(thisWindow.lastFocus)
        document.getSelection().addRange(thisWindow.lastFocus)
      }, 100)
    },
    delFormCard () {
      this.changeTextStyle({ type: 'delFormCard' })
    }
  }
}
</script>

<style>
.selectedStyle {
  background: #d7d7e63f;
}
.toolBoxWrap {
  position: absolute !important;
  bottom: 0;
  left: 0;
  border: 1px solid #ccc;
  width: 100%;
  height: 40px;
  box-shadow: rgb(130 130 153 / 39%) 0px 6px 9px -5px;
  padding: 5px 10px;
  z-index: 1000000;
  background: #FFFFFF;
}
.fontSizeBox {
  width: 25%;
}
.fontSizeTitle {
  color: #6768A7;
  float: left;
  line-height: 35px;
  margin-right: 5px;
  font-size: 18px;
  width: 100%;
}
.fontSizeWrap {
  width: 25%;
  position: absolute;
  background: #fff;
  min-height: 80px;
  left: 2px;
  top: -90px;
  border: 1px solid #ccc;
  border-bottom: none;
}
.fontOption {
  height: 30px;
  color: #6768A7;
  display: flex;
  align-items: center;
  justify-content: center;
}
.font20 {
  font-size: 20px;
}
.font16 {
  font-size: 16px;
}
.font12 {
  font-size: 12px;
}
.fontStyleWrap {
  display: flex;
  width: 45%;
  height: 100%;
  align-items: center;
  justify-content: space-around;
}
.fontStyleItem {
  width: 25px;
  text-align: center;
  cursor: pointer;
}
.deleteFormCard {
  width: 24px;
  margin-left: 5px;
  cursor: pointer;
}
</style>
