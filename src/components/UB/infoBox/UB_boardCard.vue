<i18n>
{
  "ko": {
    "SEAR_TAB_ACT_CAHNNEL": "생성일"
  },
  "en": {
    "SEAR_TAB_ACT_CAHNNEL": "Created"
  }
}
</i18n>
<template>
  <div class="w100P" style="min-height:80px; border-bottom:1px solid #cccccc70; display: flex; flex-direction: row; align-items: center; padding-top: 15px; padding-bottom: 15px;" @click="goBaordMain(boardElement)">
    <div style="width: 65px; height: 65px; border-radius: 50%; border: 2px solid #bbb;" :style="`background-color: ${boardElement.picBgPath}`">
    </div>
    <div class="fl mleft-1" style="width: calc(100% - 65px - 1rem);">
      <div class="w100P fl font16 fontBold textLeft grayBlack ">
        <p class="fl">
          {{ $changeText(boardElement.cabinetNameMtext) }}
        </p>
        <p class="fr font13 lightGray" style="font-weight: normal;">{{ $t("SEAR_TAB_ACT_CAHNNEL") + " " +$changeDateFormat(boardElement.cabCreDate) }}</p></div>
      <p class="w100P fl font14 textLeft grayBlack">{{ $changeText(boardElement.memoMtext) }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    boardElement: {}
  },
  created () {
    console.log(12341234)
    console.log(this.boardElement)
  },
  methods: {
    goBaordMain (boardElement) {
      var openPopParam = {}
      openPopParam.targetKey = this.boardElement.teamKey
      openPopParam.targetType = 'chanDetail'
      this.$emit('openPop', openPopParam)
    }
  }
}
</script>

<style>.chanLogoImgWrap {
  width: 40px;
  height: 40px;
  padding: 5px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #ccc;
  position: relative;
  flex-shrink: 0
}</style>
